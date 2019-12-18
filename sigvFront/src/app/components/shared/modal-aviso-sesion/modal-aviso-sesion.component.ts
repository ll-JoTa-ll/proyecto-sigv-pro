import { Component, OnInit } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-aviso-sesion',
  templateUrl: './modal-aviso-sesion.component.html',
  styleUrls: ['./modal-aviso-sesion.component.sass']
})
export class ModalAvisoSesionComponent implements OnInit {

  constructor(private sessionStorageService: SessionStorageService,private localStorageService: LocalStorageService,private router: Router,public modalRef: BsModalRef) { }

  ngOnInit() {
  }

  VolverHome(){
    this.modalRef.hide();
  }

}
