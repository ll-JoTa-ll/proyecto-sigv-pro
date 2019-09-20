import { Component, OnInit, Input, Output } from '@angular/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
declare var jquery: any;
declare var $: any;

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
  @Input() index: string;
  @Input() latitud: string;
  @Input() longitud: string;
  urlimg = '/assets/images/hotel-icon.png';

  constructor() { }

  ngOnInit() {
  }

  Mostrarmapa(position) {
    $('#mapa_' + position).show();
 }
 
 OcultarMapa(position) {
   $('#mapa_' + position).hide();
 }

}
