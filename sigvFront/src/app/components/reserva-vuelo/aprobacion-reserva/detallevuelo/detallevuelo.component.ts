import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-detallevuelo',
  templateUrl: './detallevuelo.component.html',
  styleUrls: ['./detallevuelo.component.sass']
})
export class DetallevueloComponent implements OnInit {

  @Input() itemgroup;
  @Input() segmentgroupindex;
  @Input() segmentgroupLength;
  @Input() totalFlightTimeShow;
  textFlightTimeShow;

  constructor() { }

  ngOnInit() {
    if (this.segmentgroupLength === this.segmentgroupindex) {
      this.textFlightTimeShow = "Duracion total: " + this.totalFlightTimeShow;
    } else {
      this.textFlightTimeShow = "Espera en aeropuerto: " + this.itemgroup.timeWaitAirport.replace("00d ", "");
    }
  }

}
