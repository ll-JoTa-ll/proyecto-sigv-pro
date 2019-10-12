import { Component, OnInit } from '@angular/core';
import { Pruebas } from 'src/app/models/IPruebas.model';

@Component({
  selector: 'app-ex-politicas-infrigidas',
  templateUrl: './ex-politicas-infrigidas.component.html',
  styleUrls: ['./ex-politicas-infrigidas.component.sass']
})
export class ExPoliticasInfrigidasComponent implements OnInit {

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
      nombre: "lala",
      centroCosto: "lele",
      telefono: "lili",
      email: "lolo@gmail.com"
    },
    {
      nombre: "lala",
      centroCosto: "lele",
      telefono: "lili",
      email: "lolo@gmail.com"
    },
    {
      nombre: "lala",
      centroCosto: "lele",
      telefono: "lili",
      email: "lolo@gmail.com"
    },
    {
      nombre: "lala",
      centroCosto: "lele",
      telefono: "lili",
      email: "lolo@gmail.com"
    },
    {
      nombre: "lala",
      centroCosto: "lele",
      telefono: "lili",
      email: "lolo@gmail.com"
    },
    {
      nombre: "lala",
      centroCosto: "lele",
      telefono: "lili",
      email: "lolo@gmail.com"
    }]
  }

}
