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

  @Input() htmlTxtC;
  flagPrueba = false;
  ulPrincipal = false;

  htmlStr = `<ul class="top-level-menu">
    <li><a href="#">About</a></li>
    <li><a href="#">Services</a></li>
    <li>
      <a href="#">Offices</a>
      <ul class="second-level-menu">
        <li><a href="#">Chicago</a></li>
        <li><a href="#">Los Angeles</a></li>
        <li>
          <a href="#">New York</a>
          <ul class="third-level-menu">
            <li><a href="#">Information</a></li>
            <li><a href="#">Book a Meeting</a></li>
            <li><a href="#">Testimonials</a></li>
            <li><a href="#">Jobs</a></li>
          </ul>
        </li>
        <li><a href="#">Seattle</a></li>
      </ul>
    </li>
    <li><a href="#">Contact</a></li>
  </ul>`;


  htmlTxtC_;

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    //
  }

  public get inputpdf(): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(this.htmlStr);
  }

  public get htmlInfAdi(): SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(this.htmlTxtC);
  }

  ngOnInit() {
    //$("#divHtmlTxtC").html(this.htmlTxtC);
    //$("#dropdown-nested").show();
  }

  ngAfterViewInit() {
    this.htmlTxtC_ = this.htmlTxtC;


    $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function(event) {
      event.preventDefault();
      event.stopPropagation();

      $(this).siblings().toggleClass("show");


      if (!$(this).next().hasClass('show')) {
        $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
      }
      $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
        $('.dropdown-submenu .show').removeClass("show");
      });

    });


  }

}
