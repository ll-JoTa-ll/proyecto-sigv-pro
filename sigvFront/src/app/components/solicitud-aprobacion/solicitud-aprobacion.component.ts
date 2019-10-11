import { Component, OnInit } from '@angular/core';
import { Pasajeros } from '../../models/IPasajeros.model';
import { Pruebas } from '../../models/IPruebas.model';

@Component({
  selector: 'app-solicitud-aprobacion',
  templateUrl: './solicitud-aprobacion.component.html',
  styleUrls: ['./solicitud-aprobacion.component.sass']
})
export class SolicitudAprobacionComponent implements OnInit {

  constructor() { }

  listPasajeros: Pasajeros[] = [];
  listUsers: Pruebas[] = [];

  ngOnInit() {
    this.listPasajeros = [{
      nombres: "Juan Caro",
      apellidos: "Juan Caro",
      email: "jcaro@gmail.com"
    }]
    this.listUsers = [{
      nombre: "Maria Claudia Terrones Chavez",
      centroCosto: "IBANE-004",
      telefono: "90212615",
      email: "jcaro@gmail.com"
    }]
  }

}
