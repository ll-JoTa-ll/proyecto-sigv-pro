import { Component, OnInit, Input } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-busqueda-mini-habitacion',
  templateUrl: './busqueda-mini-habitacion.component.html',
  styleUrls: ['./busqueda-mini-habitacion.component.sass']
})
export class BusquedaMiniHabitacionComponent implements OnInit {
  lhotel: IHotelResultsModel;
  estrellas: string;
  fechaSalida: string;
  fechaRetorno: string;
  @Input() textoestrellas: string;
  @Input() destino: string;
  @Input() fchingreso: string;
  @Input() fchsalida: string;
  @Input() habitaciones: string;
  @Input() adultos: string;
  @Input() cantidadnoches;

  constructor(private sessionStorageService: SessionStorageService) { 
    this.lhotel = this.sessionStorageService.retrieve("ls_search_hotel");
    console.log("this.lhotel.cityName " + this.lhotel.cityName);
    console.log("this.lhotel.cityName " + this.lhotel.cityName);
    console.log("this.lhotel.cityName " + this.lhotel.cityName);
    console.log("this.lhotel.cityName " + this.lhotel.cityName);
    console.log("this.lhotel.cityName " + this.lhotel.cityName);
    console.log("this.lhotel.cityName " + this.lhotel.cityName);
    console.log("this.lhotel.cityName " + this.lhotel.cityName);

  }
  
  ngOnInit() {
  }
  
  SeleccionarEstrella(codeestrella, texto) {
    this.estrellas = codeestrella;
    this.textoestrellas = texto;
  }
  
  ValidarCampos() {
    let val = true;
     
      if ($.trim(this.destino) === '' || $.trim(this.destino) === undefined) {
        $("#destinos").addClass("campo-invalido");
        val = false;
      } else {
        $("#destinos").removeClass("campo-invalido");
      }
      if ($.trim(this.fchingreso) === '' || $.trim(this.fchingreso) === undefined) {
        $("#ingreso").addClass("campo-invalido");
        val = false;
      } else {
        $("#ingreso").removeClass("campo-invalido");
      }
      if ($.trim(this.fchsalida) === '' || $.trim(this.fchsalida) === undefined) {
        $("#destino").addClass("campo-invalido");
        val = false;
      } else {
        $("#destino").removeClass("campo-invalido");
      }
      
        
    return val;
  }
  
  ObtenerDias(fecha1, fecha2) {
    //const fecha1 = this.fchingreso;
    //const fecha2 = this.fchsalida;
    const n1 = fecha1.split('-');
    const n2 = fecha2.split('-');
    let nuevafecha = new Date(parseInt(n1[2]), parseInt(n1[1]) - 1, parseInt(n1[0]));
    let nuevafecha2 = new Date(parseInt(n2[2]), parseInt(n2[1]) - 1, parseInt(n2[0]));
    //const dias = nuevafecha2.diff(nuevafecha, 'days');
    //let dias = nuevafecha2 - nuevafecha;
    
  
    const r1 = nuevafecha.getTime();
    const r2 = nuevafecha2.getTime();
  
    const r = r2 - r1;
    
    let dias = Math.floor(r / (1000 * 60 * 60 * 24));
    this.cantidadnoches = dias;
  
    this.fechaSalida = n1[2] + "-" + n1[1] + "-" + n1[0];
    this.fechaRetorno = n2[2] + "-" + n2[1] + "-" + n2[0];
  }
  
  ObtenerDias2(fecha1, fecha2) {
    //const fecha1 = this.fchingreso;
    //const fecha2 = this.fchsalida;
    const n1 = fecha1.split('-');
    const n2 = fecha2.split('-');
    let nuevafecha = new Date(parseInt(n1[0]), parseInt(n1[1]) - 1, parseInt(n1[2]));
    let nuevafecha2 = new Date(parseInt(n2[0]), parseInt(n2[1]) - 1, parseInt(n2[2]));
    //const dias = nuevafecha2.diff(nuevafecha, 'days');
    //let dias = nuevafecha2 - nuevafecha;
    
  
    const r1 = nuevafecha.getTime();
    const r2 = nuevafecha2.getTime();
  
    const r = r2 - r1;
   
    let dias = Math.floor(r / (1000 * 60 * 60 * 24));
    this.cantidadnoches = dias;
  }
  
  validarNumeros(e){
    var tecla = (document.all) ? e.keyCode : e.which;
     if (tecla == 8) return true;
      var patron = /^([0-9])*$/;
       var teclaFinal = String.fromCharCode(tecla);
        return patron.test(teclaFinal);
  };
  
  validarTodo(e){
    var tecla = (document.all) ? e.keyCode : e.which;
     if (tecla == 8) return true;
      var patron = /^([])*$/;
       var teclaFinal = String.fromCharCode(tecla);
        return patron.test(teclaFinal);
  };
  
  validarLetras(e){
    var tecla = (document.all) ? e.keyCode : e.which;
     if (tecla == 8) return true;
      var patron = /^([a-zA-Z ])*$/;
       var teclaFinal = String.fromCharCode(tecla);
        return patron.test(teclaFinal);
  };
}
