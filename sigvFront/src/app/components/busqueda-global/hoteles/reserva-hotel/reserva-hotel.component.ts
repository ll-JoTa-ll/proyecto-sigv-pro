import { Component, OnInit } from '@angular/core';
import { IGetEnhancedHotel } from '../../../../models/IGetEnhancedHotel';
import { SessionStorageService } from 'ngx-webstorage';
import { ILoginDatosModel } from 'src/app/models/ILoginDatos.model';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-reserva-hotel',
  templateUrl: './reserva-hotel.component.html',
  styleUrls: ['./reserva-hotel.component.sass']
})
export class ReservaHotelComponent implements OnInit {

  loginDataUser: ILoginDatosModel;
  habitacion : IHabitacionResults;
  lstConfirmacion : IGetEnhancedHotel;

  lsthabitacion;

  constructor(private sessionStorageService: SessionStorageService,public spinner: NgxSpinnerService) {
    
   }

  ngOnInit() {
    this.lstConfirmacion = this.sessionStorageService.retrieve("confirmacion");
    this.lsthabitacion = this.sessionStorageService.retrieve("lstHabication");
  }

  

}
