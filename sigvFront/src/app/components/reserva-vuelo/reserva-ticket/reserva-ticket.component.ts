import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IGenerateTicket } from '../../../models/IGenerateTicket.model';
import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-ticket',
  templateUrl: './reserva-ticket.component.html',
  styleUrls: ['./reserva-ticket.component.sass']
})
export class ReservaTicketComponent implements OnInit , AfterViewInit {

  Lsection;
  lsflightavailability;
  lusers;
  LPolicies;
  ticketresults: IGenerateTicket;

  constructor(private sessionStorageService: SessionStorageService, private router: Router) {
  this.Lsection = this.sessionStorageService.retrieve('sectioninfo');
  this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
  this.lusers = this.sessionStorageService.retrieve('datosusuario');
  this.ticketresults = this.sessionStorageService.retrieve('dataticket');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.bloquearBotonAtras();
    this.LPolicies = this.sessionStorageService.retrieve('politicas');
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

  bloquearBotonAtras() {
      history.pushState(null, null, location.href);
      window.onpopstate = function() {
        history.go(1);
    };
  }

  VolverInicio() {
    this.router.navigate(['/vuelos']);
    this.sessionStorageService.store('indregresar', false);
  }

}
