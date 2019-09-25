import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { IFareFamilyModel } from '../../../../models/IFareFamily.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.sass']
})
export class FamiliaComponent implements OnInit {

  @Input() familia: IFareFamilyModel;
  @Input() familiasCount;
  @Input() familyIndex;

  @Output() sumTotal = new EventEmitter<number>();

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
    this.familia.lfareFamilies.forEach(function(fare, index) {
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
    this.sumTotal.emit(sumTotal);
    this.flagCountInc = flagCountInc;
    this.flagCountNof = flagCountNof;
    this.flagCountCha = flagCountCha;

  }

  listFareFamilies(fareFamilyId) {
    this.lfareFamilies = this.familia.lfareFamilies;
    $("#" + fareFamilyId).show();

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
      if (heightDivInc === 0) {
        heightDivInc = 30;
      }
      if (heightDivNof === 0) {
        heightDivNof = 30;
      }
      if (heightDivCha === 0) {
        heightDivCha = 30;
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
    this.lfareFamilies = [];
    $("#" + fareFamilyId).hide();
  }

}
