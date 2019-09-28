import {Component, OnInit, Output, EventEmitter, Input, AfterViewInit} from '@angular/core';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { AirportService } from '../../../services/airport.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-multidestinos-xs',
  templateUrl: './multidestinos-xs.component.html',
  styleUrls: ['./multidestinos-xs.component.sass']
})
export class MultidestinosXsComponent implements OnInit, AfterViewInit {

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
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.outIndexTramo.emit(this.indexTramo);
  }

  ngAfterViewInit() {
    console.log('this.infechaSalidaShow1' + this.infechaSalidaShow1);
    console.log('this.infechaSalidaShow2' + this.infechaSalidaShow2);
    console.log('this.infechaSalidaShow3' + this.infechaSalidaShow3);
    console.log('this.infechaSalidaShow4' + this.infechaSalidaShow4);
    console.log('this.infechaSalidaShow5' + this.infechaSalidaShow5);
    console.log('this.infechaSalidaShow6' + this.infechaSalidaShow6);
    $('#datepickerSalida1').val(this.infechaSalidaShow1);
    $('#datepickerSalida2').val(this.infechaSalidaShow2);
    $('#datepickerSalida3').val(this.infechaSalidaShow3);
    $('#datepickerSalida4').val(this.infechaSalidaShow4);
    $('#datepickerSalida5').val(this.infechaSalidaShow5);
    $('#datepickerSalida6').val(this.infechaSalidaShow6);

    console.log('this.infechaSalida1' + this.infechaSalida1);
    console.log('this.infechaSalida2' + this.infechaSalida2);
    this.fechaSalida1 = this.infechaSalida1;
    this.fechaSalida2 = this.infechaSalida2;
    this.fechaSalida3 = this.infechaSalida3;
    this.fechaSalida4 = this.infechaSalida4;
    this.fechaSalida5 = this.infechaSalida5;
    this.fechaSalida6 = this.infechaSalida6;

    console.log('this.inorigenAuto1' + this.inorigenAuto1);
    console.log('this.inorigenAuto2' + this.inorigenAuto2);
    this.origenAuto1 = this.inorigenAuto1;
    this.origenAuto2 = this.inorigenAuto2;
    this.origenAuto3 = this.inorigenAuto3;
    this.origenAuto4 = this.inorigenAuto4;
    this.origenAuto5 = this.inorigenAuto5;
    this.origenAuto6 = this.inorigenAuto6;

    console.log('this.inorigentTexto1' + this.inorigentTexto1);
    console.log('this.inorigentTexto1' + this.inorigentTexto1);
    this.origentTexto1 = this.inorigentTexto1;
    this.origentTexto2 = this.inorigentTexto2;
    this.origentTexto3 = this.inorigentTexto3;
    this.origentTexto4 = this.inorigentTexto4;
    this.origentTexto5 = this.inorigentTexto5;
    this.origentTexto6 = this.inorigentTexto6;

    console.log('this.indestinoAuto1' + this.indestinoAuto1);
    console.log('this.indestinoAuto1' + this.indestinoAuto1);
    this.destinoAuto1 = this.indestinoAuto1;
    this.destinoAuto2 = this.indestinoAuto2;
    this.destinoAuto3 = this.indestinoAuto3;
    this.destinoAuto4 = this.indestinoAuto4;
    this.destinoAuto5 = this.indestinoAuto5;
    this.destinoAuto6 = this.indestinoAuto6;

    console.log('this.indestinoTexto1' + this.indestinoTexto1);
    console.log('this.indestinoTexto1' + this.indestinoTexto1);
    this.destinoTexto1 = this.indestinoTexto1;
    this.destinoTexto2 = this.indestinoTexto2;
    this.destinoTexto3 = this.indestinoTexto3;
    this.destinoTexto4 = this.indestinoTexto4;
    this.destinoTexto5 = this.indestinoTexto5;
    this.destinoTexto6 = this.indestinoTexto6;
  }

  selectEvent(flag, item) {
    // do something with selected item
    console.log("selectEvent");
    console.log(item);

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
        console.log("case 1");
        console.log("this.origenAuto1: " + this.origenAuto1);
        break;
      case 2:
        this.destinoAuto1 = item.iataCode;
        this.destinoTexto1 = item.name;
        this.outDestinoValue1.emit(this.destinoAuto1);
        this.outDestinoText1.emit(this.destinoTexto1);
        break;
      case 3:
        this.origenAuto2 = item.iataCode;
        this.origentTexto2 = item.name;
        this.outOrigenValue2.emit(this.origenAuto2);
        this.outOrigenText2.emit(this.origentTexto2);
        break;
      case 4:
        this.destinoAuto2 = item.iataCode;
        this.destinoTexto2 = item.name;
        this.outDestinoValue2.emit(this.destinoAuto2);
        this.outDestinoText2.emit(this.destinoTexto2);
        break;
      case 5:
        this.origenAuto3 = item.iataCode;
        this.origentTexto3 = item.name;
        this.outOrigenValue3.emit(this.origenAuto3);
        this.outOrigenText3.emit(this.origentTexto3);
        break;
      case 6:
        this.destinoAuto3 = item.iataCode;
        this.destinoTexto3 = item.name;
        this.outDestinoValue3.emit(this.destinoAuto3);
        this.outDestinoText3.emit(this.destinoTexto3);
        break;
      case 7:
        this.origenAuto4 = item.iataCode;
        this.origentTexto4 = item.name;
        this.outOrigenValue4.emit(this.origenAuto4);
        this.outOrigenText4.emit(this.origentTexto4);
        break;
      case 8:
        this.destinoAuto4 = item.iataCode;
        this.destinoTexto4 = item.name;
        this.outDestinoValue4.emit(this.destinoAuto4);
        this.outDestinoText4.emit(this.destinoTexto4);
        break;
      case 9:
        this.origenAuto5 = item.iataCode;
        this.origentTexto5 = item.name;
        this.outOrigenValue5.emit(this.origenAuto5);
        this.outOrigenText5.emit(this.origentTexto5);
        break;
      case 10:
        this.destinoAuto5 = item.iataCode;
        this.destinoTexto5 = item.name;
        this.outDestinoValue5.emit(this.destinoAuto5);
        this.outDestinoText5.emit(this.destinoTexto5);
        break;
      case 11:
        this.origenAuto6 = item.iataCode;
        this.origentTexto6 = item.name;
        this.outOrigenValue6.emit(this.origenAuto6);
        this.outOrigenText6.emit(this.origentTexto6);
        break;
      case 12:
        this.destinoAuto6 = item.iataCode;
        this.destinoTexto6 = item.name;
        this.outDestinoValue6.emit(this.destinoAuto6);
        this.outDestinoText6.emit(this.destinoTexto6);
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

    if (flag === 11) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data11 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 12) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data12 = resultFilter;

        $(".x").hide();
      }
    }
  }

  onFocused(flag, e) {
    // do something when input is focused
    console.log("onFocused");
    console.log(e);
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
    if (tramo === 3) {
      this.flagTramo3 = false;
    }

    if (tramo === 4) {
      this.flagTramo4 = false;
    }

    if (tramo === 5) {
      this.flagTramo5 = false;
    }

    if (tramo === 6) {
      this.flagTramo6 = false;
    }
  }

  onValueChangeSalida1(value: Date): void {
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

    this.fechaSalida1 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida1.emit(this.fechaSalida1);
    console.log(this.fechaSalida1);
  }

  onValueChangeSalida2(value: Date): void {
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

    this.fechaSalida2 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida2.emit(this.fechaSalida2);
    console.log(this.fechaSalida2);
  }

  onValueChangeSalida3(value: Date): void {
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

    this.fechaSalida3 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida3.emit(this.fechaSalida3);
    console.log(this.fechaSalida3);
  }

  onValueChangeSalida4(value: Date): void {
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

    this.fechaSalida4 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida4.emit(this.fechaSalida4);
    console.log(this.fechaSalida4);
  }

  onValueChangeSalida5(value: Date): void {
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

    this.fechaSalida5 = value.getFullYear() + "/" + mes + "/" + dia;
    this.outFechaSalida5.emit(this.fechaSalida5);
    console.log(this.fechaSalida5);
  }

  onValueChangeSalida6(value: Date): void {
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
    console.log(this.fechaSalida6);
  }

}
