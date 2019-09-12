import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-recomendacion-segment',
  templateUrl: './recomendacion-segment.component.html',
  styleUrls: ['./recomendacion-segment.component.sass']
})
export class RecomendacionSegmentComponent implements OnInit, AfterViewInit {

  @Input() segment;
  @Input() bagAllowed;
  @Input() indexSegment: number;
  @Input() recommendationId;
  @Input() sectionId;
  @Input() lSectionGroups;
  @Input() recommendationIndex;

  @Output() segmentRadioCheckId = new EventEmitter<string>();

  carrierName: string;
  marketingCarrier: string;
  timeOfDepartureShow: string;
  timeOfArrivalShow: string;
  lSegmentGroupsLength: number;
  totalFlightTimeShow;
  flagSegmentId: string;
  lSegmentGroups: any[] = [];
  radioButtonName: string;
  segmentRadioSel;

  constructor() {
    //this.flagSegmentId = 'flagSegment_' + this.recommendationId + '' + this.sectionId + '' + this.segmentId;
    this.radioButtonName = 'radioSection';
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

  ngAfterViewInit(): void {
    console.log("this.radioButtonName: " + "#" + this.radioButtonName + this.recommendationId + this.sectionId + this.indexSegment);
    console.log("this.indexSegment: " + this.indexSegment);
    if (this.indexSegment === 1) {
      this.segmentRadioCheckId.emit(this.radioButtonName + '_' + this.recommendationId + '_' + this.sectionId + '_' + this.indexSegment);
      $("#" + this.radioButtonName + '_' +
        this.recommendationId + '_' +
        this.sectionId + '_' +
        this.indexSegment).prop("checked", true);
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

  selectRadioButton(radioId) {
    console.log("RecomendacionSegmentComponent");
    console.log(radioId);
    this.segmentRadioCheckId.emit(radioId);
  }

}
