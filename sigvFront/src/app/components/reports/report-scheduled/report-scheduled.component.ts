import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionStorageService } from 'ngx-webstorage';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-report-scheduled',
  templateUrl: './report-scheduled.component.html',
  styleUrls: ['./report-scheduled.component.sass']
})
export class ReportScheduledComponent implements OnInit, AfterViewInit {

  listMenu;
  loginData;
  listaReports;
  constructor( private sessionStorageService: SessionStorageService,
               private reportService: ReportsService,
               private router: Router,
               public spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loginData = this.sessionStorageService.retrieve('ss_login_data');
    this.listaMenu();
    this.validService();

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
    this.seleccionar();
  }

  seleccionado(item1,item2) {
    if (item1 === 6) {
      window.open('http://report-kp.domiruth.com/Modulos/Reportes/ReporteKP.aspx', '_blank', 'toolbar=0,location=0,menubar=0');
    } else {
      const r = window.location.origin + item2;
      window.location.replace(r);
    }
  }

  validService(){
    let idCompany;
    let idAgency;
    if (this.loginData.ocompany != null) {
      idCompany = this.loginData.ocompany.companyId;
      idAgency = "";
    } else {
      idCompany = "";
      idAgency = this.loginData.oagency.agencyId;
    }
    this.reportConfig(idCompany, idAgency);
  }

  newProgrammer(){
    this.sessionStorageService.store('editreport', null);
    this.router.navigate(['nuevo-reporte']);
  }

  report(){
    this.router.navigate(['reportes']);
  }

  reportConfig(data, data1) {
    this.spinner.show();
    this.reportService.GetConfigurationReportByCompany(data, data1).subscribe(
      result => {
        this.listaReports = result.listConfigurationReports;
        this.spinner.hide();
      }
    );
  }

  listaMenu(){
    this.loginData.lmenu.forEach(element => {
      if(element.menuId === 4){
        this.listMenu = element.lmenu;
      }
    });
  }

  getConfigByReportId(data){
    this.reportService.GetConfigurationReport(data).subscribe(
      result => {
        this.sessionStorageService.store('editReport', result);
        this.router.navigate(['nuevo-reporte']);
      }
    );
  }

  seleccionar() {
    const report = document.getElementById('report_1');
    const report1 = document.getElementById('textVertical_0');
    const img = document.getElementById('img_0');
    report.style.background = 'white';
    report.style.clipPath = 'polygon(155% 0, 77% 50%, 155% 100%, 0 100%, 0% 50%, 0 0)';
    report.style.marginTop = '40px';
    if (report1 != null && img != null) {
      report1.style.color = 'white';
      img.style.filter = 'invert(1)';
    }
  }

}
