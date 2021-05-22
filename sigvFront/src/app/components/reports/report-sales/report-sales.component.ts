import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'ngx-webstorage';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.sass']
})
export class ReportSalesComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['companyName', 'pnr', 'ticket',
    'gds', 'typeFlight',
    'travelRoute', 'totalAmount', 'sourceOfSale', 'saleSignature', 'typeOfSale', 'saleDate'];
  dataSource;
  maxDate = new Date();
  intervaloDatas: Date[] = null;
  bsValue = new Date();
  inicioDate: Date;
  finDate: Date;
  inicioShow;
  finalShow;
  title = '';
  listReports;
  listMenu;
  loginData;
  listReportExcel;
  validTable;
  showMessage;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private modalService: BsModalService, private reportService: ReportsService,
    public spinner: NgxSpinnerService, private sessionStorageService: SessionStorageService,
    private toastr: ToastrService, private router: Router) {
  }

  ngOnInit() {
    this.loginData = this.sessionStorageService.retrieve('ss_login_data');
    this.listaMenu();
    this.maxDate.setDate(this.maxDate.getDate() - 7);
    this.intervaloDatas = [this.maxDate, this.bsValue];
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

  listaMenu() {
    this.loginData.lmenu.forEach(element => {
      if (element.menuId === 4) {
        this.listMenu = element.lmenu;
      }
    });
  }

  salesReport(ini, fin) {
    const fechaIni = ini.split('/');
    const fechaFin = fin.split('/');
    fechaIni[1] = parseFloat(fechaIni[1]) + 1;
    fechaFin[1] = parseFloat(fechaFin[1]) + 1;
    const setIni = fechaIni[0] + '/' + fechaIni[1].toString() + '/' + fechaIni[2];
    const setFin = fechaFin[0] + '/' + fechaFin[1].toString() + '/' + fechaFin[2];
    this.spinner.show();
    const data = {
      DateFrom: setIni,
      DateUntil: setFin
    }
    this.reportService.ListReportSales(data).subscribe(
      result => {
        if (result.lsalesReportLists.length === 0) {
          this.validTable = true;
          this.showMessage = result.message;
          this.spinner.hide();
        } else {
          this.validTable = false;
          this.listReportExcel = result.lsalesReportLists;
          this.listReports = result.lsalesReportLists;
          this.listReports = new MatTableDataSource(this.listReports);
          this.listReports.paginator = this.paginator;
          this.spinner.hide();
        }
      }
    )
  }

  onChangeIntervaloDatas(intervaloDatas: Date[]) {
    if (intervaloDatas != null) {
      this.intervaloDatas = intervaloDatas;
      this.inicioDate = this.intervaloDatas[0];
      this.finDate = this.intervaloDatas[1];
      /* this.setFecIni = this.intervaloDatas[0];
      this.setFecFin = this.intervaloDatas[1];
      this.setFecIni.setMonth(this.setFecIni.getMonth() + 1);
      this.setFecFin.setMonth(this.setFecFin.getMonth() + 1); */
      this.inicioShow = this.inicioDate.getDate() + '/' + this.inicioDate.getMonth() + '/' + this.inicioDate.getFullYear();
      this.finalShow = this.finDate.getDate() + '/' + this.finDate.getMonth() + '/' + this.finDate.getFullYear();
      /*  this.setValueIni = this.setFecIni.getDate() + '/' + this.setFecIni.getMonth() + '/' + this.setFecIni.getFullYear();
       this.setValueFin = this.setFecFin.getDate() + '/' + this.setFecFin.getMonth() + '/' + this.setFecFin.getFullYear(); */
      this.title = 'REPORTES DEL' + this.inicioShow.toString() + this.finalShow.toString();
      this.salesReport(this.inicioShow, this.finalShow);
    }
  }

  seleccionado(item1,item2) {
    if (item1 === 6) {
      window.open('http://report-kp.domiruth.com/Modulos/Reportes/ReporteKP.aspx', '_blank', 'toolbar=0,location=0,menubar=0');
    } else {
      const r = window.location.origin + item2;
      window.location.replace(r);
    }
  }

  exportAsXLSX(): void {
    this.reportService.exportAsExcelFile(this.listReportExcel, this.title);
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
