import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router, RouterLinkActive } from '@angular/router';
import { IPnrConfirm } from 'src/app/models/IPnrConfirm.model';
import { AirportService } from 'src/app/services/airport.service';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
import { BsModalRef } from 'ngx-bootstrap/modal';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-generada-vuelo-hotel',
  templateUrl: './reserva-generada-vuelo-hotel.component.html',
  styleUrls: ['./reserva-generada-vuelo-hotel.component.sass']
})
export class ReservaGeneradaVueloHotelComponent implements OnInit, AfterViewInit {

  lspnrresults: IPnrConfirm;
  lspnrresultsHotel: any;
  lspnrresultsVuelo: IPnrConfirm;
  Lsection;
  lsflightavailability;
  LPolicies;
  dataflightavalilability;
  lusers;
  lsapprover;
  fechatimelimit;
  horatimelimit;
  loginDataUser;

  // precio final
  precioadulto: number;
  preciototal: number;
  currency: string;
  Lpolicies: string;
  tipo: number;
  LSection;
  Litineraries;
  montodesc;
  porcentajedesc;
  odiscount;
  hotel?: IGetEnhancedHotel;
  porcentaje;
  lstbag: any;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  modalService: any;
  //  pasajero
  datosuser: any;
  // tslint:disable-next-line: variable-name
  flightAvailability_result: any;
  idmotivo: any;
  vuelo: any;
  tipovuelo: any;
  hotelSelected: any;
  lhotel: any;
  pseudo: any;
  gds: any;
  osession: any;
  carrierId: any;
  ocompany: any;
  numberpassengers: any;
  flightnational: any;

  constructor(private sessionStorageService: SessionStorageService, private service: AirportService, private router: Router) {
    this.lspnrresultsHotel = this.sessionStorageService.retrieve('datapnrHotel');
    this.lspnrresultsVuelo = this.sessionStorageService.retrieve('datapnrVuelo');
    console.log(this.sessionStorageService.retrieve('dataticket'));
    this.Lsection = this.sessionStorageService.retrieve('sectioninfo');
    this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.dataflightavalilability = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.lusers = this.sessionStorageService.retrieve('objusuarios');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.datosuser = sessionStorageService.retrieve('objusuarios');
  }

  ngOnInit() {
    $(".x").hide();
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('.menu-hotel-1').show();
    $('.menu-hotel-2').hide();
    $('.menu-bus-1').show();
    $('.menu-bus-2').hide();
    $('.menu-paquete-1').show();
    $('.menu-paquete-2').hide();
    $('.menu-seguro-1').show();
    $('.menu-seguro-2').hide();
    window.scrollTo(0, 0);
    this.bloquearBotonAtras();
    this.LPolicies = this.sessionStorageService.retrieve('politicas');
    this.lsapprover = this.sessionStorageService.retrieve('lsapprover');
    if (this.lsapprover === null) {
      this.lsapprover = [];
    }
    this.initFligth();
    // this.FormatearFechaPnr();
  }

  ngAfterViewInit() {
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

  initFligth() {
    this.vuelo = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.flightAvailability_result = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.dataflightavalilability = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.idmotivo = this.sessionStorageService.retrieve('idmotivo');
    this.LSection = this.vuelo.Lsections;
    this.tipovuelo = this.sessionStorageService.retrieve('tipovuelo');
    this.LPolicies = this.flightAvailability_result.lpolicies;
    this.hotelSelected = this.sessionStorageService.retrieve("confirmacion");
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
    this.lstbag = this.flightAvailability_result.lsectionBaggages;
    this.currency = this.dataflightavalilability.Currency;
    this.pseudo = this.dataflightavalilability.Pseudo;
    this.gds = this.dataflightavalilability.Gds;
    this.osession = this.lsflightavailability.osession;
    this.carrierId = this.dataflightavalilability.CarrierId;
    this.ocompany = this.dataflightavalilability.Ocompany;
    this.numberpassengers = this.dataflightavalilability.NumberPassengers;
    this.flightnational = this.dataflightavalilability.FlightNational;
    this.sessionStorageService.store('count', false);
  }

  FormatearFechaPnr() {
    let data;
    let recorte;
    let fecha;
    let hora;
    data = this.lspnrresults.timeLimit;
    recorte = data.split('T');
    fecha = recorte[0];
    let date = new Date(fecha);
    hora = recorte[1];
    recorte = fecha.split('-');
    fecha = (recorte[2] + ' ' + date.toLocaleString('default', { month: 'short' }) + 'del' + recorte[0]);
    hora = hora.substr(0, 5);
    this.fechatimelimit = fecha;
    this.horatimelimit = hora;
  }

  bloquearBotonAtras() {
    if (this.lspnrresults) {
      if (this.lspnrresults.pnr != null) {
        history.pushState(null, null, location.href);
        // tslint:disable-next-line: only-arrow-functions
        window.onpopstate = function () {
          history.go(1);
        };
      }
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg m-infraccion' })
    );
  }
  Cerrar() {
    if (this.loginDataUser.orole.roleDescription === 'Centralizador') {
      this.router.navigate(['/gestion-reserva-vuelo']);
    }

    if (this.loginDataUser.orole.roleDescription === 'Autorizador') {
      this.router.navigate(['/mis-reservas-vuelo']);
    }

    if (this.loginDataUser.orole.roleDescription === 'Usuario') {
      this.router.navigate(['/mis-reservas-vuelo']);
    }
  }

}
