import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-cerrar-sesion',
  templateUrl: './modal-cerrar-sesion.component.html',
  styleUrls: ['./modal-cerrar-sesion.component.sass']
})
export class ModalCerrarSesionComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,private router: Router,public modalRef: BsModalRef) { }

  ngOnInit() {
  }

  VolverHome(){
    this.router.navigate(['']);
    this.modalRef.hide();
  }

}
