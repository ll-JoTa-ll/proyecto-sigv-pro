import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
import { IHabitacionResults } from '../../../../../models/IHabitacionResults';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.sass']
})
export class PagoComponent implements OnInit {
  isCollapsed = false;
  habitacion : IGetEnhancedHotel;
  constructor(private sessionStorageService: SessionStorageService) { }



  ngOnInit() {
  
    this.habitacion = this.sessionStorageService.retrieve("confirmacion");
    

  }

}
