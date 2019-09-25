import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
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
  ls_search_hotel;
  listadohotel: IHotelResultsModel[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.ls_search_hotel = this.localStorageService.retrieve('ls_search_hotel');
  }


  FiltrarNombre() {
    let nombre;
    let results;
    let listado;
    listado = this.ls_search_hotel;
    nombre = $('#nombrehotel').val();
    results = listado.filter(m => m.hotelName === nombre);
    this.listadohotel = results;
    this.resultFiltro.emit(this.listadohotel);
  }
}
