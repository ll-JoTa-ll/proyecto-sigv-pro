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
import * as crypto from 'crypto-js';
import { HotelService } from '../../services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { ICostCenterCompany } from 'src/app/models/ICostCenterCompany.model';
import { isLeftClick } from 'igniteui-angular/lib/core/utils';

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
  lstPasajeros: any[] = [];
  data: AOA = [[1, 2], [3, 4]];
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
  inderror1: boolean;
  inderrorEdit: boolean;
  modalRefPoliticas: BsModalRef;
  itemsPerPage: number = 10;
  documento = false;
  validPass = false;
  documento2 = false;
  documento3 = false;
  totalItems: any;
  page: any = 1;
  nameFile: any;
  previousPage: any;
  datoslogin;
  maxDate: Date;
  lstPerson: any;
  PersonId;
  Document;
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
  activo: any;
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
  listaChange: string[] = [];
  page1 = 1;
  isInsert: any;
  UserId: any;
  pageSize = 10;
  lstDocument = [];
  lstCost = [];
  maxPax = 10;
  allNewPass: any;
  fileToUpload: File = null;
  forDni = false;
  forCarne = false;
  listaUsuariosPass: string[] = [];
  lstMenus = [];
  lstMenusEdit = [];
  bookingForm: FormGroup;
  lstSubMenus = [];
  lstSubMenusShow = [];
  showSubMenu = false;
  allComplete: boolean = false;
  lstSendMenus = [];

  documentName = 'Carné de Extranjeria';
  documentName1 = 'Carné de Extranjeria';
  documentName2 = 'Carné de Extranjeria';

  listDocuments = [];
  constructor(
    private service: AirportService,
    private toastr: ToastrService,
    private serviceHotel: HotelService,
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private modalService: BsModalService,
    private userCompanyService: UserCompanyService,
    private sessionStorageService: SessionStorageService,
    private spinner: NgxSpinnerService,
    private elementRef: ElementRef,
    private resizeSvc: ResizeService
  ) {
    this.datoslogin = this.sessionStorageService.retrieve('ss_login_data');
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() - 6575);
    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([])
    })
  }






  ngOnInit() {
    this.cargar();
    this.document();
    this.role();
    this.validService();
    this.GetPaises();
    this.GetCostCenter();

    this.file();
    this.selectOptions = { persistSelection: true };
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

  file() {
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





  hola1() {
    $(document).ready(function () {
      var table = $('#table1').DataTable();

      $('#table1 tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
      });

      $('#button').click(function () {
        alert(table.rows('.selected').data().length + ' row(s) selected');
      });
    });
  }


  onChange(value) {
    const document = $("#cbo_document").val();
    this.documentName = document;
    this.tipoDoc = value;
    if (value === '1') {
      $('#dni').val('');
      $('#dni').prop("maxlength", 8)
    }
    if (value === '2') {
      $('#dni').val('');
      $('#dni').prop("maxlength", 15)
    }
    if (value === '3') {
      $('#dni').val('');
      $('#dni').prop("maxlength", 10)
    }
  }

  onChange1(value) {
    const document = $("#cbo_document_1").val();
    this.documentName1 = document;
  }

  onChange2(value) {
    const document = $("#cbo_document_2").val();
    this.documentName2 = document;
  }

  onChangeEdit(value) {
    if (value === '1') {
      $('#dniEdit').val('');
      $('#dniEdit').prop("maxlength", 8)
    }
    if (value === '2') {
      $('#dniEdit').val('');
      $('#dniEdit').prop("maxlength", 15)
    }
    if (value === '3') {
      $('#dniEdit').val('');
      $('#dniEdit').prop("maxlength", 10)
    }
  }

  removePasaporte() {
    this.documento = false;
    $("#pasaporte").val('');
  }

  removeDocument() {
    this.documento2 = false;
    $("#carne").val('');
  }

  removeDocument3() {
    this.documento3 = false;
  }

  hola11(valor) {
    const val = valor;
    console.log('hola');
  }

  nombreDocument(name) {
    this.documentName = name;
  }

  nombreDocument1(name) {
    this.documentName1 = name;
  }

  nombreDocument2(name) {
    this.documentName2 = name;
  }



  addDocument() {
    if (this.documento === true) {
      this.documento2 = true;
    } else {
      this.documento = true;
    }
  }

  closeValid() {
    this.validPass = false;
  }



  limpiarVal() {
    this.forCarne = false;
    this.forDni = false;
    this.inderror = false;
    this.inderror1 = false;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.cargar();
    }
  }

  select(i) {
    var x = document.getElementById("fila_" + i);
    x.style.background = "#CCC"
    console.log(i);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }


  changePassword() {
    var x = document.getElementById("allNewPass");
    if ($("#allNewPass").val().length === 0) {
      x.style.border = "2px solid red";
      this.validPass = true;
    } else {
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
        result => {
          this.resultNewPassword = result;
          if (this.resultNewPassword === true) {
            this.spinner.hide();
            this.max = false;
            this.toastr.success('', 'La contraseña ha sido reestablecida correctamente.', {
              timeOut: 5000
            });
            this.lstPasajeros = [];
            this.modalRefPoliticas.hide();
          } else {
            this.spinner.hide();
            this.toastr.error('', 'Ocurrió un problema al reestabler la contraseña.', {
              timeOut: 5000
            });
          }
        }
      )
    }

  }





  onCheckboxChange(e) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
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

  submitForm() {
    console.log(this.form.value)
  }




  validarLetras(e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    var patron = /^([a-zA-Z ])*$/;
    var teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
  };

  validarNumeros(e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true;
    var patron = /^([0-9])*$/;
    var teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
  };

  ValidarCorreo() {
    var correo = document.getElementById("correo");
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ($('#correo').val().length <= 0) {
      correo.style.borderBottom = '2px solid #ED1C24';
    } else {
      correo.style.borderBottom = '2px solid #9b9b9b;';
    }
    if (regex.test($('#correo').val().trim())) {
      this.inderror = false;
    } else {
      this.inderror = true;
    }

  }

  ValidarCorreoCor() {
    var correo = document.getElementById("correoCor");
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ($('#correoCor').val().length <= 0) {
      correo.style.borderBottom = '2px solid #ED1C24';
    } else {
      correo.style.borderBottom = '2px solid #9b9b9b;';
    }
    if (regex.test($('#correoCor').val().trim())) {
      this.inderror1 = false;
    } else {
      this.inderror1 = true;
    }

  }

  ValidarCorreoEdit() {
    var correoEdit = document.getElementById("correoEdit");
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ($('#correoEdit').val().length <= 0) {
      correoEdit.style.borderBottom = '2px solid #ED1C24';
    } else {
      correoEdit.style.borderBottom = '2px solid #9b9b9b;';
    }
    if (regex.test($('#correoEdit').val().trim())) {
      this.inderrorEdit = false;
    } else {
      this.inderrorEdit = true;
    }

  }


  hi(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.dropdown-el').toggleClass('expanded');
    $('#' + $(e.target).attr('for')).prop('checked', true);
    $(document).click(function () {
      $('.dropdown-el').removeClass('expanded');
    });
  }

  hi1(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.dropdown-el').toggleClass('expanded');
    $('#' + $(e.target).attr('for')).prop('checked', true);
    $(document).click(function () {
      $('.dropdown-el').removeClass('expanded');
    });
  }

  /* Activar Vip y Desactivar en el boton Registrar */

  active() {
    var mainParent = $('.cb-value').parent('.toggle-btn');
    if ($(mainParent).find('input.cb-value').is(':checked')) {
      $(mainParent).addClass('active');
      this.activo = true;
    } else {
      $(mainParent).removeClass('active');
      this.activo = false;
    }
  }

  active1() {
    var mainParent = $('.cb-value1').parent('.toggle-btn1');
    if ($(mainParent).find('input.cb-value1').is(':checked')) {
      $(mainParent).addClass('active');
      this.activo1 = true;
    } else {
      $(mainParent).removeClass('active');
      this.activo1 = false;
    }
  }

  /* Activar Vip y Desactivar en el boton Editar */
  activeEditVip() {
    var mainParent = $('.cb-EditVip').parent('.toggle-EditVip');
    if ($(mainParent).find('input.cb-EditVip').is(':checked')) {
      $(mainParent).addClass('active');
      this.activoEditVip = true;
    } else {
      $(mainParent).removeClass('active');
      this.activoEditVip = false;
    }
  }

  activeEditActive() {
    var mainParent = $('.cb-EditActive').parent('.toggle-EditActive');
    if ($(mainParent).find('input.cb-EditActive').is(':checked')) {
      $(mainParent).addClass('active');
      this.activoEditActive = true;
    } else {
      $(mainParent).removeClass('active');
      this.activoEditActive = false;
    }
  }

  toggleVisibility(e, i) {
    this.marked = e.target.checked;
    let usu = $("#customCheck_" + i).val();
    console.log("usu ===>" + usu);
  }


  limpiar() {
    this.modalRefPoliticas.hide();
    this.inderrorEdit = false;
  }

  write() {
    var x = document.getElementById("allNewPass");
    x.style.border = "1px solid";
    this.validPass = false;
  }

  writeNombre() {
    var nombre = document.getElementById("nombre");
    nombre.style.borderBottom = "2px solid #9b9b9b";
  }

  writeApellido() {
    var apellido = document.getElementById("apellido");
    apellido.style.borderBottom = "2px solid #9b9b9b";
  }

  writeCorreo() {
    var correo = document.getElementById("correo");
    correo.style.borderBottom = "2px solid #9b9b9b";
  }

  writeCorreoCor() {
    var correoCor = document.getElementById("correoCor");
    correoCor.style.borderBottom = "2px solid #9b9b9b";
  }

  writeTelefono() {
    var telefono = document.getElementById("telefono");
    telefono.style.borderBottom = "2px solid #9b9b9b";
  }

  writeTelefonoCor() {
    var telefono = document.getElementById("telefonoCor");
    telefono.style.borderBottom = "2px solid #9b9b9b";
  }

  writeDni() {
    var dni = document.getElementById("dni");
    dni.style.borderBottom = "2px solid #9b9b9b";
  }


  onValueChangeIngreso(value: Date): void {
    if (value != null) {
      var txtfecha = document.getElementById("txtfecha");
      txtfecha.style.borderBottom = "2px solid #9b9b9b";
    }
  }

  writePasajero() {
    var pasajero = document.getElementById("pasajero");
    pasajero.style.borderBottom = "2px solid #9b9b9b";
  }

  writeUsuario() {
    var usuario = document.getElementById("usuario");
    usuario.style.borderBottom = "2px solid #9b9b9b";
  }

  writeNombreEdit() {
    var nombreEdit = document.getElementById("nombreEdit");
    nombreEdit.style.borderBottom = "2px solid #9b9b9b";
  }

  writeApellidoEdit() {
    var apellidoEdit = document.getElementById("apellidoEdit");
    apellidoEdit.style.borderBottom = "2px solid #9b9b9b";
  }

  writeCorreoEdit() {
    var correoEdit = document.getElementById("correoEdit");
    correoEdit.style.borderBottom = "2px solid #9b9b9b";
  }

  writeTelefonoEdit() {
    var telefonoEdit = document.getElementById("telefonoEdit");
    telefonoEdit.style.borderBottom = "2px solid #9b9b9b";
  }

  writeDniEdit() {
    var dniEdit = document.getElementById("dniEdit");
    dniEdit.style.borderBottom = "2px solid #9b9b9b";
  }


  onValueChangeIngresoEdit(value: Date): void {
    if (value != null) {
      var txtfechaEdit = document.getElementById("txtfechaEdit");
      txtfechaEdit.style.borderBottom = "2px solid #9b9b9b";
    }
  }

  writePasajeroEdit() {
    var pasajeroEdit = document.getElementById("pasajeroEdit");
    pasajeroEdit.style.borderBottom = "2px solid #9b9b9b";
  }

  writeUsuarioEdit() {
    var usuarioEdit = document.getElementById("usuarioEdit");
    usuarioEdit.style.borderBottom = "2px solid #9b9b9b";
  }


  openModalPoliticas(template) {
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg1' })
    );
    this.isInsert = 1;
    this.UserId = 0;
  }

  open(template) {
    if (this.lstPasajeros.length === 0) {
      this.toastr.error('', 'Por favor seleccionar al menos un usuario.', {
        timeOut: 4000
      });
    } else {
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

  validDocuments() {
    const Document1 = $("#pasaporte").val();
    const Document2 = $("#carne").val();
    this.listDocuments = [];
    const document = $("#cbo_document").val();
    let idDoc;
    this.Document.ldocumentTypeLists.forEach(element => {
      if (element.name === document) {
        idDoc = element.docTypeId;
      }
    });
    const objDocument = {
      IsInsert: true,
      PersonDocId: 0,
      DocTypeId: idDoc,
      DocumentNumber: $("#dni").val()
    }
    this.listDocuments.push(objDocument);
    if (Document1 !== "" && Document1 !== undefined) {
      const document1 = $("#cbo_document_1").val();
      let idDoc1;
      this.Document.ldocumentTypeLists.forEach(element => {
        if (element.name === document1) {
          idDoc1 = element.docTypeId;
        }
      });
      const objDocument1 = {
        IsInsert: true,
        PersonDocId: 0,
        DocTypeId: idDoc1,
        DocumentNumber: Document1
      }
      this.listDocuments.push(objDocument1);
    }
    if (Document2 !== "" && Document2 !== undefined) {
      const document2 = $("#cbo_document_2").val();
      let idDoc2;
      this.Document.ldocumentTypeLists.forEach(element => {
        if (element.name === document2) {
          idDoc2 = element.docTypeId;
        }
      });
      const objDocument2 = {
        IsInsert: true,
        PersonDocId: 0,
        DocTypeId: idDoc2,
        DocumentNumber: Document2
      }
      this.listDocuments.push(objDocument2);
    }
    return this.listDocuments;
  }

  registrar() {

    const val = this.ValidarCampos();
    var documentos: any[];
    if (!val) {
      return val;
    } else {
      documentos = this.validDocuments();
      this.spinner.show();
      if (this.activo === undefined || this.activo === true) {
        this.activo = true;
      }
      if (this.activo1 === undefined || this.activo1 === true) {
        this.activo1 = true;
      }
      if (this.activo === false) {
        this.activo = false;
      }
      if (this.activo1 === false) {
        this.activo1 = false;
      }
      let dni = $("#dni").val();
      let tipoDoc = $("#cbo_document").val();
      let tipoCost = $("#cbo_costo").val();
      let activado = 1;
      let objDocument = {
        DocTypeId: tipoDoc,
        DocumentNumber: dni
      };
      let objCost = {
        CostCenterId: tipoCost,
        IsActive: activado
      }
      let company = {
        Id: this.datoslogin.ocompany.companyId
      }
      this.lstDocument = [];
      this.lstCost = [];
      this.lstDocument.push(objDocument);
      this.lstCost.push(objCost);
      const user = {
        IsInsert: true,
        UserId: this.UserId.toString(),
        FrequentFlyer: $("#pasajero").val(),
        SysConfigId: 1,
        RoleId: parseFloat($("#cbo_perfil").val()),
        AllCostCenter: true,
        AllowedAccess: true,
        IsActive: this.activo1,
        AppId: 1,
        LuserMenus: this.lstSendMenus
      }
      const data = {
        CompanyId: this.datoslogin.ocompany.companyId,
        AgencyId: "",
        IsInsert: true,
        PersonId: "",
        Name: $("#nombre").val(),
        LastName: $("#apellido").val(),
        CorporatePhone: $("#telefonoCor").val(),
        PersonalPhone: $("#telefono").val(),
        CorporateEmail: $("#correoCor").val(),
        PersonalEmail: $("#correo").val(),
        BirthDate: $("#txtfecha").val(),
        Gender: $("#cbo_genero").val(),
        CountryCode: $("#cbo_nacionalidad").val(),
        VIP: this.activo,
        LpersonDocuments: documentos,
        Ouser: user

        /* ProfileId : 1,
        LoginUser : $("#usuario").val(),
        Oagency : null,
        LpersonUserCostCenters: this.lstCost */
      }
      this.serviceHotel.insertUpdateUser(data).subscribe(
        result => {
          this.resultInsertUpdate = result;
          if (this.resultInsertUpdate.status === 500) {
            this.spinner.hide();
            this.toastr.error('', this.resultInsertUpdate.message, {
              timeOut: 5000
            });
          } else {
            this.spinner.hide();
            /* this.lstPerson = this.resultInsertUpdate.lpersonByCompanies; */
            this.toastr.success('', this.resultInsertUpdate.message, {
              timeOut: 5000
            });
            this.modalRefPoliticas.hide();
          }
        },
        err => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
      /* this.lstPerson = this.resultInsertUpdate.lpersonByCompanies; */
    }

  }

  refrescar() {
    let idCompany;
    let idAgency;
    if (this.datoslogin.ocompany != null) {
      idCompany = this.datoslogin.ocompany.companyId;
      idAgency = "";
    } else {
      idCompany = "";
      idAgency = this.datoslogin.oagency.agencyId;
    }
    this.userCompanyService.getPersonByCompany(idCompany,idAgency).subscribe(
      result => {
        this.lstPerson = result.lpersonUserLists;
      },
      err => {

      },
      () => {

      }
    );
  }

  actualizar() {
    const val = this.ValidarCamposEdit();
    if (!val) {
      return val;
    } else {
      this.spinner.show();
      if (this.activoEditActive === undefined || this.activoEditActive === true) {
        this.activoEditActive = 1;
      }
      if (this.activoEditVip === undefined || this.activoEditVip === true) {
        this.activoEditVip = 1;
      }
      if (this.activoEditActive === false) {
        this.activoEditActive = 0;
      }
      if (this.activoEditVip === false) {
        this.activoEditVip = 0;
      }
      let dni = $("#dniEdit").val();
      let tipoDoc = $("#cbo_documentEdit").val();
      let tipoCost = $("#cbo_costoEdit").val();
      let activado = 1;
      let objDocument = {
        DocTypeId: tipoDoc,
        DocumentNumber: dni
      };
      let objCost = {
        CostCenterId: tipoCost,
        IsActive: activado
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
        LastName: $("#apellidoEdit").val(),
        Phone: $("#telefonoEdit").val(),
        Email: $("#correoEdit").val(),
        ProfileId: 1,
        BirthDate: $("#txtfechaEdit").val(),
        CountryIataCode: $("#cbo_nacionalidadEdit").val(),
        Gender: $("#cbo_generoEdit").val(),
        VIP: this.activoEditVip,
        LpersonUserDocuments: this.lstDocument,
        UserId: this.UserId,
        LoginUser: $("#usuarioEdit").val(),
        FrequentFlyer: $("#pasajeroEdit").val(),
        Ocompany: company,
        Oagency: null,
        RoleId: $("#cbo_perfilEdit").val(),
        IsActive: this.activoEditActive,
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
          } else {
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
        () => {
          this.spinner.hide();
        }
      );
      this.lstPerson = this.resultInsertUpdate.lpersonByCompanies;
    }
  }

  document() {
    this.userCompanyService.getDocument(false).subscribe(
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


  GetCostCenter() {
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
    } else {
      this.max = false;
    }
    lstPasajeros.forEach(function (item) {
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
    lstPasajeros.forEach(function (item, index) {
      if (item.personId === pasajero.personId) {
        flagIndex = index;
      }
    });

    lstPasajeros.splice(flagIndex, 1);

    this.lstPasajeros = lstPasajeros;
  }

  validService() {
    let idCompany;
    let idAgency;
    if (this.datoslogin.ocompany != null) {
      idCompany = this.datoslogin.ocompany.companyId;
      idAgency = "";
    } else {
      idCompany = "";
      idAgency = this.datoslogin.oagency.agencyId;
    }
    this.listMenu(true, idCompany, idAgency);
  }

  onChangeMenu(valor,index,item) {
    if (valor.checked === true) {
      const objMenu = {
        IsInsert: true,
        MenuId: item,
        IsActive: true
      }
      this.lstSendMenus.push(objMenu);
    } else {
      this.lstSendMenus.forEach(element => {
        if (item === element.MenuId) {
          let ind = this.lstSendMenus.indexOf(element);
          this.lstSendMenus.splice(ind, 1);
        }
      });
    }

    this.lstMenus.forEach(element => {
      if (item === element.menuId) {
        this.lstSubMenus = element.lmenuLists;
      }
    });

    if (this.lstSubMenus.length > 0 && valor.checked === true) {
      this.showSubMenu = true;
      this.lstSubMenusShow = this.lstSubMenus;
    } else if (this.lstSubMenus.length > 0 && valor.checked === false) {
      this.showSubMenu = false;
    }
  }

  onChangeSubMenu(valor,index,item) {
    if (valor.checked === true) {
      const objMenu = {
        IsInsert: true,
        MenuId: item,
        IsActive: true
      }
      this.lstSendMenus.push(objMenu);
    } else {
      this.lstSendMenus.forEach(element => {
        if (item === element.MenuId) {
          let ind = this.lstSendMenus.indexOf(element);
          this.lstSendMenus.splice(ind, 1);
        }
      });
    }
  }


  role() {
    const data = {
      CompanyId: this.datoslogin.ocompany.companyId,
      AgencyId: null
    }
    this.userCompanyService.getRole(true, this.datoslogin.ocompany.companyId).subscribe(
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

  listMenu(data, data1, data2) {
    this.userCompanyService.getListMenu(data, data1, data2).subscribe(
      result => {
        this.lstMenus = result.lmenuLists;
        this.lstMenusEdit = result.lmenuLists;
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
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var telefono = document.getElementById("telefono");
    var dni = document.getElementById("dni");
    var txtfecha = document.getElementById("txtfecha");
    let val = true;
    let correo;
    this.ValidarCorreo();
    this.ValidarCorreoCor();
    correo = $("#correoTitu").val();

    if ($('#nombre').val().length <= 0) {
      nombre.style.borderBottom = '2px solid #ED1C24';
    } else {
      nombre.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#apellido').val().length <= 0) {
      val = false;
      apellido.style.borderBottom = '2px solid #ED1C24';
    } else {
      apellido.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#telefono').val().length <= 0) {
      telefono.style.borderBottom = '2px solid #ED1C24';
      val = false;
    } else {
      telefono.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#dni').val().length <= 0) {
      dni.style.borderBottom = '2px solid #ED1C24';
      val = false;
    } else {
      dni.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#txtfecha').val().length <= 0) {
      txtfecha.style.borderBottom = '2px solid #ED1C24';
      val = false;
    } else {
      txtfecha.style.borderBottom = '2px solid #9b9b9b;';
    }
    return val;
  }

  ValidarCamposEdit() {
    var nombreEdit = document.getElementById("nombreEdit");
    var apellidoEdit = document.getElementById("apellidoEdit");
    var telefonoEdit = document.getElementById("telefonoEdit");
    var dniEdit = document.getElementById("dniEdit");
    var txtfechaEdit = document.getElementById("txtfechaEdit");
    var pasajeroEdit = document.getElementById("pasajeroEdit");
    var usuarioEdit = document.getElementById("usuarioEdit");
    let val = true;
    let correo;
    this.ValidarCorreoEdit();
    correo = $("#correoTitu").val();

    if ($('#nombreEdit').val().length <= 0) {
      nombreEdit.style.borderBottom = '2px solid #ED1C24';
    } else {
      nombreEdit.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#apellidoEdit').val().length <= 0) {
      val = false;
      apellidoEdit.style.borderBottom = '2px solid #ED1C24';
    } else {
      apellidoEdit.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#telefonoEdit').val().length <= 0) {
      telefonoEdit.style.borderBottom = '2px solid #ED1C24';
      val = false;
    } else {
      telefonoEdit.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#dniEdit').val().length <= 0) {
      dniEdit.style.borderBottom = '2px solid #ED1C24';
      val = false;
    } else {
      dniEdit.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#txtfechaEdit').val().length <= 0) {
      txtfechaEdit.style.borderBottom = '2px solid #ED1C24';
      val = false;
    } else {
      txtfechaEdit.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#pasajeroEdit').val().length <= 0) {
      pasajeroEdit.style.borderBottom = '2px solid #ED1C24';
      val = false;
    } else {
      pasajeroEdit.style.borderBottom = '2px solid #9b9b9b;';
    }
    if ($('#usuarioEdit').val().length <= 0) {
      usuarioEdit.style.borderBottom = '2px solid #ED1C24';
      val = false;
    } else {
      usuarioEdit.style.borderBottom = '2px solid #9b9b9b;';
    }
    return val;
  }


  cargar() {
    this.spinner.show();
    let freeText = '';
    let idCompany;
    let idAgency;
    if (this.datoslogin.ocompany != null) {
      idCompany = this.datoslogin.ocompany.companyId;
      idAgency = "";
    } else {
      idCompany = "";
      idAgency = this.datoslogin.oagency.agencyId;
    }
    this.userCompanyService.getPersonByCompany(idCompany, idAgency).subscribe(
      result => {
        this.lstPerson = result.lpersonUserLists;
        this.lstPersonShow = result;
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

  public change(event) {
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

  validCheckeds(lista){
    this.lstMenusEdit.forEach(menu => {
      lista.forEach(element => {
        if (menu.menuId === element.menuId) {
          menu.isActive = true;
        } else {
          menu.isActive = false;
        }
      });
    });
  }

  Editar(i,user ,template) {
    this.isInsert = 0;
    this.spinner.show();
    this.personId = i;
    this.userCompanyService.getPersonById(this.personId, user).subscribe(
      result => {
        this.validCheckeds(result.ouserDetail.luserMenuDetails);
        this.PersonId = result;
        console.log("hola" + JSON.stringify(this.PersonId))
        this.bsValue = new Date(this.PersonId.birthDate);
        console.log("asdasdasd" + this.bsValue);
        this.UserId = this.PersonId.userId;
        var mainParent = $('.cb-EditVip').parent('.toggle-EditVip');
        if (this.PersonId.vip === false) {
          $(mainParent).removeClass('active');
        } else {
          $(mainParent).addClass('active');
        }
        var mainParent1 = $('.cb-EditActive').parent('.toggle-EditActive');
        if (this.PersonId.isActive === false) {
          $(mainParent1).removeClass('active');
        } else {
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

  Seleccionar(i) {
    this.spinner.show();
    this.personId = i;
    var hola = $("#usuario_" + i).text();
    console.log(hola);
    $('#myTextEditBox' + i).change(function () {
      if (this.checked) {
        this.usu = $("#usuario_" + i).text();
        this.lista.push(this.usu);
        this.objectUsu = {
          usuario: this.usu
        }
        console.log(JSON.stringify(this.objectUsu));
      } else {
        this.lista.slice(i);
        console.log("NADADAADADADADA");
      }
      console.log("LA LISTA " + JSON.stringify(this.lista))
    });
  }

  Seleccionado(i, event: any) {
    var hola = $("#usuario_" + i).text();
    console.log("Indice es ==> " + i);
    console.log(event.target.checked);
    if (event.target.checked === true) {
      this.lista.push(hola)
      console.log("Aca añade")
    } else {
      var index = this.lista.indexOf(hola);
      if (index > -1) {
        this.lista.splice(index, 1);
      }
      //this.lista.splice(i,1)
      console.log("Aca borra")
    }
    console.log(JSON.stringify(this.lista));
  }







}
