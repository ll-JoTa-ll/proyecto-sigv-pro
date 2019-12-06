import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-sesion-expirada',
  templateUrl: './modal-sesion-expirada.component.html',
  styleUrls: ['./modal-sesion-expirada.component.sass']
})
export class ModalSesionExpiradaComponent implements OnInit {
  config = {
    keyboard: true
  };


  constructor(private router: Router,public modalRef: BsModalRef) { }

  ngOnInit() {
  }

  VolverHome(){
    this.router.navigate(['hoteles']);
    this.modalRef.hide();
  }

}
