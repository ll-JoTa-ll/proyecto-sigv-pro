import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(){}
  title = 'SIVG PLUS';

  ngOnInit() {
    setTimeout(function() {
      $("#divLoaderLogin").hide();
    }, 3000);
  }
}
