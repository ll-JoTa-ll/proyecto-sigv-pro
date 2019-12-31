import { Component, AfterViewInit, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-detalle-reserva-hotel',
  templateUrl: './detalle-reserva-hotel.component.html',
  styleUrls: ['./detalle-reserva-hotel.component.sass']
})
export class DetalleReservaHotelComponent implements OnInit {

  detailsHotel;
  urlimg = './assets/images/hotel-icon.png';

  constructor(private sessionstorage: SessionStorageService,private router: Router) {

    this.detailsHotel = this.sessionstorage.retrieve('ss_getreservahotel');
   }

  ngOnInit() {
  }

  BackSearch(){
    this.router.navigate(["/mis-reservas-vuelo"])
  }

  Mostrarmapa() {
    $('#mapa').show();
 }

  OcultarMapa() {
    $('#mapa').hide();
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

}
