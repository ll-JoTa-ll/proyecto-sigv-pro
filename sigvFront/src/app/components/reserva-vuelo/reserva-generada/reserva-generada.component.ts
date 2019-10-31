import { Component, OnInit } from '@angular/core';
import { IPnrConfirm } from '../../../models/IPnrConfirm.model';
import { SessionStorageService } from 'ngx-webstorage';
import { AirportService } from '../../../services/airport.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva-generada',
  templateUrl: './reserva-generada.component.html',
  styleUrls: ['./reserva-generada.component.sass']
})
export class ReservaGeneradaComponent implements OnInit {

  lspnrresults: IPnrConfirm;
  Lsection;
  lsflightavailability;
  LPolicies;
  dataflightavalilability;
  lusers;
  lsapprover;
  fechatimelimit;
  horatimelimit;

  constructor(private sessionStorageService: SessionStorageService, private service: AirportService, private router: Router) {
     this.lspnrresults = this.sessionStorageService.retrieve('datapnr');
     this.Lsection = this.sessionStorageService.retrieve('sectioninfo');
     this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
     this.dataflightavalilability = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
     this.lusers = this.sessionStorageService.retrieve('lsuser');
  }

  ngOnInit() {
    this.LPolicies = this.sessionStorageService.retrieve('politicas');
    this.lsapprover = this.sessionStorageService.retrieve('lsapprover');
    this.FormatearFechaPnr();
  }

  FormatearFechaPnr() {
    let data;
    let fecha;
    let hora;
    data = this.lspnrresults.timeLimit;
    fecha = data.substr(0, 10);
    hora =  data.substr(11, 16);
    this.fechatimelimit = fecha;
    this.horatimelimit = hora;
  }

}
