import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SessionStorageService, LocalStorageService } from "ngx-webstorage";
import { DatepickerDateCustomClasses } from "ngx-bootstrap/datepicker/models";
import { CarsService } from "src/app/services/cars.service";
import * as moment from "moment";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-alq-search",
  templateUrl: "./alq-search.component.html",
  styleUrls: ["./alq-search.component.sass"],
})
export class AlqSearchComponent implements OnInit, AfterViewInit {
  carsSearch;
  flagCars: boolean = false;
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
  origenCountryCode;
  destinoCountryCode;
  flagOtroDestino: boolean;
  carsSearchRequest;
  cabeceraOrigen;
  cabeceraOrigenMes;
  cabeceraOrigenFecha;
  cabeceraOrigenHora;
  cabeceraDestino;
  cabeceraDestinoMes;
  cabeceraDestinoFecha;
  cabeceraDestinoHora;
  cantDiasAlquiler: number = 0;

  selCategoriaDescription: string;
  checkedAutomatico: boolean = false;
  checkedPasajeros4: boolean = false;

  flagResult: boolean;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private carsService: CarsService
  ) {
    console.log("constructor AlqSearchComponent");
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

    this.carsSearch = this.sessionStorageService.retrieve("ss_carsSearch");
    this.flagResult = true;
    this.carsSearchRequest = this.sessionStorageService.retrieve(
      "ss_requestCars"
    );
    this.selCategoriaDescription = "";
  }

  ngOnInit() {
    console.log("ngOnInit AlqSearchComponent");
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
    console.log("ngAfterViewInit AlqSearchComponent");
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

    console.log("this.carsSearchRequest");
    console.log(JSON.stringify(this.carsSearchRequest));

    this.flagCars = true;

    this.setValores();
  }

  setValores() {
    this.origenAuto = this.carsSearchRequest.origenAuto;
    this.origenCountryCode = this.carsSearchRequest.origenCountryCode;
    this.origentTexto = this.carsSearchRequest.origentTexto;
    this.model.origentTexto = this.carsSearchRequest.origentTexto;

    this.destinoAuto = this.carsSearchRequest.destinoAuto;
    this.destinoCountryCode = this.carsSearchRequest.destinoCountryCode;
    this.destinoTexto = this.carsSearchRequest.destinoTexto;
    this.model.destinoTexto = this.carsSearchRequest.destinoTexto;

    this.fechaSalida = this.carsSearchRequest.fechaSalida;
    this.fechaSalidaShow = this.carsSearchRequest.fechaSalidaShow;
    $("#fechasalida").val(this.carsSearchRequest.fechaSalidaShow);
    this.model.fechasalida = this.carsSearchRequest.fechaSalidaShow;

    this.fechaRetorno = this.carsSearchRequest.fechaRetorno;
    this.fechaRetornoShow = this.carsSearchRequest.fechaRetornoShow;
    console.log("this.carsSearchRequest.fechaRetornoShow");
    console.log(this.carsSearchRequest.fechaRetornoShow);

    $("#fechadestino").val(this.carsSearchRequest.fechaRetornoShow);
    this.model.fechadestino = this.carsSearchRequest.fechaRetornoShow;

    this.model.timeIni = this.carsSearchRequest.timeIni;
    this.model.timeFin = this.carsSearchRequest.timeFin;

    this.flagOtroDestino = this.carsSearchRequest.flagOtroDestino;

    this.cabeceraOrigen = this.origentTexto;
    this.cabeceraOrigenMes = this.obtenerMesTexto(this.fechaSalidaShow);
    this.cabeceraOrigenFecha =
      this.obtenerdiaTexto(this.fechaSalida) +
      " " +
      this.fechaSalidaShow.split("/")[0];
    this.cabeceraOrigenHora = "/ " + this.model.timeIni;

    if (this.flagOtroDestino === true) {
      this.cabeceraDestino = this.destinoTexto;
    } else {
      this.cabeceraDestino = this.origentTexto;
    }
    this.cabeceraDestinoMes = this.obtenerMesTexto(this.fechaRetornoShow);
    this.cabeceraDestinoFecha =
      this.obtenerdiaTexto(this.fechaRetorno) +
      " " +
      this.fechaRetornoShow.split("/")[0];
    this.cabeceraDestinoHora = "/ " + this.model.timeFin;

    const fecha1_split = this.fechaSalidaShow.split("/");
    const fecha1 = moment(
      fecha1_split[2] + "-" + fecha1_split[1] + "-" + fecha1_split[0]
    );
    const fecha2_split = this.fechaRetornoShow.split("/");
    const fecha2 = moment(
      fecha2_split[2] + "-" + fecha2_split[1] + "-" + fecha2_split[0]
    );
    this.cantDiasAlquiler = fecha2.diff(fecha1, "days");
  }

  obtenerMesTexto(fecha) {
    const intMes = fecha.split("/")[1];
    let strMes = "";
    switch (intMes) {
      case "01":
        strMes = "Enero";
        break;
      case "02":
        strMes = "Febrero";
        break;
      case "03":
        strMes = "Marzo";
        break;
      case "04":
        strMes = "Abril";
        break;
      case "05":
        strMes = "Mayo";
        break;
      case "06":
        strMes = "Junio";
        break;
      case "07":
        strMes = "Julio";
        break;
      case "08":
        strMes = "Agosto";
        break;
      case "09":
        strMes = "Septiembre";
        break;
      case "10":
        strMes = "Octubre";
        break;
      case "11":
        strMes = "Noviembre";
        break;
      case "12":
        strMes = "Diciembre";
        break;
    }
    return strMes;
  }

  obtenerdiaTexto(fechaComoCadena) {
    //const fechaComoCadena = "2020-03-09 23:37:22";
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ];
    const numeroDia = new Date(fechaComoCadena).getDay();
    const nombreDia = dias[numeroDia];
    return nombreDia;
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

    this.carsSearch = [];

    this.carsService.getCars(data).subscribe(
      (result) => {
        console.log(JSON.stringify(result));
        this.carsSearch = result;
      },
      (err) => {
        this.spinner.hide();
        this.flagResult = false;
      },
      () => {
        this.selCategoriaDescription = "";
        this.spinner.hide();
        console.log(
          "this.carsSearch.lcategories.length: " +
            this.carsSearch.lcategories.length
        );
        console.log(
          "this.carsSearch.lcategories.length: " +
            this.carsSearch.lcategories.length
        );
        console.log(
          "this.carsSearch.lcategories.length: " +
            this.carsSearch.lcategories.length
        );
        console.log(
          "this.carsSearch.lcategories.length: " +
            this.carsSearch.lcategories.length
        );

        if (this.carsSearch.lcategories.length > 0) {
          this.flagResult = true;
          this.sessionStorageService.store("ss_carsSearch", this.carsSearch);
          this.sessionStorageService.store("ss_requestCars", requestCars);
          this.carsSearchRequest = this.sessionStorageService.retrieve(
            "ss_requestCars"
          );
          //this.router.navigate(["/auto-search"]);
          this.setValores();
        } else {
          this.flagResult = false;
        }
      }
    );
  }

  seleccionarCategoria(description) {
    console.log("seleccionarCategoria");
    console.log(description);
    this.selCategoriaDescription = description;
    let carsSearch = this.carsSearch;
    carsSearch.lcategories.forEach(function (item) {
      if (item.description === description) {
        item.visible = true;
      } else {
        item.visible = false;
      }
    });

    this.carsSearch = carsSearch;
  }

  mostrarTodasCategorias() {
    $(".radioCat").prop("checked", false);
    this.selCategoriaDescription = "";
    let carsSearch = this.carsSearch;
    carsSearch.lcategories.forEach(function (item) {
      item.visible = true;
    });

    this.carsSearch = carsSearch;
  }

  seleccionarTipoCaja(valor) {
    console.log("seleccionarTipoCaja");
    console.log("this.checkedAutomatico: " + this.checkedAutomatico);
    const checkedAutomatico = this.checkedAutomatico;
    const checkedPasajeros4 = this.checkedPasajeros4;
    const selCategoriaDescription = this.selCategoriaDescription;
    let carsSearch = this.carsSearch;

    carsSearch.lcategories.forEach(function (item) {
      item.lrecommendations.forEach(function (recomendacion) {
        recomendacion.visible = false;
      });
      item.visible = false;
    });

    //Busqueda de categorias
    carsSearch.lcategories.forEach(function (item) {
      if (selCategoriaDescription === "") {
        item.visible = true;
      } else {
        if (item.description === selCategoriaDescription) {
          item.visible = true;
        }
      }
    });
    //this.carsSearch = carsSearch;

    //Busqueda de automaticos y >4 pasajeros
    carsSearch.lcategories.forEach(function (item) {
      item.lrecommendations.forEach(function (recomendacion) {
        //checkedAutomatico es como si fuera TRUE
        if (checkedAutomatico === false && checkedPasajeros4 == false) {
          if (recomendacion.type === "Automático") {
            recomendacion.visible = true;
          }
        }

        //checkedAutomatico es como si fuera TRUE
        if (checkedAutomatico === false && checkedPasajeros4 == true) {
          if (
            recomendacion.type === "Automático" &&
            recomendacion.numberPassengers > 4
          ) {
            recomendacion.visible = true;
          }
        }

        //checkedAutomatico es como si fuera FALSE, se muestra todo
        if (checkedAutomatico === true && checkedPasajeros4 == false) {
          recomendacion.visible = true;
        }

        //checkedAutomatico es como si fuera FALSE
        if (checkedAutomatico === true && checkedPasajeros4 == true) {
          if (recomendacion.numberPassengers > 4) {
            recomendacion.visible = true;
          }
        }
      });
      //item.visible = true;
    });

    this.carsSearch = carsSearch;
  }

  seleccionarMasPasajeros(valor) {
    console.log("seleccionarMasPasajeros");
    console.log("this.checkedPasajeros4: " + this.checkedPasajeros4);
    const checkedAutomatico = this.checkedAutomatico;
    const checkedPasajeros4 = this.checkedPasajeros4;
    const selCategoriaDescription = this.selCategoriaDescription;
    let carsSearch = this.carsSearch;

    carsSearch.lcategories.forEach(function (item) {
      item.lrecommendations.forEach(function (recomendacion) {
        recomendacion.visible = false;
      });
      item.visible = false;
    });

    //Busqueda de categorias
    carsSearch.lcategories.forEach(function (item) {
      if (selCategoriaDescription === "") {
        item.visible = true;
      } else {
        if (item.description === selCategoriaDescription) {
          item.visible = true;
        }
      }
    });

    //Busqueda de automaticos y >4 pasajeros
    carsSearch.lcategories.forEach(function (item) {
      item.lrecommendations.forEach(function (recomendacion) {
        //checkedPasajeros4 es como si fuera TRUE
        if (checkedAutomatico === false && checkedPasajeros4 == false) {
          if (recomendacion.numberPassengers > 4) {
            recomendacion.visible = true;
          }
        }

        //checkedPasajeros4 es como si fuera FALSE, se muestra todo
        if (checkedAutomatico === false && checkedPasajeros4 == true) {
          recomendacion.visible = true;
        }

        //checkedPasajeros4 es como si fuera TRUE
        if (checkedAutomatico === true && checkedPasajeros4 == false) {
          if (
            recomendacion.type === "Automático" &&
            recomendacion.numberPassengers > 4
          ) {
            recomendacion.visible = true;
          }
        }

        //checkedPasajeros4 es como si fuera FALSE
        if (checkedAutomatico === true && checkedPasajeros4 == true) {
          if (recomendacion.type === "Automático") {
            recomendacion.visible = true;
          }
        }
      });
      //item.visible = true;
    });

    this.carsSearch = carsSearch;
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

  verDetalle() {
    this.router.navigate(["/auto-detalle"]);
  }
}
