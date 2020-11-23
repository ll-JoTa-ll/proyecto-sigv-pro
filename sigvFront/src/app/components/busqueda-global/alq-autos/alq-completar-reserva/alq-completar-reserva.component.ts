import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import * as moment from "moment";
import { NgxSpinnerService } from "ngx-spinner";
import { SessionStorageService } from "ngx-webstorage";
import { CarsService } from "src/app/services/cars.service";

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
  lstAditionals: any[] = [];

  constructor(
    private sessionStorageService: SessionStorageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private carsService: CarsService
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

  comppletarReserva() {
    const data = {
      Token: this.carSelect.token,
      Language: "es",
      OInformation: {
        PaymentCode: this.ratePriceSel.paymentCode,
        RateId: this.extraRatesSel.rateId,
        CompanyCode: this.carSelect.oinformation.ocarInfo.companyCode,
        SippCode: this.ratePriceSel.sippCode,
        Ccrc: this.carSelect.oinformation.ocarInfo.ccrc,
        PromotionalCode: "",
        PickUpLocation: this.carSelect.oinformation.oitineraryInfo
          .pickUpLocation,
        DropOffLocation: this.carSelect.oinformation.oitineraryInfo
          .dropOffLocation,
        PickUpDate: this.carSelect.oinformation.oitineraryInfo.pickUpDate,
        DropOffDate: this.carSelect.oinformation.oitineraryInfo.dropOffDate,
        PickUpHour: this.carSelect.oinformation.oitineraryInfo.pickUpHour,
        DropOffHour: this.carSelect.oinformation.oitineraryInfo.dropOffHour,
        PickUpAddress: this.carSelect.oinformation.oitineraryInfo.pickUpAddress,
        DropOffAddress: this.carSelect.oinformation.oitineraryInfo
          .dropOffAddress,
        Aditionals: this.lstAditionals,
        OnHold: false,
      },
      Opassenger: {
        FirstName: "Ricardo",
        LastName: "Metzger",
        Age: "25",
        Email: "r7metzger@gmail.com",
        MembershipNumber: "",
      },
      Oprice: {
        RealBase: this.ratePriceSel.realBaseAmount,
        RealTax: this.ratePriceSel.realTaxAmount,
        Total: this.ratePriceSel.totalAmount,
        Currency: this.ratePriceSel.currency,
      },
      OextraInfoFlight: {
        FlightNumber: "",
        FrequentFlyer: "",
        Carrier: "",
      },
    };
    console.log("request ConfirmationCar");
    console.log(JSON.stringify(data));

    this.spinner.show();
    this.carsService.confirmationCar(data).subscribe(
      (result: any) => {
        console.log("result ConfirmationCar");
        console.log(JSON.stringify(result));
      },
      (error) => {
        console.log("result ConfirmationCar");
        console.log(JSON.stringify(error));
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }
}
