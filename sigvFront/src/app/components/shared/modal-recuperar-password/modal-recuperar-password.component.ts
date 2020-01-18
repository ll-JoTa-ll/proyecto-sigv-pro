import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotelService } from '../../../services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MustMatch } from '../must-match.validator';

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

  constructor(public spinner: NgxSpinnerService,private toastr: ToastrService,private service: HotelService,private formBuilder: FormBuilder,public modalRef: BsModalRef) { 
    this.web = $('#inputcode').val();
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
    this.email = $('#email').val();
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
    this.usuario = $('#usuario').val();
    this.email = $('#email').val();
    this.token = $('#inputcode').val();
    this.pass = $('#pass2').val();
    const datos = {
      LoginUser: this.usuario,
      Email: this.email,
      Token: this.token,
      LoginPassword: this.pass
    };
    this.spinner.show();
    this.service.PasswordRecovery(datos).subscribe(
      result => {
        if (result.oerror === null) {
          this.spinner.hide();
          $("#pass2").prop("disabled", true);
          $("#pass1").prop("disabled", true);
          this.toastr.success('', 'Su contraseña se generó correctamente.', {
            timeOut: 5000
          });
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
    this.usuario = $('#usuario').val();
    this.codigo = $('#inputcode').val();
    const datos = {
      LoginUser: this.usuario,
      Token: this.codigo 
    };
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
