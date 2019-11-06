import { Component, OnInit } from '@angular/core';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.sass']
})
export class DetallePagoComponent implements OnInit {

  hotel: IHabitacionResults;
  constructor(private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.hotel = this.sessionStorageService.retrieve("lstHabication");
  }

}
