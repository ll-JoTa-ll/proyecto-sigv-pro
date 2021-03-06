import { Component, OnInit, Input, ViewChild, Output, EventEmitter, TemplateRef, AfterViewInit } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ICostCenter } from 'src/app/models/ICostCenter';
import { IReasonFlight } from 'src/app/models/IReasonFlight';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromStringWithSourceMap } from 'source-list-map';
import { BnNgIdleService } from 'bn-ng-idle';
import { IGetApprovers } from 'src/app/models/IGetApprovers.model';
import { IGetPaisesModel } from 'src/app/models/IGetPaises';
import { IRegulationsModel } from 'src/app/models/IRegulations';
import { IProfileModel } from 'src/app/models/IProfileModel';
import { AirportService } from 'src/app/services/airport.service';
import { FlightService } from 'src/app/services/flight.service';
import { ModalSesionWarningVuelosComponent } from 'src/app/components/shared/modal-sesion-warning-vuelos/modal-sesion-warning-vuelos.component';
import { ModalSesionExpiradaVuelosComponent } from 'src/app/components/shared/modal-sesion-expirada-vuelos/modal-sesion-expirada-vuelos.component';
import { ModalErrorServiceComponent } from 'src/app/components/shared/modal-error-service/modal-error-service.component';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
import { MotivoViajeComponent } from 'src/app/components/reserva-vuelo/motivo-viaje/motivo-viaje.component';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-resumen-vuelo-hotel',
  templateUrl: './resumen-vuelo-hotel.component.html',
  styleUrls: ['./resumen-vuelo-hotel.component.sass']
})
export class ResumenVueloHotelComponent implements OnInit, AfterViewInit {

  modalRef: BsModalRef;
  modalRefSessionExpired: BsModalRef;
  modalRefSessionWarning: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  modalerror: BsModalRef;
  @ViewChild("modalexpired", { static: false }) modalexpired;
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
  listadocument: any[] = [];
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
  hotelSelected: IGetEnhancedHotel;
  flightNational;
  uidByCompanyC: any[] = [];
  uidByCompanyP: any[] = [];
  htmlTxtC: string;
  flagHtmlC = false;
  htmlTxtP: string;
  flagHtmlP = false;
  idinterval: any;
  numero1: any;
  lstCodes: any[] = [];
  telefonocontacto: any;
  lstpaises: IGetPaisesModel[] = [];
  emailsolicitud;
  lstRegulaciones: IRegulationsModel;
  lstrulestramo: any[] = [];
  flagrules;
  flagerror;
  lstprofiles: IProfileModel;
  flagactive: boolean;
  numeropasajero;
  lstbag;
  contacto_outCorreo: any;
  contacto_outTelefono: any;
  contacto_outNombre: any;
  contacto_outArea: any;
  @ViewChild('reason', { static: false }) reasonVuelo: MotivoViajeComponent;

  constructor(
    private modalService: BsModalService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private service: AirportService,
    private router: Router,
    private bnIdle: BnNgIdleService,
    private flightService: FlightService,
    private spinner: NgxSpinnerService) {
    this.GetPaises();
    this.hotelSelected = this.sessionStorageService.retrieve("confirmacion");
    console.log(this.hotelSelected);
    this.datarequest = this.sessionStorageService.retrieve('ss_FlightAvailability_request1');
    this.flightAvailability_request = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.flightAvailability_result = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.tipovuelo = this.sessionStorageService.retrieve('tipovuelo');
    this.datosuser = sessionStorageService.retrieve('objusuarios');
    this.htmlTxtC = "";
    this.flagrules = false;
    this.flagerror = false;
    this.lstbag = this.flightAvailability_result.lsectionBaggages;
  }

  ngOnInit() {
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
    this.GetExtraProfile();
    window.scrollTo(0, 0);
    this.LSection = this.flightAvailability_request.Lsections;
    this.LSectionPassenger = this.datarequest.Lsections;
    this.LPolicies = this.flightAvailability_result.lpolicies;
    this.ocompany = this.flightAvailability_request.Ocompany;
    this.currency = this.flightAvailability_request.Currency;
    this.numberpassengers = this.flightAvailability_request.NumberPassengers;
    this.osession = this.flightAvailability_result.osession;
    this.carrierId = this.flightAvailability_request.CarrierId;
    this.pseudo = this.flightAvailability_request.Pseudo;
    this.gds = this.flightAvailability_request.Gds;
    this.flightNational = this.flightAvailability_request.FlightNational;
    this.ReasonFlight();
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
    let count = this.sessionStorageService.retrieve('count');
    if (count === undefined || count === null || count === '') {
      count = true;
    }
    if (count === true) {
      this.startCountDown(600, this.modalexpired);
    }
    let back;
    let interval;
    back = true;
    this.sessionStorageService.store('indregresar', back);
  }

  GetExtraProfile() {
    let data = {
      userId: this.loginDataUser.userId
    };
    this.service.GetExtraProfile(data.userId).subscribe(
      result => {
        this.lstprofiles = result;
        if (this.lstprofiles != null) {
          if (this.lstprofiles.oerror === null) {
            this.flagactive = true;
          } else {
            this.flagactive = false;
          }
        } else {
          this.flagactive = true;
        }
      },
      err => {

      },
      () => {
      }
    )
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
      }
    );
  }

  /*
  back2() {
    if (history.go(-1)) {
      this.router.navigate(['/vuelos']);
      let back;
      let interval;
      back = true;
      this.sessionStorageService.store('indregresar', back);
    }
  }
*/
  outCorreo($event) {
    this.contacto_outCorreo = $event;
  }

  outTelefono($event) {
    this.contacto_outTelefono = $event;
  }

  outNombre($event) {
    this.contacto_outNombre = $event;
  }

  outArea($event) {
    this.contacto_outArea = $event;
  }

  Back() {
    this.router.navigate(['/vuelos']);
    let back;
    let interval;
    back = true;
    this.sessionStorageService.store('indregresar', back);
    this.sessionStorageService.store('count', true);
    clearInterval(this.idinterval);
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
      },
      () => {
        // this.getUidByCompany();
      }
    );
  }




  ValidarCorreo() {
    let val;
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.datosuser.forEach(function (item, index) {
      if (regex.test($('#txtcorreo_' + (index + 1)).val().trim())) {
        val = true;
      } else {
        $('#txtcorreo_' + (index + 1)).addClass('campo-invalido');
        val = false;
        return;
      }
    });
    return val;
  }

  ValidarCorreoContacto() {
    let val;
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test($('#correo').val().trim())) {
      val = true;
    } else {
      val = false;
    }
    return val;
  }

  startCountDown(seconds, template) {
    var counter = seconds;
    var interval = setInterval(() => {
      counter--;
      if (counter === 300) {
        this.modalRefSessionWarning = this.modalService.show(ModalSesionWarningVuelosComponent, this.config);
      }
      if (counter < 0) {
        clearInterval(interval);
        //alert("SI FUCIONA")
        this.modalRefSessionExpired = this.modalService.show(ModalSesionExpiradaVuelosComponent, this.config);
        //this.router.navigate(['login'])
      }
    }, 1000);
    this.idinterval = interval;
    this.sessionStorageService.store('idinterval', this.idinterval);
    return interval;
  }

  GetPaises() {
    this.service.GetPaises().subscribe(
      result => {
        this.lstpaises = result;
      },
      err => {

      },
      () => {
      }
    )
  }


  ValidarCampos() {
    try {
      let val = true;
      let valtelefono;
      let valcorreo;
      this.datosuser.forEach(function (item, index) {
        if ($('#txtnombre_' + (index + 1)).val()==='') {
          val = false;
          $('#txtnombre_' + (index + 1)).addClass('campo-invalido');
        } else {
          $('#txtnombre_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#reason').val()==='') {
          val = false;
          $('#reason').addClass('campo-invalido');
        } else {
          $('#reason').removeClass('campo-invalido');
        }
        if ($('#txtapellidos_' + (index + 1)).val()==='') {
          $('#txtapellidos_' + (index + 1)).addClass('campo-invalido');
          val = false;
        } else {
          $('#txtapellidos_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#txtnrodocumento_' + (index + 1)).val()==='') {
          $('#txtnrodocumento_' + (index + 1)).addClass('campo-invalido');
          val = false;
        } else {
          $('#txtnrodocumento_' + (index + 1)).removeClass('campo-invalido');
        }
        /*  if ($('#txtnacionalidad_' + (index + 1)).val()==='') {
            $('#txtnacionalidad_' + (index + 1)).addClass('campo-invalido');
            val = false;
          } else {
            $('#txtnacionalidad_' + (index + 1)).removeClass('campo-invalido');
          }*/
        if ($('#cbo_nacionalidad_' + (index + 1)).val().trim() === '') {
          $('#cbo_nacionalidad_' + (index + 1)).addClass('campo-invalido');
          val = false;
        } else {
          $('#cbo_nacionalidad_' + (index + 1)).removeClass('campo-invalido');
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
        if ($('#txtcorreo_' + (index + 1)).val()==='') {
          $('#txtcorreo_' + (index + 1)).addClass('campo-invalido');
          valcorreo = true;
          val = false;
        } else {
          $('#txtcorreo_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#txtfecha_' + (index + 1)).val()==='') {
          $('#txtfecha_' + (index + 1)).addClass('campo-invalido');
          valcorreo = true;
          val = false;
        } else {
          $('#txtfecha_' + (index + 1)).removeClass('campo-invalido');
        }
        if ($('#txttelefono_' + (index + 1)).val()==='') {
          $('#txttelefono_' + (index + 1)).addClass('campo-invalido');
          valtelefono = true;
          val = false;
        } else {
          $('#txttelefono_' + (index + 1)).removeClass('campo-invalido');
        }
      });
      if ($('#correo').val()==='') {
        $('#correo').addClass('campo-invalido');
        val = false;
      } else {
        $('#correo').removeClass('campo-invalido');
      }

      if ($('#nombre').val()==='') {
        $('#nombre').addClass('campo-invalido');
        val = false;
      } else {
        $('#nombre').removeClass('campo-invalido');
      }

      if ($('#numero').val()==='') {
        $('#numero').addClass('campo-invalido');
        val = false;
      } else {
        $('#numero').removeClass('campo-invalido');
      }

      return val;

    } catch (error) {
      return false;
    }

  }

  //prueba
  SendEmail() {
    // tslint:disable-next-line: semicolon
    this.emailsolicitud = "<html> <head> <title>Document</title> <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' rel='stylesheet'> <style> @font-face { font-family: 'Omnes-bold'; src: url('https://sigvplus.azurewebsites.net/sigvFront/assets/fonts/Omnes/OmnesBold.ttf'); } @font-face { font-family: 'Omnes-reg'; src: url('https://sigvplus.azurewebsites.net/sigvFront/assets/fonts/Omnes/OmnesReg.ttf'); } @font-face { font-family: 'Omnes-sem'; src: url('https://sigvplus.azurewebsites.net/sigvFront/assets/fonts/Omnes/OmnesSem.ttf'); } @font-face { font-family: 'Omnes-med'; src: url('https://sigvplus.azurewebsites.net/sigvFront/assets/fonts/Omnes/OmnesMedium.otf'); } .row { display: flex; flex-wrap: wrap; padding: 0px; margin: 0px; } .tabla { border-collapse: collapse; width: 100%; } .tabla, td, th { border: 1px solid #ddd; text-align: center; } .fondo { width: 100% !important; background-image: url(' https://domiruthuatsa.z13.web.core.windows.net/assets/images/header.png'); height: 250px; background-repeat: no-repeat; border-radius: 0 0 20px 20px; margin: 0px; padding: 0px; } </style> </head> <body style='padding-left: 350px;'> <div style='width: 983px;'> <div class='row'> <div class='fondo'> <div class='row'> <div style='width: 100%; margin: 0px; padding: 0px; height: 200px; text-align: center; padding-top: 30px;'> <div style='width: 100% !important;'> <img src=' https://domiruthuatsa.z13.web.core.windows.net/assets/images/logoblanco.png' style='width: 150px;'> </div> <div style='width: 100% !important; padding-top: 20px;'> <span style='color: #FFFFFF; font-size: 25px; border-bottom: 2px solid #fff;'>SOLICITUD DE APROBACIÓN DE EXCEPCIÓN</span> </div> </div> <!--  <div style='width: 100%; margin: 0px; padding: 0px; height: 100px;'> <div class='row'> <div style='width: 10%;'></div> <div style='width: 80%; background-color: white !important; height: 100px; border-radius: 20px 20px 0 0;'></div> <div style='width: 10%;'></div> </div> </div>--> </div> </div> </div> <div class='row'> <div style='width: 10% !important;'> </div> <div style='width: 80% !important; box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5); border: 2px solid rgba(219, 223, 227, 0.303017); padding-left: 1%; padding-right: 1%; padding-top: 3%; padding-bottom: 1%; background: white; position: relative !important; bottom: 50px; border-radius: 20px 20px 0 0;'> <div class='row'> <div style='width: 100% !important; padding-top: 3%; padding-bottom: 7%;'> <div class='row'> <div style='width: 50%; text-align: right;'> <span style='border-radius: 10px 0px 0px 10px;background: #6B253C;color: #FDFDFD;padding-left: 35px;padding-right: 35px;padding-top: 24px;padding-bottom: 24px;font-size: 24px;'>Codigo de reserva</span> </div> <div style='width: 50%;'> <span style='border-radius: 10px 0px 0px 10px;background: #FBF6F6 ;padding-left: 90px;padding-right: 90px;padding-top: 24px;padding-bottom: 24px; font-size: 24px;color: #898989;text-align: center;'>LDYMQJ</span></div> </div> </div> </div> <div class='row'> <div style='padding-top: 5%;padding-left: 6%;padding-right: 6%;'> El vuelo seleccionado está infringiendo las políticas de viaje de su empresa </div> <div style='width: 50% !important; border-radius: 40px 0px 40px 0px; padding: 1em; background: white; border: 2px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5); padding-left: 30px;'> <div class='row'> <div> <span><img style='width: 40px;' src=' https://domiruthuatsa.z13.web.core.windows.net/assets/images/time.png'></span><label style='font-family: \"Arial\", Gadget, sans-serif;font-weight: bold; color: #6B253C; font-size: 25px; opacity: 1; padding-left: 10px;'>Solo tienes hasta:</label> </div> </div> <div class='row'> <label style='color: #676767; font-size: 17px; opacity: 1; letter-spacing: 0; padding-left: 50px;font-family: \"Arial\", Gadget, sans-serif;font-weight: bold;'>Las 14:09 del 14 ene. del 2020 para gestionar la Reserva</label> </div> </div> </div> <div class='row'> <div style='width: 100% !important; color: #6B253C; font-size: 20px;font-family: \"Arial\", Gadget, sans-serif;font-weight: bold;'> ● Motivos de Aprobación </div> </div> <div class='row'> <div style='width: 100% !important; padding-left: 10%; padding-right: 10%; text-align: center !important; padding-bottom: 2%; padding-top: 2%;'> <div class='row'> <div style='font-family: \"Arial\", Gadget, sans-serif;font-weight: bold; width: 100%; box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5); padding-bottom: 2%; padding-top: 2%; border: 2px solid rgba(219, 223, 227, 0.303017);'> </div> </div> </div> </div> <div class='row'> <div style='width: 100% !important; color: #6B253C; font-size: 20px; font-family: \"Arial\", Gadget, sans-serif;font-weight: bold;'> ● Autorizadores </div> </div> <div class='row' style='padding-left: 3%; padding-right: 3%; padding-top: 1%; padding-bottom: 1%;'> <div style='width: 100% !important; box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5); border: 2px solid rgba(219, 223, 227, 0.303017);'> <div class='row'> <div style='width: 100% !important; padding-top: 2%; padding-bottom: 2%;'> <span style='background: transparent linear-gradient(99deg, #ED1C24 0%, #D51A2C 34%, #3C4749 100%) 0% 0% no-repeat padding-box; border-radius: 0px 23px 23px 0px; color: #FFFFFF; padding: 7px 90px 7px 30px;'>AUTORIZADORES</span> </div> </div> <div class='row'> <div style='width: 100%; text-align: center !important; padding-left: 2%; padding-right: 2%; padding-bottom: 2%;'> <table class='tabla'> <thead style='color: #676767; background: #FBF6F6 0% 0% no-repeat padding-box; font-size: 14px;'> <th>Nombres</th> <th>Correo</th> </thead> <tbody style='color: #3D3D3D; font-size: 14px;'> <tr><td>JOSE ALONSO MEDINA RODRIGUEZ</td><td>analista2@domiruth.com</td></tr><tr><td>URSULA CAMACHO PELOSI</td><td>analista2@domiruth.com</td></tr> </tbody> </table> </div> </div> </div> </div> <div class='row'> <div style='width: 100% !important; color: #6B253C; font-size: 20px; font-family: \"Arial\", Gadget, sans-serif;font-weight: bold;'> ● Se requiere la aprobacion de los siguientes pasajeros: </div> </div> <div class='row' style='padding-left: 3%; padding-right: 3%; padding-top: 1%; padding-bottom: 1%;'> <div style='width: 100% !important; box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5); border: 2px solid rgba(219, 223, 227, 0.303017); border-radius: 40px 0 40px 0;'> <div class='row'> <div style='width: 100% !important; padding-top: 2%; padding-bottom: 2%;'> <span style='background: transparent linear-gradient(99deg, #ED1C24 0%, #D51A2C 34%, #3C4749 100%) 0% 0% no-repeat padding-box; border-radius: 0px 23px 23px 0px; color: #FFFFFF; padding: 7px 90px 7px 30px;'>PASAJEROS</span> </div> </div> <div class='row'> <div style='width: 100%; text-align: center !important; padding-left: 2%; padding-right: 2%; padding-bottom: 2%;'> <table class='tabla'> <thead style='color: #676767; background: #FBF6F6 0% 0% no-repeat padding-box; font-size: 14px;'> <th>Nombres</th> <th>DNI</th> <th>Correo</th> <th>Teléfono</th> </thead> <tbody style='color: #3D3D3D; font-size: 14px;'> <tr><td>EDGAR SAUL TORRES URBINA</td><td>44184884</td><td>analista6@domiruth.com</td><td>965788919</tr> </tbody> </table> </div> </div> </div> </div> <div class='row'> <div style='width: 100%; color: #6B253C; font-size: 20px; font-family: \"Arial\", Gadget, sans-serif;font-weight: bold;'> ● El vuelo seleccionado por el pasajero/centralizador es: </div> </div> <div class='row' style='padding-top: 2%; padding-left: 2%; padding-right: 2%;'> <!--Precio adulto--> <div style='width: 30% !important;'> <div class='row'> <div style='width: 100%;border-radius: 40px 0px 40px 0px; border: 1px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5); padding: 1em; background: white;'> <div class='row' style='padding-top: 10px;'> <div style='width: 100%; text-align: right;'> <img style='width: 30px' src=' https://domiruthuatsa.z13.web.core.windows.net/assets/images/medal.png'> </div> </div> <div class='row' style='padding-bottom: 10px;'> <div style='width: 100%; text-align: right;'> <span class='m-0 p-0' style='font-size: 22px; letter-spacing: 0; color: #6B253C; padding-top: 10px;'>USD</span> <span class='m-0 p-0' style='font-size: 30px; letter-spacing: 0; color: #898989;'>471.62</span> </div> </div> <div class='row'> <div style='width: 100%; text-align: right;'> <span style='font-size: 13px; letter-spacing: 0; color: #676767; padding-right: 13px;'>Precio por Adulto</span> <span style='font-size: 13px; letter-spacing: 0; color: #6B253C;'>USD</span> <span style='font-size: 13px; letter-spacing: 0; color: #898989;'>471.62</span> </div> </div> </div> </div> </div> <div style='width: 70% !important; padding-left: 20px;'> <!--section--> <div class='row' style='padding-bottom:20px; padding-top:10px;'><div style='width: 100%; border-radius: 20px 20px 20px 20px; background: white; padding: 1em; border: 1px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5);'><div class='row' style='border-bottom: 1px solid #cccccc; padding-bottom: 20px; padding-top: 30px;'><div style='width: 50%;'><div style='width: 100% !important'><img style='width: 170px; position: relative;left: 36px;top: 21px;' class='m-0 p-0' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/airlines/AV.png'></div><div style='width: 100% !important;'><span style='color: #676767; font-size: 11px; opacity: 100%;'>Aerolinea Operadora :AVIANCA PERU S.A.</span></div></div><div style='text-align: center; padding-top: 20px;padding-left: 46%;'><label style='color: #676767; font-size: 14px; opacity: 100%; width: 40%;'>Vuelo AV140 - Airbus A319</label></div></div><div class='row' style='padding-top: 40px; padding-bottom: 30px;'><div style='width: 40%; text-align: center;'><div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>sáb. 18 ene.</div><div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>01:30</div><div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>LIM</div><div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>Lima</div><div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>Jorge Chavez International</div></div><div style='width: 20%; padding-left: 40px; padding-top: 30px; text-align: center;'><div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>Duracion</div><div class='m-0 p-0' style='color: #676767; font-size: 11px; opacity: 1; letter-spacing: 0;'>3h 15 min</div><div class='m-0 p-0' style='color: #898989; font-size: 14px; opacity: 1; letter-spacing: 0;'>Clase: <label class='m-0 p-0 pl-3' style='color: #898989; font-size: 9px; opacity: 1; letter-spacing: 0;'>Economy Standard - O</label></div></div><div style='width: 40%; padding-left: 50px; text-align: center;'><div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>sáb. 18 ene.</div><div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>04:45</div><div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>BOG</div><div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>Bogota</div><div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>El Nuevo Dorado International</div></div></div></div></div><div class='row' style='padding-bottom:20px; padding-top:10px;'><div style='width: 100%; border-radius: 20px 20px 20px 20px; background: white; padding: 1em; border: 1px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5);'><div class='row' style='border-bottom: 1px solid #cccccc; padding-bottom: 20px; padding-top: 30px;'><div style='width: 50%;'><div style='width: 100% !important'><img style='width: 170px; position: relative;left: 36px;top: 21px;' class='m-0 p-0' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/airlines/AV.png'></div><div style='width: 100% !important;'><span style='color: #676767; font-size: 11px; opacity: 100%;'>Aerolinea Operadora :AVIANCA PERU S.A.</span></div></div><div style='text-align: center; padding-top: 20px;padding-left: 46%;'><label style='color: #676767; font-size: 14px; opacity: 100%; width: 40%;'>Vuelo AV140 - Airbus A319</label></div></div><div class='row' style='padding-top: 40px; padding-bottom: 30px;'><div style='width: 40%; text-align: center;'><div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>jue. 23 ene.</div><div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>21:15</div><div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>BOG</div><div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>Bogota</div><div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>El Nuevo Dorado International</div></div><div style='width: 20%; padding-left: 40px; padding-top: 30px; text-align: center;'><div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>Duracion</div><div class='m-0 p-0' style='color: #676767; font-size: 11px; opacity: 1; letter-spacing: 0;'>3h 10 min</div><div class='m-0 p-0' style='color: #898989; font-size: 14px; opacity: 1; letter-spacing: 0;'>Clase: <label class='m-0 p-0 pl-3' style='color: #898989; font-size: 9px; opacity: 1; letter-spacing: 0;'>Economy Standard - O</label></div></div><div style='width: 40%; padding-left: 50px; text-align: center;'><div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>vie. 24 ene.</div><div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>00:25</div><div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>LIM</div><div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>Lima</div><div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>Jorge Chavez International</div></div></div></div></div> </div> </div> <div class='row'> <div style='width: 100%; padding-bottom: 1%; color: #6B253C; font-size: 20px; font-family: \"Arial\", Gadget, sans-serif;font-weight: bold;'> ● Políticas Infringidas </div> </div> <div class='row' style='padding-left: 3%; padding-right: 3%; padding-top: 1%; padding-bottom: 2%;'> <div style='width: 100%; box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5); border: 2px solid rgba(219, 223, 227, 0.303017);'> <div class='row'> <span style='background: transparent linear-gradient(99deg, #ED1C24 0%, #D51A2C 34%, #3C4749 100%) 0% 0% no-repeat padding-box; border-radius: 0px 23px 23px 0px; color: #FFFFFF; padding: 7px 90px 7px 30px;'>Politicas Infringidas</span> </div> <div style='width:100% !important'><div class='row' style='padding-top: 25px; padding-bottom: 30px; padding-left: 15px;'><img style='width: 40px;' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/calendario.png'><label class='m-0 p-0 pl-3' style=' color: #555555; font-size: 20px; opacity: 1; letter-spacing: 0;padding-left: 2%;'>Dias de Anticipacion</label></div><div class='row'><div style='color: #4A4A4A; font-size: 18px; opacity: 1; letter-spacing: 0; padding-bottom: 20px; padding-left: 20px;'>Infraccion</div><div style='color: #4A4A4A; font-size: 18px; opacity: 1; letter-spacing: 0; text-align: right; width: 1160px; padding-bottom: 20px;padding-right: 174px;'>Impacto</div></div><div class='row' style='padding-left: 20px; padding-right: 20px;'><div style='width: 60%; text-align: center; color: #898989; font-size: 15px; opacity: 1; letter-spacing: 0; border-radius: 20px 0px 20px 0px; border-top : 6px whitesmoke outset; border-bottom : 6px whitesmoke inset; border-right: 6px whitesmoke inset; border-left: 6px whitesmoke outset; padding: 1em; background: white;'>El vuelo seleccionado está infringiendo la política establecida al incumplir los 11 días de anticipación. El pasajero está viajando con 4 día(s) de anticipación.</div><div style='width: 10%;'></div><div style='width: 30%; border-radius: 20px 0px 20px 0px; border-top : 6px whitesmoke outset; border-bottom : 6px whitesmoke inset; border-right: 6px whitesmoke inset; border-left: 6px whitesmoke outset; padding: 1em; background: white; text-align: center;'><span style='color: #3D3D3D; font-size: 18px; opacity: 1; letter-spacing: 0;'>NO HAY IMPACTO</span></div></div></div> </div> </div> <div class='row'> <div style='width: 100%; text-align: center;'> <a type='button' href='http://localhost:4200/1' style='border-radius: 6px; background: #ED1C24 0% 0% no-repeat padding-box; color: #FFFFFF;font-size: 15px; cursor: pointer; padding: 15px 60px 15px 60px;text-decoration: none;' [href]='url'>Gestionar</a> </div> </div> </div> <div style='width: 10% !important;'> </div> </div> </div> </body> </html>"
    let data = {
      "AgencyId": "305E642B-6643-410C-98E9-6E0F4BBAB785",
      "Recipients": ['analista8@domiruth.com'],
      "RecipientsCopy": ['analista8@domiruth.com'],
      "RecipientsHiddenCopy": [],
      "Subject": "demo",
      "Message": this.emailsolicitud
    }
    this.service.SendEmail(data).subscribe(
      results => {
        if (results === true) {
          alert('se envio');
        }
      },
      err => {
      },
      () => {
      }
    );
  }

  GetRegulaciones(template) {
    this.spinner.show();
    const spiner = this.spinner;
    setTimeout(() =>
      spiner.show()
      , 500);
    this.lstrulestramo = [];
    let lsection: any[] = [];
    lsection = this.LSectionPassenger;
    //  lstradiocheck.forEach(function(item) {

    let data = {
      CompanyId: this.loginDataUser.ocompany.companyId,
      Currency: this.currency,
      Code: '1',
      Lsection: lsection
    };
    console.log(data);
    this.RegulacionesService(data, template);
    //  });
  }

  RegulacionesService(data, template) {
    this.service.GetRegulations(data).subscribe(
      result => {
        this.lstRegulaciones = result;
      },
      err => {
        this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
      },
      () => {
        if (this.lstRegulaciones.oError === null) {
          this.flagrules = true;
          this.spinner.hide();
          const spiner = this.spinner;
          setTimeout(() =>
              spiner.hide()
              , 500);
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg m-regulaciones' })
          );
        } else {
          this.spinner.hide();
          const spiner = this.spinner;
          setTimeout(() =>
              spiner.hide()
              , 500);
          this.flagerror = true;
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg m-regulaciones' })
          );
        }
      }
    );
  }

  Comprar(template, template2) {
    var rason = $('#reason').val();
    let idmotivo = $('#cbomotivo option:selected').val();
    let idprofile = $('#cboprofile option:selected').val();
    let datosusuario: any[] = [];
    let contacto: any;
    let mail: any = [];
    let phone: any = [];
    let email2;
    let telefono2;
    let nombrecontacto;
    let correocentralizador;
    email2 = $('#correo').val();
    telefono2 = $('#telefono').val();
    nombrecontacto = $('#contacto').val();
    this.datosuser.forEach(function (item, index) {
      let prefix;
      let nombre;
      let apellido;
      let fechanacimiento;
      let typedoc;
      let nrodoc;
      let email1: any;
      let telefono1;

      let fechatotal;
      let fecha = item.birthDate.substr(0, 10);
      let fechaformat = fecha.split('-');
      let año = fechaformat[0];
      let mes = fechaformat[1];
      let dia = fechaformat[2];
      fechatotal = año + '/' + mes + '/' + dia;
      let nombrepasaj = $('#txtnombre_' + (index + 1)).val();
      let apellidopasaj = $('#txtapellidos_' + (index + 1)).val();
      nombre = $.trim(nombrepasaj);
      apellido = $.trim(apellidopasaj);
      fechanacimiento = fechatotal,
        typedoc = $('#cbo_tipodocumento_' + (index + 1) + ' ' + 'option:selected').val();
      nrodoc = $('#txtnrodocumento_' + (index + 1)).val();
      prefix = $('#cbotratamiento_' + (index + 1) + ' ' + 'option:selected').val();
      email1 = $('#txtcorreo_' + (index + 1)).val();
      telefono1 = $('#txttelefono_' + (index + 1)).val();
      const lcodes =
        [
          {
            Code: 'PP',
            Gds: 'Amadeus'
          },
          {
            Code: 'CE',
            Gds: 'Sabre'
          }
        ]

      const lcodesOne =
        [
          {
            Code: 'PP',
            Gds: 'Amadeus'
          },
          {
            Code: 'PP',
            Gds: 'Sabre'
          }
        ]

      const lcodesTwo =
        [
          {
            Code: 'NI',
            Gds: 'Amadeus'
          },
          {
            Code: 'D',
            Gds: 'Sabre'
          }
        ]


      let odocument = {
        Id: item.lpersonDocuments[0].docTypeId,
        Description: item.lpersonDocuments[0].docName,
        number: nrodoc,
        Lcodes: null,
      }

      if (item.lpersonDocuments[0].docTypeId === '7F0B8721-FC7F-4735-A1AD-7DD8EC485A3C') {
        odocument.Lcodes = lcodes;
      }
      if (item.lpersonDocuments[0].docTypeId === 'DD8D0D83-5E9B-4377-AC1A-A4A806EB0C3A') {
        odocument.Lcodes = lcodesOne;
      }
      if (item.lpersonDocuments[0].docTypeId === 'F3F05B20-412E-4A1A-BA31-B69B1E6D0392') {
        odocument.Lcodes = lcodesTwo;
      }

      const objuser = {
        "UserId": item.userId,
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
        "IsVIP": item.isVIP,
        "LcostCenter": item.lcostCenter,
        "Orole": item.orole
      };
      datosusuario.push(objuser);
    });

    let flagValIgualEmail = 0;
    let lstEmail = [];

    datosusuario.forEach(function (item, index) {
      lstEmail.push(item.Email);
    });

    lstEmail.forEach(function (correo1) {
      let flagCountEmail = 0;
      lstEmail.forEach(function (correo2) {
        if (correo1 == correo2) {
          flagCountEmail++;
        }
      });
      if (flagCountEmail > 1) {
        flagValIgualEmail = 1;
      }
    });

    if (flagValIgualEmail == 1) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
      return false;
    }

    if (this.loginDataUser.orole.roleDescription === 'Centralizador') {
      let correocentralizador;
      let correoigual = 0;
      let pasajeros = [];
      correocentralizador = email2;
      lstEmail.forEach(function (correo, index) {
        let flagcountemail;
        flagcountemail = 0;
        if (correo === correocentralizador) {
          flagcountemail++;
          pasajeros.push(index + 1);
        }
        if (flagcountemail === 1 || flagcountemail > 1) {
          correoigual = 1;
        }
      });
      let pasajero;
      pasajeros.forEach(function (item) {
        pasajero = item;
      });
      this.numeropasajero = pasajero;
      if (correoigual == 1) {
        console.log(this.numeropasajero);
        this.modalRef = this.modalService.show(
          template2,
          Object.assign({}, { class: 'gray modal-lg m-infraccion' })
        );
        return false;
      }
    }

    contacto = {
      "ContactName": nombrecontacto,
      "ContactEmail": email2,
      "ContactPhone": telefono2
    }
    const valcorreo = this.ValidarCorreo();
    const val = this.ValidarCampos();
    const valmail = this.ValidarCorreoContacto();
    if (!val || !valcorreo || !valmail) {
      return val;
    } else {
      this.sessionStorageService.store('idprofile', idprofile);
      this.sessionStorageService.store('contacto', contacto);
      this.sessionStorageService.store('datosusuario', datosusuario);
      this.sessionStorageService.store('sectioninfo', this.LSection);
      this.sessionStorageService.store('sectionservice', this.LSectionPassenger);
      this.sessionStorageService.store('politicas', this.LPolicies);
      this.sessionStorageService.store('idmotivo', idmotivo);
      this.sessionStorageService.store('reason', rason);
      this.router.navigate(['/resumen-vuelo-hotel']);
    }
  }

  getUidByCompany() {
    const companyId = this.loginDataUser.ocompany.companyId;
    const pseudo = this.pseudo;//LIMPE28AX
    this.flightService.getUidByCompany(companyId, pseudo).subscribe(
      result => {
        if (result != null) {
          this.uidByCompanyC = result.filter(x => x.typeUid === 'C');
          this.uidByCompanyP = result.filter(x => x.typeUid === 'P');
        }
      },
      err => {
        this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
      },
      () => {
        if (this.uidByCompanyC.length > 0) {
          this.setInformacionAdicional(this.uidByCompanyC);
        }

        if (this.uidByCompanyP.length > 0) {
          this.setInformacionPasajeros(this.uidByCompanyP);
        }
      }
    );
  }


  setInformacionAdicional(lstUidByCompanyC) {
    if (lstUidByCompanyC.length > 0) {
      let htmlTxtC = "";
      const lstTxtC = lstUidByCompanyC.filter(x => x.isList === false);
      const lstCbxC = lstUidByCompanyC.filter(x => x.isList === true);
      let flagC = 0;
      lstTxtC.forEach(function (txt, index) {
        flagC = 1;
        htmlTxtC += "<div class='col-6 m-0 p-0 pt-2'>";
        htmlTxtC += "";
        htmlTxtC += "";
        htmlTxtC += txt.title;
        htmlTxtC += "";
        htmlTxtC += "</div>";
        htmlTxtC += "<div class='col-6 m-0 p-0 pt-2'>";
        htmlTxtC += "";
        htmlTxtC += "";
        htmlTxtC += "<input class='form-control' type='text'>";
        htmlTxtC += "";
        htmlTxtC += "</div>";
        htmlTxtC += "";
      });

      //this.setHijoNieto(lstCbxC);

      lstCbxC.forEach(function (cbx, index) {
        flagC = 1;

        const llistUid = cbx.llistUid;
        if (llistUid != null) {
          const lstPadre = llistUid.filter(x => x.parent === 0);
          const lstHijosNietos = llistUid.filter(x => x.parent > 0);

          htmlTxtC += "<div class='col-6 m-0 p-0 pt-2'>";
          htmlTxtC += cbx.title;
          htmlTxtC += "</div>";

          htmlTxtC += "<div class='col-6 m-0 p-0 pt-2'>";


          htmlTxtC += "<select class='form-control'>";
          lstPadre.forEach(function (padre, indexPadre) {
            const lstHijos = lstHijosNietos.filter(x => x.parent === padre.id);
            if (lstHijos.length > 0) {
              htmlTxtC += "<optgroup label='  " + padre.description + "'>";
              lstHijos.forEach(function (hijo, indexHijo) {
                const lstNietos = lstHijosNietos.filter(y => y.parent === hijo.id);
                if (lstNietos.length > 0) {
                  htmlTxtC += "<optgroup label='" + hijo.description + "'>";
                  lstNietos.forEach(function (nieto, indexnieto) {
                    htmlTxtC += "<option>" + nieto.description + "</option>";
                  });
                  htmlTxtC += "</optgroup>";
                } else {
                  htmlTxtC += "<option>" + hijo.description + "</option>";
                }
              });
              htmlTxtC += "</optgroup>";
            } else {
              htmlTxtC += "<option>" + padre.description + "</option>";
            }
          });
          htmlTxtC += "</select>";


          htmlTxtC += "</div>";
        }
      });
      this.htmlTxtC = htmlTxtC;


      if (flagC === 1) {
        this.flagHtmlC = true;
      }

    }
  }

  setHijoNieto(lstCbxC) {

  }

  setInformacionPasajeros(lstUidByCompanyP) {
    //this.htmlTxtP = this.htmlTxtC;
    if (lstUidByCompanyP.length > 0) {
      let htmlTxtP = "";
      const lstTxtC = lstUidByCompanyP.filter(x => x.isList === false);
      const lstCbxC = lstUidByCompanyP.filter(x => x.isList === true);
      let flagC = 0;
      lstTxtC.forEach(function (txt, index) {
        flagC = 1;
        htmlTxtP += "<div class='col-6 m-0 p-0 pt-2'>";
        htmlTxtP += "";
        htmlTxtP += "";
        htmlTxtP += txt.title;
        htmlTxtP += "";
        htmlTxtP += "</div>";
        htmlTxtP += "<div class='col-6 m-0 p-0 pt-2'>";
        htmlTxtP += "";
        htmlTxtP += "";
        htmlTxtP += "<input class='form-control' type='text'>";
        htmlTxtP += "";
        htmlTxtP += "</div>";
        htmlTxtP += "";
      });

      //this.setHijoNieto(lstCbxC);

      lstCbxC.forEach(function (cbx, index) {
        flagC = 1;

        const llistUid = cbx.llistUid;
        const lstPadre = llistUid.filter(x => x.parent === 0);
        const lstHijosNietos = llistUid.filter(x => x.parent > 0);

        htmlTxtP += "<div class='col-6 m-0 p-0 pt-2'>";
        htmlTxtP += cbx.title;
        htmlTxtP += "</div>";

        htmlTxtP += "<div class='col-6 m-0 p-0 pt-2'>";

        htmlTxtP += "<select class='form-control'>";
        lstPadre.forEach(function (padre, indexPadre) {
          const lstHijos = lstHijosNietos.filter(x => x.parent === padre.id);
          if (lstHijos.length > 0) {
            htmlTxtP += "<optgroup label='" + padre.description + "'>";
            lstHijos.forEach(function (hijo, indexHijo) {
              const lstNietos = lstHijosNietos.filter(y => y.parent === hijo.id);
              if (lstNietos.length > 0) {
                htmlTxtP += "<optgroup label='" + hijo.description + "'>";
                lstNietos.forEach(function (nieto, indexnieto) {
                  htmlTxtP += "<option>" + nieto.description + "</option>";
                });
                htmlTxtP += "</optgroup>";
              } else {
                htmlTxtP += "<option>" + hijo.description + "</option>";
              }
            });
            htmlTxtP += "</optgroup>";
          } else {
            htmlTxtP += "<option>" + padre.description + "</option>";
          }
        });
        htmlTxtP += "</select>";

        htmlTxtP += "</div>";

      });
      this.htmlTxtP = htmlTxtP;
      this.flagHtmlP = true;
    } else {
      this.flagHtmlP = true;
    }
  }
}
