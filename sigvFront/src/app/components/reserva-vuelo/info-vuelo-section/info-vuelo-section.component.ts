import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-info-vuelo-section',
  templateUrl: './info-vuelo-section.component.html',
  styleUrls: ['./info-vuelo-section.component.sass']
})
export class InfoVueloSectionComponent implements OnInit {

  @Input() section;
  @Input() tipoVuelo;
  @Input() sectionLength;
  @Input() posicion;
  @Input() LSection;
  @Input() index;
  @Input() lstBag;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  textType;
  imgIdaVuelta;
  marketingcarrier;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    console.log("adsasdd"+ this.section);
    if (this.sectionLength === 1) {
      this.textType = 'Ida';
      this.imgIdaVuelta = 'airplane_ida.svg';
    }

    if (this.tipoVuelo === 'RT') {
      if (this.posicion % 2 === 0) {
        this.textType = 'Vuelta';
        this.imgIdaVuelta = 'airplane_vuelta.svg';
      } else {
        this.textType = 'Ida';
        this.imgIdaVuelta = 'airplane_ida.svg';
      }
    }

    if (this.tipoVuelo === 'MC') {
      this.textType = 'Tramo ' + this.posicion;
    }
  }

  ObtenerAirline($event) {
     this.marketingcarrier = $event;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg m-resumen' })
    );
  }

}
