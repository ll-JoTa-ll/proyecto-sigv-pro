import { Component, OnInit, Input,ViewChild, Output, EventEmitter, TemplateRef, AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../../environments/environment';
import { AirportService } from '../../services/airport.service';
import { IDatosUser } from '../../models/IDatosUser';
import { ICostCenter } from 'src/app/models/ICostCenter';
import { IReasonFlight } from 'src/app/models/IReasonFlight';
import { Router } from '@angular/router';
import { IGetApprovers } from '../../models/IGetApprovers.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromStringWithSourceMap } from 'source-list-map';
import { BnNgIdleService } from 'bn-ng-idle';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-vuelo',
  templateUrl: './reserva-vuelo.component.html',
  styleUrls: ['./reserva-vuelo.component.sass']
})
export class ReservaVueloComponent implements OnInit, AfterViewInit {

  modalRef: BsModalRef;
  modalRefSessionExpired: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  @ViewChild("modalexpired", {static: false}) modalexpired;
  flightAvailability_request;
  datarequest;
  flightAvailability_result;
  tipovuelo;
  loginDataUser;
  lst_rol_autogestion;
  lst_rol_autorizador;
  LSection;
  LPolicies;
  datosuser: any[] = [];
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
    private router: Router,
    private bnIdle: BnNgIdleService
  ) {
    this.datarequest = this.sessionStorageService.retrieve('ss_FlightAvailability_request1');
    this.flightAvailability_request = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.flightAvailability_result = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.tipovuelo = this.sessionStorageService.retrieve('tipovuelo');
    this.sessionStorageService.store('tipovuelo', null);
    this.datosuser = sessionStorageService.retrieve('objusuarios');
  }

  ngOnInit() {
    window.scrollTo(0, 0);
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

    //this.CostCenter();
    this.ReasonFlight();
  }

  ngAfterViewInit() {
   // this.startCountDown(40, this.modalexpired);
    console.log('ngAfterViewInit vuelos');
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


  ValidarCorreo() {
    let val;
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.datosuser.forEach(function(item, index) {
      if (regex.test($('#txtcorreo_' + (index + 1)).val().trim())) {
           val = true;
      } else {
          $('#txtcorreo_' + (index + 1)).addClass('campo-invalido');
          val = false;
          return;
      }
    });
    if (regex.test($('#contactocorreo').val().trim())) {
      val = true;
    } else {
     val = false;
    }
     return val;
  }

  /*
  startCountDown(seconds, template) {
    var counter = seconds;
    var interval = setInterval(() => {
    console.log(counter);
    counter--;
    if (counter < 0 ) {
    clearInterval(interval);
    //alert("SI FUCIONA")
    this.modalRefSessionExpired = this.modalService.show(
    template,
    Object.assign({}, { class: 'gray con-session-expired' })
    );
    //this.router.navigate(['login'])
    } 
    }, 1000);
    }*/

  ValidarCampos() {
    let val = true;
    let valtelefono;
    let valcorreo;
    this.datosuser.forEach(function(item, index) {
        if ($('#txtnombre_' + (index + 1)).val().length <= 0) {
          val = false;
          $('#txtnombre_' + (index + 1)).addClass('campo-invalido');
        } else {
          $('#txtnombre_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#txtapellidos_' + (index + 1)).val().length <= 0) {
          $('#txtapellidos_' + (index + 1)).addClass('campo-invalido');
          val = false;
        } else {
          $('#txtapellidos_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#txtnrodocumento_' + (index + 1)).val().length <= 0) {
          $('#txtnrodocumento_' + (index + 1)).addClass('campo-invalido');
          val = false;
        } else {
          $('#txtnrodocumento_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#cbo_tipodocumento_' + (index + 1)).val().trim() === '') {
          $('#cbo_tipodocumento_' + (index + 1)).addClass('campo-invalido');
          val = false;
        } else {
          $('#cbo_tipodocumento_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#cbotratamiento_' + (index + 1)).val().trim() === '') {
          $('#cbotratamiento_' + (index + 1)).addClass('campo-invalido');
          val = false;
        } else {
          $('#cbotratamiento_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#txtcorreo_' + (index + 1)).val().length <= 0) {
          $('#txtcorreo_' + (index + 1)).addClass('campo-invalido');
          valcorreo = true;
          val = false;
        } else {
          $('#txtcorreo_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#txttelefono_' + (index + 1)).val().length <= 0) {
          $('#txttelefono_' + (index + 1)).addClass('campo-invalido');
          valtelefono = true;
          val = false;
        } else {
          $('#txttelefono_' + (index + 1)).removeClass('campo-invalido');
        }
    });
    if ($('#contactocorreo').val().length <= 0) {
      $('#contactocorreo').addClass('campo-invalido');
      val = false;
    } else {
      $('#contactocorreo').removeClass('campo-invalido');
    }

    if ($('#contactotelefono').val().length <= 0) {
      $('#contactotelefono').addClass('campo-invalido');
      val = false;
    } else {
      $('#contactotelefono').removeClass('campo-invalido');
    }

    if ($('#nombrecontacto').val().length <= 0) {
      $('#nombrecontacto').addClass('campo-invalido');
      val = false;
    } else {
      $('#nombrecontacto').removeClass('campo-invalido');
    }

    return val;
  }


  Comprar() {
    let idmotivo = $('#cbomotivo option:selected').val();

    let datosusuario: any[] = [];
    let contacto: any;
    let mail : any = [];
    let phone: any = [];
    let email2;
    let telefono2;
    let nombrecontacto;
    email2 = $('#contactocorreo').val();
    telefono2 = $('#contactotelefono').val();
    nombrecontacto = $('#nombrecontacto').val();
    this.datosuser.forEach(function(item, index) {
      let prefix;
      let nombre;
      let apellido;
      let fechanacimiento;
      let typedoc;
      let nrodoc;
      let email1 : any;
      let telefono1;

      let fechatotal;
      let fecha = item.birthDate.substr(0, 10);
      let fechaformat = fecha.split('-');
      let año = fechaformat[0];
      let mes = fechaformat[1];
      let dia = fechaformat[2];
      fechatotal = año + '/' + mes + '/' + dia;

      nombre = $('#txtnombre_' + (index + 1)).val();
      apellido = $('#txtapellidos_' + (index + 1)).val();
      fechanacimiento = fechatotal,
      typedoc = $('#cbo_tipodocumento_' + (index + 1) + ' '  + 'option:selected').val();
      nrodoc = $('#txtnrodocumento_' + (index + 1)).val();
      prefix = $('#cbotratamiento_' + (index + 1) + ' '  + 'option:selected').val();
      email1 = $('#txtcorreo_' + (index + 1)).val();
      telefono1 = $('#txttelefono_' + (index + 1)).val();
      let odocument = {
        description: 'Documento Nacional',
        number: nrodoc,
        type: typedoc
      }

      const objuser = {
        "PassengerId": index + 1,
        "PersonId": item.personId,
        "Prefix": prefix,
        "Type": "ADT",
        "Name": nombre,
        "LastName": apellido,
        "Gender": item.gender,
        "PhoneNumber": telefono1,
        "Email": email1,
        "BirthDate": fechanacimiento,
        "Odocument": odocument,
        "FrequentFlyer": item.frequentFlyer,
        "IsVIP": item.isVIP
       }
      datosusuario.push(objuser);
    });


    contacto = {
      "ContactName": nombrecontacto,
      "ContactEmail": email2,
      "ContactPhone": telefono2
    }
    const valcorreo = this.ValidarCorreo();
    const val = this.ValidarCampos();
    if (!val || !valcorreo) {
      return val;
    } else {
      this.sessionStorageService.store('contacto', contacto);
      this.sessionStorageService.store('datosusuario', datosusuario);
      this.sessionStorageService.store('sectioninfo', this.LSection);
      this.sessionStorageService.store('sectionservice', this.LSectionPassenger);
      this.sessionStorageService.store('politicas', this.LPolicies);
      this.sessionStorageService.store('idmotivo', idmotivo);
      this.router.navigate(['/reserva-vuelo-compra']);
    }
  }
}
