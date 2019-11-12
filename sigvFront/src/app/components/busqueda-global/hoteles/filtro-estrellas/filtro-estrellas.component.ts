import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-filtro-estrellas',
  templateUrl: './filtro-estrellas.component.html',
  styleUrls: ['./filtro-estrellas.component.sass']
})
export class FiltroEstrellasComponent implements OnInit {

  @Input() listado: IHotelResultsModel[];
  @Output() resultfiltro = new EventEmitter<IHotelResultsModel[]>();
  listadohotel: IHotelResultsModel[] = [];
  listadoEstrellas: any[] = [];

  ls_search_hotel;

  estrella5: boolean;
  estrella4: boolean;
  estrella3: boolean;
  estrella2: boolean;
  estrella1: boolean;
  todas: boolean;

  constructor(
    private sessionStorageService: SessionStorageService
  ) {
    this.estrella5 = false;
    this.estrella4 = false;
    this.estrella3 = false;
    this.estrella2 = false;
    this.estrella1 = false;
    this.todas = true;
  }

  ngOnInit() {
    //ls_search_hotel
    this.ls_search_hotel = this.sessionStorageService.retrieve('ls_search_hotel');
  }

  FiltroEstrella(estrellas) {

    let listadohotel = this.listadohotel;

    let estrella1 = this.estrella1;
    let estrella2 = this.estrella2;
    let estrella3 = this.estrella3;
    let estrella4 = this.estrella4;
    let estrella5 = this.estrella5;
    let todas = this.todas;
    let listadoEstrellas = this.listadoEstrellas;

    if (estrellas === 'todas') {
      if (todas === true) {
        this.estrella1 = false;
        this.estrella2 = false;
        this.estrella3 = false;
        this.estrella4 = false;
        this.estrella5 = false;
      }
    }

    switch(estrellas) {
      case "1":
            if (estrella1 === true) {
              listadoEstrellas.push("1");
              this.todas = false;
              if (listadoEstrellas.length === 1) {
                listadohotel = [];
              } else {
                listadohotel = [];
              }
            } else {
            let indice;
            indice = listadoEstrellas.indexOf('1');
            listadoEstrellas.splice(indice, 1);
            listadohotel = [];
            }
            break;

      case "2":
          if (estrella2 === true) {
            listadoEstrellas.push("2");
            this.todas = false;
            if (listadoEstrellas.length === 1) {
              listadohotel = [];
            } else {
              listadohotel = [];
            }
          } else {
            let indice;
            indice = listadoEstrellas.indexOf('2');
            listadoEstrellas.splice(indice, 1);
            listadohotel = [];
          }
          break;

      case "3": 
      if (estrella3 === true) {
        listadoEstrellas.push("3");
        this.todas = false;
        if (listadoEstrellas.length === 1) {
          listadohotel = [];
        } else {
          listadohotel = [];
        }
      } else {
        let indice;
            indice = listadoEstrellas.indexOf('3');
            listadoEstrellas.splice(indice, 1);
            listadohotel = [];
      }
          break;

      case "4": 
      if (estrella4 === true) {
        listadoEstrellas.push("4");
        this.todas = false;
        if (listadoEstrellas.length === 1) {
          listadohotel = [];
        } else {
          listadohotel = [];
        }
      } else {
        let indice;
            indice = listadoEstrellas.indexOf('4');
            listadoEstrellas.splice(indice, 1);
            listadohotel = [];
      }
      break;

      case "5":
          if (estrella5 === true) {
            listadoEstrellas.push("5");
            this.todas = false;
            if (listadoEstrellas.length === 1) {
              listadohotel = [];
            } else {
              listadohotel = [];
            }
          } else {
            let indice;
            indice = listadoEstrellas.indexOf('5');
            listadoEstrellas.splice(indice, 1);
            listadohotel = [];
          }
      break;
      case "todas":
          if (todas === true) {
            //listadoEstrellas.push("1","2","3","4","5");
            listadoEstrellas = [];
          } else {
            let indice;
            listadoEstrellas.splice(0, 5);
            listadohotel = [];
          }
          break;
    }

    

    this.listadoEstrellas = listadoEstrellas;

    let listado = this.ls_search_hotel;

    if (estrellas === 'todas') {
      listadohotel = listado;
      this.listadohotel = listadohotel;
    } else {
      if (listadoEstrellas.length === 0) {
        this.listadohotel = [];
        listadohotel = [];
        this.listadohotel = this.ls_search_hotel;
      } else {
        listadoEstrellas.forEach(function(valor) {
          let results = listado.filter(m => parseFloat(m.stars) === parseFloat(valor));
          results.forEach(function(rrr) {
            listadohotel.push(rrr);
          });
        });

        

        this.listadohotel = listadohotel;
      }
    }

    
    this.resultfiltro.emit(this.listadohotel);

    // tslint:disable-next-line: prefer-const
    /*
    let count;
    let results = [];
    results = this.listado.filter(m => m.HotelSegmentCategoryCode === estrellas);
    this.listadohotel = results;
    this.resultfiltro.emit(this.listadohotel);
    */
  }
}
