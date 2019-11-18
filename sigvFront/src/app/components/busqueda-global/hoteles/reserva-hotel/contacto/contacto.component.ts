import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.sass']
})
export class ContactoComponent implements OnInit {


  @Output() outCorreo = new EventEmitter<string>();
  @Output() outTelefono = new EventEmitter<string>();
  @Output() outNombre = new EventEmitter<string>();
  @Output() outArea = new EventEmitter<string>();

  correo: string;
  telefono: string;
  area: string;
  nombre: string;

  constructor() { }

  ngOnInit() {
  }
  validarLetras(e){
    var tecla = (document.all) ? e.keyCode : e.which;
     if (tecla == 8) return true;
      var patron = /^([a-zA-Z ])*$/;
       var teclaFinal = String.fromCharCode(tecla);
        return patron.test(teclaFinal);
  };

  validarNumeros(e){
    var tecla = (document.all) ? e.keyCode : e.which;
     if (tecla == 8) return true;
      var patron = /^([0-9])*$/;
       var teclaFinal = String.fromCharCode(tecla);
        return patron.test(teclaFinal);
 };

 validarCorreo() {
  let correo = this.correo;
 
  if (correo.length == 3) {
    correo += '' ;
    this.correo = correo;
  }
  this.outCorreo.emit(this.correo)
}

validarTelefono() {
  let telefono = this.telefono;
 
  if (telefono.length == 3) {
    telefono += '' ;
    this.telefono = telefono;
  }
  this.outTelefono.emit(this.telefono)
}

validarNombre() {
  let nombre = this.nombre;
 
  if (nombre.length == 3) {
    nombre += '' ;
    this.nombre = nombre;
  }
  this.outNombre.emit(this.nombre)
}

validarArea() {
  let area = this.area;
 
  if (area.length == 3) {
    area += '' ;
    this.area = area;
  }
  this.outArea.emit(this.area)
}

}
