import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import * as crypto from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { AirportService } from '../../services/airport.service';
//import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ILoginDatosModel } from '../../models/ILoginDatos.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IGetUserById } from 'src/app/models/IGetUserById.model';
import { HotelService } from 'src/app/services/hotel.service';
import { ModalRecuperarPasswordComponent } from '../shared/modal-recuperar-password/modal-recuperar-password.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public text: String;



  model: any = {};
  checkedRecuerdame: boolean;
  airportlist: any[] = [];
  User : IGetUserById;
  flagLogin: number;
  token;
  datoslogin: ILoginDatosModel;
  msjerrorr: boolean = false;
  closedSesion: boolean;
  modalRefSessionExpired: BsModalRef;
  userid;
  credenciales: any[] = [];
  idinterval;
  idinterval1;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  constructor(
    private service: HotelService,
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private airportService: AirportService,
    private rutaActiva: ActivatedRoute,
    private modalService: BsModalService,

    //private location: Location
  ) {
    this.checkedRecuerdame = true;
    this.sessionStorageService.store('ss_login_data', '');
  }

  ngOnInit() {
    this.sessionStorageService.store('ss_login_data', '');
    this.localStorageService.store('ss_token', '');
    this.localStorageService.store("ss_closedSesion", null);
    this.idinterval = this.sessionStorageService.retrieve("ss_interval");
    clearInterval(this.idinterval);
    this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
    clearInterval(this.idinterval1);
    this.sessionStorageService.store('count', null);
    this.sessionStorageService.clear();
  }



  click(){
    var el = document.getElementById('module');

    el.onclick = function() {
    };
  }

  login() {
    this.spinner.show();
    const datos = {
      User: this.model.User,
      Password: crypto.SHA256(this.model.Password).toString()
    };
    this.flagLogin = 0;

    const lstCentralizador = environment.cod_rol_centralizador;


    this.loginService.login(datos).subscribe(
      (result) => {
        this.datoslogin = result;
        if (result != null) {
          if (this.datoslogin.oerror === null) {
            this.flagLogin = 1;
            //console.log('login result: ' + JSON.stringify(result));
            let flagCentralizador = false;
            const roleId = result.orole.roleId;
            lstCentralizador.forEach(function(cent) {
              if (cent === roleId) {
                flagCentralizador = true;
              }
            });
            this.sessionStorageService.store('ss_login_data', result);
            this.token = result.token;
            this.localStorageService.store('ss_token', result.token);
            this.sessionStorageService.store('ss_flagCentralizador', flagCentralizador);
            this.sessionStorageService.store('ss_companyId', result.ocompany.companyId);
            this.closedSesion = true;
            this.localStorageService.store("ss_closedSesion",null);
            this.localStorageService.store("ss_closedSesion",this.closedSesion);
          //console.log(result);
        } else {
          return;
        }
      }
      },
      (error) => {
        this.spinner.hide();
        //console.log('ERROR' + JSON.stringify(error));
      },

      () => {
        if (this.datoslogin.oerror != null) {
          this.msjerrorr = true;

          this.spinner.hide();
        } else {
        var password = $('#txtpass').val();
        var email = $('#txtemail').val();
        this.localStorageService.store('ss_credenciales', email);
          this.userid = this.datoslogin.userId;
          this.airportListPriority();
        }
      }
    );
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      if ($('#txtpass').val().length > 0) {
        this.login();
      }
    }
  }

  cambiarPassword(){
    this.modalRefSessionExpired = this.modalService.show(ModalRecuperarPasswordComponent);
  }

  getUser() {
    let data = {
      userId: this.userid
    };
    this.service.GetUser(data.userId).subscribe(
      result => {

        this.User = result;

        this.sessionStorageService.store("ss_user", this.User);
        //this.router.navigate(['/reserva-habitacion-hotel']);
      },
      err => {
        this.spinner.hide();

      },
      () => {


      }
    );
  }



  airportList() {
    this.airportService.airportList(this.token).subscribe(
      (result: any) => {
        let lstairport;
        //console.log(result);
        //this.airportlist = result.lairport;
        this.localStorageService.store('ls_airportlist', result.lairport);
        this.localStorageService.store('ls_citylist', result.lcity);
      },

      (err) => {
        this.spinner.hide();
        },

      () => {
        this.spinner.hide();
      /*  let id = this.rutaActiva.snapshot.params.id;
        if (id == 1) {
          this.router.navigate(['/gestion-reserva-vuelo']);
        } else {
          this.router.navigate(['/vuelos']);
        }*/
      }
    );
  }

  airportListPriority() {
    this.airportService.airportListPriority(this.token).subscribe(
      (result: any) => {
        let lstairport;
        //console.log(result);
        //this.airportlist = result.lairport;
        this.localStorageService.store('ls_airportlist', result.lairport);
        this.localStorageService.store('ls_citylist', result.lcity);
      },

      (err) => {
        this.spinner.hide();
        },

      () => {
        this.spinner.hide();
        let id = this.rutaActiva.snapshot.params.id;

        if (id == 1) {
          this.router.navigate(['/gestion-reserva-vuelo']);
        } else {
          this.router.navigate(['/vuelos']);
          this.airportList();
        }
      }
    );
  }

}