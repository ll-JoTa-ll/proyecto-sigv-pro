import { Component, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-familias-vacias',
  templateUrl: './modal-familias-vacias.component.html',
  styleUrls: ['./modal-familias-vacias.component.sass']
})
export class ModalFamiliasVaciasComponent implements OnInit {

  constructor(private sessionStorageService: SessionStorageService,private router: Router,public modalRef: BsModalRef) { }

  ngOnInit() {
  }

  VolverHome(){
    this.modalRef.hide();
  }

}
