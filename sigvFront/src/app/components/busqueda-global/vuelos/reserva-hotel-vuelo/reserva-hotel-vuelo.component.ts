import { Component, OnInit, Output, Input, TemplateRef, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { IGetEnhancedHotel } from '../../../../models/IGetEnhancedHotel';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ILoginDatosModel } from 'src/app/models/ILoginDatos.model';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../../../../environments/environment';
import { IGetPnrHotel } from '../../../../models/IGetPnrHotel.model';
import { HotelService } from '../../../../services/hotel.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AirportService } from '../../../../services/airport.service';
import { IGetUserById } from '../../../../models/IGetUserById.model';
import { BnNgIdleService } from 'bn-ng-idle';
import { ModalHotelesVaciosComponent } from '../../../shared/modal-hoteles-vacios/modal-hoteles-vacios.component';
import { ModalCerrarSesionComponent } from '../../../shared/modal-cerrar-sesion/modal-cerrar-sesion.component';
import { ModalSesionExpiradaComponent } from '../../../shared/modal-sesion-expirada/modal-sesion-expirada.component';
import { FlightService } from 'src/app/services/flight.service';
import { IFlightAvailability } from 'src/app/models/IFlightAvailability';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-hotel-vuelo',
  templateUrl: './reserva-hotel-vuelo.component.html',
  styleUrls: ['./reserva-hotel-vuelo.component.sass']
})
export class ReservaHotelVueloComponent implements OnInit, AfterViewInit {

  vuelo: any;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  public text: String;
  datosuser: any;
  tipovuelo: any;
  LSection: any;
  lstbag: any;
  flightAvailability_request: any;
  flightAvailability_result: any;
  hotelSelected: any;
  LPolicies: any;
  ticketresults: any;
  dataflightavalilability: any;
  currency: any;
  pseudo: any;
  gds: any;
  osession: { sessionId: string; securityToken: string; sequenceNumber: string; transactionStatusCode: number; };
  carrierId: any;
  ocompany: any;
  numberpassengers: any;
  flightnational: any;
  Lsectionpassenger: any;
  lsusuario: any;
  contacto: any;
  idprofile: any;
  lsapprover: any;
  idmotivo: string;
  pnrresults: any;
  plantillareserva: string;
  emailreserva: string;

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

  modalref: BsModalRef;

  genero: any;

  lsflightavailability: IFlightAvailability;
  loginDataUser: ILoginDatosModel;
  habitacion: IHabitacionResults;
  lstConfirmacion: any;
  Reserva: IGetPnrHotel;
  user;
  modalRefSessionExpired: BsModalRef;

  emailsolicitud;
  lsthabitacion;
  numeroTarjeta;
  fechVencimiento;
  codSeguridad;
  titular;
  telefono;
  correo;
  nombreTarjeta;
  plantilla;

  telefonoContacto;
  correoContacto;
  nombreContacto;
  areaContacto;
  isOpen = false;
  lhotel;
  counter;

  opentarjeta = true;
  police: any;
  amenities: any;



  constructor(private eRef: ElementRef, private localStorageService: LocalStorageService,
    private bnIdle: BnNgIdleService, private toastr: ToastrService,
    private http: HttpClient, private router: Router,
    private sessionStorageService: SessionStorageService,
    private spinner: NgxSpinnerService, private service: HotelService,
    private serviceVuelo: AirportService, private modalService: BsModalService, private services: AirportService) {
    this.lstConfirmacion = this.sessionStorageService.retrieve("confirmacion");
    this.lsthabitacion = this.sessionStorageService.retrieve("lstHabication");
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.vuelo = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.user = this.sessionStorageService.retrieve("ss_user");
    this.datosuser = sessionStorageService.retrieve('objusuarios');
    this.counter = this.localStorageService.retrieve("ss_countersession");
    this.plantilla = 'assets/plantillashoteles/enviocorreo.html';
    this.plantillareserva = 'assets/plantillasEmail/plantillareservagenerada.html';
    for (let index = 0; index < this.lsthabitacion.lroom.length; index++) {
      if (this.lstConfirmacion.oroom.bookingCode === this.lsthabitacion.lroom[index].bookingCode) {
        const element = this.lsthabitacion.lroom[index];
        //this.amenities = element.lamenities;
        this.police = element.lpolicies;
        this.sessionStorageService.store("ss_roompolicy", this.police);
      }
    }
  }

  ngOnInit() {
    $('.x').hide();
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
    this.bloquearBotonAtras();
    this.Obtenerstring();
    this.initFligth();
  }

  initFligth() {
    this.flightAvailability_result = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.dataflightavalilability = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.idmotivo = this.sessionStorageService.retrieve('idmotivo');
    this.LSection = this.vuelo.Lsections;
    this.tipovuelo = this.sessionStorageService.retrieve('tipovuelo');
    this.LPolicies = this.flightAvailability_result.lpolicies;
    this.hotelSelected = this.sessionStorageService.retrieve('confirmacion');
    this.lhotel = this.sessionStorageService.retrieve('lhotel');
    console.log(this.flightAvailability_result.lsapprover);
    if (this.sessionStorageService.retrieve('lsapprover') === null) {
      this.lsapprover = [];
    } else {
      this.lsapprover = this.sessionStorageService.retrieve('lsapprover');
    }
    if (this.sessionStorageService.retrieve('politicas') === null) {
      this.LPolicies = [];
    } else {
      this.LPolicies = this.sessionStorageService.retrieve('politicas');
    }
    this.lsusuario = this.sessionStorageService.retrieve('datosusuario');
    this.Lsectionpassenger = this.sessionStorageService.retrieve('sectionservice');
    this.lstbag = this.flightAvailability_result.lsectionBaggages;
    this.currency = this.dataflightavalilability.Currency;
    this.contacto = this.sessionStorageService.retrieve('contacto');
    this.pseudo = this.dataflightavalilability.Pseudo;
    this.gds = this.dataflightavalilability.Gds;
    this.osession = this.lsflightavailability.osession;
    this.carrierId = this.dataflightavalilability.CarrierId;
    this.idprofile = this.sessionStorageService.retrieve('idprofile');
    this.ocompany = this.dataflightavalilability.Ocompany;
    this.numberpassengers = this.dataflightavalilability.NumberPassengers;
    this.flightnational = this.dataflightavalilability.FlightNational;
    this.sessionStorageService.store('count', false);
  }

  VolverHome() {
    this.router.navigate(['vuelo']);
  }

  ngAfterViewInit() {
    $('.x').hide();
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
    if (this.counter === false) {
      this.modalRefSessionExpired = this.modalService.show(ModalSesionExpiradaComponent, this.config);
    }
  }

  bloquearBotonAtras() {
    history.pushState(null, null, location.href);
    // tslint:disable-next-line: only-arrow-functions
    window.onpopstate = function() {
      history.go(1);
    };
  }

  buyPackage() {
    console.log('22222222222222222222222')
      if (this.numeroTarjeta ) {
      if ( this.numeroTarjeta.length === 19 && this.codSeguridad.length === 3 && this.fechVencimiento.length === 4) {
      this.isOpen = !this.isOpen;
      this.getPnrHotel();
      }
    }
  }

  getPnrHotel() {
    this.spinner.show();
    let message;
    let cumple;
    let listaAme;
    this.telefono = this.sessionStorageService.retrieve('objusuarios')[0].phone;
    let correo = this.sessionStorageService.retrieve('objusuarios')[0].email;
    cumple = this.user.birthDate;
    cumple = cumple.substring(0, 10);
    cumple = cumple.replace(/-/gi, "/");
    const val = this.ValidarCampos();
    
    const valcorreo = this.ValidarCorreo();
    if (1) {
      let tipoPago;
      let amenities = [];
      let listaroom = this.lsthabitacion.lroom.length;
      for (let index = 0; index < this.lsthabitacion.lroom.length; index++) {
        if (this.lstConfirmacion.oroom.bookingCode === this.lsthabitacion.lroom[index].bookingCode) {
          const element = this.lsthabitacion.lroom[index];
          listaAme = element.lamenities;
        }
      }
      this.amenities = listaAme;
      let phone = [this.telefono];
      phone.push();
      let email = [correo];
      email.push();
      this.spinner.show();
      if (this.user.gender === 'F') {
        this.genero = "MRS";
      } else {
        this.genero = "MR";
      }
      let data = {
        "UserId": this.loginDataUser.userId,
        "Pseudo": "LIMPE2235",
        "GDS": "Amadeus",
        "Ocompany": this.loginDataUser.ocompany,
        "osession": this.lstConfirmacion.osession,
        "Phones": phone,
        "Emails": email,
        "LPassenger":
          [
            {
              "UserId": this.user.userId,
              "PassengerId": 1,
              "PersonId": this.user.personId,
              "Prefix": this.genero,
              "Type": "ADT",
              "Name": this.loginDataUser.userName,
              "LastName": this.loginDataUser.userLastName,
              "Gender": this.user.gender,
              "BirthDate": cumple,
              "IsVIP": this.user.isVIP,
              "Odocument":
              {
                "Type": 'NI',
                "Number": this.user.lpersonDocuments[0].docNumber
              }
            }
          ],
        "StartDate": this.lsthabitacion.ohotel.startDate,
        "EndDate": this.lsthabitacion.ohotel.endDate,
        "NumberPassengers": this.lsthabitacion.ohotel.lguestPerRoom[0].numberPassengers,
        "OHotel": {
          "CityCode": this.lstConfirmacion.ohotel.cityCode,
          "Hotelcode": this.lstConfirmacion.ohotel.code,
          "HotelName": this.lstConfirmacion.ohotel.name,
          "Latitude": this.lhotel.oposition.latitude,
          "Longitude": this.lhotel.oposition.longitude,
          "Starts": this.lhotel.stars,
          "Lamenities": this.lhotel.lamenities,
          "TypeDistance": this.lhotel.oairportDistance.type,
          "Distance": this.lhotel.oairportDistance.distance,
          "Address": this.lsthabitacion.ohotel.address,
          "Limagens": this.lsthabitacion.ohotel.limagens,
        },
        "ORoom": {
          "Name": this.lstConfirmacion.oroom.name,
          "Description": this.lstConfirmacion.oroom.description,
          "GuaranteeText": this.lstConfirmacion.oroom.guarantee,
          "NumberNights": this.lhotel.numberNights,
          "CheckIn": this.lsthabitacion.ohotel.checkIn,
          "CheckOut": this.lsthabitacion.ohotel.checkOut,
          "BookingCode": this.lstConfirmacion.oroom.bookingCode,
          "CorporateCode": this.lstConfirmacion.ohotel.chainCode,
          "Lamenities": this.amenities,
        },
        "LcancelPenalties": this.lstConfirmacion.oroom.lcancelPenalties,
        "OcreditCard":
        {
          "CardType": this.nombreTarjeta,
          "CardNumber": this.numeroTarjeta,
          "SecurityId": this.codSeguridad,
          "ExpiryDate": this.fechVencimiento,
          "HolderName": this.titular
        },
        "OInformationContact":
        {
          "Name": this.nombreContacto,
          "EmailAddress": this.correoContacto,
          "Numberphone": this.telefonoContacto
        }
      }

      this.service.GetReserva(data).subscribe(
        data => {
          let template: TemplateRef<any>;
          this.Reserva = data;
          this.sessionStorageService.store('datapnrHotel', data);
          this.sessionStorageService.store("reserva", this.Reserva);
          message = this.Reserva.oerror;
        },
        err => {
          this.spinner.hide();
        },
        () => {
          // if (message != null || this.Reserva === null) {
          //   this.modalRefSessionExpired = this.modalService.show(ModalHotelesVaciosComponent)
          this.reservaVuelo();
          //   this.spinner.hide();
          //   return;
          // }
          // else {
          //   alert('asdasd')
          //   this.SendMailHotelAprobado();
          // }
        }
      )
    }
  }

  reservaVueloOLD() {
    this.spinner.show();
    var reason = this.sessionStorageService.retrieve('reason') ? this.sessionStorageService.retrieve('reason') : '';
    let idinterval = this.sessionStorageService.retrieve('idinterval');
    let phones = [];
    let email = [];
    let extraprofile = false;
    let infraction = true;
    let amount;
    let porcentaje;
    if (this.lsflightavailability.odiscount != null) {
      amount = this.lsflightavailability.odiscount.amount;
      porcentaje = this.lsflightavailability.odiscount.percentage;
    } else {
      amount = 0;
      porcentaje = 0;
    }
    let data = {
      "UserId": this.loginDataUser.userId,
      "GDS": this.gds,
      "Pseudo": this.pseudo,
      "FlightNational": this.flightnational,
      "Infraction": infraction,
      "Lsections": this.Lsectionpassenger,
      "Ocompany": this.ocompany,
      "osession": this.osession,
      "Lpassenger": this.lsusuario,
      "ReasonFlightId": parseFloat(this.idmotivo),
      "ExtraReason": reason,
      "CarrierId": this.carrierId,
      "Lpolicies": this.LPolicies,
      "LcompanyUIDs": [],
      "OContactInfo": this.contacto,
      "ExtraProfile": extraprofile,
      "ProfileName": this.idprofile,
      "FareTaxAmountByPassenger": this.lsflightavailability.fareAmountByPassenger,
      "TotalFareAmount": this.lsflightavailability.totalFareAmount,
      "Currency": this.lsflightavailability.currency,
      "NumberPassengers": this.dataflightavalilability.NumberPassengers,
      "RecommendationId": this.dataflightavalilability.RecommendationId,
      "Comment": "Reserva de emision",
      "Lauthorizer": this.lsapprover,
      "TypeFlight": this.tipovuelo,
      "TotalDiscount": amount,
      "PercentageDiscount": porcentaje,
      "Ltaxes": this.lsflightavailability.ltaxes
    };
    this.serviceVuelo.GenerateTicket(data).subscribe(
      results => {
        this.ticketresults = results;
        this.sessionStorageService.store('dataticket', this.ticketresults);
        if (this.ticketresults.oerror === null) {
          clearInterval(idinterval);
        }
        if (this.ticketresults.oerror === null) {
          // se debe llamar a add pasanger?
          this.router.navigate(['/reserva-generada-vuelo-hotel']);
        }
      },
      err => {
        this.spinner.hide();
        // alert('ERROR');
        // this.router.navigate(['/reserva-generada-vuelo-hotel']);
        // this.modalRefSessionExpired = this.modalService.show(ModalHotelesVaciosComponent);
      },
      () => {
        this.spinner.hide();
      }
    )
  }


  ObtenerstringReserva() {
    this.http.get(this.plantillareserva, { responseType: 'text' }).subscribe(
      data => {
        this.emailreserva = data;
      },
      err => {
      }
    )
  }

  reservaVuelo() {
    this.spinner.show();
    var reason = this.sessionStorageService.retrieve('reason');
    let phones = [];
    let email = [];
    let amount;
    let porcentaje;
    let infraction;
    let extraprofile;
    if (this.LPolicies.length > 0) {
      infraction = true;
    } else {
      infraction = false;
    }
    if (this.idprofile != null) {
      extraprofile = true;
    } else {
      extraprofile = false;
    }
    this.Obtenerstring();
    this.ObtenerstringReserva();
    if (this.lsflightavailability.odiscount != null) {
      amount = this.lsflightavailability.odiscount.amount;
      porcentaje = this.lsflightavailability.odiscount.percentage;
    } else {
      amount = 0;
      porcentaje = 0;
    }
    let idinterval = this.sessionStorageService.retrieve('idinterval');
    let data = {
      "UserId": this.loginDataUser.userId,
      "GDS": this.gds,
      "Pseudo": this.pseudo,
      "FlightNational": this.flightnational,
      "Infraction": infraction,
      "Lsections": this.Lsectionpassenger,
      "Ocompany": this.ocompany,
      "osession": this.osession,
      "Lpassenger": this.lsusuario,
      "ReasonFlightId": parseFloat(this.idmotivo),
      "ExtraReason": reason,
      "CarrierId": this.carrierId,
      "Lpolicies": this.LPolicies,
      "Lauthorizer": this.lsapprover,
      "ExtraProfile": extraprofile,
      "ProfileName": this.idprofile,
      "Comment": $('#motivoviaje').val() ? $('#motivoviaje').val() : '',
      "OContactInfo": this.contacto,
      "FareTaxAmountByPassenger": this.lsflightavailability.fareAmountByPassenger,
      "TotalFareAmount": this.lsflightavailability.totalFareAmount,
      "Currency": this.lsflightavailability.currency,
      "NumberPassengers": this.dataflightavalilability.NumberPassengers,
      "RecommendationId": this.dataflightavalilability.RecommendationId,
      "TypeFlight": this.tipovuelo,
      "TotalDiscount": amount,
      "PercentageDiscount": porcentaje,
      "Ltaxes": this.lsflightavailability.ltaxes
    };
    this.spinner.show();
    this.serviceVuelo.AddPassenger(data).subscribe(
      results => {
        this.pnrresults = results;
        if (this.pnrresults.pnr != null) {
          clearInterval(idinterval);
        }
        // if (this.loginDataUser.orole.roleDescription === 'Autorizador' && this.lsapprover.length === 0 && this.LPolicies.length > 0 || this.loginDataUser.orole.roleDescription === 'Autorizador' && this.lsapprover.length === 0 && this.LPolicies.length === 0) {
          
        // }
        this.router.navigate(['/reserva-generada-vuelo-hotel']);
        // this.sessionStorageService.store('datapnr', this.pnrresults);
        this.sessionStorageService.store('datapnrVuelo', results );
      },
      err => {
        this.spinner.hide();
        // this.modalerror = this.modalservice.show(ModalErrorServiceComponent, this.config);
        // alert('ERROR');
      },
      () => {
        if (this.lsapprover.length > 0 && this.pnrresults.oerror === null) {
          // this.SendEmail();
        }
        if (this.lsapprover.length === 0 && this.pnrresults.oerror === null) {
          // this.SendEmailReservaGenerada();
        }
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalref = this.modalService.show(this.Reserva.oerror.message);
  }

  Obtenerstring() {
    this.http.get(this.plantilla, { responseType: 'text' }).subscribe(
      data => {
        this.emailsolicitud = data;
      },
      err => {
      }
    )
  }

  SendMailHotelAprobado() {
    this.spinner.show();
    this.getAmenities();

    let mails = [];

    this.Reserva.email.forEach(function (item) {
      mails.push(item);
    });



    let data = {
      "AgencyId": "305E642B-6643-410C-98E9-6E0F4BBAB785",
      "Recipients": mails,
      "RecipientsCopy": ['analista6@domiruth.com'],
      "RecipientsHiddenCopy": [],
      "Subject": "HOTEL APROBADO",
      "Message": this.emailsolicitud
    }
    this.services.SendEmail(data).subscribe(
      results => {
        if (results === true) {
          this.toastr.success('', 'Se envio correctamente a su correo electrónico.', {
            timeOut: 3000
          });
        } else {
          this.toastr.error('', 'Error al envio de correo electrónico.', {
            timeOut: 3000
          });
        }
      },
      err => {

      },
      () => {
        this.spinner.hide();
        this.router.navigate(['/reserva-generada-hotel']);
      }
    );
  }

  getAmenities() {
    let imgNotFound = './assets/images/imagenotfound.jfif'
    let html = '';
    let SinInfo = '';
    let amenities: any;
    let htmlGlobal = '';
    amenities = this.lsthabitacion.ohotel.lamenities
    if (amenities != null) {
      for (let i = 0; i < amenities.length; i++) {
        const element = amenities[i];
        html += "<div style='width: 20%;'>";
        html += "<img style='width: 30px;' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/";
        html += element.code
        html += ".png'>";
        html += "<label style='color: #676767; font-family: Arial, Helvetica, sans-serif; font-size: 14px; opacity: 1; letter-spacing: 0;'>";
        html += element.description
        html += "</label>";
        html += "</div>";
      }
      htmlGlobal = html;
    }
    if (htmlGlobal != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@amenities', htmlGlobal);
    }
    SinInfo = "Sin Información";
    if (this.Reserva.oitineraryInfos.priceTotal != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@priceTotal', this.Reserva.oitineraryInfos.priceTotal);
    }
    if (this.Reserva.pnr != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@pnr', this.Reserva.pnr);
    }
    if (this.Reserva.lpassengers[0].codeConfirmation != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@confirmacion', this.Reserva.lpassengers[0].codeConfirmation);
    }
    if (this.lsthabitacion.ohotel.numberNights != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@numeronoches', this.lsthabitacion.ohotel.numberNights);
    }
    if (this.lsthabitacion.ohotel.lguestPerRoom[0].numberPassengers != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@numeropersonas', this.lsthabitacion.ohotel.lguestPerRoom[0].numberPassengers);
    }
    if (this.Reserva.oitineraryInfos.descriptionRoom != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@descripcionHabitacion', this.Reserva.oitineraryInfos.descriptionRoom);
    }
    if (this.lstConfirmacion.oroom.startDate != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@fechaentrada', this.lstConfirmacion.oroom.startDate);
    }
    if (this.lstConfirmacion.oroom.endDate != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@fechasalida', this.lstConfirmacion.oroom.endDate);
    }
    if (this.lsthabitacion.ohotel.checkIn != null && this.lsthabitacion.ohotel.checkIn != '') {
      this.emailsolicitud = this.emailsolicitud.replace('@checkin', this.lsthabitacion.ohotel.checkIn);
    } else {
      this.emailsolicitud = this.emailsolicitud.replace('@checkin', SinInfo);
    }
    if (this.lsthabitacion.ohotel.checkOut != null && this.lsthabitacion.ohotel.checkOut != '') {
      this.emailsolicitud = this.emailsolicitud.replace('@checkout', this.lsthabitacion.ohotel.checkOut);
    } else {
      this.emailsolicitud = this.emailsolicitud.replace('@checkout', SinInfo);
    }
    if (this.Reserva.oitineraryInfos.penality != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@politicacancelacion', this.Reserva.oitineraryInfos.penality);
    }
    if (this.Reserva.lpassengers[0].name != null || this.Reserva.lpassengers[0].lastName != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@nombreusuario', this.Reserva.lpassengers[0].name + this.Reserva.lpassengers[0].lastName);
    }
    if (this.Reserva.numberPhone != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@telefono', this.Reserva.numberPhone);
    }
    if (this.lsthabitacion.ohotel.limagens != null && this.lsthabitacion.ohotel.limagens.length > 0) {
      this.emailsolicitud = this.emailsolicitud.replace('@imagen', this.lsthabitacion.ohotel.limagens[0].url)
    }
    else {
      this.emailsolicitud = this.emailsolicitud.replace('@imagen', imgNotFound);
    }
  }





  setNumTarjeta($event) {
    this.numeroTarjeta = $event;
  }

  setNombreTarjeta($event) {
    this.nombreTarjeta = $event;
  }

  setFechVencimiento($event) {
    this.fechVencimiento = $event;
  }

  setCodSeguridad($event) {
    this.codSeguridad = $event;
  }

  setTitular($event) {
    this.titular = $event;
  }

  setTelefono($event) {
    this.telefono = $event;
  }

  setCorreo($event) {
    this.correo = $event;
  }


  setCorreoContacto($event) {
    this.correoContacto = $event;
  }

  setTelefonoContacto($event) {
    this.telefonoContacto = $event;
  }

  setNombreContacto($event) {
    this.nombreContacto = $event;
  }

  setAreaContacto($event) {
    this.areaContacto = $event;
  }

  ValidarCorreo() {
    let val;
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test($('#correo').val())) {
      if (regex.test($('#correo').val().trim())) {
        val = true;
      } else {
        val = false;
      }
    }
    return val;
  }

  ValidarCampos() {
    let val = true;
    let correo;
    correo = $("#correoTitu").val();

    if (this.lstConfirmacion.ohotel.typeHotel === 'Value Hotel') {
      if ($('#correo').val().length <= 0) {
        $('#correo').addClass('campo-invalido');
      } else {
        $('#correo').removeClass('campo-invalido');
      }
      if ($('#correoTitu').val().length <= 0) {
        val = false;
        $('#correoTitu').addClass('campo-invalido');
        this.isOpen = true;
      } else {
        $('#correoTitu').removeClass('campo-invalido');
        this.isOpen = false;
      }
      if ($('#fonoTitu').val().length <= 0) {
        $('#fonoTitu').addClass('campo-invalido');
        val = false;
      } else {
        $('#fonoTitu').removeClass('campo-invalido');
      }


      if ($('#nombre').val().length <= 0) {
        $('#nombre').addClass('campo-invalido');
        val = false;
      } else {
        $('#nombre').removeClass('campo-invalido');
      }
      if ($('#correo').val().length <= 0) {
        $('#correo').addClass('campo-invalido');
        val = false;
      } else {
        $('#correo').removeClass('campo-invalido');
      }
      if ($('#numero').val().length <= 0) {
        $('#numero').addClass('campo-invalido');
        val = false;
      } else {
        $('#numero').removeClass('campo-invalido');
      }
    } else {
      if ($('#correo').val() == '' || $('#correo').val() === null) {
        $('#correo').addClass('campo-invalido');
      } else {
        $('#correo').removeClass('campo-invalido');
      }
      if ($('#correoTitu').val() == '' || $('#correoTitu').val() === null) {
        val = false;
        $('#correoTitu').addClass('campo-invalido');
        this.isOpen = true;
      } else {
        $('#correoTitu').removeClass('campo-invalido');
        this.isOpen = false;
      }
      if ($('#fonoTitu').val() == '' || $('#fonoTitu').val() === null) {
        $('#fonoTitu').addClass('campo-invalido');
        val = false;
      } else {
        $('#fonoTitu').removeClass('campo-invalido');
      }
      if ($('#nombre').val() == '' || $('#nombre').val() === null) {
        $('#nombre').addClass('campo-invalido');
        val = false;
      } else {
        $('#nombre').removeClass('campo-invalido');
      }
      if ($('#correo').val() == '' || $('#correo').val() === null) {
        $('#correo').addClass('campo-invalido');
        val = false;
      } else {
        $('#correo').removeClass('campo-invalido');
      }
      if ($('#numero').val() == '' || $('#numero').val() === null) {
        $('#numero').addClass('campo-invalido');
        val = false;
      } else {
        $('#numero').removeClass('campo-invalido');
      }

      if ($('#numeroTarjeta').val().length <= 0) {
        $('#numeroTarjeta').addClass('campo-invalido');
        this.sessionStorageService.store("ss_tarjeta", this.opentarjeta);
        val = false;
      } else {
        $('#numeroTarjeta').removeClass('campo-invalido');
        this.sessionStorageService.store("ss_tarjeta", false);
      }

      if ($('#fechaVencimiento').val().length <= 0) {
        $('#fechaVencimiento').addClass('campo-invalido');
        val = false;
      } else {
        $('#fechaVencimiento').removeClass('campo-invalido');
      }
      if ($('#codSeguridad').val().length <= 0) {
        $('#codSeguridad').addClass('campo-invalido');
        val = false;
      } else {
        $('#codSeguridad').removeClass('campo-invalido');
      }
      if ($('#titularTarjeta').val().length <= 0) {
        $('#titularTarjeta').addClass('campo-invalido');
        val = false;
      } else {
        $('#titularTarjeta').removeClass('campo-invalido');
      }
    }




    return val;
  }


}
