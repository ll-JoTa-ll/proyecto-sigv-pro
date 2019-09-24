import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import * as crypto from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { AirportService } from '../../services/airport.service';
//import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

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
  flagLogin: number;
  token;

  constructor(
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private airportService: AirportService,
    //private location: Location
  ) {
    this.checkedRecuerdame = true;
    this.sessionStorageService.store('ss_login_data', '');
  }

  ngOnInit() {
    this.sessionStorageService.store('ss_login_data', '');
  }

  login() {
    this.spinner.show();
    const datos = {
      User: this.model.User,
      Password: crypto.SHA256(this.model.Password).toString()
    };
    this.flagLogin = 0;

    console.log(this.checkedRecuerdame);

    this.loginService.login(datos).subscribe(
      (result) => {
        if (result != null) {
          this.flagLogin = 1;
          console.log('login result: ' + JSON.stringify(result));
          this.sessionStorageService.store('ss_login_data', result);
          this.token = result.token;
          this.sessionStorageService.store('ss_token', result.token);
          //console.log(result);
        } else {
          console.log("NULL");
        }

      },

      (error) => {
        this.spinner.hide();
        console.log('ERROR' + JSON.stringify(error));
      },

      () => {
        /*
        console.log("flagLogin = " + this.flagLogin);
        if (this.flagLogin === 1) {
          const ls_airportlist = this.localStorageService.retrieve('ls_airportlist');
          if (ls_airportlist === null) {
            this.airportList();
          } else {
            this.spinner.hide();
            this.router.navigate(['/vuelos']);
          }
        } else {
          this.spinner.hide();
        }
        */
        console.log("LOGIN Completado")
        this.airportList();
      }
    );
  }

  airportList() {
    this.airportService.airportList(this.token).subscribe(
      (result: any) => {
        console.log(result);
        this.airportlist = result;
        this.localStorageService.store('ls_airportlist', this.airportlist);
      },

      (err) => {
        this.spinner.hide();
        console.log('ERROR' + JSON.stringify(err));
        },

      () => {
        this.spinner.hide();
        console.log("Service airportList complete");
        //$(location).attr("href", "/vuelos");
        this.router.navigate(['/vuelos']);
      }
    );
  }

}
