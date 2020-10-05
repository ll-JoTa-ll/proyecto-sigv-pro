import { Component, OnInit, AfterViewInit } from "@angular/core";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-buses",
  templateUrl: "./buses.component.html",
  styleUrls: ["./buses.component.sass"],
})
export class BusesComponent implements OnInit, AfterViewInit {
  constructor() {
    console.log("constructor buses");
    $("#menu-vuelo-1").show();
    $("#menu-vuelo-2").hide();
    $("#menu-autos-1").show();
    $("#menu-autos-2").hide();
    $("#menu-hotel-1").show();
    $("#menu-hotel-2").hide();
    $("#menu-bus-1").hide();
    $("#menu-bus-2").show();
    $("#menu-paquete-1").show();
    $("#menu-paquete-2").hide();
    $("#menu-seguro-1").show();
    $("#menu-seguro-2").hide();
  }

  ngOnInit() {
    console.log("ngOnInit buses");
    $("#menu-vuelo-1").show();
    $("#menu-vuelo-2").hide();
    $("#menu-autos-1").show();
    $("#menu-autos-2").hide();
    $("#menu-hotel-1").show();
    $("#menu-hotel-2").hide();
    $("#menu-bus-1").hide();
    $("#menu-bus-2").show();
    $("#menu-paquete-1").show();
    $("#menu-paquete-2").hide();
    $("#menu-seguro-1").show();
    $("#menu-seguro-2").hide();
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit buses");
    $("#menu-vuelo-1").show();
    $("#menu-vuelo-2").hide();
    $("#menu-autos-1").show();
    $("#menu-autos-2").hide();
    $("#menu-hotel-1").show();
    $("#menu-hotel-2").hide();
    $("#menu-bus-1").hide();
    $("#menu-bus-2").show();
    $("#menu-paquete-1").show();
    $("#menu-paquete-2").hide();
    $("#menu-seguro-1").show();
    $("#menu-seguro-2").hide();
  }
}
