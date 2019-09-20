import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-filtro-nombrehotel',
  templateUrl: './filtro-nombrehotel.component.html',
  styleUrls: ['./filtro-nombrehotel.component.sass']
})
export class FiltroNombrehotelComponent implements OnInit {

  @Input() listado: IHotelResultsModel[];
  @Output() resultFiltro = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit() {
  }


  FiltrarNombre() {
    let nombre;
    let results;
    nombre = $('#nombrehotel').val();
    results = this.listado.filter(m => m.hotelName === nombre);
    this.listado = results;
    this.resultFiltro.emit(this.listado);
  }
}
