import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getMenorPrecio'
})
export class GetMenorPrecioPipe implements PipeTransform {

  transform(value: any[]): any {
    let menorValor = 1000000;

    value.map(function(item){
      if (parseFloat(item.priceProm) < menorValor) {
        menorValor = parseFloat(item.priceProm);
      }
    });

    return menorValor.toFixed(2);
  }

}
