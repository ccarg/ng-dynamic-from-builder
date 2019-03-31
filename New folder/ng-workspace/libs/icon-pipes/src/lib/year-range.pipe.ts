import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearRange'
})
export class YearRangePipe implements PipeTransform {

    transform(obj: any, startYear: any): any {
        if (obj && startYear) {
          return obj.filter(e => e.Value || e.value >= startYear);
        }
        return obj;
    }

}
