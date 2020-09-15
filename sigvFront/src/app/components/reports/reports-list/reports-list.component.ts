import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalPartnerComponent } from '../../shared/modal-partner/modal-partner.component';
import { SessionStorageService } from 'ngx-webstorage';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.sass']
})
export class ReportsListComponent implements OnInit {

  listReports;
  intervaloDatas: Date[] = null;
  inicioDate: Date;
  finDate: Date;
  inicioShow;
  finalShow;
  ver = false;
  showPartner = true;
  title = '';
  todo = [];

  done = [];
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService,private reportService : ReportsService,
              public spinner: NgxSpinnerService,private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
  }

  hola(){
    this.todo = this.sessionStorageService.retrieve('ss_keys');
    this.showPartner = false;
  }

  exportAsXLSX(): void {
    this.reportService.exportAsExcelFile(this.listReports, this.title);
 }

 drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
  }
}

  listarReportes(){
    const data = {
      FechaDesde: '01/01/2020',
      FechaHasta: '31/07/2020',
      DK: '0000047341'
    }
    this.reportService.ListReport(data).subscribe(
      result => {

      }
    )
  }

  onChangeIntervaloDatas(intervaloDatas: Date[]) {
    if (intervaloDatas != null) {
      this.intervaloDatas = intervaloDatas;
      this.inicioDate = this.intervaloDatas[0];
      this.finDate = this.intervaloDatas[1];
      this.inicioShow = this.inicioDate.getDate() + '/' + this.inicioDate.getMonth() + '/' + this.inicioDate.getFullYear();
      this.finalShow = this.finDate.getDate() + '/' + this.finDate.getMonth() + '/' + this.finDate.getFullYear();
      this.title = 'REPORTES DEL' + this.inicioShow.toString() + this.finalShow.toString();
      this.getReportGeneral(this.inicioShow,this.finalShow);
    }
}

  getReportGeneral(ini,fin){
    this.spinner.show();
    const dataReport = {
      DateFrom: ini,
      DateUntil: fin,
      CompanyDK: "0000047341",
      Query: ""
    }
    this.reportService.ListReportGeneral(dataReport).subscribe(
      result => {
        if (result === null) {
          this.spinner.hide();
        } else {
          this.listReports = result;
          this.sessionStorageService.store('ss_partner', result);
          this.ver = true;
          this.spinner.hide();
        }
      },
      () => {
        this.spinner.hide();
      }
    )
  }

  home(){
    $(location).attr('href', '/vuelos');
  }

  seleccionar() {
    const report = document.getElementById('report');
    report.style.background = 'white';
    report.style.clipPath = 'polygon(155% 0, 77% 50%, 155% 100%, 0 100%, 0% 50%, 0 0)';
  }


}
