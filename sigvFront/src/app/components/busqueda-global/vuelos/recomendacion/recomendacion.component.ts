import { Component, OnInit, Input, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ISearchFlightModel } from '../../../../models/ISearchFlight.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-recomendacion',
  templateUrl: './recomendacion.component.html',
  styleUrls: ['./recomendacion.component.sass']
})
export class RecomendacionComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  @Input() currency: string;
  @Input() totalFareAmount: number;
  @Input() totalTaxAmount: number;
  @Input() fareAmountByPassenger: number;
  @Input() taxAmountByPassenger: number;
  @Input() fareTaxAmountByPassenger: number;
  @Input() carrierId: string;
  @Input() numberPassengers: number;
  @Input() pseudo: string;
  @Input() lsections: any[];
  @Input() lsectionLength: number;
  @Input() lpolicies: any[];
  @Input() recommendationId: number;
  @Input() tipoVuelo: string;

  segmentRadioCheckId;

  constructor(
    private modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>, recommendationId) {

    console.log(this.recommendationId);
    console.log(JSON.stringify(this.lsections));

    return false;

    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  setearRadioId($event) {
    console.log("RecomendacionComponent");
    console.log($event);
    this.segmentRadioCheckId = $event;
  }

}
