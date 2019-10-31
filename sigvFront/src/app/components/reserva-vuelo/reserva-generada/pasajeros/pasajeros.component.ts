import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pasajeros } from 'src/app/models/IPasajeros.model';
import { IDatosUser } from '../../../../models/IDatosUser';


@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styleUrls: ['./pasajeros.component.sass']
})
export class PasajerosComponent implements OnInit {

  @Input() lsusers;

  constructor() { }

  ngOnInit() {
  }

}
