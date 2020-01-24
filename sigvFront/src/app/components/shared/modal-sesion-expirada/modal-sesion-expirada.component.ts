import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-modal-sesion-expirada',
  templateUrl: './modal-sesion-expirada.component.html',
  styleUrls: ['./modal-sesion-expirada.component.sass']
})
export class ModalSesionExpiradaComponent implements OnInit {

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  localfinish;
  idinterval;

  constructor(private sessionStorageService: SessionStorageService,private localStorageService: LocalStorageService,private router: Router,public modalRef: BsModalRef) {

    this.idinterval = this.sessionStorageService.retrieve("ss_interval");
   }

  ngOnInit() {
    var modal = this.modalRef;
  }


  VolverHome(){
    this.router.navigate(['hoteles']);
    this.localfinish = true;
    this.localStorageService.store("ss_countersession",null);
    this.localStorageService.store("ss_countersession",this.localfinish);
    clearInterval(this.idinterval);
    this.modalRef.hide();
  }



}
