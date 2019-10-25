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
  lusers: IDatosUser[];
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
  loginDataUser;

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
    this.plantilla = 'assets/plantillasEmail/dfd.html';
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
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
    this.spinner.show();
    let phones = [];
    let email = [];
    this.lusers.forEach(function(item){
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
        } else {
          this.spinner.hide();
        }
      }
      );
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
        "Message": this.emailsolicitud
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
