import { Component, OnInit } from '@angular/core';
import { DawaAutocompleteItem } from 'ngx-dawa-autocomplete';
import { AirportService } from '../../../services/airport.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
//import { listLocales } from 'ngx-bootstrap/chronos';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.sass']
})
export class VuelosComponent implements OnInit {

  airportlist: any[] = [];
  airportlistFilter: any[] = [];
  origen: string;

  keyword = 'airportDescription';
  data: any[] = [];
  data2: any[] = [];

  textoCabina: string;
  cabina: string;

  textoEscala: string;
  escala: string;

  pasajeros: number;

  constructor(
    private airportService: AirportService,
    private localeService: BsLocaleService
  ) {
    this.origen = "";
    this.textoCabina = "Todas";
    this.cabina = "";
    this.textoEscala = "Directo";
    this.escala = "Direct";
    this.pasajeros = 1;
  }

  ngOnInit() {
    //$(".x").hide();
    //this.localeService.use("es");
    this.airportList();
  }

  airportList() {
    this.airportService.airportList().subscribe(
      (result: any) => {
        console.log(result);
        this.airportlist = result;
        this.airportlistFilter = result;
      },

      (err) => { console.log("ERROR: " + err); },

      () => {
        console.log("Service airportList complete");
      }
    );
  }

  selectEvent(item) {
    // do something with selected item
    console.log("selectEvent");
    console.log(item);
    setTimeout(function() {
      $(".x").hide();
    }, 1000);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
      this.data = resultFilter;

      $(".x").hide();
    }
  }

  onFocused(e) {
    // do something when input is focused
    console.log("onFocused");
    console.log(e);
  }

  selectEvent2(item) {}

  onChangeSearch2(val: string) {
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
      this.data2 = resultFilter;

      $(".x").hide();
    }
  }

  onFocused2(e) {}


  seleccionarCabina(valor, texto) {
    this.cabina = valor;
    this.textoCabina = texto;
  }

  seleccionarEscala(valor, texto) {
    this.escala = valor;
    this.textoEscala = texto;
  }

  pasajeroOperacion(valor) {
    let pasajeros = this.pasajeros;
    if (valor === true) {
      pasajeros = pasajeros + 1;
      if (pasajeros === 6) {
        pasajeros = 5;
      }
      this.pasajeros = pasajeros;
    }
    if (valor === false) {
      pasajeros = pasajeros - 1;
      if (pasajeros === 0) {
        pasajeros = 1;
      }
      this.pasajeros = pasajeros;
    }
  }

}
