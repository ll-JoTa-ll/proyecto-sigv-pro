import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import { SessionStorageService } from "ngx-webstorage";
import * as moment from "moment";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-alq-detalle",
  templateUrl: "./alq-detalle.component.html",
  styleUrls: ["./alq-detalle.component.sass"],
})
export class AlqDetalleComponent implements OnInit, AfterViewInit {
  locale = "es";
  carsSearch;
  carsSearchRequest;
  carRecomendacion;
  categoriaDescription;
  model: any = {};
  origenLugar: string;
  origenFecha: string;
  origenHora: string;
  destinoLugar: string;
  destinoFecha: string;
  destinoHora: string;
  cantDiasAlquiler: number;
  currency: string;
  amount: number;
  flagTabDatos: boolean = false;
  flagTabInfo: boolean = false;
  carSelect;
  lstInclusions: any[] = [];
  lstExtraRates: any[] = [];
  lstDivParaCompletar = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];

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
    this.lstExtraRates = this.carSelect.lextraRates;
    const cantLextraRates = this.lstExtraRates.length;
    const extraRatesMax = this.lstExtraRates[cantLextraRates - 1];
    this.lstInclusions = extraRatesMax.linclusions;

    moment.locale("es");
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

    ///////////////////////////////////////////////////////////////////////////ORIGEN
    this.origenLugar =
      this.carSelect.oinformation.oitineraryInfo.pickUpAddress +
      " (" +
      this.carSelect.oinformation.oitineraryInfo.pickUpLocation +
      ")";

    const fecha1 = moment(this.carsSearchRequest.fechaSalida);
    //this.origenFecha = fecha1.format("dddd, DD MMM YYYY");
    this.origenFecha = this.carSelect.oinformation.oitineraryInfo.pickUpDateShow;

    //this.origenHora = this.carsSearchRequest.timeIni;
    this.origenHora = this.carSelect.oinformation.oitineraryInfo.pickUpHourShow;

    ///////////////////////////////////////////////////////////////////////////DESTINO
    this.destinoLugar =
      this.carSelect.oinformation.oitineraryInfo.dropOffAddress +
      " (" +
      this.carSelect.oinformation.oitineraryInfo.dropOffLocation +
      ")";

    const fecha2 = moment(this.carsSearchRequest.fechaRetorno);
    //this.destinoFecha = fecha2.format("dddd, DD MMM YYYY");
    this.destinoFecha = this.carSelect.oinformation.oitineraryInfo.dropOffDateShow;

    //this.destinoHora = this.carsSearchRequest.timeFin;
    this.destinoHora = this.carSelect.oinformation.oitineraryInfo.dropOffHourShow;

    this.cantDiasAlquiler = fecha2.diff(fecha1, "days");

    this.currency = this.carRecomendacion.oprice.currency;
    this.amount = this.carRecomendacion.oprice.amount;
  }
}
