import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { environment } from '../../../environments/environment';
import { AirportService } from '../../services/airport.service';
import { IDatosUser } from '../../models/IDatosUser';
import { ICostCenter } from 'src/app/models/ICostCenter';
import { IReasonFlight } from 'src/app/models/IReasonFlight';

@Component({
  selector: 'app-reserva-vuelo',
  templateUrl: './reserva-vuelo.component.html',
  styleUrls: ['./reserva-vuelo.component.sass']
})
export class ReservaVueloComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  flightAvailability_request;
  flightAvailability_result;
  tipovuelo;
  loginDataUser;
  lst_rol_autogestion;
  LSection;
  LPolicies;
  datosuser: IDatosUser;
  currency;
  ocompany;
  lsCostCenter: ICostCenter[];
  lsReasonFlight: IReasonFlight[];

  constructor(
    private modalService: BsModalService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private service: AirportService
  ) {
    this.flightAvailability_request = this.sessionStorageService.retrieve('ss_FlightAvailability_request');
    this.flightAvailability_result = this.sessionStorageService.retrieve('ss_FlightAvailability_result');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.tipovuelo = this.sessionStorageService.retrieve('tipovuelo');
    //this.sessionStorageService.store('ss_FlightAvailability_request', null);
    //this.sessionStorageService.store('ss_FlightAvailability_result', null);
    this.sessionStorageService.store('tipovuelo', null);
    this.lst_rol_autogestion = environment.cod_rol_autogestion;
  }

  ngOnInit() {
    console.log('obj' , this.flightAvailability_request);
    this.LSection = this.flightAvailability_request.Lsections;
    this.LPolicies = this.flightAvailability_request.lpolicies;
    this.ocompany = this.flightAvailability_request.Ocompany;
    this.currency = this.flightAvailability_request.Currency;
    if (this.loginDataUser.orole.roleId === this.lst_rol_autogestion[0]) {
        this.GetUsers();
    }
    this.CostCenter();
    this.ReasonFlight();
  }

  GetUsers() {
      let data = {
        Id: this.loginDataUser.userId
      }
      this.service.GetUser(data).subscribe(
        results => {
             this.datosuser = results;
        },
        err => {
             console.log("error results", err);
        }
      );
  }

  CostCenter() {
    let data = {
      Id: this.ocompany.companyId
    };

    this.service.getCostCenter(data).subscribe(
      results => {
         this.lsCostCenter = results;
      },
      err => {
         console.log('error results', err);
      }
    );
  }

  ReasonFlight() {
    let data = {
      CompanyId: this.ocompany.companyId
    };

    this.service.getReasonFlight(data).subscribe(
      results => {
         this.lsReasonFlight = results;
      },
      err => {
         console.log('error results', err);
      }
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg m-resumen' })
    );
  }

}
