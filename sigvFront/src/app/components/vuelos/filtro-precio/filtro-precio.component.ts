import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-filtro-precio',
  templateUrl: './filtro-precio.component.html',
  styleUrls: ['./filtro-precio.component.sass']
})
export class FiltroPrecioComponent implements OnInit {

  @Output() searchFlightFilter = new EventEmitter<ISearchFlightModel[]>();
  textoPrecio;
  searchFlight: any[] = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService
  ) {
    //this.searchFlight = this.sessionStorageService.retrieve('ss_searchFlight');
    this.textoPrecio = 'Precio';
  }

  ngOnInit() {
  }

  deMenorAMayor(elem1, elem2) {
    return elem1 - elem2;
  }

  deMayorAMenor(elem1, elem2) {
    return elem2 - elem1;
  }

  seleccionarPrecio(valor1, valor2) {
    this.spinner.show();
    this.textoPrecio = valor2;
    this.searchFlight = [];
    this.searchFlight = this.sessionStorageService.retrieve('ss_searchFlight');
    if (valor1 === 'mas') {
      this.sessionStorageService.store('ss_filterPrecio', 'mas');
      this.searchFlight.sort((a, b) => a.oprice.totalAmount - b.oprice.totalAmount );
    }
    if (valor1 === 'menos') {
      this.sessionStorageService.store('ss_filterPrecio', 'menos');
      this.searchFlight.sort((a, b) => b.oprice.totalAmount - a.oprice.totalAmount );
    }
    this.sessionStorageService.store('ss_searchFlight', this.searchFlight);
    this.searchFlightFilter.emit(this.searchFlight);
  }

}
