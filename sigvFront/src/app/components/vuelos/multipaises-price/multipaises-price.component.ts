import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-multipaises-price',
  templateUrl: './multipaises-price.component.html',
  styleUrls: ['./multipaises-price.component.sass']
})
export class MultipaisesPriceComponent implements OnInit {

  @Input() priceByPseudo;
  @Input() currency;

  constructor() { }

  ngOnInit() {
    const priceByPseudo = this.priceByPseudo;
    priceByPseudo.forEach(function(price) {
      price.pseudo = price.pseudo + '.png';
    });
  }

}
