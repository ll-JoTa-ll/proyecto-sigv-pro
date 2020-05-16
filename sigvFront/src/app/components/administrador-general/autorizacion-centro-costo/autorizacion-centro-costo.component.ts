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

  newList = [];
  approvalNacional;
  approvalInternacional;
  approvalInfraccion;
  approvalReserva;
  approvalRange;
  nacionalApproval;
  internacionalApproval;
  infraccionApproval;
  reservaApproval;
  rangeApproval;
  divExecption;
  nacional;
  internacional;
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
  lstIdsInsert = [];
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
  divVacio = false;
  lstPasajeros = [];
  lstAutorizadores = [];
  divGuardar = false;
  indice;
  estado;
  lstService = [];
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
      this.spinner.show();
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
            this.spinner.hide();
        },
        err => {
        },
        () => {
        }
      )

    }

    onKey(event: any,indice: any) {
      var x = document.getElementById('RangeOrImpacto_' + indice);
      if (event.target.value === '' || event.target.value === '0' || event.target.value === '.') {
        x.style.display = 'none';
      } else {
        x.style.display = 'block';
      }
    }

    validarNumeros(e){
      var tecla = (document.all) ? e.keyCode : e.which;
       if (tecla == 8) return true;
        var patron = /^([0-9.])*$/;
         var teclaFinal = String.fromCharCode(tecla);
          return patron.test(teclaFinal);
   };

    InsertUpdateApproval() {
      this.spinner.show();
      this.newList = [];
      this.lstService = this.lstReservation.concat(this.lstException);
      for (let index = 0; index < this.lstCostCenterApproval.length; index++) {
        if ($('#infApprovalNacional_' + index).is(':checked')) {
          this.nacional = true;
        } else {
          this.nacional = false;
        }
        if ($('#infApprovalInternacional_' + index).is(':checked')) {
          this.internacional = true;
        } else {
          this.internacional = false;
        }
        if ($('#infActivo_' + index).is(':checked')) {
          this.estado = true;
        } else {
          this.estado = false;
        }
        const newList = {
              ConfigureApprovalId: this.lstCostCenterApproval[index].configureApprovalId,
              UserId: this.lstCostCenterApproval[index].userId,
              Priority: $('#priority_' + index).val(),
              IsActive: this.estado,
              National: this.nacional,
              International: this.internacional,
              Exception: this.lstCostCenterApproval[index].exception,
              Reservation: this.lstCostCenterApproval[index].reservation,
              ApprovalRange: this.lstCostCenterApproval[index].approvalRange,
              RangeInfraction: this.lstCostCenterApproval[index].rangeInfraction,
              InitialRange: $('#RangeI_' + index).val(),
              FinalRange: $('#RangeF_' + index).val()
        }
        this.newList.push(newList);
        this.newList.forEach(element => {

          if (element.InitialRange === '0' && element.FinalRange === '0' ||element.InitialRange === 0 && element.FinalRange === 0 || element.InitialRange === '' && element.FinalRange === '' || element.InitialRange === undefined && element.FinalRange === undefined){
            element.ApprovalRange = 0;
            element.RangeInfraction = 0;
          } else {
            element.ApprovalRange = 1;
          }
          if (element.ApprovalRange === 0) {
            element.RangeInfraction = 0;
          } else {
            element.RangeInfraction = element.RangeInfraction;
          }
          if (element.Exception === true || element.Exception === 1) {
            element.Exception = 1;
          } else {
            element.Exception = 0;
          }
          if (element.International === true || element.International === 1) {
            element.International = 1;
          } else {
            element.International = 0;
          }
          if (element.National === true || element.National === 1) {
            element.National = 1;
          } else {
            element.National = 0;
          }
          if (element.Reservation === true || element.Reservation === 1) {
            element.Reservation = 1;
          } else {
            element.Reservation = 0;
          }
          if (element.InitialRange === undefined) {
            element.InitialRange = 0;
          } else {
            element.InitialRange = element.InitialRange;
          }
          if (element.FinalRange === undefined) {
            element.FinalRange = 0;
          } else {
            element.FinalRange = element.FinalRange;
          }
          const x = element.Priority;
          const y = +x;
          element.Priority = y;
          const i = element.InitialRange;
          const ini = +i;
          element.InitialRange = ini;
          const f = element.FinalRange;
          const fin = +f;
          element.FinalRange = fin;
        });
      }
      if(this.lstIds !== null && this.lstIds.length > 0){
        this.lstIdsInsert = this.lstIds;
      } else {
        this.lstIdsInsert = this.lstCostMasivo;
      }
      const data = {
        TypeApproval: 2,
        CompanyId: null,
        UserId: null,
        CostCenterId: this.lstIdsInsert,
        Lapprovers: this.newList
      }
      this.userCompanyService.getInsertApprovers(data).subscribe(
        result => {
          if(result !== null && result.length > 0){
            this.showDivCost = false;
            this.showDivPlus = true;
            this.lstCostCenterApproval = [];
            this.lstIds = [];
            this.lstCostMasivo = [];
            this.lstPasajeros = [];
            this.toastr.success('', 'Aprobadores insertados correctamente.', {
              timeOut: 4000
            });
          } else {
            this.toastr.error('', 'Ocurrio un error por favor intente nuevamente.', {
              timeOut: 4000
            });
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
              this.spinner.hide();
            }
        },
        err => {
          this.spinner.hide();
        },
        () => {

        }
      )

    }

    editarAutorizador(emp, template) {
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
      this.divCostMasivo = true;
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
        this.nacionalApproval = 1;
      } else {
        this.nacionalApproval = 0;
      }
      if ($('#chkInternacional_' + i).is(':checked')) {
        this.internacionalApproval = 1;
      } else {
        this.internacionalApproval = 0;
      }
      if ($('#chkInfracciones_' + i).is(':checked')) {
        this.infraccionApproval = 1;
      } else {
        this.infraccionApproval = 0;
      }
      if ($('#chkReservas_' + i).is(':checked')) {
        this.reservaApproval = 1;
      } else {
        this.reservaApproval = 0;
      }
      const empt = {
        configureApprovalId: '',
        priority: this.lstCostCenterApproval.length + 1,
        userId: emp.userId,
        firstName: $('#firstNameApproval_' + i)[0].innerText,
        lastName: $('#lastNameApproval_' + i)[0].innerText,
        national: this.nacionalApproval,
        international: this.internacionalApproval,
        reservation: this.reservaApproval,
        exception: this.infraccionApproval,
        approvalRange: 0,
        initialRange: 0,
        finalRange: 0,
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
     this.divVacio = false;
     this.divGuardar = true;
     this.divExecption = true;
     this.lstCostCenterApproval.push(empt);
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
      this.showDivPlus = true;
      this.lstCostCenterApproval = [];
      this.lstIds = [];
      this.lstCostMasivo = [];
      this.lstPasajeros = [];
    }

    changeInfraction(emp) {
      if(emp.exception === 1 && emp.reservation === 1 || emp.exception === 0 && emp.reservation === 0){
        emp.exception = 1;
        emp.reservation = 0;
      } else if(emp.exception === 1 && emp.reservation === 0){
        emp.reservation = 1;
        emp.exception = 0;
      } else if(emp.exception === 0 && emp.reservation === 1){
        emp.reservation = 1;
        emp.exception = 1;
      }
    }

    changeRange(emp) {
      if(emp.rangeInfraction === 1){
        emp.rangeInfraction = 0;
      } else {
        emp.rangeInfraction = 1;
      }
    }



    GetCostCenterApproval(costCenterId, nameCostCenter) {
      this.lstCostCenterApproval = [];
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
        CenterId: this.lstIds
      }
      this.userCompanyService.getCostCenterApproval(data).subscribe(
        result => {
            this.lstCostCenterApproval = result;

            this.lstCostCenterApproval.forEach(element => {
              if (element.approvalRange === true) {
                element.approvalRange = 1;
              } else {
                element.approvalRange = 0;
              }
              if (element.exception === true) {
                element.exception = 1;
              } else {
                element.exception = 0;
              }
              if (element.international === true) {
                element.international = 1;
              } else {
                element.international = 0;
              }
              if (element.national === true) {
                element.national = 1;
              } else {
                element.national = 0;
              }
              if (element.reservation === true) {
                element.reservation = 1;
              } else {
                element.reservation = 0;
              }
              if (element.initialRange === undefined) {
                element.initialRange = 0;
              } else {
                element.initialRange = element.initialRange;
              }
              if (element.finalRange === undefined) {
                element.finalRange = 0;
              } else {
                element.finalRange = element.finalRange;
              }
              if (element.isActive === true) {
                element.isActive = 1;
              } else {
                element.isActive = 0;
              }
              if (element.rangeInfraction === true) {
                element.rangeInfraction = 1;
              } else {
                element.rangeInfraction = 0;
              }
            });


            if (this.lstCostCenterApproval.length === 0) {
              this.divVacio = true;
              this.showDivCost = true;
              this.divGuardar = false;
            } else {
              this.showDivCost = true;
              this.divVacio = false;
              this.divGuardar = true;
              this.divExecption = true;
            }
            this.lstService = this.lstReservation.concat(this.lstException);
            this.spinner.hide();
        },
        err => {

        },
        () => {

        }
      )
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
        this.lstCostCenterApproval = [];
        this.lstReservation = [];
        this.lstException = [];
        this.spinner.show();
        for (let index = 0; index < this.lstPasajeros.length; index++) {
          const element = this.lstPasajeros[index].costCenterId;
          this.lstCostMasivo.push(element);
        }
        const data = {
          CenterId: this.lstCostMasivo
        }
        this.userCompanyService.getCostCenterApproval(data).subscribe(
          result => {
              this.lstCostCenterApproval = result;
              this.lstCostCenterApproval.forEach(element => {
                if (element.approvalRange === true) {
                  element.approvalRange = 1;
                } else {
                  element.approvalRange = 0;
                }
                if (element.exception === true) {
                  element.exception = 1;
                } else {
                  element.exception = 0;
                }
                if (element.international === true) {
                  element.international = 1;
                } else {
                  element.international = 0;
                }
                if (element.national === true) {
                  element.national = 1;
                } else {
                  element.national = 0;
                }
                if (element.reservation === true) {
                  element.reservation = 1;
                } else {
                  element.reservation = 0;
                }
                if (element.initialRange === undefined) {
                  element.initialRange = 0;
                } else {
                  element.initialRange = element.initialRange;
                }
                if (element.finalRange === undefined) {
                  element.finalRange = 0;
                } else {
                  element.finalRange = element.finalRange;
                }
                if (element.isActive === true) {
                  element.isActive = 1;
                } else {
                  element.isActive = 0;
                }
                if (element.rangeInfraction === true) {
                  element.rangeInfraction = 1;
                } else {
                  element.rangeInfraction = 0;
                }
              });
              if (this.lstCostCenterApproval.length === 0) {
                this.divVacio = true;
                this.showDivCost = true;
                this.divGuardar = false;
              } else {
                this.showDivCost = true;
                this.divVacio = false;
                this.divGuardar = true;
                this.divExecption = true;
              }
              this.spinner.hide();
          },
          err => {

          },
          () => {

          }
        )
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
