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

  marketingCarrier: string;
  lSegmentGroups: any[] = [];
  timeOfDepartureShow: string;
  timeOfArrivalShow: string;
  lSegmentGroupsLength: number;
  totalFlightTimeShow;



  constructor() { }

  ngOnInit() {
    this.totalFlightTimeShow = this.segment.TotalFlightTimeShow;
    this.lSegmentGroupsLength = this.segment.LsegmentGroups.length;
    const lSegmentGroupsLength = this.lSegmentGroupsLength;
    if (lSegmentGroupsLength > 0) {
      this.marketingCarrier = this.segment.LsegmentGroups[0].MarketingCarrier + ".png";
      this.timeOfDepartureShow = this.segment.LsegmentGroups[0].TimeOfDepartureShow;
      this.timeOfArrivalShow = this.segment.LsegmentGroups[lSegmentGroupsLength - 1].TimeOfArrivalShow;
      this.msjairline.emit(this.marketingCarrier);
    }
  }
}
