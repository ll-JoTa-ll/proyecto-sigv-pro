import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
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
export class BusquedaMiniComponent implements OnInit {

  locale = 'es';
  locales = listLocales();
  @Input() destino: string;
  @Input() fchingreso: string;
  @Input() fchsalida: string;
  @Input() habitaciones: string;
  @Input() adultos: string;
  @Input() textoestrellas: string;
  @Input() cantidadnoches: string;
  @Output() messagelistado = new EventEmitter<any[]>();

  destinoValue: string;
  destinoText: string;
  minDateIngreso: Date;
  minDateSalida: Date;
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
      console.log(this.fechaSalida);
    }
  }

  onValueChangeSalida(value: Date): void {
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
      console.log(this.fechaRetorno);
    }
  }

  SeachHotel() {
    this.spinner.show();
    const SearchObj: any = { 
       HotelCityCode: this.destinoValue,
       Start: this.fechaSalida,
       End: this.fechaRetorno,
       Quantity: $('#txthabitacion').val(),
       Count: $('#txtpersonas').val(),
       HotelSegmentCategoryCode: this.estrellas
     };
    this.habitaciones = $('#txthabitacion').val();
    this.adultos = $('#txtpersonas').val();
    this.service.SearchHotel(SearchObj).subscribe(
       data => {
          console.log(this.LResultshotel);
          this.localStorageService.store('ls_search_hotel', data);
          this.LResultshotel = data;
         // this.Enviarlistado();
          this.messagelistado.emit(this.LResultshotel);
          this.spinner.hide();
       },
   );
 }

 SeleccionarEstrella(codeestrella, texto) {
  this.estrellas = codeestrella;
  this.textoestrellas = texto;
}
}
