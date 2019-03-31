import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterListBy'
})
export class FilterListByPipe implements PipeTransform {

    transform(obj: any, filterByField: string,  filterByValue: any): any {
        if ( Array.isArray(obj) && filterByField.length) {
            return obj.filter(e => e[filterByField] == filterByValue);
        }
        return obj; 
    }
}
