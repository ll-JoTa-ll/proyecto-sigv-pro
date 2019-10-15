import { Component, OnInit } from '@angular/core';
import { UserCompanyService } from '../../../services/user-company.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUserCompanyModel } from '../../../models/IUserCompany.model';

@Component({
  selector: 'app-add-pax-centralizador',
  templateUrl: './add-pax-centralizador.component.html',
  styleUrls: ['./add-pax-centralizador.component.sass']
})
export class AddPaxCentralizadorComponent implements OnInit {

  tipoBusqueda: string;
  nombreText: string;
  documentoText: string;
  companyId;
  lstPerson: IUserCompanyModel[] = [];
  lstPasajeros: IUserCompanyModel[] = [];

  constructor(
    private userCompanyService: UserCompanyService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService
  ) {
    this.companyId = this.sessionStorageService.retrieve('ss_companyId');
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
        console.log('result: ' + result.slice(0, 10));
        this.lstPerson = result.slice(0, 10);
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
    let flagVal = 0;
    let lstPasajeros = this.lstPasajeros;
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

}
