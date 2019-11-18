import { Component, OnInit } from '@angular/core';
import { IGetPnrHotel } from '../../../../models/IGetPnrHotel.model';
import { SessionStorageService } from 'ngx-webstorage';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
import { IHabitacionResults } from '../../../../models/IHabitacionResults';
import { IGetUserById } from '../../../../models/IGetUserById.model';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-generada-hotel',
  templateUrl: './reserva-generada-hotel.component.html',
  styleUrls: ['./reserva-generada-hotel.component.sass']
})
export class ReservaGeneradaHotelComponent implements OnInit {

  reserva : IGetPnrHotel;
  habitacion : IHabitacionResults;
  confirmacion : IGetEnhancedHotel;
  user: IGetUserById;
  lhotel;

  phone;
  urlimg = './assets/images/hotel-icon.png';

  constructor(private router: Router,private bnIdle: BnNgIdleService,private sessionStorageService: SessionStorageService) { 

    this.lhotel = this.sessionStorageService.retrieve("lhotel");
    this.bnIdle.startWatching(600).subscribe((res) => {
      if(res) {
          console.log("session expired");
          alert("session expired")
          this.router.navigate(['hoteles'])
      }
    })
  }

  ngOnInit() {
    this.reserva = this.sessionStorageService.retrieve("reserva");
    this.confirmacion = this.sessionStorageService.retrieve("confirmacion");
    this.habitacion = this.sessionStorageService.retrieve("lstHabication");
    this.user = this.sessionStorageService.retrieve("ss_user");
    this.reserva.numberPhone.forEach(function(item){
      this.phone = item;
    })
  }

  Mostrarmapa() {
    $('#mapa').show();
 }
 
 OcultarMapa() {
   $('#mapa').hide();
 }

 getAmenities(){
    let html ='';
    let amenities: any;
    amenities = this.habitacion.ohotel.lamenities
    for (let i = 0; i < amenities.length; i++) {
      const element = amenities[i];
      html += "<div style='width: 20%;'>";
      html +=   "<img style='width: 30px;' src='https://sigvplus.azurewebsites.net/sigv/assets/images/";
      html += element.code
      html += ".png'>";
      html +=  "<span style='color: #676767; font-family: Arial, Helvetica, sans-serif; font-size: 14px; opacity: 1; letter-spacing: 0;'>"
      html += element.description
      html += "</span>";
      html +=   "</div>";
      
    }
 }

}
