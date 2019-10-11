import { Component, OnInit } from '@angular/core';
import { Pasajeros } from 'src/app/models/IPasajeros.model';


@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styleUrls: ['./pasajeros.component.sass']
})
export class PasajerosComponent implements OnInit {

  listPasajeros: Pasajeros[] = [];

  constructor() { }

  ngOnInit() {
    this.listPasajeros = [{
      nombres: "lalala",
      apellidos: "lelele",
      email: "lololo@gmail.com"
    }]
  }

}
