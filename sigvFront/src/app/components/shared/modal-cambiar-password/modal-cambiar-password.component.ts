import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SessionStorageService } from 'ngx-webstorage';
import { MustMatch } from '../must-match.validator';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-modal-cambiar-password',
  templateUrl: './modal-cambiar-password.component.html',
  styleUrls: ['./modal-cambiar-password.component.sass']
})
export class ModalCambiarPasswordComponent implements OnInit {

  gender: string;
  loginDataUser;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private sessionStorageService: SessionStorageService,public modalRef: BsModalRef) {

    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.gender = this.loginDataUser.gender;
   }

  ngOnInit() {
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

  get f() { return this.registerForm.controls; }

    onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
        console.log("this.registerForm.invalid ===>" + this.registerForm.invalid)
        console.log("ACA ES MAL")
      }else{
        console.log("this.registerForm.invalid ===>" + this.registerForm.invalid)
        console.log("ACA ES BIEN")
        var pass = $('#password1').val()
        var pass1 = $('#password2').val()
        if (pass === pass1) {
          console.log("SERVICIO DE ANTHONY ACA !!!!!")
        }
        
      }

  
  }

}
