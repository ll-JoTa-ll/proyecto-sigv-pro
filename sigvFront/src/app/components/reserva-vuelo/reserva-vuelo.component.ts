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
import { FlightService } from '../../services/flight.service';
import { ModalSesionExpiradaComponent } from '../shared/modal-sesion-expirada/modal-sesion-expirada.component';
import { ModalSesionExpiradaVuelosComponent } from '../shared/modal-sesion-expirada-vuelos/modal-sesion-expirada-vuelos.component';
import { ModalSesionWarningVuelosComponent } from '../shared/modal-sesion-warning-vuelos/modal-sesion-warning-vuelos.component';

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
  modalRefSessionWarning: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
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
  uidByCompanyC: any[] = [];
  uidByCompanyP: any[] = [];
  htmlTxtC: string;
  flagHtmlC = false;
  htmlTxtP: string;
  flagHtmlP = false;
  idinterval: any;
  numero1: any;
  telefonocontacto: any;

  constructor(
    private modalService: BsModalService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private service: AirportService,
    private router: Router,
    private bnIdle: BnNgIdleService,
    private flightService: FlightService
  ) {
    this.datarequest = this.sessionStorageService.retrieve('ss_FlightAvailability_request1');
    this.flightAvailability_request = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.flightAvailability_result = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.tipovuelo = this.sessionStorageService.retrieve('tipovuelo');
    this.sessionStorageService.store('tipovuelo', null);
    this.datosuser = sessionStorageService.retrieve('objusuarios');
    this.htmlTxtC = "";
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
    this.ReasonFlight();
  }

  ngAfterViewInit() {
    let count = this.sessionStorageService.retrieve('count');
    if (count === undefined || count === null || count === '') {
      count = true;
    }
    if (count === true) {
      this.startCountDown(600, this.modalexpired);
    }
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
    let back;
    let interval;
    back = true;
    this.sessionStorageService.store('indregresar', back);
    this.sessionStorageService.store('idinterval', this.idinterval);
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
         console.log('error results', err);
      },
      () => {
        this.getUidByCompany();
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
    return val;
  }

  ValidarCorreoContacto() {
    let val;
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (regex.test($('#contactocorreo').val().trim())) {
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
      console.log(counter);
      if (counter === 300) {
        this.modalRefSessionWarning = this.modalService.show(ModalSesionWarningVuelosComponent, this.config);
      }
      if (counter < 0 ) {
        clearInterval(interval);
        //alert("SI FUCIONA")
        this.modalRefSessionExpired = this.modalService.show(ModalSesionExpiradaVuelosComponent, this.config);
        //this.router.navigate(['login'])
      }
    }, 1000);
    this.idinterval = interval;
    return interval;
  }

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
        if ($('#txtnacionalidad_' + (index + 1)).val().length <= 0) {
          $('#txtnacionalidad_' + (index + 1)).addClass('campo-invalido');
          val = false;
        } else {
          $('#txtnacionalidad_' + (index + 1)).removeClass('campo-invalido');
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

    if ($('#nombrecontacto').val().length <= 0) {
      $('#nombrecontacto').addClass('campo-invalido');
      val = false;
    } else {
      $('#nombrecontacto').removeClass('campo-invalido');
    }

    if ($('#contactotelefono').val().length <= 0) {
      $('#contactotelefono').addClass('campo-invalido');
      val = false;
    } else {
      $('#contactotelefono').removeClass('campo-invalido');
    }

    return val;
  }

  obtenernumero1($event) {
    this.numero1 = $event;
    console.log("1" , this.numero1);
  }

  obtenerNumeroContacto($event) {
    this.telefonocontacto = $event;
    console.log("2", this.telefonocontacto);
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
      let email1: any;
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
        description: item.odocument.description,
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
    const valmail = this.ValidarCorreoContacto();
    if (!val || !valcorreo || !valmail) {
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



  getUidByCompany() {
    console.log("getUidByCompany");
    const companyId = this.loginDataUser.ocompany.companyId;
    this.flightService.getUidByCompany(companyId  ).subscribe(
      result => {
        console.log("result: " + JSON.stringify(result));
        if (result != null) {
          this.uidByCompanyC = result.filter(x => x.typeUid === 'C');
          this.uidByCompanyP = result.filter(x => x.typeUid === 'P');
          console.log("this.uidByCompanyC: " + this.uidByCompanyC.length);
          console.log("this.uidByCompanyP: " + this.uidByCompanyP.length);
        }
      },
      err => {},
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
    console.log("setInformacionAdicional");
    if (lstUidByCompanyC.length > 0) {
      let htmlTxtC = "";
      const lstTxtC = lstUidByCompanyC.filter(x => x.isList === false);
      const lstCbxC = lstUidByCompanyC.filter(x => x.isList === true);
      console.log("lstTxtC: " + lstTxtC.length);
      console.log("lstCbxC: " + lstCbxC.length);
      let flagC = 0;
      lstTxtC.forEach(function(txt, index) {
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

      lstCbxC.forEach(function(cbx, index) {
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
          lstPadre.forEach(function(padre, indexPadre) {
            const lstHijos = lstHijosNietos.filter(x => x.parent === padre.id);
            if (lstHijos.length > 0) {
              htmlTxtC += "<optgroup label='  " + padre.description + "'>";
              lstHijos.forEach(function(hijo, indexHijo) {
                const lstNietos = lstHijosNietos.filter(y => y.parent === hijo.id);
                if (lstNietos.length > 0) {
                  htmlTxtC += "<optgroup label='" + hijo.description + "'>";
                  lstNietos.forEach(function(nieto, indexnieto) {
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
      console.log(htmlTxtC);
      this.htmlTxtC = htmlTxtC;


      if (flagC === 1) {
        this.flagHtmlC = true;
      }

    }
  }

  setHijoNieto(lstCbxC) {

  }

  setInformacionPasajeros(lstUidByCompanyP) {
    console.log("setInformacionPasajeros");
    //this.htmlTxtP = this.htmlTxtC;
    if (lstUidByCompanyP.length > 0) {
      let htmlTxtP = "";
      const lstTxtC = lstUidByCompanyP.filter(x => x.isList === false);
      const lstCbxC = lstUidByCompanyP.filter(x => x.isList === true);
      let flagC = 0;
      lstTxtC.forEach(function(txt, index) {
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

      lstCbxC.forEach(function(cbx, index) {
        flagC = 1;

        const llistUid = cbx.llistUid;
        const lstPadre = llistUid.filter(x => x.parent === 0);
        const lstHijosNietos = llistUid.filter(x => x.parent > 0);

        htmlTxtP += "<div class='col-6 m-0 p-0 pt-2'>";
        htmlTxtP += cbx.title;
        htmlTxtP += "</div>";

        htmlTxtP += "<div class='col-6 m-0 p-0 pt-2'>";

        htmlTxtP += "<select class='form-control'>";
        lstPadre.forEach(function(padre, indexPadre) {
          const lstHijos = lstHijosNietos.filter(x => x.parent === padre.id);
          if (lstHijos.length > 0) {
            htmlTxtP += "<optgroup label='" + padre.description + "'>";
            lstHijos.forEach(function(hijo, indexHijo) {
              const lstNietos = lstHijosNietos.filter(y => y.parent === hijo.id);
              if (lstNietos.length > 0) {
                htmlTxtP += "<optgroup label='" + hijo.description + "'>";
                lstNietos.forEach(function(nieto, indexnieto) {
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
      console.log(htmlTxtP);
      this.htmlTxtP = htmlTxtP;
      this.flagHtmlP = true;
    } else {
      this.flagHtmlP = true;
    }
  }
}
