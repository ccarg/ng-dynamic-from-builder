import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ɵConsole, SimpleChanges } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { tap, first } from 'rxjs/operators';
import { GridData, NationalBuyNetwork, TextValue } from '@icon/icon-models';
import { ApiService } from '../api.service';
import { DialogBuyNetworkDetailsComponent } from '../dialog-buy-network-details/dialog-buy-network-details.component';

@Component({
  selector: 'icon-buy-network-grid',
  templateUrl: './buy-network-grid.component.html',
  styleUrls: ['./buy-network-grid.component.scss']
})
export class BuyNetworkGridComponent implements OnInit {

    nationalBuyNetworkData: Array<NationalBuyNetwork> = [];
    nationalBuyNetwork: GridData<NationalBuyNetwork> = new GridData<NationalBuyNetwork>(['toolbar', 'networkName', 'demoName', 
        'dealName', 'grossBudget', 'grossCPM', 'clientGRP', 'impressions', 'buyingDemoUniverse', 
        'iconBudget', 'fullValue', 'iconCPM', 'iconGRP', 'networkAdjustment', 'lvg', 'dealBalance']);

    @ViewChild('nationalBuyNetworkSort') nationalBuyNetworkSort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input() networks: TextValue[]
    @Input() demos: TextValue[]
    @Input() deals: Array<any> = []

    @Output() editNationalBuyNetwork = new EventEmitter<NationalBuyNetwork>();

    selectedYear: number = 2018
    selectedQuarter: number = 1

    constructor(
        private apiService: ApiService,
        public dialog: MatDialog
    ) { }

    ngOnInit() { 
        this.nationalBuyNetwork.dataSource = new MatTableDataSource<NationalBuyNetwork>(this.nationalBuyNetworkData);        
        this.load();
    }

    loading: boolean = false;
    load() { 
        this.loading = true;
        this.apiService.networkByNationalQuarterList(this.selectedYear, this.selectedQuarter, '2').pipe(first()).subscribe(
            data => this.setGridData(data),
            error => console.log(error),
            () => this.loading = false
        );
    }

    setGridData(data) { 
        this.nationalBuyNetwork.dataSource = new MatTableDataSource<NationalBuyNetwork>(data);
        this.nationalBuyNetwork.dataSource.sort = this.nationalBuyNetworkSort;
        this.nationalBuyNetwork.dataSource.paginator = this.paginator;
        this.nationalBuyNetworkData = data;        
    }

    save() { 
        // this.apiService.save(this.nationalBuyNetworkData).pipe(first()).subscribe(
        //     data => this.setGridData(data),
        //     error => console.log(error),
        //     () => this.loading = false
        // );        
    }

    onEdit(data: NationalBuyNetwork) { 
        this.nationalBuyNetworkData.forEach(e => e['edit'] = e.id == data.id ? !e['edit'] : false)     
        data['dirty'] = true;
        this.editNationalBuyNetwork.emit(data);
    }

    getTotal(field){
        if(field === 'lvg'){
            const impressionsTotal = this.getTotal('impressions')            
            const iconGrossBudgetTotal = this.getTotal('iconBudget')            
            const clientGrossBudgetTotal = this.getTotal('grossBudget')
            const iconGrossCPMTotal = iconGrossBudgetTotal / impressionsTotal
            const clientGrossCPMTotal = clientGrossBudgetTotal / impressionsTotal
            const leverageTotal = (clientGrossCPMTotal - iconGrossCPMTotal) / clientGrossCPMTotal    
            return leverageTotal;
        }
        return this.nationalBuyNetworkData.reduce((prev, curr) => prev + +curr[field] || 0, 0)     
    }

    calcNationalBuyNetwork(data: NationalBuyNetwork){       
        data.clientGRP = ((+data.grossBudget / +data.grossCPM / +data.buyingDemoUniverse) || 0).toFixed(2)
        data.impressions = Math.round(+data.clientGRP * + data.buyingDemoUniverse) || 0;         
        data.iconCPM = (+data.daypartCpmTotal * (1 + +data.networkAdjustment) || 0).toFixed(2)
        data.iconBudget = Math.round(+data.buyingDemoUniverse * +data.clientGRP * +data.iconCPM) || 0
        data.lvg = Math.round((+data.grossCPM - +data.iconCPM) / +data.grossCPM) || 0
        return '';
    }

    openNationalBuyNetworkDetails(data: NationalBuyNetwork){
        const dialogRef = this.dialog.open(DialogBuyNetworkDetailsComponent, {
            width: '80%',
            data: {nationalBuyNetwork: data, year: this.selectedYear, quarter: this.selectedQuarter}
        });
    
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed', result);
        });
    }

    
}
