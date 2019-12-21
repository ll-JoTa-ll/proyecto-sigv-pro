import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { IFareFamilyServiceModel } from '../../../../models/IFareFamilyService.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

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
  @Input() segmentIndex;
  @Input() familyLength;
  @Input() sectionIndex;

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

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService
  ) {
    console.log("FamiliaFareComponent constructor");
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
    console.log("FamiliaFareComponent ngOnInit");
    const fareFamily = this.fareFamily;
    //console.log('fareFamily: ' + JSON.stringify(fareFamily));
    this.lstInc = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'INC');
    this.lstNof = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'NOF');
    this.lstCha = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'CHA');
  }

  ngAfterViewInit() {
    console.log("FamiliaFareComponent ngAfterViewInit");
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

    console.log('this.flagCountInc' + this.flagCountInc);
    console.log('this.flagCountNof' + this.flagCountNof);
    console.log('this.flagCountCha' + this.flagCountCha);

    console.log('heightDivInc: ' + heightDivInc);
    console.log('heightDivNof: ' + heightDivNof);
    console.log('heightDivCha: ' + heightDivCha);

    $("." + this.classDivInc + this.segmentIndex).height(heightDivInc);
    $("." + this.classDivNof + this.segmentIndex).height(heightDivNof);
    $("." + this.classDivCha + this.segmentIndex).height(heightDivCha);

    /*
    if (this.fareFamilyIndex === 1) {
      $('#' + this.idRadioBtn + '_' + this.sectionIndex + '_' + this.segmentIndex + '_' + this.fareFamilyIndex).prop("checked", true);
      $('#' + this.idNameFamilyName + '_' + this.sectionIndex + '_' + this.segmentIndex  + '_' + this.fareFamilyIndex).css({'background-color': this.colorsFare[this.fareFamilyIndex]});
    }
    */
    //this.sessionStorageService.store('ss_FlightAvailability_request1', dataFamilias);
    const ss_FlightAvailability_request1 = this.sessionStorageService.retrieve('ss_FlightAvailability_request1');
    const ss_lstFamilyResult = this.sessionStorageService.retrieve('ss_lstFamilyResult');

    //console.log("ss_FlightAvailability_request1: " + JSON.stringify(ss_FlightAvailability_request1));
    //console.log("ss_lstFamilyResult: " + JSON.stringify(ss_lstFamilyResult));

    const sectionIndex = this.sectionIndex;
    const segmentIndex = this.segmentIndex;
    const fareFamilyIndex = this.fareFamilyIndex;
    //const fareBasis = ss_lstFamilyResult.lsections[this.sectionIndex].lsegments[this.segmentIndex].lfareFamilies[this.fareFamilyIndex].fareBasis;
    const idRadioBtn = this.idRadioBtn;
    const idNameFamilyName = this.idNameFamilyName;
    //const sectionIndex = this.sectionIndex;
    //const segmentIndex = this.segmentIndex;
    const colorsFare = this.colorsFare;
    //const fareFamilyIndex = this.fareFamilyIndex;

    /*
    ss_FlightAvailability_request1.Lsections.forEach(function (sectionS, indexSectionS) {
      sectionS.Lsegments[0].LsegmentGroups.forEach(function (grupoS, indexGrupoS) {
        if (indexSectionS == sectionIndex) {
          const fareBasisS = grupoS.FareBasis;
          ss_lstFamilyResult.lsections[indexSectionS].lsegments[indexGrupoS].lfareFamilies.forEach(function (a, b) {
            if (fareBasisS == a.fareBasis) {
              $('#' + idRadioBtn + '_' + sectionIndex + '_' + segmentIndex + '_' + (b + 1)).prop("checked", true);
              $('#' + idNameFamilyName + '_' + sectionIndex + '_' + segmentIndex  + '_' + (b + 1)).css({'background-color': colorsFare[fareFamilyIndex]});
            }
          });
        }
      });
    });
    */

    const fareBasisVal = ss_lstFamilyResult.lsections[this.sectionIndex].lsegments[this.segmentIndex].lfareFamilies[(this.fareFamilyIndex - 1)].fareBasis;
    const fareBasisServ = ss_FlightAvailability_request1.Lsections[sectionIndex].Lsegments[0].LsegmentGroups[this.segmentIndex].FareBasis;

    if (fareBasisVal == fareBasisServ) {
      $('#' + idRadioBtn + '_' + sectionIndex + '_' + segmentIndex + '_' + (fareFamilyIndex)).prop("checked", true);
      $('#' + idNameFamilyName + '_' + sectionIndex + '_' + segmentIndex  + '_' + (fareFamilyIndex)).css({'background-color': colorsFare[fareFamilyIndex]});
    }

  }

  selectRadioBtnFam(id) {
    //console.log('id: ' + id);
    const familyLength = this.familyLength;
    //console.log('familyLength: ' + familyLength);
    for (let i = 1; i <= familyLength; i++) {
      const idCab = '#' + this.idNameFamilyName + '_' + this.sectionIndex + '_' + this.segmentIndex  + '_' + i;
      $(idCab).css({'background-color': '#C6C6C6'});
    }

    const selRadio = id.split('_');
    const sectionIndex = selRadio[1];
    const segmentIndex = selRadio[2];
    const fareFamilyIndex = selRadio[3];
    $('#' + this.idNameFamilyName + '_' + sectionIndex + '_' + segmentIndex + '_' + fareFamilyIndex).css({'background-color': this.colorsFare[fareFamilyIndex]});
    this.idRadioBtnFareFam.emit(id);
  }

}
