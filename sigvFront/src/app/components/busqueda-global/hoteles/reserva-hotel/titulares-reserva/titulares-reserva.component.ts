import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ILoginDatosModel } from '../../../../../models/ILoginDatos.model';
import { SessionStorageService } from 'ngx-webstorage';
import { IGetUserById } from 'src/app/models/IGetUserById.model';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-titulares-reserva',
  templateUrl: './titulares-reserva.component.html',
  styleUrls: ['./titulares-reserva.component.sass']
})
export class TitularesReservaComponent implements OnInit {

  loginDataUser: ILoginDatosModel;
  user : IGetUserById;

  @Output() outCorreo = new EventEmitter<string>();
  @Output() outTelefono = new EventEmitter<string>();

  @Input() index;

  correo: string;
  telefono: string;
  corr: string;

  constructor(private sessionStorageService: SessionStorageService) {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.user = this.sessionStorageService.retrieve('ss_user');
   }

  ngOnInit() {
    console.log("this.user.email ==>"+this.user.email);
    console.log("this.user.email ==>"+this.user.email);
    console.log("this.user.email ==>"+this.user.email);
    console.log("this.user.email ==>"+this.user.email);
    console.log("this.user.email ==>"+this.user.email);
  }

  validarCorreo() {
    let correo = $("#correoTitu").val();
    this.outCorreo.emit(correo)
  }

  validarTelefono() {
    let telefono = $("#fonoTitu_").val();
    this.outTelefono.emit(telefono)
  }

    validarNumeros(e){
      var tecla = (document.all) ? e.keyCode : e.which;
      if (tecla == 8) return true;
        var patron = /^([0-9])*$/;
        var teclaFinal = String.fromCharCode(tecla);
          return patron.test(teclaFinal);
  }

  obtenercodigo(value) {
    $("#hdnTel_").val(value);
    let valor = $('#cbopaises option:selected').attr('data-countryCode');
    console.log(valor);
    if (valor === 'CO') {
       $('#fonoTitu').attr('maxlength', '10');
    }
    if (valor === 'PA') {
      $('#fonoTitu').attr('maxlength', '8');
   }
    if (valor === 'PE') {
    $('#fonoTitu').attr('maxlength', '10');
    }
    if (valor === 'AR') {
      $('#fonoTitu').attr('maxlength', '13');
      }
    if (valor === 'EC') {
        $('#fonoTitu').attr('maxlength', '10');
      }
    if (valor === 'PY') {
          $('#fonoTitu').attr('maxlength', '10');
      }
    if (valor === 'UY') {
        $('#fonoTitu').attr('maxlength', '9');
    } 
    if (valor === 'VE') {
      $('#fonoTitu').attr('maxlength', '11');
  } 
    if (valor === 'CL') {
    $('#fonoTitu').attr('maxlength', '9');
  } 
    if (valor === 'BR') {
  $('#fonoTitu').attr('maxlength', '11');
  } 
    if (valor === 'BO') {
  $('#fonoTitu').attr('maxlength', '8');
  } 
    if (valor === 'US') {
  $('#fonoTitu').attr('maxlength', '10');
  } 
    if (valor === 'MX') {
  $('#fonoTitu').attr('maxlength', '13');
  }
    if (valor === 'CA') {
  $('#fonoTitu').attr('maxlength', '10');
  }
    if (valor === 'CR') {
  $('#fonoTitu').attr('maxlength', '8');
  }
    if (valor === 'CU') {
  $('#fonoTitu').attr('maxlength', '9');
  }
  }
}
