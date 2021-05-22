import { Component, OnInit, HostListener, ElementRef, ɵSWITCH_IVY_ENABLED__POST_R3__ } from '@angular/core';
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
import { ModalErrorServiceComponent } from '../shared/modal-error-service/modal-error-service.component';
import { ModalHotelErroneoComponent } from '../shared/modal-hotel-erroneo/modal-hotel-erroneo.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public text: String;
  modalError: BsModalRef;
  model: any = {};
  checkedRecuerdame: boolean;
  airportlist: any[] = [];
  User: IGetUserById;
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
  logout;
  mensajeError;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };
  login1;
  pass;
  loginDataUser;
  userHotel;
  localfinish;
  lstHabication;
  ocultar;

  hotelCode;
  fechaIni;
  fechaFin;
  userId;
  objSearch;

  keyPass;
  keyEmail;
  session1;
  airport;

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
    this.login1 = "05203883";
    this.pass = "8dae9b8cd31c8650e1e2a3e0bfd9e0689eb9ccc8e4e641e206b8d12fdd668afd";
  }

  ngOnInit() {
    this.keyEmail = this.localStorageService.retrieve('ss_credenciales');
    this.keyPass = this.localStorageService.retrieve('ss_crypto');
    this.sessionStorageService.store('ss_login_data', '');
    this.localStorageService.store('ss_token', '');
    this.localStorageService.store("ss_closedSesion", null);
    this.idinterval = this.sessionStorageService.retrieve("ss_interval");
    clearInterval(this.idinterval);
    this.idinterval1 = this.sessionStorageService.retrieve('idinterval');
    clearInterval(this.idinterval1);
    this.sessionStorageService.store('count', null);
    this.sessionStorageService.clear();
    this.userHotel = window.location.search;
    if (this.userHotel !== '' && this.keyPass != null) {
      this.userHotel = this.userHotel.replace('?', '');
      this.userHotel = this.userHotel.split('&');
      this.hotelCode = this.userHotel[0];
      this.hotelCode = this.hotelCode.split('=');
      this.hotelCode = this.hotelCode[1];
      this.fechaIni = this.userHotel[1];
      this.fechaIni = this.fechaIni.split('=');
      this.fechaIni = this.fechaIni[1];
      this.fechaFin = this.userHotel[2];
      this.fechaFin = this.fechaFin.split('=');
      this.fechaFin = this.fechaFin[1];
      this.userId = this.userHotel[3];
      this.userId = this.userId.split('=');
      this.userId = this.userId[1];
      this.loginKey(this.keyEmail, this.keyPass);
    } else if (this.userHotel !== '') {
      this.userHotel = this.userHotel.replace('?', '');
      this.userHotel = this.userHotel.split('&');
      this.hotelCode = this.userHotel[0];
      this.hotelCode = this.hotelCode.split('=');
      this.hotelCode = this.hotelCode[1];
      this.fechaIni = this.userHotel[1];
      this.fechaIni = this.fechaIni.split('=');
      this.fechaIni = this.fechaIni[1];
      this.fechaFin = this.userHotel[2];
      this.fechaFin = this.fechaFin.split('=');
      this.fechaFin = this.fechaFin[1];
      this.userId = this.userHotel[3];
      this.userId = this.userId.split('=');
      this.userId = this.userId[1];
    }



    if (this.keyPass != null && this.keyPass !== '') {
      this.loginKey(this.keyEmail, this.keyPass);
    }
  }

  getHotel(hotelcode, fechasalida, fecharetorno, userId) {
    const loginHotel = {
      HotelCode: hotelcode,
      FechaSalida: fechasalida,
      FechaRetorno: fecharetorno,
      UserId: userId
    }
    this.sessionStorageService.store('LoginHotel', loginHotel);
    this.router.navigate(['hoteles']);

     /*  this.service.GetHabitacionLogin(data).subscribe(
        x => {
          if (x === null) {
            const error = {
              message: 'No encontramos hospedajes en este momento.'
            }
            const mensaje = {
              oerror: error
            }
            this.sessionStorageService.store("lstHabication", mensaje);
            this.modalRefSessionExpired = this.modalService.show(ModalHotelErroneoComponent);
          } else {
            this.lstHabication = x;
            if (x.ohotel != null) {
              let dest;
              let fecEntrada;
              let fecSalida;
              this.session1 = this.localStorageService.retrieve('ls_citylist');
              this.session1.forEach(element => {
                if (element.iataCode === x.ohotel.cityCode) {
                  dest = element.name;
                }
              });

              if (dest === undefined) {
                this.airport = this.localStorageService.retrieve('ls_airportlist');
                this.session1.forEach(element => {
                  if (element.iataCode === x.ohotel.cityCode) {
                    dest = element.name;
                  }
                });
              }

              this.sessionStorageService.store("lstHabication", this.lstHabication);
              const obj = {
                categoria: 'Todas',
                destino: dest,
                iata: x.ohotel.cityCode
              }

              fecEntrada = fechasalida;
              fecSalida = fecharetorno;

              const fechaSalidaShowSp = fecEntrada.split('-');
              const fechaRetornoShowSp = fecSalida.split('-');

              fecEntrada = fechaSalidaShowSp[2] + "-" + fechaSalidaShowSp[1] + "-" + fechaSalidaShowSp[0];
              fecSalida = fechaRetornoShowSp[2] + "-" + fechaRetornoShowSp[1] + "-" + fechaRetornoShowSp[0];

              const obj1 = {
                categoria: this.lstHabication.ohotel.stars,
                destino: '',
                fechaentrada: fecEntrada,
                fechasalida: fecSalida,
                habi: "1",
                personas: "1"
              }
              this.sessionStorageService.store("ss_sessionmini", obj1);
              this.sessionStorageService.store("ss_sessionmini1", obj);
            }

            if (this.lstHabication.oerror != null) {
              this.modalRefSessionExpired = this.modalService.show(ModalHotelErroneoComponent);
            } else {


              window.location.replace(window.location.origin + "/habitacion");
              this.ocultar = true;
              this.ocultar = this.sessionStorageService.store("ss_oculta", this.ocultar);
            }
          }



        },
        err => {
          this.spinner.hide();

        },
        () => {
          this.spinner.hide();

        }
      );
    }  */

  }



  click() {
    var el = document.getElementById('module');

    el.onclick = function () {
    };
  }

  loginKey(usuario, password) {

    this.spinner.show();
    const datos = {
      User: usuario,
      Password: password
    };

    this.flagLogin = 0;

    const lstCentralizador = environment.cod_rol_centralizador;


    this.loginService.login(datos).subscribe(
      (result) => {
        this.datoslogin = result;
        if (result != null) {
          if (this.datoslogin.oerror === null) {
            this.flagLogin = 1;
            let flagCentralizador = false;
            const roleId = result.orole.roleId;
            lstCentralizador.forEach(function (cent) {
              if (cent === roleId) {
                flagCentralizador = true;
              }
            });
            this.sessionStorageService.store('ss_login_data', result);
            this.token = result.token;
            this.localStorageService.store('ss_token', result.token);
            this.sessionStorageService.store('ss_token', result.token);
            this.sessionStorageService.store('ss_flagCentralizador', flagCentralizador);
            if (result.ocompany != null){
              this.sessionStorageService.store('ss_companyId', result.ocompany.companyId);
            }
            this.closedSesion = true;
            this.localStorageService.store("ss_closedSesion", null);
            this.localStorageService.store("ss_closedSesion", this.closedSesion);

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
          this.mensajeError = this.datoslogin.oerror.message;
          this.spinner.hide();
        } else {
          this.localStorageService.store('ss_credenciales', usuario);
          this.localStorageService.store('ss_crypto', password);
          this.userid = this.datoslogin.userId;
          this.airportListPriority();
        }
      }
    );

  }

  login() {
    let user = $('#txtemail').val();
    let pass = $('#txtpass').val();
    if (user === '' || pass === '') {
      this.msjerrorr = true;
      this.mensajeError = 'Por favor rellene los campos faltantes.'
    } else {
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
              this.sessionStorageService.store('LoginHotel', null);
              this.flagLogin = 1;
              let flagCentralizador = false;
              const roleId = result.orole.roleId;
              lstCentralizador.forEach(function (cent) {
                if (cent === roleId) {
                  flagCentralizador = true;
                }
              });
              this.sessionStorageService.store('ss_login_data', result);
              this.token = result.token;
              this.localStorageService.store('ss_token', result.token);
              this.sessionStorageService.store('ss_token', result.token);
              this.sessionStorageService.store('ss_flagCentralizador', flagCentralizador);
              if (result.ocompany != null){
                this.sessionStorageService.store('ss_companyId', result.ocompany.companyId);
              }
              this.closedSesion = true;
              this.localStorageService.store("ss_closedSesion", null);
              this.localStorageService.store("ss_closedSesion", this.closedSesion);
              if (this.userHotel !== '') {
                this.getHotel(this.hotelCode, this.fechaIni, this.fechaFin, this.userId);
              } else {
                this.sessionStorageService.store('LoginHotel', null);
                this.sessionStorageService.store('ss_hotel_key', false);
              }
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
            this.mensajeError = this.datoslogin.oerror.message;
            this.spinner.hide();
          } else {
            var password = $('#txtpass').val();
            var email = $('#txtemail').val();
            this.localStorageService.store('ss_credenciales', email);
            this.localStorageService.store('ss_crypto', crypto.SHA256(password).toString());
            this.userid = this.datoslogin.userId;
            this.airportListPriority();
          }
        }
      );
    }
  }

  onKeydown(event) {
    if (event.key === "Enter") {
      if ($('#txtpass').val().length > 0) {
        this.login();
      }
    }
  }

  cambiarPassword() {
    this.modalRefSessionExpired = this.modalService.show(ModalRecuperarPasswordComponent, this.config);
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
    const data = {
      priority: false
    }
    if (this.userHotel !== '') {
      this.getHotel(this.hotelCode, this.fechaIni, this.fechaFin, this.userId);
    } else {
      this.sessionStorageService.store('LoginHotel', null);
    }
    this.airportService.getAirportList(this.token, data.priority).subscribe(
      (result: any) => {
        let lstairport;
        //console.log(result);
        //this.airportlist = result.lairport;
        this.localStorageService.store('ls_airportlist', result.lairports);
        this.localStorageService.store('ls_citylist', result.lcities);
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
    const data = {
      priority: true
    }
    this.airportService.getAirportList(this.token, data.priority).subscribe(
      (result: any) => {
        let lstairport;
        //console.log(result);
        //this.airportlist = result.lairport;
        this.localStorageService.store('ls_airportlist', result.lairports);
        this.localStorageService.store('ls_citylist', result.lcities);
      },

      (err) => {
        this.spinner.hide();
        this.modalError = this.modalService.show(ModalErrorServiceComponent, this.config);
      },

      () => {


        let id = this.rutaActiva.snapshot.params.id;


        if (id == 1) {
          this.router.navigate(['/gestion-reserva-vuelo']);
        } else {
          if (this.userHotel !== '') {
            this.spinner.show();
            this.airportList();
          } else {
            this.spinner.hide();
            this.router.navigate(['/vuelos']);
            this.airportList();
          }
        }





      }
    );
  }

}
