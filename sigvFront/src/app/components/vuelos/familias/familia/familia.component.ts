import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { IFareFamilyModel } from '../../../../models/IFareFamily.model';
import { IFamilyResultSectionModel } from '../../../../models/IFamilyResultSection.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.sass']
})
export class FamiliaComponent implements OnInit {

  @Input() familia: IFamilyResultSectionModel;
  @Input() familiasCount;
  @Input() familyIndex;

  @Output() sumTotal = new EventEmitter<number>();
  @Output() idRadioBtnFareFam = new EventEmitter<string>();

  textoTipo: string;
  imgIdaVuelta: string;
  lfareFamilies: any[] = [];
  fareFamilyId: string;
  flagCountInc: number;
  flagCountNof: number;
  flagCountCha: number;
  classDivInc: string;
  classDivNof: string;
  classDivCha: string;

  colorsFare = [
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

  isCollapsed = true;

  constructor() {
    this.classDivInc = 'classDivInc';
    this.classDivNof = 'classDivNof';
    this.classDivCha = 'classDivCha';
  }

  ngOnInit() {
    this.fareFamilyId = 'fareFamilyId' + this.familyIndex;

    if (this.familiasCount === 1) {
      this.textoTipo = 'Ida';
      this.imgIdaVuelta = 'airplane_ida.svg';
    }

    if (this.familiasCount === 2) {
      if (this.familyIndex === 1) {
        this.textoTipo = 'Ida';
        this.imgIdaVuelta = 'airplane_ida.svg';
      }
      if (this.familyIndex === 2) {
        this.textoTipo = 'Vuelta';
        this.imgIdaVuelta = 'airplane_vuelta.svg';
      }
    }

    if (this.familiasCount > 2) {
      this.textoTipo = 'Tramo ' + this.familyIndex;
      this.imgIdaVuelta = 'airplane_ida.svg';
    }


    console.log('calculando altura mas alta');
    let flagCountInc = 0;
    let flagCountNof = 0;
    let flagCountCha = 0;
    let sumTotal = 0;
    /*
    this.familia.lsegments.forEach(function(segment, index) {
      if (index === 0) {
        sumTotal += fare.fareFamilyPrice;
      }
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
    */
    this.flagCountInc = flagCountInc;
    this.flagCountNof = flagCountNof;
    this.flagCountCha = flagCountCha;
  }

  listFareFamilies(fareFamilyId) {
    const isCollapsed = this.isCollapsed;
    this.isCollapsed = !isCollapsed;

    //this.lfareFamilies = this.familia.lfareFamilies;

    const flagCountInc = this.flagCountInc;
    const flagCountNof = this.flagCountNof;
    const flagCountCha = this.flagCountCha;

    const classDivInc = this.classDivInc;
    const classDivNof = this.classDivNof;
    const classDivCha = this.classDivCha;

    const familyIndex = this.familyIndex;

    setTimeout(function() {
      let heightDivInc = 20 * flagCountInc;
      let heightDivNof = 20 * flagCountNof;
      let heightDivCha = 20 * flagCountCha;
      if (heightDivInc === 0 || flagCountInc === 1) {
        heightDivInc = 43;
      }
      if (heightDivNof === 0 || flagCountNof === 1) {
        heightDivNof = 43;
      }
      if (heightDivCha === 0 || flagCountCha === 1) {
        heightDivCha = 43;
      }
      console.log('heightDivInc: ' + heightDivInc);
      console.log('heightDivNof: ' + heightDivNof);
      console.log('heightDivCha: ' + heightDivCha);
      $("." + classDivInc + familyIndex).height(heightDivInc);
      $("." + classDivNof + familyIndex).height(heightDivNof);
      $("." + classDivCha + familyIndex).height(heightDivCha);
      $("." + classDivInc + familyIndex).addClass('div-height');
      $("." + classDivNof + familyIndex).addClass('div-height');
      $("." + classDivCha + familyIndex).addClass('div-height');
    }, 10);
  }

  hideFareFamilies(fareFamilyId) {
    //this.lfareFamilies = [];
    //$("#" + fareFamilyId).hide();
    const isCollapsed = this.isCollapsed
    this.isCollapsed = !isCollapsed;
  }

  selectRadioBtnFam($event) {
    console.log('idRadioBtnFareFam: ' + $event);
    this.idRadioBtnFareFam.emit($event);
  }

}
