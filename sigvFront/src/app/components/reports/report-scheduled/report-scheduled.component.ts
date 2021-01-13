import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
               private router: Router) { }

  ngOnInit() {
    this.loginData = this.sessionStorageService.retrieve('ss_login_data');
    this.listaMenu();
    this.reportConfig(this.loginData.ocompany.companyId);
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

  newProgrammer(){
    this.router.navigate(['nuevo-reporte']);
  }

  report(){
    this.router.navigate(['reportes']);
  }

  reportConfig(data) {
    this.reportService.GetConfigurationReportByCompany(data).subscribe(
      result => {
        this.listaReports = result.listConfigurationReports;
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

      }
    );
  }

  seleccionar() {
    const report = document.getElementById('report_0');
    const report1 = document.getElementById('textVertical_1');
    const img = document.getElementById('img_1');
    report.style.background = 'white';
    report.style.clipPath = 'polygon(155% 0, 77% 50%, 155% 100%, 0 100%, 0% 50%, 0 0)';
    report.style.marginTop = '40px';
    if (report1 != null && img != null) {
      report1.style.color = 'white';
      img.style.filter = 'invert(1)';
    }
  }

}
