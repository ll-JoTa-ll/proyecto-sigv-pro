import { Component, OnInit, Input } from '@angular/core';
import { IFareFamilyServiceModel } from '../../../../models/IFareFamilyService.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-familia-fare',
  templateUrl: './familia-fare.component.html',
  styleUrls: ['./familia-fare.component.sass']
})
export class FamiliaFareComponent implements OnInit {

  @Input() fareFamily: IFareFamilyServiceModel;
  @Input() currency;
  @Input() fareFamilyIndex;
  @Input() flagCountInc;
  @Input() flagCountNof;
  @Input() flagCountCha;

  idDivInc: string;
  idDivNof: string;
  idDivCha: string;
  lstInc: any[] = [];
  lstNof: any[] = [];
  lstCha: any[] = [];

  constructor() {
    this.idDivInc = 'idDivInc';
    this.idDivNof = 'idDivNof';
    this.idDivCha = 'idDivCha';
  }

  ngOnInit() {
    const fareFamily = this.fareFamily;
    console.log('fareFamily: ' + JSON.stringify(fareFamily));

    this.lstInc = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'INC');
    this.lstNof = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'NOF');
    this.lstCha = fareFamily.lfamilyServices.filter(x => x.serviceStatus === 'CHA');

    const heightDivInc = 27 * this.flagCountInc;
    const heightDivNof = 27 * this.flagCountNof;
    const heightDivCha = 27 * this.flagCountCha;
    $("#" + this.idDivInc + this.fareFamilyIndex).height(heightDivInc + 'px');
    $("#" + this.idDivNof + this.fareFamilyIndex).height(heightDivNof + 'px');
    $("#" + this.idDivCha + this.fareFamilyIndex).height(heightDivCha + 'px');

    /*
    let lstInc_: any[] = [];
    let lstNof_: any[] = [];
    let lstCha_: any[] = [];

    fareFamily.lfamilyServices.forEach(function(fare) {
      if (fare.serviceStatus === 'INC') {
        lstInc_.push(fare);
      }
      if (fare.serviceStatus === 'NOF') {
        lstNof_.push(fare);
      }
      if (fare.serviceStatus === 'CHA') {
        lstCha_.push(fare);
      }
    });

    this.lstInc = lstInc_;
    this.lstNof = lstNof_;
    this.lstCha = lstCha_;
    */

    //console.log('this.lstInc: ' + JSON.stringify(this.lstInc));
    //console.log('this.lstNof: ' + JSON.stringify(this.lstNof));
    //console.log('this.lstCha: ' + JSON.stringify(this.lstCha));
  }

}
