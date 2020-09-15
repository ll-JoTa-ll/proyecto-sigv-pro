import { Pipe, PipeTransform } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Pipe({
  name: 'key'
})
export class KeyPipe implements PipeTransform {

  constructor(private sessionStorageService: SessionStorageService){

  }

  transform(value: any, ...args: any[]): any {
    const keys = [];
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key];
        keys.push(key);
      }
    }
    this.sessionStorageService.store('ss_keys', keys);
    return keys;
  }

}
