import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-modal-hoteles-vacios',
  templateUrl: './modal-hoteles-vacios.component.html',
  styleUrls: ['./modal-hoteles-vacios.component.sass']
})
export class ModalHotelesVaciosComponent implements OnInit {
  reserva;

  constructor(private sessionStorageService: SessionStorageService,private router: Router,public modalRef: BsModalRef) { 
    this.reserva = this.sessionStorageService.retrieve("reserva");
  }

  ngOnInit() {
  }
  VolverHome(){
    this.modalRef.hide();
  }

}
