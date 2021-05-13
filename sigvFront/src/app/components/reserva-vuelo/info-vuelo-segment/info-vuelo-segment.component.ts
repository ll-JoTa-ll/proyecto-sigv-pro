import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-vuelo-segment',
  templateUrl: './info-vuelo-segment.component.html',
  styleUrls: ['./info-vuelo-segment.component.sass']
})
export class InfoVueloSegmentComponent implements OnInit {

  @Input() segment;
  @Input() section;
  @Input() bagAllowed;
  @Output() msjairline = new EventEmitter<any>();
  @Input() bagquantity;
  @Input() lengthSegments;

  marketingCarrier: string;
  lSegmentGroups: any[] = [];
  timeOfDepartureShow: string;
  timeOfArrivalShow: string;
  lSegmentGroupsLength: number;
  totalFlightTimeShow;



  constructor() { }

  ngOnInit() {
    console.log("asdsd" + this.segment);
    this.totalFlightTimeShow = this.section.totalFlightTimeShow;
    this.lSegmentGroupsLength = this.lengthSegments;
    const lSegmentGroupsLength = this.lSegmentGroupsLength;
    if (lSegmentGroupsLength > 0) {
      this.marketingCarrier = this.section.ocarrier.carrierId + ".png";
      this.timeOfDepartureShow = this.section.departureTimeShow;
      this.timeOfArrivalShow = this.section.arrivalTimeShow;
      this.msjairline.emit(this.marketingCarrier);
    }
  }
}
