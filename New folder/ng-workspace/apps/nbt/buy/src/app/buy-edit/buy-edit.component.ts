import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { NationalBuy, TextValue, AppData } from '@icon/icon-models';
import { ApiService } from '../api.service';
import { first, catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { StateService } from 'libs/icon-service/src/lib/state.service';

@Component({
  selector: 'icon-buy-edit',
  templateUrl: './buy-edit.component.html',
  styleUrls: ['./buy-edit.component.scss']
})
export class BuyEditComponent implements OnInit {
  selectedNetworks: TextValue[] = [];

  appData = new AppData();

  _editBuy: NationalBuy;

  @Input('editBuy')
  set editBuy(val: NationalBuy) {
    if (val !== undefined) {
      this._editBuy = Object.setPrototypeOf(val, NationalBuy.prototype);
      this.buildForm();
    }
  }

  get editBuy(): NationalBuy {
    return this._editBuy;
  }

  vm = {
    agencyList: [],
    brandList: [],
    buyerList: [],
    clientList: [],
    demoList: [],
    orderBudgetList: [],
    networkList: [],
    yearsList: [],
    dealList: [],
    networkDemoList: [],
    nationalBuyNetworkDetailList: []
  };

  buyForm: FormGroup;

  nationalNetworkByNationalQuarterList = [];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.load();
    !this.editBuy && this.getState();    
  }

  buildForm() {
    this.buyForm && this.buyForm.reset();
    this.buyForm = this.formBuilder.group({
      editBuy: this.formBuilder.group(this.editBuy),
      selectedNetworks: this.formBuilder.array(this.selectedNetworks)
    });

    console.log('buildForm', this.buyForm);
  }

  loading: boolean = false;
  load() {
    this.loading = true;
    forkJoin([
      this.apiService.agencyList(),
      this.apiService.brandList(),
      this.apiService.buyerList(),
      this.apiService.clientList(),
      this.apiService.demoList(),
      this.apiService.orderBudgetList(),
      this.apiService.networkList(),
      this.apiService.yearsList(),
      this.apiService.dealList(),
      this.apiService.networkDemoList(),
      this.apiService.buyNetworkDetailList()
    ])
      .pipe(
        first(),
        catchError(error => of(error))
      )
      .subscribe(
        data => {
          this.vm.agencyList = data[0];
          this.vm.brandList = data[1];
          this.vm.buyerList = data[2];
          this.vm.clientList = data[3];
          this.vm.demoList = data[4];
          this.vm.orderBudgetList = data[5];
          this.vm.networkList = data[6];
          this.vm.yearsList = data[7];
          this.vm.dealList = data[8];
          this.vm.networkDemoList = data[9];
          this.vm.nationalBuyNetworkDetailList = data[10];
        },
        error => console.log(error),
        () => {
          this.loading = false;
          console.log('loaded data', this.vm);
        }
      );
  }

  setFormControl(formControlName: string, data: TextValue) {
    console.log('setFormControl');
    let formControl = this.buyForm.controls.editBuy.get(
      formControlName
    ) as FormControl;
    formControl.setValue(data.value);
  }

  save() {
    if (!this.buyForm.valid) {
      this.stateService.showMessage(
        'Please provide data for all required fields.',
        'Close'
      );
      return;
    }
    let items = this.buyForm.get('selectedNetworks') as FormArray;
    items.controls = [];
    this.selectedNetworks.forEach(v => {
      items.push(this.formBuilder.group(v));
    });
    console.log(this.buyForm.value);
  }

  clear = () => {
    this.buyForm.reset();
    this.stateService.clear('nationalBuyState');
  };

  setState = () =>
    this.stateService.set('nationalBuyState', this.buyForm.value);

  getState() {
    let nationalBuyState = this.stateService.get('nationalBuyState');
    this.selectedNetworks = nationalBuyState
      ? nationalBuyState.selectedNetworks
      : [];
    this._editBuy = nationalBuyState
      ? Object.setPrototypeOf(nationalBuyState.editBuy, NationalBuy.prototype)
      : new NationalBuy();
    this.buildForm();
  }
}
