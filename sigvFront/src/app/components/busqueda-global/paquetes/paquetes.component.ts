import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.sass']
})
export class PaquetesComponent implements OnInit, AfterViewInit {

  constructor() {
    console.log('constructor paquetes');
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').hide();
    $('#menu-paquete-2').show();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
  }

  ngOnInit() {
    console.log('ngOnInit paquetes');
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').hide();
    $('#menu-paquete-2').show();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit paquetes');
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').hide();
    $('#menu-paquete-2').show();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();
  }

}
