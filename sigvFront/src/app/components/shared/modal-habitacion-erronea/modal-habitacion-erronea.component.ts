import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-habitacion-erronea',
  templateUrl: './modal-habitacion-erronea.component.html',
  styleUrls: ['./modal-habitacion-erronea.component.sass']
})
export class ModalHabitacionErroneaComponent implements OnInit {

  confirmacion;


  constructor(private sessionStorageService: SessionStorageService,private router: Router,public modalRef: BsModalRef) {
    this.confirmacion = this.sessionStorageService.retrieve("confirmacion");
   }

  ngOnInit() {
  }

  VolverHome(){
    this.modalRef.hide();
  }

}
