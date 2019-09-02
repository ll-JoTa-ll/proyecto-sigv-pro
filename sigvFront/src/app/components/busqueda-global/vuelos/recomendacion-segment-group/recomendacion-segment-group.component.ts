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

  textFlightTimeShow: string;
  marketingCarrier: string;

  constructor() { }

  ngOnInit() {
    if (this.lSegmentGroupsLength === this.lSegmentGroupsIndex) {
      this.textFlightTimeShow = "Duracion total: " + this.totalFlightTimeShow;
    } else {
      this.textFlightTimeShow = "Espera en aeropuero: " + this.segmentGroup.totalFlightTimeShow;
    }

    this.marketingCarrier = this.segmentGroup.marketingCarrier + '.png';
  }

}
