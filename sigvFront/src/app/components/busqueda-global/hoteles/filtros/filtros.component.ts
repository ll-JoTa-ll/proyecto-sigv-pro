import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { parse } from 'url';
import { element } from 'protractor';

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
  textopoliticas: string = 'Politicas';

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

  FiltrarPolitica(number) {
    let lista;
    if (number === 1) {
      this.ListaHotel.forEach(function(element) {
        if(element.lpolicies.length > 0){
          element.isvisible = true;
        }else{
          element.isvisible = false;
        }
      });
      lista = this.ListaHotel;
     this.messagelistado.emit(lista);
     this.textopoliticas = 'Politicas Incumplidas';
    }

    if (number === 2) {
      this.ListaHotel.forEach(function(element) {
        if(element.lpolicies.length > 0){
          element.isvisible = false;
        }else{
          element.isvisible = true;
        }
      });
      lista = this.ListaHotel;
     this.messagelistado.emit(lista);
     this.textopoliticas = 'Politicas Cumplidas';
    }
 }

  MostrarMapa() {
      this.vistamapa.emit(this.mostrarmapa);
  }

  MostrarListado() {
      this.vistalistado.emit(this.mostrarlistado);
  }
}
