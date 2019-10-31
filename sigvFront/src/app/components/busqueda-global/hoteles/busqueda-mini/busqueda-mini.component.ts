import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit  } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { ILoginDatosModel } from '../../../../models/ILoginDatos.model';
import { HotelService } from '../../../../services/hotel.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-busqueda-mini',
  templateUrl: './busqueda-mini.component.html',
  styleUrls: ['./busqueda-mini.component.sass']
})
export class BusquedaMiniComponent implements OnInit, AfterViewInit {

  locale = 'es';
  locales = listLocales();
  @Input() destino: string;
  @Input() fchingreso: string;
  @Input() fchsalida: string;
  @Input() habitaciones: string;
  @Input() adultos: string;
  @Input() textoestrellas: string;
  @Input() cantidadnoches;
  @Output() messagelistado = new EventEmitter<any[]>();
  @Output() mayorPrecio = new EventEmitter<number>();
  @Output() menorPrecio = new EventEmitter<number>();;

  @Input() destinoValue: string;
  @Input() destinoText: string;
  minDateIngreso: Date;
  minDateSalida: Date;
  maxDateIngreso: Date;
  maxDateSalida: Date;
  fechaIngreso: string;
  fechaSalida: string;
  fechaRetorno: string;
  airportlist: any[] = [];
  loginDataUser: ILoginDatosModel;
  token;
  keyword = 'name';
  data: any[] = [];
  LResultshotel: IHotelResultsModel[];
  estrellas: string;

  SearchObj: any = { 
    HotelCityCode: '',
    Start: '',
    End: '',
    Quantity: 1,
    Count: 1,
    HotelSegmentCategoryCode: ''
  };

  constructor(
    private localeService: BsLocaleService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private service: HotelService

    
  ) { 
    this.minDateIngreso = new Date();
    this.minDateIngreso.setDate(this.minDateIngreso.getDate());
    
  
  }

  

  ngOnInit() {
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
   // this.sessionStorageService.store('ss_token', this.loginDataUser.token);
  //  this.token = this.sessionStorageService.retrieve('ss_token');
    console.log(this.locales);
    this.localeService.use(this.locale);
  }

  ngAfterViewInit() {
    //cantidadnoches
    console.log('mini busqueda hoteles ngAfterViewInit');
    console.log("this.fchingreso: " + this.fchingreso);
    console.log("this.fchsalida: " + this.fchsalida);
    //this.fechaSalida = this.fchingreso;
    //this.fechaRetorno = this.fchsalida;
    this.ObtenerDias(this.fchingreso, this.fchsalida);
  }

  Enviarlistado() {
    this.messagelistado.emit(this.LResultshotel);
  }

  

  selectEvent(item) {
    // do something with selected item
    console.log("selectEvent");
    console.log(item);
    this.destinoValue = item.iataCode;
    this.destinoText = item.name;
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

  handlerIngreso(datepickerSalida) {
    console.log(datepickerSalida);
  }

  onValueChangeIngreso(value: Date): void {
    console.log("onValueChangeIngreso");
    this.minDateSalida = value;
    if (value === null) {
      return;
    } else {
      let mes = "";
      if ((value.getMonth() + 1) < 10) {
        mes = "0" + (value.getMonth() + 1);
      } else {
        mes = "" + (value.getMonth() + 1);
      }
      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }
      this.fechaSalida = value.getFullYear() + "-" + mes + "-" + dia;
      console.log("this.fechaSalida" + this.fechaSalida);
      console.log("this.fechaRetorno" + this.fechaRetorno);
      this.ObtenerDias2(this.fechaSalida, this.fechaRetorno);
    }
  }

  onValueChangeSalida(value: Date): void {
    console.log("onValueChangeSalida");
    this.maxDateIngreso = value;
    if (value === null) {
      return;
    } else {
      let mes = "";
      if ((value.getMonth() + 1) < 10) {
        mes = "0" + (value.getMonth() + 1);
      } else {
        mes = "" + (value.getMonth() + 1);
      }
      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }
      this.fechaRetorno = value.getFullYear() + "-" + mes + "-" + dia;
      console.log("this.fechaSalida" + this.fechaSalida);
      console.log("this.fechaRetorno" + this.fechaRetorno);
      this.ObtenerDias2(this.fechaSalida, this.fechaRetorno);
    }
  }

  SeachHotel() {
    this.spinner.show();
    let data = {
      "Lhotel":
      [
        {
          "HotelCityCode": this.destinoValue,
          "Stars": this.estrellas,
          "StartDate": this.fechaSalida,
          "EndDate": this.fechaRetorno,	
          "LguestPerRoom":
          [
            {
              "RoomQuantity": $('#txthabitacion').val(),
              "NumberPassengers": $('#txtpersonas').val(),
              "TypePassenger": "ADT"
            }
          ]
        }
      ],
      "Ocompany": this.loginDataUser.ocompany
    }
    this.habitaciones = $('#txthabitacion').val();
    this.adultos = $('#txtpersonas').val();
    console.log('data: ' + JSON.stringify(data));
    this.service.SearchHotel(data).subscribe(
       data => {
          console.log(this.LResultshotel);
          this.sessionStorageService.store('ls_search_hotel', data);
          this.LResultshotel = data;
          this.messagelistado.emit(this.LResultshotel);
          this.spinner.hide();
       },
   );
 }

 SeleccionarEstrella(codeestrella, texto) {
  this.estrellas = codeestrella;
  this.textoestrellas = texto;
}

ObtenerDias(fecha1, fecha2) {
  //const fecha1 = this.fchingreso;
  //const fecha2 = this.fchsalida;
  const n1 = fecha1.split('-');
  const n2 = fecha2.split('-');
  let nuevafecha = new Date(parseInt(n1[2]), parseInt(n1[1]) - 1, parseInt(n1[0]));
  let nuevafecha2 = new Date(parseInt(n2[2]), parseInt(n2[1]) - 1, parseInt(n2[0]));
  //const dias = nuevafecha2.diff(nuevafecha, 'days');
  //let dias = nuevafecha2 - nuevafecha;
  console.log("nuevafecha: " + nuevafecha);
  console.log("nuevafecha2: " + nuevafecha2);

  const r1 = nuevafecha.getTime();
  const r2 = nuevafecha2.getTime();

  const r = r2 - r1;
  console.log("r: " + r);
  let dias = Math.floor(r / (1000 * 60 * 60 * 24));
  this.cantidadnoches = dias;

  this.fechaSalida = n1[2] + "-" + n1[1] + "-" + n1[0];
  this.fechaRetorno = n2[2] + "-" + n2[1] + "-" + n2[0];
}

ObtenerDias2(fecha1, fecha2) {
  //const fecha1 = this.fchingreso;
  //const fecha2 = this.fchsalida;
  const n1 = fecha1.split('-');
  const n2 = fecha2.split('-');
  let nuevafecha = new Date(parseInt(n1[0]), parseInt(n1[1]) - 1, parseInt(n1[2]));
  let nuevafecha2 = new Date(parseInt(n2[0]), parseInt(n2[1]) - 1, parseInt(n2[2]));
  //const dias = nuevafecha2.diff(nuevafecha, 'days');
  //let dias = nuevafecha2 - nuevafecha;
  console.log("nuevafecha: " + nuevafecha);
  console.log("nuevafecha2: " + nuevafecha2);

  const r1 = nuevafecha.getTime();
  const r2 = nuevafecha2.getTime();

  const r = r2 - r1;
  console.log("r: " + r);
  let dias = Math.floor(r / (1000 * 60 * 60 * 24));
  this.cantidadnoches = dias;
}

}
