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
  textoprecio: string = 'Precio';
  textoestrellas: string = 'Estrellas';

  mostrarmapa: boolean = true;
  mostrarlistado: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  FiltrarPrecio(number) {
    if (number === 1) {
      this.ListaHotel.sort(function(a, b) {
        return a.oprice.pricePerAllNights - b.oprice.pricePerAllNights;
       });
      this.messagelistado.emit(this.ListaHotel);
      this.textoprecio = 'Precio: Menor a Mayor';
    }

    if (number === 2) {
      this.ListaHotel.sort(function(a, b) {
        return b.oprice.pricePerAllNights - a.oprice.pricePerAllNights;
       });
      this.messagelistado.emit(this.ListaHotel);
      this.textoprecio = 'Precio: Mayor a Menor';
    }
  }

  FiltrarEstrella(number) {
     if (number === 1) {
      this.ListaHotel.sort(function(a, b) {
        return b.stars - a.stars;
       });
      this.messagelistado.emit(this.ListaHotel);
      this.textoestrellas = 'Estrellas: Mayor a Menor';
     }

     if (number === 2) {
      this.ListaHotel.sort(function(a, b) {
        return a.stars - b.stars;
       });
      this.messagelistado.emit(this.ListaHotel);
      this.textoestrellas = 'Estrellas: Menor a Mayor';
    }
  }

  MostrarMapa() {
      this.vistamapa.emit(this.mostrarmapa);
      var z = document.getElementById("filtro");
      z.style.position = "absolute";
  }

  MostrarListado() {
      this.vistalistado.emit(this.mostrarlistado);
      var z = document.getElementById("filtro");
      z.style.position = "fixed";
  }
}
