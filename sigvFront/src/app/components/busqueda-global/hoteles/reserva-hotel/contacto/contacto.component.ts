import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

declare var jquery: any;
declare var $: any;


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
  inderror: boolean;
  logindata;

  constructor(private sessionStorageService: SessionStorageService) {

   }

  ngOnInit() {
    this.logindata = this.sessionStorageService.retrieve('ss_login_data');
    this.validContact();
  }

  validContact(){
    if(this.logindata.ocompany.ocompanyConfiguration.crossSellingHotel === true && this.logindata.orole.roleId === 1){
      this.correo = this.logindata.email;
      this.nombre = this.logindata.userName + ' ' + this.logindata.userLastName;
      this.telefono = this.logindata.phoneNumber;
    }
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
  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if ($('#correo').val().length <= 0) {
    $('#correo').addClass('campo-invalido');
  } else {
    $('#correo').removeClass('campo-invalido');
  }
  if (regex.test($('#correo').val().trim())) {
    this.inderror = false;
  } else {
    this.inderror = true;
  }
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
    telefono += '';
    this.telefono = telefono;
  }

  this.outTelefono.emit(this.telefono);
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


obtenercodigo(value) {
  $("#hdnTel_").val(value);
  let valor = $('#cbopaises option:selected').attr('data-countryCode');
  if (valor === 'CO') {
     $('#numero').attr('maxlength', '10');
  }
  if (valor === 'PA') {
    $('#numero').attr('maxlength', '8');
 }
  if (valor === 'PE') {
  $('#numero').attr('maxlength', '10');
  }
  if (valor === 'AR') {
    $('#numero').attr('maxlength', '13');
    }
  if (valor === 'EC') {
      $('#numero').attr('maxlength', '10');
    }
  if (valor === 'PY') {
        $('#numero').attr('maxlength', '10');
    }
  if (valor === 'UY') {
      $('#numero').attr('maxlength', '9');
  }
  if (valor === 'VE') {
    $('#numero').attr('maxlength', '11');
}
  if (valor === 'CL') {
  $('#numero').attr('maxlength', '9');
}
  if (valor === 'BR') {
$('#numero').attr('maxlength', '11');
}
  if (valor === 'BO') {
$('#numero').attr('maxlength', '8');
}
  if (valor === 'US') {
$('#numero').attr('maxlength', '10');
}
  if (valor === 'MX') {
$('#numero').attr('maxlength', '13');
}
  if (valor === 'CA') {
$('#numero').attr('maxlength', '10');
}
  if (valor === 'CR') {
$('#numero').attr('maxlength', '8');
}
  if (valor === 'CU') {
$('#numero').attr('maxlength', '9');
}
}
}


