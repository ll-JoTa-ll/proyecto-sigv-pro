import { Component, OnInit, TemplateRef, Input, Output, AfterViewInit, Injectable, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IDatosUser } from 'src/app/models/IDatosUser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ICostCenter } from '../../../models/ICostCenter';
import { IReasonFlight } from '../../../models/IReasonFlight';
import { SessionStorageService } from 'ngx-webstorage';
import { SearchCountryField, TooltipLabel, CountryISO } from 'ngx-intl-tel-input';
import { ConfigurationOptions, ContentOptionsEnum, NumberResult } from 'intl-input-phone';

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
  CountryISO = CountryISO;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  @Input() LPolicies;
  @Input() currency;
  @Input() user;
  @Input() index;
  @Input() valtelefono;
  @Output() numtelefono = new EventEmitter<any>();
  selectedvalue;
  fechanacimiento;
  datosPax;
  flagValDatosPAsajeros: boolean = false;
  datosuser: any[] = [];
  mdtelefono: string;
  configOption3 : ConfigurationOptions;

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  datos;
  tratamiento;
  fecha;
  OutputValue1: NumberResult = new NumberResult();
  numtel: string = "+51 916 596 911";
  SelectedCountryISOCode: string = "PE";
  //valtelefono = false;
  //valcorreo = false;

  @Input() htmlTxtP;

  constructor(private modalService: BsModalService, private sessionStorageService : SessionStorageService) {
    this.datosuser = sessionStorageService.retrieve('objusuarios');
    this.configOption3 = new ConfigurationOptions();
    this.configOption3.SelectorClass = "InputValidation2";
    this.configOption3.OptionTextTypes = [];
    this.configOption3.OptionTextTypes.push(ContentOptionsEnum.Flag);
    this.configOption3.OptionTextTypes.push(ContentOptionsEnum.CountryName);
    this.configOption3.OptionTextTypes.push(ContentOptionsEnum.CountryPhoneCode);
  }

  ngOnInit() {
    $("#phone").intlTelInput();
    if (this.user.gender === 'M') {
      this.tratamiento = 'MR';
    } else {
      this.tratamiento = 'MRS';
    }
    this.fecha = this.user.birthDate;
  }

  ngAfterViewInit() {
    $("#divHtmlTxtP").html(this.htmlTxtP);
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

  onNumberChage(outputResult)
  {
    this.OutputValue1 = outputResult;
    console.log(this.OutputValue1);
    this.numtelefono.emit(this.OutputValue1);
  }

  Solotexto(event) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
      event.preventDefault();
      return false;
    }
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
