import { Component, OnInit, AfterViewInit, TemplateRef } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalPartnerComponent } from '../../shared/modal-partner/modal-partner.component';
import { SessionStorageService } from 'ngx-webstorage';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnimationStyleMetadata } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.sass']
})
export class ReportsListComponent implements OnInit , AfterViewInit {

  listReports;
  intervaloDatas: Date[] = null;
  inicioDate: Date;
  finDate: Date;
  inicioShow;
  finalShow;
  ver = false;
  showButton = true;
  showPartner = true;
  title = '';
  todo = [];
  message: string;
  listHeads = [];
  done = [];
  modalRef: BsModalRef;
  loginData;
  setListData;
  listCodes = [];
  bsValue = new Date();
  bookingForm: FormGroup;
  maxDate = new Date();
  validColumn = false;
  listViewsPrueba = [];
  textButton = 'Seleccione';
  listViews = [];
  companyReportId;
  showActions = true;
  validView;
  disabled = 'dropdown-item disabled';
  validDisabled = false;
  nameView;

  constructor(private formBuilder: FormBuilder,private modalService: BsModalService,private reportService : ReportsService,
              public spinner: NgxSpinnerService,private sessionStorageService: SessionStorageService,
              private toastr: ToastrService) {
 }

  ngOnInit() {
    this.seleccionar();
    this.initForm();
    this.loginData = this.sessionStorageService.retrieve('ss_login_data');
    this.listReports = [];
    this.listHeads = [];
    this.maxDate.setDate(this.maxDate.getDate() - 7);
    this.intervaloDatas = [this.maxDate,this.bsValue];
    this.loginData = this.sessionStorageService.retrieve('ss_login_data');
    this.getViews();
    /* this.validColumn = false;

    console.log(this.intervaloDatas);
    const fin = this.intervaloDatas[0];
    const ini = this.intervaloDatas[1];
    const setFin = fin.getDate() + '/' + fin.getMonth() + '/' + fin.getFullYear();
    const setIni = ini.getDate() + '/' + ini.getMonth() + '/' + ini.getFullYear();
    this.getReportGeneral(setFin,setIni); */
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

  getViews(){
    this.reportService.getCompanyReport(this.loginData.ocompany.companyId).subscribe(
      result => {
        this.listViews = result.lreports;

      }
    )
  }

  getViewsTwo(){
    this.reportService.getCompanyReport(this.loginData.ocompany.companyId).subscribe(
      result => {
        this.listViews = result.lreports;
        this.validColumn = true;
        this.disabled = 'dropdown-item';
        this.showPartner = true;
        this.showActions = true;
        this.showButton = true;
        this.validDisabled = false;
        this.spinner.hide();
      }
    )
  }

  /* this.toastr.error('', 'Error al envio de correo electrónico.', {
    timeOut: 3000
  });

  this.toastr.success('', 'Se envio correctamente a su correo electrónico.', {
            timeOut: 3000
          });



  */

  hola(){
    this.spinner.show();
    this.reportService.getReportField(0).subscribe(
      x => {
        this.todo = x.lavailableFields;
        this.done = [];
        this.validDisabled = true;
        this.showPartner = false;
        this.showButton = false;
        this.spinner.hide();
      }
    )
  }

  getField(){
    this.spinner.show();
    this.bookingForm = this.formBuilder.group({
      vista: new FormControl(this.textButton, [Validators.maxLength(12)]),
    });
    this.validView = 2;
    this.reportService.getReportField(this.companyReportId).subscribe(
      x => {
        this.todo = x.lavailableFields;
        this.showPartner = false;
        this.done = x.lusedFields;
        this.showButton = false;
        this.showActions = false;
        this.validDisabled = true;
        this.spinner.hide();
      }
    )
  }

  exportAsXLSX(): void {
    this.reportService.exportAsExcelFile(this.listReports, this.title);
 }

 initForm() {
  this.bookingForm = this.formBuilder.group({
    vista: new FormControl('', [Validators.maxLength(12)]),
  });
}

 grabarCampos(){
   let name = this.bookingForm.controls.vista.value;
   name = name.trim();
   console.log(name);

   if (name === '') {
     this.toastr.error('', 'Se requiere poner un nombre a la vista.', {
       timeOut: 5000
     });
   } else {
    if (this.setListData === undefined || this.setListData.length === 0) {
      this.toastr.error('', 'Debe selecciona al menos un campo a mostrar.', {
        timeOut: 5000
      });
    } else {
      this.spinner.show();
      if (this.validView === 1) {
        this.listCodes = [];
        this.listReports = [];
        this.listHeads = [];
        this.setListData.forEach(element => {
          this.listCodes.push(element.code);
        });
        /* const data = {
          UserId: this.listaIds
        } */
        const objData = {
          IsInsert: true,
          CompanyReportId: 0,
          NameView: name,
          Codes: this.listCodes,
          CompanyId: this.loginData.ocompany.companyId,
          CreatedUserId: this.loginData.userId,
          IsActive: true
        }
        this.reportService.insertUpdateCompany(objData).subscribe(
          result => {
            if (result.status === 500) {
              this.spinner.hide();
              this.toastr.error('', result.message, {
                timeOut: 6000
              });
            } else {
              this.companyReportId = result.companyReportId;
              this.textButton = name;
              this.validColumn = false;
              this.listReports = result.oreportData.dynamics;
              this.getHeadColumns();
              this.getViewsTwo();
            }
          }
        )
      } else {
        this.listCodes = [];
        this.listReports = [];
        this.listHeads = [];
        this.setListData.forEach(element => {
          this.listCodes.push(element.code);
        });
        /* const data = {
          UserId: this.listaIds
        } */
        const objData = {
          IsInsert: false,
          CompanyReportId: this.companyReportId,
          NameView: name,
          Codes: this.listCodes,
          CompanyId: this.loginData.ocompany.companyId,
          CreatedUserId: this.loginData.userId,
          IsActive: true
        }
        this.reportService.insertUpdateCompany(objData).subscribe(
          result => {
            if (result.status === 500) {
              this.spinner.hide();
              this.toastr.error('', result.message, {
                timeOut: 6000
              });
            } else {
              this.textButton = name;
              this.companyReportId = result.companyReportId;
              this.validColumn = false;
              this.listReports = result.oreportData.dynamics;
              this.getHeadColumns();
              this.getViewsTwo();
            }
          }
        )
      }
    }
   }




 }

 drop(event: CdkDragDrop<string[]>, valor: any) {
  console.log(valor);
  this.setListData = [];
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
    if (valor === 1) {
      this.setListData = event.container.data;
    } else {
      this.setListData = event.previousContainer.data;
    }
  }
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template, {class: 'modal-lm'});
}


  confirm(): void {
    this.bookingForm = this.formBuilder.group({
      vista: new FormControl('', [Validators.maxLength(12)]),
    });
    this.validView = 1;
    this.hola();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  onChangeIntervaloDatas(intervaloDatas: Date[]) {
    if (intervaloDatas != null) {
      this.validColumn = false;
      this.listReports = [];
      this.listHeads = [];
      this.intervaloDatas = intervaloDatas;
      this.inicioDate = this.intervaloDatas[0];
      this.finDate = this.intervaloDatas[1];
      this.inicioShow = this.inicioDate.getDate() + '/' + this.inicioDate.getMonth() + '/' + this.inicioDate.getFullYear();
      this.finalShow = this.finDate.getDate() + '/' + this.finDate.getMonth() + '/' + this.finDate.getFullYear();
      this.title = 'REPORTES DEL' + this.inicioShow.toString() + this.finalShow.toString();
      this.getReportGeneral(this.inicioShow,this.finalShow);
    }
}

  cancel() {
    window.location.reload();
  }

  getHeadColumns(){
    var myVar =  this.listReports[0];
    for (var key in myVar) {
      this.listHeads.push(key);
    }
    console.log(this.listHeads);
  }

  getReportGeneralAll(){
    this.spinner.show();
    this.validColumn = false;
    const dataReport = {
      DateFrom: this.inicioShow,
      DateUntil: this.finalShow,
      CompanyDK: this.loginData.ocompany.companyDK,
      Query: ''
    }
    this.listReports = [];
    this.listHeads = [];
    this.textButton = 'Mostrar todos';
    this.disabled = 'dropdown-item disabled';
    this.reportService.ListReportGeneral(dataReport).subscribe(
      result => {
        if (result === null) {
          this.validColumn = true;
          this.spinner.hide();
        } else {
          this.listReports = result;
          this.sessionStorageService.store('ss_partner', result);
          this.ver = true;
          this.getHeadColumns();
          this.validColumn = true;
          this.spinner.hide();
        }
      },
      () => {
        this.spinner.hide();
      }
    )
  }

  getReportGeneral(ini,fin){
    this.spinner.show();
    this.validColumn = false;
    const dataReport = {
      DateFrom: ini,
      DateUntil: fin,
      CompanyDK: this.loginData.ocompany.companyDK,
      Query: ''
    }
    this.reportService.ListReportGeneral(dataReport).subscribe(
      result => {
        if (result === null) {
          this.validColumn = true;
          this.spinner.hide();
        } else {
          this.listReports = result;
          this.sessionStorageService.store('ss_partner', result);
          this.ver = true;
          this.getHeadColumns();
          this.validColumn = true;
          this.spinner.hide();
        }
      },
      () => {
        this.spinner.hide();
      }
    )
  }

  getReportGeneralTwo(valor){
    this.listReports = [];
    this.listHeads = [];
    this.spinner.show();
    this.disabled = 'dropdown-item';
    this.companyReportId = valor.companyReportId;
    this.validColumn = false;
    this.textButton = valor.nameView;
    const dataReport = {
      DateFrom: this.inicioShow ,
      DateUntil: this.finalShow,
      CompanyDK: this.loginData.ocompany.companyDK,
      Query: valor.query
    }
    this.reportService.ListReportGeneral(dataReport).subscribe(
      result => {
        if (result === null) {
          this.validColumn = true;
          this.spinner.hide();
        } else {
          this.listReports = result;
          this.sessionStorageService.store('ss_partner', result);
          this.ver = true;
          this.getHeadColumns();
          this.validColumn = true;
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
    report.style.marginTop = '40px';
  }


}
