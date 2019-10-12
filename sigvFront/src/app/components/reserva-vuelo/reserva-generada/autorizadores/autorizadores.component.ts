import { Component, OnInit } from '@angular/core';
import { Pruebas } from '../../../../models/IPruebas.model';

@Component({
  selector: 'app-autorizadores',
  templateUrl: './autorizadores.component.html',
  styleUrls: ['./autorizadores.component.sass']
})
export class AutorizadoresComponent implements OnInit {

  listUsers: Pruebas[] = [];

  constructor() { }

  ngOnInit() {
    this.listUsers = [{
      nombre: "lalala",
      centroCosto: "lelele",
      telefono: "lilili",
      email: "lololo@gmail.com"
    },
    {
    nombre: "lalwala",
    centroCosto: "lelewle",
    telefono: "liliwli",
    email: "lololo@gmail.com"
    }]
  }

}
