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

  constructor() {
    this.precioTotal = 0;
    this.precioPersona = 0;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let precioTotal = 0;
    this.lstFamilyResult.forEach(function(fam) {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      console.log('fam: ' + JSON.stringify(fam));
      fam.lfareFamilies.forEach(function(item, index) {
        if (index === 0) {
          console.log('item: ' + JSON.stringify(item));
          precioTotal += item.fareFamilyPrice;
        }
      });
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    });
    console.log('precioTotal: ' + precioTotal);
    this.precioTotal = precioTotal;
    this.precioPersona = this.precioTotal / this.nroPersonas;
  }

  sumTotal($event) {
    //this.precioTotal = $event;
  }

}
