import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-recomendacion-segment',
  templateUrl: './recomendacion-segment.component.html',
  styleUrls: ['./recomendacion-segment.component.sass']
})
export class RecomendacionSegmentComponent implements OnInit, AfterViewInit {

  @Input() section;
  @Input() segment;
  @Input() bagAllowed;
  @Input() indexSegment: number;
  @Input() recommendationId;
  @Input() sectionId;
  @Input() lSectionGroups;
  @Input() recommendationIndex;
  @Input() bagQuantity;

  //@Output() segmentRadioCheckId = new EventEmitter<string>();
  //@Output() outSegment = new EventEmitter<any>();
  @Output() outSegmentCheck = new EventEmitter<any>();

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
  stringscalas: string;

  constructor() {
    this.radioButtonName = 'radioSection';
  }

  ngOnInit() {
    this.flagSegmentId = 'flagSegment_' + this.recommendationId + '' + this.sectionId + '' + this.segment.segmentId + '' + this.indexSegment;
    this.totalFlightTimeShow = this.segment.totalFlightTimeShow;
    this.lSegmentGroupsLength = this.segment.lsegmentGroups.length;
    const lSegmentGroupsLength = this.lSegmentGroupsLength;
    if (lSegmentGroupsLength > 0) {
      this.carrierName = this.segment.lsegmentGroups[0].carrierName;
      this.marketingCarrier = this.segment.lsegmentGroups[0].marketingCarrier + ".png";
      this.timeOfDepartureShow = this.segment.lsegmentGroups[0].timeOfDepartureShow;
      this.timeOfArrivalShow = this.segment.lsegmentGroups[lSegmentGroupsLength - 1].timeOfArrivalShow;
    }
  }


  ngAfterViewInit(): void {
    if (this.indexSegment === 1) {
      const segmentCheck = {
        indexSegment_: this.indexSegment,
        radioId_: this.radioButtonName + '_' + this.recommendationId + '_' + this.sectionId + '_' + this.segment.segmentId + '_' + this.indexSegment,
        segment_: this.segment,
        section_: this.section
      };
      this.outSegmentCheck.emit(segmentCheck);

      $("#" +
        this.radioButtonName + '_' +
        this.recommendationId + '_' +
        this.sectionId + '_' +
        this.segment.segmentId + '_' +
        this.indexSegment).prop("checked", true);
    }
  }

  listSegmentGroups(flagSegmentId, lSegmentGroups) {
    this.lSegmentGroups = lSegmentGroups;
    $("#" + flagSegmentId).show();
  }

  hideSegmentGroups(flagSegmentId) {
    this.lSegmentGroups = [];
    $("#" + flagSegmentId).hide();
  }

  selectRadioButton(radioId) {
    const segmentCheck = {
      indexSegment_: this.indexSegment,
      radioId_: radioId,
      segment_: this.segment,
      section_: this.section
    };
    this.outSegmentCheck.emit(segmentCheck);
  }

}
