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
  listAditionalCheck: any[] = [];
  chbxAceptar: boolean;
  flagCentralizador: boolean;
  model: any = {};
  loginData;
  campoDisable: boolean = false;

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
    this.listAditionalCheck = this.sessionStorageService.retrieve(
      "ss_listAditionalCheck"
    );
    this.flagCentralizador = this.sessionStorageService.retrieve(
      "ss_flagCentralizador"
    );
    this.loginData = this.sessionStorageService.retrieve("ss_login_data");
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

    if (this.flagCentralizador === false) {
      this.campoDisable = true;
      this.model.nombre = this.loginData.userName;
      this.model.apellido = this.loginData.userLastName;
      this.model.email1 = this.loginData.email;
      this.model.email2 = this.loginData.email;
      this.model.celular = this.loginData.phoneNumber;
    }
  }

  comppletarReserva() {
    //VALIDAR CAMPOS
    let flagVal = 0;

    if ($.trim(this.model.nombre) === "") {
      flagVal++;
      $("#txtNombre").addClass("campo-invalido-vacio");
    } else {
      $("#txtNombre").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.apellido) === "") {
      flagVal++;
      $("#txtApellido").addClass("campo-invalido-vacio");
    } else {
      $("#txtApellido").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.email1) === "") {
      flagVal++;
      $("#txtEmail1").addClass("campo-invalido-vacio");
      $("#txtEmail2").addClass("campo-invalido-vacio");
    } else {
      $("#txtEmail1").removeClass("campo-invalido-vacio");
      $("#txtEmail2").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.email1) !== $.trim(this.model.email2)) {
      flagVal++;
      $("#txtEmail1").addClass("campo-invalido-vacio");
      $("#txtEmail2").addClass("campo-invalido-vacio");
    } else {
      $("#txtEmail1").removeClass("campo-invalido-vacio");
      $("#txtEmail2").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.telPais) === "") {
      flagVal++;
      $("#xxxxxxxxxx").addClass("campo-invalido-vacio");
    } else {
      $("#xxxxxxxxxx").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.celular) === "") {
      flagVal++;
      $("#txtCelular").addClass("campo-invalido-vacio");
    } else {
      $("#txtCelular").removeClass("campo-invalido-vacio");
    }

    if ($.trim(this.model.edad) === "") {
      flagVal++;
      $("#txtEdad").addClass("campo-invalido-vacio");
    } else {
      $("#txtEdad").removeClass("campo-invalido-vacio");
    }

    if (flagVal > 0) {
      return false;
    }

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
        Aditionals: this.listAditionalCheck,
        OnHold: false,
      },
      Opassenger: {
        FirstName: this.model.nombre,
        LastName: this.model.apellido,
        Age: this.model.edad,
        Email: this.model.email1,
        MembershipNumber: this.model.telPais + this.model.celular,
      },
      Oprice: {
        RealBase: this.ratePriceSel.realBaseAmount,
        RealTax: this.ratePriceSel.realTaxAmount,
        Total: this.ratePriceSel.totalAmount,
        Currency: this.ratePriceSel.currency,
      },
      OextraInfoFlight: {
        FlightNumber: this.model.numeroVuelo,
        FrequentFlyer: "",
        Carrier: "",
      },
    };
    console.log("request ConfirmationCar");
    console.log(JSON.stringify(data));

    this.spinner.show();
    let flagResult = 1;
    this.carsService.confirmationCar(data).subscribe(
      (result: any) => {
        console.log("result ConfirmationCar");
        console.log(JSON.stringify(result));
        this.sessionStorageService.store("ss_confirma_reserva_alq", result);
        if (result.ovoucher.pnr === null) {
          flagResult = 0;
        }
      },
      (error) => {
        console.log("result ConfirmationCar");
        console.log(JSON.stringify(error));
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        if (flagResult === 1) {
          this.router.navigate(["/auto-reserva-fin"]);
        } else {
          alert("Mucho tiempo");
        }
      }
    );
  }
}
