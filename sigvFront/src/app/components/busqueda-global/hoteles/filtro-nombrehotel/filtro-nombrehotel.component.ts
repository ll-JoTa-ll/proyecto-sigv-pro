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
  minibuscador;
  listadohotel: IHotelResultsModel[] = [];

  constructor(private sessionStorageService: SessionStorageService) {
    this.ls_search_hotel = null;
    
   }

  ngOnInit() {
    
    this.ls_search_hotel = this.sessionStorageService.retrieve('ls_search_hotel');
  }


  FiltrarNombre() {
    this.minibuscador = this.sessionStorageService.retrieve('ss_minibuscador');
    let nombre;
    let results;
    let listado;
    if (this.minibuscador != null) {
      listado = this.minibuscador;
    }else{
      listado = this.ls_search_hotel;
    }
    
    nombre = $('#nombrehotel').val();
    results = listado.filter(m => m.name.toUpperCase().includes(nombre.toUpperCase()))
    
    this.listadohotel = results;
    this.resultFiltro.emit(this.listadohotel);
  }
}
