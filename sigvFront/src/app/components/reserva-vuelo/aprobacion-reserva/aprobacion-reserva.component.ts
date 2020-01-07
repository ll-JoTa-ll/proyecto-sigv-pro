import { Component, OnInit, TemplateRef, AfterViewInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IPnrConfirm } from '../../../models/IPnrConfirm.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { iGetReservation } from '../../../models/IGetReservation.model';
import { AirportService } from '../../../services/airport.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IResultAprobacionReserva } from '../../../models/iResultAprobacion.model';
import { IQueuePnr } from '../../../models/IQueuePnr.model';
import { ToastrService } from 'ngx-toastr';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-aprobacion-reserva',
  templateUrl: './aprobacion-reserva.component.html',
  styleUrls: ['./aprobacion-reserva.component.sass']
})
export class AprobacionReservaComponent implements OnInit, AfterViewInit {

  lspnrresults: IPnrConfirm;
  Lsection;
  LPolicies;
  lsflightavailability;
  lsapprover;
  dataflightavalilability;
  currency;
  fechatimelimit;
  horatimelimit;
  lusers;
  reserva: iGetReservation;
  loginDataUser;
  emailsolicitud;
  plantilla;
  htmlvuelosection;
  htmlpasajeros;
  htmlpoliticas;
  resultAprobacion: IResultAprobacionReserva;
  plantillavueloaprobado;
  plantillavuelorechazado;
  plantillavuelocancelado;
  emailvueloaprobado;
  hora;
  emailvuelorechazado;
  emailvuelocancelado;
  resultscola: IQueuePnr;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private sessionStorageService: SessionStorageService, private modalservice: BsModalService, private service: AirportService,
              private spinner: NgxSpinnerService, private router: Router, private http: HttpClient, private toastr: ToastrService) {
    this.reserva = this.sessionStorageService.retrieve('getreserva');
    this.lusers = this.reserva.lpassenger;
    this.LPolicies = this.reserva.lpolicies;
    this.lsapprover = this.reserva.lauthorizers;
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.plantilla = 'assets/plantillasEmail/plantillaaprobacion.html';
    this.plantillavueloaprobado = 'assets/plantillasEmail/plantilla_vueloaprobado.html';
    this.plantillavuelorechazado = 'assets/plantillasEmail/plantilla_vuelorechazado.html';
    this.plantillavuelocancelado = 'assets/plantillasEmail/plnatilla_vuelocancelado.html';
  }

  ngOnInit() {
    this.FormatearFechaPnr();
    this.Obtenerstring();
    this.ObtenerstringVueloAprobado();
    this.ObtenerstringVueloRechazado();
    this.ObtenerstringVueloCancelado();
  }

  ngAfterViewInit() {
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

  Obtenerstring() {
    this.http.get(this.plantilla, {responseType: 'text'}).subscribe(
      data => {
        this.emailsolicitud = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  ObtenerstringVueloAprobado() {
    this.http.get(this.plantillavueloaprobado, {responseType: 'text'}).subscribe(
      data => {
        this.emailvueloaprobado = data;
      },
      err => {
        console.log(err);
      }
    )
  }

  ObtenerstringVueloRechazado() {
    this.http.get(this.plantillavuelorechazado, {responseType: 'text'}).subscribe(
      data => {
        this.emailvuelorechazado = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  ObtenerstringVueloCancelado() {
    this.http.get(this.plantillavuelocancelado, {responseType: 'text'}).subscribe(
      data => {
        this.emailvuelocancelado = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  FormatearFechaPnr() {
    let data;
    let recorte;
    let fecha;
    let hora;
    data = this.reserva.timeLimit;
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

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalservice.show(
      template,
      Object.assign({}, { class: 'gray modal-lg m-infraccion' })
    );
}

ObtenerSecciones() {
  for (let i = 0; i < this.reserva.litineraries.length; i++) {
    const element = this.reserva.litineraries[i];

  }
}

CapturarHoraAprobacion() {
  let fecha = new Date();
  let hora = fecha.getHours();
  let minutos = fecha.getMinutes();
  this.hora = hora + ':' + minutos;
}

AprobarReserva(template) {
   if (this.reserva.allowedIssue === true && this.reserva.allowedApproved === false) {
    this.modalRef.hide();
  }
   let data = {
    "Pnr": this.reserva.pnr,
    "Pseudo": this.reserva.pseudo,
    "AuthorizerId": this.loginDataUser.userId,
    "Comment": "Aprobacion de vuelo con emision",
    "Ocompany": this.loginDataUser.ocompany
   }
   this.service.AprobarReserva(data).subscribe(
     result => {
       this.resultAprobacion = result;
       // tslint:disable-next-line: max-line-length
       if (this.resultAprobacion.oerror === null) {
        this.modalRef = this.modalservice.show(
          template,
          Object.assign({}, { class: 'gray modal-lg m-infraccion' })
        );
       }
       this.CapturarHoraAprobacion();
     },
     err => {

     },
     () => {
     }
   );
}

EncolarReserva() {
  this.spinner.show();
  this.modalRef.hide();
  let data = {
  "PNR": this.reserva.pnr,
	"Pseudo": this.reserva.pseudo,
	"ocompany": this.loginDataUser.ocompany
  }
  this.service.QueuePnr(data).subscribe(
    results => {
        this.resultscola = results;
        if (this.resultscola.oerror === null) {
          this.toastr.success('', 'Se envio a emitir correctamente', {
            timeOut: 3000
           });
          this.router.navigate(['/mis-reservas-vuelo']);
        }
    },
    err => {

    },
    () => {
    this.spinner.hide();
    }
  )
}

SendMailVueloAprobado() {
  this.spinner.show();
  this.PlantillaEmailSolicitudVueloAprobado();
  this.PlantillaPreciovueloAprobado();
  this.PlantillaPasajerosVueloAprobado();
  this.PlantillaPoliticasVueloAprobado();
  this.PlantillaAutorizadores();
  let mails = [];
  this.reserva.lpassenger.forEach(function(item) {
      if (item.email != null && item.email != '') {
        let mail = item.email.split(';');
        mail.forEach(function(item) {
          mails.push(item);
        });
      }
  });
  this.modalRef.hide();
  let data = {
    "AgencyId": 1,
    "Recipients": mails,
    "RecipientsCopy": ['analista8@domiruth.com', 'juan.caro.1987@gmail.com'],
    "RecipientsHiddenCopy": [],
    "Subject": "VUELO APROBADO",
    "Message": this.emailvueloaprobado
  }
  this.service.SendEmail(data).subscribe(
    results => {
         if (results === true) {
          this.toastr.success('', 'Se envio correctamente', {
            timeOut: 3000
           });
           this.router.navigate(['/gestion-reserva-vuelo']);
         } else {
          this.toastr.error('', 'Error al envio', {
            timeOut: 3000
          });
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

SendMail() {
  this.spinner.show();
  this.PlantillaEmailSolicitud()
  this.PlantillaPreciovuelo();
  this.PlantillaPasajeros();
  this.PlantillaPoliticas();
  let mails = [];
  this.resultAprobacion.lauthorizers.forEach(function(item) {
       mails.push(item.authorizerEmail);
  });
  let data = {
    "AgencyId": 1,
    "Recipients": mails,
    "RecipientsCopy": ['analista8@domiruth.com', 'juan.caro.1987@gmail.com'],
    "RecipientsHiddenCopy": [],
    "Subject": "SOLICITUD APROBACION DE EXCEPCION",
    "Message": this.emailsolicitud
  }
  this.service.SendEmail(data).subscribe(
    results => {
         if (results === true) {
          this.toastr.success('', 'Se envio correctamente', {
            timeOut: 3000
           });
           this.router.navigate(['/gestion-reserva-vuelo']);
         } else {
          this.toastr.error('', 'Error al envio', {
            timeOut: 3000
          });
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

SendMailVueloRechazado() {
  this.spinner.show();
  this.PlantillaEmailSolicitudVueloRechazado();
  this.PlantillaPreciovueloRechazado();
  this.PlantillaPasajerosVueloRechazado();
  this.PlantillaPoliticasVueloRechazado();
  this.PlantillaAutorizadoresRechazo();
  let mails = [];
  this.reserva.lpassenger.forEach(function(item) {
    if (item.email != null && item.email != '') {
      let mail = item.email.split(';');
      mail.forEach(function(item) {
        mails.push(item);
      });
    }
  });
  let data = {
    "AgencyId": 1,
    "Recipients": mails,
    "RecipientsCopy": ['analista8@domiruth.com', 'juan.caro.1987@gmail.com'],
    "RecipientsHiddenCopy": [],
    "Subject": "VUELO RECHAZADO",
    "Message": this.emailvuelorechazado
  }
  this.service.SendEmail(data).subscribe(
    results => {
         if (results === true) {
           this.modalRef.hide();
           this.toastr.success('', 'Se envio correctamente', {
            timeOut: 3000
           });
           this.router.navigate(['/gestion-reserva-vuelo']);
         } else {
          this.toastr.error('', 'Error al envio', {
            timeOut: 3000
          });
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

SendMailVueloCancelado() {
  this.spinner.show();
  this.PlantillaEmailSolicitudVueloCancelado();
  this.PlantillaPreciovueloCancelado();
  this.PlantillaPasajerosVueloCancelado();
  let mails = [];
  this.reserva.lpassenger.forEach(function(item) {
    if (item.email != null && item.email != '') {
      let mail = item.email.split(';');
      mail.forEach(function(item) {
        mails.push(item);
      });
    }
  });
  let data = {
    "AgencyId": 1,
    "Recipients": mails,
    "RecipientsCopy": ['analista8@domiruth.com', 'juan.caro.1987@gmail.com'],
    "RecipientsHiddenCopy": [],
    "Subject": "VUELO CANCELADO",
    "Message": this.emailvuelocancelado
  }
  this.service.SendEmail(data).subscribe(
    results => {
         if (results === true) {
           this.modalRef.hide();
           this.toastr.success('', 'Se envio correctamente', {
            timeOut: 3000
           });
           this.router.navigate(['/mis-reservas-vuelo']);
         } else {
          this.toastr.error('', 'Error al envio', {
            timeOut: 3000
          });
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


RechazarReserva() {
  this.spinner.show();
  let data = {
    "Pnr": this.reserva.pnr,
    "Pseudo": this.reserva.pseudo,
    "AuthorizerId": this.loginDataUser.userId,
    "Comment": "Rechazar reserva",
    "Ocompany": this.loginDataUser.ocompany
   }
  this.service.RechazarReserva(data).subscribe(
     result => {
      this.CapturarHoraAprobacion();
     },
     err => {

     },
     () => {
     this.SendMailVueloRechazado();
     }
   );
}

CancelarReserva() {
  this.spinner.show();
  let data = {
    "UserId": this.loginDataUser.userId,
    "Pnr": this.reserva.pnr,
    "Pseudo": this.reserva.pseudo,
    "StatusReservation": 5,
    "Comment": "",
    "Ocompany": this.loginDataUser.ocompany
   }
  this.service.CancelPnr(data).subscribe(
     result => {
      if (result != 1) {
        return;
      } else {
        this.CapturarHoraAprobacion();
      }
     },
     err => {

     },
     () => {
        this.SendMailVueloCancelado();
     }
   );
}



// SOLICITUD DE EXCEPCION
PlantillaEmailSolicitud() {
  let htmlsection = '';


  for (let j = 0; j < this.reserva.litineraries.length; j++) {
       const itemsegmentgroup = this.reserva.litineraries[j];
       htmlsection += "<div class='row' style='padding-bottom:20px; padding-top:10px;'>";
       htmlsection += "<div style='width: 100%; border-radius: 20px 20px 20px 20px; background: white; padding: 1em; border: 1px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5);'>";
       htmlsection += "<div class='row' style='border-bottom: 1px solid #cccccc; padding-bottom: 20px; padding-top: 30px;'>";
       htmlsection += "<div style='width: 40%;'>";
       htmlsection += "<span class='m-0 p-0'><img style='width: 100px;' class='m-0 p-0' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/airlines/";
       htmlsection += itemsegmentgroup.carrier + ".png'></span>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 20%; text-align: center;  padding-top: 30px;'>";
       htmlsection += "<span style='color: #676767; font-size: 12px; opacity: 100%;'>Aerolinea Operadora :";
       htmlsection += itemsegmentgroup.carrierName;
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
       htmlsection += itemsegmentgroup.departureDate;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.departureTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.origin;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cityOrigin;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.airportOrigin;
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 20%; padding-left: 40px; padding-top: 30px; text-align: center;'>";
       htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
       htmlsection += "Duracion";
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 22px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.totalFlightTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 20px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += "Clase: <label class='m-0 p-0 pl-3' style='color: #898989; font-size: 14px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cabinDescription + " - " + itemsegmentgroup.cabinId;
       htmlsection += "</label>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 40%; padding-left: 50px; text-align: center;'>";
       htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
       htmlsection += itemsegmentgroup.arrivalDate;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.arrivalTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.destination;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cityDestination;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.airportDestination;
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
      }
  this.htmlvuelosection = htmlsection;

  this.emailsolicitud = this.emailsolicitud.replace("@segmentos", this.htmlvuelosection);
}

PlantillaPreciovuelo() {
  this.FormatearFechaPnr();
 // let motivo = $('#motivoviaje').val();
 // this.emailsolicitud = this.emailsolicitud.replace('@motivoaprobacion', motivo);
  this.emailsolicitud = this.emailsolicitud.replace("@fechatimelimit",this.fechatimelimit);
  this.emailsolicitud = this.emailsolicitud.replace("@horatimelimit",this.horatimelimit);
  this.emailsolicitud = this.emailsolicitud.replace(/@currency/gi, this.reserva.currency);
  this.emailsolicitud = this.emailsolicitud.replace("@precioTotal", this.reserva.totalAmount);
  this.emailsolicitud = this.emailsolicitud.replace("@preciounitario", this.reserva.totalAmountByPassenger);
 }

 PlantillaPasajeros() {
  let html = '';
  let mail: any;
  let email = '';
  for (let j = 0; j < this.reserva.lpassenger.length; j++) {
    const item = this.reserva.lpassenger[j];
    mail = item.email.split(';');
    email = mail[0];
    html+="<tr>";
    html+="<td>";
    html+= item.firstName + " " + item.lastName;
    html+="</td>";
    html+="<td>";
    html+= item.documentNumber;
    html+="</td>";
    html+="<td>";
    html+= email;
    html+="</td>";
    html+="<td>";
    html+= item.phone;
    html+= "</td>";
    html+="</tr>";
  }
  this.htmlpasajeros = html;
  this.emailsolicitud = this.emailsolicitud.replace('@pasajeros', this.htmlpasajeros);
 }

 PlantillaPoliticas()
 {
   let html = '';
  for (let i = 0; i < this.reserva.lpolicies.length; i++) {
  const item = this.reserva.lpolicies[i];
   html+= "<div style='width:100% !important'>";
   html+="<div class='row' style='padding-top: 25px; padding-bottom: 30px; padding-left: 15px;'>";
   html+="<img style='width: 40px;' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/calendario.png'><label class='m-0 p-0 pl-3' style='  color: #555555; font-size: 20px; opacity: 1; letter-spacing: 0;'>";
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
    html+=this.reserva.currency;
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


 //VUELO APROBADO
 PlantillaPasajerosVueloAprobado() {
  let html = '';
  let mail : any;
  let email = '';
  let phone: any;
  let telefono = '';
  for (let j = 0; j < this.reserva.lpassenger.length; j++) {
    const item = this.reserva.lpassenger[j];
    mail = item.email.split(';');
    email = mail[0];
    phone = item.phone.split(';');
    telefono = phone[0];
    html+="<tr>";
    html+="<td>";
    html+= item.firstName + " " + item.lastName;
    html+="</td>";
    html+="<td>";
    html+= item.documentNumber;
    html+="</td>";
    html+="<td>";
    html+= email;
    html+="</td>";
    html+="<td>";
    html+= telefono;
    html+= "</td>";
    html+="</tr>";
  }
  this.htmlpasajeros = html;
  this.emailvueloaprobado = this.emailvueloaprobado.replace('@pasajeros', this.htmlpasajeros);
 }

 PlantillaPreciovueloAprobado() {
 // let motivo = $('#motivoviaje').val();
 // this.emailsolicitud = this.emailsolicitud.replace('@motivoaprobacion', motivo);
  let motivo = $('#motivoviaje').val();
  this.emailvueloaprobado = this.emailvueloaprobado.replace(/@currency/gi, this.reserva.currency);
  this.emailvueloaprobado = this.emailvueloaprobado.replace("@precioTotal", this.reserva.totalAmount);
  this.emailvueloaprobado = this.emailvueloaprobado.replace("@preciounitario", this.reserva.totalAmountByPassenger);
  this.emailvueloaprobado = this.emailvueloaprobado.replace("@hora", this.hora);
  this.emailvueloaprobado = this.emailvueloaprobado.replace("@motivoaprobacion", motivo);
 }

 PlantillaPoliticasVueloAprobado()
 {
   let html = '';
  for (let i = 0; i < this.reserva.lpolicies.length; i++) {
  const item = this.reserva.lpolicies[i];
   html+= "<div style='width:100% !important'>";
   html+="<div class='row' style='padding-top: 25px; padding-bottom: 30px; padding-left: 15px;'>";
   html+="<img style='width: 40px;' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/calendario.png'><label class='m-0 p-0 pl-3' style='  color: #555555; font-size: 20px; opacity: 1; letter-spacing: 0;'>";
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
    html+=this.reserva.currency;
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
   this.emailvueloaprobado = this.emailvueloaprobado.replace('@politicas', this.htmlpoliticas);
 }

 PlantillaEmailSolicitudVueloAprobado() {
  let htmlsection = '';
  for (let j = 0; j < this.reserva.litineraries.length; j++) {
       const itemsegmentgroup = this.reserva.litineraries[j];
       htmlsection += "<div class='row' style='padding-bottom:20px; padding-top:10px;'>";
       htmlsection += "<div style='width: 100%; border-radius: 20px 20px 20px 20px; background: white; padding: 1em; border: 1px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5);'>";
       htmlsection += "<div class='row' style='border-bottom: 1px solid #cccccc; padding-bottom: 20px; padding-top: 30px;'>";
       htmlsection += "<div style='width: 40%;'>";
       htmlsection += "<span class='m-0 p-0'><img style='width: 70px;' class='m-0 p-0' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/airlines/";
       htmlsection += itemsegmentgroup.carrier + ".png'></span>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 20%; text-align: center;  padding-top: 30px;'>";
       htmlsection += "<span style='color: #676767; font-size: 12px; opacity: 100%;'>Aerolinea Operadora :";
       htmlsection += itemsegmentgroup.carrierName;
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
       htmlsection += itemsegmentgroup.departureDate;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.departureTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.origin;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cityOrigin;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.airportOrigin;
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 20%; padding-left: 40px; padding-top: 30px; text-align: center;'>";
       htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
       htmlsection += "Duracion";
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 22px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.totalFlightTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 20px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += "Clase: <label class='m-0 p-0 pl-3' style='color: #898989; font-size: 14px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cabinDescription + " - " + itemsegmentgroup.cabinId;
       htmlsection += "</label>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 40%; padding-left: 50px; text-align: center;'>";
       htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
       htmlsection += itemsegmentgroup.arrivalDate;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.arrivalTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.destination;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cityDestination;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.airportDestination;
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
      }
  this.htmlvuelosection = htmlsection;

  this.emailvueloaprobado = this.emailvueloaprobado.replace("@segmentos", this.htmlvuelosection);
}

PlantillaAutorizadores() {
  let bloquehtml = '';
  let htmlautorizador = '';
  for (let i = 0; i < this.reserva.lauthorizers.length; i++) {
    const element = this.reserva.lauthorizers[i];
    htmlautorizador += "<tr>";
    htmlautorizador += "<td>";
    htmlautorizador += element.firstName;
    htmlautorizador += "</td>";
    htmlautorizador += "<td>";
    htmlautorizador += element.email;
    htmlautorizador += "</td>";
    htmlautorizador += "</tr>";
  }
  bloquehtml = htmlautorizador;
  this.emailvueloaprobado = this.emailvueloaprobado.replace("@autorizadores", bloquehtml);
}

//VUELO RECHAZADO

PlantillaPasajerosVueloRechazado() {
  let html = '';
  let mail: any;
  let email = '';
  let phone: any;
  let telefono = '';
  for (let j = 0; j < this.reserva.lpassenger.length; j++) {
    const item = this.reserva.lpassenger[j];
    mail = item.email.split(';');
    email = mail[0];
    phone = item.phone.split(';');
    telefono = phone[0];
    html+="<tr>";
    html+="<td>";
    html+= item.firstName + " " + item.lastName;
    html+="</td>";
    html+="<td>";
    html+= item.documentNumber;
    html+="</td>";
    html+="<td>";
    html+= email;
    html+="</td>";
    html+="<td>";
    html+= telefono;
    html+= "</td>";
    html+="</tr>";
  }
  this.htmlpasajeros = html;
  this.emailvuelorechazado = this.emailvuelorechazado.replace('@pasajeros', this.htmlpasajeros);
 }

 PlantillaPreciovueloRechazado() {
 // this.emailsolicitud = this.emailsolicitud.replace('@motivoaprobacion', motivo);
  let motivo = $('#motivorechazo').val();
  this.emailvuelorechazado = this.emailvuelorechazado.replace(/@currency/gi, this.reserva.currency);
  this.emailvuelorechazado = this.emailvuelorechazado.replace("@precioTotal", this.reserva.totalAmount);
  this.emailvuelorechazado = this.emailvuelorechazado.replace("@preciounitario", this.reserva.totalAmountByPassenger);
  this.emailvuelorechazado = this.emailvuelorechazado.replace("@hora", this.hora);
  this.emailvuelorechazado = this.emailvuelorechazado.replace("@motivorechazo", motivo);
 }

 PlantillaPoliticasVueloRechazado()
 {
   let html = '';
  for (let i = 0; i < this.reserva.lpolicies.length; i++) {
  const item = this.reserva.lpolicies[i];
   html+= "<div style='width:100% !important'>";
   html+="<div class='row' style='padding-top: 25px; padding-bottom: 30px; padding-left: 15px;'>";
   html+="<img style='width: 40px;' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/calendario.png'><label class='m-0 p-0 pl-3' style='  color: #555555; font-size: 20px; opacity: 1; letter-spacing: 0;'>";
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
    html+=this.reserva.currency;
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
   this.emailvuelorechazado = this.emailvuelorechazado.replace('@politicas', this.htmlpoliticas);
 }

 PlantillaEmailSolicitudVueloRechazado() {
  let htmlsection = '';
  for (let j = 0; j < this.reserva.litineraries.length; j++) {
       const itemsegmentgroup = this.reserva.litineraries[j];
       htmlsection += "<div class='row' style='padding-bottom:20px; padding-top:10px;'>";
       htmlsection += "<div style='width: 100%; border-radius: 20px 20px 20px 20px; background: white; padding: 1em; border: 1px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5);'>";
       htmlsection += "<div class='row' style='border-bottom: 1px solid #cccccc; padding-bottom: 20px; padding-top: 30px;'>";
       htmlsection += "<div style='width: 40%;'>";
       htmlsection += "<span class='m-0 p-0'><img style='width: 45px;' class='m-0 p-0' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/airlines/";
       htmlsection += itemsegmentgroup.carrier + ".png'></span>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 20%; text-align: center;  padding-top: 30px;'>";
       htmlsection += "<span style='color: #676767; font-size: 12px; opacity: 100%;'>Aerolinea Operadora :";
       htmlsection += itemsegmentgroup.carrierName;
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
       htmlsection += itemsegmentgroup.departureDate;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.departureTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.origin;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cityOrigin;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.airportOrigin;
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 20%; padding-left: 40px; padding-top: 30px; text-align: center;'>";
       htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
       htmlsection += "Duracion";
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 22px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.totalFlightTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 20px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += "Clase: <label class='m-0 p-0 pl-3' style='color: #898989; font-size: 14px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cabinDescription + " - " + itemsegmentgroup.cabinId;
       htmlsection += "</label>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 40%; padding-left: 50px; text-align: center;'>";
       htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
       htmlsection += itemsegmentgroup.arrivalDate;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.arrivalTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.destination;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cityDestination;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.airportDestination;
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
      }
  this.htmlvuelosection = htmlsection;

  this.emailvuelorechazado = this.emailvuelorechazado.replace("@segmentos", this.htmlvuelosection);
}

PlantillaAutorizadoresRechazo() {
  let bloquehtml = '';
  let htmlautorizador = '';
  for (let i = 0; i < this.reserva.lauthorizers.length; i++) {
    const element = this.reserva.lauthorizers[i];
    htmlautorizador += "<tr>";
    htmlautorizador += "<td>";
    htmlautorizador += element.firstName;
    htmlautorizador += "</td>";
    htmlautorizador += "<td>";
    htmlautorizador += element.email;
    htmlautorizador += "</td>";
    htmlautorizador += "</tr>";
  }
  bloquehtml = htmlautorizador;
  this.emailvuelorechazado = this.emailvuelorechazado.replace("@autorizadores", bloquehtml);
}

//VUELO CANCELADO
PlantillaPasajerosVueloCancelado() {
  let html = '';
  let mail: any;
  let email = '';
  let phone: any;
  let telefono = '';
  for (let j = 0; j < this.reserva.lpassenger.length; j++) {
    const item = this.reserva.lpassenger[j];
    mail = item.email.split(';');
    email = mail[0];
    phone = item.phone.split(';');
    telefono = phone[0];
    html+="<tr>";
    html+="<td>";
    html+= item.firstName + " " + item.lastName;
    html+="</td>";
    html+="<td>";
    html+= item.documentNumber;
    html+="</td>";
    html+="<td>";
    html+= email;
    html+="</td>";
    html+="<td>";
    html+= telefono;
    html+= "</td>";
    html+="</tr>";
  }
  this.htmlpasajeros = html;
  this.emailvuelocancelado = this.emailvuelocancelado.replace('@pasajeros', this.htmlpasajeros);
 }

 PlantillaPreciovueloCancelado() {
 // this.emailsolicitud = this.emailsolicitud.replace('@motivoaprobacion', motivo);
  let motivo;
  motivo = $('#motivorechazo').val();
  this.emailvuelocancelado = this.emailvuelocancelado.replace(/@currency/gi, this.reserva.currency);
  this.emailvuelocancelado = this.emailvuelocancelado.replace("@precioTotal", this.reserva.totalAmount);
  this.emailvuelocancelado = this.emailvuelocancelado.replace("@preciounitario", this.reserva.totalAmountByPassenger);
  this.emailvuelocancelado = this.emailvuelocancelado.replace("@hora", this.hora);
  this.emailvuelocancelado = this.emailvuelocancelado.replace("@motivocancelacion", motivo);
 }


 PlantillaEmailSolicitudVueloCancelado() {
  let htmlsection = '';
  for (let j = 0; j < this.reserva.litineraries.length; j++) {
       const itemsegmentgroup = this.reserva.litineraries[j];
       htmlsection += "<div class='row' style='padding-bottom:20px; padding-top:10px;'>";
       htmlsection += "<div style='width: 100%; border-radius: 20px 20px 20px 20px; background: white; padding: 1em; border: 1px solid rgba(219, 223, 227, 0.303017); box-shadow: 0px 5px 12px rgba(217, 226, 233, 0.5);'>";
       htmlsection += "<div class='row' style='border-bottom: 1px solid #cccccc; padding-bottom: 20px; padding-top: 30px;'>";
       htmlsection += "<div style='width: 40%;'>";
       htmlsection += "<span class='m-0 p-0'><img style='width: 45px;' class='m-0 p-0' src='https://domiruthuatsa.z13.web.core.windows.net/assets/images/airlines/";
       htmlsection += itemsegmentgroup.carrier + ".png'></span>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 20%; text-align: center;  padding-top: 30px;'>";
       htmlsection += "<span style='color: #676767; font-size: 12px; opacity: 100%;'>Aerolinea Operadora :";
       htmlsection += itemsegmentgroup.carrierName;
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
       htmlsection += itemsegmentgroup.departureDate;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.departureTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.origin;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cityOrigin;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.airportOrigin;
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 20%; padding-left: 40px; padding-top: 30px; text-align: center;'>";
       htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
       htmlsection += "Duracion";
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 22px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.totalFlightTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 20px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += "Clase: <label class='m-0 p-0 pl-3' style='color: #898989; font-size: 14px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cabinDescription + " - " + itemsegmentgroup.cabinId;
       htmlsection += "</label>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "<div style='width: 40%; padding-left: 50px; text-align: center;'>";
       htmlsection += "<div class='m-0 p-0 pt-4' style='color: #898989; font-size: 14px; opacity: 1;'>";
       htmlsection += itemsegmentgroup.arrivalDate;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #676767; font-size: 28px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.arrivalTime;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 18px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.destination;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0' style='color: #898989; font-size: 12px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.cityDestination;
       htmlsection += "</div>";
       htmlsection += "<div class='m-0 p-0 pt-2' style='color: #898989; font-size: 10px; opacity: 1; letter-spacing: 0;'>";
       htmlsection += itemsegmentgroup.airportDestination;
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
       htmlsection += "</div>";
      }
  this.htmlvuelosection = htmlsection;

  this.emailvuelocancelado = this.emailvuelocancelado.replace("@segmentos", this.htmlvuelosection);
}

Regresar() {
  let data;
  data = this.sessionStorageService.retrieve('isgestion');
  if (data === true) {
    this.router.navigate(['/gestion-reserva-vuelo']);
  } else {
    this.router.navigate(['/mis-reservas-vuelo']);
  }
}

Back() {
  let data;
  data = this.sessionStorageService.retrieve('isgestion');
  if (data === true) {
    this.router.navigate(['/gestion-reserva-vuelo']);
  } else {
    this.router.navigate(['/mis-reservas-vuelo']);
  }
}
}
