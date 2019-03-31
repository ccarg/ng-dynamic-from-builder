import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: '[icon-grid-cell-input]',
  templateUrl: './grid-cell-input.component.html',
  styleUrls: ['./grid-cell-input.component.scss']
})
export class GridCellInputComponent implements OnInit {

    @Input() row: any;
    @Input() field: any;
    @Input() type: any = "text";
    @Input() pipe: string = '';

  constructor() { }

  ngOnInit() {
  }

}
