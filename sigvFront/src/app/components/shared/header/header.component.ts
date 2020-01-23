import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ThrowStmt } from '@angular/compiler';
import { VueloFamiliaSectionComponent } from '../../vuelos/familias/vuelo-familia-section/vuelo-familia-section.component';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  flagTipo: number;
  nombreUsuario: string;
  gender: string;
  loginDataUser;
  role;
  empresa;
  myWindow;
  @Output() buscar = new EventEmitter<any>();
  closedSesion: boolean;
  idinterval: any;
  idinterval1: any;
  showProfile: any;

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService
  ) {
    this.flagTipo = 1;
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.showProfile = this.sessionStorageService.retrieve('ss_profile');
    this.nombreUsuario = this.loginDataUser.userName;
    this.gender = this.loginDataUser.gender;
    this.role = this.loginDataUser.orole.roleDescription;
    this.empresa = this.loginDataUser.ocompany.companyName;
    this.showProfile = false;
      
  }

  ngOnInit() {
    var z = document.getElementById("profile");
    z.style.display = "none";
  }

  changeProfile(){
    var z = document.getElementById("profile");
    z.style.display = "block";
  }

  noneProfile(){
    var z = document.getElementById("profile");
    z.style.display = "none";
  }

  cambiarTipo(valor) {
    console.log(valor);
    this.flagTipo = valor;

    switch (valor) {

      case 1:
        this.router.navigate(['/vuelos']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        break;

      case 2:
        this.router.navigate(['/hoteles']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
        clearInterval(this.idinterval1);
        this.sessionStorageService.store('ss_sessionmini', null);
        this.sessionStorageService.store('ss_sessionmini1', null);
        this.sessionStorageService.store('ss_minibuscador', null);
        this.sessionStorageService.store('ss_lhotel', null);
        this.sessionStorageService.store('ss_hotel', null);
        break;

      case 3:
        this.router.navigate(['/buses']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
        clearInterval(this.idinterval1);
        break;

      case 4:
        this.router.navigate(['/paquetes']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
        clearInterval(this.idinterval1);
        break;

      case 5:
        this.router.navigate(['/seguros']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
        clearInterval(this.idinterval1);
        break;

    }
  }

  home() {
    /*
    let url: any;
    url = window.location.href;
    window.location.reload(url);*/
    this.sessionStorageService.store('indregresar', false);
    $(location).attr('href', '/vuelos');
    this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
    clearInterval(this.idinterval1);
    this.idinterval = this.sessionStorageService.retrieve("ss_interval");
    clearInterval(this.idinterval);
    this.sessionStorageService.store('count', null);
  }

  hoteles(){
    $(location).attr('href', '/hoteles');
    this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
    clearInterval(this.idinterval1);
    this.idinterval = this.sessionStorageService.retrieve("ss_interval");
    clearInterval(this.idinterval);
  }

  vuelos() {
/*
    let url: any;
    url = window.location.href + '/vuelos';
    window.location.reload(url);*/
    this.sessionStorageService.store('indregresar', false);
    $(location).attr('href', '/vuelos');
    this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
    clearInterval(this.idinterval1);
    this.idinterval = this.sessionStorageService.retrieve("ss_interval");
    clearInterval(this.idinterval);
    this.sessionStorageService.store('count', null);
    this.sessionStorageService.store('indregresar', null);
  }

  cerrarSesion() {
    this.idinterval = this.sessionStorageService.retrieve("ss_interval");
    clearInterval(this.idinterval);
    this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
    clearInterval(this.idinterval1);
    this.sessionStorageService.store('count', null);
    this.sessionStorageService.clear();
    this.closedSesion = false;
    this.localStorageService.store("ss_closedSesion", this.closedSesion);
    //this.router.navigate(['/']);
    location.href = "/";
  }

 

}
