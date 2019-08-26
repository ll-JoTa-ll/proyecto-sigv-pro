import { Component, OnInit, Input } from '@angular/core';
import { ISearchFlightModel } from '../../../../models/ISearchFlight.model';

@Component({
  selector: 'app-recomendacion',
  templateUrl: './recomendacion.component.html',
  styleUrls: ['./recomendacion.component.sass']
})
export class RecomendacionComponent implements OnInit {

  @Input() currency: string;
  @Input() totalFareAmount: number;
  @Input() totalTaxAmount: number;
  @Input() fareAmountByPassenger: number;
  @Input() taxAmountByPassenger: number;
  @Input() fareTaxAmountByPassenger: number;
  @Input() carrierId: string;
  @Input() numberPassengers: number;
  @Input() pseudo: string;
  @Input() lsections: any[];
  @Input() lsectionLength: number;

  constructor() { }

  ngOnInit() {
  }

}
