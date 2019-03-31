import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Observable, forkJoin } from 'rxjs';
import { tap, map, concat, first } from 'rxjs/operators';
import { Network, GridData, RateCard, Deal, AppData, DealGrowRow, DealDetails } from '@icon/icon-models';
import { IconUtils } from '@icon/icon-utils';
import { DealsGridComponent } from './deals-grid/deals-grid.component';
import { StateService } from 'libs/icon-service/src/lib/state.service';
import { ApiService } from './api.service';

@Component({    
  selector: 'icon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    appData = new AppData();
    showTextForListItem = IconUtils.showTextForListItem

    networks: GridData<Network> = new GridData<Network>(['NetworkName']);
    networksData: Array<Network> = [];

    deal: Deal = new Deal();

    rateCardsData: Array<RateCard> = [];
    rateCards: GridData<RateCard> = new GridData<RateCard>(['Name', 'Network', 'FromYear', 'ToYear', 'FromQuarter', 'ToQuarter']);

    $years: Observable<Array<number>>;
    $valueTypes: Observable<any>;
    $rateBasis: Observable<any>;
    years: Array<number>;
    valueTypes: any;
    rateBasis: any;

    constructor(
        private nbtApiService: ApiService,
        private stateService: StateService
    ) { }

    @ViewChild('networksSort') networksSort: MatSort;
    @ViewChild('rateCardsSort') rateCardsSort: MatSort;

    @ViewChild('newDealsGrid') newDealsGrid: DealsGridComponent;
    @ViewChild('existingDealsGrid') existingDealsGrid: DealsGridComponent;

    ngOnInit() {

        this.$years = this.nbtApiService.getYears().pipe(tap(data => { this.years = data; }));
        this.$valueTypes = this.nbtApiService.valueTypes().pipe(tap(data => {
            this.valueTypes = data;
            this.deal.DealDetails.ValueType = this.deal.DealDetails.ValueType || this.valueTypes[0].Value;
        }));
        this.$rateBasis = this.nbtApiService.rateBasis().pipe(tap(data => { this.rateBasis = data; }));

        this.reloadMain();

        this.networks.$data = this.nbtApiService.networksList().pipe(
            tap(data => {
                //console.log('Networks', data);
                this.networks.dataSource = new MatTableDataSource<Network>(data);
                this.networks.dataSource.sort = this.networksSort;
                this.networksData = data;
            })
        );

        this.rateCards.dataSource = new MatTableDataSource<RateCard>(this.rateCardsData);
        this.rateCards.$data = this.nbtApiService.rateCardsList().pipe(
            tap(data => {
                //console.log('rateCards', data);
                this.rateCardsData = data;
            })
        );

        this.getState();

        // this.serverData.$data = forkJoin([this.nbtApiService.networksList(), this.nbtApiService.rateCardsList()]).pipe(
        //     tap(data => {                 
        //         let _serverData = data[0].map(n => { 
        //             let rates = data[1].filter(r => r.NetworkSbmsId === n.SbmsId);
        //             return {
        //                 ...n,
        //                 ratesCount: rates.length,
        //                 rates: [...rates],
        //             }
        //         })
        //         console.log('serverData', _serverData)
        //         this.serverData.dataSource = new MatTableDataSource<NetworkWithRatesList>(_serverData);
        //         this.serverData.dataSource.sort = this.serverDataSort;                                
        //     })
        // );                
    }

    networkSelected(network: Network) {
        this.networks.select(network);
        this.rateCards.dataSource = new MatTableDataSource<RateCard>(
            [...this.rateCardsData.filter(r => r.NetworkSbmsId === network.SbmsId)]
        );
        this.rateCards.dataSource.sort = this.rateCardsSort;
    }

    editNewDeal = (deal: DealGrowRow) => deal.Edit && this.setState()

    addDeal() {
        if (!this.deal.validate()) {
            this.stateService.showMessage("Please provide information for Deal required fields.", "Close")
            return;
        }

        this.newDealsGrid.add(
            this.deal,
            this.networks.lastSelected,
            this.rateCards.lastSelected,
            () => {
                this.networks.lastSelected = undefined;
                this.rateCards.lastSelected = undefined;
                this.setState();
            }
        )
    }

    canSaveMain = (): any => this.existingDealsGrid.canSave()

    saveMain = (): any => this.existingDealsGrid.save()

    isDealsGridAction = false;
    reloadMain() {
        this.isDealsGridAction = true;
        this.nbtApiService.getDeals().pipe(first()).subscribe(
            (data) => {
                //console.log('getDeals', data)
                this.existingDealsGrid.clear()
                this.existingDealsGrid.addRange(data)
            },
            error => { console.log(error) },
            () => {
                this.isDealsGridAction = false;
                //console.log('unsubscribe')
            }
        )
    }

    canSaveNew = (): any => this.newDealsGrid.canSave()

    saveNew = () => this.newDealsGrid.save(true, this.clearDeal)

    clearNew = () => {
        this.clearDeal();
        this.newDealsGrid.clear();
    }

    clearDeal = () => {
        this.deal = new Deal()
        this.deal.DealDetails.ValueType = this.valueTypes[0].Value;
        this.stateService.clear("deal");
    }

    setState = () => this.stateService.set("deal", this.deal)

    getState() {
        let deal = this.stateService.get("deal");
        deal = deal ? Object.setPrototypeOf(deal, Deal.prototype) : new Deal();
        deal.DealDetails = (deal && deal.DealDetails) ? Object.setPrototypeOf(deal.DealDetails, DealDetails.prototype) : new DealDetails();
        this.deal = deal;
    }       
}
