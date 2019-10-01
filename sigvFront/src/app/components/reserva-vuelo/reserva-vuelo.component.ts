import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-reserva-vuelo',
  templateUrl: './reserva-vuelo.component.html',
  styleUrls: ['./reserva-vuelo.component.sass']
})
export class ReservaVueloComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg m-resumen' })
    );
  }

}
