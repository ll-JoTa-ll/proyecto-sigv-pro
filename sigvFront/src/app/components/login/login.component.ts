import { Component, OnInit } from '@angular/core';
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

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  model: any = {};
  checkedRecuerdame: boolean;
  airportlist: any[] = [];
  User : IGetUserById;
  flagLogin: number;
  token;
  datoslogin: ILoginDatosModel;
  msjerrorr: boolean = false;

  userid;

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
    private modalService: BsModalService
    //private location: Location
  ) {
    this.checkedRecuerdame = true;
    this.sessionStorageService.store('ss_login_data', '');
  }

  ngOnInit() {
    this.sessionStorageService.store('ss_login_data', '');
    this.localStorageService.store('ss_token', '');

    

  }

  login() {
    this.spinner.show();
    const datos = {
      User: this.model.User,
      Password: crypto.SHA256(this.model.Password).toString()
    };
    this.flagLogin = 0;

    const lstCentralizador = environment.cod_rol_centralizador;

    console.log(this.checkedRecuerdame);

    this.loginService.login(datos).subscribe(
      (result) => {
        this.datoslogin = result;
        if (result != null) {
          if (this.datoslogin.oerror === null) {
            this.flagLogin = 1;
            //console.log('login result: ' + JSON.stringify(result));
            let flagCentralizador = false;
            const roleId = result.orole.roleId;
            console.log('roleId: ' + roleId);
            lstCentralizador.forEach(function(cent) {
              console.log('cent: ' + cent);
              if (cent === roleId) {
                flagCentralizador = true;
              }
            });
            this.sessionStorageService.store('ss_login_data', result);
            this.token = result.token;
            this.localStorageService.store('ss_token', result.token);
            console.log(this.token);
            this.sessionStorageService.store('ss_flagCentralizador', flagCentralizador);
            this.sessionStorageService.store('ss_companyId', result.ocompany.companyId);
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
          this.userid = this.datoslogin.userId;
        
          this.airportList();
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
  getUser() {
    let data = {
      userId: this.userid
      }

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
      )
  }

  airportList() {
    this.airportService.airportList(this.token).subscribe(
      (result: any) => {
        //console.log(result);
        this.airportlist = result.lairport;
        
        
        this.localStorageService.store('ls_airportlist', this.airportlist);

      },

      (err) => {
        this.spinner.hide();
        //console.log('ERROR' + JSON.stringify(err));
        },

      () => {
        this.spinner.hide();
        let id = this.rutaActiva.snapshot.params.id;
        //console.log("Service airportList complete");
        //$(location).attr("href", "/vuelos");
        if (id == 1) {
          this.router.navigate(['/gestion-reserva-vuelo']);
        } else {
          this.router.navigate(['/vuelos']);
        }
      }
    );
  }

}
