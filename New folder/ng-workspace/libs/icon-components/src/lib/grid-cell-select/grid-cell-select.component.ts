import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[icon-grid-cell-select]',
  templateUrl: './grid-cell-select.component.html',
  styleUrls: ['./grid-cell-select.component.scss']
})
export class GridCellSelectComponent implements OnInit {

  @Input() row: any;
  @Input() listData: Array<any>;
  @Input() field: string;
  @Input() fieldId: string;
  @Input() listField: string;
  @Input() listFieldId: string;

  constructor() { }

  ngOnInit() {
  }

}
