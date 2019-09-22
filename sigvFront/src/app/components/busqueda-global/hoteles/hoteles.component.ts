import { Component, OnInit, Output } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
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
export class HotelesComponent implements OnInit {

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
  fechaIngreso: string;
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

  mayorPrecioHotel: number;
  menorPrecioHotel: number;



  constructor(
    private localeService: BsLocaleService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private service: HotelService
  ) { 
    this.minDateIngreso = new Date();
    this.minDateIngreso.setDate(this.minDateIngreso.getDate());
    this.flagBuscar = false;
    this.flagDinData = false;
    this.divwarning = false
  }

  ngOnInit() {
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    //this.sessionStorageService.store('ss_token', this.loginDataUser.token);
    //this.token = this.sessionStorageService.retrieve('ss_token');
    console.log(this.locales);
    this.localeService.use(this.locale);
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
    this.minDateSalida = value;

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

    this.fechaSalida = value.getFullYear() + "-" + mes + "-" + dia;
    console.log(this.fechaSalida);
  }

  onValueChangeSalida(value: Date): void {
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

    this.fechaRetorno = value.getFullYear() + "-" + mes + "-" + dia;
    console.log(this.fechaRetorno);
  }

  Obtenerlistado($event) {
    this.LlistaHotel = [];
    this.LlistaHotel = $event;
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
    this.LlistaHotel = [];
    this.LlistaHotel = $event;
  }

  ObtenerListaFiltroPrecio($event) {
    this.LlistaHotel = [];
    this.LlistaHotel = $event;

    if (this.LlistaHotel.length === 0) {
      this.divwarning = true;
    }

  }

  SeachHotel() {
    console.log('SeachHotel');
    console.log('SeachHotel');
    console.log('SeachHotel');
    console.log('SeachHotel');
    console.log('SeachHotel');
    console.log('SeachHotel');
    console.log('SeachHotel');
    console.log('SeachHotel');
   this.spinner.show();
   this.flagDinData = false;
   this.dateingreso = $('#dateingreso').val();
   this.datesalida = $('#datesalida').val();
   const SearchObj: any = { 
      HotelCityCode: this.destinoValue,
      Start: this.fechaSalida,
      End: this.fechaRetorno,
      Quantity: $('#txthabitacion').val(),
      Count: $('#txtpersonas').val(),
      HotelSegmentCategoryCode: this.estrellas
    };
   this.habitaciones = $('#txthabitacion').val();
   this.personas = $('#txtpersonas').val();

   console.log(JSON.stringify(SearchObj));

   this.service.SearchHotel(SearchObj).subscribe(
      result => {
         console.log(this.LlistaHotel);
         if (result !== null && result.length > 0) {
          console.log('result: ' + result);
           this.LlistaHotel = result;
           this.localStorageService.store('hotel', this.LlistaHotel[0]);
           this.flagBuscar = true;

           let menorValor = 1000000;
           let mayorValor = 0;
           result.forEach(function(item, index1) {

            let mmm = 1000000;

            item.LBeRoomStay

             item.LBeRoomStay.forEach(function(item2, index2) {
               //

               /*
              if (parseFloat(item2.AmountAfterTax) > mayorValor) {
                mayorValor = parseFloat(item2.AmountAfterTax);
              }
              */

              if (parseFloat(item2.AmountAfterTax) < menorValor) {
                menorValor = parseFloat(item2.AmountAfterTax);
              }

              if (index2 === 0) {
                if (parseFloat(item2.AmountAfterTax) > mayorValor) {
                  mayorValor = parseFloat(item2.AmountAfterTax);
                }
              }


             });
           });

           this.menorPrecioHotel = menorValor;
           this.mayorPrecioHotel = mayorValor;
         } else {
           this.flagDinData = true;
      }
      },
    err => {
      this.spinner.hide();
      console.log("ERROR: " + JSON.stringify(err));
    },
   () => {
     this.spinner.hide();
     console.log("this.airportService.searchFlight completado");
   }
  );
}

SeleccionarEstrella(codeestrella, texto) {
  this.estrellas = codeestrella;
  this.textoestrellas = texto;
}
}
