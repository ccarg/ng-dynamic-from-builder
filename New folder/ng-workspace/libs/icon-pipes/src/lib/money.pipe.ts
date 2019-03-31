import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

    transform(obj: any): any {
        return '$ ' + 
            (
                Math.abs(Number(obj)) >= 1.0e+9
                    ? (Math.abs(Number(obj) * 100) / 1.0e+9).toFixed(2) + "B"
                    : Math.abs(Number(obj)) >= 1.0e+6
                        ? (Math.abs(Number(obj)) / 1.0e+6).toFixed(2) + "M"
                        : Math.abs(Number(obj)) >= 1.0e+3
                            ? (Math.abs(Number(obj)) / 1.0e+3).toFixed(2) + "K"
                            : (Math.abs(Number(obj) * 100) / 100).toFixed(2)
            );
    }
    
}
