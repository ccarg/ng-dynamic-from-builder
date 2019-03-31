import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'rateCardFilter'
})
export class RateCardFilterPipe implements PipeTransform {

    transform(obj: any, sbmsId: any): any {
        if (obj) {
            return obj.filter(e => e.NetworkSbmsId === sbmsId);
        }
        return obj; 
    }
}