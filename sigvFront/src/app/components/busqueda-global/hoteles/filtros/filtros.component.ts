import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { parse } from 'url';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.sass']
})
export class FiltrosComponent implements OnInit {

  @Input() ListaHotel: IHotelResultsModel[];
  @Output() messagelistado = new EventEmitter<any[]>();
  @Output() vistamapa = new EventEmitter<any>();
  @Output() vistalistado = new EventEmitter<any>();

  mostrarmapa: boolean = true;
  mostrarlistado: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  FiltrarPrecio(number) {
    if (number === 1) {
      this.ListaHotel.sort(function(a, b) {
        return a.MinPrice - b.MinPrice;
       });
      this.messagelistado.emit(this.ListaHotel);
    }

    if (number === 2) {
      this.ListaHotel.sort(function(a, b) {
        return b.MinPrice - a.MinPrice;
       });
      this.messagelistado.emit(this.ListaHotel);
    }
  }

  FiltrarEstrella(number) {
     if (number === 1) {
      this.ListaHotel.sort(function(a, b) {
        return parseFloat(b.HotelSegmentCategoryCode) - parseFloat(a.HotelSegmentCategoryCode);
       });
      this.messagelistado.emit(this.ListaHotel);
     }

     if (number === 2) {
      this.ListaHotel.sort(function(a, b) {
        return parseFloat(a.HotelSegmentCategoryCode) - parseFloat(b.HotelSegmentCategoryCode);
       });
      this.messagelistado.emit(this.ListaHotel);
    }
  }

  MostrarMapa() {
      this.vistamapa.emit(this.mostrarmapa);
  }

  MostrarListado() {
      this.vistalistado.emit(this.mostrarlistado);
  }
}
