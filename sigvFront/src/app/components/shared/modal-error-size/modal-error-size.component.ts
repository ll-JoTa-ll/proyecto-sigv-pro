import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-error-size',
  templateUrl: './modal-error-size.component.html',
  styleUrls: ['./modal-error-size.component.sass']
})
export class ModalErrorSizeComponent implements OnInit {

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
  }

}
