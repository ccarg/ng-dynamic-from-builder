import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { IsNotEmpty, validateSync } from "class-validator";

export class AppData {
    Quarters = [{ Text: 'Q1', Value: 1, text: 'Q1', value: 1 }, { Text: 'Q2', Value: 2, text: 'Q2', value: 2 }, { Text: 'Q3', Value: 3, text: 'Q3', value: 3 }, { Text: 'Q4', Value: 4, text: 'Q4', value: 4 }];
    quarters = this.Quarters
}

export class TextValue {
    text: string;
    value: string;
}

export class Network {
    IsBroadcastStation: boolean;
    NetworkName: string;
    SbmsId: number;
    Id: number;
}

export class Document {
    Name: string;
    Type: string;
    Value: any;
    DocumentId: string;
    DocumentUrl: string;
    DateModified: string;
    IsActive: boolean = true;
}

export class Deal {

    DayPart: string = '';
    DayPartId: string = '';

    @IsNotEmpty() Name: string = '';
    @IsNotEmpty() StartYear: string = '';
    @IsNotEmpty() EndYear: string = '';
    @IsNotEmpty() StartQuarter: string = '';
    @IsNotEmpty() EndQuarter: string = '';

    DealDetails: DealDetails = new DealDetails();
    Network: Network
    RateCard: RateCard
    Documents: Array<Document> = [];

    Edit: boolean = false;
    Errors: any = {};
    ErrorFields: any = {};

    validate(field: string = null) {
        if (field) {
            this.ErrorFields[field] = validateSync(this).find(e => e.property === field) !== undefined;
        }
        else {
            this.Errors = validateSync(this)        
            this.ErrorFields = {};
            this.Errors.forEach(e => this.ErrorFields[e.property] = true)
            return this.Errors.length === 0;
        }
    }
}

export class DealGrowRow {
    Id: any = '';
    Name: any = '';
    FullValue: any = '';
    StartQuarter: any = '';
    StartYear: any = '';
    EndQuarter: any = '';
    EndYear: any = '';
    PercentTradeNet: any = '';
    PercentCash: any = '';
    HitPercentage: any = '';
    Discount: any = '';
    NetworkSbmsId: any = '';
    NetworkId: any = '';
    Network: any = '';
    RateBasis: any = '';
    RateCardId: any = '';
    RateCard: any = '';
    DayPartId: any = '';
    DayPart: any = '';
    ValueType: any = '';
    HasQuarterly: boolean = false;
    Edit: boolean = false;
    IsActive: boolean = true;
    Dirty: boolean = false;
    Error: string = '';
    Message: string = '';
    Documents: Array<Document> = [];
}

export class DealDetails {
    ValueType: string = '';
    FullValue: number;
    RateBasis: string = '';
    HasQuarterly: boolean = false;
    HitPercentage: number;
    HitPercentageDisabled: boolean = true;
    Discount: number;
    DiscountDisabled: boolean = true;
    PercentCash: number;
    PercentCashDisabled: boolean = true;
    PercentTradeNet: number;
    PercentTradeNetDisabled: boolean = true;

    reset() {
        this.HitPercentage = undefined;
        this.Discount = undefined;
        this.PercentCash = undefined;
        this.PercentTradeNet = undefined;
        this.HitPercentageDisabled = true;
        this.DiscountDisabled = true;
        this.PercentCashDisabled = true;
        this.PercentTradeNetDisabled = true;
    }

    enableTradeNet(value = 0) {
        this.PercentTradeNetDisabled = false;
        this.PercentTradeNet = value;
        return this;
    }

    enableCash(value = 0) {
        this.PercentCashDisabled = false;
        this.PercentCash = value;
        return this;
    }

    enableDiscount(value = 0) {
        this.DiscountDisabled = false;
        this.Discount = value;
        return this;
    }

    enableHit(value = 0) {
        this.HitPercentageDisabled = false;
        this.HitPercentage = value;
        return this;
    }

    applyValueType(valueTypeName: string) {
        this.reset();
        switch (valueTypeName.trim().toLocaleLowerCase()) {
            case 'standard':
                this.enableTradeNet().enableCash(100).enableDiscount();
                break;
            case 'hit':
            case 'investment':
                this.enableCash().enableHit().enableTradeNet()
                break;
            case 'discount':
                this.enableCash().enableDiscount().enableTradeNet();
                break;
            case 'reciprocal':
                this.enableCash().enableTradeNet();
                break;
            default:
                this.enableCash().enableTradeNet().enableDiscount().enableHit();
        }
    }
}

export class RateCard {
    Id: number
    Name: string
    Network: string
    Tier: string
    FromYear: number
    ToYear: number
    ToQuarter: string
    FromQuarter: string
    NetworkSbmsId: number
}

export class GridData<T> {
    $data: Observable<Array<T>>;
    dataSource: MatTableDataSource<T>;
    selection = new SelectionModel<T>(true, []);
    columns: Array<string>;
    lastSelected: T;

    constructor(columns: Array<string>) {
        this.columns = columns;
    }

    isAllSelected = () => {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    selectAll() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    filter(event: any) {
        this.dataSource.filter = (event.target.value || '').trim().toLowerCase();
        event.preventDefault();
        event.stopPropagation();
    }

    select(row) {
        this.lastSelected = row;
    }

    isSelected(row) {
        return row === this.lastSelected;
    }

    delete(row) {
        this.dataSource.data.splice(this.dataSource.data.indexOf(row), 1);
        this.dataSource.data = [...this.dataSource.data];
    }

    softDeleteToggle(row, useCamelCase = false) {
        const isActiveFieldName = useCamelCase ? "isActive" : "IsActive"
        const EditFieldName = useCamelCase ? "edit" : "Edit"
        row[isActiveFieldName] = !row[isActiveFieldName];
        if (row[isActiveFieldName]) {
            row[EditFieldName] = false;
        }
    }
}

export class NetworkDemo {
    networkId: number = 0;
    networkName: string = '';
    demoId: string = '';
}

export class NationalBuy { 
    id: number = 0;
    orderBudgetName: string = '';
    orderBudgetGuid: string = '';
    clientName: string = '';
    clientGuid: string = '';
    brand: string = '';
    sbmsBrandId: number = 0;
    demoName: string = '';
    sbmsDemoId: number = 0;
    buyerName: string = '';
    buyerId: number = 0;
    agencyName: string = '';
    agencyGuid: string = ''; 
    buyType: string = ''; 
    dateRegistered: string = '';
    startFlightQuarter: string = '';
    startFlightYear: string = '';
    endFlightQuarter: string = '';
    endFlightYear: string = '';
    //name: string | any[] = ['', [Validators.required, Validators.minLength(4)] ];
    name: string = '';
    comments: string = '';    
    edit: boolean = false;
    isActive: boolean = true;

    // public init () { 
    //     this.name = [Array.isArray(this.name) ? this.name[0] : this.name
    //         , [Validators.required, Validators.minLength(4)]];        
    // }
}

export class NationalBuyNetwork{
    id: number = 0;
    isActive: boolean = true;
    dealName: string = '';
    dealId: number = 0;
    grossBudget: string = '';
    grossCPM: string = '';
    clientGRP: string | number = '';
    impressions: string | number = '';
    buyingDemoUniverse: string = '';
    iconBudget: string | number = '';
    fullValue: string = '';
    iconCPM: string | number = '';
    iconGRP: string = '';
    networkAdjustment: string = '';
    lvg: string | number = '';
    dealBalance: string = '';
    dealValueType: string = '';
    demoId: string = '';
    demoName: string = '';
    discount: number = 0;
    hitPercentage: number = 0;
    isChecked: boolean = false;
    nationalBuyNetworkDetails: Array<any> = [];
    networkId: string = '';
    networkName: string = '';
    networkSbmsId: number = 0;
    //should be calculated based on selected network
    daypartCpmTotal: string | number = 0;
}