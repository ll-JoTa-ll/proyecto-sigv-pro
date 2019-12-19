import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserCompanyService } from '../../../services/user-company.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUserCompanyModel } from '../../../models/IUserCompany.model';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-pax-centralizador',
  templateUrl: './add-pax-centralizador.component.html',
  styleUrls: ['./add-pax-centralizador.component.sass']
})
export class AddPaxCentralizadorComponent implements OnInit {

  @Output() flagCentralizado = new EventEmitter<boolean>();

  tipoBusqueda: string;
  nombreText: string;
  documentoText: string;
  companyId;
  lstPerson: IUserCompanyModel[] = [];
  lstPasajeros: IUserCompanyModel[] = [];
  maxPax: number;
  p: number[] = [];
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private userCompanyService: UserCompanyService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.sessionStorageService.store('ss_lstPasajeros', this.lstPasajeros);
    this.companyId = this.sessionStorageService.retrieve('ss_companyId');
    this.maxPax = environment.max_pax;
  }

  ngOnInit() {
  }

  seleccionarTipoBusqueda(valor) {
    this.tipoBusqueda = valor;
  }

  search() {
    this.spinner.show();
    const tipoBusqueda = this.tipoBusqueda;
    let freeText = '';
    if (tipoBusqueda === 'N') {
      freeText = this.nombreText;
    }

    if (tipoBusqueda === 'D') {
      freeText = this.documentoText;
    }

    this.userCompanyService.getUserByCompany(this.companyId, freeText).subscribe(
      result => {
        this.lstPerson = result;
      },
      err => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  agregarPasajero(person) {
    const maxPax = this.maxPax;
    let flagVal = 0;
    let lstPasajeros = this.lstPasajeros;
    if (lstPasajeros.length === maxPax) {
      return false;
    }
    lstPasajeros.forEach(function(item) {
      if (item.userId === person.userId) {
        flagVal = 1;
      }
    });

    if (flagVal === 0) {
      this.lstPasajeros.push(person);
    }

    this.lstPasajeros = lstPasajeros;
  }

  eliminarPasajero(pasajero) {
    let flagIndex = 0;
    let lstPasajeros = this.lstPasajeros;
    lstPasajeros.forEach(function(item, index) {
      if (item.userId === pasajero.userId) {
        flagIndex = index;
      }
    });

    lstPasajeros.splice(flagIndex, 1);

    this.lstPasajeros = lstPasajeros;
  }

  continuar(template) {
    if (this.lstPasajeros.length === 0) {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
    } else {
      this.sessionStorageService.store('ss_lstPasajeros', this.lstPasajeros);
      this.flagCentralizado.emit(false);
    }
  }

}
