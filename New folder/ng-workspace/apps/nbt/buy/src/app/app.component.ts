import { Component } from '@angular/core';
import { NationalBuy } from '@icon/icon-models';
import { ApiService } from './api.service';

@Component({
  selector: 'icon-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    selectedTab: number = 0;
    editBuy: NationalBuy;

    constructor(public apiService: ApiService,) {}

    ngOnInit() {}
}