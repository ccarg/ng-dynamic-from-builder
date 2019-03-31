import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { tap, first } from 'rxjs/operators';
import { GridData, NationalBuy } from '@icon/icon-models';
import { ApiService } from '../api.service';

@Component({
    selector: 'icon-buy-grid',
    templateUrl: './buy-grid.component.html',
    styleUrls: ['./buy-grid.component.scss']
})
export class BuyGridComponent implements OnInit {

    nationalBuyData: Array<NationalBuy> = [];
    nationalBuy: GridData<NationalBuy> = new GridData<NationalBuy>(['toolbar', 'Name', 'OrderBudget', 'Client', 'Brand', 'Demo', 'Buyer', 'Agency', 'DateRegistered', 'FlightQuarterYear']);

    @ViewChild('nationalBuySort') nationalBuySort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Output() editBuy = new EventEmitter<NationalBuy>();

    constructor(
        private apiService: ApiService
    ) { }

    ngOnInit() { 
        this.nationalBuy.dataSource = new MatTableDataSource<NationalBuy>(this.nationalBuyData);        
        this.load();
    }

    loading: boolean = false;
    load() { 
        this.loading = true;
        this.apiService.buyList().pipe(first()).subscribe(
            data => this.setGridData(data),
            error => console.log(error),
            () => this.loading = false
        );
    }

    setGridData(data) { 
        this.nationalBuy.dataSource = new MatTableDataSource<NationalBuy>(data);
        this.nationalBuy.dataSource.sort = this.nationalBuySort;
        this.nationalBuy.dataSource.paginator = this.paginator;
        this.nationalBuyData = data;        
    }

    save() { 
        this.apiService.save(this.nationalBuyData).pipe(first()).subscribe(
            data => this.setGridData(data),
            error => console.log(error),
            () => this.loading = false
        );        
    }

    onEditBuy(buy: NationalBuy) { 
        this.editBuy.emit(buy);
    }
}