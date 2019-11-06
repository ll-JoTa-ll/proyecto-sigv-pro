import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getimghotel'
})
export class GetimghotelPipe implements PipeTransform {

  transform(value: any): any {
    let img;
    if (value.length > 0) {
      for (let i = 0; i < value.length; i++) {
        const element = value[i];
        img = element.url;
      }
    } else {
      img = '/assets/images/imagenotfound.jfif';
    }
   
/*
    if (odescriptions === null) {
      return;
    } else {
       lmultimediadescription = odescriptions.OMultimediaDescriptions.LMultimediaDescription;
       results = lmultimediadescription.filter(m => m.OImageItems != null);
       if (results.length === 0) {
         url = '/assets/images/imagenotfound.jfif';
       } else {
        limageitem = results[0].OImageItems.LImageItem[0];
        imgformat = limageitem.LImageFormat[0];
        url = imgformat.url;
       }
      }
    return url;
    */
   return img;
    }
}
