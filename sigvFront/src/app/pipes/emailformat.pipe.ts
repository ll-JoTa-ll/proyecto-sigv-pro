import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailformat'
})
export class EmailformatPipe implements PipeTransform {

  transform(value: any): any {
    let email;
    let email1;
    email = value.split(';');
    email = email[0];
    return email;
  }

}
