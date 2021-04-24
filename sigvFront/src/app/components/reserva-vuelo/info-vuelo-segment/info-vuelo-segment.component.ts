import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-vuelo-segment',
  templateUrl: './info-vuelo-segment.component.html',
  styleUrls: ['./info-vuelo-segment.component.sass']
})
export class InfoVueloSegmentComponent implements OnInit {

  @Input() segment;
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
    this.totalFlightTimeShow = this.segment.totalFlightTimeShow;
    this.lSegmentGroupsLength = this.lengthSegments;
    const lSegmentGroupsLength = this.lSegmentGroupsLength;
    if (lSegmentGroupsLength > 0) {
      this.marketingCarrier = this.segment.ocarrier.carrierId + ".png";
      this.timeOfDepartureShow = this.segment.departureTimeShow;
      this.timeOfArrivalShow = this.segment.arrivalTimeShow;
      this.msjairline.emit(this.marketingCarrier);
    }
  }
}
