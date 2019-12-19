import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICostCenter } from '../../../models/ICostCenter';
import { SessionStorageService } from 'ngx-webstorage';
import { ConfigurationOptions, ContentOptionsEnum, NumberResult } from 'intl-input-phone';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-persona-contacto',
  templateUrl: './persona-contacto.component.html',
  styleUrls: ['./persona-contacto.component.sass']
})
export class PersonaContactoComponent implements OnInit {

  @Input() lsCostCenter: ICostCenter[];
  @Output() numero1 = new EventEmitter<any>();
  datosuser: any[] = [];
  inderror: boolean;
  OutputValue2: NumberResult = new NumberResult();
  configOption3 : ConfigurationOptions;

  constructor(private sessionStorageService: SessionStorageService) {
    this.datosuser = sessionStorageService.retrieve('objusuarios');
    this.configOption3 = new ConfigurationOptions();
    this.configOption3.SelectorClass = "OptionType3";
    this.configOption3.OptionTextTypes = [];
    this.configOption3.OptionTextTypes.push(ContentOptionsEnum.Flag);
    this.configOption3.OptionTextTypes.push(ContentOptionsEnum.CountryName);
    this.configOption3.OptionTextTypes.push(ContentOptionsEnum.CountryPhoneCode);
   }

  ngOnInit() {}

  onNumberChage2(outputResult)
  {
    this.OutputValue2 = outputResult;
    console.log(this.OutputValue2);
    this.numero1.emit(this.OutputValue2);
    $('input[name="InputPhone').removeClass('campo-invalido');
  }

  ValidarCampos(tipo) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (tipo === 1) {
      if ($('#contactocorreo').val().length <= 0) {
        $('#contactocorreo').addClass('campo-invalido');
      } else {
        $('#contactocorreo').removeClass('campo-invalido');
      }

      if (regex.test($('#contactocorreo').val().trim())) {
        this.inderror = false;
      } else {
       this.inderror = true;
      }
    }

    if (tipo === 2) {
      if ($('#contactotelefono').val().length <= 0) {
        $('#contactotelefono').addClass('campo-invalido');
      } else {
        $('#contactotelefono').removeClass('campo-invalido');
      }
    }

    if (tipo === 3) {
      if ($('#nombrecontacto').val().length <= 0) {
        $('#nombrecontacto').addClass('campo-invalido');
      } else {
        $('#nombrecontacto').removeClass('campo-invalido');
      }
    }
  }

  ValidarSoloNumero(event)  {
    // tslint:disable-next-line: max-line-length
    if((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && event.keyCode !==190  && event.keyCode !==110 && event.keyCode !==8 && event.keyCode !==9  ){
      return false;
  }
  }
}
