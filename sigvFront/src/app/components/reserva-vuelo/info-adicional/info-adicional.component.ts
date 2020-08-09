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
  @Input() uidByCompanyC;
  flagPrueba = false;
  ulPrincipal = false;

  constructor(
    private _sanitizer: DomSanitizer
  ) {
    console.log("InfoAdicionalComponent constructor");
  }
  ngOnInit() {
    console.log("InfoAdicionalComponent ngOnInit");
  }

  ngAfterViewInit() {
    console.log("InfoAdicionalComponent ngAfterViewInit");
    let uidByCompanyC = this.uidByCompanyC;
    uidByCompanyC = uidByCompanyC.filter(x => x.isList === true);
    uidByCompanyC.forEach(function(compamy) {
      //$("#combo_5").change(function() {
      $("#combo_" + compamy.uidId).change(function() {
        //alert( "Handler for .change() called." );
        //const idPadre = $("#combo_5").val();
        const idPadre = $("#combo_" + compamy.uidId).val();
        const valor1 = idPadre.split('_')[0];
        const valor2 = idPadre.split('_')[1];

        const lstUidByCompanyC = uidByCompanyC.filter(x => x.uidId == valor1)[0];
        const llistUid = lstUidByCompanyC.llistUid.filter(x => x.parent == valor2);

        if (llistUid.length > 0) {
          $("#divHijo1_" + valor1).show();
          //$("#divHijo2_" + valor1).show();
          let htmlHijo = "";
          const idComboHijo = "comboHijo_" + valor1;
          htmlHijo += "<select class='form-control'  id='comboHijo_" + valor1 + "'>";
          htmlHijo += "<option value='" + valor1 + "_0" + "" + "'>" + "Selecciona" + "</option>";
          llistUid.forEach(function(hijo) {
            htmlHijo += "<option value='" + valor1 + "_" + hijo.id + "'>" + hijo.description + "</option>";
          });
          htmlHijo += "</select>";
          $("#divHijo1_" + valor1).html(htmlHijo);

          //NIETO
          $("#" + idComboHijo).change(function() {
            $("#divHijo2_" + valor1).hide();
            const valComboHijo = $("#" + idComboHijo).val();
            const llistUidHijo = lstUidByCompanyC.llistUid.filter(x => x.parent == valComboHijo.split('_')[1]);
            if (llistUidHijo.length > 0) {
              $("#divHijo2_" + valor1).show();
              let htmlNieto = "";
              const idComboHijo = "comboHijo_" + valor1;
              htmlNieto += "<select class='form-control'  id='comboHijo_" + valor1 + "'>";
              htmlNieto += "<option value='" + valor1 + "_0" + "" + "'>" + "Selecciona" + "</option>";
              llistUidHijo.forEach(function(nieto) {
                htmlNieto += "<option value='" + valor1 + "_" + nieto.id + "'>" + nieto.description + "</option>";
              });
              htmlNieto += "</select>";
              $("#divHijo2_" + valor1).html(htmlNieto);
            } else {
              $("#divHijo2_" + valor1).hide();
            }
          });
        } else {
          $("#divHijo1_" + valor1).hide();
          $("#divHijo2_" + valor1).hide();
        }
      });
    })
  }

}
