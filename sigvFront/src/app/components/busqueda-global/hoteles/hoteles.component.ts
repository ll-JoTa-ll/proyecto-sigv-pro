import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales, getDay } from 'ngx-bootstrap/chronos';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { HotelService } from '../../../services/hotel.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.sass']
})
export class HotelesComponent implements OnInit, AfterViewInit {

  locale = 'es';
  locales = listLocales();

  flagBuscar: boolean;
  flagDinData: boolean;
  airportlist: any[] = [];
  loginDataUser: ILoginDatosModel;
  token;
  keyword = 'name';
  data: any[] = [];
  destinoValue: string;
  destinoText: string;
  minDateIngreso: Date;
  minDateSalida: Date;
  maxDateIngreso: Date;
  maxDateSalida: Date;
  fechaIngreso: string;
  cantidadhabitaciones: string;
  fechaSalida: string;
  fechaRetorno: string;
  LlistaHotel: IHotelResultsModel[] = [];
  estrellas: string;
  textoestrellas: string = 'Todas';
  habitaciones: string;
  personas: string;
  vistamapa: boolean = false;
  vistalistado: boolean = true;
  dateingreso: string;
  datesalida: string;
  divwarning: boolean;
  currency: string;
  cantidadnoche: string;
  mayorPrecioHotel: number;
  menorPrecioHotel: number;
  mapafiltro: boolean;

  

  constructor(
    private localeService: BsLocaleService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService,
    private service: HotelService
  ) {
    console.log('constructor hoteles');
    $('.menu-vuelo-1').show();
    $('.menu-vuelo-2').hide();
    $('.menu-hotel-1').hide();
    $('.menu-hotel-2').show();
    $('.menu-bus-1').show();
    $('.menu-bus-2').hide();
    $('.menu-paquete-1').show();
    $('.menu-paquete-2').hide();
    $('.menu-seguro-1').show();
    $('.menu-seguro-2').hide();
    this.minDateIngreso = new Date();
    this.minDateIngreso.setDate(this.minDateIngreso.getDate());
    this.flagBuscar = false;
    this.flagDinData = false;
    this.divwarning = false
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate() + 1);
    this.mapafiltro = true;
  }

  ngOnInit() {
    console.log('ngOnInit hoteles');
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').hide();
    $('#menu-hotel-2').show();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    //this.sessionStorageService.store('ss_token', this.loginDataUser.token);
    //this.token = this.sessionStorageService.retrieve('ss_token');

    this.localeService.use(this.locale);
  }

  ngAfterViewInit() {
    console.log('ngOnInit hoteles');
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').hide();
    $('#menu-hotel-2').show();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
  }

  selectEvent(item) {
    // do something with selected item

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

  }

  handlerIngreso(datepickerSalida) {

  }

  onValueChangeIngreso(value: Date): void {
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



    this.minDateSalida = value;
    //this.minDateSalida.setDate(this.minDateSalida.getDate() + 1);
    /*
    let value2 = value;
    this.minDateSalida = value;
    console.log('value: ' + value);
    console.log('value2: ' + value2);
    let minDateSalida = this.minDateSalida.setDate(this.minDateSalida.getDate() + 1);
    console.log('minDateSalida: ' + minDateSalida);
    console.log('value: ' + value);
    console.log('value2: ' + value2);
    */
  }

  onValueChangeSalida(value: Date): void {
    this.maxDateIngreso  = value;
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

  }

  Obtenerlistado($event) {
    this.LlistaHotel = [];
    this.LlistaHotel = $event;

    let menorValor = 1000000;
    let mayorValor = 0;

    this.LlistaHotel.forEach(function(item) {
            if (item.oprice.pricePerAllNights < menorValor) {
              menorValor = item.oprice.pricePerAllNights;
            }
              if (item.oprice.pricePerAllNights > mayorValor) {
                mayorValor = item.oprice.pricePerAllNights;
              }

           });

           this.menorPrecioHotel = menorValor;
           this.mayorPrecioHotel = mayorValor;
    this.sessionStorageService.store("ls_search_hotel",this.LlistaHotel);
    this.mapafiltro = true;
  }

  ObtenerListFiltro($event) {
    this.LlistaHotel = [];
    this.LlistaHotel = $event;
  }

  MostrarMapa($event) {
     this.vistamapa = $event;
     this.vistalistado = false;
  }

  MostrarListado($event) {
     this.vistalistado = $event;
     this.vistamapa = false;
  }

  ObtenerListaFiltroEstrella($event) {
    this.divwarning = false;
    this.LlistaHotel = [];
    this.LlistaHotel = $event;
    if (this.LlistaHotel.length === 0) {
      this.divwarning = true;
    }
  }

  ObtenerListaFiltroPrecio($event) {
    this.divwarning = false;
    this.LlistaHotel = [];
    this.LlistaHotel = $event;

    if (this.LlistaHotel.length === 0) {
      this.divwarning = true;
    }

  }

  ObtenerListaFiltroNombre($event) {
    this.LlistaHotel = [];
    this.LlistaHotel = $event;

    if (this.LlistaHotel.length === 0) {
      this.divwarning = true;
    }

  }

  SeachHotel() {

    this.spinner.show();
    this.flagDinData = false;
    this.dateingreso = $('#dateingreso').val();
    this.datesalida = $('#datesalida').val();
    this.cantidadhabitaciones = $('#txthabitacion').val();
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
    this.personas = $('#txtpersonas').val();



    this.service.SearchHotel(data).subscribe(

      result => {
        if (result.length == 0 || result == null || result[0].oerror != null) {
          alert("HOTELES NO DISPONIBLES");
        }
        else{

          if (result !== null && result.length > 0) {

           this.sessionStorageService.store('ls_search_hotel', result);
            this.LlistaHotel = result;
            this.sessionStorageService.store('hotel', this.LlistaHotel[0]);
            this.flagBuscar = true;

            let menorValor = 1000000;
            let mayorValor = 0;
            let currency;
            let cantnoche;

           result.forEach(function(item, index1) {

             let mmm = 1000000;

             if (item.oprice.pricePerAllNights < menorValor) {
               menorValor = item.oprice.pricePerAllNights;
             }
               if (item.oprice.pricePerAllNights > mayorValor) {
                 mayorValor = item.oprice.pricePerAllNights;
               }

            });

            this.cantidadnoche = cantnoche;
            this.currency = currency;
            this.menorPrecioHotel = menorValor;
            this.mayorPrecioHotel = mayorValor;
          } else {
            this.flagDinData = true;

       }
        }

      },
    err => {
      this.spinner.hide();

    },
   () => {
     this.spinner.hide();

   }
  );
}

SeleccionarEstrella(codeestrella, texto) {
  this.estrellas = codeestrella;
  this.textoestrellas = texto;
}

validarNumeros(e){
  var tecla = (document.all) ? e.keyCode : e.which;
   if (tecla == 8) return true;
    var patron = /^([0-9])*$/;
     var teclaFinal = String.fromCharCode(tecla);
      return patron.test(teclaFinal);
};

validarTodo(e){
  var tecla = (document.all) ? e.keyCode : e.which;
   if (tecla == 8) return true;
    var patron = /^([])*$/;
     var teclaFinal = String.fromCharCode(tecla);
      return patron.test(teclaFinal);
};

validarLetras(e){
  var tecla = (document.all) ? e.keyCode : e.which;
   if (tecla == 8) return true;
    var patron = /^([a-zA-Z ])*$/;
     var teclaFinal = String.fromCharCode(tecla);
      return patron.test(teclaFinal);
};




showHideMap($event) {
  this.mapafiltro = $event;
}

}
