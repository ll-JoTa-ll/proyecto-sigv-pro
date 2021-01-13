import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-report-new',
  templateUrl: './report-new.component.html',
  styleUrls: ['./report-new.component.sass']
})
export class ReportNewComponent implements OnInit, AfterViewInit {
  listMenu;
  loginData;
  selectedValue: string;
  foods: any[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  listViews;
  listFrequency;

  constructor(private sessionStorageService: SessionStorageService,
              private reportService: ReportsService,private router: Router) { }

  ngOnInit() {
    this.loginData = this.sessionStorageService.retrieve('ss_login_data');
    this.listaMenu();
    this.getViews();
    this.getFrecuency();
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

  getViews() {
    this.reportService.getCompanyReport(this.loginData.ocompany.companyId).subscribe(
      result => {
        this.listViews = result.lreports;
      }
    );
  }

  getFrecuency(){
    this.reportService.ListFrequencyReport().subscribe(
      result => {
        this.listFrequency = result;
      }
    )
  }

  insertUpdateReport(){
    const obj = {
      IsInsert: null,
      ConfigurationReportId: null,
      ReportId: null,
      Query: null,
      CompanyId: null,
      Name: null,
      Description: null,
      Emails: null,
      IsActive: null,
      ReportScheduleId: null,
      FrequencyId: null,
      Hour: null,
      DayName: null,
      Day: null,
    };
    this.reportService.insertUpdateCompany(obj).subscribe(
      result => {

      }
    );
  }

  report(){
    this.router.navigate(['reportes']);
  }


  listaMenu(){
    this.loginData.lmenu.forEach(element => {
      if(element.menuId === 4){
        this.listMenu = element.lmenu;
      }
    });
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
