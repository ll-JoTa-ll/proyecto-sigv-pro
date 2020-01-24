import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { IBnusModel } from '../../../../models/Ibnus.model';

@Component({
  selector: 'app-boletos-nousados',
  templateUrl: './boletos-nousados.component.html',
  styleUrls: ['./boletos-nousados.component.sass']
})
export class BoletosNousadosComponent implements OnInit {

  lstBnus: IBnusModel[];
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

  constructor(public modalRef: BsModalRef, private sessionstorageService: SessionStorageService) {
      this.lstBnus = this.sessionstorageService.retrieve('lstbnus');
   }

  ngOnInit() {
  }

}
