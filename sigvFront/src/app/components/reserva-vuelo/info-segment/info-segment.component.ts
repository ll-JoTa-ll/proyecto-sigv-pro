import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-segment',
  templateUrl: './info-segment.component.html',
  styleUrls: ['./info-segment.component.sass']
})
export class InfoSegmentComponent implements OnInit {

  @Input() segment;
  @Input() tipo;
  @Input() lsegments;

  constructor() { }

  ngOnInit() {
    console.log("asd" + this.segment);
  }

}
