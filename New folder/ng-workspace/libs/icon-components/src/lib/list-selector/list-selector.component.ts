import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter, Optional, Host, SkipSelf } from '@angular/core';
import { TextValue } from '@icon/icon-models';
import { startWith, map, first } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormControlName, NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, ControlContainer } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material';

@Component({
    selector: 'icon-list-selector',
    templateUrl: './list-selector.component.html',
    styleUrls: ['./list-selector.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: ListSelectorComponent,
            multi: true
        }
    ]
})
export class ListSelectorComponent implements ControlValueAccessor, OnInit {
    @Input() formControlName: string;
    control: AbstractControl;

    @Input() placeholder: string = 'Select...';
    @Input() required: boolean = false;

    _dataList: TextValue[];
    @Input('dataList')
    set dataList(val: TextValue[]) {
        if (val !== undefined && val.length > 0) {
            this._dataList = val;
            this.filteredData = this.control.valueChanges.pipe(
                startWith(null),
                map((value: string | null) => {
                    let res = value ? this._filter(value) : this._dataList.slice();
                    return res;
                })
            );
        }
    }

    @Output() changed = new EventEmitter<any>();

    filteredData: Observable<TextValue[]>;

    constructor(
        @Optional()
        @Host()
        @SkipSelf()
        private controlContainer: ControlContainer
    ) { }

    ngOnInit() {
        if (this.controlContainer) {
            if (this.formControlName) {
                this.control = this.controlContainer.control.get(this.formControlName);
            } else {
                console.warn(
                    'Missing FormControlName directive from host element of the component'
                );
            }
        } else {
            console.warn("Can't find parent FormGroup directive");
        }
    }
    
    public _filter(value: string): TextValue[] {
        const filterValue = value.toLowerCase();
        return this._dataList.filter(
            value => value.text.toLowerCase().indexOf(filterValue) === 0
        );
    }

    onChanged(event: MatOptionSelectionChange, data) {
        if (event.isUserInput) {
            this.changed.emit(data);
        }
    }

    writeValue(obj: any): void { }
    registerOnChange(fn: any): void { }
    registerOnTouched(fn: any): void { }
    setDisabledState?(isDisabled: boolean): void { }
}
