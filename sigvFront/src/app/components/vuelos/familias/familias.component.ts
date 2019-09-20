import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.sass']
})
export class FamiliasComponent implements OnInit {

  @Input() lstFamilyResult;
  @Input() nroPersonas: number;
  @Input() currency: string;
  precioTotal: number;
  precioPersona: number;

  constructor() {
    this.precioTotal = 1;
    this.precioPersona = 1;
  }

  ngOnInit() {
    this.precioPersona = this.precioTotal / this.nroPersonas;
  }

}
