import { Component, OnInit } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.sass']
})
export class PartnerComponent implements OnInit {

  constructor(private service: HotelService) { }

  ngOnInit() {
    console.log("hola");
  }

}
