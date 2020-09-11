import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'key'
})
export class KeyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const keys = [];
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        keys.push(key);
      }
    }
    return keys;
  }

}
