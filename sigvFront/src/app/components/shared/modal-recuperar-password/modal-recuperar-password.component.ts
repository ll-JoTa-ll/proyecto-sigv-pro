import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HotelService } from '../../../services/hotel.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-modal-recuperar-password',
  templateUrl: './modal-recuperar-password.component.html',
  styleUrls: ['./modal-recuperar-password.component.sass']
})
export class ModalRecuperarPasswordComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  codigo: string;
  web: any;
  especiales: any;
  usuario: string;
  email: string;

  constructor(private toastr: ToastrService,private service: HotelService,private formBuilder: FormBuilder,public modalRef: BsModalRef) { 
    this.web = $('#inputcode').val();
  }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        firstName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
 
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
    this.service.GetDisplayLogin(datos).subscribe(
      result => {
        if (result.oerror === null) {
          this.toastr.success('', 'Por favor verifique su correo electrónico.', {
            timeOut: 5000
          });
        }else{
          this.toastr.error('', 'Su correo electrónico es incorrecto.', {
            timeOut: 5000
          });
        }
      }
    )
  }
    


  confirmarCodigo(){
    this.codigo = $('#inputcode').val();
    if (this.codigo.length === 7) {
      console.log("Servicio de anthony");
    }
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.log("aca MAL")
    }else{
      this.getUpdatePassword();
    }
}


}
