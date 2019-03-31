import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quarterRange'
})
export class QuarterRangePipe implements PipeTransform {
   
    transform(obj: any, startYear: any, endYear: any, startQuarter: any): any {
        if (obj) {
            if (startYear && endYear && startYear === endYear) {
                return obj.filter(e => e.Value >= startQuarter);
            }
        }
        return obj;
    }    

}
