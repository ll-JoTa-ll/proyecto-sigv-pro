import { Component, OnInit, Output, EventEmitter, Directive, ElementRef, Input, HostListener, TemplateRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
import { IHabitacionResults } from '../../../../../models/IHabitacionResults';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.sass']
})


export class PagoComponent implements OnInit {

  @Output() outNumTarjeta = new EventEmitter<string>();
  @Output() outNomTarjeta = new EventEmitter<string>();
  @Output() outVencimiento = new EventEmitter<string>();
  @Output() outCodSeguridad = new EventEmitter<string>();
  @Output() outTitular = new EventEmitter<string>();

  
  isCollapsed = false;
  reserva : any;
  habitacion : IHabitacionResults;
  lhotel;
  isOpen = false;
  numTarjeta: string;
  fechVencimiento: string;
  codSeguridad: string;
  titular: string;
  nombreTarjeta: string;
  modalRef: BsModalRef;
  tipoTarjeta: number;
  slash: number;
  model: any = {};
  currency: string;
  opentarjeta = false;
  ss_tarjeta: any;

  tarj: any;

  constructor(private sessionStorageService: SessionStorageService,private modalService: BsModalService) {
    this.tipoTarjeta = 0;
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
    this.sessionStorageService.store("ss_tarjeta",this.opentarjeta);
    this.opentarjeta = this.sessionStorageService.retrieve("ss_tarjeta");
   }

  



  ngOnInit() {
    this.reserva = this.sessionStorageService.retrieve("confirmacion");
    this.habitacion = this.sessionStorageService.retrieve("lstHabication");
  }

  openModal1(template: TemplateRef<any>, template2: TemplateRef<any>) {
    if (this.lhotel.lpolicies.length === 0) {
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

  validarTarjeta() {
    const numTarjeta = this.numTarjeta;
    
    if (numTarjeta.substring(0,1) == "4") {
      this.tipoTarjeta = 4;
      this.nombreTarjeta = "VI";
    }
    else if (numTarjeta.substring(0,2) == "51" || numTarjeta.substring(0,2) == "52" || numTarjeta.substring(0,2) == "53" || numTarjeta.substring(0,2) == "54" || numTarjeta.substring(0,2) == "55") {
      this.tipoTarjeta = 1;
      this.nombreTarjeta = "MC";
    }
    else if (numTarjeta.substring(0,2) == "60" || numTarjeta.substring(0,2) == "64" || numTarjeta.substring(0,2) == "65") {
      this.tipoTarjeta = 2;
      this.nombreTarjeta = "DS";
    }
    else if (numTarjeta.substring(0,2) == "34" || numTarjeta.substring(0,2) == "37") {
      this.tipoTarjeta = 3;
      this.nombreTarjeta = "AX";
    }
    else if(numTarjeta.substring(0,2) == "36" || numTarjeta.substring(0,2) == "38" || numTarjeta.substring(0,3) == "300" || numTarjeta.substring(0,3) == "301" || numTarjeta.substring(0,3) == "302" || numTarjeta.substring(0,3) == "303" || numTarjeta.substring(0,3) == "304" || numTarjeta.substring(0,3) == "305"){
      this.tipoTarjeta = 6;
      this.nombreTarjeta = "DC";
    }
    else if (numTarjeta.substring(0,4) == "2131" || numTarjeta.substring(0,4) == "1800" || numTarjeta.substring(0,2) == "35") {
      this.tipoTarjeta = 5;
      this.nombreTarjeta = "JC";
    }
    else if(numTarjeta == ""){
      this.tipoTarjeta = 0;
    }
    this.outNumTarjeta.emit(this.numTarjeta);
    this.outNomTarjeta.emit(this.nombreTarjeta);
  }

  validarLetras(e){
    var tecla = (document.all) ? e.keyCode : e.which;
     if (tecla == 8) return true;
      var patron = /^([a-zA-Z ])*$/;
       var teclaFinal = String.fromCharCode(tecla);
        return patron.test(teclaFinal);
  };

  tarjeta(){
    let numTarjeta = this.numTarjeta;
    
    if (numTarjeta.length == 4) {
      numTarjeta += ' ' ;
      this.numTarjeta = numTarjeta;
    }
    else if (numTarjeta.length == 9) {
      numTarjeta += ' ' ;
      this.numTarjeta = numTarjeta;
    }
    else if (numTarjeta.length == 14) {
      numTarjeta += ' ' ;
      this.numTarjeta = numTarjeta;
    }
    this.outNumTarjeta.emit(this.numTarjeta)
  }

  validarVencimiento() {
    let fechVencimiento = this.fechVencimiento;
  
    if (fechVencimiento.length == 2) {
      fechVencimiento += '' ;
      this.fechVencimiento = fechVencimiento;
    }
    this.outVencimiento.emit(this.fechVencimiento);
  }

  validarCodSeguridad() {
    let codSeguridad = this.codSeguridad;
   
    if (codSeguridad.length == 3) {
      codSeguridad += '' ;
      this.codSeguridad = codSeguridad;
    }
    this.outCodSeguridad.emit(this.codSeguridad)
  }

  validarNombre() {
    let titular = this.titular;
    
    if (titular.length == 3) {
      titular += '' ;
      this.titular = titular;
    }
    this.outTitular.emit(this.titular)
  }
  ValidarCampos() {
    let val = true;
     
      if ($.trim(this.numTarjeta) === '' || $.trim(this.numTarjeta) === undefined) {
        $("#numeroTarjeta").addClass("campo-invalido");
        this.isOpen = true;
        val = false;
      } else {
        this.isOpen = false;
        $("#numeroTarjeta").removeClass("campo-invalido");
      }
      if ($.trim(this.fechVencimiento) === '' || $.trim(this.fechVencimiento) === undefined) {
        $("#fechaVencimiento").addClass("campo-invalido");
        val = false;
      } else {
        $("#fechaVencimiento").removeClass("campo-invalido");
      }
      if ($.trim(this.codSeguridad) === '' || $.trim(this.codSeguridad) === undefined) {
        $("#codSeguridad").addClass("campo-invalido");
        val = false;
      } else {
        $("#codSeguridad").removeClass("campo-invalido");
      }
      if ($.trim(this.titular) === '' || $.trim(this.titular) === undefined) {
        $("#titularTarjeta").addClass("campo-invalido");
        val = false;
      } else {
        $("#titularTarjeta").removeClass("campo-invalido");
      }
      
        
    return val;
  }

  
  

  validarNumeros(e){
     var tecla = (document.all) ? e.keyCode : e.which;
      if (tecla == 8) return true;
       var patron = /^([0-9])*$/;
        var teclaFinal = String.fromCharCode(tecla);
         return patron.test(teclaFinal);
  };

  

  


}
