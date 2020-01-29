import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-infraccion-compra',
  templateUrl: './modal-infraccion-compra.component.html',
  styleUrls: ['./modal-infraccion-compra.component.sass']
})
export class ModalInfraccionCompraComponent implements OnInit {

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
  }

  VolverHome(){
    this.modalRef.hide();
  }

}
