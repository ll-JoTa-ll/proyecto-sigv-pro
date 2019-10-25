import { Component, OnInit } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-filtro-precio',
  templateUrl: './filtro-precio.component.html',
  styleUrls: ['./filtro-precio.component.sass']
})
export class FiltroPrecioComponent implements OnInit {

  textoPrecio;
  searchFlight: ISearchFlightModel[] = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService
  ) {
    this.searchFlight = this.sessionStorageService.retrieve('ss_searchFlight');
  }

  ngOnInit() {
  }

  seleccionarPrecio(valor1, valor2) {
    this.textoPrecio = valor2;
    if (valor1 === 'mas') {}
    if (valor1 === 'menos') {}
  }

}
