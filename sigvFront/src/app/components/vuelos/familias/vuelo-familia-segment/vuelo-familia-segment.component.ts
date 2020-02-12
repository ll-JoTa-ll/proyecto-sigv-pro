import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-vuelo-familia-segment',
  templateUrl: './vuelo-familia-segment.component.html',
  styleUrls: ['./vuelo-familia-segment.component.sass']
})
export class VueloFamiliaSegmentComponent implements OnInit {

  @Input() segment;
  @Input() segmentIndex;
  @Input() segmentsLength;
  @Input() sectionFamilyIndex;

  @Output() idRadioBtnFareFam = new EventEmitter<string>();
  @Output() namefamily = new EventEmitter<string>();
  @Output() colorfamily = new EventEmitter<string>();

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
    let flagCountInc = 0;
    let flagCountNof = 0;
    let flagCountCha = 0;

    this.segment.lfareFamilies.forEach(function(fare) {
      const lstInc = fare.lfamilyServices.filter(x => x.serviceStatus === 'INC');
      const lstNof = fare.lfamilyServices.filter(x => x.serviceStatus === 'NOF');
      const lstCha = fare.lfamilyServices.filter(x => x.serviceStatus === 'CHA');

      if (lstInc.length > flagCountInc) {
        flagCountInc = lstInc.length;
      }

      if (lstNof.length > flagCountNof) {
        flagCountNof = lstNof.length;
      }

      if (lstCha.length > flagCountCha) {
        flagCountCha = lstCha.length;
      }
    });

    this.flagCountInc = flagCountInc;
    this.flagCountNof = flagCountNof;
    this.flagCountCha = flagCountCha;

    const classDivInc = this.classDivInc;
    const classDivNof = this.classDivNof;
    const classDivCha = this.classDivCha;

    const segmentIndex = this.segmentIndex;

    setTimeout(function() {
      let heightDivInc = 30 * flagCountInc;
      let heightDivNof = 30 * flagCountNof;
      let heightDivCha = 30 * flagCountCha;
      if (heightDivInc === 0 || flagCountInc === 1) {
        heightDivInc = 43;
      }
      if (heightDivNof === 0 || flagCountNof === 1) {
        heightDivNof = 43;
      }
      if (heightDivCha === 0 || flagCountCha === 1) {
        heightDivCha = 43;
      }
      $("." + classDivInc + segmentIndex).height(heightDivInc);
      $("." + classDivNof + segmentIndex).height(heightDivNof);
      $("." + classDivCha + segmentIndex).height(heightDivCha);
      $("." + classDivInc + segmentIndex).addClass('div-height');
      $("." + classDivNof + segmentIndex).addClass('div-height');
      $("." + classDivCha + segmentIndex).addClass('div-height');
    }, 50);
  }

  selectRadioBtnFam($event) {
    this.idRadioBtnFareFam.emit($event);
  }

  EventNameFamilia($event) {
    this.namefamily.emit($event);
  }

  EventColorFamilia($event) {
    this.colorfamily.emit($event);
  }
}
