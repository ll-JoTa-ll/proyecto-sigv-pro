import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "validarEntero",
})
export class ValidarEnteroPipe implements PipeTransform {
  transform(value: any): any {
    console.log("validarEntero");
    console.log(value);

    if (value.includes(".")) {
      return 1;
    } else {
      return 0;
    }
  }
}
