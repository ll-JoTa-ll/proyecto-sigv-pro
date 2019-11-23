import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-hoteles-vacios',
  templateUrl: './modal-hoteles-vacios.component.html',
  styleUrls: ['./modal-hoteles-vacios.component.sass']
})
export class ModalHotelesVaciosComponent implements OnInit {

  constructor(private router: Router,public modalRef: BsModalRef) { }

  ngOnInit() {
  }
  VolverHome(){
    this.router.navigate(['']);
    this.modalRef.hide();
  }

}
