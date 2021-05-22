import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.sass']
})
export class NavHeaderComponent implements OnInit {

  expanded = false;
  expanded1 = false;
  nameAdmin: string;
  flagTipo: number;
  nombreUsuario: string;
  loginDataUser;
  countLstMenu: number;

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService
  ) {
    this.flagTipo = 1;
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.nombreUsuario = this.loginDataUser.userName;
    this.countLstMenu = this.loginDataUser.lmenu.length;
  }

  ngOnInit() {
  }

  toggleMenu() {
    this.expanded = this.expanded === true ? false : true;
  }

  toggleMenu1() {
    this.expanded1 = this.expanded1 === true ? false : true;
  }

}
