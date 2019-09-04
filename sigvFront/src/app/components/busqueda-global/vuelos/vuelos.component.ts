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
  destinoAuto: string;

  tipoVuelo: string;

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
  }

  ngOnInit() {
    //$(".x").hide();
    //this.localeService.use("es");
    //this.airportList();
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
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
    this.origenAuto = item.airportCode;
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

  selectEvent2(item) {
    this.destinoAuto = item.airportCode;
  }

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

    /*
    let data = {
      "TypeFlight": this.tipoVuelo,
      "Origin": origen,
      "Destination": destino,
      "DepartureArrivalDate":
        [
          "2019/08/26", "2019/08/28"
        ],
      "DepartureArrivalTimeFrom":
        [
          "", ""
        ],
      "DepartureArrivalTimeTo":
        [
          "", ""
        ],
      "NumberPassengers": this.pasajeros,
      "CabinType": this.cabina,
      "Scales": this.escala,
      "EnviromentIsProd": this.loginDataUser.enviromentIsProd,
      "Currency": "USD",
      "NumberRecommendations": "50",
      "UserId": this.loginDataUser.userId,
      "Lpseudo": this.loginDataUser.lpseudo,
      "Ocompany": this.loginDataUser.ocompany,
      "Oprofile": this.loginDataUser.oprofile,
      "OcostCenter": this.loginDataUser.ocostCenter,
      "Lpassenger": null
    };
    */



    let data = {
      "TypeFlight": "RT",
      "Origin":
        [
          "[LIM]",
          "[SYD]"//,
          //"[LIM]"
        ],
      "Destination":
        [
          "[SYD]",
          "[LIM]"//,
          //"[CIX]"
        ],
      "DepartureArrivalDate":
        [
          "2019/09/26",
          "2019/09/28"//,
          //"2019/09/30"
        ],
      "DepartureArrivalTimeFrom":
        [
          "",
          ""//,
          //""
        ],
      "DepartureArrivalTimeTo":
        [
          "",
          ""//,
          //""
        ],
      "NumberPassengers": "1",
      "CabinType": "",
      "Scales": "",
      "EnviromentIsProd": false,
      "Currency": "USD",
      "NumberRecommendations": "50",
      "UserId": "1",
      "Lpseudo":
        [
          {
            "PseudoIsActive": true,
            "CountryCode": "PE",
            "PseudoCode": "LIMPE2235"
          }
        ],
      "Ocompany":
        {
          "CompanyId": "1",
          "CompanyDescription": "ENTEL PERU S.A.",
          "CompanyProfile": "ENTEL",
          "LcorporateCode":
            [
              {
                "AirlineCode": "LA",
                "Code": "ENTEL"
              },
              {
                "AirlineCode": "P9",
                "Code": "172318"
              },
              {
                "AirlineCode": "CM",
                "Code": "CIN1583"
              }
            ]
        },
      "Oprofile": {
        "ProfileId": "1",
        "ProfileDescription": "Agente Viajes"
      },
      "OcostCenter": {
        "CostCenterId": "1",
        "CostCenterCode": "NO COST CENTER",
        "CostCenterDescription": "NO COST CENTER"
      },
      "Lpassenger": null
    };


    this.airportService.searchFlight(data).subscribe(
      result => {
        console.log(result);
        if (result !== null && result.length > 0) {
          this.searchData = result;
          this.flagBuscar = true;
        }
      },
      err => {
        this.spinner.hide();
        console.log("ERROR: " + err);
      },
      () => {
        this.spinner.hide();
        console.log("this.airportService.searchFlight completado");
      }
    );
  }

}
