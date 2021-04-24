import { Component, OnInit, AfterViewInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { listLocales } from 'ngx-bootstrap/chronos';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/models';
import { consoleTestResultHandler } from 'tslint/lib/test';
import { Router, ActivatedRoute } from '@angular/router';
import * as crypto from 'crypto-js';
import { IBnusModel } from '../../../models/Ibnus.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { environment } from '../../../../environments/environment';
import { iGetAsesors } from '../../../models/IGetAsesors';
import { FILE } from 'dns';
import { Status } from 'tslint/lib/runner';
import { ModalErrorServiceComponent } from '../../shared/modal-error-service/modal-error-service.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { RecomendacionHotelComponent } from './recomendacion-hotel/recomendacion-hotel.component';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styleUrls: ['./vuelos.component.sass'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }
  }]
})
export class VuelosComponent implements OnInit, AfterViewInit {

  locale = 'es';
  locales = listLocales();
  spin;
  flagBuscar: boolean;
  fechahoy = new Date();
  calendarmini;
  @Input() salida: boolean;
  airportlist: any[] = [];
  citylist: any[] = [];
  airportlistFilter: any[] = [];
  loginDataUser: any;
  searchData: ISearchFlightModel[] = [];

  origenAuto: string;
  origentTexto: string;
  destinoAuto: string;
  destinoTexto: string;

  tipoVuelo: string;
  cont = 0;
  salShowCalendar;
  retShowCalendar;

  keyword = 'name';
  data: any[] = [];
  data2: any[] = [];

  textoCabina: string;
  cabina: string;

  textoEscala: string;
  escala: string;

  pasajeros: number;

  token;
  calendar = false;
  flagDinData;

  indexTramo: number;
  miniBuscador = true;
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

  minDateSalida: Date;
  minDateRetorno: Date;
  maxDateIngreso: Date;

  fechaSalida: string;
  fechaRetorno: string;
  fechaSalidaShow: string;
  fechaRetornoShow: string;

  fechaSalida1: string;
  fechaSalida2: string;
  fechaSalida3: string;
  fechaSalida4: string;
  fechaSalida5: string;
  fechaSalida6: string;

  fechaSalidaShow1: string;
  fechaSalidaShow2: string;
  fechaSalidaShow3: string;
  fechaSalidaShow4: string;
  fechaSalidaShow5: string;
  fechaSalidaShow6: string;

  flagCentralizador: boolean;
  flagAutoCroselling: boolean;
  flagPseudoRepeat: boolean;
  inicioBuscador: boolean;
  flagPaxMasMenos: boolean;

  vuelosManiana: boolean;
  salCalendar;
  llegCalendar;
  vuelosNoche: boolean;
  vueloTurnoFiltro: boolean;
  flagBuscadorLateral: boolean;
  isOpen = false;
  valdestino = false;
  valfechasalida = false;
  valfechadestino = false;
  indback;
  ss_login_data;

  model: any = {};

  aerolineas: any[] = [];
  lstAutocomplete: any[] = [];

  lstResult1: any[] = [];
  lstResult2: any[] = [];
  isOpendate = false;
  bsValue: Date;
  calendarSalidaValue: Date;
  showProfile: any;
  lstBnus: IBnusModel[];
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  modalerror: BsModalRef;
  modalRef: BsModalRef;
  lst_rol_autogestion;
  lst_rol_autorizador;
  lst_rol_centralizador;
  datosuser: any[] = [];
  p: number[] = [];
  lstAsesors: iGetAsesors[];
  maleta: boolean = true;
  flagDinData2: boolean = false;
  dateCustomClasses: DatepickerDateCustomClasses[];
  showHotel = false;
  flagCrosselling;
  validCrosselingHotel;

  // @ViewChild(MatVerticalStepper) vert_stepper: MatVerticalStepper;
  @ViewChild('stepper', { static: false }) stepper: MatStepper;

  @ViewChild('recomendacionHotel', { read: RecomendacionHotelComponent, static: false }) recomendacionHotel: RecomendacionHotelComponent;
  vueloSeleccionado: any;
  showResume: boolean = false;

  constructor(
    private rutaActiva: ActivatedRoute,
    private airportService: AirportService,
    private localeService: BsLocaleService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService,
    private router: Router,
    private elementRef: ElementRef,
    private modalService: BsModalService,
  ) {
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('.menu-hotel-1').show();
    $('.menu-hotel-2').hide();
    $('.menu-bus-1').show();
    $('.menu-bus-2').hide();
    $('.menu-paquete-1').show();
    $('.menu-paquete-2').hide();
    $('.menu-seguro-1').show();
    $('.menu-seguro-2').hide();
    this.flagBuscar = false;
    this.tipoVuelo = "RT";
    this.origenAuto = "";
    this.destinoAuto = "";
    this.textoCabina = "Todas";
    this.cabina = "";
    this.textoEscala = "Todas";
    this.escala = "";
    this.pasajeros = 1;
    this.flagDinData = false;
    this.indexTramo = 2;
    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate());
    this.minDateRetorno = new Date();
    this.minDateRetorno.setDate(this.minDateRetorno.getDate() + 1);
    this.flagPseudoRepeat = false;
    this.inicioBuscador = true;
    this.flagPaxMasMenos = true;
    this.vuelosManiana = false;
    this.vuelosNoche = false;
    this.vueloTurnoFiltro = false;
    this.flagBuscadorLateral = false;
    this.ss_login_data = this.sessionStorageService.retrieve('ss_login_data');
    this.lst_rol_autogestion = environment.cod_rol_autogestion;
    this.lst_rol_autorizador = environment.cod_rol_autorizador;
    this.lst_rol_centralizador = environment.cod_rol_centralizador;
    //  this.sessionStorageService.store('objusuarios', null);
    if (this.ss_login_data === '' || this.ss_login_data === null) {
      this.router.navigate(['/']);
    }
    const now = new Date();
    this.dateCustomClasses = [
      { date: now, classes: ['bg-danger', 'text-warning'] }
    ];
  }

  ngOnInit() {
    this.showResume = false;
    this.showProfile = this.sessionStorageService.store('ss_profile', false);
    this.bsValue = new Date();
    $(".x").hide();
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('.menu-hotel-1').show();
    $('.menu-hotel-2').hide();
    $('.menu-bus-1').show();
    $('.menu-bus-2').hide();
    $('.menu-paquete-1').show();
    $('.menu-paquete-2').hide();
    $('.menu-seguro-1').show();
    $('.menu-seguro-2').hide();

    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.citylist = this.localStorageService.retrieve('ls_citylist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.sessionStorageService.store('ss_token', this.loginDataUser.token);
    this.token = this.sessionStorageService.retrieve('ss_token');
    this.flagCentralizador = this.sessionStorageService.retrieve('ss_flagCentralizador');
    if (this.loginDataUser.ocompany != null) {
      this.flagAutoCroselling = this.loginDataUser.ocompany.ocompanyConfiguration.crossSellingHotel;
    }
    //console.log('this.flagCentralizador: ' + this.flagCentralizador);
    //console.log(this.locales);
    this.localeService.use(this.locale);
    if (!this.flagCentralizador) {
      this.sessionStorageService.store('ss_lstPasajeros', null);
      this.flagPaxMasMenos = true;
    } else {
      this.flagPaxMasMenos = false;
    }
    this.indback = this.sessionStorageService.retrieve('indregresar');
    let tipovuelo;
    if (this.router.url.indexOf('vuelo-habitacion') >= 0) {
      this.indback = true;
    }
    if (this.router.url.indexOf('reserva-vuelo-hotel') >= 0) {
      this.indback = true;
    }
    if (this.indback === true) {
      // this.SearchFlight2();
      let idinterval = this.sessionStorageService.retrieve('idinterval');
      clearInterval(idinterval);
      let databuscador = this.sessionStorageService.retrieve('objbuscador');
      let dataRequestFlight = this.sessionStorageService.retrieve('ss_databuscador');
      if (dataRequestFlight != null) {
        tipovuelo = databuscador.tipovuelo;
        if (tipovuelo === 'OW' || tipovuelo === 'RT') {
          let lstdata = this.sessionStorageService.retrieve('ss_searchFlight');
          this.setLstAerolineas(lstdata);
          this.searchData = lstdata;
          if (this.ss_login_data.orole.roleDescription === 'Usuario' || this.ss_login_data.orole.roleDescription === 'Autorizador') {
            this.flagBuscar = true;
            this.flagBuscadorLateral = true;
          } else {
            this.flagBuscar = true;
            this.flagBuscadorLateral = true;
            this.flagCentralizador = false;
          }
          this.sessionStorageService.store('indregresar', null);
          this.sessionStorageService.store('indback2', true);
          this.origenAuto = databuscador.origencode;
          this.origentTexto = databuscador.origen;
          this.destinoAuto = databuscador.destinocode;
          this.destinoTexto = databuscador.destino;
          this.textoEscala = databuscador.escala;
          this.textoCabina = databuscador.cabina;
          this.pasajeros = databuscador.pasajeros;
          console.log(databuscador);
          this.fechaSalidaShow = databuscador.fechasalidashow;
          this.fechaRetornoShow = databuscador.fecharetornoshow;
          this.fechaSalida = databuscador.fechasalida;
          this.fechaRetorno = databuscador.fechadestino;
          this.tipoVuelo = databuscador.tipovuelo;
          this.minDateSalida = databuscador.mindatesalida;
          this.minDateRetorno = databuscador.mindateretorno;
        }
        if (tipovuelo === 'MC') {
          let lstdata = this.sessionStorageService.retrieve('ss_searchFlight');
          this.setLstAerolineas(lstdata);
          this.searchData = lstdata;
          this.flagBuscar = true;
          this.flagBuscadorLateral = true;
          this.sessionStorageService.store('indregresar', null);
          this.sessionStorageService.store('indback2', true);
          this.origenAuto1 = databuscador.origencode1;
          this.origenAuto2 = databuscador.origencode2;
          this.origenAuto3 = databuscador.origencode3;
          this.origenAuto4 = databuscador.origencode4;
          this.origenAuto5 = databuscador.origencode5;
          this.origenAuto6 = databuscador.origencode6;
          this.origentTexto1 = databuscador.origen1;
          this.origentTexto2 = databuscador.origen2;
          this.origentTexto3 = databuscador.origen3;
          this.origentTexto4 = databuscador.origen4;
          this.origentTexto5 = databuscador.origen5;
          this.origentTexto6 = databuscador.origen6;
          this.destinoAuto1 = databuscador.destinocode1;
          this.destinoAuto2 = databuscador.destinocode2;
          this.destinoAuto3 = databuscador.destinocode3;
          this.destinoAuto4 = databuscador.destinocode4;
          this.destinoAuto5 = databuscador.destinocode5;
          this.destinoAuto6 = databuscador.destinocode6;
          this.destinoTexto1 = databuscador.destino1;
          this.destinoTexto2 = databuscador.destino2;
          this.destinoTexto3 = databuscador.destino3;
          this.destinoTexto4 = databuscador.destino4;
          this.destinoTexto5 = databuscador.destino5;
          this.destinoTexto6 = databuscador.destino6;
          this.textoEscala = databuscador.escala;
          this.textoCabina = databuscador.cabina;
          this.pasajeros = databuscador.pasajeros;
          this.tipoVuelo = databuscador.tipovuelo;
          this.indexTramo = databuscador.indextramo;
          this.fechaSalida1 = databuscador.fechasalida1;
          this.fechaSalida2 = databuscador.fechasalida2;
          this.fechaSalida3 = databuscador.fechasalida3;
          this.fechaSalida4 = databuscador.fechasalida4;
          this.fechaSalida5 = databuscador.fechasalida5;
          this.fechaSalida6 = databuscador.fechasalida6;
          this.fechaSalidaShow1 = databuscador.fechasalida1;
          this.fechaSalidaShow2 = databuscador.fechasalida2;
          this.fechaSalidaShow3 = databuscador.fechasalida3;
          this.fechaSalidaShow4 = databuscador.fechasalida4;
          this.fechaSalidaShow5 = databuscador.fechasalida5;
          this.fechaSalidaShow6 = databuscador.fechasalida6;
        }
      }
    }
    if (tipovuelo != 'RT') {
      this.spin = true;
    } else {
      this.calendar = true;
      this.spin = true;
    }
  }

  ngAfterViewInit() {
    this.startCountDown(28800, null);
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
    if (this.router.url.indexOf('vuelo-habitacion') >= 0) {
      let recomendation = this.sessionStorageService.retrieve('ss_flightavailability_request1_recomendacion');
      this.adicionarHotel(recomendation);
    }
    if (this.router.url.indexOf('reserva-vuelo-hotel') >= 0) {
      // let recomendation = this.sessionStorageService.retrieve('ss_flightavailability_request1_recomendacion');
      // this.adicionarHotel(recomendation);
      this.goToResume();
    }
  }

  onStepChange(event: any): void {
    if (event.previouslySelectedIndex > event.selectedIndex) {
      // está retrocediendo
      this.stepper.steps.map((matSteap, index) => {
        if (event.selectedIndex < index) {
          matSteap.reset();
          if (index == 2 && event.selectedIndex === 0) {
            this.sessionStorageService.store('indregresar', true);
            this.router.navigate(['/vuelos']);
          } else if (index == 2 && event.selectedIndex === 1) {
            this.router.navigate(['/vuelo-habitacion']);
          }
        }
        matSteap.completed = false;
      });
    }
  }

  skipStep() {
    this.router.navigate(['/reserva-vuelo']);
  }

  gotoStep(step: number) {
    this.stepper.steps.map((matSteap, index) => {
      if (index < step) {
        matSteap.completed = true;
      }
    });
    this.stepper.selectedIndex = step;
  }

  goToResume() {
    this.showResume = true;
    this.gotoStep(2);
  }

  adicionarHotel(recomendacion) {
    console.log(this.flagAutoCroselling);
    if (this.flagAutoCroselling) {
      this.sessionStorageService.store('ss_flightavailability_request1_recomendacion', recomendacion);
      this.vueloSeleccionado = this.sessionStorageService.retrieve('ss_flightavailability_request1');
      // tslint:disable-next-line: max-line-length
      let fechallegada = this.vueloSeleccionado.Lsections[0].Lsegments[0].LsegmentGroups[this.vueloSeleccionado.Lsections[0].Lsegments[0].LsegmentGroups.length - 1].ArrivalDate;

      if (this.tipoVuelo === 'RT') {
        let fechaSalida = this.vueloSeleccionado.Lsections[1].DepartureDate;
        console.log(fechallegada);
        console.log(fechaSalida);
        this.recomendacionHotel.triggerSearch(
          fechallegada.substring(0, 2) + '-' + fechallegada.substring(2, 4) + '-' + '20' + fechallegada.substring(4, 6),
          fechaSalida.substring(0, 2) + '-' + fechaSalida.substring(2, 4) + '-' + '20' + fechaSalida.substring(4, 6),
          this.pasajeros,
          this.destinoAuto,
          this.destinoTexto,
          'Todas',
          recomendacion,
          this.tipoVuelo,
        );
        this.gotoStep(1);
        console.log(fechallegada);
        console.log(fechaSalida);
      } else if (this.tipoVuelo === 'OW') {
        let salidaTemp = new Date('20' + fechallegada.substring(4, 6) + '-' + fechallegada.substring(2, 4) + '-' + (fechallegada.substring(0, 2) * 1 + 1));
        this.recomendacionHotel.triggerSearch(
          fechallegada.substring(0, 2) + '-' + fechallegada.substring(2, 4) + '-' + '20' + fechallegada.substring(4, 6),
          (salidaTemp.getDate() < 10 ? '0' + salidaTemp.getDate() : salidaTemp.getDate()) + '-' +
          ((((salidaTemp.getMonth() * 1) + 1) < 10) ? '0' + ((salidaTemp.getMonth() * 1) + 1) : ((salidaTemp.getMonth() * 1) + 1)) + '-' + salidaTemp.getFullYear(),
          this.pasajeros,
          this.destinoAuto,
          this.destinoTexto,
          'Todas',
          recomendacion,
          this.tipoVuelo,
        );
        this.gotoStep(1);
      } else {
        alert('No se encontró una fecha de llegada para el vuelo seleccionada');
      }
    }
  }

  refreshFilters($event) {
    this.pasajeros = $event.pasajeros;
    this.destinoAuto = $event.destinoAuto;
    this.destinoTexto = $event.destinoTexto;
  }

  hiddeShowSpiner(val: boolean) {
    const spinner = this.spinner;
    console.log(this.spinner);
    setTimeout(function () {
      if (val)
        spinner.show();
      else
        spinner.hide();
    }, 500);
  }

  airportList() {
    this.airportService.airportList(this.token).subscribe(
      (result: any) => {
        let lstairport;
        //console.log(result);
        //this.airportlist = result.lairport;
        this.localStorageService.store('ls_airportlist1', result.lairport);
        this.localStorageService.store('ls_citylist1', result.lcity);
      },

      (err) => {
        this.spinner.hide();
      },

      () => {
        this.spinner.hide();
        let id = this.rutaActiva.snapshot.params.id;
        //console.log("Service airportList complete");
        //$(location).attr("href", "/vuelos");
        if (id == 1) {
          this.router.navigate(['/gestion-reserva-vuelo']);
        } else {
          this.router.navigate(['/vuelos']);
        }
      }
    );
  }

  handlerSalida(datepickerSalida) {
    this.isOpendate = true;
  }

  handlerRetorno() {
    this.isOpendate = true;
  }

  salidaCalendar(input) {
    const datePart = input.match(/\d+/g);
    const yearCalendar = datePart[0];
    const year = datePart[0].substring(2); // get only two digits
    const month = datePart[1];
    const day = datePart[2];

    this.salCalendar = day + '/' + month + '/' + year;
    this.salShowCalendar = day + '/' + month + '/' + yearCalendar;
  }

  llegadaCalendar(input) {
    const datePart = input.match(/\d+/g);
    const yearCalendar = datePart[0];
    const year = datePart[0].substring(2); // get only two digits
    const month = datePart[1];
    const day = datePart[2];

    this.llegCalendar = day + '/' + month + '/' + year;
    this.retShowCalendar = day + '/' + month + '/' + yearCalendar;
  }

  onValueChangeSalida(value: Date, dateretorno: any): void {
    this.valfechasalida = false;
    $("#txtFechaSalida").removeClass("campo-invalido");
    this.minDateRetorno = value;
    this.dateCustomClasses = [
      { date: this.minDateRetorno, classes: ['bg-danger', 'text-warning'] }
    ];
    //console.log("dpSalida: " + this.dpSalida);

    if (value != null) {
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

      if (value >= this.calendarSalidaValue) {
        $("#fechadestino").val("");
        this.fechaRetorno = '';
      }
      this.fechaSalida = value.getFullYear() + "/" + mes + "/" + dia;
      this.fechaSalidaShow = dia + "/" + mes + "/" + value.getFullYear();
    }
  }

  ValidarCiudad() {
    if (this.model.origentTexto.length < 10) {
      this.model.origentTexto = '';
    }

    if (this.model.destinoTexto.length < 10) {
      this.model.destinoTexto = '';
    }
  }

  clickfecha1() {
  }

  onValueChangeRetorno(value: Date): void {
    if (value != null) {
      this.valfechadestino = false;
      this.calendarSalidaValue = value;
      this.dateCustomClasses = [
        { date: null, classes: ['bg-danger', 'text-warning'] }
      ];
      $("#txtFechaDestino").removeClass("campo-invalido");
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

      this.fechaRetorno = value.getFullYear() + "/" + mes + "/" + dia;
      this.fechaRetornoShow = dia + "/" + mes + "/" + value.getFullYear();
    }
  }

  GetUsers() {
    let data = {
      Id: this.loginDataUser.userId
    }
    let objuser;
    this.airportService.GetUser(data.Id).subscribe(
      results => {
        objuser = results;
        this.datosuser.push(objuser);
        this.sessionStorageService.store('objusuarios', this.datosuser);
      },
      err => {

      },
      () => {
        // this.TraerAutorizador();
      }
    );
  }

  selectEvent(item) {
    // do something with selected item
    this.origenAuto = item.iataCode;
    this.origentTexto = item.name;
    this.isOpen = false;
    $("#txtOrigen").removeClass("campo-invalido");
    $(".x").hide();
  }

  onChangeSearch(val: string) {

    //this.lstAutocomplete = this.localStorageService.retrieve('ls_airportlist');
    //this.citylist = this.localStorageService.retrieve('ls_citylist');

    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.citylist = this.localStorageService.retrieve('ls_citylist');

    this.lstAutocomplete = [];
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
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
      this.data = resultFilter;

      /*
      let resultAero = this.airportlist.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) > 0 );
      console.log("resultAero: " + JSON.stringify(resultAero));
      let resultCity = this.citylist.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) > 0 );
      let lstResult1: any [] = [];
      resultAero.forEach(function (aeropuerto) {
        const data1 = {
          iataCode: aeropuerto.iataCode,
          name: aeropuerto.name,
          searchName: aeropuerto.searchName,
          latitude: aeropuerto.latitude,
          longitude: aeropuerto.longitude,
          categoryId: 1
        };
        lstResult1.push(data1);
      });
      resultCity.forEach(function (ciudad) {
        const data2 = {
          iataCode: ciudad.iataCode,
          name: ciudad.name,
          searchName: ciudad.searchName,
          latitude: ciudad.latitude,
          longitude: ciudad.longitude,
          categoryId: 2
        };
        lstResult1.push(data2);
      });
      if (lstResult1.length > 0) {
        this.data = lstResult1;
      }
      */

      $(".x").hide();
    }
  }

  onFocused(e) {
  }

  selectEvent2(item) {
    this.destinoAuto = item.iataCode;
    this.destinoTexto = item.name;
    this.valdestino = false;
    $("#txtDestino").removeClass("campo-invalido");
    $(".x").hide();
    if (this.model.origentTexto.length < 5) {
      this.model.origentTexto = '';
    }
  }

  onChangeSearch2(val: string) {
    //this.lstAutocomplete = this.localStorageService.retrieve('ls_airportlist');
    //this.citylist = this.localStorageService.retrieve('ls_citylist');

    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.citylist = this.localStorageService.retrieve('ls_citylist');

    this.lstAutocomplete = [];
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
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;


    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter(word => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0);
      this.data2 = resultFilter;

      /*
      let resultAero = this.airportlist.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) > 0 );
      let resultCity = this.citylist.filter( word => word.searchName.toLowerCase().search(val.toLowerCase()) > 0 );
      if (resultAero.length > 5) {
        resultAero = resultAero.slice(0, 5);
      }
      if (resultCity.length > 5) {
        resultCity = resultCity.slice(0, 5);
      }
      let lstResult2: any [] = [];
      resultAero.forEach(function (aeropuerto) {
        const data1 = {
          iataCode: aeropuerto.iataCode,
          name: aeropuerto.name,
          searchName: aeropuerto.searchName,
          latitude: aeropuerto.latitude,
          longitude: aeropuerto.longitude,
          categoryId: 1
        };
        lstResult2.push(data1);
      });
      resultCity.forEach(function (ciudad) {
        const data2 = {
          iataCode: ciudad.iataCode,
          name: ciudad.name,
          searchName: ciudad.searchName,
          latitude: ciudad.latitude,
          longitude: ciudad.longitude,
          categoryId: 2
        };
        lstResult2.push(data2);
      });
      console.log("lstResult2: " + JSON.stringify(lstResult2));
      if (lstResult2.length === 10) {
        this.data2 = lstResult2;
      }
      */

      $(".x").hide();
    }
  }

  onFocused2(e) {
  }

  ClosedOrigen() {
    if (this.model.origentTexto.length < 15) {
      this.model.origentTexto = '';
    }
  }

  ClosedDestino() {
    if (this.model.destinoTexto.length < 15) {
      this.model.destinoTexto = '';
    }
  }

  seleccionarCabina(valor, texto) {
    this.cabina = valor;
    this.textoCabina = texto;
  }

  seleccionarEscala(valor, texto) {
    this.escala = valor;
    this.textoEscala = texto;
  }

  pasajeroOperacion(valor) {
    let pasajeros = this.pasajeros;
    if (valor === true) {
      pasajeros = pasajeros + 1;
      if (pasajeros === 9) {
        pasajeros = 8;
      }
      this.pasajeros = pasajeros;
    }
    if (valor === false) {
      pasajeros = pasajeros - 1;
      if (pasajeros === 0) {
        pasajeros = 1;
      }
      this.pasajeros = pasajeros;
    }
  }

  seleccionarTipoVuelo(valor) {
    this.tipoVuelo = valor;
    if (valor === 'RT') {
      this.indexTramo = 2;
    }
    if (valor === 'OW') {
      this.indexTramo = 1;
    }
    if (valor === 'MC') {
      //this.origenAuto = "";
      //this.origentTexto = "";
      //this.model.origentTexto = "";
      this.indexTramo = 2;
      this.lstAutocomplete = [];
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
      lstAutocomplete.sort((a, b) => b.priority - a.priority);
      this.lstAutocomplete = lstAutocomplete;
    }
  }

  UserBnus1(template) {
    let origen: any[] = [];
    let destino: any[] = [];
    let fechas: any[] = [];
    let horasFrom: any[] = [];
    let horasTo: any[] = [];

    if (this.tipoVuelo === "RT") {
      origen.push(this.origenAuto);
      origen.push(this.destinoAuto);

      destino.push(this.destinoAuto);
      destino.push(this.origenAuto);

      fechas.push(this.fechaSalida);
      fechas.push(this.fechaRetorno);
    }

    if (this.tipoVuelo === "OW") {
      origen.push(this.origenAuto);
      destino.push(this.destinoAuto);
      fechas.push(this.fechaSalida);
    }

    if (this.tipoVuelo === "MC") {
      const indexTramo = this.indexTramo;
      switch (indexTramo) {
        case 2:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          break;
        case 3:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          break;
        case 4:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          fechas.push(this.fechaSalida4);
          break;
        case 5:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);
          origen.push(this.origenAuto5);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);
          destino.push(this.destinoAuto5);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          fechas.push(this.fechaSalida4);
          fechas.push(this.fechaSalida5);
          break;
        case 6:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);
          origen.push(this.origenAuto5);
          origen.push(this.origenAuto6);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);
          destino.push(this.destinoAuto5);
          destino.push(this.destinoAuto6);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          fechas.push(this.fechaSalida4);
          fechas.push(this.fechaSalida5);
          fechas.push(this.fechaSalida6);
          break;
      }
    }

    let data: any;
    data = {
      "CompanyID": this.loginDataUser.ocompany.companyId,
      "UserId": this.loginDataUser.userId,
      "Use": true,
      "Origin": origen,
      "Destination": destino,
      "Dates": fechas
    };
    this.airportService.ValidateInsertUseBnus(data).subscribe(
      result => {
        if (result === true) {
          console.log(result);
          this.modalRef.hide();
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg m-infraccion' })
          );
        }
      },
      err => {

      },
      () => {
        // this.modalRef.hide();
      }
    )
  }

  UserBnus2() {
    this.spinner.show();
    let origen: any[] = [];
    let destino: any[] = [];
    let fechas: any[] = [];
    let horasFrom: any[] = [];
    let horasTo: any[] = [];

    if (this.tipoVuelo === "RT") {
      origen.push(this.origenAuto);
      origen.push(this.destinoAuto);

      destino.push(this.destinoAuto);
      destino.push(this.origenAuto);

      fechas.push(this.fechaSalida);
      fechas.push(this.fechaRetorno);
    }

    if (this.tipoVuelo === "OW") {
      origen.push(this.origenAuto);
      destino.push(this.destinoAuto);
      fechas.push(this.fechaSalida);
    }

    if (this.tipoVuelo === "MC") {
      const indexTramo = this.indexTramo;
      switch (indexTramo) {
        case 2:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          break;
        case 3:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          break;
        case 4:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          fechas.push(this.fechaSalida4);
          break;
        case 5:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);
          origen.push(this.origenAuto5);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);
          destino.push(this.destinoAuto5);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          fechas.push(this.fechaSalida4);
          fechas.push(this.fechaSalida5);
          break;
        case 6:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);
          origen.push(this.origenAuto5);
          origen.push(this.origenAuto6);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);
          destino.push(this.destinoAuto5);
          destino.push(this.destinoAuto6);

          fechas.push(this.fechaSalida1);
          fechas.push(this.fechaSalida2);
          fechas.push(this.fechaSalida3);
          fechas.push(this.fechaSalida4);
          fechas.push(this.fechaSalida5);
          fechas.push(this.fechaSalida6);
          break;
      }
    }
    let data: any;
    data = {
      "CompanyID": this.loginDataUser.ocompany.companyId,
      "UserId": this.loginDataUser.userId,
      "Use": false,
      "Origin": origen,
      "Destination": destino,
      "Dates": fechas
    };
    this.airportService.ValidateInsertUseBnus(data).subscribe(
      result => {
      },
      err => {

      },
      () => {
        // this.modalRef.hide();
      }
    )
  }

  CloseModal() {
    this.searchFlight();
  }

  GetAsesors(template) {
    let data = {
      Id: this.loginDataUser.ocompany.companyId
    }
    this.airportService.GetAsesors(data.Id).subscribe(
      results => {
        this.lstAsesors = results;
      },
      err => {
        this.spinner.hide();
        this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
      },
      () => {
        if (this.lstBnus != null) {
          if (this.lstBnus.length > 0) {
            this.spinner.hide();
            this.modalRef = this.modalService.show(
              template,
              Object.assign({}, { class: 'gray modal-lg m-resumen' }, this.config)
            );
          } else {
            this.searchFlight();
          }
        } else {
          this.searchFlight();
        }
      }
    )
  }

  GetBoletosNoUsados(template) {
    this.spinner.show();
    let origen: any[] = [];
    let destino: any[] = [];
    let fechasalida;
    fechasalida = this.FormatearFecha(this.fechaSalida);
    if (this.tipoVuelo === "RT") {
      origen.push(this.origenAuto);
      origen.push(this.destinoAuto);

      destino.push(this.destinoAuto);
      destino.push(this.origenAuto);
    }

    if (this.tipoVuelo === "OW") {
      origen.push(this.origenAuto);
      destino.push(this.destinoAuto);
    }

    if (this.tipoVuelo === "MC") {
      const indexTramo = this.indexTramo;
      switch (indexTramo) {
        case 2:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          break;
        case 3:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          break;
        case 4:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);
          break;
        case 5:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);
          origen.push(this.origenAuto5);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);
          destino.push(this.destinoAuto5);
          break;
        case 6:
          origen.push(this.origenAuto1);
          origen.push(this.origenAuto2);
          origen.push(this.origenAuto3);
          origen.push(this.origenAuto4);
          origen.push(this.origenAuto5);
          origen.push(this.origenAuto6);

          destino.push(this.destinoAuto1);
          destino.push(this.destinoAuto2);
          destino.push(this.destinoAuto3);
          destino.push(this.destinoAuto4);
          destino.push(this.destinoAuto5);
          destino.push(this.destinoAuto6);
          break;
      }
    }

    let data = {
      "RUC": this.loginDataUser.ocompany.ruc,
      "DepartureDate": fechasalida,
      "Origin": origen,
      "Destination": destino,
      "CountryCode": this.loginDataUser.ocompany.countryCode
    }
    this.airportService.GetBoletosnoUsados(data).subscribe(
      result => {
        this.lstBnus = result;
        this.sessionStorageService.store('lstbnus', this.lstBnus);
      },
      err => {
      },
      () => {
        this.GetAsesors(template);
      }
    );
  }

  startCountDown(seconds, template) {
    var counter = seconds;
    var interval = setInterval(() => {
      counter--;
      if (counter < 0) {
        clearInterval(interval);
        this.router.navigate(['login']);
      }
    }, 1000);
    return interval;
  }

  FormatearFecha(fechasalida) {
    let fechatotal;
    let fecha = fechasalida;
    let datafecha = fecha.split('/');
    let año = datafecha[0];
    let mes = datafecha[1];
    let dia = datafecha[2];
    fechatotal = año + '-' + mes + '-' + dia;
    return fechatotal;
  }

  BoletosNousados(template) {
    const flagVal = this.validarDataBusqueda();
    if (!flagVal) {
      this.spinner.hide();
      return flagVal;
    } else {
      this.GetBoletosNoUsados(template);
    }
  }

  onSelectDate(fechas) {
    const regex = /-/gi;
    fechas.Salida = fechas.Salida.replace(regex, '/');
    fechas.Salida = fechas.Salida.replace(regex, '/');
    fechas.Llegada = fechas.Llegada.replace(regex, '/');
    fechas.Llegada = fechas.Llegada.replace(regex, '/');
    this.searchFlightCalendar(fechas.Salida, fechas.Llegada);
  }

  changeFormat(date1, date2) {
    const salida = date1.toString().split('/').reverse().join('/');
    const retorno = date2.toString().split('/').reverse().join('/');
  }



  searchFlightCalendar(salida, llegada) {
    //codigo comentado de bnus
    /*  if (this.lstBnus != null) {
        if (this.lstBnus.length > 0) {
          this.UserBnus2();
          this.modalRef.hide();
        }
      }
      */
    const flagVal = true;
    if (!flagVal) {
      return;
    } else {
      this.spinner.show();
      const hola = $('#fechasalida').val();
      this.inicioBuscador = false;
      this.miniBuscador = false;
      this.spin = false;
      this.calendarmini = false;
      this.flagDinData = false;
      let databuscador = this.sessionStorageService.retrieve('objbuscador');
      this.origenAuto = databuscador.origencode;
      this.origentTexto = databuscador.origen;
      this.destinoAuto = databuscador.destinocode;
      this.destinoTexto = databuscador.destino;
      let origen: any[] = [];
      let destino: any[] = [];
      let fechas: any[] = [];
      let horasFrom: any[] = [];
      let horasTo: any[] = [];
      if (this.tipoVuelo === "RT") {
        this.sessionStorageService.store('ss_calendarshopping', null);
        origen.push(this.origenAuto);
        origen.push(this.destinoAuto);

        destino.push(this.destinoAuto);
        destino.push(this.origenAuto);

        fechas.push(salida);
        fechas.push(llegada);
      }

      if (this.tipoVuelo === "OW") {
        origen.push(this.origenAuto);
        destino.push(this.destinoAuto);
        fechas.push(this.fechaSalida);
      }

      if (this.tipoVuelo === "MC") {
        const indexTramo = this.indexTramo;
        switch (indexTramo) {
          case 2:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            break;
          case 3:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);
            origen.push(this.origenAuto3);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);
            destino.push(this.destinoAuto3);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            fechas.push(this.fechaSalida3);
            break;
          case 4:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);
            origen.push(this.origenAuto3);
            origen.push(this.origenAuto4);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);
            destino.push(this.destinoAuto3);
            destino.push(this.destinoAuto4);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            fechas.push(this.fechaSalida3);
            fechas.push(this.fechaSalida4);
            break;
          case 5:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);
            origen.push(this.origenAuto3);
            origen.push(this.origenAuto4);
            origen.push(this.origenAuto5);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);
            destino.push(this.destinoAuto3);
            destino.push(this.destinoAuto4);
            destino.push(this.destinoAuto5);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            fechas.push(this.fechaSalida3);
            fechas.push(this.fechaSalida4);
            fechas.push(this.fechaSalida5);
            break;
          case 6:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);
            origen.push(this.origenAuto3);
            origen.push(this.origenAuto4);
            origen.push(this.origenAuto5);
            origen.push(this.origenAuto6);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);
            destino.push(this.destinoAuto3);
            destino.push(this.destinoAuto4);
            destino.push(this.destinoAuto5);
            destino.push(this.destinoAuto6);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            fechas.push(this.fechaSalida3);
            fechas.push(this.fechaSalida4);
            fechas.push(this.fechaSalida5);
            fechas.push(this.fechaSalida6);
            break;
        }
      }
      fechas.forEach(function (fe) {
        horasFrom.push("");
        horasTo.push("");
      });

      let lUsers_: any[] = [];
      let lPassengers: any[] = [];

      const lstPasajeros = this.sessionStorageService.retrieve('ss_lstPasajeros');
      if (lstPasajeros != null) {
        if (lstPasajeros.length > 0) {
          lstPasajeros.forEach(function (item, index) {
            const pax = {
              "RoleId": item.orole.id,
              "CostCenterId": null,
              "UserId": item.userId
            };
            lUsers_.push(pax);
          });
        }
      } else {
        lUsers_.push(
          {
            "RoleId": this.loginDataUser.orole.roleId,
            "CostCenterId": null,
            "UserId": this.loginDataUser.userId
          }
        );
      }


      const passenger = {
        Quantity: this.pasajeros,
        TypePassenger: 'ADT'
      }

      lPassengers.push(passenger);


      let data = {
        "Lusers": lUsers_,
        "Lpassengers": lPassengers,
        "CabinType": this.cabina,
        "Scales": this.escala,
        "TypeSearch": 'C',
        "IncludesBaggage": this.maleta,
        "Origin": origen,
        "Destination": destino,
        "DepartureArrivalDate": fechas,
        "DepartureArrivalTimeFrom": horasFrom,
        "DepartureArrivalTimeTo": horasTo,
        "Ocompany": this.loginDataUser.ocompany,
        "Oagency": this.loginDataUser.oagency
      };

      this.sessionStorageService.store('ss_dataRequestFlight', data);
      this.sessionStorageService.store('ss_databuscador', data);
      this.sessionStorageService.store('ss_horasFrom', horasFrom);
      this.sessionStorageService.store('ss_horasTo', horasTo);
      this.sessionStorageService.store('ss_filterPrecio', 'mas');


      let aerolineas = this.aerolineas;
      let objcampos;

      if (this.tipoVuelo === 'OW' || this.tipoVuelo === 'RT') {
        this.salidaCalendar(salida);
        this.llegadaCalendar(llegada);
        objcampos = {
          origen: this.origentTexto,
          origencode: this.origenAuto,
          destino: this.destinoTexto,
          destinocode: this.destinoAuto,
          fechasalidashow: this.salShowCalendar,
          fecharetornoshow: this.retShowCalendar,
          fechasalida: this.salCalendar,
          fechadestino: this.llegCalendar,
          cabina: this.textoCabina,
          escala: this.textoEscala,
          pasajeros: this.pasajeros,
          tipovuelo: this.tipoVuelo,
          mindatesalida: this.minDateSalida,
          mindateretorno: this.minDateRetorno
        };
      }

      if (this.tipoVuelo === 'MC') {
        objcampos = {
          origen1: this.origentTexto1,
          origen2: this.origentTexto2,
          origen3: this.origentTexto3,
          origen4: this.origentTexto4,
          origen5: this.origentTexto5,
          origen6: this.origentTexto6,
          origencode1: this.origenAuto1,
          origencode2: this.origenAuto2,
          origencode3: this.origenAuto3,
          origencode4: this.origenAuto4,
          origencode5: this.origenAuto5,
          origencode6: this.origenAuto6,
          destino1: this.destinoTexto1,
          destino2: this.destinoTexto2,
          destino3: this.destinoTexto3,
          destino4: this.destinoTexto4,
          destino5: this.destinoTexto5,
          destino6: this.destinoTexto6,
          destinocode1: this.destinoAuto1,
          destinocode2: this.destinoAuto2,
          destinocode3: this.destinoAuto3,
          destinocode4: this.destinoAuto4,
          destinocode5: this.destinoAuto5,
          destinocode6: this.destinoAuto6,
          fechasalida1: this.fechaSalidaShow1,
          fechasalida2: this.fechaSalidaShow2,
          fechasalida3: this.fechaSalidaShow3,
          fechasalida4: this.fechaSalidaShow4,
          fechasalida5: this.fechaSalidaShow5,
          fechasalida6: this.fechaSalidaShow6,
          tipovuelo: this.tipoVuelo,
          cabina: this.textoCabina,
          escala: this.textoEscala,
          pasajeros: this.pasajeros,
          indextramo: this.indexTramo
        }
      }

      this.sessionStorageService.store('objbuscador', objcampos);

      this.airportService.searchFlight(data).subscribe(
        result => {
          this.flagPseudoRepeat = true;
          if (result.status === 200 && result.lrecommendations.length > 0) {
            this.fechaSalidaShow = this.salCalendar;
            this.fechaRetornoShow = this.llegCalendar;
            this.calendar = false;
            this.miniBuscador = true;
            this.sessionStorageService.store('ss_calendarshopping', null);
            this.sessionStorageService.store('ss_dataRequestMini', null);
            //aerolineas
            this.inicioBuscador = true;
            this.searchData = result.lrecommendations;
            this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
            this.sessionStorageService.store('ss_searchFlight', result.lrecommendations);
            this.flagBuscar = true;
            this.flagBuscadorLateral = true;
            this.setLstAerolineas(result.lrecommendations);

            result.lcalendars.forEach(element => {
              element.arrivalDate = element.arrivalDate.substring(0, 10);
              element.departureDate = element.departureDate.substring(0, 10);
            });
            this.sessionStorageService.store('ss_calendarshopping', result.lcalendars);
            this.spin = true;
            this.calendar = true;

          } else {
            this.spin = true;
            this.sessionStorageService.store('ss_searchFlight', null);
            this.flagDinData = true;
          }
        },
        err => {
          this.spinner.hide();
          this.flagBuscadorLateral = false;
          this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
        },
        () => {
          this.spinner.hide();
          this.flagBuscadorLateral = false;
          if (this.searchData.length > 0) {
            if (this.loginDataUser.orole.roleId === this.lst_rol_autogestion[0] || this.loginDataUser.orole.roleId === this.lst_rol_autorizador[0] || this.loginDataUser.orole.roleId != this.lst_rol_centralizador[2] && this.loginDataUser.orole.roleId != this.lst_rol_centralizador[0]) {
              this.GetUsers();
              // this.sessionStorageService.store('objusuarios', this.datosuser);
            }
            if (this.loginDataUser.orole.roleDescription === 'Centralizador' || this.loginDataUser.orole.roleId === this.lst_rol_centralizador[2]) {
              this.datosuser = this.sessionStorageService.retrieve('ss_lstPasajeros');
              this.sessionStorageService.store('objusuarios', this.datosuser);
            }
          }
        }
      );
    }
  }

  searchFlight() {
    //codigo comentado de bnus
    /*  if (this.lstBnus != null) {
        if (this.lstBnus.length > 0) {
          this.UserBnus2();
          this.modalRef.hide();
        }
      }
      */
    const flagVal = this.validarDataBusqueda();
    if (!flagVal) {
      return;
    } else {
      this.spinner.show();
      this.sessionStorageService.store('ss_spinner', true);
      this.spin = true;
      this.flagDinData = false;
      let origen: any[] = [];
      let destino: any[] = [];
      let fechas: any[] = [];
      let horasFrom: any[] = [];
      let horasTo: any[] = [];
      if (this.tipoVuelo === "RT") {
        this.sessionStorageService.store('ss_dataRequestMini', null);
        origen.push(this.origenAuto);
        origen.push(this.destinoAuto);

        destino.push(this.destinoAuto);
        destino.push(this.origenAuto);

        fechas.push(this.fechaSalida);
        fechas.push(this.fechaRetorno);
      }

      if (this.tipoVuelo === "OW") {
        origen.push(this.origenAuto);
        destino.push(this.destinoAuto);
        fechas.push(this.fechaSalida);
      }

      if (this.tipoVuelo === "MC") {
        const indexTramo = this.indexTramo;
        switch (indexTramo) {
          case 2:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            break;
          case 3:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);
            origen.push(this.origenAuto3);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);
            destino.push(this.destinoAuto3);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            fechas.push(this.fechaSalida3);
            break;
          case 4:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);
            origen.push(this.origenAuto3);
            origen.push(this.origenAuto4);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);
            destino.push(this.destinoAuto3);
            destino.push(this.destinoAuto4);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            fechas.push(this.fechaSalida3);
            fechas.push(this.fechaSalida4);
            break;
          case 5:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);
            origen.push(this.origenAuto3);
            origen.push(this.origenAuto4);
            origen.push(this.origenAuto5);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);
            destino.push(this.destinoAuto3);
            destino.push(this.destinoAuto4);
            destino.push(this.destinoAuto5);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            fechas.push(this.fechaSalida3);
            fechas.push(this.fechaSalida4);
            fechas.push(this.fechaSalida5);
            break;
          case 6:
            origen.push(this.origenAuto1);
            origen.push(this.origenAuto2);
            origen.push(this.origenAuto3);
            origen.push(this.origenAuto4);
            origen.push(this.origenAuto5);
            origen.push(this.origenAuto6);

            destino.push(this.destinoAuto1);
            destino.push(this.destinoAuto2);
            destino.push(this.destinoAuto3);
            destino.push(this.destinoAuto4);
            destino.push(this.destinoAuto5);
            destino.push(this.destinoAuto6);

            fechas.push(this.fechaSalida1);
            fechas.push(this.fechaSalida2);
            fechas.push(this.fechaSalida3);
            fechas.push(this.fechaSalida4);
            fechas.push(this.fechaSalida5);
            fechas.push(this.fechaSalida6);
            break;
        }
      }
      fechas.forEach(function (fe) {
        horasFrom.push("");
        horasTo.push("");
      });

      let lUsers_: any[] = [];
      let lPassengers: any[] = [];

      const lstPasajeros = this.sessionStorageService.retrieve('ss_lstPasajeros');
      if (lstPasajeros != null) {
        if (lstPasajeros.length > 0) {
          lstPasajeros.forEach(function (item, index) {
            const pax = {
              "RoleId": item.orole.id,
              "CostCenterId": null,
              "UserId": item.userId
            };
            lUsers_.push(pax);
          });
        }
      } else {
        lUsers_.push(
          {
            "RoleId": this.loginDataUser.orole.roleId,
            "CostCenterId": null,
            "UserId": this.loginDataUser.userId
          }
        );
      }


      const passenger = {
        Quantity: this.pasajeros,
        TypePassenger: 'ADT'
      }

      lPassengers.push(passenger);


      let data = {
        "Lusers": lUsers_,
        "Lpassengers": lPassengers,
        "CabinType": this.cabina,
        "Scales": this.escala,
        "TypeSearch": 'C',
        "IncludesBaggage": this.maleta,
        "Origin": origen,
        "Destination": destino,
        "DepartureArrivalDate": fechas,
        "DepartureArrivalTimeFrom": horasFrom,
        "DepartureArrivalTimeTo": horasTo,
        "Ocompany": this.loginDataUser.ocompany,
        "Oagency": this.loginDataUser.oagency
      };

      this.sessionStorageService.store('ss_dataRequestFlight', data);
      this.sessionStorageService.store('ss_databuscador', data);
      this.sessionStorageService.store('ss_horasFrom', horasFrom);
      this.sessionStorageService.store('ss_horasTo', horasTo);
      this.sessionStorageService.store('ss_filterPrecio', 'mas');


      let aerolineas = this.aerolineas;
      let objcampos;

      if (this.tipoVuelo === 'OW' || this.tipoVuelo === 'RT') {
        objcampos = {
          origen: this.origentTexto,
          origencode: this.origenAuto,
          destino: this.destinoTexto,
          destinocode: this.destinoAuto,
          fechasalidashow: $('#fechasalida').val(),
          fecharetornoshow: $('#fechadestino').val(),
          fechasalida: this.fechaSalida,
          fechadestino: this.fechaRetorno,
          cabina: this.textoCabina,
          escala: this.textoEscala,
          pasajeros: this.pasajeros,
          tipovuelo: this.tipoVuelo,
          mindatesalida: this.minDateSalida,
          mindateretorno: this.minDateRetorno
        };
      }

      if (this.tipoVuelo === 'MC') {
        objcampos = {
          origen1: this.origentTexto1,
          origen2: this.origentTexto2,
          origen3: this.origentTexto3,
          origen4: this.origentTexto4,
          origen5: this.origentTexto5,
          origen6: this.origentTexto6,
          origencode1: this.origenAuto1,
          origencode2: this.origenAuto2,
          origencode3: this.origenAuto3,
          origencode4: this.origenAuto4,
          origencode5: this.origenAuto5,
          origencode6: this.origenAuto6,
          destino1: this.destinoTexto1,
          destino2: this.destinoTexto2,
          destino3: this.destinoTexto3,
          destino4: this.destinoTexto4,
          destino5: this.destinoTexto5,
          destino6: this.destinoTexto6,
          destinocode1: this.destinoAuto1,
          destinocode2: this.destinoAuto2,
          destinocode3: this.destinoAuto3,
          destinocode4: this.destinoAuto4,
          destinocode5: this.destinoAuto5,
          destinocode6: this.destinoAuto6,
          fechasalida1: this.fechaSalidaShow1,
          fechasalida2: this.fechaSalidaShow2,
          fechasalida3: this.fechaSalidaShow3,
          fechasalida4: this.fechaSalidaShow4,
          fechasalida5: this.fechaSalidaShow5,
          fechasalida6: this.fechaSalidaShow6,
          tipovuelo: this.tipoVuelo,
          cabina: this.textoCabina,
          escala: this.textoEscala,
          pasajeros: this.pasajeros,
          indextramo: this.indexTramo
        }
      }

      this.sessionStorageService.store('objbuscador', objcampos);



      this.airportService.searchFlight(data).subscribe(
        result => {
          this.flagPseudoRepeat = true;
          if (result.status === 200 && result.lrecommendations.length > 0) {
            /* console.log(result); */
            this.searchData = result.lrecommendations;
            this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
            this.sessionStorageService.store('ss_searchFlight', result.lrecommendations);
            this.flagBuscar = true;
            this.flagBuscadorLateral = true;
            this.spinner.hide();
            if (this.tipoVuelo === 'RT' && result.lcalendars != null) {
              this.spin = false;
              this.calendar = true;
              this.spin = true;
              result.lcalendars.forEach(element => {
                element.arrivalDate = element.arrivalDate.substring(0, 10);
                element.departureDate = element.departureDate.substring(0, 10);
              });
              this.sessionStorageService.store('ss_calendarshopping', result.lcalendars);
              this.sessionStorageService.store('ss_lowcosto', result);

              this.salida = false;

            }
            //aerolineas
            this.setLstAerolineas(result.lrecommendations);
            // this.sendDataToHotelFilters();
          } else {
            this.sessionStorageService.store('ss_searchFlight', null);
            this.spin = true;
            this.flagDinData = true;
          }
        },
        err => {
          this.spinner.hide();
          this.flagBuscadorLateral = false;
          this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
        },
        () => {
          this.spinner.hide();
          this.flagBuscadorLateral = false;
          if (this.searchData.length > 0) {
            if (this.loginDataUser.orole.roleId === this.lst_rol_autogestion[0] || this.loginDataUser.orole.roleId === this.lst_rol_autorizador[0] || this.loginDataUser.orole.roleId != this.lst_rol_centralizador[2] && this.loginDataUser.orole.roleId != this.lst_rol_centralizador[0]) {
              this.GetUsers();
              // this.sessionStorageService.store('objusuarios', this.datosuser);
            }
            if (this.loginDataUser.orole.roleDescription === 'Centralizador' || this.loginDataUser.orole.roleId === this.lst_rol_centralizador[2]) {
              this.datosuser = this.sessionStorageService.retrieve('ss_lstPasajeros');
              this.sessionStorageService.store('objusuarios', this.datosuser);
            }
          }
        }
      );
    }
  }

  ValidarDestinos() {
    if (this.model.origentTexto.length < 5) {
      this.model.origentTexto = '';
    }
    if (this.model.destinoTexto.length < 5) {
      this.model.destinoTexto = '';
    }
  }

  validarDataBusqueda() {
    const tipoVuelo = this.tipoVuelo;
    const indexTramo = this.indexTramo;
    let flagVal = true;

    if (tipoVuelo === 'RT') {
      if ($.trim(this.model.origentTexto) === '' || $.trim(this.model.origentTexto) === undefined) {
        $('.input-container input').addClass("quitar-borde");
        $("#txtOrigen").addClass("campo-invalido");
        this.isOpen = true;
        flagVal = false;
      } else {
        this.isOpen = false;
        $("#txtOrigen").removeClass("campo-invalido");
      }
      if ($.trim(this.model.destinoTexto) === '' || $.trim(this.model.destinoTexto) === undefined) {
        $("#txtDestino").addClass("campo-invalido");
        this.valdestino = true;
        flagVal = false;
      } else {
        this.valdestino = false;
        $("#txtDestino").removeClass("campo-invalido");
      }
      if ($.trim(this.fechaSalida) === '') {
        $("#txtFechaSalida").addClass("campo-invalido");
        this.valfechasalida = true;
        flagVal = false;
      } else {
        this.valfechasalida = false;
        $("#txtFechaSalida").removeClass("campo-invalido");
      }
      if ($.trim(this.fechaRetorno) === '') {
        $("#txtFechaDestino").addClass("campo-invalido");
        this.valfechadestino = true;
        flagVal = false;
      } else {
        this.valfechadestino = false;
        $("#txtFechaDestino").removeClass("campo-invalido");
      }
    }

    if (tipoVuelo === 'OW') {
      if ($.trim(this.model.origentTexto) === '' || $.trim(this.model.origentTexto) === undefined) {
        $("#txtOrigen").addClass("campo-invalido");
        this.isOpen = true;
        flagVal = false;
      } else {
        $("#txtOrigen").removeClass("campo-invalido");
      }
      if ($.trim(this.model.destinoTexto) === '' || $.trim(this.model.destinoTexto) === undefined) {
        $("#txtDestino").addClass("campo-invalido");
        this.valdestino = true;
        flagVal = false;
      } else {
        $("#txtDestino").removeClass("campo-invalido");
      }
      if ($.trim(this.fechaSalida) === '') {
        $("#txtFechaSalida").addClass("campo-invalido");
        this.valfechasalida = true;
        flagVal = false;
      } else {
        $("#txtFechaSalida").removeClass("campo-invalido");
      }
    }

    if (tipoVuelo === 'MC') {
      if (indexTramo === 2) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
      }
      if (indexTramo === 3) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen3").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino3").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida3) === '') {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
      }
      if (indexTramo === 4) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen3").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen4").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino3").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino4").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida3) === '') {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida4) === '') {
          $("#txtFechaSalida4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida4").removeClass("campo-invalido");
        }
      }
      if (indexTramo === 5) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen3").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen4").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto5) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen5").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino3").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino4").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto5) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino5").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida3) === '') {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida4) === '') {
          $("#txtFechaSalida4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida4").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida5) === '') {
          $("#txtFechaSalida5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida5").removeClass("campo-invalido");
        }
      }
      if (indexTramo === 6) {
        if ($.trim(this.origenAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen1").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen2").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen3").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen4").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto5) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen5").removeClass("campo-invalido");
        }
        if ($.trim(this.origenAuto6) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtOrigen6").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtOrigen6").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto1) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino1").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto2) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino2").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto3) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino3").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto4) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino4").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto5) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino5").removeClass("campo-invalido");
        }
        if ($.trim(this.destinoAuto6) === '' || $.trim(this.origenAuto1) === undefined) {
          $("#txtDestino6").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtDestino6").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida1) === '') {
          $("#txtFechaSalida1").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida1").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida2) === '') {
          $("#txtFechaSalida2").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida2").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida3) === '') {
          $("#txtFechaSalida3").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida3").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida4) === '') {
          $("#txtFechaSalida4").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida4").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida5) === '') {
          $("#txtFechaSalida5").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida5").removeClass("campo-invalido");
        }
        if ($.trim(this.fechaSalida6) === '') {
          $("#txtFechaSalida6").addClass("campo-invalido");
          flagVal = false;
        } else {
          $("#txtFechaSalida6").removeClass("campo-invalido");
        }
      }
    }

    return flagVal;
  }

  searchFlightBuscador($event) {
    this.searchData = [];
    if ($event === null) {
      this.spinner.hide();
    } else {
      this.searchData = $event;
    }
    this.spin = false;
    this.calendar = false;
    this.flagPseudoRepeat = false;
    this.flagPseudoRepeat = true;
    this.sessionStorageService.store('ss_searchFlight', this.searchData);
    this.inicioBuscador = true;
    if (this.searchData.length === 0) {
      this.flagDinData = true;
      this.spin = true;
      this.spinner.hide();
    } else {
      this.flagDinData = false;
      this.spinner.hide();
      this.setLstAerolineas(this.searchData);
    }
  }

  //TRAMO
  updateIndexTramo($event) {
    this.indexTramo = $event;
  }

  //ORIGEN
  updateOrigenTramoValue1($event) {
    this.origenAuto1 = $event;
    this.origenAuto = $event;
  }
  updateOrigenTramoValue2($event) {
    this.origenAuto2 = $event;
  }
  updateOrigenTramoValue3($event) {
    this.origenAuto3 = $event;
  }
  updateOrigenTramoValue4($event) {
    this.origenAuto4 = $event;
  }
  updateOrigenTramoValue5($event) {
    this.origenAuto5 = $event;
  }
  updateOrigenTramoValue6($event) {
    this.origenAuto6 = $event;
  }

  updateOrigenTramoText1($event) {
    this.origentTexto1 = $event;
    this.origentTexto = $event;
    this.model.origentTexto = $event;
  }
  updateOrigenTramoText2($event) {
    this.origentTexto2 = $event;
  }
  updateOrigenTramoText3($event) {
    this.origentTexto3 = $event;
  }
  updateOrigenTramoText4($event) {
    this.origentTexto4 = $event;
  }
  updateOrigenTramoText5($event) {
    this.origentTexto5 = $event;
  }
  updateOrigenTramoText6($event) {
    this.origentTexto6 = $event;
  }

  //DESTINO
  updateDestinoTramoValue1($event) {
    this.destinoAuto1 = $event;
    this.destinoAuto = $event;
  }
  updateDestinoTramoValue2($event) {
    this.destinoAuto2 = $event;
  }
  updateDestinoTramoValue3($event) {
    this.destinoAuto3 = $event;
  }
  updateDestinoTramoValue4($event) {
    this.destinoAuto4 = $event;
  }
  updateDestinoTramoValue5($event) {
    this.destinoAuto5 = $event;
  }
  updateDestinoTramoValue6($event) {
    this.destinoAuto6 = $event;
    //console.log(this.destinoAuto6);
  }

  updateDestinoTramoText1($event) {
    this.destinoTexto1 = $event;
    this.destinoTexto = $event;
    this.model.destinoTexto = $event;
  }
  updateDestinoTramoText2($event) {
    this.destinoTexto2 = $event;
  }
  updateDestinoTramoText3($event) {
    this.destinoTexto3 = $event;
  }
  updateDestinoTramoText4($event) {
    this.destinoTexto4 = $event;
  }
  updateDestinoTramoText5($event) {
    this.destinoTexto5 = $event;
  }
  updateDestinoTramoText6($event) {
    this.destinoTexto6 = $event;
  }

  updateFechaSalida1($event) {
    this.fechaSalida1 = $event;
    this.fechaSalida = $event;
  }
  updateFechaSalida2($event) {
    this.fechaSalida2 = $event;
  }
  updateFechaSalida3($event) {
    this.fechaSalida3 = $event;
  }
  updateFechaSalida4($event) {
    this.fechaSalida4 = $event;
  }
  updateFechaSalida5($event) {
    this.fechaSalida5 = $event;
  }
  updateFechaSalida6($event) {
    this.fechaSalida6 = $event;
  }

  updateFechaSalidaShow1($event) {
    this.fechaSalidaShow1 = $event;
    this.fechaSalidaShow = $event;
    this.model.salida = $event;
  }
  updateFechaSalidaShow2($event) {
    this.fechaSalidaShow2 = $event;
  }
  updateFechaSalidaShow3($event) {
    this.fechaSalidaShow3 = $event;
  }
  updateFechaSalidaShow4($event) {
    this.fechaSalidaShow4 = $event;
  }
  updateFechaSalidaShow5($event) {
    this.fechaSalidaShow5 = $event;
  }
  updateFechaSalidaShow6($event) {
    this.fechaSalidaShow6 = $event;
  }

  updateCentralizador($event) {
    this.flagCentralizador = $event;
    const lstPasajeros = this.sessionStorageService.retrieve('ss_lstPasajeros');
    this.pasajeros = lstPasajeros.length;

  }

  inicioBuscadorLateral($event) {
    this.inicioBuscador = $event;
  }

  busquedaFiltros($event) {
    this.searchData = [];
    //console.log($event);
    if ($event != null) {
      //  console.log('entro');
      this.searchData = $event;
      /* this.searchData.forEach(function(item) {
         if (item.isVisible === true)
       });*/
      let data = this.searchData.filter(x => x.isVisible === true);
      if (data.length === 0) {
        this.flagDinData2 = true;
      } else {
        this.flagDinData2 = false;
      }
      // this.setLstAerolineas(this.searchData);
      console.log(this.searchData);
    } else {
      this.flagDinData = true;
    }
    const spinner = this.spinner;
    setTimeout(function () {
      spinner.hide();
    }, 500);
  }

  busquedaFiltrosPrecio($event) {
    this.searchData = [];
    if ($event != null) {
      this.searchData = $event;
    }
    const spinner = this.spinner;
    setTimeout(function () {
      spinner.hide();
    }, 500);
  }

  vuelosTurno($event) {
    /*
    this.flagBuscadorLateral = false;
    const dataFilter = $event;
    this.vuelosManiana = dataFilter.soloManiana;
    this.vuelosNoche = dataFilter.soloNoche;
    this.vueloTurnoFiltro = dataFilter.filtroTurnos;
    this.flagBuscadorLateral = true;
    */
  }

  busquedaFiltrosHoras($event) {
    this.searchData = [];
    if ($event != null) {
      this.searchData = $event;
      this.setLstAerolineas(this.searchData);
    }
    const spinner = this.spinner;
    setTimeout(function () {
      spinner.hide();
    }, 500);
  }

  Datafiltrosuperior($event) {
    this.setLstAerolineas($event);
  }

  setOutputTipoVuelo($event) {
    this.tipoVuelo = $event;
    if (this.tipoVuelo != 'RT') {
      this.spin = true;
      this.calendarmini = false;
    } else {
      this.spin = false
      this.calendar = false;
      this.calendarmini = false;
    }
    if (this.searchData.length === 0) {
      this.spin = true;
    }
  }

  setOutIndexTramo($event) {
    this.indexTramo = $event;
  }

  setCalendar($event) {
    this.calendarmini = $event;
    this.calendar = true;
    this.spin = true;
  }

  setLstAerolineas(searchData) {
    this.aerolineas = [];
    let aerolineas = this.aerolineas;
    searchData.forEach(function (reco, indexreco) {
      if (reco.isVisible === true) {
        if (indexreco === 0) {
          const dataAero = {
            carrierId: reco.ocarrier.carrierId,
            carrierName: reco.ocarrier.carrierName,
            filter: 0
          };
          aerolineas.push(dataAero);
        } else {
          let flagAero = 1;
          aerolineas.forEach(function (aerolinea, indexaero) {
            if (aerolinea.carrierId === reco.ocarrier.carrierId) {
              flagAero = 0;
            }
          });
          if (flagAero === 1) {
            const dataAeroN = {
              carrierId: reco.ocarrier.carrierId,
              carrierName: reco.ocarrier.carrierName,
              filter: 0
            };
            aerolineas.push(dataAeroN);
          }
        }
      }
    });
    this.aerolineas = aerolineas;
  }


}
