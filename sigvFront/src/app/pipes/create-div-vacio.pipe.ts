import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "createDivVacio",
})
export class CreateDivVacioPipe implements PipeTransform {
  transform(value: any[], cantidad: number): any {
    return value.filter((x) => x <= cantidad);
  }
}
