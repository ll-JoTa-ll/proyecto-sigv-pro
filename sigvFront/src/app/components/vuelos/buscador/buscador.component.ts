import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
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
export class BuscadorComponent implements OnInit, AfterViewInit {

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
  @Input() minDateSalida;
  @Input() minDateRetorno;
  @Input() fechaSalidaShow;
  @Input() fechaRetornoShow;

  @Input() fechaSalida1;
  @Input() fechaSalida2;
  @Input() fechaSalida3;
  @Input() fechaSalida4;
  @Input() fechaSalida5;
  @Input() fechaSalida6;

  @Input() fechaSalidaShow1;
  @Input() fechaSalidaShow2;
  @Input() fechaSalidaShow3;
  @Input() fechaSalidaShow4;
  @Input() fechaSalidaShow5;
  @Input() fechaSalidaShow6;

  @Input() origenAuto1;
  @Input() origenAuto2;
  @Input() origenAuto3;
  @Input() origenAuto4;
  @Input() origenAuto5;
  @Input() origenAuto6;
  @Input() origentTexto1;
  @Input() origentTexto2;
  @Input() origentTexto3;
  @Input() origentTexto4;
  @Input() origentTexto5;
  @Input() origentTexto6;
  @Input() destinoAuto1;
  @Input() destinoAuto2;
  @Input() destinoAuto3;
  @Input() destinoAuto4;
  @Input() destinoAuto5;
  @Input() destinoAuto6;
  @Input() destinoTexto1;
  @Input() destinoTexto2;
  @Input() destinoTexto3;
  @Input() destinoTexto4;
  @Input() destinoTexto5;
  @Input() destinoTexto6;

  @Output() lRecomendaciones = new EventEmitter<ISearchFlightModel[]>();

  airportlist: any[] = [];
  airportlistFilter: any[] = [];
  loginDataUser: ILoginDatosModel;
  searchData: ISearchFlightModel[] = [];
  keyword = 'name';
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
  indexTramo: number;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private airportService: AirportService
  ) {
    this.indexTramo = 2;
  }

  ngOnInit() {
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    setTimeout(function() {
      $(".x").hide();
    }, 1000);
  }

  ngAfterViewInit() {
    setTimeout(function() {
      $(".x").hide();
    }, 1000);
    const tipoVuelo = this.tipoVuelo;
    const fechaSalidaShow = this.fechaSalidaShow;
    const fechaRetornoShow = this.fechaRetornoShow;
    switch (tipoVuelo) {
      case 'RT':
        $('#radio_b_tv_1').prop("checked", true);
        $('#datepickerSalida').val(fechaSalidaShow);
        $('#datepickerRetorno').val(fechaRetornoShow);
        break;
      case 'OW':
        $('#radio_b_tv_2').prop("checked", true);
        $('#datepickerRetorno').val(fechaRetornoShow);
        break;
      case 'MC':
        $('#radio_b_tv_3').prop("checked", true);
        break;
    }
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
      this.origenAuto = item.iataCode;
      this.origentTexto = item.name;
      setTimeout(function() {
        $(".x").hide();
      }, 1000);
    }

    if (flag === 2) {
      this.destinoAuto = item.iataCode;
      this.destinoTexto = item.name;
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
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 2) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data2 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 3) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data3 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 4) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data4 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 5) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data5 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 6) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data6 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 7) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data7 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 8) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data8 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 9) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data9 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 10) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
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


    this.airportService.searchFlight(data).subscribe(
      result => {
        console.log(result);
        this.lRecomendaciones.emit(result);
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
