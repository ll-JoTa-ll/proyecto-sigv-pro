import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-modal-sesion-warning-vuelos',
  templateUrl: './modal-sesion-warning-vuelos.component.html',
  styleUrls: ['./modal-sesion-warning-vuelos.component.sass']
})
export class ModalSesionWarningVuelosComponent implements OnInit {

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  localfinish;

  constructor(private localStorageService: LocalStorageService,private router: Router, public modalRef: BsModalRef) { }

  ngOnInit() {
  }

  VolverHome() {
    this.modalRef.hide();
  }

}
