import {Component, Input, OnInit} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-info-adicional',
  templateUrl: './info-adicional.component.html',
  styleUrls: ['./info-adicional.component.sass']
})
export class InfoAdicionalComponent implements OnInit {

  @Input() htmlTxtC;

  constructor() { }

  ngOnInit() {
    $("#divHtmlTxtC").html(this.htmlTxtC);
  }

}
