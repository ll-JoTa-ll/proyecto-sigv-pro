import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { SessionStorageService } from 'ngx-webstorage';
import { IReservaModel } from '../../../models/iReserva.model';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { iGetReservation } from '../../../models/IGetReservation.model';
import { IGetReservationHotel } from '../../../models/IGetReservationHotel.model';
import { HotelService } from '../../../services/hotel.service';
import { IGetReservaDetalleHotel } from '../../../models/IGetReservaDetalleHotel.model';

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
  getreservahotel: IGetReservationHotel[] = [];
  gethotel: IGetReservaDetalleHotel;
  loginDataUser;
  listadoreserva;
  listadoreservahotel;
  p: number[] = [];

  constructor(private service: AirportService,
              private serviceHotel: HotelService,
              private sessionstorage: SessionStorageService,
              private router: Router,
              private spinner: NgxSpinnerService) {
    this.loginDataUser = this.sessionstorage.retrieve('ss_login_data');
  }

  ngOnInit() {
    this.ObtenerReservas();
    this.ObtenerReservasHoteles();
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

ObtenerReservasHoteles(){
  this.spinner.show();
  const data = {
    Id: this.loginDataUser.userId
  }
  this.serviceHotel.ListaReservas(data.Id).subscribe(
    results => {
        this.getreservahotel = results;
        this.sessionstorage.store('ss_listreservashotel',this.getreservahotel);
        this.listadoreservahotel = this.sessionstorage.retrieve('ss_listreservashotel');
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

GetReservaHotel(pnr){
  this.spinner.show();
  const data = {
    "UserId": this.loginDataUser.userId,
    "Pnr": pnr,
  }
  this.serviceHotel.GetReservationHotel(data).subscribe(
    result => {
      this.gethotel = result;
      this.sessionstorage.store('ss_getreservahotel',this.gethotel);
      this.router.navigate(['/detalle-reserva-hotel']);
    },
    err => {
    },
    () => {
      this.spinner.hide();
    }
  );
}

ShowVuelos(){
  var z = document.getElementById("todos");
  var x = document.getElementById("hoteles");
  var q = document.getElementById("vuelos");
  x.style.display = "none";
  q.style.display = "block";
  z.style.display = "none";
}

ShowHoteles(){
  var x = document.getElementById("hoteles");
  var q = document.getElementById("vuelos");
  var z = document.getElementById("todos");
  x.style.display = "block";
  q.style.display = "none";
  z.style.display = "none";
}

ShowAll(){
  var x = document.getElementById("hoteles");
  var q = document.getElementById("vuelos");
  var z = document.getElementById("todos");
  x.style.display = "none";
  q.style.display = "none";
  z.style.display = "block";
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
