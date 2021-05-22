import { Component, OnInit, AfterViewInit } from '@angular/core';
import { IPnrConfirm } from '../../../models/IPnrConfirm.model';
import { SessionStorageService } from 'ngx-webstorage';
import { AirportService } from '../../../services/airport.service';
import { Router, RouterLinkActive } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-generada',
  templateUrl: './reserva-generada.component.html',
  styleUrls: ['./reserva-generada.component.sass']
})
export class ReservaGeneradaComponent implements OnInit, AfterViewInit {

  lspnrresults: IPnrConfirm;
  Lsection;
  lsflightavailability;
  LPolicies;
  dataflightavalilability;
  lusers;
  lsapprover;
  fechatimelimit;
  horatimelimit;
  loginDataUser;
  timelimitShow;
  texto = 'Solo tienes hasta:';

  constructor(private sessionStorageService: SessionStorageService, private service: AirportService, private router: Router) {
     this.lspnrresults = this.sessionStorageService.retrieve('datapnr');
     this.timelimitShow = this.lspnrresults.timeLimitShow;
     this.Lsection = this.sessionStorageService.retrieve('sectioninfo');
     this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
     this.dataflightavalilability = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
     this.lusers = this.sessionStorageService.retrieve('objusuarios');
     this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.bloquearBotonAtras();
    this.LPolicies = this.sessionStorageService.retrieve('politicas');
    this.lsapprover = this.sessionStorageService.retrieve('lsapprover');
    if (this.lsapprover != null && this.lsapprover.length > 0) {
      this.texto = "Los aprobadores solo tienen hasta:";
    } 
    if (this.lsapprover === null) {
      this.lsapprover = [];
    }
    if (this.LPolicies === null) {
      this.LPolicies = [];
    }
    this.FormatearFechaPnr();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit vuelos');
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

  FormatearFechaPnr() {
    let data;
    let recorte;
    let fecha;
    let hora;
    data = this.lspnrresults.timeLimitShow;
    this.fechatimelimit = data;
  }

  bloquearBotonAtras() {
    if (this.lspnrresults.pnr != null) {
      history.pushState(null, null, location.href);
      window.onpopstate = function() {
        history.go(1);
    };
    }
  }

  Cerrar() {
  if (this.loginDataUser.orole.roleDescription === 'Centralizador') {
    this.router.navigate(['/vuelos']);
  }

  if (this.loginDataUser.orole.roleDescription === 'Autorizador') {
    this.router.navigate(['/vuelos']);
  }

  if (this.loginDataUser.orole.roleDescription === 'Autogestión') {
    this.router.navigate(['/vuelos']);
  }

  if (this.loginDataUser.orole.roleDescription === 'Usuario') {
    this.router.navigate(['/vuelos']);
  }
  }

}
