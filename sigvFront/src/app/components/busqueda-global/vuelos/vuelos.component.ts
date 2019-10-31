import { Component, OnInit } from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import {DatepickerRenderOptions} from 'ngx-bootstrap/datepicker/models';
import {consoleTestResultHandler} from 'tslint/lib/test';
import { Router } from '@angular/router';

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
  fechaSalidaShow: string;
  fechaRetornoShow: string;

  fechaSalida1: string;
  fechaSalida2: string;
  fechaSalida3: string;
  fechaSalida4: string;
  fechaSalida5: string;
  fechaSalida6: string;

  fechaSalidaShow1: string;
  fechaSalidaShow2: string;
  fechaSalidaShow3: string;
  fechaSalidaShow4: string;
  fechaSalidaShow5: string;
  fechaSalidaShow6: string;

  flagCentralizador: boolean;
  flagPseudoRepeat: boolean;
  inicioBuscador: boolean;
  flagPaxMasMenos: boolean;

  vuelosManiana: boolean;
  vuelosNoche: boolean;
  vueloTurnoFiltro: boolean;
  flagBuscadorLateral: boolean;

  model: any = {};

  constructor(
    private airportService: AirportService,
    private localeService: BsLocaleService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService,
    private router: Router
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
    this.flagPseudoRepeat = false;
    this.inicioBuscador = true;
    this.flagPaxMasMenos = true;
    this.vuelosManiana = false;
    this.vuelosNoche = false;
    this.vueloTurnoFiltro = false;
    this.flagBuscadorLateral = false;
    const ss_login_data = this.sessionStorageService.retrieve('ss_login_data');
    console.log(ss_login_data);
    if (ss_login_data === '' || ss_login_data === null) {
      this.router.navigate(['/']);
    }
    $('.menu-vuelo-1').show();
    $('.menu-vuelo-2').hide();
    $('.menu-hotel-1').hide();
    $('.menu-hotel-2').show();
    $('.menu-bus-1').hide();
    $('.menu-bus-2').show();
    $('.menu-paquete-1').hide();
    $('.menu-paquete-2').show();
    $('.menu-seguro-1').hide();
    $('.menu-seguro-2').show();
  }

  ngOnInit() {
    //$(".x").hide();
    //this.localeService.use("es");
    //this.airportList();
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.sessionStorageService.store('ss_token', this.loginDataUser.token);
    this.token = this.sessionStorageService.retrieve('ss_token');
    this.flagCentralizador = this.sessionStorageService.retrieve('ss_flagCentralizador');
    //console.log('this.flagCentralizador: ' + this.flagCentralizador);
    //console.log(this.locales);
    this.localeService.use(this.locale);
    if (!this.flagCentralizador) {
      this.sessionStorageService.store('ss_lstPasajeros', null);
      this.flagPaxMasMenos = true;
    } else {
      this.flagPaxMasMenos = false;
    }
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
    let getMonth = value.getMonth() + 1;
    if (getMonth < 10) {
      getMonth = value.getMonth() + 1;
      mes = "0" + getMonth;
    } else {
      mes = "" + getMonth;
    }

    let dia = "";
    if (value.getDate() < 10) {
      dia = "0" + value.getDate();
    } else {
      dia = "" + value.getDate();
    }

    this.fechaSalida = value.getFullYear() + "/" + mes + "/" + dia;
    this.fechaSalidaShow = dia + "/" + mes + "/" + value.getFullYear();
    console.log(this.fechaSalida);
  }

  onValueChangeRetorno(value: Date): void {
    let mes = "";
    let getMonth = value.getMonth() + 1;
    if (getMonth < 10) {
      getMonth = value.getMonth() + 1;
      mes = "0" + getMonth;
    } else {
      mes = "" + getMonth;
    }

    let dia = "";
    if (value.getDate() < 10) {
      dia = "0" + value.getDate();
    } else {
      dia = "" + value.getDate();
    }

    this.fechaRetorno = value.getFullYear() + "/" + mes + "/" + dia;
    this.fechaRetornoShow = dia + "/" + mes + "/" + value.getFullYear();
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
    if (valor === 'RT') {
      this.indexTramo = 2;
    }
    if (valor === 'OW') {
      this.indexTramo = 1;
    }
    if (valor === 'MC') {
      this.indexTramo = 2;
    }
  }

  searchFlight() {
    this.spinner.show();
    console.log("this.indexTramo: " + this.indexTramo);
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

    let lUsers_: any[] = [];

    const lstPasajeros = this.sessionStorageService.retrieve('ss_lstPasajeros');
    if (lstPasajeros != null) {
      if (lstPasajeros.length > 0) {
        lstPasajeros.forEach(function(item, index) {
          console.log('item_pax: ' + JSON.stringify(item))
          const pax = {
            "RoleId": item.orole.id,
            "CostCenterId": null,
            "UserId": item.userId
          };
          lUsers_.push(pax);
        });
      }
    } else {
      lUsers_.push(
        {
          "RoleId": this.loginDataUser.orole.roleId,
          "CostCenterId": null,
          "UserId": this.loginDataUser.userId
        }
      );
    }


    console.log('lUsers_: ' + JSON.stringify(lUsers_));



    let data = {
      "Lusers": lUsers_,
      "NumberPassengers": this.pasajeros,
      "NumberRecommendations": "50",
      "CabinType": this.cabina,
      "Scales": this.escala,
      "Origin": origen,
      "Destination": destino,
      "DepartureArrivalDate": fechas,
      "DepartureArrivalTimeFrom": horasFrom,
      "DepartureArrivalTimeTo": horasTo,
      "Ocompany": this.loginDataUser.ocompany
    };

    this.sessionStorageService.store('ss_dataRequestFlight', data);
    this.sessionStorageService.store('ss_horasFrom', horasFrom);
    this.sessionStorageService.store('ss_horasTo', horasTo);
    this.sessionStorageService.store('ss_filterPrecio', 'mas');

    const flagVal = this.validarDataBusqueda(data);
    if (!flagVal) {
      this.spinner.hide();
      return flagVal;
    }

    console.log("data: " + JSON.stringify(data));

    this.airportService.searchFlight(data).subscribe(
      result => {
        console.log(result);
        this.flagPseudoRepeat = true;
        if (result !== null && result.length > 0) {
          this.searchData = result;
          this.sessionStorageService.store('ss_searchFlight', result);
          this.flagBuscar = true;
          this.flagBuscadorLateral = true;
        } else {
          this.sessionStorageService.store('ss_searchFlight', null);
          this.flagDinData = true;
        }
      },
      err => {
        this.spinner.hide();
        this.flagBuscadorLateral = false;
        console.log("ERROR: " + JSON.stringify(err));
      },
      () => {
        this.spinner.hide();
        this.flagBuscadorLateral = false;
        console.log("this.airportService.searchFlight completado");
      }
    );
  }

  validarDataBusqueda(data) {
    console.log('this.origentTexto: ' + this.origentTexto);
    console.log('this.destinoTexto: ' + this.destinoTexto);
    const tipoVuelo = this.tipoVuelo;
    const indexTramo = this.indexTramo;
    let flagVal = true;

    if (tipoVuelo === 'RT') {
      if ($.trim(this.model.origentTexto) === '') {
        flagVal = false;
      }
      if ($.trim(this.model.destinoTexto) === '') {
        flagVal = false;
      }
      if ($.trim(this.fechaSalida) === '') {
        flagVal = false;
      }
      if ($.trim(this.fechaRetorno) === '') {
        flagVal = false;
      }
    }

    if (tipoVuelo === 'OW') {
      if ($.trim(this.origentTexto) === '') {
        flagVal = false;
      }
      if ($.trim(this.destinoTexto) === '') {
        flagVal = false;
      }
      if ($.trim(this.fechaSalida) === '') {
        flagVal = false;
      }
    }

    if (tipoVuelo === 'MC') {
      if (indexTramo >= 2) {}
    }

    if (data) {}

    return flagVal;
  }

  searchFlightBuscador($event) {
    this.flagPseudoRepeat = false;
    this.searchData = [];
    this.searchData = $event;
    this.flagPseudoRepeat = true;
    this.sessionStorageService.store('ss_searchFlight', this.searchData);
    this.inicioBuscador = true;
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

  updateFechaSalidaShow1($event) {
    this.fechaSalidaShow1 = $event;
  }
  updateFechaSalidaShow2($event) {
    this.fechaSalidaShow2 = $event;
  }
  updateFechaSalidaShow3($event) {
    this.fechaSalidaShow3 = $event;
  }
  updateFechaSalidaShow4($event) {
    this.fechaSalidaShow4 = $event;
  }
  updateFechaSalidaShow5($event) {
    this.fechaSalidaShow5 = $event;
  }
  updateFechaSalidaShow6($event) {
    this.fechaSalidaShow6 = $event;
  }

  updateCentralizador($event) {
    this.flagCentralizador = $event;
    const lstPasajeros = this.sessionStorageService.retrieve('ss_lstPasajeros');
    this.pasajeros = lstPasajeros.length;
  }

  inicioBuscadorLateral($event) {
    this.inicioBuscador = $event;
    //this.searchData = [];
  }

  busquedaFiltros($event) {
    this.searchData = [];
    this.searchData = $event;
    const spinner = this.spinner;
    setTimeout(function() {
      spinner.hide();
    }, 500);
  }

  busquedaFiltrosPrecio($event) {
    this.searchData = [];
    this.searchData = $event;
    const spinner = this.spinner;
    setTimeout(function() {
      spinner.hide();
    }, 500);
  }

  vuelosTurno($event) {
    /*
    this.flagBuscadorLateral = false;
    const dataFilter = $event;
    this.vuelosManiana = dataFilter.soloManiana;
    this.vuelosNoche = dataFilter.soloNoche;
    this.vueloTurnoFiltro = dataFilter.filtroTurnos;
    this.flagBuscadorLateral = true;
    */
  }

  busquedaFiltrosHoras($event) {
    this.searchData = [];
    this.searchData = $event;
    const spinner = this.spinner;
    setTimeout(function() {
      spinner.hide();
    }, 500);
  }

  setOutputTipoVuelo($event) {
    this.tipoVuelo = $event;
  }

  setOutIndexTramo($event) {
    this.indexTramo = $event;
  }

}
