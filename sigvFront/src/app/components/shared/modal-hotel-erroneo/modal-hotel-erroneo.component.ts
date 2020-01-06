import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-hotel-erroneo',
  templateUrl: './modal-hotel-erroneo.component.html',
  styleUrls: ['./modal-hotel-erroneo.component.sass']
})
export class ModalHotelErroneoComponent implements OnInit {

  habitacion;
  constructor(private sessionStorageService: SessionStorageService,private router: Router,public modalRef: BsModalRef) {
    this.habitacion = this.sessionStorageService.retrieve("lstHabication");
   }

  ngOnInit() {
  }

  VolverHome(){
    this.modalRef.hide();
  }
}
