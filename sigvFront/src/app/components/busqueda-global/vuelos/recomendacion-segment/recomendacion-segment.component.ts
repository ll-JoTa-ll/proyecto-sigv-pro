import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recomendacion-segment',
  templateUrl: './recomendacion-segment.component.html',
  styleUrls: ['./recomendacion-segment.component.sass']
})
export class RecomendacionSegmentComponent implements OnInit {

  @Input() segment;
  carrierName: string;
  marketingCarrier: string;
  timeOfDepartureShow: string;
  timeOfArrivalShow: string;
  lSegmentGroupsLength: number;
  totalFlightTimeShow;

  constructor() { }

  ngOnInit() {
    this.totalFlightTimeShow = this.segment.totalFlightTimeShow;
    this.lSegmentGroupsLength = this.segment.lSegmentGroups.length;
    const lSegmentGroupsLength = this.lSegmentGroupsLength;
    if (lSegmentGroupsLength > 0) {
      this.carrierName = this.segment.lSegmentGroups[0].carrierName;
      this.marketingCarrier = this.segment.lSegmentGroups[0].marketingCarrier + ".png";
      this.timeOfDepartureShow = this.segment.lSegmentGroups[0].timeOfDepartureShow;
      this.timeOfArrivalShow = this.segment.lSegmentGroups[lSegmentGroupsLength - 1].timeOfArrivalShow;
    }
  }

}
