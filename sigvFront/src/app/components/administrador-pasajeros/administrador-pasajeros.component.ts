import { Component, OnInit, AfterViewInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { UserCompanyService } from '../../services/user-company.service';
import { IUserCompanyModel } from '../../models/IUserCompany.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPersonCompany } from '../../models/IPersonCompany.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { MustMatch } from '../shared/must-match.validator';
import { IPersonId } from '../../models/IPersonId.model';
import { IDocumentType } from 'src/app/models/IDocumentType.model';
import { IRole } from 'src/app/models/IRole.model';
import { AirportService } from '../../services/airport.service';
import { IGetPaisesModel } from '../../models/IGetPaises';
import { SCREEN_SIZE } from '../../pipes/screen-size.enum';
import { ResizeService } from 'src/app/services/resize.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination/public_api';
import { MatTableDataSource } from '@angular/material';
import { EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import * as crypto from 'crypto-js';
import { HotelService } from '../../services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { ICostCenterCompany } from 'src/app/models/ICostCenterCompany.model';
import * as XLSX from 'xlsx';

type AOA = any[][];

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-administrador-pasajeros',
  templateUrl: './administrador-pasajeros.component.html',
  styleUrls: ['./administrador-pasajeros.component.sass']
})
export class AdministradorPasajerosComponent implements OnInit {
  public selectOptions: Object;
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  dataSource = new MatTableDataSource();
  lstPasajeros: IPersonCompany[] = [];
  data: AOA = [[1, 2], [3, 4]];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';


  prefix = 'is-';
  sizes = [
    {
      id: SCREEN_SIZE.XS, name: 'xs', css: `d-block d-sm-none`
    },
    {
      id: SCREEN_SIZE.SM, name: 'sm', css: `d-none d-sm-block d-md-none`
    },
    {
      id: SCREEN_SIZE.MD, name: 'md', css: `d-none d-md-block d-lg-none`
    },
    {
      id: SCREEN_SIZE.LG, name: 'lg', css: `d-none d-lg-block d-xl-none`
    },
    {
      id: SCREEN_SIZE.XL, name: 'xl', css: `d-none d-xl-block`
    },
  ];
  registerForm: FormGroup;

  numPasaporte = '2';
  numCarné = '3';
  showDoc = 'Pasaporte';
  showDocOne = 'Carné de Extranjería';

  submitted = false;
  selectValue: any;
  inderror: boolean;
  inderrorEdit: boolean;
  modalRefPoliticas: BsModalRef;
  itemsPerPage: number=10;
  documento = false;
  validPass = false;
  documento2 = false;
  documento3 = false;
  totalItems: any;
  page: any=1;
  nameFile: any;
  previousPage: any;
  datoslogin;
  lstPerson: IPersonCompany[] = [];
  PersonId;
  Document: IDocumentType[] = [];
  getRole;
  lstPersonShow;
  lstPersonChange;
  tipoDoc = '1';
  hola;
  lstpaises: IGetPaisesModel[] = [];
  lstCostCenter: ICostCenterCompany[] = [];
  seleccionado;
  nombreShow: any;
  apellidoShow: any;
  usuarioShow: any;
  correoShow: any;
  max = false;
  documentShow: any;
  roleShow: any;
  activeShow: any;
  personId: any;
  bsValue: Date;
  activo:any;
  activo1: any;
  usu: any;
  resultNewPassword: any;
  activoEditVip: any;
  activoEditActive: any;
  objectUsu: any;
  marked = false;
  form: FormGroup;
  resultInsertUpdate: any;
  theCheckbox = false;
  p: number;
  lista: string[] = [];
  listaChange: string [] = [];
  page1 = 1;
  isInsert: any;
  UserId: any;
  pageSize =10;
  lstDocument = [];
  lstCost = [];
  maxPax = 10;
  allNewPass: any;
  fileToUpload: File = null;
  forDni = false;
  forCarne = false;
  listaUsuariosPass: string[] = [];
  constructor(
    private service: AirportService,
    private toastr: ToastrService,
    private serviceHotel: HotelService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private userCompanyService: UserCompanyService,
    private sessionStorageService: SessionStorageService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private resizeSvc: ResizeService
    ) {
    this.datoslogin = this.sessionStorageService.retrieve('ss_login_data');

    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([])
    })
   }

   @HostListener("window:resize", [])
   private onResize() {
    this.detectScreenSize();
   }
   


   private detectScreenSize(){
     const currentSize = this.sizes.find(x => {
       const el = this.elementRef.nativeElement.querySelector(`.${this.prefix}${x.id}`);
       const isVisible = window.getComputedStyle(el).display != 'none';

       return isVisible;
     });

     this.resizeSvc.onResize(currentSize.id);
   }

  ngOnInit() {
    this.cargar();
    this.document();
    this.role();
    this.GetPaises();
    this.GetCostCenter();

    this.file();
    this.selectOptions = { persistSelection: true};
    this.editSettings = { allowDeleting: true };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  file(){
  /*  const realFileBtn = document.getElementById("real-file");
    const customBtn = document.getElementById("custom-button");
    const customTxt = document.getElementById("custom-text");

customBtn.addEventListener("click", function() {
    realFileBtn.click();
});
realFileBtn.addEventListener("change", function() {
    if (realFileBtn.value) {
        customTxt.innerHTML = realFileBtn.value;
    } else {
        customTxt.innerHTML = "No file chosen, yet.";
    }
})*/
  }


  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      console.log(this.data);
    };
    reader.readAsBinaryString(target.files[0]);
  }

  hola1(){
    $(document).ready(function() {
      var table = $('#table1').DataTable();
  
      $('#table1 tbody').on('click', 'tr', function() {
          $(this).toggleClass('selected');
      });
  
      $('#button').click(function() {
          alert(table.rows('.selected').data().length + ' row(s) selected');
      });
  });
  }



  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }


  onChange(value){
    this.tipoDoc = value;
    if(value === '1'){
      $('#dni').val('');
      $('#dni').prop("maxlength", 8)
    }
    if(value === '2'){
      $('#dni').val('');
      $('#dni').prop("maxlength", 15)
    }
    if(value === '3'){
      $('#dni').val('');
      $('#dni').prop("maxlength", 10)
    }
  }

  onChangeEdit(value){
    if(value === '1'){
      $('#dniEdit').val('');
      $('#dniEdit').prop("maxlength", 8)
    }
    if(value === '2'){
      $('#dniEdit').val('');
      $('#dniEdit').prop("maxlength", 15)
    }
    if(value === '3'){
      $('#dniEdit').val('');
      $('#dniEdit').prop("maxlength", 10)
    }
  }

  removePasaporte(){
    this.documento = false;
  }

  removeDocument(){
    this.documento2 = false;
  }

  removeDocument3(){
    this.documento3 = false;
  }

  

  addDocument(){
    if(this.tipoDoc === '1' ){
      this.documento = true;
    }
    else if(this.tipoDoc === '2'){
      this.documento2 = true;
    }else{
      this.documento3 = true;
    }
  }

  closeValid(){
    this.validPass = false;
  }



  limpiarVal(){
    this.forCarne = false;
    this.forDni = false;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.cargar();
    }
  }

  select(i){
  var x = document.getElementById("fila_" + i);
  x.style.background = "#CCC"
  console.log(i);
  }

  handleFileInput(files: FileList){
    this.fileToUpload = files.item(0);
  }


  changePassword(){
    var x = document.getElementById("allNewPass");
    if($("#allNewPass").val().length === 0){
      x.style.border = "2px solid red";
      this.validPass = true;
    }else{
      this.listaChange = [];
      this.spinner.show();
      this.allNewPass = $('#allNewPass').val();
      this.lstPasajeros.forEach(element => {
        this.listaChange.push(element.loginUser);
      });
      const datos = {
        Users: this.listaChange,
        NewPass: crypto.SHA256(this.allNewPass).toString()
      };
      this.serviceHotel.GetChangePassword(datos).subscribe(
        result =>{
          this.resultNewPassword = result;
          if (this.resultNewPassword === true) {
            this.spinner.hide();
            this.toastr.success('', 'La contraseña ha sido reestablecida correctamente.', {
              timeOut: 5000
            });
            this.lstPasajeros = [];
            this.modalRefPoliticas.hide();
          }else{
            this.spinner.hide();
            this.toastr.error('','Ocurrió un problema al reestabler la contraseña.',{
              timeOut: 5000
            });
          }
        }
      )
    }
   
  }



 

  onCheckboxChange(e){
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    }else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  

  submitForm(){
    console.log(this.form.value)
  }




  validarLetras(e){
    var tecla = (document.all) ? e.keyCode : e.which;
     if (tecla == 8) return true;
      var patron = /^([a-zA-Z ])*$/;
       var teclaFinal = String.fromCharCode(tecla);
        return patron.test(teclaFinal);
  };

  validarNumeros(e){
    var tecla = (document.all) ? e.keyCode : e.which;
     if (tecla == 8) return true;
      var patron = /^([0-9])*$/;
       var teclaFinal = String.fromCharCode(tecla);
        return patron.test(teclaFinal);
 };

 ValidarCorreo() {
  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if ($('#correo').val().length <= 0) {
    $('#correo').addClass('campo-invalido');
  } else {
    $('#correo').removeClass('campo-invalido');
  }
  if (regex.test($('#correo').val().trim())) {
    this.inderror = false;
  } else {
    this.inderror = true;
  }

}

ValidarCorreoEdit() {
  let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if ($('#correoEdit').val().length <= 0) {
    $('#correoEdit').addClass('campo-invalido');
  } else {
    $('#correoEdit').removeClass('campo-invalido');
  }
  if (regex.test($('#correoEdit').val().trim())) {
    this.inderrorEdit = false;
  } else {
    this.inderrorEdit = true;
  }

}

  
  hi(e){
    
      e.preventDefault();
      e.stopPropagation();
      $('.dropdown-el').toggleClass('expanded');
      $('#' + $(e.target).attr('for')).prop('checked', true);
 
  
  $(document).click(function() {
      $('.dropdown-el').removeClass('expanded');
  });
  }

  hi1(e){
    e.preventDefault();
    e.stopPropagation();
    $('.dropdown-el').toggleClass('expanded');
    $('#' + $(e.target).attr('for')).prop('checked', true);
    $(document).click(function() {
        $('.dropdown-el').removeClass('expanded');
    });

}

/* Activar Vip y Desactivar en el boton Registrar */

active(){
    var mainParent = $('.cb-value').parent('.toggle-btn');
    if($(mainParent).find('input.cb-value').is(':checked')) {
      $(mainParent).addClass('active');
      this.activo = true; 
    } else {
      $(mainParent).removeClass('active');
      this.activo = false;
    }
}

active1(){
  var mainParent = $('.cb-value1').parent('.toggle-btn1');
  if($(mainParent).find('input.cb-value1').is(':checked')) {
    $(mainParent).addClass('active');
    this.activo1 = true; 
  } else {
    $(mainParent).removeClass('active');
    this.activo1 = false;
  }
}

/* Activar Vip y Desactivar en el boton Editar */
activeEditVip(){
  var mainParent = $('.cb-EditVip').parent('.toggle-EditVip');
  if($(mainParent).find('input.cb-EditVip').is(':checked')) {
    $(mainParent).addClass('active');
    this.activoEditVip = true; 
  } else {
    $(mainParent).removeClass('active');
    this.activoEditVip = false;
  }
}

activeEditActive(){
  var mainParent = $('.cb-EditActive').parent('.toggle-EditActive');
  if($(mainParent).find('input.cb-EditActive').is(':checked')) {
    $(mainParent).addClass('active');
    this.activoEditActive = true; 
  } else {
    $(mainParent).removeClass('active');
    this.activoEditActive = false;
  }
}

toggleVisibility(e,i){
  this.marked= e.target.checked;
  let usu = $("#customCheck_" + i).val();
  console.log("usu ===>" + usu);
}


limpiar(){
  this.modalRefPoliticas.hide();
}

write(){
  var x = document.getElementById("allNewPass");
  x.style.border = "1px solid";
  this.validPass = false;
}





  openModalPoliticas(template) {
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg1' })
    );
    this.isInsert = 1;
    this.UserId = 0;
  }

  open(template){
    if(this.lstPasajeros.length === 0){
      this.toastr.error('', 'Por favor seleccionar al menos un usuario.', {
        timeOut: 4000
      });
    }else{
      this.modalRefPoliticas = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray.modal-lg.m-infraccion' })
      );
    }
  }

  openModalPoliticasMedium(template) {

      this.modalRefPoliticas = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray.modal-lg.m-infraccion' })
      );
    
    
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

    ValidarCorreoA() {
      let val;
      let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (regex.test($('#correo').val().trim())) {
       val = true;
      } else {
       val = false;
      }
      return val;
    }

  registrar(){
    const val= this.ValidarCampos();
    if (!val) {
      return val;
    }else{
      this.spinner.show();
      if(this.activo === undefined || this.activo === true){
        this.activo = 1;
      }
      if(this.activo1 === undefined || this.activo1 === true){
        this.activo1 = 1;
      }
      if(this.activo === false){
        this.activo = 0;
      }
      if(this.activo1 === false){
        this.activo1 = 0;
      }
      let dni = $("#dni").val();
      let tipoDoc = $("#cbo_document").val();
      let tipoCost = $("#cbo_costo").val();
      let activado = 1;
      let objDocument = {
        DocTypeId:tipoDoc,
        DocumentNumber: dni
      };
      let objCost = {
        CostCenterId:tipoCost,
        IsActive:activado
      }
      let company = {
        Id: this.datoslogin.ocompany.companyId
      }
      this.lstDocument = [];
      this.lstCost = [];
      this.lstDocument.push(objDocument);
      this.lstCost.push(objCost);
      const data = {
        IsInsert: 1,
        PersonId: "",
        FirstName: $("#nombre").val(),
        LastName : $("#apellido").val(),
        Phone : $("#telefono").val(),
        Email : $("#correo").val(),
        ProfileId : 1,
        BirthDate : $("#txtfecha").val(),
        CountryIataCode : $("#cbo_nacionalidad").val(),
        Gender : $("#cbo_genero").val(),
        VIP : this.activo,
        LpersonUserDocuments : this.lstDocument,
        UserId : this.UserId,
        LoginUser : $("#usuario").val(),
        FrequentFlyer : $("#pasajero").val(),
        Ocompany : company,
        Oagency : null,
        RoleId : $("#cbo_perfil").val(),
        IsActive : this.activo1,
        LpersonUserCostCenters: this.lstCost
      }
      this.serviceHotel.insertUpdateUser(data).subscribe(
        result => {
          this.resultInsertUpdate = result;
          if (this.resultInsertUpdate.oerror != null) {
            this.spinner.hide();
            this.toastr.error('', 'Ocurrió un problema al registrar el usuario.', {
              timeOut: 5000
            });
          }else{
            this.spinner.hide();
            this.lstPerson = this.resultInsertUpdate.lpersonByCompanies;
            this.toastr.success('', 'El usuario se registró correctamente.', {
              timeOut: 5000
            });
            this.modalRefPoliticas.hide();
          }
        },
        err => {
          this.spinner.hide();
        },
        ()=>{
          this.spinner.hide();
        }
      );
      this.lstPerson = this.resultInsertUpdate.lpersonByCompanies;
    }
    
  }

  refrescar(){
    const datos = {
      companyId: this.datoslogin.ocompany.companyId
    };
    this.userCompanyService.getPersonByCompany(datos.companyId).subscribe(
      result => {
        this.lstPerson = result;
      },
      err => {
        
      },
      () => {

      }
    );
  }

  actualizar(){
    const val= this.ValidarCamposEdit();
    if (!val) {
      return val;
    }else{
      this.spinner.show();
      if(this.activoEditActive === undefined || this.activoEditActive === true){
        this.activoEditActive = 1;
      }
      if(this.activoEditVip === undefined || this.activoEditVip === true){
        this.activoEditVip = 1;
      }
      if(this.activoEditActive === false){
        this.activoEditActive = 0;
      }
      if(this.activoEditVip === false){
        this.activoEditVip = 0;
      }
      let dni = $("#dniEdit").val();
      let tipoDoc = $("#cbo_documentEdit").val();
      let tipoCost = $("#cbo_costoEdit").val();
      let activado = 1;
      let objDocument = {
        DocTypeId:tipoDoc,
        DocumentNumber: dni
      };
      let objCost = {
        CostCenterId:tipoCost,
        IsActive:activado
      }
      let company = {
        Id: this.datoslogin.ocompany.companyId
      }
      this.lstDocument = [];
      this.lstCost = [];
      this.lstDocument.push(objDocument);
      this.lstCost.push(objCost);
      const data = {
        IsInsert: 0,
        PersonId: this.PersonId.personId,
        FirstName: $("#nombreEdit").val(),
        LastName : $("#apellidoEdit").val(),
        Phone : $("#telefonoEdit").val(),
        Email : $("#correoEdit").val(),
        ProfileId : 1,
        BirthDate : $("#txtfechaEdit").val(),
        CountryIataCode : $("#cbo_nacionalidadEdit").val(),
        Gender : $("#cbo_generoEdit").val(),
        VIP : this.activoEditVip,
        LpersonUserDocuments : this.lstDocument,
        UserId : this.UserId,
        LoginUser : $("#usuarioEdit").val(),
        FrequentFlyer : $("#pasajeroEdit").val(),
        Ocompany : company,
        Oagency : null,
        RoleId : $("#cbo_perfilEdit").val(),
        IsActive : this.activoEditActive,
        LpersonUserCostCenters: this.lstCost
      }
      this.serviceHotel.insertUpdateUser(data).subscribe(
        result => {
          this.resultInsertUpdate = result;
          if (this.resultInsertUpdate.oerror != null) {
            this.spinner.hide();
            this.toastr.error('', 'Ocurrió un problema al actualizar el usuario.', {
              timeOut: 5000
            });
          }else{
            this.spinner.hide();
            this.lstPersonChange = this.resultInsertUpdate.l
            this.lstPerson = this.resultInsertUpdate.lpersonByCompanies;
            this.toastr.success('', 'El usuario se actualizó correctamente.', {
              timeOut: 5000
            });
            this.modalRefPoliticas.hide();
          }
        },
        err => {
          this.spinner.hide();
        },
        ()=>{
          this.spinner.hide();
        }
      );
      this.lstPerson = this.resultInsertUpdate.lpersonByCompanies;
    }
  }

  document(){
    this.userCompanyService.getDocument().subscribe(
      result => {
        this.Document = result;
      },
      err => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  GetPaises() {
    this.service.GetPaises().subscribe(
      result => {
          this.lstpaises = result;
      },
      err => {

      },
      () => {
      }
    )
  }


  GetCostCenter(){
    const data = {
      CompanyId: this.datoslogin.ocompany.companyId,
      AgencyId: null
    }
    this.userCompanyService.getCostCenterCompany(data.CompanyId).subscribe(
      result => {
          this.lstCostCenter = result;
      },
      err => {
      },
      () => {
      }
    )
  }

  agregarPasajero(emp) {
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
      if (item.personId === emp.personId) {
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
      if (item.personId === pasajero.personId) {
        flagIndex = index;
      }
    });

    lstPasajeros.splice(flagIndex, 1);

    this.lstPasajeros = lstPasajeros;
  }

 

  role(){
    const data = {
      CompanyId: this.datoslogin.ocompany.companyId,
      AgencyId: null
    }
    this.userCompanyService.getRole(data).subscribe(
      result => {
        this.getRole = result;
      },
      err => {
        this.spinner.hide();
        
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  ValidarCampos() {
    let val = true;
    let correo;
    this.ValidarCorreo();
    correo = $("#correoTitu").val();

    if ($('#nombre').val().length <= 0) {
      $('#nombre').addClass('campo-invalido');
    } else {
      $('#nombre').removeClass('campo-invalido');
    }
    if ($('#apellido').val().length <= 0) {
      val = false;
      $('#apellido').addClass('campo-invalido');
    } else {
      $('#apellido').removeClass('campo-invalido');
    }
    if ($('#telefono').val().length <= 0) {
      $('#telefono').addClass('campo-invalido');
      val = false;
    } else {
      $('#telefono').removeClass('campo-invalido');
    }
    if ($('#dni').val().length <= 0) {
      $('#dni').addClass('campo-invalido');
      val = false;
    } else {
      $('#dni').removeClass('campo-invalido');
    }
    if ($('#txtfecha').val().length <= 0) {
      $('#txtfecha').addClass('campo-invalido');
      val = false;
    } else {
      $('#txtfecha').removeClass('campo-invalido');
    }
    if ($('#pasajero').val().length <= 0) {
      $('#pasajero').addClass('campo-invalido');
      val = false;
    } else {
      $('#pasajero').removeClass('campo-invalido');
    }
    if ($('#usuario').val().length <= 0) {
      $('#usuario').addClass('campo-invalido');
      val = false;
    } else {
      $('#usuario').removeClass('campo-invalido');
    }
    return val;
  }

  ValidarCamposEdit() {
    let val = true;
    let correo;
    this.ValidarCorreoEdit();
    correo = $("#correoTitu").val();

    if ($('#nombreEdit').val().length <= 0) {
      $('#nombreEdit').addClass('campo-invalido');
    } else {
      $('#nombreEdit').removeClass('campo-invalido');
    }
    if ($('#apellidoEdit').val().length <= 0) {
      val = false;
      $('#apellidoEdit').addClass('campo-invalido');
    } else {
      $('#apellidoEdit').removeClass('campo-invalido');
    }
    if ($('#telefonoEdit').val().length <= 0) {
      $('#telefonoEdit').addClass('campo-invalido');
      val = false;
    } else {
      $('#telefonoEdit').removeClass('campo-invalido');
    }
    if ($('#dniEdit').val().length <= 0) {
      $('#dniEdit').addClass('campo-invalido');
      val = false;
    } else {
      $('#dniEdit').removeClass('campo-invalido');
    }
    if ($('#txtfechaEdit').val().length <= 0) {
      $('#txtfechaEdit').addClass('campo-invalido');
      val = false;
    } else {
      $('#txtfechaEdit').removeClass('campo-invalido');
    }
    if ($('#pasajeroEdit').val().length <= 0) {
      $('#pasajeroEdit').addClass('campo-invalido');
      val = false;
    } else {
      $('#pasajeroEdit').removeClass('campo-invalido');
    }
    if ($('#usuarioEdit').val().length <= 0) {
      $('#usuarioEdit').addClass('campo-invalido');
      val = false;
    } else {
      $('#usuarioEdit').removeClass('campo-invalido');
    }
    return val;
  }


  cargar(){
    this.spinner.show();
    let freeText = '';
    const datos = {
      companyId: this.datoslogin.ocompany.companyId
    };
    this.userCompanyService.getPersonByCompany(datos.companyId).subscribe(
      result => {
        this.lstPerson = result;
        this.lstPersonShow = result;
        for (let index = 0; index < this.lstPersonShow.length; index++) {
          const element = this.lstPersonShow[index];
          element.fullname = element.firstName + ' ' + element.lastName;
        }
        this.hola = {
          Status: 200,
          Data: result
        }
      },
      err => {
        this.spinner.hide();
        
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  public change(event){
    this.FiltrarNombre();
 }

 

  FiltrarNombre() {
    let nombre;
    let results;
    let listado;
    listado = this.lstPersonShow;
    nombre = $('#nombrehotel').val();
    results = listado.filter(m => m.fullname.toUpperCase().includes(nombre.toUpperCase()))

    this.lstPerson = results;
  }

  Editar(i,template){
    this.isInsert = 0;
    this.spinner.show();
    this.personId = i;
    this.userCompanyService.getPersonById(this.personId).subscribe(
      result => {
        this.PersonId = result;
        console.log("hola" + JSON.stringify(this.PersonId))
        this.bsValue = new Date(this.PersonId.birthDate);
        console.log("asdasdasd" + this.bsValue);
        this.UserId = this.PersonId.userId;
        var mainParent = $('.cb-EditVip').parent('.toggle-EditVip');
        if(this.PersonId.vip === false){
          $(mainParent).removeClass('active');
        }else{
          $(mainParent).addClass('active');
        }
        var mainParent1 = $('.cb-EditActive').parent('.toggle-EditActive');
        if(this.PersonId.isActive === false){
          $(mainParent1).removeClass('active');
        }else{
          $(mainParent1).addClass('active');
        }
      },
      err => {
        this.spinner.hide();
        
      },
      () => {
        this.spinner.hide();
      }
    );
    this.openModalPoliticas(template);
  }

  Seleccionar(i){
    this.spinner.show();
    this.personId = i;
    var hola = $("#usuario_"+ i).text();
    console.log(hola);
    $('#myTextEditBox'+ i).change(function() {
      if (this.checked) {
        this.usu = $("#usuario_"+ i).text();
        this.lista.push(this.usu);
        this.objectUsu = {
          usuario: this.usu
        }
      console.log(JSON.stringify(this.objectUsu));
      } else {
        this.lista.slice(i);
        console.log("NADADAADADADADA");
      }
      console.log("LA LISTA " +JSON.stringify(this.lista))
  });
  }

  Seleccionado(i,event : any){
    var hola = $("#usuario_"+ i).text();
    console.log("Indice es ==> " + i);
    console.log(event.target.checked);
    if(event.target.checked === true){
      this.lista.push(hola)
      console.log("Aca añade")
    }else{
      var index = this.lista.indexOf(hola);
      if(index > -1){
        this.lista.splice(index,1);
      }
      //this.lista.splice(i,1)
      console.log("Aca borra")
    }
    console.log(JSON.stringify(this.lista));
  }

 

  



}
