import { Component, OnInit, Input } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-recomendacion-segment',
  templateUrl: './recomendacion-segment.component.html',
  styleUrls: ['./recomendacion-segment.component.sass']
})
export class RecomendacionSegmentComponent implements OnInit {

  @Input() segment;
  @Input() bagAllowed;
  @Input() indexSegment: number;
  @Input() recommendationId;
  @Input() sectionId;
  @Input() lSectionGroups;
  carrierName: string;
  marketingCarrier: string;
  timeOfDepartureShow: string;
  timeOfArrivalShow: string;
  lSegmentGroupsLength: number;
  totalFlightTimeShow;
  flagSegmentId: string;
  lSegmentGroups: any[] = [];

  constructor() {
    //this.flagSegmentId = 'flagSegment_' + this.recommendationId + '' + this.sectionId + '' + this.segmentId;
  }

  ngOnInit() {
    this.flagSegmentId = 'flagSegment_' + this.recommendationId + '' + this.sectionId + '' + this.segment.segmentId + '' + this.indexSegment;
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

  listSegmentGroups(flagSegmentId, lSegmentGroups) {
    console.log("flagSegmentId: " + flagSegmentId);
    this.lSegmentGroups = lSegmentGroups;
    $("#" + flagSegmentId).show();
  }

  hideSegmentGroups(flagSegmentId) {
    console.log("flagSegmentId: " + flagSegmentId);
    this.lSegmentGroups = [];
    $("#" + flagSegmentId).hide();
  }

}
