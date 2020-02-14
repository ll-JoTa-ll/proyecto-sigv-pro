import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { UserCompanyService } from '../../services/user-company.service';
import { IUserCompanyModel } from '../../models/IUserCompany.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPersonCompany } from '../../models/IPersonCompany.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../shared/must-match.validator';
import { IPersonId } from '../../models/IPersonId.model';
import { IDocumentType } from 'src/app/models/IDocumentType.model';
import { IRole } from 'src/app/models/IRole.model';
import { AirportService } from '../../services/airport.service';
import { IGetPaisesModel } from '../../models/IGetPaises';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-administrador-pasajeros',
  templateUrl: './administrador-pasajeros.component.html',
  styleUrls: ['./administrador-pasajeros.component.sass']
})
export class AdministradorPasajerosComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  inderror: boolean;
  modalRefPoliticas: BsModalRef;
  itemsPerPage: number=10;
  totalItems: any;
  page: any=1;
  previousPage: any;
  datoslogin;
  lstPerson: IPersonCompany[] = [];
  PersonId;
  Document: IDocumentType[] = [];
  getRole;
  lstPersonShow;
  hola;
  lstpaises: IGetPaisesModel[] = [];
  seleccionado;
  nombreShow: any;
  apellidoShow: any;
  usuarioShow: any;
  correoShow: any;
  documentShow: any;
  roleShow: any;
  activeShow: any;
  personId: any;
  bsValue: Date;
  activo:any;
  activo1: any;
  usu: any;
  activoEditVip: any;
  activoEditActive: any;
  objectUsu: any;
  marked = false;
  form:any;
  theCheckbox = false;
  p: number[] = [];
  constructor(private service: AirportService,private formBuilder: FormBuilder,private modalService: BsModalService,private userCompanyService: UserCompanyService,private sessionStorageService: SessionStorageService,private spinner: NgxSpinnerService,) {
    this.datoslogin = this.sessionStorageService.retrieve('ss_login_data');


   }

  ngOnInit() {



    
    
    this.cargar();
    this.document();
    this.role();
    this.GetPaises();

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

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.cargar();
    }
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

 validarCorreo() {
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
  if($(mainParent).find('input.cb-valueEditVip').is(':checked')) {
    $(mainParent).addClass('active');
    this.activoEditVip = true; 
  } else {
    $(mainParent).removeClass('active');
    this.activoEditVip = false;
  }
}

activeEditActive(){
  var mainParent = $('.cb-EditActive').parent('.toggle-EditActive');
  if($(mainParent).find('input.cb-valueEditActive').is(':checked')) {
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


  openModalPoliticas(template) {
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-lg1' })
    );
  }

  openModalPoliticasMedium(template) {
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray.modal-lg.m-infraccion' })
    );
    $('#customCheck1_')
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

  registrar(){
    if(this.activo === undefined){
      this.activo = true;
    }
    if(this.activo1 === undefined){
      this.activo1 = true;
    }
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let telefono = $("#telefono").val();
    let correo = $("#correo").val();
    let dni = $("#dni").val();
    let tipoDoc = $("#cbo_document").val();
    let tipoPer = $("#cbo_perfil").val();
    let fechaNac = $("#txtfecha").val();
    let nacionalidad = $("#cbo_nacionalidad").val();
    let genero = $("#cbo_genero").val();
    let vip = this.activo;
    let pasajero = $("#pasajero").val();
    let activo = this.activo1;
    console.log("ACTIVOOO??? ======>" + vip);
    console.log("ACTIVOOO11??? ======>" + activo);
    this.ValidarCampos();
    this.validarCorreo();
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
    this.validarCorreo();
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
          element.fullname = element.firstName + element.lastName;
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
    this.spinner.show();
    this.personId = i;
    this.userCompanyService.getPersonById(this.personId).subscribe(
      result => {
        this.PersonId = result;
        console.log("hola" + JSON.stringify(this.PersonId))
        this.bsValue = new Date(this.PersonId.birthDate);
        console.log("asdasdasd" + this.bsValue);
        var mainParent = $('.cb-value').parent('.toggle-btn');
        if(this.PersonId.vip === false){
          $(mainParent).removeClass('active');
        }else{
          $(mainParent).addClass('active');
        }

        var mainParent1 = $('.cb-value1').parent('.toggle-btn1');
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
    var hola = $("#myTextEditBox" + i).val();
    console.log(hola);
    $('#myTextEditBox'+ i).change(function() {
      if (this.checked) {
        this.usu = $("#usuario_"+ i).text();
        this.objectUsu = {
          usuario: this.usu
        }
      console.log(JSON.stringify(this.objectUsu));
      } else {
        console.log("NADADAADADADADA");
      }
  });
  }

  



}
