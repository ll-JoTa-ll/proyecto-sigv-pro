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

  @Input() htmlTxtP;
  bsValue: Date;

  constructor(
    private userCompanyService: UserCompanyService,
    private modalService: BsModalService,
    private sessionStorageService : SessionStorageService) {
  /*  $("#telephone").intlTelInput({
  });*/
    let fecha;
    this.datosuser = sessionStorageService.retrieve('objusuarios');
    this.datosuser.forEach(element => {
      fecha = new Date(element.birthDate);
      this.bsValue = fecha;
    });
  }

  ngOnInit() {
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
      this.centroCosto = "Sin Información"
    }
  }

  ngAfterViewInit() {
    $("#divHtmlTxtP").html(this.htmlTxtP);
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
}
