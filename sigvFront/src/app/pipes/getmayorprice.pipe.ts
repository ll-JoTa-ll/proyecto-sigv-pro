import { Pipe, PipeTransform } from '@angular/core';
import { element } from 'protractor';

@Pipe({
  name: 'getmayorprice'
})
export class GetmayorpricePipe implements PipeTransform {

  transform(value: any[]): any {
    const keys = [];
    return 0;
  }

}
