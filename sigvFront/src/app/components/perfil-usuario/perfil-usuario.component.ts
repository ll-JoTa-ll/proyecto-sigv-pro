import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalCambiarPasswordComponent } from '../shared/modal-cambiar-password/modal-cambiar-password.component';


declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.sass']
})
export class PerfilUsuarioComponent implements OnInit, AfterViewInit {

  closedSesion: boolean;
  idinterval: any;
  idinterval1: any;
  gender: string;
  loginDataUser;
  genero;
  modalRefSessionExpired: BsModalRef;

  constructor(private sessionStorageService: SessionStorageService,private localStorageService: LocalStorageService,private modalService: BsModalService) {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.gender = this.loginDataUser.gender;
    if (this.loginDataUser.gender === 'M') {
      this.genero = "Masculino";
    }else{
      this.genero = "Femenino";
    }
   }

  ngOnInit() {
    this.idinterval = this.sessionStorageService.retrieve("ss_interval");
    clearInterval(this.idinterval);
    this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
    clearInterval(this.idinterval1);
  }

  ngAfterViewInit() {
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
    }

    cambiarPassword(){
      this.modalRefSessionExpired = this.modalService.show(ModalCambiarPasswordComponent);
    }
  

}
