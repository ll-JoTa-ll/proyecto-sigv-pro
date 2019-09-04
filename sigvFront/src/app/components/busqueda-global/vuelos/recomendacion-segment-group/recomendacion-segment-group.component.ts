import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recomendacion-segment-group',
  templateUrl: './recomendacion-segment-group.component.html',
  styleUrls: ['./recomendacion-segment-group.component.sass']
})
export class RecomendacionSegmentGroupComponent implements OnInit {

  @Input() segmentGroup;
  @Input() totalFlightTimeShow;
  @Input() lSegmentGroupsLength: number;
  @Input() lSegmentGroupsIndex: number;
  @Input() sectionGroup;

  textFlightTimeShow: string;
  marketingCarrier: string;

  constructor() { }

  ngOnInit() {
    if (this.lSegmentGroupsLength === this.lSegmentGroupsIndex) {
      this.textFlightTimeShow = "Duracion total: " + this.totalFlightTimeShow;
    } else {
      this.textFlightTimeShow = "Espera en aeropuerto: " + this.segmentGroup.timeWaitAirport;
    }

    this.marketingCarrier = this.segmentGroup.marketingCarrier + '.png';
  }

}
