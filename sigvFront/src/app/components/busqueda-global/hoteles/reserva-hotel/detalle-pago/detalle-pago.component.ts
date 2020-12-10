import { Component, OnInit, Input } from '@angular/core';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
import { SessionStorageService } from 'ngx-webstorage';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.sass']
})
export class DetallePagoComponent implements OnInit {
  @Input('vuelo') vuelo?: any

  lstConfirmacion : IGetEnhancedHotel;

  hotel: IHabitacionResults;
  constructor(private sessionStorageService: SessionStorageService) {
    this.lstConfirmacion = this.sessionStorageService.retrieve("confirmacion");
   }

  ngOnInit() {
    this.hotel = this.sessionStorageService.retrieve("lstHabication");
    if (this.vuelo === undefined) {
      this.vuelo = null;
    }
  }

}
