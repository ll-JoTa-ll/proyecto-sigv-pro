import { AfterViewInit, Component, OnInit, ɵɵallocHostVars } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SessionStorageService } from 'ngx-webstorage';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-report-new',
  templateUrl: './report-new.component.html',
  styleUrls: ['./report-new.component.sass']
})
export class ReportNewComponent implements OnInit, AfterViewInit {
  time = { hour: 13, minute: 30 };

  childMaxEmit: Date;
  maxVecne: Date;
  someDate: Date;
  hora: Date;
  minutos: Date;
  reportSchedule;
  listMenu;
  loginData;
  selectedReport: string;
  selectedView: string;
  selectedFrequency: string;
  selectedDay: string;
  listDays: any[] = [
    { value: '1', viewValue: 'Lunes' },
    { value: '2', viewValue: 'Martes' },
    { value: '3', viewValue: 'Miercoles' },
    { value: '4', viewValue: 'Jueves' },
    { value: '5', viewValue: 'Viernes' },
    { value: '6', viewValue: 'Sabado' },
    { value: '7', viewValue: 'Domingo' }
  ];



  listaNumbers: any[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
    { value: 5, viewValue: '5' },
    { value: 6, viewValue: '6' },
    { value: 7, viewValue: '7' },
    { value: 8, viewValue: '8' },
    { value: 9, viewValue: '9' },
    { value: 10, viewValue: '10' },
    { value: 11, viewValue: '11' },
    { value: 12, viewValue: '12' },
    { value: 13, viewValue: '13' },
    { value: 14, viewValue: '14' },
    { value: 15, viewValue: '15' },
    { value: 16, viewValue: '16' },
    { value: 17, viewValue: '17' },
    { value: 18, viewValue: '18' },
    { value: 19, viewValue: '19' },
    { value: 20, viewValue: '20' },
    { value: 21, viewValue: '21' },
    { value: 22, viewValue: '22' },
    { value: 23, viewValue: '23' },
    { value: 24, viewValue: '24' },
    { value: 25, viewValue: '25' },
    { value: 26, viewValue: '26' },
    { value: 27, viewValue: '27' },
    { value: 28, viewValue: '28' },
    { value: 29, viewValue: '29' },
    { value: 30, viewValue: '30' },
    { value: 31, viewValue: '31' }

  ];

  listViews;
  listFrequency;
  listReports;
  listEmails = [];
  showDay = false;
  showCalendarQuin = false;


  showDeleteEmail = false;
  showCalendarMen = false;

  showView = false;

  reportId;
  companyReportId;
  frequencyId;
  day = '';
  dateSend;
  emailPush;
  textButton;
  mytime: Date = new Date();

  bookingForm: FormGroup;

  reportDetail;
  razon;

  dateMensual;
  dateQuincenal;
  insertOrSave;
  isChecked: any = true;
  activado;
  showIsActive;
  configurationReport;
  constructor(private sessionStorageService: SessionStorageService,
    private reportService: ReportsService, private router: Router, private formBuilder: FormBuilder,
    private toastr: ToastrService, public spinner: NgxSpinnerService) {
    this.childMaxEmit = new Date(2021, 2, 1);
    this.someDate = new Date();
    this.maxVecne = new Date(2021, 2, 31);
    this.dateMensual = new Date();
    this.dateQuincenal = new Date();
  }

  ngOnInit() {
    this.isChecked = true;
    this.loginData = this.sessionStorageService.retrieve('ss_login_data');
    this.reportDetail = this.sessionStorageService.retrieve('editReport');
    if (this.reportDetail != null) {
      this.showIsActive = true;
      this.reportSchedule = this.reportDetail.reportScheduleId;
      this.frequencyId = this.reportDetail.frequencyId;
      this.textButton = 'Modificar';
      this.reportId = this.reportDetail.reportId;
      this.configurationReport = this.reportDetail.configurationReportId;
      this.activado = this.reportDetail.isActive;
      this.companyReportId = this.reportDetail.companyReportId;
      this.day = this.reportDetail.dayName;
      this.insertOrSave = false;
      if (this.reportDetail.email.length > 1) {
        this.showDeleteEmail = true;
      }
      if (this.reportDetail.companyReportId !== 0) {
        this.getViews(this.reportDetail.reportId);
      }
    } else {
      this.configurationReport = '';
      this.showIsActive = false;
      this.reportSchedule = 0;
      this.insertOrSave = true;
      this.activado = true;
      this.textButton = 'Grabar';
      this.addEmail();
    }
    this.initForm();
    this.listaMenu();
    this.validService();
    this.getFrecuency();
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
    this.getReports(idCompany, idAgency);
  }

  onChange(event) {
    this.activado = event.checked;
  }

  change() {
    alert(this.someDate);
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
    if (this.reportDetail != null) {
      this.rellenarCorreo(this.reportDetail.email);
    }
  }

  rellenarCorreo(listCorreos) {
    let correo;
    for (let index = 0; index < listCorreos.length; index++) {
      const element = listCorreos[index];
      correo = document.getElementById('email_' + index);
      correo.value = element;
    }
  }

  metView(data, data1) {
    this.reportId = data1;
    if (data === true) {
      this.bookingForm.get('viewSelect').setValue('');
      this.getViews(data1);
    } else {
      this.bookingForm.get('viewSelect').setValidators(null);
      this.showView = false;
      this.companyReportId = 0;
    }
  }

  metShowDay(data) {
    this.frequencyId = data;
    if (data === 2) {
      this.bookingForm.get('selectDay').setValidators([Validators.required]);
      this.bookingForm.get('dateMensual').setValidators(null);
      this.bookingForm.get('dateMensual').setValue('');
      this.bookingForm.get('dateQuincenal').setValidators(null);
      this.bookingForm.get('dateQuincenal').setValue('');
      this.showDay = true;
      this.showCalendarQuin = false;
      this.showCalendarMen = false;
    } else if (data === 3) {
      this.bookingForm.get('dateQuincenal').setValue('');
      this.bookingForm.get('dateQuincenal').setValidators([Validators.required]);
      this.bookingForm.get('dateMensual').setValidators(null);
      this.bookingForm.get('dateMensual').setValue('');
      this.bookingForm.get('selectDay').setValidators(null);
      this.bookingForm.get('selectDay').setValue('');
      this.day = '';
      this.showDay = false;
      this.showCalendarQuin = true;
      this.showCalendarMen = false;
    } else if (data === 4) {
      this.bookingForm.get('dateMensual').setValue('');
      this.bookingForm.get('dateMensual').setValidators([Validators.required]);
      this.bookingForm.get('dateQuincenal').setValidators(null);
      this.bookingForm.get('dateQuincenal').setValue('');
      this.bookingForm.get('selectDay').setValidators(null);
      this.bookingForm.get('selectDay').setValue('');
      this.day = '';
      this.showDay = false;
      this.showCalendarQuin = false;
      this.showCalendarMen = true;
    } else {
      this.day = '';
      this.showDay = false;
      this.showCalendarQuin = false;
      this.showCalendarMen = false;
      this.bookingForm.get('selectDay').setValidators(null);
      this.bookingForm.get('selectDay').setValue('');
      this.bookingForm.get('dateQuincenal').setValidators(null);
      this.bookingForm.get('dateQuincenal').setValue('');
      this.bookingForm.get('dateMensual').setValidators(null);
      this.bookingForm.get('dateMensual').setValue('');
    }
  }

  addEmail() {
    const Correo = {
      email: ''
    };
    this.listEmails.push(Correo);
    if (this.listEmails.length > 1) {
      this.showDeleteEmail = true;
    }
  }

  deleteEmail() {
    this.listEmails.splice(0, 1);
    console.log(this.listEmails);
    if (this.listEmails.length === 1) {
      this.showDeleteEmail = false;
    }
  }

  getReports(data, data1) {
    this.reportService.ListSelectReport(data, data1).subscribe(
      result => {
        this.listReports = result.lreportsLists;
      },
      err => {

      },
      () => {

      }
    )
  }

  getViews(data) {
    this.reportService.ListCompanyReport(this.loginData.ocompany.companyId, data).subscribe(
      result => {
        this.listViews = result.lreports;
        this.showView = true;
        const view = this.bookingForm.get('viewSelect');
        this.bookingForm.get('viewSelect').setValidators([Validators.required]);
      },
      () => {

      }
    );
  }

  getFrecuency() {
    this.reportService.ListFrequencyReport().subscribe(
      result => {
        this.listFrequency = result;
      }
    )
  }

  writeEmails(listCorreos) {
    for (let index = 0; index < listCorreos.length; index++) {
      const Correo = {
        email: ''
      };
      this.listEmails.push(Correo);

    }
  }

  getDateTime(fecha) {
    let date = fecha;
    let hour;
    let minute;
    date = date.split('T');
    date = date[1];
    date = date.split(':');
    hour = date[0];
    minute = date[1];
    this.mytime.setHours(hour);
    this.mytime.setMinutes(minute);
  }

  getDays(numberDay, Frequency) {
    if (Frequency === 4) {
      this.dateMensual = numberDay;
      this.dateQuincenal = '';
      this.showDay = false;
      this.showCalendarQuin = false;
      this.showCalendarMen = true;
    } else if (Frequency === 3) {
      this.dateQuincenal = numberDay;
      this.dateMensual = '';
      this.showDay = false;
      this.showCalendarQuin = true;
      this.showCalendarMen = false;
    }
  }



  getErrorMessage(s) {
    return s.hasError('required') ? 'Campo requerido' :
      s.hasError('email') ? 'Email no válido' :
        s.hasError('pattern') ? 'Datos incorrectos' : '';
  }

  initForm() {
    if (this.reportDetail != null) {
      if (this.reportDetail.dayName !== '') {
        this.showDay = true;
      } else {
        this.showDay = false;
      }
      this.writeEmails(this.reportDetail.email);
      this.getDays(this.reportDetail.day, this.reportDetail.frequencyId);
      this.selectedReport = this.reportDetail.reportId;
      this.selectedDay = this.reportDetail.dayName;
      this.selectedFrequency = this.reportDetail.frequencyId;
      this.selectedView = this.reportDetail.companyReportId;
      this.getDateTime(this.reportDetail.hour);
      this.bookingForm = this.formBuilder.group({
        nameReport: new FormControl(this.reportDetail.name),
        viewSelect: new FormControl(this.reportDetail.companyReportId),
        reportSelect: new FormControl(this.reportDetail.reportId),
        selectDay: new FormControl(this.reportDetail.dayName),
        isActive: new FormControl(this.reportDetail.isActive),
        frequencySelect: new FormControl(this.reportDetail.frequencyId),
        textarea: new FormControl(this.reportDetail.description),
        hour: new FormControl(this.mytime),
        dateQuincenal: new FormControl(this.dateQuincenal),
        dateMensual: new FormControl(this.dateMensual),
        correo_0: new FormControl(this.reportDetail.email[0], Validators.required),
      });
    } else {
      this.bookingForm = this.formBuilder.group({
        nameReport: new FormControl('', [Validators.required]),
        viewSelect: new FormControl(''),
        reportSelect: new FormControl('', Validators.required),
        correo_0: new FormControl('', Validators.required),
        isActive: new FormControl(''),
        selectDay: new FormControl(''),
        frequencySelect: new FormControl('', Validators.required),
        textarea: new FormControl('', Validators.required),
        hour: new FormControl('', Validators.required),
        dateQuincenal: new FormControl(''),
        dateMensual: new FormControl(''),
      });
    }
  }

  saveDay(data) {
    this.day = data;
  }

  getEmail() {
    let lista = [];
    for (let index = 0; index < this.listEmails.length; index++) {
      const email = document.getElementById('email_' + index);
      this.emailPush = email;
      lista.push(this.emailPush.value);
    }
    return lista;
  }

  seleccionado(item1,item2) {
    if (item1 === 6) {
      window.open('http://report-kp.domiruth.com/Modulos/Reportes/ReporteKP.aspx', '_blank', 'toolbar=0,location=0,menubar=0');
    } else {
      const r = window.location.origin + item2;
      window.location.replace(r);
    }
  }

  insertUpdateReport() {
    const reason = document.getElementById('reason');
    this.razon = reason;
    const stilo = document.getElementsByClassName('bs-timepicker-field');
    stilo[0].id = 'date1';
    stilo[1].id = 'date2';
    const show1 = document.getElementById('date1');
    const show2 = document.getElementById('date2');
    if (this.showView === true && this.bookingForm.controls.viewSelect.value === 0) {
      this.bookingForm.get('viewSelect').setValue("");
    }
    if (this.bookingForm.invalid) {
      if (this.bookingForm.controls.hour.value === '' || this.bookingForm.controls.hour.value === null) {
        show1.style.border = 'red 1px solid';
        show2.style.border = 'red 1px solid';
      } else {
        show1.style.border = '#CED4DA 1px solid';
        show2.style.border = '#CED4DA 1px solid';
      }
      if (this.razon.value === '') {
        reason.style.border = 'red 1px solid';
        reason.style.border = 'red 1px solid';
      } else {
        reason.style.border = '#767676 1px solid';
        reason.style.border = '#767676 1px solid';
      }
      return;
    } else {
      console.log(this.mytime);
      console.log(this.bookingForm.controls.hour.value);
      this.spinner.show();
      let fecha;
      let hora;
      let minutes;
      fecha = this.bookingForm.controls.hour.value;
      hora = fecha.getHours();
      minutes = fecha.getMinutes();
      const listEmails = this.getEmail();
      let numberDay;
      if (this.frequencyId === 2 || this.frequencyId === 1) {
        numberDay = 0;
      } else if (this.frequencyId === 3) {
        numberDay = this.bookingForm.controls.dateQuincenal.value;
      } else {
        numberDay = this.bookingForm.controls.dateMensual.value;
      }
      if (this.companyReportId === undefined) {
        this.companyReportId = 0;
      }
      let idCompany;
      let idAgency;
      if (this.loginData.ocompany != null) {
        idCompany = this.loginData.ocompany.companyId;
        idAgency = "";
      } else {
        idCompany = "";
        idAgency = this.loginData.oagency.agencyId;
      }
      const obj = {
        IsInsert: this.insertOrSave,
        ConfigurationReportId: this.configurationReport,
        ReportId: this.reportId,
        CompanyReportId: this.companyReportId,
        CompanyId: idCompany,
        AgencyId: idAgency,
        Name: this.bookingForm.controls.nameReport.value,
        Description: this.bookingForm.controls.textarea.value,
        Emails: listEmails,
        IsActive: this.activado,
        ReportScheduleId: this.reportSchedule,
        FrequencyId: this.frequencyId,
        Hour: '2021-01-12' + ' ' + hora + ':' + minutes + ':00',
        DayName: this.day,
        Day: numberDay,
      };
      this.reportService.InsertUpdateReport(obj).subscribe(
        result => {
          this.spinner.hide();
          if (result.status === 200) {
            this.toastr.success('', result.message, {
              timeOut: 9000
            });
            this.router.navigate(['reportes-programados']);
          } else {
            this.toastr.error('', result.message, {
              timeOut: 9000
            });
            this.router.navigate(['reportes-programados']);
          }
        }
      );
    }
  }

  saveReportId(data) {
    this.companyReportId = data;
  }

  cancelar() {
    this.router.navigate(['reportes-programados']);
  }

  report() {
    this.router.navigate(['reportes']);
  }


  listaMenu() {
    this.loginData.lmenu.forEach(element => {
      if (element.menuId === 4) {
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
