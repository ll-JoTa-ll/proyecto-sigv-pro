import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IReasonFlight } from '../../../models/IReasonFlight';

@Component({
  selector: 'app-motivo-viaje',
  templateUrl: './motivo-viaje.component.html',
  styleUrls: ['./motivo-viaje.component.sass']
})
export class MotivoViajeComponent implements OnInit {

  @Input() lsReasonflight: IReasonFlight[];

  constructor() { }

  ngOnInit() {
  }

}
