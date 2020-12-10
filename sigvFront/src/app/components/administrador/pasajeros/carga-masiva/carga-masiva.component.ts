import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { UserCompanyService } from "../../../../services/user-company.service";
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalErrorSizeComponent } from 'src/app/components/shared/modal-error-size/modal-error-size.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.sass']
})
export class CargaMasivaComponent implements OnInit, AfterViewInit {

  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  fileToUpload;
  nameFile = "Seleccionar Archivo";
  extFile = "";
  companyId;
  flagError = false;
  status = "";
  lmasives: any[];
  p: number;
  flagErrorExt = false;
  sizeFile = 1000000;
  modalRefSessionExpired: BsModalRef;
  warning;
  valor = 'https://domiruthgeneral.blob.core.windows.net/domiruth/GoArrival/Carga%20Masiva%20Pasajeros.xlsx';

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private userCompanyService: UserCompanyService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.companyId = this.sessionStorageService.retrieve("ss_companyId");
  }

  ngAfterViewInit() {
    $('#menu-vuelo-1').hide();
    $('#menu-vuelo-2').show();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
  }

  limpiarInput() {
    let visa;
    visa = document.getElementById('customFile');
    visa.value = '';
    visa.files = null;
    console.log(visa.files);
    this.fileToUpload = '';
    this.nameFile = '';
  }

  onFileChange(event: any) {
    if (event.target.files[0].size > this.sizeFile) {
      this.modalRefSessionExpired = this.modalService.show(ModalErrorSizeComponent, this.config);
    } else {
      this.status = "";
      this.flagErrorExt = false;
      let fi = event.srcElement;
      if (fi.files && fi.files[0]) {
        let fileToUpload = fi.files[0];
        const nameFile = fileToUpload.name;
        const lastDot = nameFile.lastIndexOf('.');
        const fileName = nameFile.substring(0, lastDot);
        const ext = nameFile.substring(lastDot + 1);
        this.extFile = ext;
        console.log("ext:" + ext);
        if (ext === "xlsx" || ext === "xls" || ext === "csv") {
          this.fileToUpload = fileToUpload;
          this.nameFile = nameFile;
        } else {
          //alert("Formato incorrecto");
          this.flagError = true;
          this.flagErrorExt = true;
          this.status = "Formato incorrecto: " + this.extFile;
        }
      }
    }

  }

  onSubmit() {
    console.log(this.fileToUpload);
    if (this.fileToUpload === undefined || this.nameFile === '') {
      this.toastr.error('', 'Debe seleccionar obligatoriamente un archivo.', {
        timeOut: 4000
      });
      return false;
    }

    console.log("this.companyId: " + this.companyId);

    const formData = new FormData();
    formData.append("companyId", this.companyId);
    formData.append("PersonFile", this.fileToUpload);

    console.log("formData: " + JSON.stringify(formData));

    this.spinner.show();
    this.userCompanyService.postUploadExcelUser(formData).subscribe(
      result => {
        this.warning = result.status;
        console.log("result: " + result);
        if (result.lmasives == null) {
          this.flagError = false;
          this.status = result.generalMessage;
        } else if (result.lmasives.length === 0) {
          this.flagError = false;
          this.status = result.generalMessage;
        } else {
          this.flagError = true;
          this.status = result.generalMessage;
          this.lmasives = result.lmasives;
          //this.listExcelUserError(result.lmasives);
        }
      },
      err => {
        this.spinner.hide();
        console.log("ERROR: " + JSON.stringify(err));
      },
      () => {
        this.spinner.hide();
        console.log("Completado");
      }
    );
  }

  abrir() {
    window.open(this.valor, '_blank', 'toolbar=0,location=0,menubar=0');
  }

  listExcelUserError(lmasives) { }

}
