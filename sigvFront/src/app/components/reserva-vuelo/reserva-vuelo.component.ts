import { Component, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../../environments/environment';
import { AirportService } from '../../services/airport.service';
import { IDatosUser } from '../../models/IDatosUser';
import { ICostCenter } from 'src/app/models/ICostCenter';
import { IReasonFlight } from 'src/app/models/IReasonFlight';
import { Router } from '@angular/router';
import { IGetApprovers } from '../../models/IGetApprovers.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-vuelo',
  templateUrl: './reserva-vuelo.component.html',
  styleUrls: ['./reserva-vuelo.component.sass']
})
export class ReservaVueloComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  flightAvailability_request;
  datarequest;
  flightAvailability_result;
  tipovuelo;
  loginDataUser;
  lst_rol_autogestion;
  LSection;
  LPolicies;
  datosuser: IDatosUser;
  currency;
  ocompany;
  lsCostCenter: ICostCenter[];
  lsReasonFlight: IReasonFlight[];
  numberpassengers;
  osession;
  carrierId;
  pseudo;
  gds;
  datosusuario;
  email;
  phone;
  userid;
  LSectionPassenger;
  lsapprovers: IGetApprovers[] = [];
  flightNational;

  constructor(
    private modalService: BsModalService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private service: AirportService,
    private router: Router
  ) {
    this.datarequest = this.sessionStorageService.retrieve('ss_FlightAvailability_request1');
    this.flightAvailability_request = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.flightAvailability_result = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.tipovuelo = this.sessionStorageService.retrieve('tipovuelo');
    //this.sessionStorageService.store('ss_FlightAvailability_request', null);
    //this.sessionStorageService.store('ss_FlightAvailability_result', null);
    this.sessionStorageService.store('tipovuelo', null);
    this.lst_rol_autogestion = environment.cod_rol_autogestion;
  }

  ngOnInit() {
    if (this.loginDataUser.orole.roleId === this.lst_rol_autogestion[0]) {
      this.GetUsers();
  }
    this.LSection = this.flightAvailability_request.Lsections;
    this.LSectionPassenger = this.datarequest.Lsections;
    this.LPolicies = this.flightAvailability_request.lpolicies;
    this.ocompany = this.flightAvailability_request.Ocompany;
    this.currency = this.flightAvailability_request.Currency;
    this.numberpassengers = this.flightAvailability_request.NumberPassengers;
    this.osession = this.flightAvailability_result.osession;
    this.carrierId = this.flightAvailability_request.CarrierId;
    this.pseudo = this.flightAvailability_request.Pseudo;
    this.gds = this.flightAvailability_request.Gds;
    this.flightNational = this.flightAvailability_request.FlightNational;
   // this.CostCenter();
    this.ReasonFlight();
  }


  GetUsers() {
      let data = {
        Id: this.loginDataUser.userId
      }
      this.service.GetUser(data.Id).subscribe(
        results => {
             this.datosuser = results;
        },
        err => {
             console.log("error results", err);
        },
        () => {
          this.TraerAutorizador();
        }
      );
  }

  CostCenter() {
    let data = {
      Id: this.ocompany.companyId
    };

    this.service.getCostCenter(data).subscribe(
      results => {
         this.lsCostCenter = results;
      },
      err => {
         console.log('error results', err);
      }
    );
  }

  ReasonFlight() {
    let data = {
      CompanyId: this.ocompany.companyId
    };

    this.service.getReasonFlight(data.CompanyId).subscribe(
      results => {
         this.lsReasonFlight = results;
      },
      err => {
         console.log('error results', err);
      }
    );
  }

  TraerAutorizador() {
    let infraction;
    if (this.LPolicies.length > 0) {
      infraction = true;
    } else {
      infraction = false;
    }
    let prefix;
    if (this.datosuser.gender === 'M') {
      prefix = 'MR';
    } else {
      prefix = 'MRS';
    }

    let fechatotal;
    let fecha = this.datosuser.birthDate.substr(0, 10);
    let fechaformat = fecha.split('-');
    let año = fechaformat[0];
    let mes = fechaformat[1];
    let dia = fechaformat[2];
    fechatotal = año + '/' + mes + '/' + dia;

    let datosusuario =
    [{
      "PassengerId": 1,
			"PersonId": this.datosuser.personId,
			"Prefix": prefix,
			"Type": "ADT",
			"Name": this.datosuser.firstName,
			"LastName": this.datosuser.lastName,
			"Gender": this.datosuser.gender,
			"BirthDate": fechatotal,
			"Odocument": this.datosuser.odocument,
			"FrequentFlyer": this.datosuser.frequentFlyer,
      "IsVIP": this.datosuser.isVIP,
      "lcostCenter": this.datosuser.lcostCenter
    }];

    let data = {
      "Ocompany": this.ocompany,
	    "FlightNational": this.flightNational,
    	'Infraction': infraction,
	    "Lpassenger": datosusuario
    }

    this.service.GetApprovers(data).subscribe(
      results => {
        this.lsapprovers = results;
        this.sessionStorageService.store('lsapprover', null);
        this.sessionStorageService.store('lsapprover', this.lsapprovers);
      },
      err => {
        console.log(err);
      }
    ) 
  }

  Comprar() {
    let prefix;
    if (this.datosuser.gender === 'M') {
      prefix = 'MR';
    } else {
      prefix = 'MRS';
    }
    let fechatotal;
    let fecha = this.datosuser.birthDate.substr(0, 10);
    let fechaformat = fecha.split('-');
    let año = fechaformat[0];
    let mes = fechaformat[1];
    let dia = fechaformat[2];
    fechatotal = año + '/' + mes + '/' + dia;
    this.email = this.datosuser.email;
    this.phone = this.datosuser.phone;
    this.userid = this.datosuser.userId;
    let idmotivo = $('#cbomotivo option:selected').val();

    this.datosusuario =
    [{
      "PassengerId": 1,
			"PersonId": this.datosuser.personId,
			"Prefix": prefix,
			"Type": "ADT",
			"Name": this.datosuser.firstName,
			"LastName": this.datosuser.lastName,
			"Gender": this.datosuser.gender,
			"BirthDate": fechatotal,
			"Odocument": this.datosuser.odocument,
			"FrequentFlyer": this.datosuser.frequentFlyer,
			"IsVIP": this.datosuser.isVIP
    }];
    this.sessionStorageService.store('datosusuario', this.datosusuario);
    this.sessionStorageService.store('sectioninfo', this.LSection);
    this.sessionStorageService.store('sectionservice', this.LSectionPassenger);
    this.sessionStorageService.store('politicas', this.LPolicies);
    this.sessionStorageService.store('lsuser', this.datosuser);
    this.sessionStorageService.store('idmotivo', idmotivo);
    this.router.navigate(['/reserva-vuelo-compra']);
  }

}
