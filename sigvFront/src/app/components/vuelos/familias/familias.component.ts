import {Component, OnInit, Input, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.sass']
})
export class FamiliasComponent implements OnInit, AfterViewInit {

  @Input() lstFamilyResult;
  @Input() nroPersonas: number;
  @Input() currency: string;
  precioTotal: number;
  precioPersona: number;
  idRadioBtnFareFam: string;
  lstSumaFam: any[] = [];

  constructor() {
    this.precioTotal = 0;
    this.precioPersona = 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let precioTotal = 0;
    let lstSumaFam: any[] = [];
    this.lstFamilyResult.forEach(function(fam, indexFam_) {
      //console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      //console.log('fam: ' + JSON.stringify(fam));
      fam.lfareFamilies.forEach(function(item, index) {
        if (index === 0) {
          //console.log('item: ' + JSON.stringify(item));
          precioTotal += item.fareFamilyPrice;
          const dataSum = {
            indexFam: indexFam_,
            indexFare: index,
            fareFamilyPrice: item.fareFamilyPrice
          };
          lstSumaFam.push(dataSum);
        }
      });
      //console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    });
    this.lstSumaFam = lstSumaFam;
    console.log('precioTotal: ' + precioTotal);
    this.precioTotal = precioTotal;
    this.precioPersona = this.precioTotal / this.nroPersonas;
  }

  sumTotal($event) {
    //this.precioTotal = $event;
  }

  selectRadioBtnFam($event) {
    console.log('idRadioBtnFareFam: ' + $event);
    this.idRadioBtnFareFam = $event;
    const splitId = this.idRadioBtnFareFam.split('_');
    const indexFam = parseFloat(splitId[1]) - 1;
    const indexFare = parseFloat(splitId[2]) - 1;



    let fareFamilyPrice = 0;
    this.lstFamilyResult.forEach(function(fam, index1) {
      fam.lfareFamilies.forEach(function(item, index2) {
        if (index1 === indexFam && index2 === indexFare) {
          fareFamilyPrice = item.fareFamilyPrice;
        }
      });
    });

    let precioTotal = this.precioTotal;

    this.lstSumaFam.forEach(function(item) {
      if (item.indexFam === indexFam) {
        precioTotal = precioTotal - item.fareFamilyPrice;
        precioTotal = precioTotal + fareFamilyPrice;
        item.indexFare = indexFare;
        item.fareFamilyPrice = fareFamilyPrice;
      }
    });

    this.precioTotal = precioTotal;
    this.precioPersona = this.precioTotal / this.nroPersonas;
  }

}
