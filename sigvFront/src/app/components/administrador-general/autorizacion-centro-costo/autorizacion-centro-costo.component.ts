import { Component,AfterViewInit, OnInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { UserCompanyService } from '../../../services/user-company.service';
import { ICostCenterCompany } from '../../../models/ICostCenterCompany.model';

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

  constructor(
    private sessionStorageService: SessionStorageService,
    private userCompanyService: UserCompanyService
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

    public change(event){
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
