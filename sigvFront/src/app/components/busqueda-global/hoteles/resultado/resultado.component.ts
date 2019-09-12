import { Component, OnInit, Input, Output } from '@angular/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.sass']
})
export class ResultadoComponent implements OnInit {

  @Input() LHoteles: IHotelResultsModel[];
  @Input() nombrehotel: string;
  @Input() direccion: string;
  @Input() distancia: string;
  @Input() estrellas: string;
  @Input() precioxnoche: string;
  @Input() precioprom: string;
  @Input() currency: string;
  @Input() urlHotel: string;

  constructor() { }

  ngOnInit() {
  }

}
