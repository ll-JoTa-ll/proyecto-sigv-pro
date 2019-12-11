import {Component, Input, OnInit, AfterViewInit} from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-info-adicional',
  templateUrl: './info-adicional.component.html',
  styleUrls: ['./info-adicional.component.sass']
})
export class InfoAdicionalComponent implements OnInit, AfterViewInit {

  @Input() htmlTxtC: string;
  flagPrueba = false;
  ulPrincipal = false;

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    //
  }

  ngOnInit() {
    //$("#divHtmlTxtC").html(this.htmlTxtC);
    //$("#dropdown-nested").show();
  }

  ngAfterViewInit() {
  }

}
