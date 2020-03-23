import { Component,AfterViewInit, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { UserCompanyService } from '../../../services/user-company.service';
import { ICostCenterCompany } from '../../../models/ICostCenterCompany.model';
import { ICostCenterApproval } from 'src/app/models/ICostCenterApproval.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-autorizacion-centro-costo',
  templateUrl: './autorizacion-centro-costo.component.html',
  styleUrls: ['./autorizacion-centro-costo.component.sass']
})
export class AutorizacionCentroCostoComponent implements OnInit {

  datoslogin;
  lstCostCenter: ICostCenterCompany[] = [];
  p: number;
  lstCostCenterShow;
  Ids;
  lstIds = [];
  lstCostMasivo = [];
  nameCostCenter;
  lstCostCenterApproval: ICostCenterApproval[] = [];
  showDivCost = false;
  divNacional = false;
  divInternacional = false;
  max = false;
  divCostMasivo = true;
  maxPax = 6;
  lstPasajeros = [];
  constructor(
    private sessionStorageService: SessionStorageService,
    private userCompanyService: UserCompanyService,
    private spinner: NgxSpinnerService,
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

    nacional(){
      var nacional = document.getElementById("nacional");
      if(this.divNacional === false){
        this.divNacional = true;
        nacional.style.background = "darkred";
        nacional.style.color = "white";
        return false;
      }else{
        nacional.style.background = "none";
        nacional.style.color = "black";
        this.divNacional = false;
      }
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

    internacional(){
      var internacional = document.getElementById("internacional");
      if(this.divInternacional === false){
        this.divInternacional = true;
        internacional.style.background = "darkred";
        internacional.style.color = "white";
        return false;
      }else{
        internacional.style.background = "none";
        internacional.style.color = "black";
        this.divInternacional = false;
      }
    }


    GetCostCenterApproval(costCenterId, nameCostCenter) {
      this.spinner.show();
      this.nameCostCenter = nameCostCenter;
      this.lstIds = [];
      this.lstIds.push(costCenterId);
      const data = {
        Ids: this.lstIds
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
      this.showDivCost= true;
      this.divCostMasivo = false;
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
      }
    }


    public change(event) {
      this.FiltrarNombre();
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

}
