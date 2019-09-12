import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.sass']
})
export class FamiliasComponent implements OnInit {

  @Input() familia;
  @Input() nroPersonas: number;
  currency: string;
  precioTotal: number;
  precioPersona: number;

  constructor() {
    this.currency = "";
    this.precioTotal = 0;
    this.precioPersona = 0;
  }

  ngOnInit() {
    this.precioPersona = this.precioTotal / this.nroPersonas;
  }

}
