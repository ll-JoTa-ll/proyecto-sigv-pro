import { Component, OnInit } from '@angular/core';
import { IGetEnhancedHotel } from '../../../../../models/IGetEnhancedHotel';
import { SessionStorageService } from 'ngx-webstorage';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.sass']
})
export class DetalleCompraComponent implements OnInit {
  lstConfirmacion : IGetEnhancedHotel;
  lstHabi : IHabitacionResults;

  urlimg = '/assets/images/hotel-icon.png';

  constructor(private sessionStorageService: SessionStorageService) {  this.lstConfirmacion = this.sessionStorageService.retrieve("confirmacion");
  console.log(this.lstConfirmacion); }

  ngOnInit() {
  

    this.lstHabi = this.sessionStorageService.retrieve("lstHabication");
  }

  Mostrarmapa() {
    $('#mapa').show();
 }
 
 OcultarMapa() {
   $('#mapa').hide();
 }

}
