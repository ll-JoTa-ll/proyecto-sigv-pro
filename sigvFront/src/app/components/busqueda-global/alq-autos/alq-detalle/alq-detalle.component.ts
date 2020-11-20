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
  idRadioBtn: string = "idRadioBtn";
  idDivCabecera = "idDivCabecera";
  idDivRatePrice1 = "idDivRatePrice1";
  idDivRatePrice2 = "idDivRatePrice2";
  idSpanRatePrice1 = "idSpanRatePrice1";
  idSpanRatePrice2 = "idSpanRatePrice2";
  selCarRateIdDeschecar;
  indexDeschecar;
  infoAuto1;
  infoAuto2;
  ratePriceSel;
  extraRatesSel;
  listAditionals: any[] = [];

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

    const laditionals = this.carSelect.laditionals;
    if (laditionals != null) {
      this.listAditionals = laditionals;
    }

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

    const selCarRateId = this.carSelect.oinformation.ocarInfo.rateId;

    const lstExtraRates = this.lstExtraRates;
    const idRadioBtn = this.idRadioBtn;
    const idDivCabecera = this.idDivCabecera;
    const idDivRatePrice1 = this.idDivRatePrice1;
    const idDivRatePrice2 = this.idDivRatePrice2;
    const idSpanRatePrice1 = this.idSpanRatePrice1;
    const idSpanRatePrice2 = this.idSpanRatePrice2;

    let selCarRateIdDeschecar = 0;
    let indexDeschecar = 0;
    let infoAuto1 = "";
    let infoAuto2 = "";

    lstExtraRates.forEach(function (item, index) {
      if (selCarRateId == item.rateId) {
        if (index === 0) {
          const idRadioSelPrice =
            "#" + idRadioBtn + "_" + selCarRateId + "_" + index;
          console.log(idRadioSelPrice);
          console.log(idRadioSelPrice);
          console.log(idRadioSelPrice);
          console.log(idRadioSelPrice);
          console.log(idRadioSelPrice);

          $("#" + idRadioBtn + "_" + selCarRateId + "_" + index).prop(
            "checked",
            true
          );

          $("#" + idDivCabecera + "_" + selCarRateId).addClass(
            "div-sel-radio-1"
          );

          $("#" + idDivRatePrice1 + "_" + selCarRateId + "_" + index).addClass(
            "div-sel-radio-1"
          );

          $("#" + idDivRatePrice2 + "_" + selCarRateId + "_" + index).addClass(
            "div-sel-radio-1"
          );

          $("#" + idSpanRatePrice1 + "_" + selCarRateId + "_" + index).addClass(
            "div-sel-radio-1"
          );

          $("#" + idSpanRatePrice2 + "_" + selCarRateId + "_" + index).addClass(
            "div-sel-radio-1"
          );

          selCarRateIdDeschecar = parseInt(selCarRateId);
          indexDeschecar = index;
          infoAuto2 = item.name;
          infoAuto1 = item.lratePrice[0].paymentType;
        }
      }
    });

    this.selCarRateIdDeschecar = selCarRateIdDeschecar;
    this.indexDeschecar = indexDeschecar;
    this.infoAuto1 = infoAuto1;
    this.infoAuto2 = infoAuto2;
  }

  selectRadioBtnRatePrice(valor, ratePrice, extraRates) {
    const idRadioBtn = this.idRadioBtn;
    const idDivCabecera = this.idDivCabecera;
    const idDivRatePrice1 = this.idDivRatePrice1;
    const idDivRatePrice2 = this.idDivRatePrice2;
    const idSpanRatePrice1 = this.idSpanRatePrice1;
    const idSpanRatePrice2 = this.idSpanRatePrice2;

    //DESPINTAR ANTERIOR RADIO
    const selCarRateIdDeschecar = this.selCarRateIdDeschecar;
    const indexDeschecar = this.indexDeschecar;
    $(
      "#" + idRadioBtn + "_" + selCarRateIdDeschecar + "_" + indexDeschecar
    ).prop("checked", false);

    $("#" + idDivCabecera + "_" + selCarRateIdDeschecar).removeClass(
      "div-sel-radio-1"
    );

    $(
      "#" + idDivRatePrice1 + "_" + selCarRateIdDeschecar + "_" + indexDeschecar
    ).removeClass("div-sel-radio-1");

    $(
      "#" + idDivRatePrice2 + "_" + selCarRateIdDeschecar + "_" + indexDeschecar
    ).removeClass("div-sel-radio-1");

    $(
      "#" +
        idSpanRatePrice1 +
        "_" +
        selCarRateIdDeschecar +
        "_" +
        indexDeschecar
    ).removeClass("div-sel-radio-1");

    $(
      "#" +
        idSpanRatePrice2 +
        "_" +
        selCarRateIdDeschecar +
        "_" +
        indexDeschecar
    ).removeClass("div-sel-radio-1");

    //PINTAR NUEVO RADIO
    const selCarRateId = valor.split("_")[1];
    const index = valor.split("_")[2];

    $("#" + idRadioBtn + "_" + selCarRateId + "_" + index).prop(
      "checked",
      true
    );

    $("#" + idDivCabecera + "_" + selCarRateId).addClass("div-sel-radio-1");

    $("#" + idDivRatePrice1 + "_" + selCarRateId + "_" + index).addClass(
      "div-sel-radio-1"
    );

    $("#" + idDivRatePrice2 + "_" + selCarRateId + "_" + index).addClass(
      "div-sel-radio-1"
    );

    $("#" + idSpanRatePrice1 + "_" + selCarRateId + "_" + index).addClass(
      "div-sel-radio-1"
    );

    $("#" + idSpanRatePrice2 + "_" + selCarRateId + "_" + index).addClass(
      "div-sel-radio-1"
    );

    //NUEVOS VALORES A DESPINTAR
    this.selCarRateIdDeschecar = parseInt(selCarRateId);
    this.indexDeschecar = parseInt(index);
    this.infoAuto2 = extraRates.name;
    this.infoAuto1 = ratePrice.paymentType;
    this.amount = ratePrice.baseAmount;
    this.extraRatesSel = extraRates;
    this.ratePriceSel = ratePrice;
  }

  sideScroll(element, direction, speed, distance, step) {
    var scrollAmount = 0;
    var slideTimer = window.setInterval(function () {
      if (direction == "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        window.clearInterval(slideTimer);
      }
    }, speed);
  }

  moverIzq(id_container) {
    console.log("id_container: " + id_container);

    const container = document.getElementById(id_container);
    this.sideScroll(container, "left", 5, 200, 10);
  }

  moverDer(id_container) {
    console.log("id_container: " + id_container);

    const container = document.getElementById(id_container);
    this.sideScroll(container, "right", 5, 200, 10);
  }

  checkAditional(item) {}

  reservarAuto() {}
}
