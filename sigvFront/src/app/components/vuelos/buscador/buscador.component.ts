import {Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { AirportService } from '../../../services/airport.service';
import { ModalErrorServiceComponent } from '../../shared/modal-error-service/modal-error-service.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

  fecha1show;
  fecha2show;
  fecha3show;
  fecha4show;
  fecha5show;
  fecha6show;

  airportlist: any[] = [];
  citylist: any[] = [];
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

  @Input() inSelectedDateRange;
  @Input() inSelectedDate;

  dateRangePickerProps = {
    "startDatePlaceholderText": "Salida",
    "endDatePlaceholderText": "Retorno",
    "displayFormat": "DD/MM/YYYY"
  };
  selectedDateRange = {
    "start": null,
    "end": null
  };
  selectedDate;
  singleDatePickerProps = {
    "placeholder": "Salida",
    "displayFormat": "DD/MM/YYYY"
  };

  selectedDate1;
  selectedDate2;
  selectedDate3;
  selectedDate4;
  selectedDate5;
  selectedDate6;

  @Input() inSelectedDate1;
  @Input() inSelectedDate2;
  @Input() inSelectedDate3;
  @Input() inSelectedDate4;
  @Input() inSelectedDate5;
  @Input() inSelectedDate6;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private airportService: AirportService,
    private modalService: BsModalService
  ) {
    console.log("BuscadorComponent constructor");
  }

  ngOnInit() {
    console.log("BuscadorComponent ngOnInit");
    this.selectedDateRange = this.inSelectedDateRange;
    this.selectedDate = this.inSelectedDate;

    this.selectedDate1 = this.inSelectedDate1;
    this.selectedDate2 = this.inSelectedDate2;
    this.selectedDate3 = this.inSelectedDate3;
    this.selectedDate4 = this.inSelectedDate4;
    this.selectedDate5 = this.inSelectedDate5;
    this.selectedDate6 = this.inSelectedDate6;

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
    lstAutocomplete.sort((a, b) => b.priority - a.priority );
    this.lstAutocomplete = lstAutocomplete;
  }

  ngAfterViewInit() {
    console.log("BuscadorComponent ngAfterViewInit");

    $(".x").hide();
    const tipoVuelo = this.tipoVuelo;
    //const fechaSalidaShow = this.fechaSalidaShow;
    //const fechaRetornoShow = this.fechaRetornoShow;
    //this.fechaSalidaShow1 = this.fechaSalidaShow;
    switch (tipoVuelo) {
      case 'RT':
        $('#radio_b_tv_1').prop("checked", true);
        //$('#datepickerSalida').val(fechaSalidaShow);
        //$('#datepickerRetorno').val(fechaRetornoShow);
        break;
      case 'OW':
        $('#radio_b_tv_2').prop("checked", true);
        //$('#datepickerSalida').val(fechaSalidaShow);
        break;
      case 'MC':
        $('#radio_b_tv_3').prop("checked", true);
        break;
    }
    /*
    if (fechaSalidaShow === null) {
      this.fechanow = new Date();
    }
    */

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
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data = resultFilter;
        $(".x").hide();
      }
    }

    if (flag === 2) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data2 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 3) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data3 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 4) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data4 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 5) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data5 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 6) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data6 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 7) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data7 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 8) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data8 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 9) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data9 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 10) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
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
      if (value >= this.calendarSalidaValue) {
        $("#datepickerRetorno").val("");
        this.fechaRetorno = '';
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

        //fechas.push(this.fechaSalida);
        //fechas.push(this.fechaRetorno);
        fechas.push(this.formatDate1(this.selectedDateRange.start));
        fechas.push(this.formatDate1(this.selectedDateRange.end));
      }

      if (this.tipoVuelo === "OW") {
        origen.push(this.origenAuto);
        destino.push(this.destinoAuto);
        fechas.push(this.formatDate1(this.selectedDate));
      }

      if (this.tipoVuelo === "MC") {
        const indexTramo = this.indexTramo;
        switch (indexTramo) {
          case 2:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);

            fechas.push(this.formatDate1(this.selectedDate1));
            fechas.push(this.formatDate1(this.selectedDate2));
            break;
          case 3:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);
            origen.push(this.origenAuto3);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);
            destino.push(this.destinoAuto3);

            fechas.push(this.formatDate1(this.selectedDate1));
            fechas.push(this.formatDate1(this.selectedDate2));
            fechas.push(this.formatDate1(this.selectedDate3));
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

            fechas.push(this.formatDate1(this.selectedDate1));
            fechas.push(this.formatDate1(this.selectedDate2));
            fechas.push(this.formatDate1(this.selectedDate3));
            fechas.push(this.formatDate1(this.selectedDate4));
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

            fechas.push(this.formatDate1(this.selectedDate1));
            fechas.push(this.formatDate1(this.selectedDate2));
            fechas.push(this.formatDate1(this.selectedDate3));
            fechas.push(this.formatDate1(this.selectedDate4));
            fechas.push(this.formatDate1(this.selectedDate5));
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

            fechas.push(this.formatDate1(this.selectedDate1));
            fechas.push(this.formatDate1(this.selectedDate2));
            fechas.push(this.formatDate1(this.selectedDate3));
            fechas.push(this.formatDate1(this.selectedDate4));
            fechas.push(this.formatDate1(this.selectedDate5));
            fechas.push(this.formatDate1(this.selectedDate6));
            break;
        }
      }

      fechas.forEach(function(fe) {
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

      const lstPasajeros = this.sessionStorageService.retrieve('ss_lstPasajeros');
      if (lstPasajeros != null) {
        if (lstPasajeros.length > 0) {
          lstPasajeros.forEach(function(item, index) {
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
          objcampos = {
          origen: this.origenText.name,
          origencode: this.origenAuto,
          destino: this.destinoText.name,
          destinocode: this.destinoAuto,
          fechasalida: this.fechaSalida,
          fechadestino: this.fechaRetorno,
          fechasalidashow: this.formatDate2(this.selectedDateRange.start),
          fecharetornoshow: this.formatDate2(this.selectedDateRange.end),
          cabina: this.textoCabina,
          escala: this.textoEscala,
          pasajeros: this.pasajeros,
          tipovuelo: this.tipoVuelo,
          mindatesalida: this.minDateSalida,
          mindateretorno: this.minDateRetorno
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
          fechasalida1: this.formatDate2(this.selectedDate1),
          fechasalida2: this.formatDate2(this.selectedDate2),
          fechasalida3: this.formatDate2(this.selectedDate3),
          fechasalida4: this.formatDate2(this.selectedDate4),
          fechasalida5: this.formatDate2(this.selectedDate5),
          fechasalida6: this.formatDate2(this.selectedDate6),
          tipovuelo: this.tipoVuelo,
          cabina: this.textoCabina,
          escala: this.textoEscala,
          pasajeros: this.pasajeros,
          indextramo: this.indexTramo
        };
      }

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
        "Ocompany": this.loginDataUser.ocompany,
        "IncludesBaggage": this.maleta
      };

      this.sessionStorageService.store('objbuscador', objcampos);

      this.sessionStorageService.store('ss_dataRequestFlight', data);
      this.sessionStorageService.store('ss_horasFrom', horasFrom);
      this.sessionStorageService.store('ss_horasTo', horasTo);
      this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
      const ss_filterPrecio = this.sessionStorageService.retrieve('ss_filterPrecio');

      this.airportService.searchFlight(data).subscribe(
        result => {
          if (result !== null && result.length > 0) {
            if (ss_filterPrecio === 'mas') {
              result.sort((a, b) => a.totalFareAmount - b.totalFareAmount );
            }
            if (ss_filterPrecio === 'menos') {
              result.sort((a, b) => b.totalFareAmount - a.totalFareAmount );
            }
            this.sessionStorageService.store('ss_searchFlight', result);
          } else {
            this.spinner.hide();
          }
          this.lRecomendaciones.emit(result);
          this.outTipoVuelo.emit(this.tipoVuelo);
          this.outIndexTramo.emit(this.indexTramo);
        },
        err => {
          this.spinner.hide();
          this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
        },
        () => {
          this.spinner.hide();
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
      if (this.selectedDateRange === undefined) {
        console.log(666);
        $("#txtSelectedDateRange").addClass("campo-invalido");
        flagVal = false;
      } else {
        console.log(777);
        $("#txtSelectedDateRange").removeClass("campo-invalido");
        if (this.selectedDateRange.start == null) {
          $("#txtSelectedDateRange").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtSelectedDateRange").removeClass("campo-invalido");
        }
        if (this.selectedDateRange.end == null) {
          $("#txtSelectedDateRange").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtSelectedDateRange").removeClass("campo-invalido");
        }
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
      if (this.selectedDate == null) {
        $("#txtSelectedDate").addClass("campo-invalido");
        flagVal = false;
      } else {
        $("#txtSelectedDate").removeClass("campo-invalido");
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
        if (this.selectedDate1 === undefined) {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if (this.selectedDate2 === undefined) {
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
        if (this.selectedDate1 === undefined) {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if (this.selectedDate2 === undefined) {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if (this.selectedDate3 === undefined) {
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
        if (this.selectedDate1 === undefined) {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if (this.selectedDate2 === undefined) {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if (this.selectedDate3 === undefined) {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
        if (this.selectedDate4 === undefined) {
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
        if (this.selectedDate1 === undefined) {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if (this.selectedDate2 === undefined) {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if (this.selectedDate3 === undefined) {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
        if (this.selectedDate4 === undefined) {
          $("#txtFechaSalida4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida4").removeClass("campo-invalido");
        }
        if (this.selectedDate5 === undefined) {
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
        if (this.selectedDate1 === undefined) {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if (this.selectedDate2 === undefined) {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if (this.selectedDate3 === undefined) {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
        if (this.selectedDate4 === undefined) {
          $("#txtFechaSalida4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida4").removeClass("campo-invalido");
        }
        if (this.selectedDate5 === undefined) {
          $("#txtFechaSalida5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida5").removeClass("campo-invalido");
        }
        if (this.selectedDate6 === undefined) {
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

  changeDateRangeAdv(event) {
    console.log("changeDateRangeAdv");
    console.log(event);
    if (event != undefined) {
      console.log(event.start);
      console.log(event.end);
      this.selectedDate = event.start;
    }
  }

  changeDateAdv(event) {
    console.log("changeDateAdv");
    console.log(event);
    if (event != null) {
      if (this.selectedDateRange === undefined) {
        const dateRange = {
          "start": event,
          "end": null
        };
        this.selectedDateRange = dateRange;
      } else {
        this.selectedDateRange.start = event;
      }
    }
  }

  updateSelectedDate1(event) {
    console.log("updateSelectedDate1");
    console.log(event);
    this.selectedDate1 = event;
    console.log("this.selectedDate1: " + this.selectedDate1);
  }

  updateSelectedDate2(event) {
    console.log("updateSelectedDate2");
    console.log(event);
    this.selectedDate2 = event;
    console.log("this.selectedDate2: " + this.selectedDate2);
  }

  updateSelectedDate3(event) {
    this.selectedDate3 = event;
  }

  updateSelectedDate4(event) {
    this.selectedDate4 = event;
  }

  updateSelectedDate5(event) {
    this.selectedDate5 = event;
  }

  updateSelectedDate6(event) {
    this.selectedDate6 = event;
  }

  formatDate1(value) {
    console.log("formatDate1");
    var dd = value.getDate();
    var mm = value.getMonth() + 1;
    var yyyy = value.getFullYear();
    const fechatotal = yyyy + '-' + mm + '-' + dd;
    console.log("fechatotal: " + fechatotal);
    return fechatotal;
  }

  formatDate2(value) {
    if (value === null || value === undefined) {
      return "";
    }
    console.log("formatDate1");
    var dd = value.getDate();
    var mm = value.getMonth() + 1;
    var yyyy = value.getFullYear();
    const fechatotal = dd + '/' + mm + '/' + yyyy;
    console.log("fechatotal: " + fechatotal);
    return fechatotal;
  }

}
