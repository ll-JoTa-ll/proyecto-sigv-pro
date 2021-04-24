import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { AirportService } from '../../../services/airport.service';
import { ModalErrorServiceComponent } from '../../shared/modal-error-service/modal-error-service.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';

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

  @Input() inIndexTramo;

  @Input() flagPaxMasMenos;

  @Input() flagVuelosManiana: boolean;
  @Input() flagVuelosNoche: boolean;
  @Input() flagFilterVuelo: boolean;
  @Input() maleta: boolean;

  @Output() lRecomendaciones = new EventEmitter<ISearchFlightModel[]>();
  @Output() inicioBuscar = new EventEmitter<boolean>();
  @Output() outTipoVuelo = new EventEmitter<string>();
  @Output() outIndexTramo = new EventEmitter<number>();
  @Output() refreshFilters = new EventEmitter<any>();
  @Output() calendarShoping = new EventEmitter<any>();

  fecha1show;
  fecha2show;
  fecha3show;
  fecha4show;
  fecha5show;
  fecha6show;

  airportlist: any[] = [];
  citylist: any[] = [];
  airportlistFilter: any[] = [];
  loginDataUser: any;
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
  @Input() textorigen;
  @Input() textdestino;

  modalerror: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  origenValue;
  origenText;
  destinoValue;
  destinoText;
  fechaValue;
  fechaText;
  model: any = {};
  lstAutocomplete: any[] = [];
  fechanow: Date;
  calendarSalidaValue: Date;
  dateCustomClasses: DatepickerDateCustomClasses[];

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private airportService: AirportService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit() {
    console.log("sadsadsadsadasd" + this.fechaSalidaShow);
    console.log("sadsadsadsadasd" + this.fechaRetornoShow);
    this.indexTramo = this.inIndexTramo;
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.citylist = this.localStorageService.retrieve('ls_citylist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    let databuscador = this.sessionStorageService.retrieve('objbuscador');
    $(".x").hide();
    if (this.tipoVuelo === 'MC') {
      this.origenValue = this.origenAuto1;
      this.origenText = this.origentTexto1;
      this.destinoValue = this.destinoAuto1;
      this.destinoText = this.destinoTexto1;
    } else {
      this.origenValue = this.origenAuto;
      this.origenText = this.origentTexto;
      this.destinoValue = this.destinoAuto;
      this.destinoText = this.destinoTexto;
    }

    this.origenAuto1 = this.origenValue;
    this.origentTexto1 = this.origenText;
    this.destinoAuto1 = this.destinoValue;
    this.destinoTexto1 = this.destinoText;

    const lstAutocomplete = this.lstAutocomplete;
    this.airportlist.forEach(function (aeropuerto) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        name: aeropuerto.name,
        searchName: aeropuerto.searchName,
        priority: aeropuerto.priority,
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
        priority: ciudad.priority,
        categoryId: 2,
        categoryName: 'Ciudad'
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;
    this.minDateSalida = new Date();
  }

  ngAfterViewInit() {
    $(".x").hide();
    const tipoVuelo = this.tipoVuelo;
    const fechaSalidaShow = this.fechaSalidaShow;
    const fechaRetornoShow = this.fechaRetornoShow;
    this.fechaSalidaShow1 = this.fechaSalidaShow;
    switch (tipoVuelo) {
      case 'RT':
        $('#radio_b_tv_1').prop("checked", true);
        $('#datepickerSalida').val(fechaSalidaShow);
        $('#datepickerRetorno').val(fechaRetornoShow);
        break;
      case 'OW':
        $('#radio_b_tv_2').prop("checked", true);
        $('#datepickerSalida').val(fechaSalidaShow);
        break;
      case 'MC':
        $('#radio_b_tv_3').prop("checked", true);
        break;
    }
    if (fechaSalidaShow === null) {
      this.fechanow = new Date();
    }

    if (this.flagFilterVuelo === true) {
      //this.searchFlight();
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

  ClosedOrigen() {
    if (this.origentTexto.length < 15) {
      this.origentTexto = '';
    }
  }

  ClosedDestino() {
    if (this.destinoTexto.length < 15) {
      this.destinoTexto = '';
    }
  }

  seleccionarTipoVuelo(valor) {
    this.tipoVuelo = valor;
  }

  selectEvent(flag, item) {
    if (flag === 1) {
      this.origenAuto = item.iataCode;
      this.origentTexto = item.name;
      this.origenText = item.name;
      $("#txtOrigen").removeClass("campo-invalido");
      // $(".x").show();
      this.origenAuto1 = this.origenAuto;
      this.origentTexto1 = this.origenText;
      this.origenValue = this.origenAuto;
    }

    if (flag === 2) {
      this.destinoAuto = item.iataCode;
      this.destinoTexto = item.name;
      this.destinoText = item.name;
      $("#txtDestino").removeClass("campo-invalido");
      // $(".x").show();

      this.destinoAuto1 = this.destinoAuto;
      this.destinoTexto1 = this.destinoText;
      this.destinoValue = this.destinoAuto;
    }
  }

  onChangeSearch(flag, val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    if (flag === 1) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data = resultFilter;
        $(".x").hide();
      }
    }

    if (flag === 2) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data2 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 3) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data3 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 4) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data4 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 5) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data5 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 6) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data6 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 7) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data7 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 8) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data8 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 9) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data9 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 10) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
        this.data10 = resultFilter;

        $(".x").hide();
      }
    }
  }

  onFocused(flag, e) {
    // do something when input is focused
  }

  ValidarDestinos() {
    if (this.origenText.length < 10) {
      this.origenText = '';
    }
    if (this.destinoText.length < 10) {
      this.destinoText = '';
    }
  }

  onValueChangeSalida(value: Date): void {
    if (value != null) {
      this.minDateRetorno = value;
      this.dateCustomClasses = [
        { date: this.minDateRetorno, classes: ['bg-danger', 'text-warning'] }
      ];
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
      $("#txtFechaSalida").removeClass("campo-invalido");
      this.fechaSalida = value.getFullYear() + "/" + mes + "/" + dia;
    }
  }

  Updatefecha1($event) {
    this.fecha1show = "";
    this.fechaSalidaShow = "";
    this.fecha1show = $event;
    this.fechaSalidaShow = $event;
    $('#datepickerSalida').val(this.fechaSalidaShow);
  }

  Updatefecha2($event) {
    this.fecha2show = $event;
  }

  Updatefecha3($event) {
    this.fecha3show = $event;
  }

  Updatefecha4($event) {
    this.fecha4show = $event;
  }

  Updatefecha5($event) {
    this.fecha5show = $event;
  }

  Updatefecha6($event) {
    this.fecha6show = $event;
  }

  onValueChangeRetorno(value: Date): void {
    if (value != null) {
      this.calendarSalidaValue = value;
      this.dateCustomClasses = [
        { date: null, classes: ['bg-danger', 'text-warning'] }
      ];
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

      $("#txtFechaDestino").removeClass("campo-invalido");
      this.fechaRetorno = value.getFullYear() + "/" + mes + "/" + dia;
    }
  }

  searchFlight() {
    const flagVal = this.validarDataBusqueda();
    if (!flagVal) {
      this.spinner.hide();
      return flagVal;
    } else {
      this.spinner.show();
      this.ValidarDestinos();
      this.inicioBuscar.emit(false);
      this.sessionStorageService.store('ss_calendarshopping', null);

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

        fechas.push(this.fechaSalida);
        fechas.push(this.fechaRetorno);
      }

      if (this.tipoVuelo === "OW") {
        this.sessionStorageService.store('ss_calendarmini', null);
        origen.push(this.origenAuto);
        destino.push(this.destinoAuto);
        fechas.push(this.fechaSalida);
      }

      if (this.tipoVuelo === "MC") {
        this.sessionStorageService.store('ss_calendarmini', null);
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

      fechas.forEach(function (fe) {
        horasFrom.push("");
        horasTo.push("");
      });

      if (this.flagVuelosManiana === true) {
        horasFrom[0] = '0500';
        horasTo[0] = '1159';
      }

      if (this.flagVuelosNoche === true) {
        horasFrom[0] = '1900';
        horasTo[0] = '2359';
      }

      let lUsers_: any[] = [];
      let lPassengers: any[] = [];

      const lstPasajeros = this.sessionStorageService.retrieve('ss_lstPasajeros');
      if (lstPasajeros != null) {
        if (lstPasajeros.length > 0) {
          lstPasajeros.forEach(function (item, index) {
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
      let objcampos;

      if (this.tipoVuelo === 'RT' || this.tipoVuelo === 'OW') {
        let origenT;
        let destinoT;
        if (this.origenText.name === undefined) {
          origenT = this.origenText
        } else {
          origenT = this.origenText.name
        }
        if (this.destinoText.name === undefined) {
          destinoT = this.destinoText
        } else {
          destinoT = this.destinoText.name
        }
        objcampos = {
          origen: origenT,
          origencode: this.origenAuto,
          destino: destinoT,
          destinocode: this.destinoAuto,
          fechasalida: this.fechaSalida,
          fechadestino: this.fechaRetorno,
          fechasalidashow: $('#datepickerSalida').val(),
          fecharetornoshow: $('#datepickerRetorno').val(),
          cabina: this.textoCabina,
          escala: this.textoEscala,
          pasajeros: this.pasajeros,
          tipovuelo: this.tipoVuelo,
          mindatesalida: this.minDateSalida,
          mindateretorno: this.minDateRetorno
        };
      }
      if (this.tipoVuelo === 'MC') {
        this.sessionStorageService.store('ss_calendarmini', null);
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
          fechasalida1: this.fecha1show,
          fechasalida2: this.fecha2show,
          fechasalida3: this.fecha3show,
          fechasalida4: this.fecha4show,
          fechasalida5: this.fecha5show,
          fechasalida6: this.fecha6show,
          tipovuelo: this.tipoVuelo,
          cabina: this.textoCabina,
          escala: this.textoEscala,
          pasajeros: this.pasajeros,
          indextramo: this.indexTramo
        };
      }

      const passenger = {
        Quantity: this.pasajeros,
        TypePassenger: 'ADT'
      }

      lPassengers.push(passenger);

      let data = {
        "Lusers": lUsers_,
        "Lpassengers": lPassengers,
        "CabinType": this.cabina,
        "Scales": this.escala,
        "TypeSearch": 'C',
        "IncludesBaggage": this.maleta,
        "Origin": origen,
        "Destination": destino,
        "DepartureArrivalDate": fechas,
        "DepartureArrivalTimeFrom": horasFrom,
        "DepartureArrivalTimeTo": horasTo,
        "Ocompany": this.loginDataUser.ocompany,
        "Oagency": this.loginDataUser.oagency
      };



      this.sessionStorageService.store('objbuscador', objcampos);
      this.sessionStorageService.store('ss_dataRequestFlight', data);
      this.sessionStorageService.store('ss_databuscador', data);
      if (this.tipoVuelo === 'RT') {
        this.sessionStorageService.store('ss_dataRequestMini', data);
      }
      this.sessionStorageService.store('ss_horasFrom', horasFrom);
      this.sessionStorageService.store('ss_horasTo', horasTo);
      this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
      const ss_filterPrecio = this.sessionStorageService.retrieve('ss_filterPrecio');

      this.airportService.searchFlight(data).subscribe(
        result => {
          if (result.status === 200 && result.lrecommendations.length > 0) {
            if (ss_filterPrecio === 'mas') {
              result.lrecommendations.sort((a, b) => a.oprice.totalAmount - b.oprice.totalAmount);
            }
            if (ss_filterPrecio === 'menos') {
              result.lrecommendations.sort((a, b) => b.oprice.totalAmount - a.oprice.totalAmount);
            }
            this.sessionStorageService.store('ss_searchFlight', result);
            if (this.tipoVuelo === 'RT' && result.lcalendars != null) {

              result.lcalendars.forEach(element => {
                element.arrivalDate = element.arrivalDate.substring(0, 10);
                element.departureDate = element.departureDate.substring(0, 10);
              });
              this.sessionStorageService.store('ss_calendarmini', true);
              this.sessionStorageService.store('ss_calendarshopping', result.lcalendars);
              this.lRecomendaciones.emit(result.lrecommendations);
              this.outTipoVuelo.emit(this.tipoVuelo);
              this.outIndexTramo.emit(this.indexTramo);
              this.calendarShoping.emit(true);
              this.spinner.hide();
              this.sessionStorageService.store('ss_calendarshopping', result.lcalendars);
              this.sessionStorageService.store('ss_lowcosto', result);

            }

          } else {
            this.spinner.hide();
          }
          if (this.tipoVuelo !== 'RT') {
            this.lRecomendaciones.emit(result.lrecommendations);
            this.outTipoVuelo.emit(this.tipoVuelo);
            this.outIndexTramo.emit(this.indexTramo);
          }

          this.refreshFilters.emit({
            destinoAuto: this.destinoAuto,
            destinoTexto: this.destinoTexto,
            pasajeros: this.pasajeros
          })
          this.lRecomendaciones.emit(result.lrecommendations);
          this.outTipoVuelo.emit(this.tipoVuelo);
          this.outIndexTramo.emit(this.indexTramo);
        },
        err => {
          this.spinner.hide();
          this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
        },
        () => {
          if (this.tipoVuelo != 'RT') {
            this.spinner.hide();
          }
        }
      );
    }
  }

  validarDataBusqueda() {
    const tipoVuelo = this.tipoVuelo;
    const indexTramo = this.indexTramo;
    let flagVal = true;
    if (tipoVuelo === 'RT') {
      if ($.trim(this.origenText) === '' || $.trim(this.origenText) === undefined) {
        $("#txtOrigen").addClass("campo-invalido");
        flagVal = false;
      } else {
        $("#txtOrigen").removeClass("campo-invalido");
      }
      if ($.trim(this.destinoText) === '' || $.trim(this.destinoText) === undefined) {
        $("#txtDestino").addClass("campo-invalido");
        flagVal = false;
      } else {
        $("#txtDestino").removeClass("campo-invalido");
      }
      // tslint:disable-next-line: max-line-length
      if ($('#datepickerSalida').val().length === 0/*this.model.salida === null || this.model.salida === '' || this.model.salida === undefined*/) {
        $("#txtFechaSalida").addClass("campo-invalido");
        flagVal = false;
      } else {
        $("#txtFechaSalida").removeClass("campo-invalido");
      }
      // tslint:disable-next-line: max-line-length
      if ($('#datepickerRetorno').val().length === 0/*this.model.retorno === null || this.model.retorno === '' || this.model.retorno === undefined*/) {
        $("#txtFechaDestino").addClass("campo-invalido");
        flagVal = false;
      } else {
        $("#txtFechaDestino").removeClass("campo-invalido");
      }
    }

    if (tipoVuelo === 'OW') {
      if ($.trim(this.origentTexto) === '' || $.trim(this.origentTexto) === undefined) {
        $("#txtOrigen").addClass("campo-invalido");
        flagVal = false;
      } else {
        $("#txtOrigen").removeClass("campo-invalido");
      }
      if ($.trim(this.destinoTexto) === '' || $.trim(this.destinoTexto) === undefined) {
        $("#txtDestino").addClass("campo-invalido");
        flagVal = false;
      } else {
        $("#txtDestino").removeClass("campo-invalido");
      }
      if ($('#datepickerSalida').val().length === 0/*this.model.salida === null || this.model.salida === '' || this.model.salida === undefined*/) {
        $("#txtFechaSalida").addClass("campo-invalido");
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

    return flagVal;
  }

  //TRAMO
  updateIndexTramo($event) {
    this.indexTramo = $event;
  }

  //ORIGEN
  updateOrigenTramoValue1($event) {
    this.origenAuto1 = "";
    this.origenAuto = "";
    this.origenValue = "";
    this.origenAuto1 = $event;
    this.origenAuto = $event;
    this.origenValue = $event;
  }
  updateOrigenTramoValue2($event) {
    this.origenAuto2 = $event;
  }
  updateOrigenTramoValue3($event) {
    this.origenAuto3 = $event;
  }
  updateOrigenTramoValue4($event) {
    this.origenAuto4 = $event;
  }
  updateOrigenTramoValue5($event) {
    this.origenAuto5 = $event;
  }
  updateOrigenTramoValue6($event) {
    this.origenAuto6 = $event;
  }
  updateOrigenTramoText1($event) {
    this.origentTexto1 = "";
    this.origenText = "";
    this.origentTexto1 = $event;
    this.origenText = $event;
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
  }
  updateDestinoTramoValue3($event) {
    this.destinoAuto3 = $event;
  }
  updateDestinoTramoValue4($event) {
    this.destinoAuto4 = $event;
  }
  updateDestinoTramoValue5($event) {
    this.destinoAuto5 = $event;
  }
  updateDestinoTramoValue6($event) {
    this.destinoAuto6 = $event;
  }
  updateDestinoTramoText1($event) {
    this.destinoTexto1 = $event;
    this.destinoText = $event;
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
    this.fechaSalida1 = "";
    this.fechaSalida = "";
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

}
