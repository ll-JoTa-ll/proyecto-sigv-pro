import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getimghotel'
})
export class GetimghotelPipe implements PipeTransform {

  transform(value: any): any {
    let results;
    let url;
    let limageitem;
    let imgformat;
    let odescriptions;
    let lmultimediadescription;
    odescriptions = value.ODescriptions;

    if (odescriptions === null) {
      return;
    } else {
       lmultimediadescription = odescriptions.OMultimediaDescriptions.LMultimediaDescription;
       results = lmultimediadescription.filter(m => m.OImageItems != null);
       limageitem = results[0].OImageItems.LImageItem[0];
       imgformat = limageitem.LImageFormat[0];
       url = imgformat.url;
      }
    return url;
    }
}
