import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-reserva-ticket',
  templateUrl: './reserva-ticket.component.html',
  styleUrls: ['./reserva-ticket.component.sass']
})
export class ReservaTicketComponent implements OnInit {

  Lsection;
  lsflightavailability;
  lusers;
  LPolicies;

  constructor(private sessionStorageService: SessionStorageService) {
  this.Lsection = this.sessionStorageService.retrieve('sectioninfo');
  this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
  this.lusers = this.sessionStorageService.retrieve('datosusuario');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.bloquearBotonAtras();
    this.LPolicies = this.sessionStorageService.retrieve('politicas');
  }

  bloquearBotonAtras() {
      history.pushState(null, null, location.href);
      window.onpopstate = function() {
        history.go(1);
    };
  }

}
