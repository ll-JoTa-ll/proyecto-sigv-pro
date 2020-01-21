import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotelService } from '../../../services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MustMatch } from '../must-match.validator';
import * as crypto from 'crypto-js';
import { stringify } from '@angular/compiler/src/util';
import { LocalStorageService } from 'ngx-webstorage';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-modal-recuperar-password',
  templateUrl: './modal-recuperar-password.component.html',
  styleUrls: ['./modal-recuperar-password.component.sass']
})
export class ModalRecuperarPasswordComponent implements OnInit {

  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  submitted1 = false;
  codigo: string;
  web: any;
  especiales: any;
  usuario: string;
  email: string;
  inputcode: string;
  mostrar: string;
  token: string;
  pass: string;
  showDiv: any;
  showDivTwo: any;
  showDivThree: any;

  constructor(private localStorageService: LocalStorageService,public spinner: NgxSpinnerService,private toastr: ToastrService,private service: HotelService,private formBuilder: FormBuilder,public modalRef: BsModalRef) { 
    this.web = $('#inputcode').val();
    this.showDiv = true;
    this.showDivTwo = true;
    this.showDivThree = true;
  }

  ngOnInit() {
      this.registerForm1 = this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
    this.mostrar = 'mal';
          $("#usuario").prop("disabled", false);
          $("#email").prop("disabled", false);
          $("#correo").prop("disabled", false);
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
    }, {
    });
  }

  VolverHome(){
    this.modalRef.hide();
  }

  getUpdatePassword(){
    this.usuario = $('#usuario').val();
    this.localStorageService.store("ss_usuario",this.usuario);
    this.email = $('#email').val();
    this.localStorageService.store("ss_email",this.email);
    const datos = {
      loginUser: this.usuario,
      email: this.email
    };
    this.spinner.show();
    this.service.GetDisplayLogin(datos).subscribe(
      result => {
        if (result.oerror === null) {
          this.spinner.hide();
          $("#usuario").prop("disabled", true);
          $("#email").prop("disabled", true);
          $("#correo").prop("disabled", true);
          this.toastr.success('', 'Por favor verifique su correo electrónico.', {
            timeOut: 5000
          });
          this.showDivTwo = false;
          this.showDivThree = true;
          this.showDiv = false;
          $("#usuario").prop("disabled", true);
          $("#email").prop("disabled", true);
          $("#correo").prop("disabled", true);
        }else{
          this.spinner.hide();
          this.toastr.error('', 'Su correo electrónico es incorrecto.', {
            timeOut: 5000
          });
        }
      }
    )
  }

  getPasswordRecovery(){
    this.usuario = this.localStorageService.store("ss_usuario",this.usuario);
    this.email = this.localStorageService.store("ss_email",this.email);
    this.token = this.localStorageService.store("ss_tokenValidate",this.codigo);
    this.pass = $('#pass2').val();
    const datos = {
      LoginUser: this.usuario,
      Email: this.email,
      Token: this.token,
      LoginPassword: crypto.SHA256(this.pass).toString()
    };
    this.spinner.show();
    this.service.PasswordRecovery(datos).subscribe(
      result => {
        if (result.oerror === null) {
          this.spinner.hide();
          $("#pass2").prop("disabled", true);
          $("#pass1").prop("disabled", true);
          $("#validar").prop("disabled", true);
          this.toastr.success('', 'Su contraseña se generó correctamente.', {
            timeOut: 5000
          });
          this.modalRef.hide();
        }else{
          this.spinner.hide();
          var error = result.oerror.message;
          this.toastr.error('', error, {
            timeOut: 5000
          });
        }
      }
    )
  }

  getValidateToken(){
    console.log("entro2")
    this.usuario = this.localStorageService.store("ss_usuario",this.usuario);
    this.codigo = $('#inputcode').val();
    this.localStorageService.store("ss_tokenValidate",this.codigo);
    const datos = {
      LoginUser: this.usuario,
      Token: this.codigo 
    };
    console.log("datos" + JSON.stringify(datos))
    this.spinner.show();
    this.service.ValidateToken(datos).subscribe(
      result => {
        if (result.oerror === null) {
          this.spinner.hide();
          this.mostrar = "Bien";
          $("#inputcode").prop("disabled", true);
          this.toastr.success('', 'Codigo Correcto.', {
            timeOut: 5000
          });
          this.showDivTwo = true;
          this.showDiv = false;
          this.showDivThree = false;
        }else{
          this.spinner.hide();
          var error = result.oerror.message;
          this.toastr.error('', error, {
            timeOut: 5000
          });
        }
      }
    )
  }
    


  confirmarCodigo(){
    this.codigo = $('#inputcode').val();
    console.log("latitud =====>" + this.codigo.length)
    if (this.codigo.length === 7) {
      this.getValidateToken();
      console.log("entro")
    }
  }

  get f() { return this.registerForm.controls; }
  get f1() { return this.registerForm1.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log("aca MAL")
    }else{
      this.getUpdatePassword();
    }
}

onSubmit1() {
  this.submitted1 = true;
  if (this.registerForm1.invalid) {
    console.log("aca MAL")
  }else{
    this.getPasswordRecovery();
  }
}


}
