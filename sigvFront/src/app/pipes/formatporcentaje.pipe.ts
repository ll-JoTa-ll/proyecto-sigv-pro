import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatporcentaje'
})
export class FormatporcentajePipe implements PipeTransform {

  transform(value: any): any {
    let valor = value.toFixed(2);
    return valor;
  }

}
