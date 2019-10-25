import { Component, OnInit, TemplateRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IPnrConfirm } from '../../../models/IPnrConfirm.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-aprobacion-reserva',
  templateUrl: './aprobacion-reserva.component.html',
  styleUrls: ['./aprobacion-reserva.component.sass']
})
export class AprobacionReservaComponent implements OnInit {

  lspnrresults: IPnrConfirm;
  Lsection;
  LPolicies;
  lsflightavailability;
  lsapprover;
  dataflightavalilability;
  currency;
  fechatimelimit;
  horatimelimit;
  lusers;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(private sessionStorageService: SessionStorageService, private modalservice: BsModalService) {
    this.Lsection = this.sessionStorageService.retrieve('sectioninfo');
    this.LPolicies = this.sessionStorageService.retrieve('politicas');
    this.lsflightavailability = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.lsapprover = this.sessionStorageService.retrieve('lsapprover');
    this.dataflightavalilability = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    this.lspnrresults = this.sessionStorageService.retrieve('datapnr');
    this.lusers = this.sessionStorageService.retrieve('lsuser');
  }

  ngOnInit() {
    this.currency = this.dataflightavalilability.Currency;
    this.FormatearFechaPnr();
  }

  FormatearFechaPnr() {
    let data;
    let fecha;
    let hora;
    data = this.lspnrresults.timeLimit;
    fecha = data.substr(0, 10);
    hora =  data.substr(11, 16);
    this.fechatimelimit = fecha;
    this.horatimelimit = hora;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalservice.show(
      template,
      Object.assign({}, { class: 'gray modal-lg m-infraccion' })
    );
}

}
