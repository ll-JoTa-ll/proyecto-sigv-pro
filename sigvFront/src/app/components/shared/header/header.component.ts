import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  flagTipo: number;
  nombreUsuario: string;
  gender: string;
  loginDataUser;
  role;
  empresa;
  myWindow;
  closedSesion: boolean;
  idinterval: any;

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService
  ) {
    this.flagTipo = 1;
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
   
    this.nombreUsuario = this.loginDataUser.userName;
    this.gender = this.loginDataUser.gender;
    this.role = this.loginDataUser.orole.roleDescription;
    this.empresa = this.loginDataUser.ocompany.companyName;

  }

  ngOnInit() {
  }

  cambiarTipo(valor) {
    console.log(valor);
    this.flagTipo = valor;

    switch (valor) {

      case 1:
        this.router.navigate(['/vuelos']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        break;

      case 2:
        this.router.navigate(['/hoteles']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        break;

      case 3:
        this.router.navigate(['/buses']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        break;

      case 4:
        this.router.navigate(['/paquetes']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        break;

      case 5:
        this.router.navigate(['/seguros']);
        this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
        break;

    }
  }

  home() {
    this.router.navigate(['/vuelos']);
    this.idinterval = this.sessionStorageService.retrieve("ss_interval");
        clearInterval(this.idinterval);
  }

  cerrarSesion() {
    this.sessionStorageService.clear();
    this.router.navigate(['/']);
    this.closedSesion = false;
    this.localStorageService.store("ss_closedSesion",this.closedSesion);
  }

}
