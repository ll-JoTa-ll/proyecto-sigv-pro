import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { SessionStorageService, LocalStorageService } from "ngx-webstorage";
import { DatepickerDateCustomClasses } from "ngx-bootstrap/datepicker/models";
import { CarsService } from "src/app/services/cars.service";

@Component({
  selector: "app-alq-search",
  templateUrl: "./alq-search.component.html",
  styleUrls: ["./alq-search.component.sass"],
})
export class AlqSearchComponent implements OnInit, AfterViewInit {
  carsSearch;
  flagCars: boolean = false;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private router: Router
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

    this.flagCars = true;
  }
}
