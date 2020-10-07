import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SessionStorageService, LocalStorageService } from "ngx-webstorage";
import { DatepickerDateCustomClasses } from "ngx-bootstrap/datepicker/models";
import { CarsService } from "src/app/services/cars.service";

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
  }

  selectEvent(item) {
    this.origenAuto = item.iataCode;
    this.origentTexto = item.name;
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
      this.fechaSalida = value.getFullYear() + "/" + mes + "/" + dia;
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

      this.fechaRetorno = value.getFullYear() + "/" + mes + "/" + dia;
      this.fechaRetornoShow = dia + "/" + mes + "/" + value.getFullYear();
    }
  }

  searchAutos() {
    this.spinner.show();
    let data = {
      PickUpIataCode: "LIM",
      CountryIataCode: "PE",
      DropOffIataCode: "",
      PickUpDate: "2020-11-02T12:00:00.000",
      DropOffDate: "2020-11-07T12:00:00.000",
      PromotionalCode: "",
      PaymentType: "",
      Language: "es",
    };
    this.carsService.getCars(data).subscribe(
      (result) => {
        console.log(JSON.stringify(result));
        this.carsSearch = result;
      },
      (err) => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        if (this.carsSearch.lcategories.length > 0) {
          this.sessionStorageService.store("ss_carsSearch", this.carsSearch);
          this.router.navigate(["/auto-search"]);
        }
      }
    );
  }
}
