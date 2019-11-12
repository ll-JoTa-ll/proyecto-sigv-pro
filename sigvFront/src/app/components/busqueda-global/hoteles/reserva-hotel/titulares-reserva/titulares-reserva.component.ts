import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ILoginDatosModel } from '../../../../../models/ILoginDatos.model';
import { SessionStorageService } from 'ngx-webstorage';
import { IGetUserById } from 'src/app/models/IGetUserById.model';

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

  constructor(private sessionStorageService: SessionStorageService) {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.user = this.sessionStorageService.retrieve('ss_user');
   }

  ngOnInit() {
  
  }

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

    validarNumeros(e){
      var tecla = (document.all) ? e.keyCode : e.which;
      if (tecla == 8) return true;
        var patron = /^([0-9])*$/;
        var teclaFinal = String.fromCharCode(tecla);
          return patron.test(teclaFinal);
  }
}
