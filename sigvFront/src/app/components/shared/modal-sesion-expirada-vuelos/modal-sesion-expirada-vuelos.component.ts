import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-modal-sesion-expirada-vuelos',
  templateUrl: './modal-sesion-expirada-vuelos.component.html',
  styleUrls: ['./modal-sesion-expirada-vuelos.component.sass']
})
export class ModalSesionExpiradaVuelosComponent implements OnInit {

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  localfinish;

  constructor(private localStorageService: LocalStorageService,private SessionStorageService: SessionStorageService, private router: Router, public modalRef: BsModalRef) { }

  ngOnInit() {
  }

  VolverHome(){
    this.router.navigate(['vuelos']);
    this.modalRef.hide();
    this.SessionStorageService.store('indregresar', false);
  }

}
