import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, HostListener, ElementRef } from '@angular/core';
// import { BsLocaleService } from 'ngx-bootstrap/datepicker';
// import { listLocales, getDay } from 'ngx-bootstrap/chronos';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../../models/ILoginDatos.model';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { HotelService } from '../../../../services/hotel.service';
// import { typeWithParameters } from '@angular/compiler/src/render3/util';
// import { IGetUserById } from 'src/app/models/IGetUserById.model';
// import { BnNgIdleService } from 'bn-ng-idle';
// import * as crypto from 'crypto-js';
import { Router } from '@angular/router';
// import { ModalDirective, BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { ModalSesionExpiradaComponent } from '../../../shared/modal-sesion-expirada/modal-sesion-expirada.component';
// import { ModalCerrarSesionComponent } from '../../../shared/modal-cerrar-sesion/modal-cerrar-sesion.component';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';
import { BusquedaMiniComponent } from '../../hoteles/busqueda-mini/busqueda-mini.component';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-recomendacion-hotel',
  templateUrl: './recomendacion-hotel.component.html',
  styleUrls: ['./recomendacion-hotel.component.sass']
})
export class RecomendacionHotelComponent implements OnInit {

  public dateingreso: string;
  public datesalida: string;
  public personas: number;
  public destinoValue: string;
  public destinoText: string;
  public estrellas: string;
  public habitacion: boolean = false;
  public text: String;
  public reservaHabitacionOk = false;

  @ViewChild('busquedaMini', { static: false }) busquedaMini: BusquedaMiniComponent;


  @Output() skipeHotel = new EventEmitter<string>();
  @Output() hiddeShowSpiner = new EventEmitter<boolean>();

  bsValue = new Date();
  dateCustomClasses: DatepickerDateCustomClasses[];
  mostrarInfo: boolean = false;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.text = "clicked inside";
      var cerrarsesion;
      cerrarsesion = this.localStorageService.retrieve("ss_closedSesion")
      if (cerrarsesion == false || cerrarsesion == '' || cerrarsesion === null) {

      }
    } else {
      this.text = "clicked outside";
    }
  }
  // config = {
  //   backdrop: true,
  //   ignoreBackdropClick: true,
  //   keyboard: false
  // };
  // @ViewChild("modalexpired", {static: false}) modalexpired;

  // locale = 'es';
  // locales = listLocales();
  // user : IGetUserById;
  flagBuscar: boolean;
  flagDinData: boolean;
  flagDinDataMini: boolean;
  loginDataUser: ILoginDatosModel;
  // token;
  // keyword = 'name';
  // data: any[] = [];

  // destinoText: string;
  // minDateIngreso: Date;
  // minDateSalida: Date;
  // maxDateIngreso: Date;
  // maxDateSalida: Date;
  // fechaIngreso: string;
  fechaSalida: string;
  fechaRetorno: string;
  LlistaHotel: IHotelResultsModel[] = [];
  textoestrellas: string = 'Todas';
  habitaciones: string;
  vistamapa: boolean = false;
  vistalistado: boolean = true;
  divwarning: boolean;
  currency: string;
  cantidadnoches: string;
  cantidadhabitaciones: string;
  mayorPrecioHotel: number;
  menorPrecioHotel: number;
  mapafiltro: boolean;
  imagesHotel: any[] = [
    {value: 'https://domiruthgeneral.blob.core.windows.net/domiruth/Images/Hoteles%20Default/DefaultHotel_1.png'},
    {value: 'https://domiruthgeneral.blob.core.windows.net/domiruth/Images/Hoteles%20Default/DefaultHotel_2.png'},
    {value: 'https://domiruthgeneral.blob.core.windows.net/domiruth/Images/Hoteles%20Default/DefaultHotel_3.png'},
    {value: 'https://domiruthgeneral.blob.core.windows.net/domiruth/Images/Hoteles%20Default/DefaultHotel_4.png'},
  ];

  vuelo: any;
  // model: any = {};
  // isOpen = false;
  // flagVal: boolean;
  // contador: number;
  // minibuscador: IHotelResultsModel[] = [];
  // t: number;
  // modalRefSessionExpired: BsModalRef;
  // output;
  // lstAutocomplete: any[] = [];
  // airportlist: any[] = [];
  // citylist: any[] = [];
  flagPriceHotel = false;
  // valfechasalida = false;
  // valfechadestino = false;
  // calendarIngresoValue;
  // calendarSalidaValue: Date;
  divScroll: any;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private service: HotelService,
    private eRef: ElementRef) {
    this.divScroll = false;
  }

  ngOnInit() {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    if (this.router.url.indexOf('vuelo-habitacion') >= 0) {
      this.habitacion = true;
    }
    if (this.router.url.indexOf('reserva-vuelo-hotel') >= 0) {
      this.habitacion = true;
      this.reservaHabitacionOk = true;
    }
  }

  triggerSearch(dateingreso: string, datesalida: string, personas: number, destinoValue: string, destinoText: string, estrellas: string, vuelo: any, tipoVuelo: any) {
    this.flagDinData = false;
    this.dateingreso = dateingreso;
    this.datesalida = datesalida;
    this.personas = personas;
    this.destinoValue = destinoValue;
    this.destinoText = destinoText;
    this.estrellas = estrellas;
    this.vuelo = vuelo;
    this.busquedaMini.fchingreso = this.dateingreso;
    this.busquedaMini.fchsalida = this.datesalida;
    this.busquedaMini.cantidadnoches = 0;
    this.fechaRetorno = datesalida.split('-').reverse().join('-');
    this.fechaSalida = dateingreso.split('-').reverse().join('-');
    this.busquedaMini.ObtenerDiasDesdeVuelo(dateingreso, datesalida);
    this.busquedaMini.desactivarFiltroPorTipoDeVuelo(tipoVuelo);
    this.SeachHotel();
  }

  changeImage(lstHotel){
    lstHotel.forEach(element => {
        if (element.gds === 'Amadeus' && element.limagens.length > 0) {
          /* this.imagesHotel.forEach(element1 => {
            element.limagens[0].url = element1.value;
          }); */
          const newImg = this.imagesHotel[Math.floor(Math.random() * this.imagesHotel.length)];
          element.limagens[0].url = newImg.value;
        }
    });

    /* this.imagesHotel.forEach(element => {
      lstHotel.forEach(hotel => {
        if (hotel.gds === 'Amadeus' && hotel.limagens.length > 0) {
          hotel.limagens[0].url = element.value;
        }
      });
    }); */

    return lstHotel;
  }

    goToLastStep() {
      this.skipeHotel.next('goToLastStep');
    }

    SeachHotel() {
      this.hiddeShowSpiner.next(true);
      this.LlistaHotel = [];
      const val = this.ValidarCampos();
      if (!val) {
        return val;
      }
      else {
        this.cantidadhabitaciones = this.personas + '';
        let data = {
          "Lusers": [{
            "RoleId": this.loginDataUser.orole.roleId,
            "LcostCenter": this.loginDataUser.lcostCenter,
            "UserId": this.loginDataUser.userId
          }],
          "Lhotel":
            [
              {
                "HotelCityCode": this.destinoValue,
                "Stars": this.estrellas,
                "StartDate": this.dateingreso.split('-')[2] + '-' + this.dateingreso.split('-')[1] + '-' + this.dateingreso.split('-')[0],
                "EndDate": this.datesalida.split('-')[2] + '-' + this.datesalida.split('-')[1] + '-' + this.datesalida.split('-')[0],
                "LguestPerRoom":
                  [
                    {
                      "RoomQuantity": this.personas,
                      "NumberPassengers": this.personas,
                      "TypePassenger": "ADT"
                    }
                  ]
              }
            ],
          "Ocompany": this.loginDataUser.ocompany
        }
        this.habitaciones = this.personas + '';
        this.service.SearchHotel(data).subscribe(
          result => {
            this.mostrarInfo = true;
            if (result == null || result.length == 0 || result[0].oerror != null) {
              // this.flagDinData = true;
              this.hiddeShowSpiner.next(false);
              this.goToLastStep();
            }
            else {
              if (result !== null && result.length > 0) {
                result = this.changeImage(result);
                this.sessionStorageService.store('ls_search_hotel', result);
                this.sessionStorageService.store('ss_minibuscador', null);
                this.LlistaHotel = result;
                this.LlistaHotel.forEach(item => {
                  item.vuelo = this.vuelo;
                })
                this.sessionStorageService.store('hotel', this.LlistaHotel[0]);
                this.flagBuscar = true;
                let menorValor = 1000000;
                let mayorValor = 0;
                let currency;
                let cantnoche;
                result.forEach((item, index1) => {
                  let mmm = 1000000;
                  if (item.oprice.pricePerAllNights < menorValor) {
                    menorValor = item.oprice.pricePerAllNights;
                  }
                  if (item.oprice.pricePerAllNights > mayorValor) {
                    mayorValor = item.oprice.pricePerAllNights;
                  }
                  if (index1 == (result.length - 1)) {
                    console.log(result)
                    this.hiddeShowSpiner.next(false);
                  }
                });
                this.cantidadnoches = cantnoche;
                this.currency = currency;
                this.menorPrecioHotel = menorValor;
                this.mayorPrecioHotel = mayorValor;
              } else {
                this.flagDinData = true;
              }
            }

          },
          err => {
            this.flagDinData = true;
          },
          () => {
            this.flagPriceHotel = true;
          }
        );
      }

    }

    ValidarCampos() {
      return true;
    }

    Obtenerlistado($event) {
      this.LlistaHotel = [];
      this.LlistaHotel = $event;

      let menorValor = 1000000;
      let mayorValor = 0;

      if (this.LlistaHotel[0].oerror != null) {
        //this.flagDinData = true;
        this.flagDinDataMini = true;
        this.vistalistado = false;
      } else {
        this.vistalistado = true;
        this.LlistaHotel.forEach(function (item) {
          if (item.oprice.pricePerAllNights < menorValor) {
            menorValor = item.oprice.pricePerAllNights;
          }
          if (item.oprice.pricePerAllNights > mayorValor) {
            mayorValor = item.oprice.pricePerAllNights;
          }

        });

        this.menorPrecioHotel = menorValor;
        this.mayorPrecioHotel = mayorValor;
        this.sessionStorageService.store("ls_search_hotel", this.LlistaHotel);
        this.mapafiltro = true;
      }
    }

    searchFlightBuscador($event) {
      console.log($event)
    }


    ObtenerListaFiltroEstrella($event) {
      this.divwarning = false;
      this.LlistaHotel = [];
      this.LlistaHotel = $event;
      this.flagDinDataMini = false;
      if (this.LlistaHotel.length === 0) {
        this.divwarning = true;
        this.flagDinDataMini = true;
      }
    }

    ObtenerListaFiltroPrecio($event) {
      this.divwarning = false;
      this.LlistaHotel = [];
      this.LlistaHotel = $event;
      this.flagDinDataMini = false;
      if (this.LlistaHotel.length === 0) {
        this.divwarning = true;
        this.flagDinDataMini = true;
      }
    }

    ObtenerListaFiltroNombre($event) {
      this.LlistaHotel = [];
      this.LlistaHotel = $event;
      this.flagDinDataMini = false;
      if (this.LlistaHotel.length === 0) {
        this.divwarning = true;
        this.flagDinDataMini = true;
      }

    }

    ObtenerListFiltro($event) {
      this.LlistaHotel = [];
      this.LlistaHotel = $event;
    }


    MostrarMapa($event) {
      this.vistamapa = $event;
      this.vistalistado = false;
    }

    MostrarMapaMini($event) {
      this.vistamapa = $event;
      this.vistalistado = false;
    }

    MostrarListado($event) {
      this.vistalistado = $event;
      this.vistamapa = false;
    }

    MostrarListadoMini($event) {
      this.vistalistado = $event;
      this.vistamapa = false;
    }
    showHideMap($event) {
      this.mapafiltro = $event;
    }
    updateMiniBusqueda($event) {
      console.log($event);
      this.flagPriceHotel = $event;
    }
    ObtenerListFiltroMini($event) {
      this.LlistaHotel = [];
      this.LlistaHotel = $event;
    }

  }
