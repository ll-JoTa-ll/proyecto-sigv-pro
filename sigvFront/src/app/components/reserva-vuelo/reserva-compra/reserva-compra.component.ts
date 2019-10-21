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
  lusers: IDatosUser;
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
  nuevohtml;

  constructor(private sessionStorageService: SessionStorageService,
              private service: AirportService, private router: Router, private http: HttpClient) {
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
    this.plantilla = 'assets/plantillasEmail/dfd.html';
   }

  ngOnInit() {
    console.log("Nginit compra");
    this.email = this.lusers.email;
    this.phone = this.lusers.phone;
    this.userid = this.lusers.userId;
    this.currency = this.dataflightavalilability.Currency;
    this.pseudo = this.dataflightavalilability.Pseudo;
    this.gds = this.dataflightavalilability.Gds;
    this.osession = this.lsflightavailability.osession;
    this.carrierId = this.dataflightavalilability.CarrierId;
    this.ocompany = this.dataflightavalilability.Ocompany;
    this.numberpassengers = this.dataflightavalilability.NumberPassengers;
    this.flightnational = this.dataflightavalilability.FlightNational;
    this.Obtenerstring();
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
    this.PlantillaEmailSolicitud();
   // this.PlantillaPasajeros();
   // this.PlantillaPreciovuelo();
    let phones = [];
    let email = [];
    email.push(this.email);
    phones.push(this.phone);
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
    "CarrierId": this.carrierId
    };
    this.service.AddPassenger(data).subscribe(
        results => {
        // tslint:disable-next-line: indent
        this.pnrresults = results;
        this.sessionStorageService.store('datapnr', this.pnrresults);
        },
        err => {
           console.log(err);
      },
      () => {
        if (this.lsapprover.length > 0 && this.pnrresults.oerror === null) {
          this.SendEmail();
        }
      }
      );
    }

   PlantillaEmailSolicitud() {
     let htmlsection = '';

     for (let i = 0; i < this.Lsection.length; i++) {
      const section = this.Lsection[i];
      const lsegment = section.Lsegments;
      htmlsection += "<div style='width: 60%; border-radius: 20px 20px 20px 20px; border-top : 6px whitesmoke outset; border-bottom : 6px whitesmoke inset; border-right: 6px whitesmoke inset; border-left: 6px whitesmoke outset; padding: 1em; background: white;'>";

      for (let k = 0; k < lsegment.length; k++) {
        const itemlsegment = lsegment[k];
        const segmentgroup = itemlsegment.LsegmentGroups;

        for (let j = 0; j < segmentgroup.length; j++) {
          const itemsegmentgroup = segmentgroup[j];
          htmlsection += "<div class='row' style='border-bottom: 1px solid #cccccc; padding-bottom: 20px; padding-top: 30px;'>";
          htmlsection += "<div style='width: 40%;'>";
          htmlsection += "<span class='m-0 p-0'><img style='width: 350px;' class='m-0 p-0' src='https://sigvplus.azurewebsites.net/sigvFront/assets/images/layer5.gif'></span>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 20%; text-align: center;  padding-top: 30px;'>";
          htmlsection += "<span style='color: #676767; font-size: 14px; opacity: 100%;'>Aerolinea Operadora :";
          htmlsection +=  "LATAM";
          htmlsection += "</span>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 40%; text-align: center; padding-top: 30px; padding-left: 50px;'>";
          htmlsection += "<label style='color: #676767; font-size: 18px; opacity: 100%; width: 40%;'>";
          htmlsection += "Vuelo AV140 - Airbus A319";
          htmlsection += "</label>";
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "<div class='row' style='padding-top: 40px; padding-bottom: 30px;'>";
          htmlsection += "<div style='width: 40%; text-align: center;'>";
          htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 17px; opacity: 1;'>";
          htmlsection += itemsegmentgroup.DepartureDateShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 38px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.TimeOfDepartureShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 22px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.Origin;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 15px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.CityOrigin;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 15px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.AirportOrigin;
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 20%; padding-left: 40px; padding-top: 30px; text-align: center;'>";
          htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 17px; opacity: 1;'>";
          htmlsection += "Duracion";
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 38px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.TotalFlightTimeShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 22px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += "Clase: <label class='m-0 p-0 pl-3' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.CabinDescription + " - " + itemsegmentgroup.ClassId;
          htmlsection += "</label>";
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "<div style='width: 40%; padding-left: 50px; text-align: center;'>";
          htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 17px; opacity: 1;'>";
          htmlsection += itemsegmentgroup.ArrivalDateShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 38px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.TimeOfArrivalShow;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 22px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.Destination;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 15px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.CityDestination;
          htmlsection += "</div>";
          htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 15px; opacity: 1; letter-spacing: 0;'>";
          htmlsection += itemsegmentgroup.AirportDestination;
          htmlsection += "</div>";
          htmlsection += "</div>";
          htmlsection += "</div>";
        }
      }
      htmlsection += "</div>";
    }
     this.htmlvuelosection = htmlsection;
     console.log(this.emailsolicitud);
     this.nuevohtml = this.emailsolicitud.replace('@section', this.htmlvuelosection);
     console.log(this.htmlvuelosection);
   }

   PlantillaPreciovuelo() {
     let html = '';
     html += " <div style='width: 25%; border-radius: 40px 0px 40px 0px; border-top : 6px whitesmoke outset; border-bottom : 6px whitesmoke inset; border-right: 6px whitesmoke inset; border-left: 6px whitesmoke outset; padding: 1em; background: white; height: 180px;'>";
     html += "<div class='row'>";
     html += "<img style='padding-left: 290px; width: 50px' src='https://sigvplus.azurewebsites.net/sigvFront/assets/images/medal.gif'>";
     html += "</div>";
     html += "<div class='row' style='padding-bottom: 10px; padding-left: 30px;'>";
     html += "<span class='m-0 p-0' style='text-align: center;   font-size: 45px; letter-spacing: 0; color: #898989; padding-left: 10px;'>";
     html += this.lsflightavailability.currency;
     html += "</span>";
     html += "<span class='m-0 p-0' style='text-align: center;   font-size: 100px; letter-spacing: 0; color: #898989; padding-left: 20px;'>";
     html += this.lsflightavailability.fareAmountByPassenger;
     html += "</span>";
     html += "</div>";
     html += "<div class='row' style='padding-top: 15px; padding-left: 30px;'>";
     html += "<span class='m-0 p-0' style='font-size: 17px; letter-spacing: 0; color: #676767; padding-right: 20px;'>Precio por Adulto</span>";
     html += "<span class='m-0 p-0' style='text-align: center;   font-size: 20px; letter-spacing: 0; color: #6B253C; padding-right: 5px;'>";
     html += this.lsflightavailability.currency;
     html += "</span>";
     html += "<span class='m-0 p-0' style='text-align: center;   font-size: 20px; letter-spacing: 0; color: #898989;'>";
     html += this.lsflightavailability.totalFareAmount;
     html += "</span>";
     html += "</div>";
     html += "</div>";
     this.htmlpreciofinal = html;
     this.nuevohtml = this.emailsolicitud.replace('@precio', this.htmlpreciofinal);
   }

   PlantillaPasajeros() {
    let html = '';
    html += "<div style='width: 100%; border-radius: 20px 0px 20px 0px; border-top : 6px whitesmoke outset; border-bottom : 6px whitesmoke inset; border-right: 6px whitesmoke inset; border-left: 6px whitesmoke outset; padding: 1em; background: white; padding-top: 20px; padding-bottom: 20px;'>";
    html += "<div class='row' style='padding-bottom: 30px;'>";
    html += "<span style='background: transparent linear-gradient(99deg, #ED1C24 0%, #D51A2C 34%, #3C4749 100%) 0% 0% no-repeat padding-box; border-radius: 0px 23px 23px 0px; color: #FFFFFF; padding: 7px 90px 7px 30px;'>Pasajeros</span>";
    html += "<span class='m-0 p-0' style='color: #898989; font-size: 22px; opacity: 1; letter-spacing: 0; width: 80%; text-align: right;'>Ver Infracción</span>";
    html += "</div>";
    html += "<div class='row'>";
    html += "<div style='width: 30%'>";
    html += "<div class='row'>";
    html += "<label class='m-0 p-0' style='color: #676767; font-size: 17px; opacity: 1; letter-spacing: 0;'>Nombres:</label>";
    html += "</div>";
    html += "<div class='row'>";
    html += "<span style='border: 1px solid #D9D4D4; height: 30px; width: 500px; border-radius: 5px;'>";
    html += this.lusers.firstName;
    html += "</span>";
    html += "</div>";
    html += "</div>";
    html += "<div style='width: 5%;'>";
    html += "</div>";
    html += "<div style='width: 30%'>";
    html += "<div class='row'>";
    html += "<label class='m-0 p-0' style='color: #676767; font-size: 17px; opacity: 1; letter-spacing: 0;'>Apellidos:</label>";
    html += "</div>";
    html += "<div class='row'>";
    html += "<span style='border: 1px solid #D9D4D4; height: 30px; width: 500px; border-radius: 5px;'>";
    html += this.lusers.lastName;
    html += "</span>";
    html += "</div>";
    html += "</div>";
    html += "<div style='width: 5%;'>";
    html += "</div>";
    html += "<div style='width: 30%'>";
    html += "<div class='row'>";
    html += "<label class='m-0 p-0' style='color: #676767; font-size: 17px; opacity: 1; letter-spacing: 0;'>Email:</label>";
    html += "</div>";
    html += "<div class='row'>";
    html += "<span style='border: 1px solid #D9D4D4; height: 30px; width: 500px; border-radius: 5px;'>";
    html += this.lusers.email;
    html += "</span>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    this.htmlpasajeros = html;
    this.nuevohtml = this.emailsolicitud.replace('@pasajeros', this.htmlpasajeros);
   }


    SendEmail() {
      let mails = [];
      this.lsapprover.forEach(function(item) {
        if (item.priority === 1) {
           mails.push(item.email);
        }
      });

      let data = {
        "AgencyId": 1,
        "Recipients": mails,
        "RecipientsCopy": ['analista8@domiruth.com'],
        "RecipientsHiddenCopy": [],
        "Subject": "TEST EMAIL TEST",
        "Message": this.nuevohtml
      }
      this.service.SendEmail(data).subscribe(
        results => {
             if (results === true) {
               alert('Se envio correctamente');
               this.router.navigate(['/reserva-generada']);
             } else {
               alert('Error al envio');
             }
        },
        err => {

        }
      );
    }

    Emitir () {
      let phones = [];
      let email = [];
      email.push(this.email);
      phones.push(this.phone);
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
    "CarrierId": this.carrierId 
    };
      this.service.GenerateTicket(data).subscribe(
        results => {
          this.ticketresults = results;
          if (this.ticketresults.oerror === null) {
            this.router.navigate(['/reserva-ticket']);
          }
        },
        err => {

        },
        () => {

        }
      )
    }

}
