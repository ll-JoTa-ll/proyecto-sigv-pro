import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
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
import * as crypto from 'crypto-js';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.sass']
})
export class VuelosComponent implements OnInit, AfterViewInit {

  locale = 'es';
  locales = listLocales();

  flagBuscar: boolean;

  airportlist: any[] = [];
  citylist: any[] = [];
  airportlistFilter: any[] = [];
  loginDataUser: ILoginDatosModel;
  searchData: ISearchFlightModel[] = [];

  origenAuto: string;
  origentTexto: string;
  destinoAuto: string;
  destinoTexto: string;

  tipoVuelo: string;

  keyword = 'searchName';
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
  isOpen = false;
  valdestino = false;
  valfechasalida = false;
  valfechadestino = false;
  indback;
  ss_login_data;

  model: any = {};

  aerolineas: any[] = [];
  lstAutocomplete: any[] = [];

  constructor(
    private airportService: AirportService,
    private localeService: BsLocaleService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService,
    private router: Router
  ) {
    console.log('constructor vuelos');
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('.menu-hotel-1').show();
    $('.menu-hotel-2').hide();
    $('.menu-bus-1').show();
    $('.menu-bus-2').hide();
    $('.menu-paquete-1').show();
    $('.menu-paquete-2').hide();
    $('.menu-seguro-1').show();
    $('.menu-seguro-2').hide();
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
    this.ss_login_data = this.sessionStorageService.retrieve('ss_login_data');
    if (this.ss_login_data === '' || this.ss_login_data === null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    console.log('ngOnInit vuelos');
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('.menu-hotel-1').show();
    $('.menu-hotel-2').hide();
    $('.menu-bus-1').show();
    $('.menu-bus-2').hide();
    $('.menu-paquete-1').show();
    $('.menu-paquete-2').hide();
    $('.menu-seguro-1').show();
    $('.menu-seguro-2').hide();
    //$(".x").hide();
    //this.localeService.use("es");
    //this.airportList();
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.citylist = this.localStorageService.retrieve('ls_citylist');
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

    this.indback = this.sessionStorageService.retrieve('indregresar');
    let tipovuelo;
    if (this.indback === true) {
     // this.SearchFlight2();
     let databuscador = this.sessionStorageService.retrieve('objbuscador');
     let dataRequestFlight = this.sessionStorageService.retrieve('ss_databuscador');
     if (dataRequestFlight != null) {
      tipovuelo = databuscador.tipovuelo;

      if (tipovuelo === 'OW' || tipovuelo === 'RT') {
        let lstdata = this.sessionStorageService.retrieve('ss_searchFlight');
        this.setLstAerolineas(lstdata);
        this.searchData = lstdata;
        if (this.ss_login_data.orole.roleDescription === 'Usuario' || this.ss_login_data.orole.roleDescription === 'Autorizador') {
          this.flagBuscar = true;
          this.flagBuscadorLateral = true;
       } else {
          this.flagBuscar = true;
          this.flagBuscadorLateral = true;
          this.flagCentralizador = false;
       }
        this.sessionStorageService.store('indregresar', null);
        this.sessionStorageService.store('indback2', true);
        this.origenAuto = databuscador.origencode;
        this.origentTexto = databuscador.origen;
        this.destinoAuto = databuscador.destinocode;
        this.destinoTexto = databuscador.destino;
        this.textoEscala = databuscador.escala;
        this.textoCabina = databuscador.cabina;
        this.pasajeros = databuscador.pasajeros;
        this.fechaSalidaShow = databuscador.fechasalida;
        this.fechaRetornoShow = databuscador.fechadestino;
        this.fechaSalida = databuscador.fechasalida;
        this.fechaRetorno = databuscador.fechadestino;
        this.tipoVuelo = databuscador.tipovuelo;
      }
      if (tipovuelo === 'MC') {
        let lstdata = this.sessionStorageService.retrieve('ss_searchFlight');
        this.setLstAerolineas(lstdata);
        this.searchData = lstdata;
        this.flagBuscar = true;
        this.flagBuscadorLateral = true;
        this.sessionStorageService.store('indregresar', null);
        this.sessionStorageService.store('indback2', true);
        this.origenAuto1 = databuscador.origencode1;
        this.origenAuto2 = databuscador.origencode2;
        this.origenAuto3 = databuscador.origencode3;
        this.origenAuto4 = databuscador.origencode4;
        this.origenAuto5 = databuscador.origencode5;
        this.origenAuto6 = databuscador.origencode6;
        this.origentTexto1 = databuscador.origen1;
        this.origentTexto2 = databuscador.origen2;
        this.origentTexto3 = databuscador.origen3;
        this.origentTexto4 = databuscador.origen4;
        this.origentTexto5 = databuscador.origen5;
        this.origentTexto6 = databuscador.origen6;
        this.destinoAuto1 = databuscador.destinocode1;
        this.destinoAuto2 = databuscador.destinocode2;
        this.destinoAuto3 = databuscador.destinocode3;
        this.destinoAuto4 = databuscador.destinocode4;
        this.destinoAuto5 = databuscador.destinocode5;
        this.destinoAuto6 = databuscador.destinocode6;
        this.destinoTexto1 = databuscador.destino1;
        this.destinoTexto2 = databuscador.destino2;
        this.destinoTexto3 = databuscador.destino3;
        this.destinoTexto4 = databuscador.destino4;
        this.destinoTexto5 = databuscador.destino5;
        this.destinoTexto6 = databuscador.destino6;
        this.textoEscala = databuscador.escala;
        this.textoCabina = databuscador.cabina;
        this.pasajeros = databuscador.pasajeros;
        this.tipoVuelo = databuscador.tipovuelo;
        this.indexTramo = databuscador.indextramo;
        this.fechaSalida1 = databuscador.fechasalida1;
        this.fechaSalida2 = databuscador.fechasalida2;
        this.fechaSalida3 = databuscador.fechasalida3;
        this.fechaSalida4 = databuscador.fechasalida4;
        this.fechaSalida5 = databuscador.fechasalida5;
        this.fechaSalida6 = databuscador.fechasalida6;
        this.fechaSalidaShow1 = databuscador.fechasalida1;
        this.fechaSalidaShow2 = databuscador.fechasalida2;
        this.fechaSalidaShow3 = databuscador.fechasalida3;
        this.fechaSalidaShow4 = databuscador.fechasalida4;
        this.fechaSalidaShow5 = databuscador.fechasalida5;
        this.fechaSalidaShow6 = databuscador.fechasalida6;

      }
     }
    }
    const lstAutocomplete = this.lstAutocomplete;
    this.airportlist.forEach(function (aeropuerto) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        name: aeropuerto.name,
        searchName: aeropuerto.searchName,
        latitude: aeropuerto.latitude,
        longitude: aeropuerto.longitude,
        categoryId: 1,
        categoryName: 'Aeropuerto'
      };
      lstAutocomplete.push(obj1);
    });
    this.citylist.forEach(function (ciudad) {
      const obj1 = {
        iataCode: ciudad.iataCode,
        name: ciudad.name,
        searchName: ciudad.searchName,
        latitude: ciudad.latitude,
        longitude: ciudad.longitude,
        categoryId: 2,
        categoryName: 'Ciudad'
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => a.name - b.name );
    this.lstAutocomplete = lstAutocomplete;
  }


  ngAfterViewInit() {
    console.log('ngAfterViewInit vuelos');
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
  }

  SearchFlight2() {
    this.spinner.show();
    console.log("this.indexTramo: " + this.indexTramo);
    this.flagDinData = false;
    this.sessionStorageService.store('indregresar', null);

    let origen: any[] = [];
    let destino: any[] = [];
    let fechas: any[] = [];
    let horasFrom: any[] = [];
    let horasTo: any[] = [];

    let dataRequestFlight = this.sessionStorageService.retrieve('ss_databuscador');

    let data = {
      "Lusers": dataRequestFlight.Lusers,
      "NumberPassengers": dataRequestFlight.NumberPassengers,
      "NumberRecommendations": dataRequestFlight.NumberRecommendations,
      "CabinType": dataRequestFlight.CabinType,
      "Scales": dataRequestFlight.Scales,
      "Origin": dataRequestFlight.Origin,
      "Destination": dataRequestFlight.Destination,
      "DepartureArrivalDate": dataRequestFlight.DepartureArrivalDate,
      "DepartureArrivalTimeFrom": dataRequestFlight.DepartureArrivalTimeFrom,
      "DepartureArrivalTimeTo": dataRequestFlight.DepartureArrivalTimeTo,
      "Ocompany": dataRequestFlight.Ocompany
    };

    this.sessionStorageService.store('ss_dataRequestFlight', data);
    this.sessionStorageService.store('ss_databuscador', data);
    this.sessionStorageService.store('ss_horasFrom', horasFrom);
    this.sessionStorageService.store('ss_horasTo', horasTo);
    this.sessionStorageService.store('ss_filterPrecio', 'mas');


    this.airportService.searchFlight(data).subscribe(
      result => {
        console.log(result);
        this.flagPseudoRepeat = true;
        if (result !== null && result.length > 0) {
          this.searchData = result;
          this.sessionStorageService.store('ss_searchFlight', result);
          this.flagBuscar = true;
          this.flagBuscadorLateral = true;

          //aerolineas
          this.setLstAerolineas(result);
          /*
          result.forEach(function(reco, indexreco) {
            if (indexreco === 0) {
              const dataAero = {
                carrierId: reco.carrierId,
                carrierName: reco.carrierName,
                filter: 0
              };
              aerolineas.push(dataAero);
            } else {
              let flagAero = 1;
              aerolineas.forEach(function(aerolinea, indexaero) {
                if (aerolinea.carrierId === reco.carrierId) {
                  flagAero = 0;
                }
              });
              if (flagAero === 1) {
                const dataAeroN = {
                  carrierId: reco.carrierId,
                  carrierName: reco.carrierName,
                  filter: 0
                };
                aerolineas.push(dataAeroN);
              }
            }
          });
          this.aerolineas = aerolineas;
          */
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
    console.log("onValueChangeSalida");
    console.log("value: " + value);
    this.valfechasalida = false;
    $("#txtFechaSalida").removeClass("campo-invalido");
    this.minDateRetorno = value;
    //console.log("dpSalida: " + this.dpSalida);

    if (value != null) {
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
  }

  onValueChangeRetorno(value: Date): void {
    if (value != null) {
      this.valfechadestino = false;
      $("#txtFechaDestino").removeClass("campo-invalido");
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
  }

  selectEvent(item) {
    // do something with selected item
    console.log("selectEvent");
    console.log(item);
    this.origenAuto = item.iataCode;
    this.origentTexto = item.name;
    this.isOpen = false;
    $("#txtOrigen").removeClass("campo-invalido");
    $(".x").show();
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) > 0 );
      this.data = resultFilter;
      $(".x").hide();
    }
  }

  onFocused(e) {
    console.log("onFocused");
    console.log(e);
  }

  selectEvent2(item) {
    this.destinoAuto = item.iataCode;
    this.destinoTexto = item.name;
    this.valdestino = false;
    $("#txtDestino").removeClass("campo-invalido");
    $(".x").show();
    if (this.model.origentTexto.length < 5) {
      this.model.origentTexto = '';
    }
  }

  onChangeSearch2(val: string) {
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) > 0 );
      this.data2 = resultFilter;

      $(".x").hide();
    }
  }

  onFocused2(e) {
  }

  ClosedOrigen() {
    if (this.model.origentTexto.length < 15) {
      this.model.origentTexto = '';
    }
  }

  ClosedDestino() {
    if (this.model.destinoTexto.length < 15) {
      this.model.destinoTexto = '';
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
    if (valor === 'RT') {
      this.indexTramo = 2;
    }
    if (valor === 'OW') {
      this.indexTramo = 1;
    }
    if (valor === 'MC') {
      //this.origenAuto = "";
      //this.origentTexto = "";
      //this.model.origentTexto = "";
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
          console.log('item_pax: ' + JSON.stringify(item));
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
    this.sessionStorageService.store('ss_databuscador', data);
    this.sessionStorageService.store('ss_horasFrom', horasFrom);
    this.sessionStorageService.store('ss_horasTo', horasTo);
    this.sessionStorageService.store('ss_filterPrecio', 'mas');

    const flagVal = this.validarDataBusqueda(data);
    if (!flagVal) {
      this.spinner.hide();
      return flagVal;
    }

    console.log("data: " + JSON.stringify(data));

    let aerolineas = this.aerolineas;
    let objcampos;

    if (this.tipoVuelo === 'OW' || this.tipoVuelo === 'RT') {
        objcampos = {
        origen: this.origentTexto,
        origencode: this.origenAuto,
        destino: this.destinoTexto,
        destinocode: this.destinoAuto,
        fechasalida: $('#fechasalida').val(),
        fechadestino: $('#fechadestino').val(),
        cabina: this.textoCabina,
        escala: this.textoEscala,
        pasajeros: this.pasajeros,
        tipovuelo: this.tipoVuelo
      };
    }

    if (this.tipoVuelo === 'MC') {
      objcampos = {
        origen1: this.origentTexto1,
        origen2: this.origentTexto2,
        origen3: this.origentTexto3,
        origen4: this.origentTexto4,
        origen5: this.origentTexto5,
        origen6: this.origentTexto6,
        origencode1: this.origenAuto1,
        origencode2: this.origenAuto2,
        origencode3: this.origenAuto3,
        origencode4: this.origenAuto4,
        origencode5: this.origenAuto5,
        origencode6: this.origenAuto6,
        destino1: this.destinoTexto1,
        destino2: this.destinoTexto2,
        destino3: this.destinoTexto3,
        destino4: this.destinoTexto4,
        destino5: this.destinoTexto5,
        destino6: this.destinoTexto6,
        destinocode1: this.destinoAuto1,
        destinocode2: this.destinoAuto2,
        destinocode3: this.destinoAuto3,
        destinocode4: this.destinoAuto4,
        destinocode5: this.destinoAuto5,
        destinocode6: this.destinoAuto6,
        fechasalida1: this.fechaSalidaShow1,
        fechasalida2: this.fechaSalidaShow2,
        fechasalida3: this.fechaSalidaShow3,
        fechasalida4: this.fechaSalidaShow4,
        fechasalida5: this.fechaSalidaShow5,
        fechasalida6: this.fechaSalidaShow6,
        tipovuelo: this.tipoVuelo,
        cabina: this.textoCabina,
        escala: this.textoEscala,
        pasajeros: this.pasajeros,
        indextramo: this.indexTramo
      }
    }

    this.sessionStorageService.store('objbuscador', objcampos);

    this.airportService.searchFlight(data).subscribe(
      result => {
        console.log(result);
        this.flagPseudoRepeat = true;
        if (result !== null && result.length > 0) {
          this.searchData = result;
          this.sessionStorageService.store('ss_searchFlight', result);
          this.flagBuscar = true;
          this.flagBuscadorLateral = true;

          //aerolineas
          this.setLstAerolineas(result);
          /*
          result.forEach(function(reco, indexreco) {
            if (indexreco === 0) {
              const dataAero = {
                carrierId: reco.carrierId,
                carrierName: reco.carrierName,
                filter: 0
              };
              aerolineas.push(dataAero);
            } else {
              let flagAero = 1;
              aerolineas.forEach(function(aerolinea, indexaero) {
                if (aerolinea.carrierId === reco.carrierId) {
                  flagAero = 0;
                }
              });
              if (flagAero === 1) {
                const dataAeroN = {
                  carrierId: reco.carrierId,
                  carrierName: reco.carrierName,
                  filter: 0
                };
                aerolineas.push(dataAeroN);
              }
            }
          });
          this.aerolineas = aerolineas;
          */
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

  ValidarDestinos() {
    if (this.model.origentTexto.length < 5) {
      this.model.origentTexto = '';
    }
    if (this.model.destinoTexto.length < 5) {
      this.model.destinoTexto = '';
    }
  }

  validarDataBusqueda(data) {
    console.log('this.origentTexto: ' + this.origentTexto);
    console.log('this.destinoTexto: ' + this.destinoTexto);
    const tipoVuelo = this.tipoVuelo;
    const indexTramo = this.indexTramo;
    let flagVal = true;

    if (tipoVuelo === 'RT') {
      if ($.trim(this.model.origentTexto) === '' || $.trim(this.model.origentTexto) === undefined) {
        $("#txtOrigen").addClass("campo-invalido");
        this.isOpen = true;
        flagVal = false;
      } else {
        this.isOpen = false;
        $("#txtOrigen").removeClass("campo-invalido");
      }
      if ($.trim(this.model.destinoTexto) === '' || $.trim(this.model.destinoTexto) === undefined) {
        $("#txtDestino").addClass("campo-invalido");
        this.valdestino = true;
        flagVal = false;
      } else {
        this.valdestino = false;
        $("#txtDestino").removeClass("campo-invalido");
      }
      if ($.trim(this.fechaSalida) === '' || this.model.salida === null || this.model.salida === '') {
        $("#txtFechaSalida").addClass("campo-invalido");
        this.valfechasalida = true;
        flagVal = false;
      } else {
        this.valfechasalida = false;
        $("#txtFechaSalida").removeClass("campo-invalido");
      }
      if ($.trim(this.fechaRetorno) === '') {
        $("#txtFechaDestino").addClass("campo-invalido");
        this.valfechadestino = true;
        flagVal = false;
      } else {
        this.valfechadestino = false;
        $("#txtFechaDestino").removeClass("campo-invalido");
      }
    }

    if (tipoVuelo === 'OW') {
      if ($.trim(this.model.origentTexto) === '' || $.trim(this.model.origentTexto) === undefined) {
        $("#txtOrigen").addClass("campo-invalido");
        this.isOpen = true;
        flagVal = false;
      } else {
        $("#txtOrigen").removeClass("campo-invalido");
      }
      if ($.trim(this.model.destinoTexto) === '' || $.trim(this.model.destinoTexto) === undefined) {
        $("#txtDestino").addClass("campo-invalido");
        this.valdestino = true;
        flagVal = false;
      } else {
        $("#txtDestino").removeClass("campo-invalido");
      }
      if ($.trim(this.fechaSalida) === '') {
        $("#txtFechaSalida").addClass("campo-invalido");
        this.valfechasalida = true;
        flagVal = false;
      } else {
        $("#txtFechaSalida").removeClass("campo-invalido");
      }
    }

    if (tipoVuelo === 'MC') {
      if (indexTramo === 2) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
      }
      if (indexTramo === 3) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen3").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino3").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida3) === '') {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
      }
      if (indexTramo === 4) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen3").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen4").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino3").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino4").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida3) === '') {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida4) === '') {
          $("#txtFechaSalida4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida4").removeClass("campo-invalido");
        }
      }
      if (indexTramo === 5) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen3").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen4").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto5) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen5").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino3").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino4").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto5) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino5").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida3) === '') {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida4) === '') {
          $("#txtFechaSalida4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida4").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida5) === '') {
          $("#txtFechaSalida5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida5").removeClass("campo-invalido");
        }
      }
      if (indexTramo === 6) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen3").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen4").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto5) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen5").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto6) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen6").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen6").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino3").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino4").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto5) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino5").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto6) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino6").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino6").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida3) === '') {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida4) === '') {
          $("#txtFechaSalida4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida4").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida5) === '') {
          $("#txtFechaSalida5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida5").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida6) === '') {
          $("#txtFechaSalida6").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida6").removeClass("campo-invalido");
        }
      }
    }

    if (data) {}

    return flagVal;
  }

  searchFlightBuscador($event) {
    this.searchData = [];
    if ($event === null) {
      console.log("this.spinner.hide()");
      this.spinner.hide();
    } else {
      this.searchData = $event;
    }
    console.log("searchFlightBuscador");
    console.log("$event: " + $event);
    this.flagPseudoRepeat = false;
    this.flagPseudoRepeat = true;
    this.sessionStorageService.store('ss_searchFlight', this.searchData);
    this.inicioBuscador = true;
    if (this.searchData.length === 0) {
      this.flagDinData = true;
      this.spinner.hide();
    } else {
      this.flagDinData = false;
      this.spinner.hide();
      this.setLstAerolineas(this.searchData);
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
    this.origenAuto = $event;
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
    this.origentTexto = $event;
    this.model.origentTexto = $event;
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
    this.destinoAuto = $event;
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
    //console.log(this.destinoAuto6);
  }

  updateDestinoTramoText1($event) {
    this.destinoTexto1 = $event;
    this.destinoTexto = $event;
    this.model.destinoTexto = $event;
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
    this.fechaSalida = $event;
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
    this.fechaSalidaShow = $event;
    this.model.salida = $event;
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
    if ($event != null) {
      this.searchData = $event;
    }
    const spinner = this.spinner;
    setTimeout(function() {
      spinner.hide();
    }, 500);
  }

  busquedaFiltrosPrecio($event) {
    this.searchData = [];
    if ($event != null) {
      this.searchData = $event;
    }
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
    if ($event != null) {
      this.searchData = $event;
      this.setLstAerolineas(this.searchData);
    }
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

  setLstAerolineas(searchData) {
    this.aerolineas = [];
    let aerolineas = this.aerolineas;
    searchData.forEach(function(reco, indexreco) {
      if (indexreco === 0) {
        const dataAero = {
          carrierId: reco.carrierId,
          carrierName: reco.carrierName,
          filter: 0
        };
        aerolineas.push(dataAero);
      } else {
        let flagAero = 1;
        aerolineas.forEach(function(aerolinea, indexaero) {
          if (aerolinea.carrierId === reco.carrierId) {
            flagAero = 0;
          }
        });
        if (flagAero === 1) {
          const dataAeroN = {
            carrierId: reco.carrierId,
            carrierName: reco.carrierName,
            filter: 0
          };
          aerolineas.push(dataAeroN);
        }
      }
    });
    this.aerolineas = aerolineas;
  }

}
