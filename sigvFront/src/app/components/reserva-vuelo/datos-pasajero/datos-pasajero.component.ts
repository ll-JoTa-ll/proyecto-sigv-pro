import { Component, OnInit, TemplateRef, Input, Output, AfterViewInit, Injectable, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IDatosUser } from 'src/app/models/IDatosUser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ICostCenter } from '../../../models/ICostCenter';
import { IReasonFlight } from '../../../models/IReasonFlight';
import { SessionStorageService } from 'ngx-webstorage';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { ConfigurationOptions, ContentOptionsEnum, NumberResult } from 'intl-input-phone';
import { IGetPaisesModel } from '../../../models/IGetPaises';
import { UserCompanyService } from 'src/app/services/user-company.service';
import { IDocumentType } from 'src/app/models/IDocumentType.model';
import { ICostCenterCompany } from "../../../models/ICostCenterCompany.model";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-datos-pasajero',
  templateUrl: './datos-pasajero.component.html',
  styleUrls: ['./datos-pasajero.component.sass']
})
export class DatosPasajeroComponent implements OnInit, AfterViewInit {

  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  TooltipLabel = TooltipLabel;


  @Input() LPolicies;
  @Input() currency;
  @Input() user;
  @Input() index;
  @Input() valtelefono;
  @Output() numtelefono = new EventEmitter<any>();
  @Input() lstpaises: IGetPaisesModel[];
  selectedvalue;
  fechanacimiento;
  datosPax;
  flagValDatosPAsajeros: boolean = false;
  datosuser;
  Document: IDocumentType[] = [];
  mdtelefono: string;
  configOption3 : ConfigurationOptions;
  centroCosto;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  datos;
  tratamiento;
  fecha;
  //valtelefono = false;
  //valcorreo = false;

  //@Input() htmlTxtP;
  //bsValue: Date;

  htmlTxtP = "";
  bsValue: Date;
  flagHtmlP = false;
  @Input() uidByCompanyP: any[] = [];
  @Input() lstCostCenter: ICostCenterCompany[] = [];
  lstValoresPax: any[] = [];

  constructor(
    private userCompanyService: UserCompanyService,
    private modalService: BsModalService,
    private sessionStorageService : SessionStorageService) {
    /*  $("#telephone").intlTelInput({
    });*/
    console.log("DatosPasajeroComponent constructor");
    console.log("index: " + this.index);
    let fecha;
    this.datosuser = sessionStorageService.retrieve('objusuarios');
    this.datosuser.forEach(element => {
      fecha = new Date(element.birthDate);
      this.bsValue = fecha;
    });
  }

  ngOnInit() {
    console.log("DatosPasajeroComponent ngOnInit");
    console.log("index: " + this.index);
    this.document();
    if (this.user.gender === 'M') {
      this.tratamiento = 'MR';
    } else {
      this.tratamiento = 'MRS';
    }
    this.fecha = this.user.birthDate;

    if (this.user.lcostCenter.length > 0 && this.user.lcostCenter[0].description != null){
      this.centroCosto = this.user.lcostCenter[0].description;
    } else {
      //this.centroCosto = "Sin Información"
      this.centroCosto = "U5_0"
    }

    //console.log("setInformacionPasajeros");
    //this.setInformacionPasajeros(this.uidByCompanyP);
  }

  ngAfterViewInit() {
    console.log("DatosPasajeroComponent ngAfterViewInit");
    //$("#divHtmlTxtP").html(this.htmlTxtP);
    this.setInformacionPasajeros(this.uidByCompanyP);
  }


  document(){
    this.userCompanyService.getDocument().subscribe(
      result => {
        this.Document = result;
      },
      err => {

      },
      () => {

      }
    );
  }

  openModal(template: TemplateRef<any>, template2: TemplateRef<any>) {
    if (this.LPolicies.length === 0) {
      this.modalRef = this.modalService.show(
        template2,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
    } else {
      this.modalRef = this.modalService.show(
        template,
        Object.assign({}, { class: 'gray modal-lg m-infraccion' })
      );
    }
  }

  ValidarSoloNumero(event)  {
    // tslint:disable-next-line: max-line-length
    if((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !==190  && event.keyCode !==110 && event.keyCode !==8 && event.keyCode !==9  ){
      return false;
    }
  }


  Solotexto(event) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
  }

  obtenercodigo(value) {
    $("#hdnTel_" + this.index).val(value);
    let valor = $('#cbopaises option:selected').attr('data-countryCode');
    if (valor === 'CO') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'PA') {
      $('#txttelefono_' + this.index).attr('maxlength', '8');
    }
    if (valor === 'PE') {
      $('#txttelefono_' + this.index).attr('maxlength', '9');
    }
    if (valor === 'AR') {
      $('#txttelefono_' + this.index).attr('maxlength', '13');
    }
    if (valor === 'EC') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'PY') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'UY') {
      $('#txttelefono_' + this.index).attr('maxlength', '9');
    }
    if (valor === 'VE') {
      $('#txttelefono_' + this.index).attr('maxlength', '11');
    }
    if (valor === 'CL') {
      $('#txttelefono_' + this.index).attr('maxlength', '9');
    }
    if (valor === 'BR') {
      $('#txttelefono_' + this.index).attr('maxlength', '11');
    }
    if (valor === 'BO') {
      $('#txttelefono_' + this.index).attr('maxlength', '8');
    }
    if (valor === 'US') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'MX') {
      $('#txttelefono_' + this.index).attr('maxlength', '13');
    }
    if (valor === 'CA') {
      $('#txttelefono_' + this.index).attr('maxlength', '10');
    }
    if (valor === 'CR') {
      $('#txttelefono_' + this.index).attr('maxlength', '8');
    }
    if (valor === 'CU') {
      $('#txttelefono_' + this.index).attr('maxlength', '9');
    }
  }



  llenarnumero() {

  }

  ValidarCampos() {
    this.datosuser.forEach(function(item, index) {
      if ($('#txtnombre_' + (index + 1)).val().length <= 0) {
        $('#txtnombre_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txtnombre_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#txtapellidos_' + (index + 1)).val().length <= 0) {
        $('#txtapellidos_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txtapellidos_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#txtnrodocumento_' + (index + 1)).val().length <= 0) {
        $('#txtnrodocumento_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txtnrodocumento_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#cbo_tipodocumento_' + (index + 1)).val().trim() === '') {
        $('#cbo_tipodocumento_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#cbo_tipodocumento_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#cbotratamiento_' + (index + 1)).val().trim() === '') {
        $('#cbotratamiento_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#cbotratamiento_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#txtcorreo_' + (index + 1)).val().length <= 0) {
        $('#txtcorreo_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txtcorreo_' + (index + 1)).removeClass('campo-invalido');
      }
      if ($('#txttelefono_' + (index + 1)).val().length === 0) {
        $('#txttelefono_' + (index + 1)).addClass('campo-invalido');
      } else {
        $('#txttelefono_' + (index + 1)).removeClass('campo-invalido');
      }
    });
  }

  setInformacionPasajeros(lstUidByCompanyP) {
    let lstValoresPax = this.lstValoresPax;
    const lstCostCenter = this.lstCostCenter;
    console.log("setInformacionPasajeros");
    //console.log("lstUidByCompanyP: " + JSON.stringify(lstUidByCompanyP));
    const indexP = this.index;
    if (lstUidByCompanyP.length > 0) {
      let htmlTxtC = "";
      const lstTxtC = lstUidByCompanyP.filter(x => x.isList === false);
      const lstCbxC = lstUidByCompanyP.filter(x => x.isList === true);
      let flagC = 0;
      lstTxtC.forEach(function(txt, index) {
        flagC = 1;


        htmlTxtC += "<div class='col-6 m-0 p-0 pl-4 pr-4 pl-4 pr-4'>";
        htmlTxtC += "<div class='row m-0 p-0'>";
        htmlTxtC += "<div class='col-12 m-0 p-0 label-pasajero'>";
        htmlTxtC += "<label for='' class='label-pasajero'>";
        htmlTxtC += txt.title;
        htmlTxtC += "</label>";
        htmlTxtC += "</div>";
        htmlTxtC += "</div>";
        htmlTxtC += "<div class='row m-0 p-0'>";
        htmlTxtC += "<div class='col-12 m-0 p-0'>";
        //htmlTxtC += "<input disabled (keypress)='ValidarCampos()' (keydown)='ValidarCampos()' (keyup)='ValidarCampos()' class='input-pasajero' type='text' [(ngModel)]='this.centroCosto' id='txtCentroCosto_{{index}}' maxlength='50'>";
        htmlTxtC += "";
        htmlTxtC += "";

        let flagU5 = 0;
        if (txt.codeUid === 'U5') {
          if (txt.listUids === null) {
            flagU5 = 1;
          } else if (txt.listUids.length === 0) {
            flagU5 = 1;
          }
        }

        if (flagU5 === 1) {
          if (txt.isEditable === true) {

            htmlTxtC += "<select class='form-control'  id='p_" + txt.codeUid + "_" + indexP + "'>";
            htmlTxtC += "<option value='" + txt.codeUid + "_0" + "" + "'>" + "Selecciona" + "</option>";
            lstCostCenter.forEach(function(padre, indexPadre) {
              //(change)='listarHijo(" + cbx.codeUid + "_" + padre.id + ")'
              //htmlTxtC += "<option value='" + txt.codeUid + "_" + padre.code + "'>" + padre.description + "</option>";
              htmlTxtC += "<option value='" + "" + "" + padre.code + "'>" + padre.description + "</option>";
            });
            htmlTxtC += "</select>";

          }
        } else {
          htmlTxtC += "<input id='p_" + txt.codeUid + "_" + indexP + "' class='form-control' type='text'>";
        }

        htmlTxtC += "";
        htmlTxtC += "";
        htmlTxtC += "</div>";
        htmlTxtC += "</div>";
        htmlTxtC += "</div>";

        const oPaxInfo = {
          "id": "p_" + txt.codeUid + "_" + indexP,
          "isMandatory": txt.isMandatory,
          "status": 1
        };
        lstValoresPax.push(oPaxInfo);

        /*
        htmlTxtC += "<div class='col-6 m-0 p-0 pt-2'>";
        htmlTxtC += "";
        htmlTxtC += "";
        htmlTxtC += txt.title;
        htmlTxtC += "";
        htmlTxtC += "</div>";
        htmlTxtC += "<div class='col-6 m-0 p-0 pt-2'>";
        htmlTxtC += "";
        htmlTxtC += "";
        htmlTxtC += "<input class='form-control' type='text'>";
        htmlTxtC += "";
        htmlTxtC += "</div>";
        htmlTxtC += "";
        */
      });

      //this.setHijoNieto(lstCbxC);

      lstCbxC.forEach(function(cbx) {
        flagC = 1;

        const llistUid = cbx.listUids;
        if (llistUid != null) {
          const lstPadre = llistUid.filter(x => x.parent === 0);
          const lstHijosNietos = llistUid.filter(x => x.parent > 0);

          htmlTxtC += "<div class='col-6 m-0 p-0 pl-4 pr-4 pl-4 pr-4'>";
          htmlTxtC += "<div class='row m-0 p-0'>";
          htmlTxtC += "<div class='col-12 m-0 p-0 label-pasajero'>";
          htmlTxtC += "<label for=''>";
          htmlTxtC += cbx.title + "";
          htmlTxtC += "</label>";
          htmlTxtC += "</div>";
          htmlTxtC += "</div>";


          /*
          htmlTxtC += "<div class='col-6 m-0 p-0 pt-2'>";
          htmlTxtC += cbx.title;
          htmlTxtC += "</div>";
          */



          htmlTxtC += "<div class='row m-0 p-0'>";

          htmlTxtC += "<select class='form-control'  id='combo_" + cbx.codeUid + "_" + indexP + "'>";
          //htmlTxtC += "<option value='" + cbx.codeUid + "_0" + "" + "'>" + "Selecciona" + "</option>";
          htmlTxtC += "<option value='" + "" + "0" + "" + "'>" + "Selecciona" + "</option>";
          lstPadre.forEach(function(padre, indexPadre) {
            //(change)='listarHijo(" + cbx.codeUid + "_" + padre.id + ")'
            htmlTxtC += "<option value='" + cbx.codeUid + "_" + padre.id+ "_" + padre.code + "'>" + padre.description + "</option>";

          });
          htmlTxtC += "</select>";

          htmlTxtC += "</div>";

          const oPaxInfo = {
            "id": "combo_" + cbx.codeUid + "_" + indexP,
            "isMandatory": cbx.isMandatory,
            "status": 1
          };
          lstValoresPax.push(oPaxInfo);

          //htmlTxtC += "</div>";

          //Hijo 1
          //htmlTxtC += "<div class='col-6 m-0 p-0 pl-4 pr-4 pl-4 pr-4'>";

          htmlTxtC += "<div id='rowHijo1_" + indexP + "' class='row m-0 p-0 pt-2'>";
          htmlTxtC += "<div class='col-12 m-0 p-0 label-pasajero'>";
          htmlTxtC += "<label id='label_hijo_1_" + indexP + "' for=''>";
          htmlTxtC += "</label>";
          htmlTxtC += "</div>";
          htmlTxtC += "</div>";

          htmlTxtC += "<div class='row m-0 p-0'>";
          htmlTxtC += "<div class='' id='divHijo1_" + indexP + "'></div>";
          htmlTxtC += "</div>";

          //htmlTxtC += "</div>";

          //Hijo 2
          //htmlTxtC += "<div class='col-6 m-0 p-0 pl-4 pr-4 pl-4 pr-4'>";

          htmlTxtC += "<div id='rowHijo2_" + indexP + "' class='row m-0 p-0 pt-2'>";
          htmlTxtC += "<div class='col-12 m-0 p-0 label-pasajero'>";
          htmlTxtC += "<label id='label_hijo_2_" + indexP + "' for=''>";
          htmlTxtC += "</label>";
          htmlTxtC += "</div>";
          htmlTxtC += "</div>";

          htmlTxtC += "<div class='row m-0 p-0'>";
          htmlTxtC += "<div class='' id='divHijo2_" + indexP + "'></div>";
          htmlTxtC += "</div>";

          //htmlTxtC += "</div>";

          //Hijo 3
          //htmlTxtC += "<div class='col-6 m-0 p-0 pl-4 pr-4 pl-4 pr-4'>";

          htmlTxtC += "<div id='rowHijo3_" + indexP + "' class='row m-0 p-0 pt-2'>";
          htmlTxtC += "<div class='col-12 m-0 p-0 label-pasajero'>";
          htmlTxtC += "<label id='label_hijo_3_" + indexP + "' for=''>";
          htmlTxtC += "</label>";
          htmlTxtC += "</div>";
          htmlTxtC += "</div>";

          htmlTxtC += "<div class='row m-0 p-0'>";
          htmlTxtC += "<div class='' id='divHijo3_" + indexP + "'></div>";
          htmlTxtC += "</div>";

          //htmlTxtC += "</div>";

          //Hijo 4
          //htmlTxtC += "<div class='col-6 m-0 p-0 pl-4 pr-4 pl-4 pr-4'>";

          htmlTxtC += "<div id='rowHijo4_" + indexP + "' class='row m-0 p-0 pt-2'>";
          htmlTxtC += "<div class='col-12 m-0 p-0 label-pasajero'>";
          htmlTxtC += "<label id='label_hijo_4_" + indexP + "' for=''>";
          htmlTxtC += "</label>";
          htmlTxtC += "</div>";
          htmlTxtC += "</div>";

          htmlTxtC += "<div class='row m-0 p-0'>";
          htmlTxtC += "<div class='' id='divHijo4_" + indexP + "'></div>";
          htmlTxtC += "</div>";

          //
          htmlTxtC += "</div>";
        }
      });

      this.lstValoresPax = lstValoresPax;
      console.log("this.lstValoresPax: " + JSON.stringify(this.lstValoresPax));
      //console.log("htmlTxtC: " + htmlTxtC);
      this.htmlTxtP = htmlTxtC;

      console.log("DIV: " + "#divHtmlTxtP_" + indexP);
      $("#divHtmlTxtP_" + indexP).html(this.htmlTxtP);

      //combo_U5_1
      /*
      $('#combo_U5_1').select2({
        selectOnClose: true
      });
      */

      console.log("this.centroCosto: " + this.centroCosto);
      $('#combo_U5_' + indexP).val(this.centroCosto);

      let uidByCompanyP = this.uidByCompanyP;
      const indexPax = this.index;
      uidByCompanyP = uidByCompanyP.filter(x => x.isList === true);
      uidByCompanyP.forEach(function (compamy) {
        console.log("combo_: " + "#combo_" + compamy.codeUid + "_" + indexPax);
        $("#combo_" + compamy.codeUid + "_" + indexPax).change(function() {
          console.log("indexPax: " + indexPax);
          console.log("indexP: " + indexP);
          //alert( "Handler for .change() called." );
          //const idPadre = $("#combo_5").val();
          const idPadre = $("#combo_" + compamy.codeUid + "_" + indexPax).val();
          const valor1 = idPadre.split('_')[0];
          const valor2 = idPadre.split('_')[1];

          console.log("idPadre: " + idPadre);
          console.log("valor1: " + valor1);
          console.log("valor2: " + valor2);

          //const lstUidByCompanyP = uidByCompanyP.filter(x => x.codeUid == valor1)[0];
          //const llistUid = lstUidByCompanyP.listUids.filter(x => x.parent == valor2);
          const oPadre = compamy.listUids.filter(x => x.codeUid == valor1 && x.id == valor2)[0];
          const llistUid = oPadre.listUids;

          if (llistUid.length > 0) {
            $("#rowHijo1_" + indexPax).show();
            $("#divHijo1_" + indexPax).show();
            //$("#divHijo2_" + valor1).show();
            let htmlHijo = "";
            const idComboHijo = "comboH_" + llistUid[0].codeUid + "_" + indexPax;

            /*
            let flagHijo = 0;
            this.lstValoresPax.forEach(function (item) {
              if (idComboHijo === item.id) {
                flagHijo = 1;
              }
            });
            if (flagHijo) {
              const oPaxInfo = {
                "id": idComboHijo,
                "isMandatory": llistUid[0].isMandatory,
                "status": 1
              };
              this.lstValoresPax.push(oPaxInfo);
            }
            console.log("this.lstValoresPax: " + JSON.stringify(this.lstValoresPax));
            */

            htmlHijo += "<select class='form-control'  id='comboH_" + llistUid[0].codeUid + "_" + indexPax + "'>";
            //htmlHijo += "<option value='" + valor1 + "_0" + "" + "'>" + "Selecciona" + "</option>";
            htmlHijo += "<option value='" + "" + "0" + "" + "'>" + "Selecciona" + "</option>";
            let hijoTitle = "";
            llistUid.forEach(function(hijo) {
              hijoTitle = hijo.title;
              htmlHijo += "<option value='" + hijo.codeUid + "_" + hijo.id + "_" + hijo.code + "'>" + hijo.description + "</option>";
            });
            htmlHijo += "</select>";
            $("#divHijo1_" + indexPax).html(htmlHijo);
            $("#label_hijo_1_" + indexPax).html(hijoTitle);

            //NIETO
            $("#" + idComboHijo).change(function() {
              $("#divHijo2_" + indexPax).hide();
              const valComboHijo = $("#" + idComboHijo).val();
              //const llistUidHijo = lstUidByCompanyP.llistUid.filter(x => x.parent == valComboHijo.split('_')[1]);
              const valor1Hijo = valComboHijo.split('_')[0];
              const valor2Hijo = valComboHijo.split('_')[1];
              const oHijo = llistUid.filter(x => x.codeUid == valor1Hijo && x.id == valor2Hijo)[0];
              const llistUidHijo = oHijo.listUids;
              if (llistUidHijo.length > 0) {
                $("#rowHijo2_" + indexPax).show();
                $("#divHijo2_" + indexP).show();
                let htmlNieto = "";
                const idComboHijo = "comboN_" + llistUidHijo[0].codeUid + "_" + indexPax;

                /*
                let flagNieto = 0;
                this.lstValoresPax.forEach(function (item) {
                  if (idComboHijo === item.id) {
                    flagNieto = 1;
                  }
                });
                if (flagNieto) {
                  const oPaxInfo = {
                    "id": idComboHijo,
                    "isMandatory": llistUidHijo[0].isMandatory,
                    "status": 1
                  };
                  this.lstValoresPax.push(oPaxInfo);
                }
                console.log("this.lstValoresPax: " + JSON.stringify(this.lstValoresPax));
                */

                htmlNieto += "<select class='form-control'  id='comboN_" + llistUidHijo[0].codeUid + "_" + indexPax + "'>";
                //htmlNieto += "<option value='" + valor1 + "_0" + "" + "'>" + "Selecciona" + "</option>";
                htmlNieto += "<option value='" + "" + "0" + "" + "'>" + "Selecciona" + "</option>";
                let nietoTitle = "";
                llistUidHijo.forEach(function(nieto) {
                  nietoTitle = nieto.title;
                  htmlNieto += "<option value='" + nieto.codeUid + "_" + nieto.id + "_" + nieto.code + "'>" + nieto.description + "</option>";
                });
                htmlNieto += "</select>";
                $("#divHijo2_" + indexP).html(htmlNieto);
                $("#label_hijo_2_" + indexPax).html(nietoTitle);
              } else {
                $("#divHijo2_" + indexP).hide();
                $("#rowHijo2_" + indexPax).hide();
              }
            });
          } else {
            $("#divHijo1_" + indexP).hide();
            $("#rowHijo1_" + indexPax).hide();
            $("#divHijo2_" + indexP).hide();
            $("#rowHijo2_" + indexPax).hide();
          }
        });
      })

      if (flagC === 1) {
        this.flagHtmlP = true;
      }

    }
  }
}
