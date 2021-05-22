import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ThrowStmt } from '@angular/compiler';
import { VueloFamiliaSectionComponent } from '../../vuelos/familias/vuelo-familia-section/vuelo-familia-section.component';
import { SCREEN_SIZE } from '../../../pipes/screen-size.enum';
import { ResizeService } from '../../../services/resize.service';
import { NgxSpinnerService } from 'ngx-spinner';
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
  isvip;
  cambiar = 0;

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
  ) {
    this.flagTipo = 1;
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.showProfile = this.sessionStorageService.retrieve('ss_profile');
    this.nombreUsuario = this.loginDataUser.userName;
    this.gender = this.loginDataUser.gender;
    this.role = this.loginDataUser.orole.roleDescription;
    if (this.loginDataUser.ocompany != null) {
      this.empresa = this.loginDataUser.ocompany.companyName;
    } else {
      if (this.loginDataUser.oagency) {
        this.empresa = this.loginDataUser.oagency.agencyName;
      }
    }
    this.isvip = this.loginDataUser.vip;
    this.showProfile = false;
  }

  ngOnInit() {
    var z = document.getElementById("profile");
    z.style.display = "none";
  }


  siguiente(){
    if (this.cambiar === 0) {
      var tipo1 = document.getElementById('tipo1');
      var tipo2 = document.getElementById('tipo2');
      var tipo3 = document.getElementById('tipo3');
      var tipo4 = document.getElementById('tipo4');
      tipo1.style.transition = 'all 300ms';
      tipo2.style.transition = 'all 300ms';
      tipo1.style.display = 'none';
      tipo2.style.display = 'none';
      tipo3.style.display = 'block';
      tipo4.style.display = 'block';
      tipo3.style.transition = 'all 300ms';
      tipo4.style.transition = 'all 300ms';
      this.cambiar++;
    } else if (this.cambiar === 1) {
      var tipo1 = document.getElementById('tipo1');
      var tipo2 = document.getElementById('tipo2');
      var tipo3 = document.getElementById('tipo3');
      var tipo4 = document.getElementById('tipo4');
      var tipo5 = document.getElementById('tipo5');
      var tipo6 = document.getElementById('tipo6');
      tipo1.style.transition = 'all 300ms';
      tipo2.style.transition = 'all 300ms';
      tipo1.style.display = 'none';
      tipo2.style.display = 'none';
      tipo3.style.display = 'none';
      tipo4.style.display = 'none';
      tipo3.style.transition = 'all 300ms';
      tipo4.style.transition = 'all 300ms';
      tipo5.style.display = 'block';
      tipo6.style.display = 'block';
      this.cambiar++;
    } else {
      console.log('retraer');
    }

  }

  anterior(){
    if (this.cambiar === 2) {
      var tipo5 = document.getElementById('tipo5');
      var tipo6 = document.getElementById('tipo6');
      var tipo3 = document.getElementById('tipo3');
      var tipo4 = document.getElementById('tipo4');
      tipo5.style.transition = 'all 600ms';
      tipo6.style.transition = 'all 600ms';
      tipo3.style.display = 'block';
      tipo4.style.display = 'block';
      tipo3.style.transition = 'all 600ms';
      tipo4.style.transition = 'all 600ms';
      tipo5.style.display = 'none';
      tipo6.style.display = 'none';
      this.cambiar--;
    } else if (this.cambiar === 1) {
      var tipo1 = document.getElementById('tipo1');
      var tipo2 = document.getElementById('tipo2');
      var tipo3 = document.getElementById('tipo3');
      var tipo4 = document.getElementById('tipo4');
      tipo1.style.transition = 'all 600ms';
      tipo2.style.transition = 'all 600ms';
      tipo1.style.display = 'block';
      tipo2.style.display = 'block';
      tipo3.style.transition = 'all 600ms';
      tipo4.style.transition = 'all 600ms';
      tipo3.style.display = 'none';
      tipo4.style.display = 'none';
      this.cambiar--;
    } else {
      console.log('retraer');
    }

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
    this.flagTipo = valor;

    switch (valor) {

      case 1:
        this.router.navigate(['/vuelos']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        break;

      case 2:
        this.router.navigate(['/hoteles']);
        this.spinner.hide();
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
        clearInterval(this.idinterval1);
        this.sessionStorageService.store('ss_sessionmini', null);
        this.sessionStorageService.store('ss_sessionmini1', null);
        this.sessionStorageService.store('ss_minibuscador', null);
        this.sessionStorageService.store('LoginHotel', null);
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

      case 6:
        console.log('autos');
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
    this.localStorageService.store('ss_credenciales', null);
    this.localStorageService.store('ss_crypto', null);
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
