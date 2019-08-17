import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import * as crypto from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  model: any = {};
  checkedRecuerdame: boolean;

  constructor(
    private loginService: LoginService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.checkedRecuerdame = true;
  }

  ngOnInit() {
  }

  login() {
    this.spinner.show();
    const datos = {
      User: this.model.User,
      Password: crypto.SHA256(this.model.Password).toString()
    };

    console.log(this.checkedRecuerdame);

    this.loginService.login(datos).subscribe(
      (result) => {
        if (result != null) {
          console.log(result);
          this.router.navigate(['/search']);
        } else {
          console.log("NULL");
        }

      },
      (error) => {
        console.log(error);
      },
      () => {
        this.spinner.hide();
      }
    );
  }

}
