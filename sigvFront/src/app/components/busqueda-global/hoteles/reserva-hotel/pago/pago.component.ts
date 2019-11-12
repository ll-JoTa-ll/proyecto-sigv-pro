import { Component, OnInit, Output, EventEmitter, Directive, ElementRef, Input, HostListener } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IGetEnhancedHotel } from 'src/app/models/IGetEnhancedHotel';
import { IHabitacionResults } from '../../../../../models/IHabitacionResults';

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
  reserva : IGetEnhancedHotel;
  habitacion : IHabitacionResults;
  lhotel;

  numTarjeta: string;
  fechVencimiento: string;
  codSeguridad: string;
  titular: string;
  nombreTarjeta: string;
  
  tipoTarjeta: number;
  slash: number;

  constructor(private sessionStorageService: SessionStorageService) {
    this.tipoTarjeta = 0;
    this.lhotel = this.sessionStorageService.retrieve("lhotel");
   }

  



  ngOnInit() {
    this.reserva = this.sessionStorageService.retrieve("confirmacion");
    this.habitacion = this.sessionStorageService.retrieve("lstHabication");
    
    
  }

  validarTarjeta() {
    const numTarjeta = this.numTarjeta;
    
    if (numTarjeta.substring(0,1) == "4") {
      this.tipoTarjeta = 4;
      this.nombreTarjeta = "VI";
    }
    else if (numTarjeta.substring(0,2) == "51" || numTarjeta.substring(0,2) == "52" || numTarjeta.substring(0,2) == "53" || numTarjeta.substring(0,2) == "54" || numTarjeta.substring(0,2) == "55") {
      this.tipoTarjeta = 1;
      this.nombreTarjeta = "CA";
    }
    else if (numTarjeta.substring(0,2) == "60" || numTarjeta.substring(0,2) == "64" || numTarjeta.substring(0,2) == "65") {
      this.tipoTarjeta = 2;
      this.nombreTarjeta = "DS";
    }
    else if (numTarjeta.substring(0,2) == "34" || numTarjeta.substring(0,2) == "37") {
      this.tipoTarjeta = 3;
      this.nombreTarjeta = "AX";
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
        if ($('#numeroTarjeta').val().length <= 0) {
          val = false;
        }
        if ($('#fechaVencimiento').val().length <= 0) {
          val = false;
        }
        if ($('#codSeguridad').val().length <= 0) {
          val = false;
        }
        if ($('#cbo_tipodocumento_').val().trim() === '') {
          val = false;
        }
        if ($('#cbotratamiento_').val().trim() === '') {
          val = false;
        }
        if ($('#titularTarjeta').val().length <= 0) {
          val = false;
        }
        if ($('#txttelefono_').val().length <= 0) {
          val = false;
        }
  
    if ($('#contactocorreo').val().length <= 0) {
      val = false;
    }

    if ($('#contactotelefono').val().length <= 0) {
      val = false;
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
