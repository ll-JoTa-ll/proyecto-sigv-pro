import { Component,AfterViewInit, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { UserCompanyService } from '../../../services/user-company.service';
import { ICostCenterCompany } from '../../../models/ICostCenterCompany.model';
import { ICostCenterApproval } from 'src/app/models/ICostCenterApproval.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef,BsModalService } from 'ngx-bootstrap/modal';
import { IUserApproval } from 'src/app/models/IUserApproval.model';
import { parse } from 'querystring';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-autorizacion-centro-costo',
  templateUrl: './autorizacion-centro-costo.component.html',
  styleUrls: ['./autorizacion-centro-costo.component.sass']
})
export class AutorizacionCentroCostoComponent implements OnInit {

  nacionalApproval;
  internacionalApproval;
  infraccionApproval;
  reservaApproval;
  rangeApproval;
  divExecption;
  lstException = [];
  lstReservation = [];
  divReserva;
  datoslogin;
  lstCostCenter: ICostCenterCompany[] = [];
  lstUserApproval: IUserApproval[] = [];
  p: number;
  x: number;
  lstCostCenterShow;
  lstUserApprovalShow;
  Ids;
  lstIds = [];
  lstCostMasivo = [];
  nameCostCenter;
  lstCostCenterApproval: ICostCenterApproval[] = [];
  showDivCost = false;
  divNacional = false;
  divInternacional = false;
  max = false;
  showDivPlus = true;
  divCostMasivo = true;
  modalRefPoliticas: BsModalRef;
  maxPax = 6;
  lstPasajeros = [];
  lstAutorizadores = [];
  indice;
  tipo = 'tipoAprovacion';
  constructor(
    private sessionStorageService: SessionStorageService,
    private userCompanyService: UserCompanyService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {

    this.datoslogin = this.sessionStorageService.retrieve('ss_login_data');
   }

  ngOnInit() {
    this.GetCostCenter();
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

    GetCostCenter(){
      const data = {
        CompanyId: this.datoslogin.ocompany.companyId,
        AgencyId: null
      }
      this.userCompanyService.getCostCenterCompany(data.CompanyId).subscribe(
        result => {
            this.lstCostCenter = result;
            this.lstCostCenterShow = result;
            for (let index = 0; index < this.lstCostCenterShow.length; index++) {
              const element = this.lstCostCenterShow[index];
              element.fullname = element.code + element.description;
            }
        },
        err => {
        },
        () => {
        }
      )
    }

    GetUserApproval(template){
      this.modalRefPoliticas = this.modalService.show(
        template,
        Object.assign({}, { class: 'modal-lg1' })
      );
      this.spinner.show();
      const data = {
        CompanyId: this.datoslogin.ocompany.companyId,
      }
      this.userCompanyService.getUserApprovers(data.CompanyId).subscribe(
        result => {
            this.lstUserApproval = result;
            this.lstUserApprovalShow = result;
            for (let index = 0; index < this.lstUserApprovalShow.length; index++) {
              const element = this.lstUserApprovalShow[index];
              element.fullname = element.firstName + element.lastName;
            }
        },
        err => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      )
      this.spinner.hide();
    }

    editarAutorizador(emp,template) {
      this.lstAutorizadores = [];
      this.modalRefPoliticas = this.modalService.show(
        template,
        Object.assign({}, { class: 'modal-lg1' })
      );
      const maxPax = this.maxPax;
      let flagVal = 0;
      let lstPasajeros = this.lstAutorizadores;
      if (lstPasajeros.length === maxPax) {
        this.max = true;
        return false;
      } else {
        this.max = false;
      }
      lstPasajeros.forEach(function(item) {
        if (item.userId === emp.userId) {
          flagVal = 1;
        }
      });

      if (flagVal === 0) {
        this.lstAutorizadores.push(emp);
      }

      this.lstAutorizadores = lstPasajeros;
    }


    agregarPasajero(emp){
      const maxPax = this.maxPax;
    let flagVal = 0;
    let lstPasajeros = this.lstPasajeros;
    if (lstPasajeros.length === maxPax) {
      this.max = true;
      return false;
    }else{
      this.max = false;
    }
    lstPasajeros.forEach(function(item) {
      if (item.costCenterId === emp.costCenterId) {
        flagVal = 1;
      }
    });

    if (flagVal === 0) {
      this.lstPasajeros.push(emp);
    }

    this.lstPasajeros = lstPasajeros;
    }

    eliminarPasajero(pasajero) {
      this.max = false;
      let flagIndex = 0;
      let lstPasajeros = this.lstPasajeros;
      lstPasajeros.forEach(function(item, index) {
        if (item.costCenterId === pasajero.costCenterId) {
          flagIndex = index;
        }
      });

      lstPasajeros.splice(flagIndex, 1);

      this.lstPasajeros = lstPasajeros;
    }

    agregarAprobador(emp, i) {
      if ($('#chkNacional_' + i).is(':checked')) {
        this.nacionalApproval = true;
      } else {
        this.nacionalApproval = false;
      }
      if ($('#chkInternacional_' + i).is(':checked')) {
        this.internacionalApproval = true;
      } else {
        this.internacionalApproval = false;
      }
      if ($('#chkInfracciones_' + i).is(':checked')) {
        this.infraccionApproval = true;
      } else {
        this.infraccionApproval = false;
      }
      if ($('#chkReservas_' + i).is(':checked')) {
        this.reservaApproval = true;
      } else {
        this.reservaApproval = false;
      }
      if ($('#chkRange_' + i).is(':checked')) {
        this.rangeApproval = true;
      } else {
        this.rangeApproval = false;
      }
      const empt = {
        priority: this.lstCostCenterApproval.length + 1,
        userId: emp.userId,
        firstName: $('#firstNameApproval_' + i)[0].innerText,
        lastName: $('#lastNameApproval_' + i)[0].innerText,
        national: this.nacionalApproval,
        international: this.internacionalApproval,
        reservation: this.reservaApproval,
        exception: this.infraccionApproval,
        approvalRange: this.rangeApproval
      }
      const maxPax = this.maxPax;
    let flagVal = 0;
    let lstPasajeros = this.lstCostCenterApproval;
    if (lstPasajeros.length === maxPax) {
      this.max = true;
      this.toastr.error('', 'Puede tener como maximo 6 aprobadores.', {
        timeOut: 4000
      });
      return false;
    }else{
      this.max = false;
    }
    lstPasajeros.forEach(function(item) {
      if (item.userId === empt.userId) {
        flagVal = 1;
      }
    });

    if (flagVal === 0) {

      if (empt.exception === true && empt.reservation === false) {
        this.divExecption = true;
        this.lstException.push(empt);
      } else {
        if (this.divExecption === true && this.divReserva === true) {
          this.divExecption = true;
        } else {
          this.divExecption = false;
        }

      }
      if (empt.reservation === true && empt.exception === false) {
        this.divReserva = true;
        this.lstReservation.push(empt);
      } else {
        if (this.divExecption === true && this.divReserva === true){
          this.divReserva = true;
        } else {
          this.divReserva = false;
        }

      }
      if (empt.reservation === false && empt.exception === false) {
        this.divReserva = true;
        this.divExecption = true;
        this.lstReservation.push(empt);
        this.lstException.push(empt);
      } else {

      }
      if (empt.reservation === true && empt.exception === true) {
        this.divReserva = true;
        this.divExecption = true;
        this.lstReservation.push(empt);
        this.lstException.push(empt);
      } else {

      }

     // this.lstCostCenterApproval.push(empt);
      this.toastr.success('', 'Aprobador agregado.', {
        timeOut: 4000
      });
    } else {
      this.toastr.error('', 'Por favor intente nuevamente.', {
        timeOut: 4000
      });
    }

    this.lstCostCenterApproval = lstPasajeros;
    }

    cancelar(){
      this.showDivCost = false;
      this.lstCostCenterApproval = [];
    }


    GetCostCenterApproval(costCenterId, nameCostCenter) {
      this.divExecption = false;
      this.divReserva = false;
      this.lstReservation = [];
      this.lstException = [];
      this.indice = 0;
      this.spinner.show();
      this.nameCostCenter = nameCostCenter;
      this.lstIds = [];
      let nombre;
      nombre = $('#box_1').val();
      this.lstIds.push(costCenterId);
      const data = {
        Ids: this.lstIds
      }
      this.userCompanyService.getCostCenterApproval(data).subscribe(
        result => {
            this.lstCostCenterApproval = result;
            this.lstCostCenterApproval.forEach(element => {
              if (element.exception === true && element.reservation === false) {
                this.divExecption = true;
                this.lstException.push(element);
              } else {
                if (this.divExecption === true && this.divReserva === true) {
                  this.divExecption = true;
                } else {
                  this.divExecption = false;
                }

              }
              if (element.reservation === true && element.exception === false) {
                this.divReserva = true;
                this.lstReservation.push(element);
              } else {
                if (this.divExecption === true && this.divReserva === true){
                  this.divReserva = true;
                } else {
                  this.divReserva = false;
                }

              }
              if (element.reservation === false && element.exception === false) {
                this.divReserva = true;
                this.divExecption = true;
                this.lstReservation.push(element);
                this.lstException.push(element);
              } else {

              }
              if (element.reservation === true && element.exception === true) {
                this.divReserva = true;
                this.divExecption = true;
                this.lstReservation.push(element);
                this.lstException.push(element);
              } else {

              }
            });
        },
        err => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      )
      this.spinner.hide();
      this.showDivCost = true;
      this.divCostMasivo = false;
      this.showDivPlus = false;
    }

    nacionalCheck(event: any){
      console.log(event.target.checked);
    }

    openAddAutorization(template) {
      this.modalRefPoliticas = this.modalService.show(
        template,
        Object.assign({}, { class: 'modal-lg1' })
      );
    }

    GetCostCenterApprovalMasivo(){
      if(this.lstPasajeros.length <= 1){
        this.toastr.error('', 'Por favor seleccionar al menos dos centros de costos.', {
          timeOut: 4000
        });
      } else {
        this.spinner.show();
        for (let index = 0; index < this.lstPasajeros.length; index++) {
          const element = this.lstPasajeros[index].costCenterId;
          this.lstCostMasivo.push(element);
        }
        const data = {
          Ids: this.lstCostMasivo
        }
        this.userCompanyService.getCostCenterApproval(data).subscribe(
          result => {
              this.lstCostCenterApproval = result;
          },
          err => {
            this.spinner.hide();
          },
          () => {
            this.spinner.hide();
          }
        )
        this.spinner.hide();
        this.showDivCost = true;
        this.divCostMasivo = false;
        this.showDivPlus = false;
      }
    }


    public change(event) {
      this.FiltrarNombre();
   }

   public changeAdd(event) {
    this.FiltrarNombreAddApproval();
 }

    FiltrarNombre() {
      let nombre;
      let results;
      let listado;
      listado = this.lstCostCenterShow;
      nombre = $('#centrocosto').val();
      results = listado.filter(m => m.fullname.toUpperCase().includes(nombre.toUpperCase()))
      this.lstCostCenter = results;
    }

    FiltrarNombreAddApproval() {
      let nombre;
      let results;
      let listado;
      listado = this.lstUserApprovalShow;
      nombre = $('#inputApproval').val();
      results = listado.filter(m => m.fullname.toUpperCase().includes(nombre.toUpperCase()))
      this.lstUserApproval = results;
    }

}
