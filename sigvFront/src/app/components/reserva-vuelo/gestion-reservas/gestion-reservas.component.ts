import { Component, OnInit } from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { SessionStorageService } from 'ngx-webstorage';
import { IReservaModel } from '../../../models/iReserva.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-reservas',
  templateUrl: './gestion-reservas.component.html',
  styleUrls: ['./gestion-reservas.component.sass']
})
export class GestionReservasComponent implements OnInit {
  lsreservas: IReservaModel[] = [];
  loginDataUser;

  constructor(private service: AirportService, private sessionstorage: SessionStorageService, private router: Router) {
    this.loginDataUser = this.sessionstorage.retrieve('ss_login_data');
  }

  ngOnInit() {
    this.ObtenerReservas();
  }

  ObtenerReservas() {
    let data = {
      Id: this.loginDataUser.userId
    }
    this.service.ListaReservas(data.Id).subscribe(
      results => {
           this.lsreservas = results;
      },
      err => {
      console.log(err);
      }
    )
}

GetReserva() {
  this.router.navigate(['/aprobar-reserva']);
}
}