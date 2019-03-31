import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from '../api.service';
import { NationalBuyNetwork } from '@icon/icon-models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'icon-dialog-buy-network-details',
  templateUrl: './dialog-buy-network-details.component.html',
  styleUrls: ['./dialog-buy-network-details.component.scss']
})
export class DialogBuyNetworkDetailsComponent implements OnInit {
  
  gridData = [];

  columns = [
    'networkDaypart',
    'percentDistribution',
    'defaultCpm',
    'overrideCpm',
    'daypartCpm',
    'notes'
  ];

  loading = false;
  nationalBuyNetwork: NationalBuyNetwork;
  year: number; 
  quarter: number;

  constructor(
    private apiService: ApiService,  
    public dialogRef: MatDialogRef<DialogBuyNetworkDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
        this.loading = true
        this.nationalBuyNetwork = data.nationalBuyNetwork;
        this.year = data.year;
        this.quarter = data.quarter;

        apiService.buyNetworkDetailDaypartList(
          this.year, 
          this.quarter, 
          this.nationalBuyNetwork.networkId, 
          this.nationalBuyNetwork.id, 
          this.nationalBuyNetwork.demoId, 
          this.nationalBuyNetwork.dealId
        ).pipe(first()).subscribe(
            data => this.gridData = data,
            err => {
                this.loading = false
                console.log('error', err)
            },
            () => this.loading = false
        );
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  getTotal(field: string)
  {
      if(field === 'daypartCpm'){
        return (this.gridData.reduce((prev, curr) => prev + ((curr['overrideCpm'] || curr['defaultCpm']) * curr['percentDistribution']) || 0, 0)).toFixed(2)      
      }
      return this.gridData.reduce((prev, curr) => prev + +curr[field] || 0, 0)
  }

  getDaypardCmp(data){
    return ((data['overrideCpm'] || data['defaultCpm']) * data['percentDistribution']).toFixed(2)
  }   
  
  onSave(){
      console.log('saving')
  }
}
