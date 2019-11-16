import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { IGetEnhancedHotel } from '../../../../models/IGetEnhancedHotel';
import { SessionStorageService } from 'ngx-webstorage';
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

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-reserva-hotel',
  templateUrl: './reserva-hotel.component.html',
  styleUrls: ['./reserva-hotel.component.sass']
})
export class ReservaHotelComponent implements OnInit {
  modalref: BsModalRef;
 
   

  loginDataUser: ILoginDatosModel;
  habitacion : IHabitacionResults;
  lstConfirmacion : IGetEnhancedHotel;
  Reserva : IGetPnrHotel;
  user;

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
  
  
  

  constructor(private toastr: ToastrService,private http: HttpClient,private router: Router,private sessionStorageService: SessionStorageService,public spinner: NgxSpinnerService,private service: HotelService,private modalService: BsModalService,private services: AirportService) {
    this.lstConfirmacion = this.sessionStorageService.retrieve("confirmacion");
    this.lsthabitacion = this.sessionStorageService.retrieve("lstHabication");
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.user = this.sessionStorageService.retrieve("ss_user");
    this.plantilla = 'assets/plantillashoteles/enviocorreo.html';
   }

  ngOnInit() {
    
    
    this.Obtenerstring();
  }

  

  

  
  getPnrHotel(){
    console.log(this.user);
    let message;
    let cumple;
    cumple = this.user.birthDate;
    cumple = cumple.substring(0,10);
    cumple = cumple.replace(/-/gi,"/");
    const val= this.ValidarCampos();
    if (!val) {
      alert("Hay campos vacios")
      return val;
    }
    else{
      //let fechVencimiento = this.fechVencimiento;
    //this.fechVencimiento = fechVencimiento.substring(0,2) + fechVencimiento.substring(3,5);
    //this.fechVencimiento = this.fechVencimiento.substring(0,2) + this.fechVencimiento.substring(3,5);
    let phone = [this.telefono];
    phone.push();
    let email = [this.correo];
    email.push();
    this.spinner.show();
    let data = {
    "Pseudo": "LIMPE2235",
    "GDS": "Amadeus",
    "Ocompany": this.loginDataUser.ocompany,
    "osession": this.lstConfirmacion.osession,
    "Phones": phone,
      "Emails": email,
      "LPassenger":
      [
        {
          "PassengerId": 1,
          "PersonId": this.user.personId,
          "Prefix": "MR",
          "Type": "ADT",
          "Name": this.loginDataUser.userName,
          "LastName":this.loginDataUser.userLastName,
          "Gender": this.user.gender,
          "BirthDate": cumple,
          "IsVIP": this.user.isVIP,
          "Odocument":
            {
              "Type": this.user.odocument.type,
              "Number": this.user.odocument.number
            }
        }
      ],
    "StartDate": this.lsthabitacion.ohotel.startDate,
    "EndDate": this.lsthabitacion.ohotel.endDate,
    "CityCode": this.lstConfirmacion.ohotel.cityCode,
    "Hotelcode": this.lstConfirmacion.ohotel.code,
    "HotelName": this.lstConfirmacion.ohotel.name,
    "GuaranteeText": "GuaranteeRequired",
    "BookingCode": this.lstConfirmacion.oroom.bookingCode,
    "CorporateCode": this.lstConfirmacion.ohotel.chainCode,
    "NumberPassengers": this.lsthabitacion.ohotel.lguestPerRoom[0].numberPassengers,
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
        "Area": this.areaContacto,
        "Name": this.nombreContacto,
        "EmailAddress" : this.correoContacto,
        "Numberphone": this.telefonoContacto
      }
    }

    


    this.service.GetReserva(data).subscribe(
      data => {
        let template : TemplateRef<any>;
        this.Reserva = data;
        
        this.sessionStorageService.store("reserva", this.Reserva);
         message = this.Reserva.oerror;

         
       
          
      },
      err => {
        this.spinner.hide();
      
    },
   () => {
    if (message != null) {
      alert(this.Reserva.oerror.message)
      this.spinner.hide();
      return;
    }
    else{
      this.SendMailHotelAprobado();
    }
     
 
    
   }
   
    )
    }
    
  }
  openModal(template: TemplateRef<any>){
      this.modalref = this.modalService.show(this.Reserva.oerror.message);
   
  }

  Obtenerstring() {
    this.http.get(this.plantilla, {responseType: 'text'}).subscribe(
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
   
    this.Reserva.email.forEach(function(item){
      mails.push(item);
    }); 
   
  
   
    let data = {
      "AgencyId": 1,
      "Recipients": mails,
      "RecipientsCopy": ['analista6@domiruth.com', 'juan.caro.1987@gmail.com'],
      "RecipientsHiddenCopy": [],
      "Subject": "HOTEL APROBADO",
      "Message": this.emailsolicitud
    }
    this.services.SendEmail(data).subscribe(
      results => {
           if (results === true) {
            this.toastr.success('', 'Se envio correctamente', {
              timeOut: 3000
             });
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
        this.router.navigate(['/reserva-generada-hotel']);
      }
    );
  }

  getAmenities(){
    let imgNotFound = './assets/images/imagenotfound.jfif'
    let html ='';
    let SinInfo = '';
    let amenities: any;
    let htmlGlobal = '';
    amenities = this.lsthabitacion.ohotel.lamenities
    for (let i = 0; i < amenities.length; i++) {
      const element = amenities[i];
      html += "<div style='width: 20%;'>";
      html +=   "<img style='width: 30px;' src='https://sigvplus.azurewebsites.net/sigv/assets/images/";
      html += element.code
      html += ".png'>";
      html +=  "<span style='color: #676767; font-family: Arial, Helvetica, sans-serif; font-size: 14px; opacity: 1; letter-spacing: 0;'>";
      html += element.description
      html += "</span>";
      html += "</div>";
    }
    htmlGlobal = html;
    SinInfo = "Sin Información";
    this.emailsolicitud = this.emailsolicitud.replace('@amenities', htmlGlobal);
    this.emailsolicitud = this.emailsolicitud.replace('@priceTotal', this.Reserva.litineraryInfos[0].priceTotal);
    this.emailsolicitud = this.emailsolicitud.replace('@pnr', this.Reserva.pnr);
    this.emailsolicitud = this.emailsolicitud.replace('@numeronoches', this.lsthabitacion.ohotel.numberNights);
    this.emailsolicitud = this.emailsolicitud.replace('@numeropersonas', this.lsthabitacion.ohotel.lguestPerRoom[0].numberPassengers);
    this.emailsolicitud = this.emailsolicitud.replace('@descripcionHabitacion', this.Reserva.litineraryInfos[0].descriptionRoom);
    this.emailsolicitud = this.emailsolicitud.replace('@fechaentrada', this.lstConfirmacion.oroom.startDate);
    this.emailsolicitud = this.emailsolicitud.replace('@fechasalida', this.lstConfirmacion.oroom.endDate);
    if (this.lsthabitacion.ohotel.checkIn != null && this.lsthabitacion.ohotel.checkIn != '') {
      this.emailsolicitud = this.emailsolicitud.replace('@checkin', this.lsthabitacion.ohotel.checkIn);
    }else{
      this.emailsolicitud = this.emailsolicitud.replace('@checkin', SinInfo);
    }
    if (this.lsthabitacion.ohotel.checkOut != null && this.lsthabitacion.ohotel.checkOut != '') {
      this.emailsolicitud = this.emailsolicitud.replace('@checkout', this.lsthabitacion.ohotel.checkOut);
    }else{
      this.emailsolicitud = this.emailsolicitud.replace('@checkout', SinInfo);
    }
    this.emailsolicitud = this.emailsolicitud.replace('@politicacancelacion', this.Reserva.litineraryInfos[0].penality);
    this.emailsolicitud = this.emailsolicitud.replace('@nombreusuario', this.Reserva.lpassengers[0].name + this.Reserva.lpassengers[0].lastName);
    this.emailsolicitud = this.emailsolicitud.replace('@telefono', this.Reserva.numberPhone);
    if(this.lsthabitacion.ohotel.limagens != null && this.lsthabitacion.ohotel.limagens.length > 0){
      this.emailsolicitud = this.emailsolicitud.replace('@imagen',this.lsthabitacion.ohotel.limagens[0].url)
    }
    else {
      this.emailsolicitud = this.emailsolicitud.replace('@imagen',imgNotFound);
    }
    

 }





  setNumTarjeta($event){
    this.numeroTarjeta = $event;
  }

  setNombreTarjeta($event){
    this.nombreTarjeta = $event;
  }

  setFechVencimiento($event){
    this.fechVencimiento = $event;
  }

  setCodSeguridad($event){
    this.codSeguridad = $event;
  }

  setTitular($event){
    this.titular = $event;
  }

  setTelefono($event){
    this.telefono = $event;
  }

  setCorreo($event){
    this.correo = $event;
  }
  

  setCorreoContacto($event){
    this.correoContacto = $event;
  }

  setTelefonoContacto($event){
    this.telefonoContacto = $event;
  }

  setNombreContacto($event){
    this.nombreContacto = $event;
  }

  setAreaContacto($event){
    this.areaContacto = $event;
  }
  
  ValidarCampos() {
    let val = true;
        if ($('#numeroTarjeta').val().length <= 0) {
          val = false;
        }
        if ($('#fechaVencimiento').val().length <= 0) {
          val = false;
        }
        if ($('#codSeguridad').val().length <= 0) {
          val = false;
        }
        if ($('#titularTarjeta').val().length <= 0) {
          val = false;
        }


    return val;
  }
  

}
