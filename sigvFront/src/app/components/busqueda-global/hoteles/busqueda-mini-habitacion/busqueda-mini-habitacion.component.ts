import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../../models/ILoginDatos.model';
import { HotelService } from '../../../../services/hotel.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { environment } from '../../../../../environments/environment.prod';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-busqueda-mini-habitacion',
  templateUrl: './busqueda-mini-habitacion.component.html',
  styleUrls: ['./busqueda-mini-habitacion.component.sass']
})

export class BusquedaMiniHabitacionComponent implements OnInit, AfterViewInit {

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
  @Output() menorPrecio = new EventEmitter<number>();
  @Output() flagShowMap = new EventEmitter<boolean>();

  @Output() ShowComponent = new EventEmitter<boolean>();
  @Output() hideComponent = new EventEmitter<boolean>();
  @Output() listado = new EventEmitter<IHotelResultsModel[]>();



  @Input() destinoValue: string;
  @Input() destinoText: string;

  sessionMini1;
  sessionMini;
  sessionMini2;
  sessionMiniHab;
  estrellasSess;
  ss_minibuscador;
  ls_search_hotel;

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
  model: any = {};
  flagDinData: boolean;
  noches: any;
  lstAutocomplete: any[] = [];
  citylist: any[] = [];
  objSearch : any;
  objDestino: any;
  fechaSalidaShow;
  fechaRetornoShow;
  calendarSalidaValue: Date;
  SearchObj: any = {
    HotelCityCode: '',
    Start: '',
    End: '',
    Quantity: 1,
    Count: 1,
    HotelSegmentCategoryCode: ''
  };
  viaje: any;
  entradahab: any;
  salidahab: any;
  dateCustomClasses: DatepickerDateCustomClasses[];

  constructor(
    private localeService: BsLocaleService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private service: HotelService
  ) {
    this.minDateIngreso = new Date();
    this.minDateIngreso.setDate(this.minDateIngreso.getDate());
    this.calendarSalidaValue = new Date();
    this.calendarSalidaValue.setDate(this.calendarSalidaValue.getDate() + 1);
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate() + 1);
    let hola1 = $('#fechaInicio').val();
    console.log("minDateSalida =======================>" + this.minDateSalida);
  }

  ngOnInit() {
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.sessionMini1 = this.sessionStorageService.retrieve('ss_sessionmini1');
    this.sessionMini = this.sessionStorageService.retrieve('ss_sessionmini');
    this.citylist = this.localStorageService.retrieve('ls_citylist');
    this.ss_minibuscador = this.localStorageService.retrieve('ss_minibuscador');
    this.ls_search_hotel = this.localStorageService.retrieve('ls_search_hotel');
    this.noches = this.sessionStorageService.retrieve('ss_noches');
   // this.sessionStorageService.store('ss_token', this.loginDataUser.token);
  //  this.token = this.sessionStorageService.retrieve('ss_token');
    this.textoestrellas = this.sessionMini1.categoria;
    if(this.textoestrellas === ""){
      this.textoestrellas = '';
    }
    this.destinoValue = this.sessionMini1.iata;
    this.fechaSalidaShow = this.sessionMini.fechaentrada;
    this.fechaRetornoShow = this.sessionMini.fechasalida;
    const fechaSalidaShowSp  =  this.fechaSalidaShow.split('-');
    const fechaRetornoShowSp  =  this.fechaRetornoShow.split('-');

    this.fechaSalida = fechaSalidaShowSp[2] + "-" + fechaSalidaShowSp[1] + "-" + fechaSalidaShowSp[0];
    this.fechaRetorno = fechaRetornoShowSp[2] + "-" + fechaRetornoShowSp[1] + "-" + fechaRetornoShowSp[0];

    this.localeService.use(this.locale);

    const lstAutocomplete = this.lstAutocomplete;
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

    lstAutocomplete.sort((a, b) => a.name - b.name );
    this.lstAutocomplete = lstAutocomplete;
  }


  ngAfterViewInit() {
    //cantidadnoches

    //this.fechaSalida = this.fchingreso;
    //this.fechaRetorno = this.fchsalida;
    this.ObtenerDias(this.fchingreso, this.fchsalida);
    this.objSearch = {
      destino: this.destinoText,
      categoria: this.textoestrellas,
      iata: this.destinoValue,
    };
    this.sessionStorageService.store("ss_sessionmini2",this.objSearch);
  }

  limpiarSession(){
    if (this.estrellas === undefined) {
      this.estrellas = 'Todas';
    }
    this.objSearch = {
      destino: this.destinoText,
      categoria: this.estrellas,
      iata: this.destinoValue
    };
    this.sessionStorageService.store("ss_sessionmini1",null);
    this.sessionStorageService.store("ss_sessionmini1",this.objSearch);
    this.sessionMiniHab = this.sessionStorageService.retrieve('ss_sessionminihab');
    this.sessionMini2 = this.sessionStorageService.retrieve('ss_sessionmini2');
  }

  Enviarlistado() {
    this.messagelistado.emit(this.LResultshotel);
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
      const resultFilter = this.lstAutocomplete.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) > 0 );
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
      this.minDateSalida = value;
      this.dateCustomClasses = [
        { date: this.minDateSalida, classes: ['bg-danger','text-warning'] }
      ];
      console.log("value ====>" + value);
    console.log("calendarSalidaValue ====>" + this.calendarSalidaValue);
      if (value >= this.calendarSalidaValue) {
        $("#fechaFin").val("");
      }

      this.ObtenerDias2(this.fechaSalida, this.fechaRetorno);
      if (value >= this.calendarSalidaValue) {
        this.noches = 0;
      }
      if($("#fechaFin").val() === ""){
        this.noches = 0;
      }
    }
  }

  onValueChangeSalida(value: Date): void {
    if (value != null) {
      this.calendarSalidaValue = value;
      this.maxDateIngreso = value;
      this.dateCustomClasses = [
        { date: null, classes: ['bg-danger','text-warning'] }
      ];
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

        this.ObtenerDias2(this.fechaSalida, this.fechaRetorno);
      }
    }


  }

  ValidarCampos() {
    let val = true;




      if ($.trim(this.sessionMini1.destino) === '' || $.trim(this.sessionMini1.destino) === undefined) {
        $("#destinosa").addClass("campo-invalido");
        val = false;
      } else {
        $("#destinosa").removeClass("campo-invalido");
      }
      if ($('#fechaInicio').val().length === 0) {
        $("#ingresoa").addClass("campo-invalido");
        val = false;
      } else {
        $("#ingresoa").removeClass("campo-invalido");
      }
      if ($('#fechaFin').val().length === 0) {
        $("#destinoa").addClass("campo-invalido");
        val = false;
      } else {
        $("#destinoa").removeClass("campo-invalido");
      }


    return val;
  }

  SeachHotel() {
    let fechaSal;
    let fechaRe;
    let fechaSalShow;
    let fechaReShow;
    fechaSal = this.fechaSalida;
    fechaRe = this.fechaRetorno;

    fechaSalShow = this.fechaSalida;
    fechaReShow = this.fechaRetorno;
    let fechaSalss = fechaSalShow.split('-');
    let fechaRess = fechaRe.split('-');
    fechaSalShow = fechaSalss[2] + "-" + fechaSalss[1] + "-" + fechaSalss[0];
    fechaReShow = fechaRess[2] + "-" + fechaRess[1] + "-" + fechaRess[0];
    if ( this.fchingreso == undefined) {
      //fechaSal = fechaSal.split("-");
      //fechaRe = fechaRe.split("-");
      //fechaSal= fechaSal[2] + "-" + fechaSal[1] + "-" + fechaSal[0];
      //fechaRe= fechaRe[2] + "-" + fechaRe[1] + "-" + fechaRe[0];
    }
    const val= this.ValidarCampos();
    if (!val) {
      return val;
    }
      else{
        this.spinner.show();
      this.flagShowMap.emit(false);
      let data = {
        "Lusers":[{
          "RoleId": this.loginDataUser.orole.roleId,
          "LcostCenter": this.loginDataUser.lcostCenter,
          "UserId": this.loginDataUser.userId
        }],
        "Lhotel":
        [
          {
            "HotelCityCode": this.destinoValue,
            "Stars": this.estrellas,
            "StartDate": fechaSal,
            "EndDate": fechaRe,
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

      this.objDestino = {
        destino: this.destinoText,
        desc: $("#dest").val()
      };
      this.sessionStorageService.store("ss_destino",this.objDestino);
      this.objSearch = {
        destino: $('#destinosa').val(),
        fechaentrada: fechaSalShow,
        fechasalida: fechaReShow,
        categoria : this.estrellas,
        habi: $('#txthabitacion').val(),
        personas: $('#txtpersonas').val()
      };
      this.sessionStorageService.store("ss_sessionmini",this.objSearch);
      console.log("SESIOM MINI ====>" + JSON.stringify(this.objSearch));


      this.habitaciones = $('#txthabitacion').val();
      this.adultos = $('#txtpersonas').val();
      this.service.SearchHotel(data).subscribe(
        result => {
            if (result[0].oerror != null) {
              this.flagDinData = true;
              this.LResultshotel = result;
              //this.flagShowMap.emit(true);
              this.messagelistado.emit(this.LResultshotel);
            }
            else {
            this.sessionStorageService.store('ss_minibuscador', result);

            //this.sessionStorageService.store('ls_search_hotel', result);
            //this.LlistaHotel = result;
            this.sessionStorageService.store('hotel', null);
            this.sessionStorageService.store('hotel', result[0]);

            this.LResultshotel = result;
            //this.flagShowMap.emit(true);
            this.messagelistado.emit(this.LResultshotel);
            this.limpiarSession();
            this.ShowComponent.emit(true);
            this.hideComponent.emit(false);
            this.flagDinData = false;
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

 }

 SeleccionarEstrella(codeestrella, texto) {
  this.estrellas = codeestrella;
  this.textoestrellas = texto;
}



validarNumerosN(e){
  var tecla = (document.all) ? e.keyCode : e.which;
   if (tecla == 8) return true;
    var patron = /^([])*$/;
     var teclaFinal = String.fromCharCode(tecla);
     if(tecla == 505) return false;
      return patron.test(teclaFinal);
};

ObtenerDias(fecha1, fecha2) {
  //const fecha1 = this.fchingreso;
  //const fecha2 = this.fchsalida;
  const n1 = fecha1.split('-');
  const n2 = fecha2.split('-');
  let nuevafecha = new Date(parseInt(n1[2]), parseInt(n1[1]) - 1, parseInt(n1[0]));
  let nuevafecha2 = new Date(parseInt(n2[2]), parseInt(n2[1]) - 1, parseInt(n2[0]));
  //const dias = nuevafecha2.diff(nuevafecha, 'days');
  //let dias = nuevafecha2 - nuevafecha;


  const r1 = nuevafecha.getTime();
  const r2 = nuevafecha2.getTime();

  const r = r2 - r1;

  let dias = Math.floor(r / (1000 * 60 * 60 * 24));
  this.cantidadnoches = dias;

  this.fechaSalida = n1[2] + "-" + n1[1] + "-" + n1[0];
  this.fechaRetorno = n2[2] + "-" + n2[1] + "-" + n2[0];
}

ObtenerDias2(fecha1, fecha2) {

  console.log("fecha1: " + fecha1);
  console.log("fecha2: " + fecha2);

  const n1 = fecha1.split('-');
  const n2 = fecha2.split('-');
  let nuevafecha = new Date(parseInt(n1[0]), parseInt(n1[1]) - 1, parseInt(n1[2]));
  let nuevafecha2 = new Date(parseInt(n2[0]), parseInt(n2[1]) - 1, parseInt(n2[2]));
  //const dias = nuevafecha2.diff(nuevafecha, 'days');
  //let dias = nuevafecha2 - nuevafecha;


  const r1 = nuevafecha.getTime();
  const r2 = nuevafecha2.getTime();

  const r = r2 - r1;

  let dias = Math.floor(r / (1000 * 60 * 60 * 24));
  this.cantidadnoches = dias;
  this.noches = this.sessionStorageService.store('ss_noches',this.cantidadnoches);
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

}
