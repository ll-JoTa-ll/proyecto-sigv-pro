import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-precio-final',
  templateUrl: './precio-final.component.html',
  styleUrls: ['./precio-final.component.sass']
})
export class PrecioFinalComponent implements OnInit {

  @Input() precioadulto: number;
  @Input() preciototal: number;
  @Input() currency: string;
  @Input() Lpolicies: string;
  @Input() tipo: number;
  @Input() LSection;
  @Input() Litineraries;
  @Input() montodesc;
  @Input() porcentajedesc;
  @Input() odiscount;
  porcentaje;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService) { 
  }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
  }

}
