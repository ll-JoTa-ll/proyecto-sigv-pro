import { Component, OnInit } from '@angular/core';
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

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-compra',
  templateUrl: './reserva-compra.component.html',
  styleUrls: ['./reserva-compra.component.sass']
})
export class ReservaCompraComponent implements OnInit {

  Lsection;
  Lsectionpassenger;
  lsusuario;
  lsflightavailability: IFlightAvailability;
  LPolicies;
  dataflightavalilability;
  osession;
  carrierId;
  gds;
  pseudo;
  ocompany;
  numberpassengers;
  lusers;
  email;
  phone;
  osessionpnr;
  pnrresults: IPnrConfirm;
  userid;
  currency;
  lsapprover: IGetApprovers[];
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

  constructor(private sessionStorageService: SessionStorageService,
              private service: AirportService, private router: Router, private http: HttpClient, public spinner: NgxSpinnerService) {
    console.log("Constructor compra");
    this.Lsection = this.sessionStorageService.retrieve('sectioninfo');
    this.Lsectionpassenger = this.sessionStorageService.retrieve('sectionservice');
    this.lsusuario = this.sessionStorageService.retrieve('datosusuario');
    this.lsapprover = this.sessionStorageService.retrieve('lsapprover');
    console.log(this.lsapprover);
    this.LPolicies = this.sessionStorageService.retrieve('politicas');
    console.log(this.LPolicies);
    this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.dataflightavalilability = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.lusers = this.sessionStorageService.retrieve('lsuser');
    this.idmotivo = this.sessionStorageService.retrieve('idmotivo');
    this.sessionStorageService.store('idmotivo', null);
    this.plantilla = 'assets/plantillasEmail/plantillaaprobacion.html';
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.contacto = this.sessionStorageService.retrieve('contacto');
   }

  ngOnInit() {
    console.log("Nginit compra");
    this.currency = this.dataflightavalilability.Currency;
    this.pseudo = this.dataflightavalilability.Pseudo;
    this.gds = this.dataflightavalilability.Gds;
    this.osession = this.lsflightavailability.osession;
    this.carrierId = this.dataflightavalilability.CarrierId;
    this.ocompany = this.dataflightavalilability.Ocompany;
    this.numberpassengers = this.dataflightavalilability.NumberPassengers;
    this.flightnational = this.dataflightavalilability.FlightNational;
  }

  Obtenerstring() {
    this.http.get(this.plantilla, {responseType: 'text'}).subscribe(
      data => {
        console.log(data);
        this.emailsolicitud = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  AddPassenger() {
    this.spinner.show();
    let phones = [];
    let email = [];
    this.contacto.email.forEach(function(item, index) {
      email.push(item);
    });
    this.contacto.telefonos.forEach(function(item, index) {
      phones.push(item);
    });
    let infraction;
    if (this.LPolicies.length > 0) {
      infraction = true;
    } else {
      infraction = false;
    }
    this.Obtenerstring();
    let data = {
    "UserId": this.loginDataUser.userId,
    "GDS": this.gds,
    "Pseudo": this.pseudo,
    "FlightNational": this.flightnational,
    "Infraction": infraction,
    "Lsections": this.Lsectionpassenger,
    "Ocompany": this.ocompany,
    "osession": this.osession,
    "Phones": phones,
    "Emails": email,
    "Lpassenger": this.lsusuario,
    "ReasonFlightId": parseFloat(this.idmotivo),
    "CarrierId": this.carrierId,
    "Lpolicies": this.LPolicies,
    "Lauthorizer": this.lsapprover,
    "Comment": $('#motivoviaje').val()
    };
    this.service.AddPassenger(data).subscribe(
        results => {
        // tslint:disable-next-line: indent
        this.pnrresults = results;
        if (this.lsapprover.length === 0 && this.LPolicies.length === 0 || this.lsapprover.length === 0 && this.LPolicies.length > 0) {
          this.router.navigate(['/reserva-generada-vuelo']);
        }
        this.sessionStorageService.store('datapnr', this.pnrresults);
        },
        err => {
           console.log(err);
      },
      () => {
        if (this.lsapprover.length > 0 && this.pnrresults.oerror === null) {
          this.SendEmail();
        } else {
          this.spinner.hide();
        }
      }
      );
    }

    PlantillaEmailSolicitud() {
      let htmlsection = '';
 
      for (let i = 0; i < this.Lsection.length; i++) {
       const section = this.Lsection[i];
       const lsegment = section.Lsegments;
       
       for (let k = 0; k < lsegment.length; k++) {
         const itemlsegment = lsegment[k];
         const segmentgroup = itemlsegment.LsegmentGroups;
         
         for (let j = 0; j < segmentgroup.length; j++) {
           const itemsegmentgroup = segmentgroup[j];
           htmlsection += "<div class='row' style='padding-bottom:20px; padding-top:10px;'>";
           htmlsection += "<div style='width: 100%; border-radius: 20px 20px 20px 20px; background: white; padding: 1em; border: 1px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5);'>";
           htmlsection += "<div class='row' style='border-bottom: 1px solid #cccccc; padding-bottom: 20px; padding-top: 30px;'>";
           htmlsection += "<div style='width: 40%;'>";
           htmlsection += "<span class='m-0 p-0'><img style='width: 45px;' class='m-0 p-0' src='https://sigvplus.azurewebsites.net/sigv/assets/images/Airlines/";
           htmlsection += itemsegmentgroup.MarketingCarrier + ".png'></span>";
           htmlsection += "</div>";
           htmlsection += "<div style='width: 20%; text-align: center;  padding-top: 30px;'>";
           htmlsection += "<span style='color: #676767; font-size: 12px; opacity: 100%;'>Aerolinea Operadora :";
           htmlsection += itemsegmentgroup.CarrierName;
           htmlsection += "</span>";
           htmlsection += "</div>";
           htmlsection += "<div style='width: 40%; text-align: center; padding-top: 30px; padding-left: 50px;'>";
           htmlsection += "<label style='color: #676767; font-size: 14px; opacity: 100%; width: 40%;'>";
           htmlsection += "Vuelo AV140 - Airbus A319";
           htmlsection += "</label>";
           htmlsection += "</div>";
           htmlsection += "</div>";
           htmlsection += "<div class='row' style='padding-top: 40px; padding-bottom: 30px;'>";
           htmlsection += "<div style='width: 40%; text-align: center;'>";
           htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
           htmlsection += itemsegmentgroup.DepartureDateShow;
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.TimeOfDepartureShow;
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.Origin;
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.CityOrigin;
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.AirportOrigin;
           htmlsection += "</div>";
           htmlsection += "</div>";
           htmlsection += "<div style='width: 20%; padding-left: 40px; padding-top: 30px; text-align: center;'>";
           htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
           htmlsection += "Duracion";
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 22px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.TotalFlightTimeShow;
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 20px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += "Clase: <label class='m-0 p-0 pl-3' style='color: #898989; font-size: 14px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.CabinDescription + " - " + itemsegmentgroup.ClassId;
           htmlsection += "</label>";
           htmlsection += "</div>";
           htmlsection += "</div>";
           htmlsection += "<div style='width: 40%; padding-left: 50px; text-align: center;'>";
           htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
           htmlsection += itemsegmentgroup.ArrivalDateShow;
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.TimeOfArrivalShow;
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.Destination;
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.CityDestination;
           htmlsection += "</div>";
           htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
           htmlsection += itemsegmentgroup.AirportDestination;
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
    this.FormatearFechaPnr();
    let motivo = $('#motivoviaje').val();
    this.emailsolicitud = this.emailsolicitud.replace('@motivoaprobacion', motivo);
    this.emailsolicitud = this.emailsolicitud.replace("@fechatimelimit",this.fechatimelimit);
    this.emailsolicitud = this.emailsolicitud.replace("@horatimelimit",this.horatimelimit);
    this.emailsolicitud = this.emailsolicitud.replace(/@currency/gi, this.lsflightavailability.currency);
    this.emailsolicitud = this.emailsolicitud.replace("@precioTotal", this.lsflightavailability.totalFareAmount);
    this.emailsolicitud = this.emailsolicitud.replace("@preciounitario", this.lsflightavailability.fareAmountByPassenger);
   }

   PlantillaPasajeros() {
    let html = '';
    for (let j = 0; j < this.lusers.length; j++) {
      const item = this.lusers[j];
    html+="<tr>"
    html+="<td>"
    html += item.firstName + " " + item.lastName;
    html+="</td>"
    html+="<td>"
    html += item.odocument.number;
    html+="</td>"
    html+="<td>"
    html += item.email;
    html+="</td>"
    html+="<td>"
    html += item.phone;
    "</td>"
    html+="</tr>"
    }
    this.htmlpasajeros = html;
    this.emailsolicitud = this.emailsolicitud.replace("@NombreSolicitante",this.lsusuario[0].firstName + " " + this.lsusuario[0].lastName);
    this.emailsolicitud = this.emailsolicitud.replace('@pasajeros', this.htmlpasajeros);
   }

   PlantillaPoliticas()
   {
     let html = '';
    for (let i = 0; i < this.LPolicies.length; i++) {
    const item = this.LPolicies[i];
     html+= "<div style='width:100% !important'>";
     html+="<div class='row' style='padding-top: 25px; padding-bottom: 30px; padding-left: 15px;'>";
     html+="<img style='width: 40px;' src='https://sigvplus.azurewebsites.net/sigv/assets/images/calendario.png'><label class='m-0 p-0 pl-3' style='  color: #555555; font-size: 20px; opacity: 1; letter-spacing: 0;'>";
     html+= item.name;
     html+="</label>";
     html+="</div>";
     html+="<div class='row'>";
     html+="<div style='color: #4A4A4A; font-size: 18px; opacity: 1; letter-spacing: 0; padding-bottom: 20px; padding-left: 20px;'>Infraccion</div>";
     html+="<div style='color: #4A4A4A; font-size: 18px; opacity: 1; letter-spacing: 0; text-align: right; width: 1160px; padding-bottom: 20px;padding-right: 335px;'>Impacto</div>";
     html+="</div>";
     html+="<div class='row' style='padding-left: 20px; padding-right: 20px;'>";
     html+="<div style='width: 60%; text-align: center; color: #898989; font-size: 20px; opacity: 1; letter-spacing: 0; border-radius: 20px 0px 20px 0px; border-top : 6px whitesmoke outset; border-bottom : 6px whitesmoke inset; border-right: 6px whitesmoke inset; border-left: 6px whitesmoke outset; padding: 1em; background: white;'>";
     html+=item.message;
     html+="</div>";
     html+="<div style='width: 10%;'>";
     html+="</div>";
     html+="<div style='width: 30%; border-radius: 20px 0px 20px 0px; border-top : 6px whitesmoke outset; border-bottom : 6px whitesmoke inset; border-right: 6px whitesmoke inset; border-left: 6px whitesmoke outset; padding: 1em; background: white; text-align: center;'>";
     if (item.impact === 0)
     {
      html+="<span style='color: #3D3D3D; font-size: 25px; opacity: 1; letter-spacing: 0;'>";
      html+="NO HAY IMPACTO";
      html+="</span>";
     } else {
      html+="<span style='color: #3D3D3D; font-size: 25px; opacity: 1; letter-spacing: 0; padding-right: 10px;'>";
      html+=this.lsflightavailability.currency;
      html+="</span>";
      html+="<span style='color: #3D3D3D; font-size: 38px; opacity: 1; letter-spacing: 0;'>";
      html+=item.impact;
      html+="</span>";
     }
     html+="</div>";
     html+="</div>";
     html+="</div>";
    }
     this.htmlpoliticas = html;
     this.emailsolicitud = this.emailsolicitud.replace('@politicas', this.htmlpoliticas);
   }

   FormatearFechaPnr() {
    let data;
    let recorte; 
    let fecha;
    let hora;
    data = this.pnrresults.timeLimit;
    recorte = data.split("T");
    fecha = recorte[0];
    var date = new Date(fecha);
    hora =  recorte[1];
    recorte = fecha.split("-");
    fecha = (recorte[2] + " " + date.toLocaleString('default', { month: 'short' }) + " del " + recorte[0]);
    hora = hora.substr(0,5);
    this.fechatimelimit = fecha;
    this.horatimelimit = hora;
  }

    SendEmail() {
      this.PlantillaEmailSolicitud();
      this.PlantillaPreciovuelo();
      this.PlantillaPasajeros();
      this.PlantillaPoliticas();
      console.log(this.emailsolicitud);
      let mails = [];
      this.lsapprover.forEach(function(item) {
        if (item.priority === 1) {
           mails.push(item.email);
        }
      });
      let data = {
        "AgencyId": 1,
        "Recipients": mails,
        "RecipientsCopy": ['analista8@domiruth.com', 'juan.caro.1987@gmail.com', 'gerentedeinnovacion@domiruth.com'],
        "RecipientsHiddenCopy": [],
        "Subject": "TEST SOLICITUD APROBACION DE EXCEPCION",
        "Message": this.emailsolicitud
      }
      this.service.SendEmail(data).subscribe(
        results => {
             if (results === true) {
               alert('Se envio correctamente');
               this.router.navigate(['/reserva-generada-vuelo']);
             } else {
               alert('Error al envio');
             }
        },
        err => {
         console.log(err);
        },
        () => {
          this.spinner.hide();
        }
      );
    }

    Emitir () {
      let phones = [];
      let email = [];
      this.lusers.forEach(function(item) {
        email.push(item.email);
        phones.push(item.phone);
      });
      let infraction;
      if (this.LPolicies.length > 0) {
      infraction = true;
      } else {
      infraction = false;
    }
  
      let data = {
    "UserId": this.userid,
    "GDS": this.gds,
    "Pseudo": this.pseudo,
    "FlightNational": this.flightnational,
    "Infraction": infraction,
    "Lsections": this.Lsectionpassenger,
    "Ocompany": this.ocompany,
    "osession": this.osession,
    "Phones": phones,
    "Emails": email,
    "Lpassenger": this.lsusuario,
    "ReasonFlightId": parseFloat(this.idmotivo),
    "CarrierId": this.carrierId,
    "Lpolicies": this.LPolicies
    };
      this.service.GenerateTicket(data).subscribe(
        results => {
          this.ticketresults = results;
          if (this.ticketresults.oerror === null) {
            this.router.navigate(['/reserva-ticket-vuelo']);
          }
        },
        err => {

        },
        () => {

        }
      )
    }

}
