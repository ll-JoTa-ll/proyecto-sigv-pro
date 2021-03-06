import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { IFareFamilyServiceModel } from '../../../../models/IFareFamilyService.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-familia-fare-v2',
  templateUrl: './familia-fare-v2.component.html',
  styleUrls: ['./familia-fare-v2.component.sass']
})
export class FamiliaFareV2Component implements OnInit {

  @Input() fareFamily: IFareFamilyServiceModel;
  @Input() currency;
  @Input() fareFamilyIndex;
  @Input() flagCountInc;
  @Input() flagCountNof;
  @Input() flagCountCha;
  @Input() segmentIndex;
  @Input() familyLength;
  @Input() sectionIndex;

  @Output() idRadioBtnFareFam = new EventEmitter<string>();
  @Output() namefamily = new EventEmitter<string>();
  @Output() colorfamily = new EventEmitter<string>();
  @Output() hidesection = new EventEmitter<boolean>();

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
  idNameFamilyName1: string;
  classNameFamilyName: string;
  seleccionado: boolean;
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

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService
  ) {
    this.idDivInc = 'idDivInc';
    this.idDivNof = 'idDivNof';
    this.idDivCha = 'idDivCha';

    this.classDivInc = 'classDivInc';
    this.classDivNof = 'classDivNof';
    this.classDivCha = 'classDivCha';

    this.nameRadioBtn = 'nameRadioFam';
    this.idRadioBtn = 'idRadioFam';

    this.idNameFamilyName = 'idNameFamilyName';
    this.idNameFamilyName1 = 'idNameFamilyName1';
    this.classNameFamilyName = 'classNameFamilyName';
  }

  ngOnInit() {
    const fareFamily = this.fareFamily;
    this.lstInc = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'INC');
    this.lstNof = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'NOF');
    this.lstCha = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'CHA');
  }

  ngAfterViewInit() {
    let heightDivInc = 20 * this.flagCountInc;
    let heightDivNof = 20 * this.flagCountNof;
    let heightDivCha = 20 * this.flagCountCha;
    if (heightDivInc === 0 || this.flagCountInc === 1) {
      heightDivInc = 180;
    }
    if (heightDivNof === 0 || this.flagCountNof === 1) {
      heightDivNof = 210;
    }
    if (heightDivCha === 0 || this.flagCountCha === 1) {
      heightDivCha = 160;
    }


    $("." + this.classDivInc + this.segmentIndex).height(heightDivInc);
    $("." + this.classDivNof + this.segmentIndex).height(heightDivNof);
    $("." + this.classDivCha + this.segmentIndex).height(heightDivCha);

    const ss_FlightAvailability_request1 = this.sessionStorageService.retrieve('ss_FlightAvailability_request1');
    const ss_lstFamilyResult = this.sessionStorageService.retrieve('ss_lstFamilyResult');
    const sectionIndex = this.sectionIndex;
    const segmentIndex = this.segmentIndex;
    const fareFamilyIndex = this.fareFamilyIndex;
    const idRadioBtn = this.idRadioBtn;
    const idNameFamilyName = this.idNameFamilyName;
    const idNameFamilyName1 = this.idNameFamilyName1;
    const colorsFare = this.colorsFare;

    const fareBasisVal = ss_lstFamilyResult.lsections[this.sectionIndex].lsegments[this.segmentIndex].lfareFamilies[(this.fareFamilyIndex - 1)].fareBasis;
    const fareBasisServ = ss_FlightAvailability_request1.Lsections[sectionIndex].Lsegments[0].LsegmentGroups[this.segmentIndex].FareBasis;
    if (fareBasisVal == fareBasisServ) {
      $('#' + idRadioBtn + '_' + sectionIndex + '_' + segmentIndex + '_' + (fareFamilyIndex)).prop("checked", true);
      $('#' + idNameFamilyName + '_' + sectionIndex + '_' + segmentIndex  + '_' + (fareFamilyIndex)).css({'background-color': colorsFare[fareFamilyIndex]});
      let nombrefamilia = $('#' + idNameFamilyName + '_' + sectionIndex + '_' + segmentIndex  + '_' + (fareFamilyIndex)).html();
      let colorfamilia = colorsFare[fareFamilyIndex];
      this.namefamily.emit(nombrefamilia);
      this.colorfamily.emit(colorfamilia);
      console.log(colorfamilia);
      $('#' + idNameFamilyName1 + '_' + sectionIndex + '_' + segmentIndex  + '_' + (fareFamilyIndex)).css({'background-color': colorsFare[fareFamilyIndex]});
    }
  }

  selectRadioBtnFam(id) {
    //console.log('id: ' + id);
    const familyLength = this.familyLength;
    //console.log('familyLength: ' + familyLength);
    for (let i = 1; i <= familyLength; i++) {
      const idCab = '#' + this.idNameFamilyName + '_' + this.sectionIndex + '_' + this.segmentIndex  + '_' + i;
      const idcab2 = '#' + this.idNameFamilyName1 + '_' + this.sectionIndex + '_' + this.segmentIndex  + '_' + i;
      $(idCab).css({'background-color': '#C6C6C6'});
      $(idcab2).css({'background-color': '#C6C6C6'});
    }
    const selRadio = id.split('_');
    const sectionIndex = selRadio[1];
    const segmentIndex = selRadio[2];
    const fareFamilyIndex = selRadio[3];
    $('#' + this.idNameFamilyName + '_' + sectionIndex + '_' + segmentIndex + '_' + fareFamilyIndex).css({'background-color': this.colorsFare[fareFamilyIndex]});
    $('#' + this.idNameFamilyName1 + '_' + sectionIndex + '_' + segmentIndex + '_' + fareFamilyIndex).css({'background-color': this.colorsFare[fareFamilyIndex]});
    console.log(id);
    let namefamilia = $('#' + this.idNameFamilyName + '_' + sectionIndex + '_' + segmentIndex + '_' + fareFamilyIndex).html();
    let colorfamilia = this.colorsFare[fareFamilyIndex];
    this.colorfamily.emit(colorfamilia);
    this.namefamily.emit(namefamilia);
    console.log(colorfamilia);
    this.idRadioBtnFareFam.emit(id);
    this.hidesection.emit(true);
  }

}
