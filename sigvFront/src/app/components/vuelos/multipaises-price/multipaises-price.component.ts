import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-multipaises-price',
  templateUrl: './multipaises-price.component.html',
  styleUrls: ['./multipaises-price.component.sass']
})
export class MultipaisesPriceComponent implements OnInit {

  modalRefMultiPaises: BsModalRef;

  @Input() priceByPseudo;
  @Input() currency;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    console.log('priceByPseudo: ' + JSON.stringify(this.priceByPseudo));
    console.log('currency: ' + this.currency);
    const priceByPseudo = this.priceByPseudo;
    if (this.priceByPseudo != null) {
      priceByPseudo.forEach(function(price) {
        price.pseudo = price.pseudo + '.png';
      });
    }
    
  }

  openModal(template: TemplateRef<any>) {
    this.modalRefMultiPaises = this.modalService.show(template);
  }

}
