import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { AirportService } from '../../../services/airport.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.sass']
})
export class BuscadorComponent implements OnInit {

  @Input() tipoVuelo;
  @Input() origenAuto: string;
  @Input() origentTexto: string;
  @Input() destinoAuto: string;
  @Input() destinoTexto: string;
  @Input() fechaSalida;
  @Input() fechaRetorno;
  @Input() cabina;
  @Input() textoCabina: string;
  @Input() escala;
  @Input() textoEscala: string;
  @Input() pasajeros;

  @Output() lRecomendaciones = new EventEmitter<ISearchFlightModel[]>();

  airportlist: any[] = [];
  airportlistFilter: any[] = [];
  loginDataUser: ILoginDatosModel;
  searchData: ISearchFlightModel[] = [];
  keyword = 'airportDescription';
  data: any[] = [];
  data2: any[] = [];
  data3: any[] = [];
  data4: any[] = [];
  data5: any[] = [];
  data6: any[] = [];
  data7: any[] = [];
  data8: any[] = [];
  data9: any[] = [];
  data10: any[] = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private airportService: AirportService
  ) { }

  ngOnInit() {
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
  }

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

  selectEvent(flag, item) {
    // do something with selected item
    console.log("selectEvent");
    console.log(item);

    if (flag === 1) {
      this.origenAuto = item.airportCode;
      this.origentTexto = item.airportDescription;
      setTimeout(function() {
        $(".x").hide();
      }, 1000);
    }

    if (flag === 2) {
      this.destinoAuto = item.airportCode;
      this.destinoTexto = item.airportDescription;
      setTimeout(function() {
        $(".x").hide();
      }, 1000);
    }
  }

  onChangeSearch(flag, val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    if (flag === 1) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 2) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data2 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 3) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data3 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 4) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data4 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 5) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data5 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 6) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data6 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 7) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data7 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 8) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data8 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 9) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data9 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 10) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.airportDescription.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data10 = resultFilter;

        $(".x").hide();
      }
    }
  }

  onFocused(flag, e) {
    // do something when input is focused
    console.log("onFocused");
    console.log(e);
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
          "[AQP]"//,
          //"[LIM]"
        ],
      "Destination":
        [
          "[AQP]",
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
          //this.searchData = result;
          //this.flagBuscar = true;

          this.lRecomendaciones.emit(result);
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
