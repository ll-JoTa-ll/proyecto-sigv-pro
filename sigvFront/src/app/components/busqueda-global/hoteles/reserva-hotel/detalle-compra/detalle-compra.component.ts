import { Component, OnInit, Input } from '@angular/core';
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
  @Input('hideTitle') hideTitle?: boolean;

  lstConfirmacion : IGetEnhancedHotel;
  lstHabi : any;
  lhotel;

  urlimg = './assets/images/hotel-icon.png';

  constructor(private sessionStorageService: SessionStorageService) {  this.lstConfirmacion = this.sessionStorageService.retrieve("confirmacion");
   }

  ngOnInit() {


    this.lstHabi = this.sessionStorageService.retrieve("lstHabication");
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
  }

  Mostrarmapa() {
    $('#mapa').show();
 }

 OcultarMapa() {
   $('#mapa').hide();
 }

}
