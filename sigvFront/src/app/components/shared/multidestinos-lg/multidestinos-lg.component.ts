import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { AirportService } from '../../../services/airport.service';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';
import * as moment from "moment";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-multidestinos-lg',
  templateUrl: './multidestinos-lg.component.html',
  styleUrls: ['./multidestinos-lg.component.sass']
})
export class MultidestinosLgComponent implements OnInit {

  model: any = {};
  dateCustomClasses: DatepickerDateCustomClasses[];

  @Input() inOrigenValue;
  @Input() inOrigenText;
  @Input() inDestinoValue;
  @Input() inDestinoText;
  @Input() inFechaSalidaValue;
  @Input() inFechaSalidaText;

  @Output() outIndexTramo = new EventEmitter<number>();

  @Output() outOrigenValue1 = new EventEmitter<string>();
  @Output() outOrigenText1 = new EventEmitter<string>();
  @Output() outOrigenValue2 = new EventEmitter<string>();
  @Output() outOrigenText2 = new EventEmitter<string>();
  @Output() outOrigenValue3 = new EventEmitter<string>();
  @Output() outOrigenText3 = new EventEmitter<string>();
  @Output() outOrigenValue4 = new EventEmitter<string>();
  @Output() outOrigenText4 = new EventEmitter<string>();
  @Output() outOrigenValue5 = new EventEmitter<string>();
  @Output() outOrigenText5 = new EventEmitter<string>();
  @Output() outOrigenValue6 = new EventEmitter<string>();
  @Output() outOrigenText6 = new EventEmitter<string>();

  @Output() outDestinoValue1 = new EventEmitter<string>();
  @Output() outDestinoText1 = new EventEmitter<string>();
  @Output() outDestinoValue2 = new EventEmitter<string>();
  @Output() outDestinoText2 = new EventEmitter<string>();
  @Output() outDestinoValue3 = new EventEmitter<string>();
  @Output() outDestinoText3 = new EventEmitter<string>();
  @Output() outDestinoValue4 = new EventEmitter<string>();
  @Output() outDestinoText4 = new EventEmitter<string>();
  @Output() outDestinoValue5 = new EventEmitter<string>();
  @Output() outDestinoText5 = new EventEmitter<string>();
  @Output() outDestinoValue6 = new EventEmitter<string>();
  @Output() outDestinoText6 = new EventEmitter<string>();

  @Output() outFechaSalida1 = new EventEmitter<string>();
  @Output() outFechaSalida2 = new EventEmitter<string>();
  @Output() outFechaSalida3 = new EventEmitter<string>();
  @Output() outFechaSalida4 = new EventEmitter<string>();
  @Output() outFechaSalida5 = new EventEmitter<string>();
  @Output() outFechaSalida6 = new EventEmitter<string>();

  @Output() outFechaSalidaShow1 = new EventEmitter<string>();
  @Output() outFechaSalidaShow2 = new EventEmitter<string>();
  @Output() outFechaSalidaShow3 = new EventEmitter<string>();
  @Output() outFechaSalidaShow4 = new EventEmitter<string>();
  @Output() outFechaSalidaShow5 = new EventEmitter<string>();
  @Output() outFechaSalidaShow6 = new EventEmitter<string>();

  airportlist: any[] = [];
  citylist: any[] = [];
  lstAutocomplete: any[] = [];
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
  data11: any[] = [];
  data12: any[] = [];
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
  flagTramo3: boolean;
  flagTramo4: boolean;
  flagTramo5: boolean;
  flagTramo6: boolean;
  indexTramo: number;
  lTramoOrigen: any[] = [];
  lTramoDestino: any[] = [];
  minDateSalida1: Date;
  minDateSalida2: Date;
  minDateSalida3: Date;
  minDateSalida4: Date;
  minDateSalida5: Date;
  minDateSalida6: Date;
  fechaSalida1: string;
  fechaSalida2: string;
  fechaSalida3: string;
  fechaSalida4: string;
  fechaSalida5: string;
  fechaSalida6: string;
  bsValue = new Date();
  calendarSalidaValue1: Date;
  calendarSalidaValue2: Date;
  calendarSalidaValue3: Date;
  calendarSalidaValue4: Date;
  calendarSalidaValue5: Date;
  calendarSalidaValue6: Date;

  hoy = new Date();
  maxDate = new Date(2200, 12, 12);
  maxDate2 = new Date(2021, 12, 12);

  selectedDate1;
  selectedDate2;
  selectedDate3;
  selectedDate4;
  selectedDate5;
  selectedDate6;


  singleDatePickerProps1 = {
    "id": "singleDate1",
    "placeholder": "Salida",
    "displayFormat": "DD/MM/YYYY",
    "showDefaultInputIcon": true,
    "initialVisibleMonth": () => moment(),
    "focused": false
  };
  singleDatePickerProps2 = {
    "id": "singleDate2",
    "placeholder": "Salida",
    "displayFormat": "DD/MM/YYYY",
    "showDefaultInputIcon": true,
    "initialVisibleMonth": () => this.formatDateMoment(this.selectedDate1, 1),
    "focused": false
  };
  singleDatePickerProps3 = {
    "id": "singleDate3",
    "placeholder": "Salida",
    "displayFormat": "DD/MM/YYYY",
    "showDefaultInputIcon": true,
    "initialVisibleMonth": () => this.formatDateMoment(this.selectedDate2, 2),
    "focused": false
  };
  singleDatePickerProps4 = {
    "id": "singleDate4",
    "placeholder": "Salida",
    "displayFormat": "DD/MM/YYYY",
    "showDefaultInputIcon": true,
    "initialVisibleMonth": () => this.formatDateMoment(this.selectedDate3, 3),
    "focused": false
  };
  singleDatePickerProps5 = {
    "id": "singleDate5",
    "placeholder": "Salida",
    "displayFormat": "DD/MM/YYYY",
    "showDefaultInputIcon": true,
    "initialVisibleMonth": () => this.formatDateMoment(this.selectedDate4, 4),
    "focused": false
  };
  singleDatePickerProps6 = {
    "id": "singleDate6",
    "placeholder": "Salida",
    "displayFormat": "DD/MM/YYYY",
    "showDefaultInputIcon": true,
    "initialVisibleMonth": () => this.formatDateMoment(this.selectedDate5, 5),
    "focused": false
  };

  @Output() outSelectedDate1 = new EventEmitter<Date>();
  @Output() outSelectedDate2 = new EventEmitter<Date>();
  @Output() outSelectedDate3 = new EventEmitter<Date>();
  @Output() outSelectedDate4 = new EventEmitter<Date>();
  @Output() outSelectedDate5 = new EventEmitter<Date>();
  @Output() outSelectedDate6 = new EventEmitter<Date>();

  txtPopover1 = "Fecha fuera de rango!!!";

  isOpen1 = false;
  isOpen2 = false;
  isOpen3 = false;
  isOpen4 = false;
  isOpen5 = false;
  isOpen6 = false;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private airportService: AirportService
  ) {
    console.log("moment(): " + moment());
    console.log("moment(): " + moment());
    console.log("moment(): " + moment());
    console.log("moment(): " + moment("2020-12-12", "YYYY-MM-DD"));
    this.flagTramo3 = false;
    this.flagTramo4 = false;
    this.flagTramo5 = false;
    this.flagTramo6 = false;
    this.indexTramo = 2;
    this.minDateSalida1 = new Date();
    this.minDateSalida1.setDate(this.minDateSalida1.getDate());
    this.minDateSalida2 = new Date();
    this.minDateSalida2.setDate(this.minDateSalida2.getDate());
    this.minDateSalida3 = new Date();
    this.minDateSalida3.setDate(this.minDateSalida3.getDate());
    this.minDateSalida4 = new Date();
    this.minDateSalida4.setDate(this.minDateSalida4.getDate());
    this.minDateSalida5 = new Date();
    this.minDateSalida5.setDate(this.minDateSalida5.getDate());
    this.minDateSalida6 = new Date();
    this.minDateSalida6.setDate(this.minDateSalida6.getDate());
    const now = new Date();
    this.dateCustomClasses = [
      { date: now, classes: ['bg-danger', 'text-warning'] }
    ];
  }

  ngOnInit() {
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.citylist = this.localStorageService.retrieve('ls_citylist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.outIndexTramo.emit(this.indexTramo);

    this.origenAuto1 = this.inOrigenValue;
    this.origentTexto1 = this.inOrigenText;
    this.model.origentTexto1 = this.inOrigenText;
    this.outOrigenValue1.emit(this.inOrigenValue);
    this.outOrigenText1.emit(this.inOrigenText);

    this.destinoAuto1 = this.inDestinoValue;
    this.destinoTexto1 = this.inDestinoText;
    this.model.destinoTexto1 = this.inDestinoText;
    this.outDestinoValue1.emit(this.inDestinoValue);
    this.outDestinoText1.emit(this.inDestinoText);

    this.fechaSalida1 = this.inFechaSalidaValue;
    this.model.salida1 = this.inFechaSalidaText;
    this.outFechaSalida1.emit(this.inFechaSalidaValue);
    this.outFechaSalidaShow1.emit(this.inFechaSalidaText);

    if (this.inFechaSalidaText != null || this.inFechaSalidaText != undefined) {
      const fechaSplit = this.inFechaSalidaText.split('/');
      const dia = fechaSplit[0];
      const mes = fechaSplit[1];
      const anho = fechaSplit[2];
      this.minDateSalida1 = new Date();
      this.minDateSalida1.setDate(this.minDateSalida1.getDate());
      this.minDateSalida2 = new Date(anho, mes, dia);
      this.minDateSalida2.setDate(this.minDateSalida2.getDate());
      this.minDateSalida3 = new Date(anho, mes, dia);
      this.minDateSalida3.setDate(this.minDateSalida3.getDate());
      this.minDateSalida4 = new Date(anho, mes, dia);
      this.minDateSalida4.setDate(this.minDateSalida4.getDate());
      this.minDateSalida5 = new Date(anho, mes, dia);
      this.minDateSalida5.setDate(this.minDateSalida5.getDate());
      this.minDateSalida6 = new Date(anho, mes, dia);
      this.minDateSalida6.setDate(this.minDateSalida6.getDate());
    }

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

  selectEvent(flag, item) {
    // do something with selected item

    /*
    if (flag === 1) {
      this.origenAuto1 = item.airportCode;
      this.origentTexto1 = item.airportDescription;
      setTimeout(function() {
        $(".x").hide();
      }, 1000);
    }
    */

    switch (flag) {
      case 1:
        this.origenAuto1 = item.iataCode;
        this.origentTexto1 = item.name;
        this.outOrigenValue1.emit(this.origenAuto1);
        this.outOrigenText1.emit(this.origentTexto1);
        $("#txtOrigen1").removeClass("campo-invalido");
        break;
      case 2:
        this.destinoAuto1 = item.iataCode;
        this.destinoTexto1 = item.name;
        this.outDestinoValue1.emit(this.destinoAuto1);
        this.outDestinoText1.emit(this.destinoTexto1);

        this.origenAuto2 = item.iataCode;
        this.origentTexto2 = item.name;
        this.outOrigenValue2.emit(this.destinoAuto1);
        this.outOrigenText2.emit(this.destinoTexto1);

        this.model.origentTexto2 = this.destinoTexto1;

        $("#txtDestino1").removeClass("campo-invalido");
        $("#txtOrigen2").removeClass("campo-invalido");
        break;
      case 3:
        this.origenAuto2 = item.iataCode;
        this.origentTexto2 = item.name;
        this.outOrigenValue2.emit(this.origenAuto2);
        this.outOrigenText2.emit(this.origentTexto2);
        $("#txtOrigen2").removeClass("campo-invalido");
        break;
      case 4:
        this.destinoAuto2 = item.iataCode;
        this.destinoTexto2 = item.name;
        this.outDestinoValue2.emit(this.destinoAuto2);
        this.outDestinoText2.emit(this.destinoTexto2);

        this.origenAuto3 = item.iataCode;
        this.origentTexto3 = item.name;
        this.outOrigenValue3.emit(this.destinoAuto2);
        this.outOrigenText3.emit(this.destinoTexto2);

        this.model.origentTexto3 = this.destinoTexto2;

        $("#txtDestino2").removeClass("campo-invalido");
        $("#txtOrigen3").removeClass("campo-invalido");
        break;
      case 5:
        this.origenAuto3 = item.iataCode;
        this.origentTexto3 = item.name;
        this.outOrigenValue3.emit(this.origenAuto3);
        this.outOrigenText3.emit(this.origentTexto3);
        $("#txtOrigen3").removeClass("campo-invalido");
        break;
      case 6:
        this.destinoAuto3 = item.iataCode;
        this.destinoTexto3 = item.name;
        this.outDestinoValue3.emit(this.destinoAuto3);
        this.outDestinoText3.emit(this.destinoTexto3);

        this.origenAuto4 = item.iataCode;
        this.origentTexto4 = item.name;
        this.outOrigenValue4.emit(this.destinoAuto3);
        this.outOrigenText4.emit(this.destinoTexto3);

        this.model.origentTexto4 = this.destinoTexto3;

        $("#txtDestino3").removeClass("campo-invalido");
        $("#txtOrigen4").removeClass("campo-invalido");
        break;
      case 7:
        this.origenAuto4 = item.iataCode;
        this.origentTexto4 = item.name;
        this.outOrigenValue4.emit(this.origenAuto4);
        this.outOrigenText4.emit(this.origentTexto4);
        $("#txtOrigen4").removeClass("campo-invalido");
        break;
      case 8:
        this.destinoAuto4 = item.iataCode;
        this.destinoTexto4 = item.name;
        this.outDestinoValue4.emit(this.destinoAuto4);
        this.outDestinoText4.emit(this.destinoTexto4);

        this.origenAuto5 = item.iataCode;
        this.origentTexto5 = item.name;
        this.outOrigenValue5.emit(this.destinoAuto4);
        this.outOrigenText5.emit(this.destinoTexto4);

        this.model.origentTexto5 = this.destinoTexto4;

        $("#txtDestino4").removeClass("campo-invalido");
        $("#txtOrigen5").removeClass("campo-invalido");
        break;
      case 9:
        this.origenAuto5 = item.iataCode;
        this.origentTexto5 = item.name;
        this.outOrigenValue5.emit(this.origenAuto5);
        this.outOrigenText5.emit(this.origentTexto5);
        $("#txtOrigen5").removeClass("campo-invalido");
        break;
      case 10:
        this.destinoAuto5 = item.iataCode;
        this.destinoTexto5 = item.name;
        this.outDestinoValue5.emit(this.destinoAuto5);
        this.outDestinoText5.emit(this.destinoTexto5);

        this.origenAuto6 = item.iataCode;
        this.origentTexto6 = item.name;
        this.outOrigenValue6.emit(this.destinoAuto5);
        this.outOrigenText6.emit(this.destinoTexto5);

        this.model.origentTexto6 = this.destinoTexto5;

        $("#txtDestino5").removeClass("campo-invalido");
        $("#txtOrigen6").removeClass("campo-invalido");
        break;
      case 11:
        this.origenAuto6 = item.iataCode;
        this.origentTexto6 = item.name;
        this.outOrigenValue6.emit(this.origenAuto6);
        this.outOrigenText6.emit(this.origentTexto6);
        $("#txtOrigen6").removeClass("campo-invalido");
        break;
      case 12:
        this.destinoAuto6 = item.iataCode;
        this.destinoTexto6 = item.name;
        this.outDestinoValue6.emit(this.destinoAuto6);
        this.outDestinoText6.emit(this.destinoTexto6);
        $("#txtDestino6").removeClass("campo-invalido");
        break;
    }

    setTimeout(function() {
      $(".x").hide();
    }, 1000);

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

    if (flag === 11) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data11 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 12) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0 );
        this.data12 = resultFilter;

        $(".x").hide();
      }
    }
  }

  onFocused(flag, e) {
    // do something when input is focused
  }

  agregarTramo(tramo) {
    this.indexTramo = tramo;
    this.outIndexTramo.emit(this.indexTramo);
    if (tramo === 3) {
      this.flagTramo3 = true;
    }

    if (tramo === 4) {
      this.flagTramo4 = true;
    }

    if (tramo === 5) {
      this.flagTramo5 = true;
    }

    if (tramo === 6) {
      this.flagTramo6 = true;
    }
  }

  eliminarTramo(tramo) {
    this.indexTramo = tramo - 1;
    this.outIndexTramo.emit(this.indexTramo);
    if (tramo === 3) {
      this.flagTramo3 = false;
      this.origentTexto3 = '';
      this.destinoTexto3 = '';
    }

    if (tramo === 4) {
      this.flagTramo4 = false;
      this.origentTexto4 = '';
      this.destinoTexto4 = '';
    }

    if (tramo === 5) {
      this.flagTramo5 = false;
      this.origentTexto5 = '';
      this.destinoTexto5 = '';
    }

    if (tramo === 6) {
      this.flagTramo6 = false;
      this.origentTexto6 = '';
      this.destinoTexto6 = '';
    }
  }

  onValueChangeSalida1(value: Date): void {
    $("#txtFechaSalida1").removeClass("campo-invalido");
    this.minDateSalida2 = value;
    this.minDateSalida3 = value;
    this.minDateSalida4 = value;
    this.minDateSalida5 = value;
    this.minDateSalida6 = value;

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

    if (value >= this.calendarSalidaValue2) {
      $("#calendar2").val("");
      this.fechaSalida2 = '';
    }
    this.fechaSalida1 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida1.emit(this.fechaSalida1);
    this.outFechaSalidaShow1.emit(dia + "/" + mes + "/" +  value.getFullYear());
  }

  onValueChangeSalida2(value: Date): void {
    $("#txtFechaSalida2").removeClass("campo-invalido");
    this.minDateSalida3 = value;
    this.minDateSalida4 = value;
    this.minDateSalida5 = value;
    this.minDateSalida6 = value;
    this.calendarSalidaValue2 = value;

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

    if (value >= this.calendarSalidaValue3) {
      $("#calendar3").val("");
      this.fechaSalida3 = '';
      this.outFechaSalida3.emit(this.fechaSalida3);
    }

    this.fechaSalida2 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida2.emit(this.fechaSalida2);
    this.outFechaSalidaShow2.emit(dia + "/" + mes + "/" +  value.getFullYear());
  }

  onValueChangeSalida3(value: Date): void {
    $("#txtFechaSalida3").removeClass("campo-invalido");
    this.minDateSalida4 = value;
    this.minDateSalida5 = value;
    this.minDateSalida6 = value;
    this.calendarSalidaValue3 = value;

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

    if (value >= this.calendarSalidaValue4) {
      $("#calendar4").val("");
      this.fechaSalida4 = '';
      this.outFechaSalida4.emit(this.fechaSalida4);
    }

    this.fechaSalida3 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida3.emit(this.fechaSalida3);
    this.outFechaSalidaShow3.emit(dia + "/" + mes + "/" +  value.getFullYear());
  }

  onValueChangeSalida4(value: Date): void {
    $("#txtFechaSalida4").removeClass("campo-invalido");
    this.minDateSalida5 = value;
    this.minDateSalida6 = value;
    this.calendarSalidaValue4 = value;

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

    if (value >= this.calendarSalidaValue5) {
      $("#calendar5").val("");
      this.fechaSalida5 = '';
      this.outFechaSalida5.emit(this.fechaSalida5);
    }

    this.fechaSalida4 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida4.emit(this.fechaSalida4);
    this.outFechaSalidaShow4.emit(dia + "/" + mes + "/" +  value.getFullYear());
  }

  onValueChangeSalida5(value: Date): void {
    $("#txtFechaSalida5").removeClass("campo-invalido");
    this.minDateSalida6 = value;
    this.calendarSalidaValue5 = value;

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

    if (value >= this.calendarSalidaValue6) {
      $("#calendar6").val("");
      this.fechaSalida6 = '';
      this.outFechaSalida6.emit(this.fechaSalida6);
    }

    this.fechaSalida5 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida5.emit(this.fechaSalida5);
    this.outFechaSalidaShow5.emit(dia + "/" + mes + "/" +  value.getFullYear());
  }

  onValueChangeSalida6(value: Date): void {
    $("#txtFechaSalida6").removeClass("campo-invalido");
    this.calendarSalidaValue6 = value;
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

    this.fechaSalida6 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida6.emit(this.fechaSalida6);
    this.outFechaSalidaShow6.emit(dia + "/" + mes + "/" +  value.getFullYear());
  }

  _changeDateAdv1(event) {
    console.log("changeDateAdv1");
    console.log("event" + event);
    this.isOpen1 = false;

    if (this.selectedDate2 !== null) {
      if (event >= this.selectedDate2) {
        this.selectedDate1 = null;
        this.isOpen1 = true;
        return false;
      }
    }

    if (event != null) {
      this.outSelectedDate1.emit(event);
    }
  }
  _changeDateAdv2(event) {
    console.log("changeDateAdv2");
    console.log(event);
    this.isOpen2 = false;

    if (this.selectedDate1 !== null) {
      if (event < this.selectedDate1) {
        this.isOpen2 = true;
        this.selectedDate2 = null;
        return false;
      }
    }

    if (this.selectedDate3 !== null) {
      if (event >= this.selectedDate3) {
        this.selectedDate2 = null;
        this.isOpen2 = true;
        return false;
      }
    }


    if (event != null) {
      this.outSelectedDate2.emit(event);
    }
  }
  changeDateAdv3(event) {
    console.log("changeDateAdv3");
    console.log(event);
    this.isOpen3 = false;

    if (this.selectedDate2 !== null) {
      if (event < this.selectedDate2) {
        this.selectedDate3 = null;
        this.isOpen3 = true;
        return false;
      }
    }

    if (this.selectedDate4 !== null) {
      if (event >= this.selectedDate4) {
        this.selectedDate3 = null;
        this.isOpen3 = true;
        return false;
      }
    }

    if (event != null) {
      this.outSelectedDate3.emit(event);
    }
  }
  changeDateAdv4(event) {
    console.log("changeDateAdv4");
    console.log(event);
    this.isOpen4 = false;

    if (this.selectedDate3 !== null) {
      if (event < this.selectedDate3) {
        this.selectedDate4 = null;
        this.isOpen4 = true;
        return false;
      }
    }

    if (this.selectedDate5 !== null) {
      if (event >= this.selectedDate5) {
        this.selectedDate4 = null;
        this.isOpen4 = true;
        return false;
      }
    }

    if (event != null) {
      this.outSelectedDate4.emit(event);
    }
  }
  changeDateAdv5(event) {
    console.log("changeDateAdv5");
    console.log(event);
    this.isOpen5 = false;

    if (this.selectedDate4 !== null) {
      if (event < this.selectedDate4) {
        this.selectedDate5 = null;
        this.isOpen5 = true;
        return false;
      }
    }

    if (this.selectedDate6 !== null) {
      if (event >= this.selectedDate6) {
        this.selectedDate5 = null;
        this.isOpen5 = true;
        return false;
      }
    }

    if (event != null) {
      this.outSelectedDate5.emit(event);
    }
  }
  changeDateAdv6(event) {
    console.log("changeDateAdv6");
    console.log(event);
    this.isOpen6 = false;

    if (this.selectedDate5 !== null) {
      if (event < this.selectedDate5) {
        this.selectedDate6 = null;
        this.isOpen6 = true;
        return false;
      }
    }

    if (event != null) {
      this.outSelectedDate6.emit(event);
    }
  }

  showMonth(value) {
    const day = moment("2020-12-12", "YYYY-MM-DD");
    console.log("day: " + day);
    console.log("day: " + day);
    console.log("day: " + day);
    console.log("day: " + day);
    return day;
  }

  showPopover(popover) {
    this.txtPopover1 = "XXX";
    popover.show();
  }

  formatDateMoment(value, index) {
    console.log("formatDate1");
    console.log("value: " + value);
    console.log("value: " + value);
    console.log("value: " + value);
    if (value === null) {
      //alert("Ingreser la fecha anterior!!!");
      //console.log("this.singleDatePickerProps1.focused: " + this.singleDatePickerProps1.focused);
      //this.singleDatePickerProps1.focused = true;
      //console.log("this.singleDatePickerProps1.focused: " + this.singleDatePickerProps1.focused);
      return moment();
    }
    var dd = value.getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }
    var mm = value.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    var yyyy = value.getFullYear();
    const fechatotal = yyyy + '-' + mm + '-' + dd;
    console.log("fechatotal: " + fechatotal);
    const momentDate = moment(fechatotal, "YYYY-MM-DD");
    return momentDate;
  }

  formatDateYYYYMMDD(value) {
    console.log("formatDate1");
    var dd = value.getDate();
    if (dd < 10) {
      dd = "0" + dd;
    }
    var mm = value.getMonth() + 1;
    if (mm < 10) {
      mm = "0" + mm;
    }
    var yyyy = value.getFullYear();
    const fechatotal = yyyy + '-' + mm + '-' + dd;
    return fechatotal;
  }

}
