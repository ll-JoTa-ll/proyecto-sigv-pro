import { Component, OnInit, Output, TemplateRef, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { IGetEnhancedHotel } from '../../../../models/IGetEnhancedHotel';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
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
import { BnNgIdleService } from 'bn-ng-idle';
import { ModalHotelesVaciosComponent } from '../../../shared/modal-hoteles-vacios/modal-hoteles-vacios.component';
import { ModalCerrarSesionComponent } from '../../../shared/modal-cerrar-sesion/modal-cerrar-sesion.component';

declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-reserva-hotel',
  templateUrl: './reserva-hotel.component.html',
  styleUrls: ['./reserva-hotel.component.sass']
})
export class ReservaHotelComponent implements OnInit, AfterViewInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  public text: String;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.text = "clicked inside";
      var cerrarsesion;
      cerrarsesion = this.localStorageService.retrieve("ss_closedSesion")
      if (cerrarsesion == false || cerrarsesion == '' || cerrarsesion === null) {
        this.modalRefSessionExpired = this.modalService.show(ModalCerrarSesionComponent,this.config);
      }
    } else {
      this.text = "clicked outside";
    }
  }
  
  modalref: BsModalRef;



  loginDataUser: ILoginDatosModel;
  habitacion : IHabitacionResults;
  lstConfirmacion : any;
  Reserva : IGetPnrHotel;
  user;
  modalRefSessionExpired: BsModalRef;

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
  isOpen = false;
  lhotel;

  amenities: any;



  constructor(private eRef: ElementRef,private localStorageService: LocalStorageService,private bnIdle: BnNgIdleService,private toastr: ToastrService,private http: HttpClient,private router: Router,private sessionStorageService: SessionStorageService,public spinner: NgxSpinnerService,private service: HotelService,private modalService: BsModalService,private services: AirportService) {
    this.lstConfirmacion = this.sessionStorageService.retrieve("confirmacion");
    this.lsthabitacion = this.sessionStorageService.retrieve("lstHabication");
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.user = this.sessionStorageService.retrieve("ss_user");
    this.plantilla = 'assets/plantillashoteles/enviocorreo.html';
    
  }

  ngOnInit() {
    this.bloquearBotonAtras();
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
    //let ss_timer_hoteles = this.sessionStorageService.retrieve("ss_timer_hoteles_v1");
    //console.log("ss_timer_hoteles: " + ss_timer_hoteles);
    // let newCount = 60 - ss_timer_hoteles;
    // console.log("newCount: " + newCount);
    // this.bnIdle.startWatching(newCount).subscribe((res) => {

    //  if(res) {

    //     alert("Session expired")
    //     this.router.navigate(['hoteles'])
    // }
    // });

    this.Obtenerstring();
  }



  VolverHome(){
    this.router.navigate(['hoteles'])
  }



  ngAfterViewInit() {
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').hide();
    $('#menu-hotel-2').show();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
  }

  bloquearBotonAtras() {
    history.pushState(null, null, location.href);
    window.onpopstate = function() {
      history.go(1);
  };
  }

  getPnrHotel(){
    let message;
    let cumple;
    let listaAme;
    cumple = this.user.birthDate;
    cumple = cumple.substring(0,10);
    cumple = cumple.replace(/-/gi,"/");
    const val= this.ValidarCampos();
    if (!val) {
      return val;
    }
    else{
      let tipoPago;
      let amenities = [];
      //let fechVencimiento = this.fechVencimiento;
      //this.fechVencimiento = fechVencimiento.substring(0,2) + fechVencimiento.substring(3,5);
      //this.fechVencimiento = this.fechVencimiento.substring(0,2) + this.fechVencimiento.substring(3,5);

      var listaroom = this.lsthabitacion.lroom.length;
    

      for (let index = 0; index < this.lsthabitacion.lroom.length; index++) {
        if (this.lstConfirmacion.oroom.bookingCode === this.lsthabitacion.lroom[index].bookingCode) {
          const element = this.lsthabitacion.lroom[index];
          //this.amenities = element.lamenities;
          listaAme = element.lamenities;
        
        }
      }
      this.amenities = listaAme;
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
        "NumberPassengers": this.lsthabitacion.ohotel.lguestPerRoom[0].numberPassengers,
        "OHotel":{
          "CityCode": this.lstConfirmacion.ohotel.cityCode,
          "Hotelcode": this.lstConfirmacion.ohotel.code,
          "HotelName": this.lstConfirmacion.ohotel.name,
          "Latitude": this.lhotel.oposition.latitude,
          "Longitude": this.lhotel.oposition.longitude,
          "Starts": this.lhotel.stars,
          "Lamenities": this.lhotel.lamenities,
        },
        "ORoom":{
          "Name": this.lsthabitacion.ohotel.hotelName,
          "Description": this.lsthabitacion.ohotel.hotelDescription,
          "GuaranteeText": this.lstConfirmacion.ohotel.guarantee,
          "BookingCode": this.lstConfirmacion.oroom.bookingCode,
          "CorporateCode": this.lstConfirmacion.ohotel.chainCode,
          "Lamenities" :  this.amenities,
        },
        "LcancelPenalties": this.lstConfirmacion.oroom.lcancelPenalties,
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
            "Area": '01',
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
            this.modalRefSessionExpired = this.modalService.show(ModalHotelesVaciosComponent)
            //alert(this.Reserva.oerror.message)
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
    if (amenities != null) {
      for (let i = 0; i < amenities.length; i++) {
        const element = amenities[i];
        html += "<div style='width: 20%;'>";
        html +=   "<img style='width: 30px;' src='https://sigvplus.azurewebsites.net/sigv/assets/images/";
        html += element.code
        html += ".png'>";
        html +=  "<label style='color: #676767; font-family: Arial, Helvetica, sans-serif; font-size: 14px; opacity: 1; letter-spacing: 0;'>";
        html += element.description
        html += "</label>";
        html += "</div>";
      }
      htmlGlobal = html;
    }
    if (htmlGlobal != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@amenities', htmlGlobal);
    }
    SinInfo = "Sin Información";
    if (this.Reserva.oitineraryInfos.priceTotal != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@priceTotal', this.Reserva.oitineraryInfos.priceTotal);
    }
    if (this.Reserva.pnr != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@pnr', this.Reserva.pnr);
    }
    if (this.Reserva.lpassengers[0].codeConfirmation != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@confirmacion', this.Reserva.lpassengers[0].codeConfirmation);
    }
    if (this.lsthabitacion.ohotel.numberNights != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@numeronoches', this.lsthabitacion.ohotel.numberNights);
    }
    if (this.lsthabitacion.ohotel.lguestPerRoom[0].numberPassengers != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@numeropersonas', this.lsthabitacion.ohotel.lguestPerRoom[0].numberPassengers);
    }
    if (this.Reserva.oitineraryInfos.descriptionRoom != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@descripcionHabitacion', this.Reserva.oitineraryInfos.descriptionRoom);
    }
    if (this.lstConfirmacion.oroom.startDate != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@fechaentrada', this.lstConfirmacion.oroom.startDate);
    }
    if (this.lstConfirmacion.oroom.endDate != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@fechasalida', this.lstConfirmacion.oroom.endDate);
    }
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
    if (this.Reserva.oitineraryInfos.penality != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@politicacancelacion', this.Reserva.oitineraryInfos.penality);
    }
    if (this.Reserva.lpassengers[0].name != null || this.Reserva.lpassengers[0].lastName != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@nombreusuario', this.Reserva.lpassengers[0].name + this.Reserva.lpassengers[0].lastName);
    }
    if (this.Reserva.numberPhone != null) {
      this.emailsolicitud = this.emailsolicitud.replace('@telefono', this.Reserva.numberPhone);
    }
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
    let correo;
    correo = $("#correoTitu").val();

    if ($('#correoTitu').val().length <= 0) {
      val = false;
      $('#correoTitu').addClass('campo-invalido');
      this.isOpen = true;
    } else {
      $('#correoTitu').removeClass('campo-invalido');
      this.isOpen = false;
    }
    if ($('#fonoTitu').val().length <= 0) {
      $('#fonoTitu').addClass('campo-invalido');
      val = false;
    } else {
      $('#fonoTitu').removeClass('campo-invalido');
    }
    if ($('#numeroTarjeta').val().length <= 0) {
      $('#numeroTarjeta').addClass('campo-invalido');
      val = false;
    } else {
      $('#numeroTarjeta').removeClass('campo-invalido');
    }
    if ($('#fechaVencimiento').val().length <= 0) {
      $('#fechaVencimiento').addClass('campo-invalido');
      val = false;
    } else {
      $('#fechaVencimiento').removeClass('campo-invalido');
    }
    if ($('#codSeguridad').val().length <= 0) {
      $('#codSeguridad').addClass('campo-invalido');
      val = false;
    } else {
      $('#codSeguridad').removeClass('campo-invalido');
    }
    if ($('#titularTarjeta').val().length <= 0) {
      $('#titularTarjeta').addClass('campo-invalido');
      val = false;
    } else {
      $('#titularTarjeta').removeClass('campo-invalido');
    }
    if ($('#nombre').val().length <= 0) {
      $('#nombre').addClass('campo-invalido');
      val = false;
    } else {
      $('#nombre').removeClass('campo-invalido');
    }
    if ($('#correo').val().length <= 0) {
      $('#correo').addClass('campo-invalido');
      val = false;
    } else {
      $('#correo').removeClass('campo-invalido');
    }
    if ($('#area').val().length <= 0) {
      $('#area').addClass('campo-invalido');
      val = false;
    } else {
      $('#area').removeClass('campo-invalido');
    }
    if ($('#numero').val().length <= 0) {
      $('#numero').addClass('campo-invalido');
      val = false;
    } else {
      $('#numero').removeClass('campo-invalido');
    }


    return val;
  }


}
