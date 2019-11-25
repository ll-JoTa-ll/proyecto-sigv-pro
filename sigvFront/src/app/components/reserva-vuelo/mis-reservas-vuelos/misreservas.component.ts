import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { SessionStorageService } from 'ngx-webstorage';
import { IReservaModel } from '../../../models/iReserva.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { iGetReservation } from '../../../models/IGetReservation.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './misreservas.component.html',
  styleUrls: ['./misreservas.component.sass']
})
export class MisReservasVueloComponent implements OnInit, AfterViewInit {
  lsreservas: IReservaModel[] = [];
  getreserva: iGetReservation;
  loginDataUser;
  listadoreserva;
  p: number[] = [];

  constructor(private service: AirportService,
              private sessionstorage: SessionStorageService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.loginDataUser = this.sessionstorage.retrieve('ss_login_data');
  }

  ngOnInit() {
    this.ObtenerReservas();
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

  ObtenerReservas() {
    this.spinner.show();
    const data = {
      Id: this.loginDataUser.userId
    }
    this.service.ListaReservas(data.Id).subscribe(
      results => {
           this.lsreservas = results;
           this.sessionstorage.store('listreservas', this.lsreservas);
           this.listadoreserva = this.sessionstorage.retrieve('listreservas');
           this.spinner.hide();
      },
      err => {
      console.log(err);
      }
    );
}

GetReserva(pnr, pseudo) {
  this.spinner.show();
  const data = {
    "UserId": this.loginDataUser.userId,
    "Pnr": pnr,
    "Pseudo": pseudo,
    "Ocompany": this.loginDataUser.ocompany
  }
  this.service.GetReservation(data).subscribe(
    result => {
     this.getreserva = result;
     this.sessionstorage.store('getreserva', this.getreserva);
     this.router.navigate(['/aprobar-reserva-vuelo']);
    },
    err => {
    },
    () => {
     this.spinner.hide();
    }
  );
}

FiltrarTodos() {
  this.ObtenerReservas();
}

FiltrarPendientes() {
  let listado = this.listadoreserva;
  let results;
  results = listado.filter(m => (m.ostate.stateId === 1 || m.ostate.stateId === 2));
  this.lsreservas = results;
}

FiltrarEmitidos() {
  let listado = this.listadoreserva;
  let results;
  results = listado.filter(m => m.ostate.stateId === 4 || m.ostate.stateId === 6);
  this.lsreservas = results;
}

FiltrarCancelados() {
  let listado = this.listadoreserva;
  let results;
  results = listado.filter(m => m.ostate.stateId === 3 || m.ostate.stateId === 5 || m.ostate.stateId === 7);
  this.lsreservas = results;
}
}
