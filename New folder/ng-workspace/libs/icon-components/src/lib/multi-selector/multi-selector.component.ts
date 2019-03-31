import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent } from '@angular/material';
import { TextValue } from '@icon/icon-models';
import { FormControl } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'icon-multi-selector',
  templateUrl: './multi-selector.component.html',
  styleUrls: ['./multi-selector.component.scss']
})
export class MultiSelectorComponent implements OnInit {

    multiSelectCtrl = new FormControl();
    filteredData: Observable<TextValue[]>;

    @Input() placeholder = 'Multi Select Data...'
    @Input() selectable = true;
    @Input() removable = true;
    @Input() addOnBlur = true;
    @Input() separatorKeysCodes: number[] = [ENTER, COMMA];        
    @Input() selectedData: TextValue[] = [];
    @Input() dataList: TextValue[] = [];
       
    @ViewChild('multiSelectInput') multiSelectInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;    
    
    constructor() { 
        this.filteredData = this.multiSelectCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit)
                : this.dataList.filter(e => !this.selectedData.includes(e)).slice()));
    }

    ngOnInit() { }    

    add(event: MatChipInputEvent | any, open: boolean = false): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;

            if (input) {
                input.value = '';
            }
        }
        open && this.multiSelectInput.nativeElement.focus()
        this.multiSelectCtrl.setValue(null);
        event['stopPropagation'] && event.stopPropagation();
        event['preventDefault'] && event.preventDefault();
    }

    remove(fruit: TextValue): void {
        const index = this.selectedData.indexOf(fruit);
        ~index && this.selectedData.splice(index, 1);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.selectedData.push(event.option.value);
        this.multiSelectInput.nativeElement.value = '';
        this.multiSelectCtrl.setValue(null);
    }

    private _filter(value: TextValue | string): TextValue[] {
        const filterValue = (value['text'] || value).toLowerCase();

        return this.dataList.filter(fruit => fruit.text.toLowerCase().indexOf(filterValue) === 0);
    }    
}
