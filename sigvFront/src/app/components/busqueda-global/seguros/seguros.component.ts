import { Component, OnInit, AfterViewInit } from "@angular/core";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-seguros",
  templateUrl: "./seguros.component.html",
  styleUrls: ["./seguros.component.sass"],
})
export class SegurosComponent implements OnInit, AfterViewInit {
  constructor() {
    console.log("constructor seguros");
    $("#menu-vuelo-1").show();
    $("#menu-vuelo-2").hide();
    $("#menu-autos-1").show();
    $("#menu-autos-2").hide();
    $("#menu-hotel-1").show();
    $("#menu-hotel-2").hide();
    $("#menu-bus-1").show();
    $("#menu-bus-2").hide();
    $("#menu-paquete-1").show();
    $("#menu-paquete-2").hide();
    $("#menu-seguro-1").hide();
    $("#menu-seguro-2").show();
  }

  ngOnInit() {
    console.log("ngOnInit seguros");
    $("#menu-vuelo-1").show();
    $("#menu-vuelo-2").hide();
    $("#menu-autos-1").show();
    $("#menu-autos-2").hide();
    $("#menu-hotel-1").show();
    $("#menu-hotel-2").hide();
    $("#menu-bus-1").show();
    $("#menu-bus-2").hide();
    $("#menu-paquete-1").show();
    $("#menu-paquete-2").hide();
    $("#menu-seguro-1").hide();
    $("#menu-seguro-2").show();
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit seguros");
    $("#menu-vuelo-1").show();
    $("#menu-vuelo-2").hide();
    $("#menu-autos-1").show();
    $("#menu-autos-2").hide();
    $("#menu-hotel-1").show();
    $("#menu-hotel-2").hide();
    $("#menu-bus-1").show();
    $("#menu-bus-2").hide();
    $("#menu-paquete-1").show();
    $("#menu-paquete-2").hide();
    $("#menu-seguro-1").hide();
    $("#menu-seguro-2").show();
  }
}
