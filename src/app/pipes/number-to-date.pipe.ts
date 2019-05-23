import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToDate'
})
export class NumberToDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let addMonths: number;
    if(args === '10') {
      addMonths = 1;
    } else if(args === '55') {
      addMonths = 6;
     } else if(args === '100') {
      addMonths = 12;
     }
    let startdate = new Date(value);
    let enddate = new Date((startdate.setMonth(startdate.getMonth() + addMonths)));

    return enddate;
  }

}
