import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vuelo-familia-segment',
  templateUrl: './vuelo-familia-segment.component.html',
  styleUrls: ['./vuelo-familia-segment.component.sass']
})
export class VueloFamiliaSegmentComponent implements OnInit {

  @Input() segment;
  @Input() segmentIndex;
  @Input() segmentsLength;

  marketingCarrier;
  flagCountInc: number;
  flagCountNof: number;
  flagCountCha: number;
  classDivInc: string;
  classDivNof: string;
  classDivCha: string;

  constructor() {
    this.classDivInc = 'classDivInc';
    this.classDivNof = 'classDivNof';
    this.classDivCha = 'classDivCha';
  }

  ngOnInit() {
    this.marketingCarrier = this.segment.oairline.carrierId + '.png';
  }

  selectRadioBtnFam($event) {}

}
