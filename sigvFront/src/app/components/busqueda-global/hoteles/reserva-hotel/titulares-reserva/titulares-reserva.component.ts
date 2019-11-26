import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
    let telefono = $("#fonoTitu").val();
    this.outTelefono.emit(telefono)
  }

    validarNumeros(e){
      var tecla = (document.all) ? e.keyCode : e.which;
      if (tecla == 8) return true;
        var patron = /^([0-9])*$/;
        var teclaFinal = String.fromCharCode(tecla);
          return patron.test(teclaFinal);
  }
}
