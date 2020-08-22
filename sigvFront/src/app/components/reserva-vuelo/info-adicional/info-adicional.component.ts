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
    //console.log("InfoAdicionalComponent constructor");
  }
  ngOnInit() {
    //console.log("InfoAdicionalComponent ngOnInit");
  }

  ngAfterViewInit() {
    //console.log("InfoAdicionalComponent ngAfterViewInit");
    $("#c_rowHijo1_1").hide();
    $("#c_divHijo1").hide();
    $("#c_rowHijo1_1").hide();
    $("#c_divHijo2").hide();
    $("#c_rowHijo1_1").hide();
    $("#c_divHijo3").hide();
    $("#c_rowHijo1_1").hide();
    $("#c_divHijo4").hide();
    let uidByCompanyC = this.uidByCompanyC;
    const indexPax = 1;
    //console.log("uidByCompanyC: " + JSON.stringify(uidByCompanyC));
    uidByCompanyC = uidByCompanyC.filter(x => x.isList === true);
    uidByCompanyC.forEach(function (compamy) {
      //console.log("combo: " + "#c_combo_" + compamy.codeUid + "_" + indexPax);
      $("#c_combo_" + compamy.codeUid).change(function() {

        const idPadre = $("#c_combo_" + compamy.codeUid).val();
        const valor1 = idPadre.split('_')[0];
        const valor2 = idPadre.split('_')[1];

        //console.log("idPadre: " + idPadre);
        //console.log("valor1: " + valor1);
        //console.log("valor2: " + valor2);

        const oPadre = compamy.listUids.filter(x => x.codeUid == valor1 && x.id == valor2)[0];
        const llistUid = oPadre.listUids;

        if (llistUid.length > 0) {
          $("#c_rowHijo1_" + indexPax).show();
          $("#c_divHijo1").show();
          let htmlHijo = "";
          const idComboHijo = "c_comboH_" + llistUid[0].codeUid;

          htmlHijo += "<select class='form-control'  id='c_comboH_" + llistUid[0].codeUid + "'>";
          htmlHijo += "<option value='" + "" + "0" + "" + "'>" + "Selecciona" + "</option>";
          let hijoTitle = "";
          llistUid.forEach(function(hijo) {
            hijoTitle = hijo.title;
            htmlHijo += "<option value='" + hijo.codeUid + "_" + hijo.id + "_" + hijo.code + "'>" + hijo.description + "</option>";
          });
          htmlHijo += "</select>";
          $("#c_divHijo1").html(htmlHijo);
          $("#c_label_hijo_1").html(hijoTitle);

          //NIETO
          $("#" + idComboHijo).change(function() {
            $("#c_divHijo2").hide();
            const valComboHijo = $("#" + idComboHijo).val();
            const valor1Hijo = valComboHijo.split('_')[0];
            const valor2Hijo = valComboHijo.split('_')[1];
            const oHijo = llistUid.filter(x => x.codeUid == valor1Hijo && x.id == valor2Hijo)[0];
            const llistUidHijo = oHijo.listUids;
            if (llistUidHijo.length > 0) {
              $("#c_rowHijo2_" + indexPax).show();
              $("#c_divHijo2").show();
              let htmlNieto = "";
              const idComboHijo = "c_comboN_" + llistUidHijo[0].codeUid;
              htmlNieto += "<select class='form-control'  id='c_comboN_" + llistUidHijo[0].codeUid + "'>";
              htmlNieto += "<option value='" + "" + "0" + "" + "'>" + "Selecciona" + "</option>";
              let nietoTitle = "";
              llistUidHijo.forEach(function(nieto) {
                nietoTitle = nieto.title;
                htmlNieto += "<option value='" + nieto.codeUid + "_" + nieto.id + "_" + nieto.code + "'>" + nieto.description + "</option>";
              });
              htmlNieto += "</select>";
              $("#c_divHijo2").html(htmlNieto);
              $("#c_label_hijo_2").html(nietoTitle);
            } else {
              $("#c_divHijo2").hide();
              $("#c_rowHijo2_" + indexPax).hide();
            }
          });
        } else {
          $("#c_divHijo1").hide();
          $("#c_rowHijo1_" + indexPax).hide();
          $("#c_divHijo2").hide();
          $("#c_rowHijo2_" + indexPax).hide();
        }
      });
    })
  }

}
