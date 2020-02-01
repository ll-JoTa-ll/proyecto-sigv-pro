import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { MustMatch } from '../must-match.validator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import * as crypto from 'crypto-js';
import { stringify } from '@angular/compiler/src/util';
import { HotelService } from '../../../services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-modal-cambiar-password',
  templateUrl: './modal-cambiar-password.component.html',
  styleUrls: ['./modal-cambiar-password.component.sass']
})
export class ModalCambiarPasswordComponent implements OnInit {
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  gender: string;
  loginDataUser;
  registerForm: FormGroup;
  registerForm1: FormGroup;
  submitted = false;
  submitted1 = false;
  email;
  plainText: string;
  conversionEncryptOutput: string;
  conversionDecryptOutput: string;
  encPassword: string;
  encryptText: string;
  decPassword: string;

  resultado: boolean;
  usuario: string;
  diferente: any;
  passChange: any;
  newPassword: string;
  resultNewPassword: boolean;
  mostrar: any;
  show: any;

  constructor(public spinner: NgxSpinnerService,private toastr: ToastrService,private service: HotelService,private formBuilder: FormBuilder,private sessionStorageService: SessionStorageService,private localStorageService: LocalStorageService,public modalRef: BsModalRef) {

    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.gender = this.loginDataUser.gender;
    this.email = this.localStorageService.retrieve('ss_credenciales');
    console.log("this.email ======>" + this.email);
    this.mostrar = false;
    this.show = true;
   }

  ngOnInit() {
    this.registerForm1 = this.formBuilder.group({
      password: ['', Validators.required]
  }, {
  });
    $("#validar").prop("disabled", true);
    $("#password1").prop("disabled", true);
    $("#password2").prop("disabled", true);
    $("#password").prop("disabled", false);
    $("#btnvalidar").prop("disabled", false);
    this.registerForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });
  }

  

  VolverHome(){
    this.modalRef.hide();
  }

  getUpdatePassword(){
    this.spinner.show();
    this.newPassword = $('#password2').val();
    const datos = {
      LoginUser: this.loginDataUser.loginUser,
      LoginPassword: crypto.SHA256(this.newPassword).toString()
    };
    this.service.UpdatePassword(datos).subscribe(
      result =>{
        this.resultNewPassword = result;
        if (this.resultNewPassword === true) {
          this.spinner.hide();
          this.toastr.success('', 'Su contraseña ha sido modificada correctamente.', {
            timeOut: 5000
          });
          this.modalRef.hide();
          this.diferente = "bueno";
        }
      }
    )
  }

  getUserByPassword(){
    this.spinner.show();
    this.plainText = $('#password').val();
    console.log("this.plainText ===>" + this.plainText)
    const datos = {
      UserId: this.loginDataUser.userId,
      LoginUser: this.loginDataUser.loginUser,
      LoginPassword: crypto.SHA256(this.plainText).toString()
    };
    console.log("datos ==========>" +  JSON.stringify(datos));
    this.service.GetUserByPassword(datos).subscribe(
      result =>{
        this.resultado = result;
        console.log(this.resultado);
        if (this.resultado === true) {
          this.spinner.hide();
          $("#validar").prop("disabled", false);
          $("#password1").prop("disabled", false);
          $("#password2").prop("disabled", false);
          $("#password").prop("disabled", true);
          $("#btnvalidar").prop("disabled", true);
          this.mostrar = true;
          this.show = false;
          this.usuario =  $('#password').val();
          this.toastr.success('', 'Contraseña Correcta.', {
            timeOut: 3000
          });
        }else{
          this.spinner.hide();
          $("#validar").prop("disabled", true);
          $("#password1").prop("disabled", true);
          $("#password2").prop("disabled", true);
          this.toastr.error('', 'Contraseña Incorrecta.', {
            timeOut: 3000
          });
        }
      }
    );
  }


  get f() { return this.registerForm.controls; }
  get f1() { return this.registerForm1.controls; }

    onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
      }else{
        var pass = $('#password1').val()
        var pass1 = $('#password2').val()
        if (pass === pass1) {
          if (this.usuario === pass1) {
            this.diferente = "malo";
            console.log("malo ===>" + this.diferente)
          }else{
            this.diferente = "bueno";
            console.log("bueno ===>" + this.diferente)
            this.getUpdatePassword();
          }
        }
        
      }

  
  }

  onSubmit1() {
    this.submitted1 = true;

    if (this.registerForm1.invalid) {
    }else{
          this.getUserByPassword();
      }
      
    }


}


