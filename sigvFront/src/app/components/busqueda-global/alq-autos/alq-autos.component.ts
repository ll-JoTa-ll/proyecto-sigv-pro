import { Component, OnInit, AfterViewInit } from "@angular/core";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-alq-autos",
  templateUrl: "./alq-autos.component.html",
  styleUrls: ["./alq-autos.component.sass"],
})
export class AlqAutosComponent implements OnInit, AfterViewInit {
  model: any = {};
  data: any[] = [];
  data2: any[] = [];
  keyword = "name";

  constructor() {
    console.log("constructor autos");
    $("#menu-vuelo-1").show();
    $("#menu-vuelo-2").hide();
    $("#menu-hotel-1").show();
    $("#menu-hotel-2").hide();
    $("#menu-bus-1").show();
    $("#menu-bus-2").hide();
    $("#menu-paquete-1").show();
    $("#menu-paquete-2").hide();
    $("#menu-seguro-1").show();
    $("#menu-seguro-2").hide();
    $("#menu-autos-1").hide();
    $("#menu-autos-2").show();
  }

  ngOnInit() {
    console.log("ngOnInit autos");
    $("#menu-vuelo-1").show();
    $("#menu-vuelo-2").hide();
    $("#menu-hotel-1").show();
    $("#menu-hotel-2").hide();
    $("#menu-bus-1").show();
    $("#menu-bus-2").hide();
    $("#menu-paquete-1").show();
    $("#menu-paquete-2").hide();
    $("#menu-seguro-1").show();
    $("#menu-seguro-2").hide();
    $("#menu-autos-1").hide();
    $("#menu-autos-2").show();
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit autos");
    $("#menu-vuelo-1").show();
    $("#menu-vuelo-2").hide();
    $("#menu-hotel-1").show();
    $("#menu-hotel-2").hide();
    $("#menu-bus-1").show();
    $("#menu-bus-2").hide();
    $("#menu-paquete-1").show();
    $("#menu-paquete-2").hide();
    $("#menu-seguro-1").show();
    $("#menu-seguro-2").hide();
    $("#menu-autos-1").hide();
    $("#menu-autos-2").show();
  }

  selectEvent(item) {}

  onChangeSearch(val: string) {}

  onFocused(e) {}

  selectEvent2(item) {}

  onChangeSearch2(val: string) {}

  onFocused2(e) {}
}
