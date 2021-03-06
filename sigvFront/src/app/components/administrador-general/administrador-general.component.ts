import { Component,AfterViewInit, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-administrador-general',
  templateUrl: './administrador-general.component.html',
  styleUrls: ['./administrador-general.component.sass']
})
export class AdministradorGeneralComponent implements OnInit {


  modalRefPoliticas: BsModalRef;
  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
    }


    openModalPoliticasMedium(template) {
      this.modalRefPoliticas = this.modalService.show(
        template,
        Object.assign({}, { class: 'modal-lg2' })
      );
    }

}
