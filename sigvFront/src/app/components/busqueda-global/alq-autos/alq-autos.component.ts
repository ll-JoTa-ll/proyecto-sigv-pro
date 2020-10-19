import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SessionStorageService, LocalStorageService } from "ngx-webstorage";
import { DatepickerDateCustomClasses } from "ngx-bootstrap/datepicker/models";
import { CarsService } from "src/app/services/cars.service";
import { getLocaleWeekEndRange } from "@angular/common";

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
  origenAuto: string;
  origentTexto: string;
  isOpen = false;
  airportlist: any[] = [];
  citylist: any[] = [];
  lstAutocomplete: any[] = [];
  destinoAuto: string;
  destinoTexto: string;
  valdestino = false;
  isOpendate = false;
  valfechasalida = false;
  valfechadestino = false;
  dateCustomClasses: DatepickerDateCustomClasses[];
  calendarSalidaValue: Date;
  fechaSalida: string;
  fechaRetorno: string;
  fechaSalidaShow: string;
  fechaRetornoShow: string;
  minDateSalida: Date;
  minDateRetorno: Date;
  maxDateIngreso: Date;
  bsValue: Date;
  carsSearch;
  origenCountryCode;
  destinoCountryCode;
  flagOtroDestino: boolean = false;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private carsService: CarsService
  ) {
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

    this.minDateSalida = new Date();
    this.minDateSalida.setDate(this.minDateSalida.getDate());
    this.minDateRetorno = new Date();
    this.minDateRetorno.setDate(this.minDateRetorno.getDate() + 1);
    this.model.timeIni = "12:00";
    this.model.timeFin = "12:00";
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

    this.airportlist = this.localStorageService.retrieve("ls_airportlist");
    this.citylist = this.localStorageService.retrieve("ls_citylist");
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

    $("#div-recojo").addClass("div-ancho-total");
  }

  selectEvent(item) {
    console.log("selectEvent");
    console.log("item: " + JSON.stringify(item));

    this.origenAuto = item.iataCode;
    this.origentTexto = item.name;
    this.origenCountryCode = item.countryCode;
    this.isOpen = false;
    $("#txtOrigen").removeClass("campo-invalido");
    $(".x").hide();
  }

  onChangeSearch(val: string) {
    this.airportlist = this.localStorageService.retrieve("ls_airportlist");
    this.citylist = this.localStorageService.retrieve("ls_citylist");

    this.lstAutocomplete = [];
    const lstAutocomplete = this.lstAutocomplete;
    this.airportlist.forEach(function (aeropuerto) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        name: aeropuerto.name,
        searchName: aeropuerto.searchName,
        priority: aeropuerto.priority,
        categoryId: 1,
        categoryName: "Aeropuerto",
        countryCode: aeropuerto.countryCode,
      };
      lstAutocomplete.push(obj1);
    });
    this.citylist.forEach(function (ciudad) {
      const obj1 = {
        iataCode: ciudad.iataCode,
        name: ciudad.name,
        searchName: ciudad.searchName,
        priority: ciudad.priority,
        categoryId: 2,
        categoryName: "Ciudad",
        countryCode: ciudad.countryCode,
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter(
        (word) => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0
      );
      this.data = resultFilter;

      $(".x").hide();
    }
  }

  onFocused(e) {}

  selectEvent2(item) {
    this.destinoAuto = item.iataCode;
    this.destinoTexto = item.name;
    this.destinoCountryCode = item.countryCode;
    this.valdestino = false;
    $("#txtDestino").removeClass("campo-invalido");
    $(".x").hide();
    if (this.model.origentTexto.length < 5) {
      this.model.origentTexto = "";
    }
  }

  onChangeSearch2(val: string) {
    this.airportlist = this.localStorageService.retrieve("ls_airportlist");
    this.citylist = this.localStorageService.retrieve("ls_citylist");

    this.lstAutocomplete = [];
    const lstAutocomplete = this.lstAutocomplete;
    this.airportlist.forEach(function (aeropuerto) {
      const obj1 = {
        iataCode: aeropuerto.iataCode,
        name: aeropuerto.name,
        searchName: aeropuerto.searchName,
        priority: aeropuerto.priority,
        categoryId: 1,
        categoryName: "Aeropuerto",
        countryCode: aeropuerto.countryCode,
      };
      lstAutocomplete.push(obj1);
    });
    this.citylist.forEach(function (ciudad) {
      const obj1 = {
        iataCode: ciudad.iataCode,
        name: ciudad.name,
        searchName: ciudad.searchName,
        priority: ciudad.priority,
        categoryId: 2,
        categoryName: "Ciudad",
        countryCode: ciudad.countryCode,
      };
      lstAutocomplete.push(obj1);
    });
    lstAutocomplete.sort((a, b) => b.priority - a.priority);
    this.lstAutocomplete = lstAutocomplete;

    $(".x").hide();
    if (val.length >= 3) {
      const resultFilter = this.lstAutocomplete.filter(
        (word) => word.searchName.toLowerCase().search(val.toLowerCase()) >= 0
      );
      this.data2 = resultFilter;

      $(".x").hide();
    }
  }

  onFocused2(e) {}

  handlerSalida(datepickerSalida) {
    this.isOpendate = true;
  }

  onValueChangeSalida(value: Date, dateretorno: any): void {
    this.valfechasalida = false;
    $("#txtFechaSalida").removeClass("campo-invalido");
    this.minDateRetorno = value;
    this.dateCustomClasses = [
      { date: this.minDateRetorno, classes: ["bg-danger", "text-warning"] },
    ];
    //console.log("dpSalida: " + this.dpSalida);

    if (value != null) {
      let mes = "";
      let getMonth = value.getMonth() + 1;
      if (getMonth < 10) {
        getMonth = value.getMonth() + 1;
        mes = "0" + getMonth;
      } else {
        mes = "" + getMonth;
      }

      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }

      if (value >= this.calendarSalidaValue) {
        $("#fechadestino").val("");
        this.fechaRetorno = "";
      }
      this.fechaSalida = value.getFullYear() + "-" + mes + "-" + dia;
      this.fechaSalidaShow = dia + "/" + mes + "/" + value.getFullYear();
    }
  }

  onValueChangeRetorno(value: Date): void {
    if (value != null) {
      this.valfechadestino = false;
      this.calendarSalidaValue = value;
      this.dateCustomClasses = [
        { date: null, classes: ["bg-danger", "text-warning"] },
      ];
      $("#txtFechaDestino").removeClass("campo-invalido");
      let mes = "";
      let getMonth = value.getMonth() + 1;
      if (getMonth < 10) {
        getMonth = value.getMonth() + 1;
        mes = "0" + getMonth;
      } else {
        mes = "" + getMonth;
      }

      let dia = "";
      if (value.getDate() < 10) {
        dia = "0" + value.getDate();
      } else {
        dia = "" + value.getDate();
      }

      this.fechaRetorno = value.getFullYear() + "-" + mes + "-" + dia;
      this.fechaRetornoShow = dia + "/" + mes + "/" + value.getFullYear();
    }
  }

  seleccionarOtroDestino() {
    console.log("seleccionarOtroDestino");
    console.log(this.flagOtroDestino);
    if (this.flagOtroDestino === false) {
      $("#div-recojo").removeClass("div-w-100");
      $("#div-recojo").addClass("div-w-50");
    } else {
      $("#div-recojo").removeClass("div-w-50");
      $("#div-recojo").addClass("div-w-100");
    }
  }

  searchAutos() {
    this.spinner.show();
    //"2020-11-02T12:00:00.000"
    //"2020-11-07T12:00:00.000"
    let dropOffIataCode = this.destinoAuto;
    if (this.flagOtroDestino === false) {
      dropOffIataCode = "";
      this.destinoAuto = "";
      this.destinoCountryCode = "";
      this.destinoTexto = "";
    }
    const fechaIni = this.fechaSalida + "T" + this.model.timeIni + ":00.000";
    const fechaFin = this.fechaRetorno + "T" + this.model.timeFin + ":00.000";
    let data = {
      PickUpIataCode: this.origenAuto,
      CountryIataCode: this.origenCountryCode,
      DropOffIataCode: dropOffIataCode,
      PickUpDate: fechaIni,
      DropOffDate: fechaFin,
      PromotionalCode: "",
      PaymentType: "",
      Language: "es",
    };

    console.log("data: " + JSON.stringify(data));

    let requestCars = {
      origenAuto: this.origenAuto,
      origenCountryCode: this.origenCountryCode,
      origentTexto: this.origentTexto,
      destinoAuto: this.destinoAuto,
      destinoCountryCode: this.destinoCountryCode,
      destinoTexto: this.destinoTexto,
      fechaSalida: this.fechaSalida,
      fechaSalidaShow: this.fechaSalidaShow,
      fechaRetorno: this.fechaRetorno,
      fechaRetornoShow: this.fechaRetornoShow,
      timeIni: this.model.timeIni,
      timeFin: this.model.timeFin,
      flagOtroDestino: this.flagOtroDestino,
    };

    this.carsService.getCars(data).subscribe(
      (result) => {
        console.log(JSON.stringify(result));
        console.log("result");
        console.log(JSON.stringify(result));
        this.carsSearch = result;
      },
      (err) => {
        console.log("err");
        console.log(JSON.stringify(err));
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        if (this.carsSearch.lcategories.length > 0) {
          this.sessionStorageService.store("ss_carsSearch", this.carsSearch);
          this.sessionStorageService.store("ss_requestCars", requestCars);
          this.router.navigate(["/auto-search"]);
        }
      }
    );
  }
}
