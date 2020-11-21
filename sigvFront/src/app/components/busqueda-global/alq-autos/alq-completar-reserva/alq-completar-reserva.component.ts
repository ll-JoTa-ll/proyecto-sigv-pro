import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { SessionStorageService } from "ngx-webstorage";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-alq-completar-reserva",
  templateUrl: "./alq-completar-reserva.component.html",
  styleUrls: ["./alq-completar-reserva.component.sass"],
})
export class AlqCompletarReservaComponent implements OnInit, AfterViewInit {
  carsSearch;
  carsSearchRequest;
  carRecomendacion;
  categoriaDescription;
  carSelect;
  ratePriceSel;
  extraRatesSel;

  constructor(
    private sessionStorageService: SessionStorageService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
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

    this.carSelect = this.sessionStorageService.retrieve("ss_sel_car_result");
    this.carsSearch = this.sessionStorageService.retrieve("ss_carsSearch");
    this.carsSearchRequest = this.sessionStorageService.retrieve(
      "ss_requestCars"
    );
    this.carRecomendacion = this.sessionStorageService.retrieve(
      "ss_recomendacion_alq"
    );
    this.categoriaDescription = this.sessionStorageService.retrieve(
      "ss_categoriaDescription_alq"
    );
    this.extraRatesSel = this.sessionStorageService.retrieve("ss_extraRates");
    this.ratePriceSel = this.sessionStorageService.retrieve("ss_ratePrice");
  }

  ngOnInit() {
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
}
