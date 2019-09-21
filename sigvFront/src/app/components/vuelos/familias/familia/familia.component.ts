import { Component, OnInit, Input } from '@angular/core';
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

  textoTipo: string;
  imgIdaVuelta: string;
  lfareFamilies: any[] = [];
  fareFamilyId: string;
  flagCountInc: number;
  flagCountNof: number;
  flagCountCha: number;

  constructor() { }

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
    this.familia.lfareFamilies.forEach(function(fare, index) {
      if (index === 0) {
        //
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
    this.flagCountInc = flagCountInc;
    this.flagCountNof = flagCountNof;
    this.flagCountCha = flagCountCha;

  }

  listFareFamilies(fareFamilyId) {
    this.lfareFamilies = this.familia.lfareFamilies;
    $("#" + fareFamilyId).show();
  }

  hideFareFamilies(fareFamilyId) {
    this.lfareFamilies = [];
    $("#" + fareFamilyId).hide();
  }

}
