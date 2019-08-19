import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda-global',
  templateUrl: './busqueda-global.component.html',
  styleUrls: ['./busqueda-global.component.sass']
})
export class BusquedaGlobalComponent implements OnInit {

  flagTipo: number;

  constructor() {
    this.flagTipo = 1;
  }

  ngOnInit() {
  }

  cambiarTipo(valor) {
    this.flagTipo = valor;
  }

}
