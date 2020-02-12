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

  modalRefPoliticas: BsModalRef;
  itemsPerPage: number=10;
  totalItems: any;
  page: any=1;
  previousPage: any;
  datoslogin;
  lstPerson: IPersonCompany[] = [];
  PersonId: IPersonId[];
  lstPersonShow;
  hola;


  nombreShow: any;
  apellidoShow: any;
  usuarioShow: any;
  correoShow: any;
  documentShow: any;
  roleShow: any;
  activeShow: any;
  personId: any;

  p: number[] = [];
  constructor(private formBuilder: FormBuilder,private modalService: BsModalService,private userCompanyService: UserCompanyService,private sessionStorageService: SessionStorageService,private spinner: NgxSpinnerService,) {
    this.datoslogin = this.sessionStorageService.retrieve('ss_login_data');
   }

  ngOnInit() {
    this.cargar();
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

  openModalPoliticas(template) {
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray con-politicas' })
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

  Editar(i){
    this.personId = i;
    this.userCompanyService.getPersonById(this.personId).subscribe(
      result => {
        this.PersonId = result;
        console.log("hola" + JSON.stringify(this.PersonId))
      },
      err => {
        this.spinner.hide();
        
      },
      () => {
        this.spinner.hide();
      }
    );
  }



}
