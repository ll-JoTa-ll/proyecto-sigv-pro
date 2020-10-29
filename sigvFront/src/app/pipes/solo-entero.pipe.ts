import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "soloEntero",
})
export class SoloEnteroPipe implements PipeTransform {
  transform(value: any): any {
    return null;
  }
}
