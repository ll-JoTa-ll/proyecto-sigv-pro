import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  Output,
  EventEmitter,
  HostListener,
  ViewChild,
} from "@angular/core";
import { AirportService } from "../../../services/airport.service";
import { SessionStorageService, LocalStorageService } from "ngx-webstorage";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { VuelosComponent } from "../../busqueda-global/vuelos/vuelos.component";
import { IFlightAvailability } from "../../../models/IFlightAvailability";
import { fromEvent } from "rxjs";
import { ModalErrorServiceComponent } from "../../shared/modal-error-service/modal-error-service.component";
import { RecomendacionHotelComponent } from "../../busqueda-global/vuelos/recomendacion-hotel/recomendacion-hotel.component";
import { MatStepper } from "@angular/material/stepper";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { IGetApprovers } from "src/app/models/IGetApprovers.model";

declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-familias",
  templateUrl: "./familias.component.html",
  styleUrls: ["./familias.component.sass"],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class FamiliasComponent implements OnInit, AfterViewInit {
  @Input() lstFamilyResult;
  @Input() nroPersonas: number;
  @Input() currency: string;
  @Input() dataRequestFamilia;
  @Input() tipoVuelo;
  @Input() famTotalFareAmount;
  @Input() famFareAmountByPassenger;
  @Input() flagMsgErrorSelFam: boolean;
  @Input() modalRef: BsModalRef;
  @Input() lcombinations;

  @Output() flagCloseModal = new EventEmitter<boolean>();
  @Output() outIdRadioBtnFareFam = new EventEmitter<string>();
  @Output() addHotel = new EventEmitter<any>();

  //precioTotal = 0;
  //precioPersona = 0;
  modalerror: BsModalRef;
  idRadioBtnFareFam: string;
  lstSumaFam: any[] = [];
  lsFlightAvailabilty: IFlightAvailability;
  //modalRef: BsModalRef;
  flagChangeFare = 0;
  flagAutoCroselling;
  loginDataUser;
  flightHotel;
  lstFareFamily: any[] = [];
  vueloSeleccionado: any;
  ss_FlightAvailability_request2;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false,
  };

  lpolicies: any[];
  datosuser: any[] = [];
  lsapprovers: IGetApprovers[] = [];
  flightNational;
  colorsFare = [
    "white",
    "#3D5DBB",
    "#FF560D",
    "#E8A40C",
    "#FFCD0D",
    "#65E29C",
    "#71FC86",
    "#71D7FC",
    "#9BC53D",
    "#5F1A37",
    "#274C77",
    "#BE95C4",
    "#8EA604",
    "#3C1518",
    "#D90368",
    "#00CC66",
    "#4C2C69",
    "#C33C54",
  ];

  @ViewChild("stepper", { static: false }) stepper: MatStepper;

  @ViewChild("recomendacionHotel", {
    read: RecomendacionHotelComponent,
    static: false,
  })
  recomendacionHotel: RecomendacionHotelComponent;

  constructor(
    private airportService: AirportService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private vuelosComponent: VuelosComponent
  ) {
    console.log("FamiliasComponent constructor");
    //this.precioTotal = 0;
    //this.precioPersona = 0;
    //this.flagMsgErrorSelFam = false;
  }

  ngOnInit() {
    console.log("dsad" + this.lstFamilyResult);
    this.loginDataUser = this.sessionStorageService.retrieve("ss_login_data");
    this.flagAutoCroselling = this.sessionStorageService.retrieve(
      "ss_login_data"
    ).ocompany.ocompanyConfiguration.crossSellingHotel;
    if (this.flagAutoCroselling) {
      if (this.loginDataUser.orole.roleId === 3) {
        this.flagAutoCroselling = false;
      }
    }
  }

  ngAfterViewInit() {
    console.log("FamiliasComponent ngAfterViewInit");
    this.lpolicies = this.sessionStorageService.retrieve("ss_lpolicies");
    this.datosuser = this.sessionStorageService.retrieve("objusuarios");
    this.flightNational = this.sessionStorageService.retrieve(
      "ss_flightNational"
    );
    /*
    console.log('modal familia ngAfterViewInit');
    let precioTotal = 0;
    let lstSumaFam: any[] = [];
    this.precioTotal = this.famTotalFareAmount;
    this.precioPersona = this.famFareAmountByPassenger;
    console.log('this.famFareAmountByPassenger: ' + this.famFareAmountByPassenger);
    console.log('this.famTotalFareAmount: ' + this.famTotalFareAmount);
    console.log('this.precioPersona: ' + this.precioPersona);
    console.log('this.precioTotal: ' + this.precioTotal);
    */
    /*
    this.lstFamilyResult.forEach(function(fam, indexFam_) {
      fam.lfareFamilies.forEach(function(item, index) {
        if (index === 0) {
          precioTotal += item.fareFamilyPrice;
          const dataSum = {
            indexFam: indexFam_,
            indexFare: index,
            fareFamilyPrice: item.fareFamilyPrice
          };
          lstSumaFam.push(dataSum);
        }
      });
    });
    this.lstSumaFam = lstSumaFam;
    console.log('precioTotal: ' + precioTotal);
    this.precioTotal = precioTotal;
    this.precioPersona = this.precioTotal / this.nroPersonas;
    */

    //PASO 1: identificar lo seleccionado en la section 0
    console.log("//PASO 1: identificar lo seleccionado en la section 0");
    let section0_fareBasis = [];
    this.dataRequestFamilia.Lsections.forEach(function (
      sectionVal,
      indexSectionVal
    ) {
      if (indexSectionVal === 0) {
        sectionVal.Oschedule.Lsegments.forEach(function (segmentVal) {
            section0_fareBasis.push(segmentVal.FareBasis);
        });
      }
    });
    console.log("section0_fareBasis: " + JSON.stringify(section0_fareBasis));

    //PASO 2: buscar esas sections en el listado de combinaciones
    const lcombinations = this.lcombinations;
    console.log(
      "//PASO 2: buscar esas sections en el listado de combinaciones"
    );
    let lstCombinacionesSection = [];
    let flagSection0 = 0;
    lcombinations.forEach(function (combinacion, indexCombinacion) {
      const lbasisCombinations = combinacion.lfareBasisCombinations;
      flagSection0 = 0;
      lbasisCombinations.forEach(function (valor, indexValor) {
        if (valor.sectionId == 1) {
          if (valor.fareBasis == section0_fareBasis[indexValor]) {
            flagSection0++;
          }
        }
      });
      if (flagSection0 === section0_fareBasis.length) {
        lstCombinacionesSection.push(combinacion);
      }
    });

    //PASO 3: hide los cards
    console.log("PASO 3: hide los cards");
    this.lstFamilyResult.forEach(function (section, indexSection) {
      if (indexSection > 0) {
        section.lsegments.forEach(function (segment, indexSegment) {
          segment.lfareFamilies.forEach(function (fare, indexFare) {
            const fareBasisGG = fare.fareBasis;
            let idSecuencial =
              indexSection + "_" + indexSegment + "_" + (indexFare + 1);
            const cardId =
              "cardId_" +
              section.sectionId +
              "_" +
              (indexSegment + 1) +
              "_" +
              fareBasisGG;
            console.log("cardId hide: " + cardId);
            $("#" + cardId).hide();
          });
        });
      }
    });

    //PASO 4: teniendo las combinaciones q existe para el section seleccionado
    console.log(
      "//PASO 4: teniendo las combinaciones q existe para el section seleccionado"
    );
    //        vamos ocultar los radio q no existan
    lstCombinacionesSection.forEach(function (valor, valorIndex) {
      const lbasisCombinations = valor.lfareBasisCombinations;
      lbasisCombinations.forEach(function (combi, combiIndex) {
        if (combi.sectionId != "1") {
          const cardId =
            "cardId_" +
            combi.sectionId +
            "_" +
            combi.segmentId +
            "_" +
            combi.fareBasis;
          console.log("cardId show: " + cardId);
          $("#" + cardId).show();
        }
      });
    });

    //PASO 5
    const colorsFare = this.colorsFare;
    /* console.log("PASO 5"); */
    const combinacionInicial = lstCombinacionesSection[0];
   /*  console.log("combinacionInicial: " + JSON.stringify(combinacionInicial)); */
    const totalPrice_0 = combinacionInicial.oprice.totalAmount;

    const priceByPass = combinacionInicial.oprice.amountByPassenger;
   /*  console.log("totalPrice_0: " + totalPrice_0); */
    const currency_0 = combinacionInicial.oprice.currency;
   /*  console.log("currency_0: " + currency_0); */
    const lbasisCombinations_0 = combinacionInicial.lfareBasisCombinations;
    /* console.log(
      "lbasisCombinations_0: " + JSON.stringify(lbasisCombinations_0)
    ); */
    lbasisCombinations_0.forEach(function (combo, comboIndex) {
      //$('#' + idRadioBtn + '_' + sectionIndex + '_' + segmentIndex + '_' + (fareFamilyIndex)).prop("checked", true);
    });
    this.lstFamilyResult.forEach(function (section, sectionIndex) {
      const sectionId = section.sectionId;
      section.lsegments.forEach(function (segment, segmentIndex) {
        segment.lfareFamilies.forEach(function (fare, fareFamilyIndex) {
          const fareBasisGG = fare.fareBasis;
          const idRadioBtn =
            sectionId + "_" + (segmentIndex + 1) + "_" + fareBasisGG;
          console.log("idRadioBtn: " + idRadioBtn);
          lbasisCombinations_0.forEach(function (combi, comboIndex) {
            //$('#' + idRadioBtn + '_' + sectionIndex + '_' + segmentIndex + '_' + (fareFamilyIndex)).prop("checked", true);
            const combiIdRadioBtn =
              combi.sectionId + "_" + combi.segmentId + "_" + combi.fareBasis;
            if (combi.sectionId == sectionId) {
              console.log("combiIdRadioBtn: " + combiIdRadioBtn);
              if (idRadioBtn === combiIdRadioBtn) {
                console.log(
                  "SI: " +
                    "#idRadioFam_" +
                    sectionIndex +
                    "_" +
                    segmentIndex +
                    "_" +
                    (fareFamilyIndex + 1)
                );
                $(
                  "#idRadioFam_" +
                    sectionIndex +
                    "_" +
                    segmentIndex +
                    "_" +
                    (fareFamilyIndex + 1)
                ).prop("checked", true);

                $(
                  "#idNameFamilyName" +
                    "_" +
                    sectionIndex +
                    "_" +
                    segmentIndex +
                    "_" +
                    (fareFamilyIndex + 1)
                ).css({ "background-color": colorsFare[fareFamilyIndex + 1] });
                $(
                  "#idNameFamilyName1" +
                    "_" +
                    sectionIndex +
                    "_" +
                    segmentIndex +
                    "_" +
                    (fareFamilyIndex + 1)
                ).css({ "background-color": colorsFare[fareFamilyIndex + 1] });
              }
            }
          });
        });
      });
    });
    this.famTotalFareAmount = totalPrice_0;
    this.famFareAmountByPassenger = priceByPass;
  }

  sumTotal($event) {
    //this.precioTotal = $event;
  }

  selectRadioBtnFam($event) {
    console.log("selectRadioBtnFam");
    //this.modalRef.hide();
    this.outIdRadioBtnFareFam.emit($event);
    /*
    this.flagChangeFare = 1;
    console.log('idRadioBtnFareFam: ' + $event);
    this.idRadioBtnFareFam = $event;
    const splitId = this.idRadioBtnFareFam.split('_');
    const indexFam = parseFloat(splitId[1]) - 1;
    const indexFare = parseFloat(splitId[2]) - 1;



    let fareFamilyPrice = 0;
    this.lstFamilyResult.forEach(function(fam, index1) {
      fam.lfareFamilies.forEach(function(item, index2) {
        if (index1 === indexFam && index2 === indexFare) {
          fareFamilyPrice = item.fareFamilyPrice;
        }
      });
    });

    let precioTotal = this.precioTotal;
    */

    /*
    this.lstSumaFam.forEach(function(item) {
      if (item.indexFam === indexFam) {
        precioTotal = precioTotal - item.fareFamilyPrice;
        precioTotal = precioTotal + fareFamilyPrice;
        item.indexFare = indexFare;
        item.fareFamilyPrice = fareFamilyPrice;
      }
    });
    */

    //this.precioTotal = precioTotal;
    //this.precioPersona = this.precioTotal / this.nroPersonas;

    //this.setListFareFamily($event);
  }

  setListFareFamily(valor) {
    let lstFareFamily = this.lstFareFamily;
    if (lstFareFamily.length === 0) {
      lstFareFamily.push(valor);
    } else {
      const splitId = valor.split("_");
      const indexFam = parseFloat(splitId[1]) - 1;
      const indexFare = parseFloat(splitId[2]) - 1;
      let flagIndex = 0;
      lstFareFamily.forEach(function (fare, index) {
        const fareSplit = fare.split("_");
        const fareIndexFam = parseFloat(fareSplit[1]) - 1;
        const fareIndexFare = parseFloat(fareSplit[2]) - 1;
        if (indexFam === fareIndexFam) {
          flagIndex = index + 1;
        }
      });
      if (flagIndex === 0) {
        lstFareFamily.push(valor);
      } else {
        lstFareFamily[flagIndex - 1] = valor;
      }
    }
    this.lstFareFamily = lstFareFamily;
  }

  gotoStep(step: number) {
    this.stepper.steps.map((matSteap, index) => {
      if (index < step) {
        matSteap.completed = true;
      }
    });
    this.stepper.selectedIndex = step;
  }

  adicionarHotel(recomendacion) {
    var getVar = this.sessionStorageService.retrieve("objbuscador");
    console.log(this.flagAutoCroselling);
    if (this.flagAutoCroselling) {
      this.sessionStorageService.store(
        "ss_flightavailability_request1_recomendacion",
        recomendacion
      );
      this.vueloSeleccionado = this.sessionStorageService.retrieve(
        "ss_flightavailability_request1"
      );
      // tslint:disable-next-line: max-line-length
      let fechallegada = this.vueloSeleccionado.Lsections[0].Lsegments[0]
        .LsegmentGroups[
        this.vueloSeleccionado.Lsections[0].Lsegments[0].LsegmentGroups.length -
          1
      ].ArrivalDate;

      if (this.tipoVuelo === "RT") {
        let fechaSalida = this.vueloSeleccionado.Lsections[1].DepartureDate;
        console.log(fechallegada);
        console.log(fechaSalida);
        this.recomendacionHotel.triggerSearch(
          fechallegada.substring(0, 2) +
            "-" +
            fechallegada.substring(2, 4) +
            "-" +
            "20" +
            fechallegada.substring(4, 6),
          fechaSalida.substring(0, 2) +
            "-" +
            fechaSalida.substring(2, 4) +
            "-" +
            "20" +
            fechaSalida.substring(4, 6),
          getVar.pasajeros,
          getVar.destinocode,
          getVar.destino,
          "Todas",
          recomendacion,
          this.tipoVuelo
        );
        this.gotoStep(1);
        console.log(fechallegada);
        console.log(fechaSalida);
      } else if (this.tipoVuelo === "OW") {
        let salidaTemp = new Date(
          "20" +
            fechallegada.substring(4, 6) +
            "-" +
            fechallegada.substring(2, 4) +
            "-" +
            (fechallegada.substring(0, 2) * 1 + 1)
        );
        this.recomendacionHotel.triggerSearch(
          fechallegada.substring(0, 2) +
            "-" +
            fechallegada.substring(2, 4) +
            "-" +
            "20" +
            fechallegada.substring(4, 6),
          (salidaTemp.getDate() < 10
            ? "0" + salidaTemp.getDate()
            : salidaTemp.getDate()) +
            "-" +
            (salidaTemp.getMonth() * 1 + 1 < 10
              ? "0" + (salidaTemp.getMonth() * 1 + 1)
              : salidaTemp.getMonth() * 1 + 1) +
            "-" +
            salidaTemp.getFullYear(),
          getVar.pasajeros,
          getVar.destinocode,
          getVar.destino,
          "Todas",
          recomendacion,
          this.tipoVuelo
        );
        this.gotoStep(1);
      } else {
        alert("No se encontró una fecha de llegada para el vuelo seleccionada");
      }
    }
  }

  seleccionarFamilia(template) {
    console.log("seleccionarFamilia");
    this.flagCloseModal.emit(true);
    //   this.router.navigate(['/reserva-vuelo']);
    let request = this.sessionStorageService.retrieve(
      "ss_flightavailability_request1"
    );
    let data = {
      GDS: request.GDS,
      Pseudo: request.Pseudo,
      TypeSearch: "C",
      FlightNational: request.FlightNational,
      UserId: request.UserId,
      IncludesBaggage: request.IncludesBaggage,
      CabinType: request.CabinType,
      Lusers: request.Lusers,
      Lpassengers: request.Lpassengers,
      LpseudoRepeats: request.LpseudoRepeats,
      Oprice: request.Oprice,
      Ocarrier: request.Ocarrier,
      Lsections: request.Lsections,
      Lpolicies: request.Lpolicies,
      Ocompany: request.Ocompany,
      Oagency: request.Oagency
    };
    this.flightAvailability(data, template);
  }

  flightAvailability(data, template) {
    this.vuelosComponent.spinner.show();
    //  this.spinner.show();
    this.flagMsgErrorSelFam = false;
    let flagResult = 0;
    this.airportService.fligthAvailibility(data).subscribe(
      (results) => {
        if (results.ostatus.status === 200) {
          this.lsFlightAvailabilty = results;
          this.sessionStorageService.store(
            "ss_FlightAvailability_result",
            this.lsFlightAvailabilty
          );
          /*     this.sessionStorageService.store('ss_flightavailability_request1', data);
          this.sessionStorageService.store('ss_FlightAvailability_request2', this.ss_FlightAvailability_request2);*/
          //this.ObtenerSecciones();
          this.sessionStorageService.store("tipovuelo", this.tipoVuelo);
          flagResult = 1;
        } else {
          flagResult = 2;
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: "gray modal-lg sin-familias" })
          );
        }
      },
      (err) => {
        this.vuelosComponent.spinner.hide();
        this.modalerror = this.modalService.show(
          ModalErrorServiceComponent,
          this.config
        );
      },
      () => {
        this.vuelosComponent.spinner.hide();
        //this.spinner.hide();
        if (flagResult === 1) {
          this.TraerAutorizador();
          //this.router.navigate(["/reserva-vuelo"]);
          /*  if (!this.flagAutoCroselling) {
            this.router.navigate(['/reserva-vuelo']);
          } else {
            this.validateHotel();
            this.flightHotel = this.sessionStorageService.retrieve('ss_objvuelohotel');
            this.adicionarHotel(this.flightHotel);
          } */
        }
        if (flagResult === 2) {
          this.flagMsgErrorSelFam = true;
          /*
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg sin-familias' })
          );
          */
        }
      }
    );
  }

  TraerAutorizador() {
    let infraction;
    if (this.lpolicies != null && this.lpolicies.length > 0) {
      infraction = true;
    } else {
      infraction = false;
    }

    let datosusuario: any[] = [];
    this.datosuser.forEach(function (item) {
      let prefix;
      if (item.gender === "M") {
        prefix = "MR";
      } else {
        prefix = "MRS";
      }
      let fechatotal;
      let fecha = item.birthDate.substr(0, 10);
      let fechaformat = fecha.split("-");
      let año = fechaformat[0];
      let mes = fechaformat[1];
      let dia = fechaformat[2];
      fechatotal = año + "/" + mes + "/" + dia;
      const objuser = {
        UserId: item.userId,
        PassengerId: 1,
        PersonId: item.personId,
        Prefix: prefix,
        Type: "ADT",
        Name: item.firstName,
        LastName: item.lastName,
        Gender: item.gender,
        BirthDate: fechatotal,
        Odocument: item.odocument,
        FrequentFlyer: item.frequentFlyer,
        IsVIP: item.isVIP,
        lcostCenter: item.lcostCenter,
      };
      datosusuario.push(objuser);
    });

    let data = {
      Ocompany: this.loginDataUser.ocompany,
      FlightNational: this.flightNational,
      Infraction: infraction,
      Lpassenger: datosusuario,
      FareTaxAmountByPassenger: this.famTotalFareAmount / this.nroPersonas,
      Lpolicies: this.lpolicies,
    };

    this.airportService.GetApprovers(data).subscribe(
      (results) => {
        this.lsapprovers = results;
        this.sessionStorageService.store("lsapprover", null);
        this.sessionStorageService.store("lsapprover", this.lsapprovers);
      },
      (err) => {
        //  this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
      },
      () => {
        this.router.navigate(["/reserva-vuelo"]);
      }
    );
  }
}
