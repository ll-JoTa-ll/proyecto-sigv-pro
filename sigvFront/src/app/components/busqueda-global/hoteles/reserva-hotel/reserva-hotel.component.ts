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

  lsthabitacion;
  numeroTarjeta;
  fechVencimiento;
  codSeguridad;
  titular;
  telefono;
  correo;
  
  

  constructor(private router: Router,private sessionStorageService: SessionStorageService,public spinner: NgxSpinnerService,private service: HotelService,private modalService: BsModalService) {
    
   }

  ngOnInit() {
    this.lstConfirmacion = this.sessionStorageService.retrieve("confirmacion");
    this.lsthabitacion = this.sessionStorageService.retrieve("lstHabication");
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
  }

  

  

  
  getPnrHotel(){
    const val= this.ValidarCampos();
    if (!val) {
      alert("Hay campos vacios")
      return val;
    }
    else{
      //let fechVencimiento = this.fechVencimiento;
    //this.fechVencimiento = fechVencimiento.substring(0,2) + fechVencimiento.substring(3,5);
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
          "PersonId": 149,
          "Prefix": "MR",
          "Type": "ADT",
          "Name":"Manuel",
          "LastName":"Masias",
          "Gender": "M",
          "BirthDate":"1999/08/18",
          "IsVIP": false,
          "Odocument":
            {
              "Type": "NI",
              "Number": "73470506"
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
        "CardType": "VI",
        "CardNumber": this.numeroTarjeta,
        "SecurityId": this.codSeguridad,
        "ExpiryDate": this.fechVencimiento,
        "HolderName": this.titular
      }
    }

    console.log("dataRequest: " + JSON.stringify(data));


    this.service.GetReserva(data).subscribe(
      data => {
        let template : TemplateRef<any>;
        this.Reserva = data;
        
        this.sessionStorageService.store("reserva", this.Reserva);
        let message = this.Reserva.oerror;

          if (message != null) {
            alert(this.Reserva.oerror.message)
          }
          else {
            //window.open(environment.url_project + "/reserva-generada-hotel");
            this.router.navigate(['/reserva-generada-hotel']);
          }
          
        
          
         
        
        
      },
      err => {
        this.spinner.hide();
      console.log("ERROR: " + JSON.stringify(err));
    },
   () => {
    this.spinner.hide();
    
   }
    )
    }
    
  }
  openModal(template: TemplateRef<any>){
      this.modalref = this.modalService.show(this.Reserva.oerror.message);
   
  }
  setNumTarjeta($event){
    this.numeroTarjeta = $event;
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
