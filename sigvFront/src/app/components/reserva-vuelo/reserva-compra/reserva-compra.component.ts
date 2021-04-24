import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { AirportService } from '../../../services/airport.service';
import { IFlightAvailability } from '../../../models/IFlightAvailability';
import { IDatosUser } from '../../../models/IDatosUser';
import { IAddPassenger } from '../../../models/IAddPassenger.model';
import { IPnrConfirm } from '../../../models/IPnrConfirm.model';
import { IGetApprovers } from '../../../models/IGetApprovers.model';
import { Router } from '@angular/router';
import { IGenerateTicket } from '../../../models/IGenerateTicket.model';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { BnNgIdleService } from 'bn-ng-idle';
import { SafeHtml } from '@angular/platform-browser';
import { ModalErrorServiceComponent } from '../../shared/modal-error-service/modal-error-service.component';
import { NullTemplateVisitor } from '@angular/compiler';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-compra',
  templateUrl: './reserva-compra.component.html',
  styleUrls: ['./reserva-compra.component.sass']
})
export class ReservaCompraComponent implements OnInit, AfterViewInit {

  @ViewChild(ModalDirective, { static: false }) modal: ModalDirective;
  Lsection;
  Lsectionpassenger;
  lsusuario;
  lsflightavailability: any;
  LPolicies;
  dataflightavalilability;
  osession;
  mensajeDuplicate;
  carrierId;
  gds;
  pseudo;
  ocompany;
  numberpassengers;
  lusers;
  email;
  phone;
  osessionpnr;
  pnrresults: any;
  userid;
  currency;
  lsapprover: any[] = [];
  flightnational;
  idmotivo;
  plantilla;
  ticketresults: IGenerateTicket;
  emailsolicitud;
  htmlvuelosection;
  htmlpreciofinal;
  htmlpasajeros;
  htmlpoliticas;
  nuevohtml;
  fechatimelimit;
  horatimelimit;
  loginDataUser;
  contacto;
  plantillareserva;
  emailreserva;
  fechaexpiracion;
  fechacreacion;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  tipovuelo;
  blockflight;
  modalerror: BsModalRef;
  idprofile;
  LcompanyUIDs;

  constructor(private sessionStorageService: SessionStorageService,
    private service: AirportService, private router: Router, private http: HttpClient, public spinner: NgxSpinnerService,
    private toastr: ToastrService, private modalservice: BsModalService, private bnIdle: BnNgIdleService) {
    this.Lsection = this.sessionStorageService.retrieve('sectioninfo');

    this.Lsectionpassenger = this.sessionStorageService.retrieve('sectionservice');
    this.lsusuario = this.sessionStorageService.retrieve('datosusuario');
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
    this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.dataflightavalilability = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.lusers = this.sessionStorageService.retrieve('objusuarios');
    this.idmotivo = this.sessionStorageService.retrieve('idmotivo');
    
    this.plantilla = 'assets/plantillasEmail/plantillaaprobacion.html';
    this.plantillareserva = 'assets/plantillasEmail/plantillareservagenerada.html';
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.contacto = this.sessionStorageService.retrieve('contacto');
    this.tipovuelo = this.sessionStorageService.retrieve('tipovuelo');
    this.blockflight = this.loginDataUser.ocompany.ocompanyConfiguration.blockFlight;
    this.idprofile = this.sessionStorageService.retrieve('idprofile');
    this.LcompanyUIDs = this.sessionStorageService.retrieve('ss_LcompanyUIDs');
  }

  /*
 VolverHome() {
   this.router.navigate(['/vuelos']);
   this.modal.hide();
 }*/

  ngOnInit() {
    //this.bloquearBotonAtras();
    window.scrollTo(0, 0);
    this.currency = this.dataflightavalilability.Currency;
    this.pseudo = this.dataflightavalilability.Pseudo;
    this.gds = this.dataflightavalilability.GDS;
    this.osession = this.lsflightavailability.osession;
    this.carrierId = this.dataflightavalilability.CarrierId;
    this.ocompany = this.dataflightavalilability.Ocompany;
    this.numberpassengers = this.dataflightavalilability.NumberPassengers;
    this.flightnational = this.dataflightavalilability.FlightNational;
    this.sessionStorageService.store('count', false);
  }

  ngAfterViewInit() {
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

  ObtenerstringReserva() {
    this.http.get(this.plantillareserva, { responseType: 'text' }).subscribe(
      data => {
        this.emailreserva = data;
      },
      err => {
      }
    )
  }

  bloquearBotonAtras() {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  AddPassenger(template, template3) {

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
    let moti = this.sessionStorageService.retrieve("ss_motivo");
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
    let requestFlight = this.sessionStorageService.retrieve('ss_flightavailability_request2');
    let priceRq = this.sessionStorageService.retrieve('ss_flightavailability_result');
    let motivo = $('#cbomotivo').val()
    const price = {
      Currency: priceRq.oprice.currency,
      BaseAmount: priceRq.oprice.baseAmount,
      TotalTaxAmount: priceRq.oprice.totalTaxAmount,
      TotalAmount: priceRq.oprice.totalAmount,
      OdiscountPrice: priceRq.oprice.odiscountPrice
    }
    let data = {
      "GDS": this.gds,
      "Pseudo": this.pseudo,
      "TypeSearch": 'C',
      "UserId": this.loginDataUser.userId,
      "ReasonFlightId": parseFloat(this.idmotivo),
      "ReasonFlight": moti,
      "ExtraReason": reason,
      "FlightNational": this.flightnational,
      "TypeFlight": this.tipovuelo,
      "ExtraProfile": extraprofile,
      "ProfileName": this.idprofile,
      "Comment": $('#motivoviaje').val(),
      "Emission": false,
      "Ocarrier": requestFlight.Ocarrier,
      "LpseudoRepeats": requestFlight.LpseudoRepeats,
      "Oprice": price,
      "Lpassengers": this.lsusuario,
      "Lsections": requestFlight.Lsections,
      "OContactInfo": this.contacto,
      "Lapprovers": priceRq.lapprovers,
      "Lpolicies": this.LPolicies,
      "LcompanyUIDs": this.LcompanyUIDs,
      "osession": this.osession,
      "Ocompany": this.ocompany,
      "Oagency": this.loginDataUser.oagency
    };
    this.spinner.show();
    let datos = this.sessionStorageService.retrieve('ss_duplicatePNR');
    this.service.DuplicatePnr(datos).subscribe(
      x => {
        this.mensajeDuplicate = x;
        if (x.length === 0 || x.length === []) {
          this.service.AddPassenger(data).subscribe(
            results => {
              // tslint:disable-next-line: indent
              this.pnrresults = results;
              if (this.pnrresults.pnr != null) {
                clearInterval(idinterval);
              }
              /*    if (this.loginDataUser.orole.roleDescription === 'Autorizador' && this.lsapprover.length === 0 && this.LPolicies.length > 0 || this.loginDataUser.orole.roleDescription === 'Autorizador' && this.lsapprover.length === 0 && this.LPolicies.length === 0) {
                    this.router.navigate(['/reserva-generada-vuelo']);
                  }*/
              this.sessionStorageService.store('datapnr', this.pnrresults);
            },
            err => {
              this.spinner.hide();
              this.modalerror = this.modalservice.show(ModalErrorServiceComponent, this.config);
            },
            () => {
              if (this.lsapprover.length > 0 && this.pnrresults.ostatus.status === 200) {
                this.SendEmail();
              }
              if (this.lsapprover.length === 0 && this.pnrresults.ostatus.status === 200) {
                this.SendEmailReservaGenerada();
              }
              if (this.pnrresults.ostatus.status != 200) {
                this.spinner.hide();
                this.modalRef = this.modalservice.show(
                  template,
                  Object.assign({}, { class: 'gray modal-lg m-infraccion' })
                );
              }
            }
          );

        } else {
          this.spinner.hide();
          this.modalRef = this.modalservice.show(
            template3,
            Object.assign({}, { class: 'gray modal-lg m-infraccion' })
          );
        }
      }
    )


  }


  PlantillaEmailSolicitud() {
    let htmlsection = '';

    for (let i = 0; i < this.Lsection.length; i++) {
      const section = this.Lsection[i];
      const lsegment = section.oschedule.lsegments;

      for (let k = 0; k < lsegment.length; k++) {
        const itemlsegment = lsegment[k];
        const segmentgroup = itemlsegment.LsegmentGroups;

        for (let j = 0; j < lsegment.length; j++) {
          const itemsegmentgroup = lsegment[j];
          htmlsection += "<div class='row' style='padding-bottom:20px; padding-top:10px;'>";
          htmlsection += "<div style='width: 100%; border-radius: 20px 20px 20px 20px; background: white; padding: 1em; border: 1px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5);'>";

          if (itemsegmentgroup.fareFamilyName !== '') {
            htmlsection += "<div class='row'>";
            htmlsection += "<div style='width: 100% !important'>";
            htmlsection += "<span style='background: #FFCD01; color: #FFFFFF; font-size: 17px;border-radius: 5px;border: 1px solid #8A7979; width: 250px;display: block;text-align: center;'>";
            htmlsection += itemsegmentgroup.fareFamilyName;
            htmlsection += "</span>";
            htmlsection += "</div>";
            htmlsection += "</div>";
          }
          htmlsection += "<div class='row' style='border-bottom: 1px solid #cccccc; padding-bottom: 20px; padding-top: 30px;'>";
          htmlsection += "<div style='width: 50%;'>";
          htmlsection += "<div style='width: 100% !important'>";
          htmlsection += "<img style='width: 150px; position: relative;left: 36px;top: 21px;' class='m-0 p-0' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/airlines/";
          htmlsection += itemsegmentgroup.ocarrier.carrierId + ".png'>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 100% !important;'>";
          htmlsection += "<span style='color: #676767; font-size: 9px; opacity: 100%;'>Aerolinea Operadora :";
          htmlsection += itemsegmentgroup.ocarrier.carrierName;
          htmlsection += "</span>";
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "<div style='text-align: center; padding-top: 20px;padding-left: 11%;'>";
          htmlsection += "<label style='color: #676767; font-size: 14px; opacity: 100%; width: 40%;'>Vuelo ";
          htmlsection += itemsegmentgroup.flightNumber;
          htmlsection += " - Tipo de avion - ";
          htmlsection += itemsegmentgroup.equipmentType;
          htmlsection += "</label>";
          htmlsection += "</div>";
          htmlsection += "</div>";

          htmlsection += "<div class='row' style='padding-top: 40px; padding-bottom: 30px;'>";
          htmlsection += "<div style='width: 40%; text-align: center;'>";
          htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
          htmlsection += itemsegmentgroup.departureDateShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.departureTimeShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.oorigin.iataCode;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.oorigin.cityName;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.oorigin.airportName;
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 20%; padding-left: 40px; padding-top: 30px; text-align: center;'>";
          htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
          htmlsection += "Duracion";
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 11px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.totalFlightTimeShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 14px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += "Clase: <label class='m-0 p-0 pl-3' style='color: #898989; font-size: 9px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.cabinDescription + " - " + itemsegmentgroup.classId;
          htmlsection += "</label>";
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 40%; padding-left: 50px; text-align: center;'>";
          htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
          htmlsection += itemsegmentgroup.arrivalDateShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.arrivalTimeShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.odestination.iataCode;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.odestination.cityName;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.odestination.airportName;
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "</div>";
        }
      }
    }
    this.htmlvuelosection = htmlsection;

    this.emailsolicitud = this.emailsolicitud.replace("@segmentos", this.htmlvuelosection);
  }

  PlantillaPreciovuelo() {
    let html = '';
    if (this.lsflightavailability.oprice.odiscountPrice != null && this.lsflightavailability.oprice.odiscountPrice.discountAmount != 0) {
      html += "<div style='width: 100%; text-align: rigth'>";
      html += "<span style='font-size: 13px;color: #676767; margin-left: 7px;'>Monto de desc.</span>";
      html += "<span style=' font-size: 13px;color: #6B253C; margin-left: 25px;'>";
      html += this.lsflightavailability.currency;
      html += "</span>";
      html += "<span style='color: #898989; font-size: 13px;'>";
      html += this.lsflightavailability.odiscount.amount;
      html += "</span>";
      html += "</div>";
    }

    let htmlporcentaje = '';
    if (this.lsflightavailability.oprice.odiscountPrice != null && this.lsflightavailability.oprice.odiscountPrice.discountPercentage) {
      htmlporcentaje += "<div style='width: 100%; text-align: rigth'>";
      htmlporcentaje += "<span style='font-size: 13px;color: #676767'>Porcentaje de desc.</span>";
      htmlporcentaje += "<span style='color: #898989; font-size: 13px; margin-left: 14px;'>";
      htmlporcentaje += this.lsflightavailability.oprice.odiscountPrice.discountPercentage;
      htmlporcentaje += "</span>";
      htmlporcentaje += "<span style=' font-size: 13px;color: #6B253C;'>%</span>";
      htmlporcentaje += "</div>";
    }

    this.FormatearFechaPnr();
    let motivo = $('#motivoviaje').val();
    this.emailsolicitud = this.emailsolicitud.replace('@precioconvenio', html);
    this.emailsolicitud = this.emailsolicitud.replace('@porcentajedescuento', htmlporcentaje);
    this.emailsolicitud = this.emailsolicitud.replace('@motivoaprobacion', motivo);
    this.emailsolicitud = this.emailsolicitud.replace("@fechatimelimit", this.fechatimelimit);
    this.emailsolicitud = this.emailsolicitud.replace(/@currency/gi, this.lsflightavailability.oprice.currency);
    this.emailsolicitud = this.emailsolicitud.replace("@precioTotal", this.lsflightavailability.oprice.totalAmount);
    this.emailsolicitud = this.emailsolicitud.replace("@preciounitario", this.lsflightavailability.oprice.baseAmount);
    this.emailsolicitud = this.emailsolicitud.replace('@pnr', this.pnrresults.pnr);
  }

  PlantillaPasajeros() {
    let html = '';
    for (let j = 0; j < this.lsusuario.length; j++) {
      const item = this.lusers[j];
      html += "<tr>"
      html += "<td>"
      html += item.Name + " " + item.LastName;
      html += "</td>"
      html += "<td>"
      html += item.Odocument.number;
      html += "</td>"
      html += "<td>"
      html += item.Email;
      html += "</td>"
      html += "<td>"
      html += item.PhoneNumber;
      html += "</td>";
      if (item.IsVIP === true) {
        html += "<td>"
        html += 'Si';
        html += "</td>";
      } else {
        html += "<td>"
        html += 'No';
        html += "</td>";
      }
      html += "</tr>"
    }
    this.htmlpasajeros = html;
    this.emailsolicitud = this.emailsolicitud.replace("@NombreSolicitante", this.lsusuario[0].firstName + " " + this.lsusuario[0].lastName);
    this.emailsolicitud = this.emailsolicitud.replace('@pasajeros', this.htmlpasajeros);
  }

  PlantillaPoliticas() {
    let html = '';
    for (let i = 0; i < this.LPolicies.length; i++) {
      const item = this.LPolicies[i];
      html += "<div style='width:100% !important'>";
      html += "<div class='row' style='padding-top: 25px; padding-bottom: 30px; padding-left: 15px;'>";
      html += "<img style='width: 40px;' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/calendario.png'><label class='m-0 p-0 pl-3' style=' color: #555555; font-size: 20px; opacity: 1; letter-spacing: 0;padding-left: 2%;'>";
      html += item.name;
      html += "</label>";
      html += "</div>";
      html += "<div class='row'>";
      html += "<div style='color: #4A4A4A; font-size: 18px; opacity: 1; letter-spacing: 0; padding-bottom: 20px; padding-left: 20px;'>Infraccion</div>";
      html += "<div style='color: #4A4A4A; font-size: 18px; opacity: 1; letter-spacing: 0; text-align: right; width: 1160px; padding-bottom: 20px;padding-right: 174px;'>Impacto</div>";
      html += "</div>";
      html += "<div class='row' style='padding-left: 20px; padding-right: 20px;'>";
      html += "<div style='width: 60%; text-align: center; color: #898989; font-size: 15px; opacity: 1; letter-spacing: 0; border-radius: 20px 0px 20px 0px; border-top : 6px whitesmoke outset; border-bottom : 6px whitesmoke inset; border-right: 6px whitesmoke inset; border-left: 6px whitesmoke outset; padding: 1em; background: white;'>";
      html += item.message;
      html += "</div>";
      html += "<div style='width: 10%;'>";
      html += "</div>";
      html += "<div style='width: 30%; border-radius: 20px 0px 20px 0px; border-top : 6px whitesmoke outset; border-bottom : 6px whitesmoke inset; border-right: 6px whitesmoke inset; border-left: 6px whitesmoke outset; padding: 1em; background: white; text-align: center;'>";
      if (item.impact === 0) {
        html += "<span style='color: #3D3D3D; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
        html += "NO HAY IMPACTO";
        html += "</span>";
      } else {
        html += "<span style='color: #3D3D3D; font-size: 25px; opacity: 1; letter-spacing: 0; padding-right: 10px;'>";
        html += this.lsflightavailability.oprice.currency;
        html += "</span>";
        html += "<span style='color: #3D3D3D; font-size: 38px; opacity: 1; letter-spacing: 0;'>";
        html += item.impact;
        html += "</span>";
      }
      html += "</div>";
      html += "</div>";
      html += "</div>";
    }
    this.htmlpoliticas = html;
    this.emailsolicitud = this.emailsolicitud.replace('@politicas', this.htmlpoliticas);
  }

  PlantillaAutorizadores() {
    let bloquehtml = '';
    let htmlautorizador = '';
    for (let i = 0; i < this.lsapprover.length; i++) {
      const element = this.lsapprover[i];
      htmlautorizador += "<tr>";
      htmlautorizador += "<td>";
      htmlautorizador += element.Name + ' ' + element.LastName;
      htmlautorizador += "</td>";
      htmlautorizador += "<td>";
      htmlautorizador += element.email;
      htmlautorizador += "</td>";
      htmlautorizador += "</tr>";
    }
    bloquehtml = htmlautorizador;
    this.emailsolicitud = this.emailsolicitud.replace("@autorizadores", bloquehtml);
  }

  FormatearFechaPnr() {
    let data;
    let recorte;
    let fecha;
    let hora;
    data = this.pnrresults.timeLimitShow;
/*     recorte = data.split("T");
    fecha = recorte[0];
    var date = new Date(fecha);
    hora = recorte[1];
    recorte = fecha.split("-");
    fecha = (recorte[2] + " " + date.toLocaleString('default', { month: 'short' }) + " del " + recorte[0]);
    hora = hora.substr(0, 5); */
    this.fechatimelimit = data;
  }

  SendEmail() {
    this.PlantillaEmailSolicitud();
    /* this.PlantillaPreciovuelo();
    this.PlantillaPasajeros();
    this.PlantillaPoliticas();
    this.PlantillaAutorizadores(); */
    let mails = [];
    this.lsapprover.forEach(function (item) {
      if (item.priority === 1) {
        mails.push(item.email);
      }
    });
    let mailcontacto = this.contacto.ContactEmail;
    //   console.log(this.emailsolicitud);
    let email = this.emailsolicitud.replace(/\n|\r/g, '');
    let data = {
      "AgencyId": "305E642B-6643-410C-98E9-6E0F4BBAB785",
      "Recipients": mails,
      "RecipientsCopy": [mailcontacto],
      "RecipientsHiddenCopy": [],
      "Subject": "SOLICITUD APROBACION DE EXCEPCION",
      "Message": email
    }
    this.service.SendEmail(data).subscribe(
      results => {
        this.router.navigate(['/reserva-generada-vuelo']);
        /* if (results === true) {
          this.toastr.success('', 'Se envio correctamente', {
            timeOut: 3000
          });
          this.router.navigate(['/reserva-generada-vuelo']);
        } else {
          this.toastr.error('', 'Error al envio', {
            timeOut: 3000
          });
        } */
      },
      err => {

      },
      () => {
        this.spinner.hide();
      }
    );
  }

  SendEmailReservaGenerada() {
    this.PlantillaItinerarioReserva();
    this.PlantillaPrecioReserva();
    this.PlantillaPasajeroReserva();
    let mails = [];
    this.lsusuario.forEach(function (item) {
      mails.push(item.Email);
    });
    let mailcontacto = this.contacto.ContactEmail;
    let data = {
      "AgencyId": "305E642B-6643-410C-98E9-6E0F4BBAB785",
      "Recipients": mails,
      "RecipientsCopy": [mailcontacto],
      "RecipientsHiddenCopy": [],
      "Subject": "RESERVA GENERADA",
      "Message": this.emailreserva
    }
    this.service.SendEmail(data).subscribe(
      results => {
        if (results === true) {
          this.toastr.success('', 'Se envio correctamente', {
            timeOut: 3000
          });
          this.router.navigate(['/reserva-generada-vuelo']);
        } else {
          this.toastr.error('', 'Error al envio', {
            timeOut: 3000
          });
        }
      },
      err => {

      },
      () => {
        this.spinner.hide();
      }
    );
  }

  Emitir(template) {
    console.log("this.idmotivo: " + this.idmotivo);
    console.log("this.idmotivo: " + this.idmotivo);
    console.log("this.idmotivo: " + this.idmotivo);
    console.log("this.idmotivo: " + this.idmotivo);

    var reason = this.sessionStorageService.retrieve('reason');
    let idinterval = this.sessionStorageService.retrieve('idinterval');
    let phones = [];
    let email = [];
    let extraprofile;
    let infraction;
    let amount;
    let porcentaje;
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
      "Ltaxes": this.lsflightavailability.ltaxes,
      "LcompanyUIDs": this.LcompanyUIDs
    };
    this.spinner.show();
    let datos = this.sessionStorageService.retrieve('ss_duplicatePNR');
    this.service.DuplicatePnr(datos).subscribe(
      m => {
        this.mensajeDuplicate = m;
        if (m.length === 0 || m === []) {
          this.service.GenerateTicket(data).subscribe(
            results => {
              this.ticketresults = results;
              this.sessionStorageService.store('dataticket', this.ticketresults);
              if (this.ticketresults.oerror === null) {
                clearInterval(idinterval);
              }
              if (this.ticketresults.oerror === null) {
                this.router.navigate(['/reserva-ticket-vuelo']);
              }
            },
            err => {
              this.spinner.hide();
              this.modalerror = this.modalservice.show(ModalErrorServiceComponent, this.config);
            },
            () => {
              this.spinner.hide();
            }
          )

        } else {
          this.spinner.hide();
          this.modalRef = this.modalservice.show(
            template,
            Object.assign({}, { class: 'gray modal-lg m-infraccion' })
          );
        }
      }
    )


  }

  FormatearFechaReserva() {
    let data;
    let recorte;
    let fecha;
    let hora;
    let fechaexpiracion;
    data = this.pnrresults.timeLimit;
    recorte = data.split("T");
    fecha = recorte[0];
    var date = new Date(fecha);
    hora = recorte[1];
    recorte = fecha.split("-");
    fecha = (recorte[2] + "/" + date.toLocaleString('default', { month: 'short' }) + "/" + recorte[0]);
    hora = hora.substr(0, 5);
    this.fechaexpiracion = fecha + ' ' + hora;
  }

  FormatearFechaReserva2() {
    let data;
    let recorte;
    let fecha;
    let hora;
    let fechaexpiracion;
    data = this.pnrresults.createdDate;
    recorte = data.split("T");
    fecha = recorte[0];
    var date = new Date(fecha);
    hora = recorte[1];
    recorte = fecha.split("-");
    fecha = (recorte[2] + "/" + date.toLocaleString('default', { month: 'short' }) + "/" + recorte[0]);
    hora = hora.substr(0, 5);
    this.fechacreacion = fecha + ' ' + hora;
  }

  PlantillaPrecioReserva() {
    this.FormatearFechaReserva();
    this.FormatearFechaReserva2();
    if (this.lsflightavailability.odiscount != null) {
      this.emailreserva = this.emailreserva.replace('@montdesc', this.lsflightavailability.odiscount.amount);
    } else {
      this.emailreserva = this.emailreserva.replace('@montdesc', '0.00');
    }
    this.emailreserva = this.emailreserva.replace(/@currency/gi, this.lsflightavailability.currency);
    this.emailreserva = this.emailreserva.replace(/@preciototal/gi, this.lsflightavailability.totalFareAmount);
    this.emailreserva = this.emailreserva.replace(/@precioadulto/gi, this.lsflightavailability.fareAmountByPassenger);
    this.emailreserva = this.emailreserva.replace('@solicitadopor', this.loginDataUser.userName + ' ' + this.loginDataUser.userLastName);
    this.emailreserva = this.emailreserva.replace('@reservadopor', this.loginDataUser.userName + ' ' + this.loginDataUser.userLastName);
    this.emailreserva = this.emailreserva.replace('@fechacreacion', this.fechacreacion);
    this.emailreserva = this.emailreserva.replace('@fechaexpiracion', this.fechaexpiracion);
    this.emailreserva = this.emailreserva.replace('@pnr', this.pnrresults.pnr);
  }

  PlantillaItinerarioReserva() {
    let htmlsection = '';
    let texttramo = '';
    let htmltotal = '';
    let imgavion = '';

    for (let i = 0; i < this.Lsection.length; i++) {
      const section = this.Lsection[i];
      const lsegment = section.Lsegments;

      for (let k = 0; k < lsegment.length; k++) {
        const itemlsegment = lsegment[k];
        const segmentgroup = itemlsegment.LsegmentGroups;

        for (let j = 0; j < segmentgroup.length; j++) {
          const itemsegmentgroup = segmentgroup[j];
          if (itemsegmentgroup.fareFamilyName !== null) {
            htmlsection += "<div class='row '>";
            htmlsection += "<div style='width: 100% !important; padding-left: 2%; '>";
            htmlsection += "<span style='color: #3D3D3D; font-size: 20px;'>Clase de vuelo: ";
            htmlsection += itemsegmentgroup.fareFamilyName;
            htmlsection += "</span>";
            htmlsection += "</div>";
            htmlsection += "</div>";
          }
          htmlsection += "<div style='width: 100% !important;'>";
          htmlsection += "<div style='width: 100% !important; padding-top: 1%; padding-bottom: 1%;padding-left: 2%;'>";
          if (segmentgroup.length === 1) {
            texttramo = 'Ida';
            imgavion = 'airplane_ida';
          }
          if (segmentgroup.length === 2) {
            if (j === 0) {
              texttramo = 'Ida';
              imgavion = 'airplane_ida';
            } else {
              texttramo = 'Vuelta';
              imgavion = 'airplane_vuelta';
            }
          }
          if (segmentgroup.length > 2) {
            texttramo = 'Tramo ';
            imgavion = 'airplane_ida';
            texttramo += (j + 1).toString();
          }
          htmlsection += "<span><img style='width: 30px; ' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/";
          htmlsection += imgavion + ".png'";
          htmlsection += "></span>";
          htmlsection += "<span style'padding-left: 10px;'>";
          htmlsection += texttramo;
          htmlsection += "</span>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 100% !important;padding-left: 2%; color: #6A243B; font-size: 18px;'>";
          htmlsection += "<span>";
          htmlsection += '●' + itemsegmentgroup.Origin + '/';
          htmlsection += "</span>";
          htmlsection += "<span>";
          htmlsection += itemsegmentgroup.Destination;
          htmlsection += "</span>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 100% !important;padding-left: 2%; padding-top: 1%; padding-bottom: 2%;'>";
          htmlsection += "<div class='row'>";
          htmlsection += "<div style='width: 50%;'>";
          htmlsection += "<span style='color: #676767; padding-right: 10px;'>Salida: </span><span style='color: #898989;font-size: 15px;'>";
          htmlsection += itemsegmentgroup.DepartureDateShow + ' ' + itemsegmentgroup.TimeOfDepartureShow;
          htmlsection += "</span>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 50%;'>";
          htmlsection += "<span style='color: #676767; padding-right: 10px;'>Llegada: </span><span style='color: #898989;font-size: 15px;'>";
          htmlsection += itemsegmentgroup.ArrivalDateShow + ' ' + itemsegmentgroup.TimeOfArrivalShow;
          htmlsection += "</span>";
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 100%; text-align: center !important; padding-left: 2%; padding-right: 2%; padding-bottom: 2%;'>";
          htmlsection += "<table class='tabla'>";
          htmlsection += "<thead style='color: #676767; background: #FBF6F6 0% 0% no-repeat padding-box; font-size: 14px;'>";
          htmlsection += "<th>Aerolinea</th>";
          htmlsection += "<th>Vuelo</th>";
          htmlsection += "<th>Duración</th>";
          htmlsection += "<th>Clase</th>";
          htmlsection += "</thead>";
          htmlsection += "<tbody style='color: #898989; font-size: 14px;'>";
          htmlsection += "<tr>";
          htmlsection += "<td>";
          htmlsection += itemsegmentgroup.CarrierName;
          htmlsection += "</td>";
          htmlsection += "<td>";
          htmlsection += itemsegmentgroup.FlightOrtrainNumber;
          htmlsection += "</td>";
          htmlsection += "<td>";
          htmlsection += itemsegmentgroup.TotalFlightTimeShow;
          htmlsection += "</td>";
          htmlsection += "<td>";
          htmlsection += itemsegmentgroup.ClassId;
          htmlsection += "</td>";
          htmlsection += "</tr>";
          htmlsection += "</tbody>";
          htmlsection += "</table>";
          htmlsection += "</div>";
          htmlsection += "</div>";
        }
      }
    }
    htmltotal = htmlsection;
    this.emailreserva = this.emailreserva.replace("@segmento", htmltotal);
  }

  PlantillaPasajeroReserva() {
    let html = '';
    let htmltotal = '';
    for (let j = 0; j < this.lusers.length; j++) {
      const item = this.lusers[j];
      html += "<div style='width: 100% !important;'>";
      html += "<div class='row ' style='padding-left: 2%; padding-bottom: 1%;'>";
      html += "<div style='width: 50% !important;'>";
      html += "<span style='color: #676767;'>Tipo de pasajero:  </span>";
      html += "<span style='color: #898989;'>Adulto</span>"
      html += "</div>";

      if (item.isVIP === true) {
        html += "<div style='width: 50% !important;'>";
        html += "<span style='color: #676767;'>Pasajero Vip:  </span>";
        html += "<span style='color: #898989;'>Si</span>"
        html += "</div>";
      }
      html += "</div>";
      html += "<div class='row ' style='padding-left: 2%; padding-bottom: 1%;'>";
      html += "<div style='width: 50% !important;'>";
      html += "<span style='color: #676767;'>Nombre:  </span>";
      html += "<span style='color: #898989;'>";
      html += item.firstName + ' ' + item.lastName;
      html += "</span>";
      html += "</div>";
      html += "<div style='width: 50% !important;'>";
      html += "<span style='color: #676767;'>Teléfono:  </span>";
      html += "<span style='color: #898989;'>";
      html += item.phone;
      html += "</span>";
      html += "</div>";
      html += "</div>";
      html += "<div class='row ' style='padding-left: 2%; border-bottom: 1px solid #707070;padding-bottom: 1%;'>";
      html += "<div style='width: 50% !important;'>";
      html += "<span style='color: #676767;'>Nacionalidad:  </span>";
      html += "<span style='color: #898989;'>";
      html += item.nationality;
      html += "</span>";
      html += "</div>";
      html += "<div style='width: 50% !important;'>";
      html += "<span style='color: #676767;'>Cargo:  </span>";
      html += "<span style='color: #898989;'>";
      html += '';
      html += "</span>";
      html += "</div>";
      html += "</div>";
      html += "<div class='row ' style='padding-left: 2%; padding-bottom: 1%; padding-top: 1%;'>";
      html += "<div style='width:100% !important;'>";
      html += "<span style='color: #676767;'>Email:  </span>";
      html += "<span style='color: #898989;'>";
      html += item.email;
      html += "</span>";
      html += "</div>";
      html += "</div>";
      html += "<div class='row ' style='padding-left: 2%; padding-bottom: 3%;'>";
      html += "<div style='width: 50% !important;'>";
      html += "<span style='color: #676767;'>Tipo de documento:  </span>";
      html += "<span style='color: #898989;'>";
      html += item.lpersonDocuments[0].docName;
      html += "</span>";
      html += "</div>";
      html += "<div style='width: 50% !important;'>";
      html += "<span style='color: #676767;'>Número de documento:  </span>";
      html += "<span style='color: #898989;'>";
      html += item.lpersonDocuments[0].docNumber;
      html += "</span>";
      html += "</div>";
      html += "</div>";
      html += "</div>";
    }

    htmltotal = html;
    this.emailreserva = this.emailreserva.replace("@pasajeros", htmltotal);
  }

  Back() {
    this.router.navigate(['/reserva-vuelo']);
    this.sessionStorageService.store('count', false);
  }
}
