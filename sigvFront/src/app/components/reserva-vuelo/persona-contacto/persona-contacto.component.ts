import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICostCenter } from '../../../models/ICostCenter';
import { SessionStorageService } from 'ngx-webstorage';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-persona-contacto',
  templateUrl: './persona-contacto.component.html',
  styleUrls: ['./persona-contacto.component.sass']
})
export class PersonaContactoComponent implements OnInit {

  @Input() lsCostCenter: ICostCenter[];
  datosuser: any[] = [];
  inderror: boolean;

  constructor(private sessionStorageService: SessionStorageService) {
    this.datosuser = sessionStorageService.retrieve('objusuarios');
   }

  ngOnInit() {
  }


  ValidarCampos() {
    let regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if ($('#contactocorreo').val().length <= 0) {
      $('#contactocorreo').addClass('campo-invalido');
    } else {
      $('#contactocorreo').removeClass('campo-invalido');
    }

    if ($('#contactotelefono').val().length <= 0) {
      $('#contactotelefono').addClass('campo-invalido');
    } else {
      $('#contactotelefono').removeClass('campo-invalido');
    }

    if (regex.test($('#contactocorreo').val().trim())) {
      this.inderror = false;
    } else {
     this.inderror = true;
    }
  }
}
