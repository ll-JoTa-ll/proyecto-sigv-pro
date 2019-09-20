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
