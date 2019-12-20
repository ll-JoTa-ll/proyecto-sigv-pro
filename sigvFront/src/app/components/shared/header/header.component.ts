import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
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

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService
  ) {
    this.flagTipo = 1;
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.nombreUsuario = this.loginDataUser.userName;
    this.gender = this.loginDataUser.gender;
    this.role = this.loginDataUser.orole.roleDescription;
    this.empresa = this.loginDataUser.ocompany.companyName;

  }

  ngOnInit() {
  }

  cambiarTipo(valor) {
    console.log(valor);
    this.flagTipo = valor;

    switch (valor) {

      case 1:
        this.router.navigate(['/vuelos']);
        break;

      case 2:
        this.router.navigate(['/hoteles']);
        let idinterval = this.sessionStorageService.retrieve('idinterval');
        clearInterval(idinterval);
        break;

      case 3:
        this.router.navigate(['/buses']);
        break;

      case 4:
        this.router.navigate(['/paquetes']);
        break;

      case 5:
        this.router.navigate(['/seguros']);
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
    let idinterval = this.sessionStorageService.retrieve('idinterval');
    clearInterval(idinterval);
    this.sessionStorageService.store('count', null);
  }

  vuelos() {
/*
    let url: any;
    url = window.location.href + '/vuelos';
    window.location.reload(url);*/
    this.sessionStorageService.store('indregresar', false);
    $(location).attr('href', '/vuelos');
    let idinterval = this.sessionStorageService.retrieve('idinterval');
    clearInterval(idinterval);
    this.sessionStorageService.store('count', null);
  }

  cerrarSesion() {
    let idinterval = this.sessionStorageService.retrieve('idinterval');
    clearInterval(idinterval);
    this.sessionStorageService.store('count', null);
    this.sessionStorageService.clear();
    this.router.navigate(['/']);
  }

}
