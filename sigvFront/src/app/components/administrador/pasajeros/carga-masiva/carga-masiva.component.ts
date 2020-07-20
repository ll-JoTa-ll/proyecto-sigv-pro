import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.sass']
})
export class CargaMasivaComponent implements OnInit, AfterViewInit {

  fileToUpload;
  nameFile = "Seleccionar Archivo";
  extFile = "";

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
  }

  onFileChange(event: any) {
    let fi = event.srcElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      const nameFile = fileToUpload.name;
      const lastDot = nameFile.lastIndexOf('.');
      const fileName = nameFile.substring(0, lastDot);
      const ext = nameFile.substring(lastDot + 1);
      this.extFile = ext;
      console.log("ext:" + ext);
      if (ext === "xlsx" || ext === "xls" || ext === "csv") {
        this.fileToUpload = fileToUpload;
        this.nameFile = nameFile;
      } else {
        alert("Formato incorrecto");
      }
    }
  }

  onSubmit() {
    console.log(this.fileToUpload);
    if (this.fileToUpload === undefined) {
      alert("Seleccione un archivo!!!")
    }
    const formData = new FormData();
    formData.append(this.nameFile, this.fileToUpload);
  }

}
