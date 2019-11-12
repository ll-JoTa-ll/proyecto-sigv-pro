import { Component, OnInit } from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IReservaModel } from '../../../models/iReserva.model';
import { iGetReservation } from '../../../models/IGetReservation.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-gestion-reserva-vuelo',
  templateUrl: './gestion-reserva-vuelo.component.html',
  styleUrls: ['./gestion-reserva-vuelo.component.sass']
})
export class GestionReservaVueloComponent implements OnInit {

  lsreservas: IReservaModel[] = [];
  getreserva: iGetReservation;
  loginDataUser;
  omessage;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  listadoreserva;
  p: number[] = [];

  constructor(private service: AirportService,
              private sessionstorage: SessionStorageService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private modalservice: BsModalService) {
                this.loginDataUser = this.sessionstorage.retrieve('ss_login_data');
              }

  ngOnInit() {
    this.ObtenerReservas();
  }

  ObtenerReservas() {
    this.spinner.show();
    const data = {
      Id: this.loginDataUser.userId
    }
    this.service.ListaReservasAutorizador(data.Id).subscribe(
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

GetReserva(pnr, pseudo ,template) {
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

FiltrarAprobados() {
  let listado = this.listadoreserva;
  let results;
  results = listado.filter(m => m.ostate.stateId === 2);
  this.lsreservas = results;
}

FiltrarTodos() {
  this.ObtenerReservas();
}

FiltrarPendientes() {
  let listado = this.listadoreserva;
  let results;
  results = listado.filter(m => m.ostate.stateId === 1);
  this.lsreservas = results;
}

}
