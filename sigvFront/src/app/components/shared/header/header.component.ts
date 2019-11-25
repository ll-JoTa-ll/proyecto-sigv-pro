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
        break;

      case 2:
        this.router.navigate(['/hoteles']);
        break;

      case 3:
        this.router.navigate(['/buses']);
        break;

      case 4:
        this.router.navigate(['/paquetes']);
        break;

      case 5:
        this.router.navigate(['/seguros']);
        break;

    }
  }

  home() {
    this.router.navigate(['/vuelos']);
  }

  cerrarSesion() {
    this.sessionStorageService.clear();
    this.router.navigate(['/']);
  }

}
