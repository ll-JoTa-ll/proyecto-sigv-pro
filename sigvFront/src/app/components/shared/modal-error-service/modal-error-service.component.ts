import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-error-service',
  templateUrl: './modal-error-service.component.html',
  styleUrls: ['./modal-error-service.component.sass']
})
export class ModalErrorServiceComponent implements OnInit {

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
  }

}
