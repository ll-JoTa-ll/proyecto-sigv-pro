import { Component, OnInit, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { IGetPnrHotel } from '../../../../models/IGetPnrHotel.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
import { IHabitacionResults } from '../../../../models/IHabitacionResults';
import { IGetUserById } from '../../../../models/IGetUserById.model';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { ModalCerrarSesionComponent } from '../../../shared/modal-cerrar-sesion/modal-cerrar-sesion.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reserva-generada-hotel',
  templateUrl: './reserva-generada-hotel.component.html',
  styleUrls: ['./reserva-generada-hotel.component.sass']
})
export class ReservaGeneradaHotelComponent implements OnInit, AfterViewInit {
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
      console.log(this.text);
      var cerrarsesion;
      cerrarsesion = this.localStorageService.retrieve("ss_closedSesion")
      if (cerrarsesion == false || cerrarsesion == '' || cerrarsesion === null) {
    
      }
    } else {
      this.text = "clicked outside";
      console.log(this.text);
    }
  }

  reserva : IGetPnrHotel;
  habitacion : IHabitacionResults;
  confirmacion : IGetEnhancedHotel;
  user: IGetUserById;
  modalRefSessionExpired: BsModalRef;
  lhotel;

  phone;
  urlimg = './assets/images/hotel-icon.png';

  constructor(private modalService: BsModalService,private eRef: ElementRef,private localStorageService: LocalStorageService,private router: Router,private bnIdle: BnNgIdleService,private sessionStorageService: SessionStorageService) { 

    this.lhotel = this.sessionStorageService.retrieve("lhotel");
  }

  ngOnInit() {
    this.bloquearBotonAtras();
    this.reserva = this.sessionStorageService.retrieve("reserva");
    this.confirmacion = this.sessionStorageService.retrieve("confirmacion");
    this.habitacion = this.sessionStorageService.retrieve("lstHabication");
    this.user = this.sessionStorageService.retrieve("ss_user");
    this.reserva.numberPhone.forEach(function(item){
      this.phone = item;
    })

  }

  BackSearch(){
    this.router.navigate(["/hoteles"])
  }

  ngAfterViewInit() {
    console.log('ngOnInit hoteles');
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

 bloquearBotonAtras() {
  history.pushState(null, null, location.href);
  window.onpopstate = function() {
    history.go(1);
};
}

}
