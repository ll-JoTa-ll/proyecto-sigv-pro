import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resumen-pasajero',
  templateUrl: './resumen-pasajero.component.html',
  styleUrls: ['./resumen-pasajero.component.sass']
})
export class ResumenPasajeroComponent implements OnInit {

  @Input() lsusers;

  constructor() { }

  ngOnInit() {
  }

}
