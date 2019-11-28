import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../../models/ILoginDatos.model';
import { HotelService } from '../../../../services/hotel.service';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-busqueda-mini-habitacion',
  templateUrl: './busqueda-mini-habitacion.component.html',
  styleUrls: ['./busqueda-mini-habitacion.component.sass']
})
export class BusquedaMiniHabitacionComponent implements OnInit,AfterViewInit {
  lhotel: IHotelResultsModel;
  estrellas: string;
  fechaSalida: string;
  fechaRetorno: string;
  minDateSalida: Date;
  maxDateIngreso: Date;
  minDateIngreso: Date;
  data: any[] = [];
  keyword = 'name';
  airportlist: any[] = [];
  loginDataUser: ILoginDatosModel;
  LResultshotel: IHotelResultsModel[];
  isOpen = false;

  @Output() flagShowMap = new EventEmitter<boolean>();
  @Output() ShowComponent = new EventEmitter<boolean>();
  @Output() messagelistado = new EventEmitter<any[]>();
  @Output() hideComponent = new EventEmitter<boolean>();
  @Output() listado = new EventEmitter<IHotelResultsModel[]>();

  textoestrellas: string;
  @Input() destino: string;
  @Input() fchingreso: string;
  @Input() fchsalida: string;
  @Input() habitaciones: string;
  @Input() adultos: string;
  @Input() cantidadnoches;
  @Input() destinoValue: string;
  @Input() destinoText: string;
  sessionMini1;
  sessionMini;
  estrellasSess;

  constructor(private localStorageService: LocalStorageService,private sessionStorageService: SessionStorageService,private spinner: NgxSpinnerService,private service: HotelService) { 
    this.lhotel = this.sessionStorageService.retrieve("hotel");
    console.log("this.lhotel.name ===== >"+ this.lhotel.name)
    
  }
  
  ngOnInit() {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.sessionMini1 = this.sessionStorageService.retrieve('ss_sessionmini1');
    this.sessionMini = this.sessionStorageService.retrieve('ss_sessionmini');
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.textoestrellas = this.sessionMini1.categoria;
    this.destinoValue = this.sessionMini1.iata;
    this.fechaSalida = this.sessionMini.fechaentrada;
    this.fechaRetorno = this.sessionMini.fechasalida;
  }
  
  SeleccionarEstrella(codeestrella, texto) {
    this.estrellas = codeestrella;
    this.textoestrellas = texto;

  }

  Enviarlistado() {
    this.messagelistado.emit(this.LResultshotel);
  }
  
  ValidarCampos() {
    let val = true;
    let correo;
    
     
    
      
        
    return val;
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
    
  
    const r1 = nuevafecha.getTime();
    const r2 = nuevafecha2.getTime();
  
    const r = r2 - r1;
    
    let dias = Math.floor(r / (1000 * 60 * 60 * 24));
    this.cantidadnoches = dias;
  
    this.fechaSalida = n1[2] + "-" + n1[1] + "-" + n1[0];
    this.fechaRetorno = n2[2] + "-" + n2[1] + "-" + n2[0];
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

  handlerIngreso(datepickerSalida) {
    
  }

  ngAfterViewInit() {
    //cantidadnoches
    
    //this.fechaSalida = this.fchingreso;
    //this.fechaRetorno = this.fchsalida;
    this.ObtenerDias(this.fchingreso, this.fchsalida);
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
     
      this.ObtenerDias2(this.fechaSalida, this.fechaRetorno);
    }
  }

  onValueChangeSalida(value: Date): void {
    
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
    
      this.ObtenerDias2(this.fechaSalida, this.fechaRetorno);
    }
  }

  SeachHotel() {
    this.spinner.show();
    const val= this.ValidarCampos();
    let fechaSal;
    let fechaRe;
    fechaSal = this.fechaSalida;
    fechaRe = this.fechaRetorno;
    fechaSal = fechaSal.split("-");
    fechaRe = fechaRe.split("-");
    fechaSal= fechaSal[2] + "-" + fechaSal[1] + "-" + fechaSal[0];
    fechaRe= fechaRe[2] + "-" + fechaRe[1] + "-" + fechaRe[0];
    if (!val) {
      return val;
    }
    else{
    this.flagShowMap.emit(false);
    let data = {
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
    this.habitaciones = $('#txthabitacion').val();
    this.adultos = $('#txtpersonas').val();
   
    this.service.SearchHotel(data).subscribe(
       result => {
          if (result[0].oerror != null) {
            alert("HOTELES NO DISPONIBLES");
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
          this.ShowComponent.emit(true);
          this.hideComponent.emit(false);
         
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

  onFocused(e) {
    // do something when input is focused
    
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
    
  
    const r1 = nuevafecha.getTime();
    const r2 = nuevafecha2.getTime();
  
    const r = r2 - r1;
   
    let dias = Math.floor(r / (1000 * 60 * 60 * 24));
    this.cantidadnoches = dias;
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
