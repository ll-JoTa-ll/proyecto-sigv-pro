import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import { IFareFamilyServiceModel } from '../../../../models/IFareFamilyService.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-familia-fare',
  templateUrl: './familia-fare.component.html',
  styleUrls: ['./familia-fare.component.sass']
})
export class FamiliaFareComponent implements OnInit, AfterViewInit {

  @Input() fareFamily: IFareFamilyServiceModel;
  @Input() currency;
  @Input() fareFamilyIndex;
  @Input() flagCountInc;
  @Input() flagCountNof;
  @Input() flagCountCha;
  @Input() familyIndex;

  idDivInc: string;
  idDivNof: string;
  idDivCha: string;
  lstInc: any[] = [];
  lstNof: any[] = [];
  lstCha: any[] = [];
  classDivInc: string;
  classDivNof: string;
  classDivCha: string;
  nameRadioBtn: string;
  idRadioBtn: string;

  constructor() {
    this.idDivInc = 'idDivInc';
    this.idDivNof = 'idDivNof';
    this.idDivCha = 'idDivCha';

    this.classDivInc = 'classDivInc';
    this.classDivNof = 'classDivNof';
    this.classDivCha = 'classDivCha';

    this.nameRadioBtn = 'nameRadioFam';
    this.idRadioBtn = 'idRadioFam';
  }

  ngOnInit() {
    const fareFamily = this.fareFamily;
    //console.log('fareFamily: ' + JSON.stringify(fareFamily));
    this.lstInc = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'INC');
    this.lstNof = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'NOF');
    this.lstCha = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'CHA');
  }

  ngAfterViewInit() {
    const heightDivInc = 20 * this.flagCountInc;
    const heightDivNof = 20 * this.flagCountNof;
    const heightDivCha = 20 * this.flagCountCha;
    /*
    console.log('this.flagCountInc' + this.flagCountInc);
    console.log('this.flagCountNof' + this.flagCountNof);
    console.log('this.flagCountCha' + this.flagCountCha);

    console.log('heightDivInc: ' + heightDivInc);
    console.log('heightDivNof: ' + heightDivNof);
    console.log('heightDivCha: ' + heightDivCha);
    */
    $("." + this.classDivInc + this.familyIndex).height(heightDivInc);
    $("." + this.classDivNof + this.familyIndex).height(heightDivNof);
    $("." + this.classDivCha + this.familyIndex).height(heightDivCha);
  }

}
