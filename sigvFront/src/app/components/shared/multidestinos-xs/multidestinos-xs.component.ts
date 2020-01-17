import {Component, OnInit, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { AirportService } from '../../../services/airport.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadWindow } from '@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-multidestinos-xs',
  templateUrl: './multidestinos-xs.component.html',
  styleUrls: ['./multidestinos-xs.component.sass']
})
export class MultidestinosXsComponent implements OnInit, AfterViewInit {

  model: any = {};

  @Input() inIndexTramo;

  @Input() infechaSalida1;
  @Input() infechaSalida2;
  @Input() infechaSalida3;
  @Input() infechaSalida4;
  @Input() infechaSalida5;
  @Input() infechaSalida6;

  @Input() infechaSalidaShow1;
  @Input() infechaSalidaShow2;
  @Input() infechaSalidaShow3;
  @Input() infechaSalidaShow4;
  @Input() infechaSalidaShow5;
  @Input() infechaSalidaShow6;

  @Input() inorigenAuto1;
  @Input() inorigenAuto2;
  @Input() inorigenAuto3;
  @Input() inorigenAuto4;
  @Input() inorigenAuto5;
  @Input() inorigenAuto6;
  @Input() inorigentTexto1;
  @Input() inorigentTexto2;
  @Input() inorigentTexto3;
  @Input() inorigentTexto4;
  @Input() inorigentTexto5;
  @Input() inorigentTexto6;
  @Input() indestinoAuto1;
  @Input() indestinoAuto2;
  @Input() indestinoAuto3;
  @Input() indestinoAuto4;
  @Input() indestinoAuto5;
  @Input() indestinoAuto6;
  @Input() indestinoTexto1;
  @Input() indestinoTexto2;
  @Input() indestinoTexto3;
  @Input() indestinoTexto4;
  @Input() indestinoTexto5;
  @Input() indestinoTexto6;

  @Input() inOrigenValue;
  @Input() inOrigenText;
  @Input() inDestinoValue;
  @Input() inDestinoText;
  @Input() inFechaSalidaValue;
  @Input() inFechaSalidaText;

  @Input() inTipoVuelo;

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

  lstDestinos: any[] = [];

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
  fecha1: string;
  fecha2: string;
  fecha3: string;
  fecha4: string;
  fecha5: string;
  fecha6: string;
  calendarSalidaValue1: Date;
  calendarSalidaValue2: Date;
  calendarSalidaValue3: Date;
  calendarSalidaValue4: Date;
  calendarSalidaValue5: Date;
  calendarSalidaValue6: Date;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private airportService: AirportService
  ) {
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
  }

  ngOnInit() {
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.citylist = this.localStorageService.retrieve('ls_citylist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.outIndexTramo.emit(this.indexTramo);

    this.origenAuto1 = this.inorigenAuto1;
    this.origentTexto1 = this.inorigentTexto1;
    //this.origentTexto1 = this.inOrigenText;
    this.outOrigenValue1.emit(this.inorigenAuto1);
    this.outOrigenText1.emit(this.inorigentTexto1);

    this.destinoAuto1 = this.indestinoAuto1;
    this.destinoTexto1 = this.indestinoTexto1;
    //this.destinoTexto1 = this.inDestinoText;
    this.outDestinoValue1.emit(this.indestinoAuto1);
    this.outDestinoText1.emit(this.indestinoTexto1);

    this.outFechaSalida1.emit(this.infechaSalida1);
    this.outFechaSalidaShow1.emit(this.infechaSalidaShow1);

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
    const inIndexTramo = this.inIndexTramo;
    for (let i = 3; i <= inIndexTramo; i++) {
      this.agregarTramo(i);
    }

    //undefined

    if (this.infechaSalidaShow1 != undefined) {
      this.fecha1 = this.infechaSalidaShow1;
    }
    //$('#datepickerSalida1').val(this.infechaSalidaShow1);

    if (this.infechaSalida1 != undefined) {
      this.fechaSalida1 = this.infechaSalida1;
    }
    if (this.inorigenAuto1 != undefined) {
      this.origenAuto1 = this.inorigenAuto1;
    }
    if (this.inorigentTexto1 != undefined) {
      this.origentTexto1 = this.inorigentTexto1;
    }
    if (this.indestinoAuto1 != undefined) {
      this.destinoAuto1 = this.indestinoAuto1;
    }
    if (this.indestinoTexto1 != undefined) {
      this.destinoTexto1 = this.indestinoTexto1;
    }

    this.fecha2 = this.infechaSalidaShow2;
    //$('#datepickerSalida2').val(this.infechaSalidaShow2);
    this.fechaSalida2 = this.infechaSalida2;
    this.origenAuto2 = this.inorigenAuto2;
    this.origentTexto2 = this.inorigentTexto2;
    this.destinoAuto2 = this.indestinoAuto2;
    this.destinoTexto2 = this.indestinoTexto2;

    this.fecha3 = this.infechaSalidaShow3;
    //$('#datepickerSalida3').val(this.infechaSalidaShow3);
    this.fechaSalida3 = this.infechaSalida3;
    this.origenAuto3 = this.inorigenAuto3;
    this.origentTexto3 = this.inorigentTexto3;
    this.destinoAuto3 = this.indestinoAuto3;
    this.destinoTexto3 = this.indestinoTexto3;

    if (inIndexTramo >= 4) {
      this.fecha4 = this.infechaSalidaShow4;
      //$('#datepickerSalida4').val(this.infechaSalidaShow4);
      this.fechaSalida4 = this.infechaSalida4;
      this.origenAuto4 = this.inorigenAuto4;
      this.origentTexto4 = this.inorigentTexto4;
      this.destinoAuto4 = this.indestinoAuto4;
      this.destinoTexto4 = this.indestinoTexto4;
    }

    if (inIndexTramo >= 5) {
      this.fecha5 = this.infechaSalidaShow5;
      //$('#datepickerSalida5').val(this.infechaSalidaShow5);
      this.fechaSalida5 = this.infechaSalida5;
      this.origenAuto5 = this.inorigenAuto5;
      this.origentTexto5 = this.inorigentTexto5;
      this.destinoAuto5 = this.indestinoAuto5;
      this.destinoTexto5 = this.indestinoTexto5;
    }

    if (inIndexTramo >= 6) {
      this.fecha6 = this.infechaSalidaShow6;
      //$('#datepickerSalida6').val(this.infechaSalidaShow6);
      this.fechaSalida6 = this.infechaSalida6;
      this.origenAuto6 = this.inorigenAuto6;
      this.origentTexto6 = this.inorigentTexto6;
      this.destinoAuto6 = this.indestinoAuto6;
      this.destinoTexto6 = this.indestinoTexto6;
    }

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
        //$(".x").show();
        const data1 = {
          value: this.origenAuto1,
          text: this.origentTexto1,
          index: 1
        };
        this.lstDestinos.push(data1);
        $("#txtOrigen1").removeClass("campo-invalido");
        break;
      case 2:
        this.destinoAuto1 = item.iataCode;
        this.destinoTexto1 = item.name;
        this.outDestinoValue1.emit(this.destinoAuto1);
        this.outDestinoText1.emit(this.destinoTexto1);
        //$(".x").show();
        const data2 = {
          value: this.destinoAuto1,
          text: this.destinoTexto1,
          index: 2
        };
        this.lstDestinos.push(data2);

        this.origenAuto2 = item.iataCode;
        this.origentTexto2 = item.name;
        this.outOrigenValue2.emit(this.destinoAuto1);
        this.outOrigenText2.emit(this.destinoTexto1);

        //this.model.origentTexto2 = this.destinoTexto1;

        $("#txtDestino1").removeClass("campo-invalido");
        $("#txtOrigen2").removeClass("campo-invalido");
        break;
      case 3:
        this.origenAuto2 = item.iataCode;
        this.origentTexto2 = item.name;
        this.outOrigenValue2.emit(this.origenAuto2);
        this.outOrigenText2.emit(this.origentTexto2);
        //$(".x").show();
        const data3 = {
          value: this.origenAuto2,
          text: this.origentTexto2,
          index: 3
        };
        this.lstDestinos.push(data3);
        $("#txtOrigen2").removeClass("campo-invalido");
        break;
      case 4:
        this.destinoAuto2 = item.iataCode;
        this.destinoTexto2 = item.name;
        this.outDestinoValue2.emit(this.destinoAuto2);
        this.outDestinoText2.emit(this.destinoTexto2);
        //$(".x").show();
        const data4 = {
          value: this.destinoAuto2,
          text: this.destinoTexto2,
          index: 4
        };
        this.lstDestinos.push(data4);

        this.origenAuto3 = item.iataCode;
        this.origentTexto3 = item.name;
        this.outOrigenValue3.emit(this.destinoAuto2);
        this.outOrigenText3.emit(this.destinoTexto2);

        $("#txtDestino2").removeClass("campo-invalido");
        $("#txtOrigen3").removeClass("campo-invalido");
        break;
      case 5:
        this.origenAuto3 = item.iataCode;
        this.origentTexto3 = item.name;
        this.outOrigenValue3.emit(this.origenAuto3);
        this.outOrigenText3.emit(this.origentTexto3);
        //$(".x").show();
        const data5 = {
          value: this.origenAuto3,
          text: this.origentTexto3,
          index: 5
        };
        this.lstDestinos.push(data5);
        $("#txtOrigen3").removeClass("campo-invalido");
        break;
      case 6:
        this.destinoAuto3 = item.iataCode;
        this.destinoTexto3 = item.name;
        this.outDestinoValue3.emit(this.destinoAuto3);
        this.outDestinoText3.emit(this.destinoTexto3);
        //$(".x").show();
        const data6 = {
          value: this.destinoAuto3,
          text: this.destinoTexto3,
          index: 6
        };
        this.lstDestinos.push(data6);

        this.origenAuto4 = item.iataCode;
        this.origentTexto4 = item.name;
        this.outOrigenValue4.emit(this.destinoAuto3);
        this.outOrigenText4.emit(this.destinoTexto3);

        $("#txtDestino3").removeClass("campo-invalido");
        $("#txtOrigen4").removeClass("campo-invalido");
        break;
      case 7:
        this.origenAuto4 = item.iataCode;
        this.origentTexto4 = item.name;
        this.outOrigenValue4.emit(this.origenAuto4);
        this.outOrigenText4.emit(this.origentTexto4);
        //$(".x").show();
        const data7 = {
          value: this.origenAuto4,
          text: this.origentTexto4,
          index: 7
        };
        this.lstDestinos.push(data7);
        $("#txtOrigen4").removeClass("campo-invalido");
        break;
      case 8:
        this.destinoAuto4 = item.iataCode;
        this.destinoTexto4 = item.name;
        this.outDestinoValue4.emit(this.destinoAuto4);
        this.outDestinoText4.emit(this.destinoTexto4);
        //$(".x").show();
        const data8 = {
          value: this.destinoAuto4,
          text: this.destinoTexto4,
          index: 8
        };
        this.lstDestinos.push(data8);

        this.origenAuto5 = item.iataCode;
        this.origentTexto5 = item.name;
        this.outOrigenValue5.emit(this.destinoAuto4);
        this.outOrigenText5.emit(this.destinoTexto4);
       // $(".x").show();

        $("#txtDestino4").removeClass("campo-invalido");
        $("#txtOrigen5").removeClass("campo-invalido");
        break;
      case 9:
        this.origenAuto5 = item.iataCode;
        this.origentTexto5 = item.name;
        this.outOrigenValue5.emit(this.origenAuto5);
        this.outOrigenText5.emit(this.origentTexto5);
       // $(".x").show();
        const data9 = {
          value: this.origenAuto5,
          text: this.origentTexto5,
          index: 9
        };
        this.lstDestinos.push(data9);
        $("#txtOrigen5").removeClass("campo-invalido");
        break;
      case 10:
        this.destinoAuto5 = item.iataCode;
        this.destinoTexto5 = item.name;
        this.outDestinoValue5.emit(this.destinoAuto5);
        this.outDestinoText5.emit(this.destinoTexto5);
       // $(".x").show();
        const data10 = {
          value: this.destinoAuto5,
          text: this.destinoTexto5,
          index: 10
        };
        this.lstDestinos.push(data10);

        this.origenAuto6 = item.iataCode;
        this.origentTexto6 = item.name;
        this.outOrigenValue6.emit(this.destinoAuto5);
        this.outOrigenText6.emit(this.destinoTexto5);

        $("#txtDestino5").removeClass("campo-invalido");
        $("#txtOrigen6").removeClass("campo-invalido");
        break;
      case 11:
        this.origenAuto6 = item.iataCode;
        this.origentTexto6 = item.name;
        this.outOrigenValue6.emit(this.origenAuto6);
        this.outOrigenText6.emit(this.origentTexto6);
        //$(".x").show();
        const data11 = {
          value: this.origenAuto6,
          text: this.origentTexto6,
          index: 11
        };
        this.lstDestinos.push(data11);
        $("#txtOrigen6").removeClass("campo-invalido");
        break;
      case 12:
        this.destinoAuto6 = item.iataCode;
        this.destinoTexto6 = item.name;
        this.outDestinoValue6.emit(this.destinoAuto6);
        this.outDestinoText6.emit(this.destinoTexto6);
       // $(".x").show();
        const data12 = {
          value: this.destinoAuto6,
          text: this.destinoTexto6,
          index: 12
        };
        this.lstDestinos.push(data12);
        $("#txtDestino6").removeClass("campo-invalido");
        break;
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
    if (value != null) {
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
        $("#datepickerSalida2").val("");
        this.fechaSalida2 = '';
        this.outFechaSalida2.emit(this.fechaSalida2);
      }

      this.fechaSalida1 = value.getFullYear() + "/" + mes + "/" + dia;
      let fechasalidashow1 = dia + '/' + mes + '/' + value.getFullYear();
      this.outFechaSalida1.emit(this.fechaSalida1);
      this.outFechaSalidaShow1.emit(fechasalidashow1);
    }
  }

  onValueChangeSalida2(value: Date): void {
    if (value != null) {
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
        $("#datepickerSalida3").val("");
        this.fechaSalida3 = '';
        this.outFechaSalida3.emit(this.fechaSalida3);
      }

      this.fechaSalida2 = value.getFullYear() + "/" + mes + "/" + dia;
      let fechasalidashow2 = dia + '/' + mes + '/' + value.getFullYear();
      this.outFechaSalidaShow2.emit(fechasalidashow2);
      this.outFechaSalida2.emit(this.fechaSalida2);
    }
  }

  onValueChangeSalida3(value: Date): void {
    if (value != null) {
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
        $("#datepickerSalida4").val("");
        this.fechaSalida4 = '';
        this.outFechaSalida4.emit(this.fechaSalida4);
      }

      this.fechaSalida3 = value.getFullYear() + "/" + mes + "/" + dia;
      let fechasalidashow3 = dia + '/' + mes + '/' + value.getFullYear();
      this.outFechaSalida3.emit(this.fechaSalida3);
      this.outFechaSalidaShow3.emit(fechasalidashow3);
    }
  }

  onValueChangeSalida4(value: Date): void {
    if (value != null) {
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
        $("#datepickerSalida5").val("");
        this.fechaSalida5 = '';
        this.outFechaSalida5.emit(this.fechaSalida5);
      }

      this.fechaSalida4 = value.getFullYear() + "/" + mes + "/" + dia;
      let fechasalidashow4 = dia + '/' + mes + '/' + value.getFullYear();
      this.outFechaSalida4.emit(this.fechaSalida4);
      this.outFechaSalidaShow4.emit(fechasalidashow4);
    }
  }

  onValueChangeSalida5(value: Date): void {
    if (value != null) {
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
        $("#datepickerSalida6").val("");
        this.fechaSalida6 = '';
        this.outFechaSalida6.emit(this.fechaSalida6);
      }

      this.fechaSalida5 = value.getFullYear() + "/" + mes + "/" + dia;
      let fechasalidashow5 = dia + '/' + mes + '/' + value.getFullYear();
      this.outFechaSalida5.emit(this.fechaSalida5);
      this.outFechaSalidaShow5.emit(fechasalidashow5);
    }
  }

  onValueChangeSalida6(value: Date): void {
    if (value != null) {
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
      let fechasalidashow6 = dia + '/' + mes + '/' + value.getFullYear();
      this.outFechaSalida6.emit(this.fechaSalida6);
      this.outFechaSalidaShow6.emit(fechasalidashow6);
    }
  }

}
