import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-segment-group',
  templateUrl: './info-segment-group.component.html',
  styleUrls: ['./info-segment-group.component.sass']
})
export class InfoSegmentGroupComponent implements OnInit {

@Input() segmentGroup;
@Input() totalFlightTimeShow;
@Input() lSegmentGroupsLength: number;
@Input() lSegmentGroupsIndex: number;
@Input() tipo: number;
marketingCarrier: string;
textFlightTimeShow: string;

  constructor() { }

  ngOnInit() {
    if (this.lSegmentGroupsLength === this.lSegmentGroupsIndex) {
      this.textFlightTimeShow = "Duracion total: " + this.totalFlightTimeShow;
    } else {
      this.textFlightTimeShow = "Espera en aeropuerto: " + this.segmentGroup.TimeWaitAirport.replace("00d ", "");
    }
    this.marketingCarrier = this.segmentGroup.MarketingCarrier + '.png';
  }

}
