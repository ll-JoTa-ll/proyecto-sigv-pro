import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoLongitud'
})
export class FormatoLongitudPipe implements PipeTransform {

  transform(value: any): any {
    let elemento = parseFloat(value);

    return elemento;
  }

}
