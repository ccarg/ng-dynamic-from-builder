import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppData, GridData, DealGrowRow, Network, RateCard, Deal } from '@icon/icon-models';
import { IconUtils } from '@icon/icon-utils';
import { StateService } from 'libs/icon-service/src/lib/state.service';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-deals-grid',
    templateUrl: './deals-grid.component.html',
    styleUrls: ['./deals-grid.component.scss']
})
export class DealsGridComponent implements OnInit {

    showTextForListItem = IconUtils.showTextForListItem
    appData = new AppData();    
    
    deals: GridData<DealGrowRow> = new GridData<DealGrowRow>([
        'toolbar', 'Name', 'Network', 'RateCard', 'ValueType', 'FullValue',
        'RateBasis', 'PercentTradeNet',
        'PercentCash', 'HitPercentage', 'Discount', 'DayPart',
        'StartYear', 'StartQuarter', 'EndYear', 'EndQuarter'
    ]);

    @ViewChild('dealsSort') dealsSort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    @Input() storageKey: string = undefined;
    @Input() height: string = '600';
    @Input() showPagination: boolean = false;
    @Input() softDelete: boolean = false;
    @Input() pageSizeOptions = [10, 25, 50];
    @Input() valueTypes: any;
    @Input() rateBasis: any;    
    @Input() networks: Array<Network> = [];    
    @Input() rateCards: Array<RateCard> = [];    
    @Input() years: Array<number>;
    @Input() maxFullValueSum: number = 0;        
    actualFullValueSum: number = 0;        

    @Output() editRow = new EventEmitter<DealGrowRow>();
    
    constructor(
        private nbtStateService: StateService,
        private nbtApiService: ApiService) { }

    ngOnInit() {
        this.deals.dataSource = new MatTableDataSource<DealGrowRow>([]);
        this.deals.dataSource.sortingDataAccessor = (item, property) => {
            return property.split('.').reduce((prev, curr) => {
                return prev[curr];
            }, item)
        };
        this.deals.dataSource.sort = this.dealsSort;
        if (this.showPagination) {
            this.deals.dataSource.paginator = this.paginator;
        }

        setTimeout(() => { 
            if (this.storageKey) {
                this.deals.dataSource.data = this.nbtStateService.get(this.storageKey) || []
            }
        }, 13)
    }
    
    addRange(deals: Array<DealGrowRow>) { 
        this.deals.dataSource.data = [...deals];
        this.deals.dataSource.sort = this.dealsSort;
        if (this.showPagination) {
            this.deals.dataSource.paginator = this.paginator;
        }            
    }

    add(deal: Deal, network: Network, rateCard: RateCard, callback: Function) {
        console.log('add', deal, network, rateCard);
        this.validateMaxFullValue();
        
        setTimeout(() => {
            let fullValueAvailable = this.maxFullValueSum - this.actualFullValueSum;
            fullValueAvailable = fullValueAvailable > 0 ? fullValueAvailable : 0;

            let periods = [{ StartYear: deal.StartYear, StartQuarter: deal.StartQuarter, EndYear: deal.EndYear, EndQuarter: deal.EndQuarter, FullValue: fullValueAvailable }]
            
            if (deal.DealDetails.HasQuarterly) { 
                let startYear = +(deal.StartYear || '0')
                let startQuarter = +(deal.StartQuarter || '1')
                let endYear = +(deal.EndYear || '0')
                let endQuarter = +(deal.EndQuarter || '1')

                if (startYear !== 0 && endYear !== 0) { 
                    let years = IconUtils.range(+(deal.StartYear || '0'), +(deal.EndYear || '0'))    
                    periods = [];
                    years.forEach(y => {
                        IconUtils.range(y.value === startYear ? startQuarter : 1, y.value === endYear ? endQuarter : 4).forEach(q => {
                            periods.push({ StartYear: y.value, StartQuarter: q.value, EndYear: y.value, EndQuarter: q.value, FullValue: 0 })                            
                        });
                    });
                }

                let quarterFullAmount = fullValueAvailable > 0 ? Math.floor(fullValueAvailable / periods.length) : 0
                periods.forEach(p => p.FullValue = quarterFullAmount);                
            }

            periods.forEach(p => {
                let newDeal = <DealGrowRow>{
                    Id: -1,
                    Name: deal.Name,
                    FullValue: p.FullValue,
                    StartYear: p.StartYear,
                    StartQuarter: p.StartQuarter,
                    EndYear: p.EndYear,
                    EndQuarter: p.EndQuarter,
                    PercentTradeNet: deal.DealDetails.PercentTradeNet,
                    PercentCash: deal.DealDetails.PercentCash,
                    HitPercentage: deal.DealDetails.HitPercentage,
                    Discount: deal.DealDetails.Discount,
                    NetworkSbmsId: network && network.SbmsId,
                    NetworkId: network && network.Id || 0,
                    Network: network && network.NetworkName,
                    RateBasis: deal.DealDetails.RateBasis || 0,
                    RateCardId: rateCard && rateCard.Id || 0,
                    RateCard: rateCard && rateCard.Name,
                    DayPartId: deal.DayPartId || 0,
                    DayPart: deal.DayPart,
                    ValueType: deal.DealDetails.ValueType || 0,
                    HasQuarterly: deal.DealDetails.HasQuarterly,
                    IsActive: true,
                    Documents: deal.Documents
                }

                this.deals.dataSource.data.push(newDeal)
                this.deals.dataSource.data = [...this.deals.dataSource.data];
                this.deals.dataSource.sort = this.dealsSort;
                if (this.showPagination) {
                    this.deals.dataSource.paginator = this.paginator;
                }

                this.storageKey && this.nbtStateService.set(
                    this.storageKey,
                    this.deals.dataSource.data
                );                
            });
            
            typeof callback === 'function' && callback();            

            this.validateMaxFullValue();            
        }, 13);
    }  

    clear() { 
        if (this.deals.dataSource) {
            this.deals.dataSource.data = [];            
        }
        this.storageKey && this.nbtStateService.clear(this.storageKey);        
    }

    $dayParts: Observable<any>;
    dayParts: any;
    private dayPartsCache = {}
    maxFullValueError: boolean = false;
    onEditDeal(deal: DealGrowRow, isEdit = true) {         
        this.deals.dataSource.data.forEach(d => { d.Edit = false;})
        deal.Edit = isEdit;
        deal.Dirty = true;
        if (deal.Edit) {
            this.dayParts = this.dayPartsCache[deal.NetworkId] || null;
            if (!this.dayParts && deal.NetworkId) {
                this.nbtApiService.networkDayparts(deal.NetworkId)
                    .pipe(first())
                    .subscribe(
                        data => {
                            this.dayParts = data;
                            this.dayPartsCache[deal.NetworkId] = [...data];
                        },
                        error => { console.log(error) },
                        () => { console.log('unsubscribe') }
                    );
            }
        }                
        this.editRow.emit(deal)        
        this.validateMaxFullValue()
    }

    validateMaxFullValue() { 
        if (this.maxFullValueSum > 0) {
            this.actualFullValueSum = this.deals.dataSource.data
                .reduce((prev, curr) => prev + curr.FullValue, 0);

            this.maxFullValueError = this.maxFullValueSum < this.actualFullValueSum
        }
    }

    canSave() { 
        return !((this.deals.dataSource || { data: [] }).data as DealGrowRow[])
            .find(e => e.Id === -1 || e.Dirty === true || e.IsActive === false)
    }

    save(saveAll: boolean = false, callback: Function = undefined) { 
        let toSave = ((this.deals.dataSource || { data: [] }).data as DealGrowRow[])
        
        toSave = saveAll ? toSave : toSave.filter(e => e.Id === -1 || e.Dirty === true || e.IsActive === false)
        
        this.nbtApiService.saveDeals(toSave).pipe(first()).subscribe(
            data => {
                this.processSaveResult(saveAll, data) && callback && callback()
            },
            error => { console.log('save error', error) },
            () => { console.log('save unsubscribe') }
        )
    }

    processSaveResult(saveAll: boolean, data: Array<DealGrowRow>) : boolean { 
        let errors = data.filter(e => e.Error).map(e => `Id (${e.Id}): ${e.Error}` );
        if (errors.length > 0) { 
            errors.unshift("Errors:");
        }        
        let messages = data.filter(e => e.Message).map(e => `Id (${e.Id}): ${e.Message}`);
        if (messages.length > 0) {
            messages.unshift("Messages:");
        }   
        
        if (saveAll) {            
            errors.length === 0 ? this.clear() : this.addRange(data)
        }
        else { 
            this.addRange(
                this.deals.dataSource.data.map(e => data.find(d => d.Id === e.Id) || e).filter(e => e.IsActive)
            )
        }
        
        this.nbtStateService.openCustomMessage(errors.concat(messages))        

        return errors.length === 0;
    }
}