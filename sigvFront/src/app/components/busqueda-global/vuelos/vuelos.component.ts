import { Component, OnInit } from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import {DatepickerRenderOptions} from 'ngx-bootstrap/datepicker/models';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.sass']
})
export class VuelosComponent implements OnInit {

  locale = 'es';
  locales = listLocales();

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

  indexTramo: number;

  origenAuto1: string;
  origenAuto2: string;
  origenAuto3: string;
  origenAuto4: string;
  origenAuto5: string;
  origenAuto6: string;
  origentTexto1: string;
  origentTexto2: string;
  origentTexto3: string;
  origentTexto4: string;
  origentTexto5: string;
  origentTexto6: string;
  destinoAuto1: string;
  destinoAuto2: string;
  destinoAuto3: string;
  destinoAuto4: string;
  destinoAuto5: string;
  destinoAuto6: string;
  destinoTexto1: string;
  destinoTexto2: string;
  destinoTexto3: string;
  destinoTexto4: string;
  destinoTexto5: string;
  destinoTexto6: string;

  minDateSalida: Date;
  minDateRetorno: Date;

  fechaSalida: string;
  fechaRetorno: string;

  fechaSalida1: string;
  fechaSalida2: string;
  fechaSalida3: string;
  fechaSalida4: string;
  fechaSalida5: string;
  fechaSalida6: string;

  //dpSalida: Date;
  dpRetorno;

  constructor(
    private airportService: AirportService,
    private localeService: BsLocaleService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService
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
    this.indexTramo = 2;
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate());
  }

  ngOnInit() {
    //$(".x").hide();
    //this.localeService.use("es");
    //this.airportList();
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.sessionStorageService.store('ss_token', this.loginDataUser.token);
    this.token = this.sessionStorageService.retrieve('ss_token');
    console.log(this.locales);
    this.localeService.use(this.locale);
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

  handlerSalida(datepickerSalida) {
    console.log(datepickerSalida);
  }

  onValueChangeSalida(value: Date): void {
    this.minDateRetorno = value;
    //console.log("dpSalida: " + this.dpSalida);

    let mes = "";
    if ((value.getMonth() + 1) < 10) {
      mes = "0" + (value.getMonth() + 1);
    } else {
      mes = "" + value.getMonth();
    }

    let dia = "";
    if (value.getDate() < 10) {
      dia = "0" + value.getDate();
    } else {
      dia = "" + value.getDate();
    }

    this.fechaSalida = value.getFullYear() + "/" + mes + "/" + dia;
    console.log(this.fechaSalida);
  }

  onValueChangeRetorno(value: Date): void {
    let mes = "";
    if ((value.getMonth() + 1) < 10) {
      mes = "0" + (value.getMonth() + 1);
    } else {
      mes = "" + value.getMonth();
    }

    let dia = "";
    if (value.getDate() < 10) {
      dia = "0" + value.getDate();
    } else {
      dia = "" + value.getDate();
    }

    this.fechaRetorno = value.getFullYear() + "/" + mes + "/" + dia;
    console.log(this.fechaRetorno);
  }

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
    let horasFrom: any[] = [];
    let horasTo: any[] = [];

    if (this.tipoVuelo === "RT") {
      origen.push(this.origenAuto);
      origen.push(this.destinoAuto);

      destino.push(this.destinoAuto);
      destino.push(this.origenAuto);

      console.log("origen");
      console.log(origen);
      console.log("destino");
      console.log(destino);

      fechas.push(this.fechaSalida);
      fechas.push(this.fechaRetorno);
      console.log("fechas");
      console.log(fechas);
    }

    if (this.tipoVuelo === "OW") {
      origen.push(this.origenAuto);
      destino.push(this.destinoAuto);
      fechas.push(this.fechaSalida);
    }

    if (this.tipoVuelo === "MC") {
      const indexTramo = this.indexTramo;
      switch (indexTramo) {
        case 2:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          break;
        case 3:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          break;
        case 4:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          fechas.push(this.fechaSalida4);
          break;
        case 5:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);
          origen.push(this.origenAuto5);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);
          destino.push(this.destinoAuto5);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          fechas.push(this.fechaSalida4);
          fechas.push(this.fechaSalida5);
          break;
        case 6:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);
          origen.push(this.origenAuto5);
          origen.push(this.origenAuto6);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);
          destino.push(this.destinoAuto5);
          destino.push(this.destinoAuto6);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          fechas.push(this.fechaSalida4);
          fechas.push(this.fechaSalida5);
          fechas.push(this.fechaSalida6);
          break;
      }
    }

    fechas.forEach(function(fe) {
      horasFrom.push("");
      horasTo.push("");
    });

    let data = {
      "UserId": this.loginDataUser.userId,
      "NumberPassengers": this.pasajeros,
      "NumberRecommendations": "1",
      "CabinType": this.cabina,
      "Scales": this.escala,
      "Currency": "USD",
      "Origin": origen,
      "Destination": destino,
      "DepartureArrivalDate": fechas,
      "DepartureArrivalTimeFrom": horasFrom,
      "DepartureArrivalTimeTo": horasTo,
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
          this.sessionStorageService.store('ss_searchFlight', result);
          this.flagBuscar = true;
        } else {
          this.sessionStorageService.store('ss_searchFlight', null);
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

  //TRAMO
  updateIndexTramo($event) {
    this.indexTramo = $event;
    console.log("this.indexTramo: " + this.indexTramo);
  }

  //ORIGEN
  updateOrigenTramoValue1($event) {
    this.origenAuto1 = $event;
    console.log("updateOrigenTramoValue1");
    console.log(this.origenAuto1);
  }
  updateOrigenTramoValue2($event) {
    this.origenAuto2 = $event;
    console.log(this.origenAuto2);
  }
  updateOrigenTramoValue3($event) {
    this.origenAuto3 = $event;
    console.log(this.origenAuto3);
  }
  updateOrigenTramoValue4($event) {
    this.origenAuto4 = $event;
    console.log(this.origenAuto4);
  }
  updateOrigenTramoValue5($event) {
    this.origenAuto5 = $event;
    console.log(this.origenAuto5);
  }
  updateOrigenTramoValue6($event) {
    this.origenAuto6 = $event;
    console.log(this.origenAuto6);
  }
  updateOrigenTramoText1($event) {
    this.origentTexto1 = $event;
  }
  updateOrigenTramoText2($event) {
    this.origentTexto2 = $event;
  }
  updateOrigenTramoText3($event) {
    this.origentTexto3 = $event;
  }
  updateOrigenTramoText4($event) {
    this.origentTexto4 = $event;
  }
  updateOrigenTramoText5($event) {
    this.origentTexto5 = $event;
  }
  updateOrigenTramoText6($event) {
    this.origentTexto6 = $event;
  }

  //DESTINO
  updateDestinoTramoValue1($event) {
    this.destinoAuto1 = $event;
    console.log(this.destinoAuto1);
  }
  updateDestinoTramoValue2($event) {
    this.destinoAuto2 = $event;
    console.log(this.destinoAuto2);
  }
  updateDestinoTramoValue3($event) {
    this.destinoAuto3 = $event;
    console.log(this.destinoAuto3);
  }
  updateDestinoTramoValue4($event) {
    this.destinoAuto4 = $event;
    console.log(this.destinoAuto4);
  }
  updateDestinoTramoValue5($event) {
    this.destinoAuto5 = $event;
    console.log(this.destinoAuto5);
  }
  updateDestinoTramoValue6($event) {
    this.destinoAuto6 = $event;
    console.log(this.destinoAuto6);
  }
  updateDestinoTramoText1($event) {
    this.destinoTexto1 = $event;
  }
  updateDestinoTramoText2($event) {
    this.destinoTexto2 = $event;
  }
  updateDestinoTramoText3($event) {
    this.destinoTexto3 = $event;
  }
  updateDestinoTramoText4($event) {
    this.destinoTexto4 = $event;
  }
  updateDestinoTramoText5($event) {
    this.destinoTexto5 = $event;
  }
  updateDestinoTramoText6($event) {
    this.destinoTexto6 = $event;
  }

  updateFechaSalida1($event) {
    this.fechaSalida1 = $event;
  }
  updateFechaSalida2($event) {
    this.fechaSalida2 = $event;
  }
  updateFechaSalida3($event) {
    this.fechaSalida3 = $event;
  }
  updateFechaSalida4($event) {
    this.fechaSalida4 = $event;
  }
  updateFechaSalida5($event) {
    this.fechaSalida5 = $event;
  }
  updateFechaSalida6($event) {
    this.fechaSalida6 = $event;
  }

}
