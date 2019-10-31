import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
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
  @Input() familyLength;

  @Output() idRadioBtnFareFam = new EventEmitter<string>();

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
  idNameFamilyName: string;
  classNameFamilyName: string;

  colorsFare = [
    "white",
    "#3D5DBB",
    "#FF560D",
    "#E8A40C",
    "#FFCD0D",
    "#65E29C",
    "#71FC86",
    "#71D7FC",
    "#9BC53D",
    "#5F1A37",
    "#274C77",
    "#BE95C4",
    "#8EA604",
    "#3C1518",
    "#D90368",
    "#00CC66",
    "#4C2C69",
    "#C33C54"
  ];

  constructor() {
    this.idDivInc = 'idDivInc';
    this.idDivNof = 'idDivNof';
    this.idDivCha = 'idDivCha';

    this.classDivInc = 'classDivInc';
    this.classDivNof = 'classDivNof';
    this.classDivCha = 'classDivCha';

    this.nameRadioBtn = 'nameRadioFam';
    this.idRadioBtn = 'idRadioFam';

    this.idNameFamilyName = 'idNameFamilyName';
    this.classNameFamilyName = 'classNameFamilyName';
  }

  ngOnInit() {
    const fareFamily = this.fareFamily;
    //console.log('fareFamily: ' + JSON.stringify(fareFamily));
    this.lstInc = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'INC');
    this.lstNof = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'NOF');
    this.lstCha = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'CHA');
  }

  ngAfterViewInit() {
    let heightDivInc = 20 * this.flagCountInc;
    let heightDivNof = 20 * this.flagCountNof;
    let heightDivCha = 20 * this.flagCountCha;
    if (heightDivInc === 0 || this.flagCountInc === 1) {
      heightDivInc = 43;
    }
    if (heightDivNof === 0 || this.flagCountNof === 1) {
      heightDivNof = 43;
    }
    if (heightDivCha === 0 || this.flagCountCha === 1) {
      heightDivCha = 43;
    }
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

    if (this.fareFamilyIndex === 1) {
      $('#' + this.idRadioBtn + '_' + this.familyIndex + '_' + this.fareFamilyIndex).prop("checked", true);
      $('#' + this.idNameFamilyName + '_' + this.familyIndex + '_' + this.fareFamilyIndex).css({'background-color': this.colorsFare[this.fareFamilyIndex]});
    }
  }

  selectRadioBtnFam(id) {
    const familyLength = this.familyLength;
    for (let i = 1; i <= familyLength; i++) {
      $('#' + this.idNameFamilyName + '_' + this.familyIndex + '_' + i).css({'background-color': '#C6C6C6'});
    }

    const selRadio = id.split('_');
    const familyIndex = selRadio[1];
    const fareFamilyIndex = selRadio[2];
    $('#' + this.idNameFamilyName + '_' + familyIndex + '_' + fareFamilyIndex).css({'background-color': this.colorsFare[fareFamilyIndex]});
    this.idRadioBtnFareFam.emit(id);
  }

}
