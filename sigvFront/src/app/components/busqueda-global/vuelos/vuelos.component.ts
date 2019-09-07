import { Component, OnInit } from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.sass']
})
export class VuelosComponent implements OnInit {

  flagBuscar: boolean;

  airportlist: any[] = [];
  airportlistFilter: any[] = [];
  loginDataUser: ILoginDatosModel;
  searchData: ISearchFlightModel[] = [];

  origenAuto: string;
  origentTexto: string;
  destinoAuto: string;
  destinoTexto: string;

  tipoVuelo: string;

  keyword = 'name';
  data: any[] = [];
  data2: any[] = [];

  textoCabina: string;
  cabina: string;

  textoEscala: string;
  escala: string;

  pasajeros: number;

  token;

  flagDinData;

  constructor(
    private airportService: AirportService,
    private localeService: BsLocaleService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService
  ) {
    this.flagBuscar = false;
    this.tipoVuelo = "RT";
    this.origenAuto = "";
    this.destinoAuto = "";
    this.textoCabina = "Todas";
    this.cabina = "";
    this.textoEscala = "Todas";
    this.escala = "";
    this.pasajeros = 1;
    this.flagDinData = false;
  }

  ngOnInit() {
    //$(".x").hide();
    //this.localeService.use("es");
    //this.airportList();
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.sessionStorageService.store('ss_token', this.loginDataUser.token);
    this.token = this.sessionStorageService.retrieve('ss_token');
  }

  /*
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
  */

  selectEvent(item) {
    // do something with selected item
    console.log("selectEvent");
    console.log(item);
    this.origenAuto = item.iataCode;
    this.origentTexto = item.name;
    setTimeout(function() {
      $(".x").hide();
    }, 1000);
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
      this.data = resultFilter;

      $(".x").hide();
    }
  }

  onFocused(e) {
    // do something when input is focused
    console.log("onFocused");
    console.log(e);
  }

  selectEvent2(item) {
    this.destinoAuto = item.iataCode;
    this.destinoTexto = item.name;
  }

  onChangeSearch2(val: string) {
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
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
      if (pasajeros === 9) {
        pasajeros = 8;
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

  seleccionarTipoVuelo(valor) {
    this.tipoVuelo = valor;
  }

  searchFlight() {
    this.spinner.show();
    this.flagDinData = false;

    let origen: any[] = [];
    let destino: any[] = [];
    let fechas: any[] = [];
    let horas: any[] = [];

    if (this.tipoVuelo === "RT") {
      origen.push(this.origenAuto);
      origen.push(this.destinoAuto);

      destino.push(this.destinoAuto);
      destino.push(this.origenAuto);

      console.log("origen");
      console.log(origen);
      console.log("destino");
      console.log(destino);
    }

    if (this.tipoVuelo === "OW") {
      origen.push(this.origenAuto);
      destino.push(this.destinoAuto);
    }

    if (this.tipoVuelo === "MC") {}

    let data = {
      "UserId": this.loginDataUser.userId,
      "NumberPassengers": this.pasajeros,
      "NumberRecommendations": "50",
      "CabinType": this.cabina,
      "Scales": this.escala,
      "Currency": "USD",
      "Origin": origen,
      "Destination": destino,
      "DepartureArrivalDate":
        [
          "2019/12/26", "2019/12/28"
        ],
      "DepartureArrivalTimeFrom":
        [
          "",
          ""
        ],
      "DepartureArrivalTimeTo":
        [
          "",
          ""
        ],
      "Ocompany": this.loginDataUser.ocompany
    };

    /*
    let data = {
      "UserId": 1,
      "NumberPassengers": "1",
      "NumberRecommendations": "250",
      "CabinType": "",
      "Scales": "",
      "Currency": "USD",
      "Origin":
        [
          "LIM",
          "CUZ"
        ],
      "Destination":
        [
          "CUZ",
          "LIM"
        ],
      "DepartureArrivalDate":
        [
          "2019/11/15",
          "2019/11/18"
        ],
      "DepartureArrivalTimeFrom":
        [
          "",
          ""
        ],
      "Ocompany":
        {
          "CompanyId": 2,
          "CompanyName": "CEMENTOS PACASMAYO S.A.A."
        }
    };
    */

    console.log("data: " + JSON.stringify(data));

    this.airportService.searchFlight(data).subscribe(
      result => {
        console.log(result);
        if (result !== null && result.length > 0) {
          this.searchData = result;
          this.flagBuscar = true;
        } else {
          this.flagDinData = true;
        }
      },
      err => {
        this.spinner.hide();
        console.log("ERROR: " + JSON.stringify(err));
      },
      () => {
        this.spinner.hide();
        console.log("this.airportService.searchFlight completado");
      }
    );
  }

  searchFlightBuscador($event) {
    this.searchData = [];
    this.searchData = $event;
    if (this.searchData == null) {
      this.flagDinData = true;
    } else {
      this.flagDinData = false;
    }
  }

}
