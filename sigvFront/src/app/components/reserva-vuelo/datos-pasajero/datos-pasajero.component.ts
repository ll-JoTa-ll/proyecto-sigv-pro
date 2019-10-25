import { Component, OnInit, TemplateRef, Input, Output, AfterViewInit, Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IDatosUser } from 'src/app/models/IDatosUser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ICostCenter } from '../../../models/ICostCenter';
import { IReasonFlight } from '../../../models/IReasonFlight';

@Component({
  selector: 'app-datos-pasajero',
  templateUrl: './datos-pasajero.component.html',
  styleUrls: ['./datos-pasajero.component.sass']
})
export class DatosPasajeroComponent implements OnInit, AfterViewInit {

  /*
  @Input() datosuser: {
    name: '',
    lastName: '',
    documentType: '',
    documentNumber: '',
    nationality: '',
    birthDate: '',
    email: '',
    phone: '',
    frequentFlyer: ''
  };
  */
  @Input() LPolicies;
  @Input() currency;
  @Input() user;
  @Input() index;
  selectedvalue;
  fechanacimiento;
  datosPax;
  flagValDatosPAsajeros: boolean = false;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  datos;


  constructor(private modalService: BsModalService) {
    this.flagValDatosPAsajeros = false;
    /*
    console.log('constructor');
    console.log('this.datosuser: ' + JSON.stringify(this.datosuser));

      this.datosuser.name = '';
      this.datosuser.lastName = '';
      this.datosuser.documentType = '';
      this.datosuser.documentNumber = '';
      this.datosuser.nationality = '';
      //this.datosuser.birthDate = '';
      this.datosuser.email = '';
      this.datosuser.phone = '';
      this.datosuser.frequentFlyer = '';
    */
  }

  ngOnInit() {
    /*
    console.log('ngOnInit');
    this.datosPax = this.datosuser;
    console.log('this.datosPax: ' + JSON.stringify(this.datosPax));
    console.log('this.datosuser: ' + JSON.stringify(this.datosuser));
    */
  }

  ngAfterViewInit() {
    this.flagValDatosPAsajeros = true;
    console.log('ngAfterViewInit DatosPasajeroComponent');
  }

  openModal(template: TemplateRef<any>, template2: TemplateRef<any>) {
    if (this.LPolicies.length === 0) {
      this.modalRef = this.modalService.show(
        template2,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
    } else {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
    }
  }
}
