import {
  Component,
  OnInit,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  AfterViewInit,
  HostListener,
} from "@angular/core";
import { ISearchFlightModel } from "../../../../models/ISearchFlight.model";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { SessionStorageService, LocalStorageService } from "ngx-webstorage";
import { FamilyService } from "../../../../services/family.service";
import { VuelosComponent } from "../vuelos.component";
import { IFareFamilyModel } from "../../../../models/IFareFamily.model";
import { AirportService } from "../../../../services/airport.service";
import { IFlightAvailability } from "src/app/models/IFlightAvailability";
import { Router } from "@angular/router";
import { IFamilyResultModel } from "../../../../models/IFamilyResult.model";
import { environment } from "../../../../../environments/environment";
import { IGetApprovers } from "../../../../models/IGetApprovers.model";
import { stringify } from "@angular/compiler/src/util";
import { ModalFamiliasVaciasComponent } from "../../../shared/modal-familias-vacias/modal-familias-vacias.component";
import { IBnusModel } from "../../../../models/Ibnus.model";
import { IRegulationsModel } from "../../../../models/IRegulations";
import { ModalErrorServiceComponent } from "../../../shared/modal-error-service/modal-error-service.component";
declare var jquery: any;
declare var $: any;

@Component({
  selector: "app-recomendacion",
  templateUrl: "./recomendacion.component.html",
  styleUrls: ["./recomendacion.component.sass"],
})
export class RecomendacionComponent implements OnInit, AfterViewInit {
  modalRef: BsModalRef;
  modalRefPoliticas: BsModalRef;
  modalRefDsctCorp: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };

  @Input() index;
  @Input() recomen: any;
  @Input() currency: string;
  @Input() totalFareAmount: number;
  @Input() totalTaxAmount: number;
  @Input() fareAmountByPassenger: number;
  @Input() taxAmountByPassenger: number;
  @Input() fareTaxAmountByPassenger: number;
  @Input() carrierId: string;
  @Input() numberPassengers: number;
  @Input() pseudo: string;
  @Input() gds: string;
  @Input() lsections: any[];
  @Input() lsectionLength: number;
  @Input() lpolicies: any[];
  @Input() recommendationId: number;
  @Input() tipoVuelo: string;
  @Input() pseudoRepeat;
  @Input() flightNational;
  @Input() isVisible;
  @Output() addHotel = new EventEmitter<any>();

  modalerror: BsModalRef;
  segmentRadioCheckId;
  lstRadioCheck: any[] = [];
  loginDataUser;
  outSegmentCheck;
  familyname;

  //lstFamilyResult: IFareFamilyModel[] = [];
  lstFamilyResult: IFamilyResultModel;
  lsFlightAvailabilty: any;
  flagResultFamilias: number;
  flagPseudoRepeat: boolean;
  lstPseudoRepeat: any[] = [];
  lstrulestramo: any[] = [];

  dataRequestFamilia;
  dataseccionesvuelos;
  famTotalFareAmount = 0;
  famFareAmountByPassenger = 0;
  requestFamilia;
  flagMsgErrorSelFam: boolean;
  lst_rol_autogestion;
  lst_rol_autorizador;
  lst_rol_centralizador;
  datosuser: any[] = [];
  LPolicies;
  lsapprovers: IGetApprovers[] = [];
  osessionflightaval: any;
  @Input() lstBnus: IBnusModel[];

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

  lstFareBasis: any[] = [];
  lstConCombinacion: any[] = [];
  modalRefSinFares: BsModalRef;
  flagAutoCroselling: any;

  constructor(
    private modalService: BsModalService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private familyService: FamilyService,
    private vuelosComponent: VuelosComponent,
    private airportService: AirportService,
    private router: Router
  ) {
    this.flagResultFamilias = 0;
    this.flagMsgErrorSelFam = false;
    this.lst_rol_autogestion = environment.cod_rol_autogestion;
    this.lst_rol_autorizador = environment.cod_rol_autorizador;
    this.lst_rol_centralizador = environment.cod_rol_centralizador;
  }

  ngOnInit() {
    /*  window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      console.log('scrolled ===>' + scrolled);
      if (scrolled >= 1630) {
        $('#precio').css({'position': 'fixed', 'right': '208px', 'width': '372px'});
      } else {
        return;
      }
    });*/
    this.loginDataUser = this.sessionStorageService.retrieve("ss_login_data");
    this.flagAutoCroselling = this.sessionStorageService.retrieve(
      "ss_login_data"
    ).ocompany.ocompanyConfiguration.crossSellingHotel;
    if (this.flagAutoCroselling) {
      if (this.loginDataUser.orole.roleId === 3) {
        this.flagAutoCroselling = false;
      }
    }
    const pseudoRepeat = this.pseudoRepeat;
    //console.log('pseudoRepeat: ' + pseudoRepeat);
   /*  if (pseudoRepeat === null) {
      this.flagPseudoRepeat = false;
    } else {
      this.flagPseudoRepeat = true;
      if (pseudoRepeat.indexOf("-") >= 0) {
        const lstPseudoRepeat = pseudoRepeat;;
        for (let i = 0; i < lstPseudoRepeat.length; i++) {
          lstPseudoRepeat[i] = lstPseudoRepeat[i] + ".png";
        }
        //console.log('lstPseudoRepeat: ' + lstPseudoRepeat);
        this.lstPseudoRepeat = lstPseudoRepeat;
      } else {
        let lstPseudoRepeat: any[] = [];
        lstPseudoRepeat.push(pseudoRepeat);
        for (let i = 0; i < lstPseudoRepeat.length; i++) {
          lstPseudoRepeat[i] = lstPseudoRepeat[i] + ".png";
        }
        //console.log('lstPseudoRepeat: ' + lstPseudoRepeat);
        this.lstPseudoRepeat = lstPseudoRepeat;
      }
    } */
  }

  ngAfterViewInit() {
    this.sessionStorageService.store("ss_lpolicies", this.lpolicies);
    this.sessionStorageService.store("ss_flightNational", this.flightNational);
  }

  openModal(
    template: TemplateRef<any>,
    recommendationId,
    modalerror,
    templateSinFares
  ) {
    const objHotel = {
      index: this.index,
      totalFareAmount: this.totalFareAmount,
      currency: this.currency,
      totalTaxAmount: this.totalTaxAmount,
      fareAmountByPassenger: this.fareAmountByPassenger,
      taxAmountByPassenger: this.taxAmountByPassenger,
      fareTaxAmountByPassenger: this.fareTaxAmountByPassenger,
      carrierId: this.carrierId,
      numberPassengers: this.numberPassengers,
      pseudo: this.pseudo,
      gds: this.gds,
      lsections: this.lsections,
      lsectionLength: this.lsectionLength,
      lpolicies: this.lpolicies,
      recommendationId: this.recommendationId,
      tipoVuelo: this.tipoVuelo,
      pseudoRepeat: this.pseudoRepeat,
      flightNational: this.flightNational,
      isVisible: this.isVisible,
      recomen: this.recomen,
    };

    this.sessionStorageService.store("ss_objVueloHotel", objHotel);

    this.datosuser = this.sessionStorageService.retrieve("objusuarios");
    let Lsections_: any[] = [];
    const lstRadioCheck = this.lstRadioCheck;
    let idVal = 1;
    let lstFareBasis = this.lstFareBasis;
    lstRadioCheck.forEach(function (item) {
      const sectionId = item.sectionId_;
      const segmentId = item.segmentId_;
      const segmentIndex = item.segmentIndex_;
      const recommendationId = item.recommendationId_;
      const section = item.section_;
      const segment = item.segment_;

      //LsegmentGroups
      let LsegmentGroups_: any[] = [];
      segment.lsegmentGroups.forEach(function (group, i) {
        const dataGroup = {
          Id: idVal,
          ClassId: section.lsectionGroups[i].classId,
          DepartureDate: group.departureDate,
          TimeOfDeparture: group.timeOfDeparture,
          ArrivalDate: group.arrivalDate,
          TimeOfArrival: group.timeOfArrival,
          Origin: group.origin,
          Destination: group.destination,
          MarketingCarrier: group.marketingCarrier,
          FlightOrtrainNumber: group.flightOrtrainNumber,
          EquipmentType: group.equipmentType,
          FareBasis: section.lsectionGroups[i].fareBasis,
          CabinId: section.lsectionGroups[i].cabinId,
          CabinDescription: section.lsectionGroups[i].cabinDescription,
          TimeWaitAirport: group.timeWaitAirport,
          fareFamilyName: "",
        };
        LsegmentGroups_.push(dataGroup);
        idVal++;
        lstFareBasis.push(section.lsectionGroups[i].fareBasis);
      });

      //Lsegments
      let Lsegments_: any[] = [];
      const lsegment = {
        SegmentID: segment.segmentId,
        FareType: section.lsectionGroups[0].fareType,
        TotalFlightTime: segment.totalFlightTime,
        LsegmentGroups: LsegmentGroups_,
      };
      Lsegments_.push(lsegment);

      //Lsections
      const lsection = {
        SectionID: section.sectionId,
        Origin: section.origin,
        Destination: section.destination,
        Lsegments: Lsegments_,
      };
      Lsections_.push(lsection);
    });

    this.lstFareBasis = lstFareBasis;

    Lsections_ = Lsections_.sort((a, b) => a.sectionId - b.sectionId);

    let dataFamilias = {
      NumberPassengers: this.numberPassengers,
      Currency: this.currency,
      CarrierId: this.carrierId,
      Lsections: Lsections_,
      Ocompany: this.loginDataUser.ocompany,
      Gds: this.gds,
      PSeudo: this.pseudo,
    };
    this.requestFamilia = dataFamilias;
    this.getFareFamilyV2(dataFamilias, template, modalerror, templateSinFares);
  }

  setearRadioId($event) {
    this.outSegmentCheck = $event;

    const recommendationId = this.recommendationId;
    const indexSegment = this.outSegmentCheck.indexSegment_;
    const radioId = this.outSegmentCheck.radioId_;
    const segment = this.outSegmentCheck.segment_;
    const section = this.outSegmentCheck.section_;

    const dataRadioSel = {
      recommendationId_: recommendationId,
      sectionId_: section.sectionId,
      segmentId_: segment.segmentId,
      segmentIndex_: indexSegment,
      section_: section,
      segment_: segment,
      flag: 1,
    };

    if (this.lstRadioCheck.length === 0) {
      this.lstRadioCheck.push(dataRadioSel);
    } else {
      this.lstRadioCheck.forEach(function (item) {
        if (
          item.recommendationId_ === recommendationId &&
          item.sectionId_ === section.sectionId
        ) {
          item.flag = 0;
        }
      });

      this.lstRadioCheck.push(dataRadioSel);
      this.lstRadioCheck = this.lstRadioCheck.filter((x) => x.flag === 1);
    }
  }

  ArmarSeccionesFlightAvailability() {
    let Lsections_: any[] = [];
    let datosusuario: any[] = [];
    const lstRadioCheck = this.lstRadioCheck;
    lstRadioCheck.sort((a, b) => a.sectionId_ - b.sectionId_);
    this.lstRadioCheck = lstRadioCheck;
    lstRadioCheck.forEach(function (item) {
      const sectionId = item.sectionId_;
      const segmentId = item.segmentId_;
      const segmentIndex = item.segmentIndex_;
      const recommendationId = item.recommendationId_;
      const section = item.section_;
      const segment = item.segment_;

      //LsegmentGroups
      let LsegmentGroups_: any[] = [];
      segment.lsegmentGroups.forEach(function (group, i) {
        const dataGroup = {
          Id: i + 1,
          ClassId: section.lsectionGroups[i].classId,
          CabinId: section.lsectionGroups[i].cabinId,
          CabinDescription: section.lsectionGroups[i].cabinDescription,
          DepartureDate: group.departureDate,
          TimeOfDeparture: group.timeOfDeparture,
          ArrivalDate: group.arrivalDate,
          TimeOfArrival: group.timeOfArrival,
          Origin: group.origin,
          Destination: group.destination,
          MarketingCarrier: group.marketingCarrier,
          FlightOrtrainNumber: group.flightOrtrainNumber,
          EquipmentType: group.equipmentType,
          FareBasis: section.lsectionGroups[i].fareBasis,
          TimeWaitAirport: group.timeWaitAirport,
          fareFamilyName: "",
          TotalFlightTimeShow: group.totalFlightTimeShow,
        };
        LsegmentGroups_.push(dataGroup);
      });

      //Lsegments
      let Lsegments_: any[] = [];
      const lsegment = {
        SegmentID: segment.segmentId,
        FareType: section.lsectionGroups[0].fareType,
        TotalFlightTime: segment.totalFlightTime,
        LsegmentGroups: LsegmentGroups_,
      };
      Lsegments_.push(lsegment);

      //Lsections
      const lsection = {
        SectionID: section.sectionId,
        Origin: section.origin,
        Destination: section.destination,
        Lsegments: Lsegments_,
        DepartureDate: section.departureDate,
      };
      Lsections_.push(lsection);
    });

    console.log(this.datosuser);
    this.datosuser.forEach(function (item, index) {
      let recorte;
      let fecha;
      let hora;
      let fechafinal;
      let fechaformat;
      let dia;
      let mes;
      let año;
      let fechatotal;
      recorte = item.birthDate.split("T");
      fecha = recorte[0];
      hora = recorte[1];
      fechaformat = fecha.split("-");
      dia = fechaformat[2];
      mes = fechaformat[1];
      año = fechaformat[0];
      fechatotal = año + "/" + mes + "/" + dia;
      //let fecha = this.Formatearfecha(item.birthDate);
      const obj = {
        UserId: item.userId,
        PassengerId: index + 1,
        PersonId: item.personId,
        Name: item.firstName,
        LastName: item.lastName,
        Gender: item.gender,
        PhoneNumber: item.phone,
        Email: item.email,
        BirthDate: fechatotal,
        Odocument: item.odocument,
        FrequentFlyer: item.frequentFlyer,
        IsVIP: item.isVIP,
        LcostCenter: item.lcostCenter,
        Type: "ADT",
        Orole: item.orole,
      };
      datosusuario.push(obj);
    });
    console.log(datosusuario);
    let infraction;

    if (this.lpolicies != null && this.lpolicies.length > 0) {
      infraction = true;
    } else {
      infraction = false;
    }
    let dataFamilias = {
      NumberPassengers: this.numberPassengers,
      Currency: this.currency,
      CarrierId: this.carrierId,
      Lsections: Lsections_,
      Ocompany: this.loginDataUser.ocompany,
      GDS: this.gds,
      Pseudo: this.pseudo,
      Lpassenger: datosusuario,
      TotalFareAmount: this.totalFareAmount,
      FareTaxAmountByPassenger: this.fareTaxAmountByPassenger,
      RecommendationId: this.recommendationId,
      UserId: this.loginDataUser.userId,
      Infraction: infraction,
      FlightNational: this.flightNational,
      Lpolicies: this.lpolicies,
    };

    return dataFamilias;
  }

  getFareFamily(dataPost, template, modalerror) {
    this.vuelosComponent.spinner.show();
    this.ObtenerSecciones();
    this.dataRequestFamilia = dataPost;
    let dataflighavailability = this.ArmarSeccionesFlightAvailability();
    let datasecciones = this.ObtenerSecciones();
    //console.log('mis secciones completas:  ' + JSON.stringify(datasecciones));
    let flagResultFamilias = 0;
    //console.log("dataPost Family INI: " + JSON.stringify(dataPost));
    this.familyService.getFareFamily(dataPost).subscribe(
      (result) => {
        //console.log("result getFareFamily: " + JSON.stringify(result));
        if (result === null) {
          flagResultFamilias = 0;
        } else {
          this.lstFamilyResult = result;
          this.sessionStorageService.store(
            "ss_lstFamilyResult",
            this.lstFamilyResult
          );
          if (this.lstFamilyResult.lsections.length === 0) {
            flagResultFamilias = 0;
          } else {
            flagResultFamilias = 1;
            this.lstFamilyResult.lsections.forEach(function (
              section,
              indexSection
            ) {
              section.lsegments.forEach(function (segment, indexSegment) {
                segment.lfareFamilies.forEach(function (fare, indexFare) {
                  if (indexFare === 0) {
                    const fareFamilyName = fare.fareFamilyName;
                    dataflighavailability.Lsections[
                      indexSection
                    ].Lsegments[0].LsegmentGroups[
                      indexSegment
                    ].fareFamilyName = fareFamilyName;
                    datasecciones.Lsections[
                      indexSection
                    ].Lsegments[0].LsegmentGroups[
                      indexSegment
                    ].fareFamilyName = fareFamilyName;
                  }
                });
              });
            });
            //console.log("dataPost Family FIN: " + JSON.stringify(dataPost));
            this.requestFamilia = dataflighavailability;
            this.dataseccionesvuelos = datasecciones;
          }
        }
        this.flagResultFamilias = flagResultFamilias;
      },
      (err) => {
        console.log("ERROR: " + JSON.stringify(err));
        this.vuelosComponent.spinner.hide();
        this.modalerror = this.modalService.show(
          ModalErrorServiceComponent,
          this.config
        );
      },
      () => {
        //this.vuelosComponent.spinner.hide();

        const requestFamilia = this.requestFamilia;
        const lstFamilyResult = this.lstFamilyResult;

        if (lstFamilyResult === undefined) {
          //this.modalRefSessionExpired = this.modalService.show(ModalFamiliasVaciasComponent,this.config);
        } else {
          requestFamilia.Lsections.forEach(function (section, indexSection) {
            lstFamilyResult.lsections.forEach(function (
              section2,
              indexSection2
            ) {
              if (indexSection === indexSection2) {
                //const fff = section.Lsegments[0]
              }
            });
          });
        }

        if (flagResultFamilias === 1) {
          this.flightAvailability(
            dataflighavailability,
            modalerror,
            2,
            template,
            datasecciones
          );
          /*
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
          );
          */
        } else {
          this.vuelosComponent.spinner.hide();
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: "gray modal-lg sin-familias" })
          );
        }
      }
    );
  }

  Formatearfecha(value) {
    let recorte;
    let fecha;
    let hora;
    let fechafinal;
    let fechaformat;
    let dia;
    let mes;
    let año;
    let fechatotal;
    recorte = value.split("T");
    fecha = recorte[0];
    hora = recorte[1];
    fechaformat = fecha.split("-");
    dia = fechaformat[2];
    mes = fechaformat[1];
    año = fechaformat[0];
    fechatotal = año + "/" + mes + "/" + dia;
    hora = hora.substr(0, 5);
    fechafinal = fechatotal;
    return fechafinal;
  }

  getFlightAvailability(recommendationId, template: TemplateRef<any>) {
    this.datosuser = this.sessionStorageService.retrieve("objusuarios");
    let requestFlight = this.sessionStorageService.retrieve('ss_databuscador');
    // tslint:disable-next-line: max-line-length
    let Lsections_: any[] = [];
    let datosusuario: any[] = [];
    const lstRadioCheck = this.lstRadioCheck;
    console.log(lstRadioCheck);
    lstRadioCheck.sort((a, b) => a.sectionId_ - b.sectionId_);
    this.lstRadioCheck = lstRadioCheck;
    lstRadioCheck.forEach(function (item) {
      const sectionId = item.sectionId_;
      const segmentId = item.segmentId_;
      const segmentIndex = item.segmentIndex_;
      const recommendationId = item.recommendationId_;
      const section = item.section_;
      const segment = item.segment_;

      //LsegmentGroups
      let LsegmentGroups_: any[] = [];
      segment.lsegments.forEach(function (group, i) {
        const dataGroup = {
          oorigin: group.oorigin,
          odestination: group.odestination,
          departureDate: group.departureDate,
          departureDateShow: group.departureDateShow,
          departureTime: group.departureTime,
          departureTimeShow: group.departureTimeShow,
          arrivalDate: group.arrivalDate,
          arrivalDateShow: group.arrivalDateShow,
          arrivalTime: group.arrivalTime,
          arrivalTimeShow: group.arrivalTimeShow,
          totalFlightTime: group.totalFlightTime,
          totalFlightTimeShow: group.totalFlightTimeShow,
          dateVariation: group.dateVariation,
          timeWaitAirport: group.timeWaitAirport,
          flightNumber: group.flightNumber,
          equipmentType: group.equipmentType,
          ocarrier: group.ocarrier,
          classId: group.classId,
          cabinId: group.cabinId,
          cabinDescription: group.cabinDescription,
          marriageGrp: group.marriageGrp,
          FareType: group.fareType,
          FareBasis: group.fareBasis,
          fareFamilyName: group.fareFamilyName,
          BrandId: group.brandId,
        };
        LsegmentGroups_.push(dataGroup);
      });

      //Lsegments
      let Lsegments_: any[] = [];
      const lsegment = {
        TotalFlightTime: segment.totalFlightTime,
        Lsegments: LsegmentGroups_,
      };
      Lsegments_.push(lsegment);

      //Lsections
      const lsection = {
        Oorigin: section.oorigin,
        Odestination: section.odestination,
        Oschedule: lsegment,
        departureDate: section.departureDate,
        departureDateShow: section.departureDateShow
      };
      Lsections_.push(lsection);
    });

    console.log(this.datosuser);
    this.datosuser.forEach(function (item, index) {
      let recorte;
      let fecha;
      let hora;
      let fechafinal;
      let fechaformat;
      let dia;
      let mes;
      let año;
      let fechatotal;
      recorte = item.birthDate.split("T");
      fecha = recorte[0];
      hora = recorte[1];
      fechaformat = fecha.split("-");
      dia = fechaformat[2];
      mes = fechaformat[1];
      año = fechaformat[0];
      fechatotal = año + "/" + mes + "/" + dia;
      // let fecha = this.Formatearfecha(item.birthDate);
      const obj = {
        UserId: item.userId,
        PassengerId: index + 1,
        PersonId: item.personId,
        Name: item.firstName,
        LastName: item.lastName,
        Gender: item.gender,
        PhoneNumber: item.phone,
        Email: item.email,
        BirthDate: fechatotal,
        Odocument: item.odocument,
        FrequentFlyer: item.frequentFlyer,
        IsVIP: item.isVIP,
        LcostCenter: item.lcostCenter,
        Type: "ADT",
        Orole: item.orole,
      };
      datosusuario.push(obj);
    });
    console.log(datosusuario);
    let infraction;

    if (this.lpolicies != null && this.lpolicies.length > 0) {
      infraction = true;
    } else {
      infraction = false;
    }
    console.log(this.recomen);
    const price = {
      Currency: this.recomen.oprice.currency,
      TotalAmount: this.recomen.oprice.totalAmount
    }
    let dataFamilias = {
      GDS: this.gds,
      Pseudo: this.pseudo,
      TypeSearch: "C",
      FlightNational: this.flightNational,
      UserId: this.loginDataUser.userId,
      IncludesBaggage: requestFlight.IncludesBaggage,
      CabinType: requestFlight.CabinType,
      Lusers: requestFlight.Lusers,
      Lpassengers: requestFlight.Lpassengers,
      LpseudoRepeats: this.recomen.lpseudoRepeats,
      Oprice: price,
      Ocarrier: this.recomen.ocarrier,
      Lsections: Lsections_,
      Lpolicies: this.recomen.lpolicies,
      Ocompany: this.loginDataUser.ocompany,
      Oagency: this.loginDataUser.oagency,
    };
    this.sessionStorageService.store(
      "ss_FlightAvailability_request1",
      dataFamilias
    );
    this.flightAvailability(dataFamilias, template, 1, null, null);
  }

  ObtenerSecciones() {
    let Lsections_: any[] = [];
    let requestFlight = this.sessionStorageService.retrieve('ss_databuscador');
    const lstRadioCheck = this.lstRadioCheck;
    lstRadioCheck.forEach(function (item) {
      const sectionId = item.sectionId_;
      const segmentId = item.segmentId_;
      const segmentIndex = item.segmentIndex_;
      const recommendationId = item.recommendationId_;
      const section = item.section_;
      const segment = item.segment_;

      //LsegmentGroups
      let LsegmentGroups_: any[] = [];
      segment.lsegments.forEach(function (group, i) {
        const dataGroup = {
          oorigin: group.oorigin,
          odestination: group.odestination,
          departureDate: group.departureDate,
          departureDateShow: group.departureDateShow,
          departureTime: group.departureTime,
          departureTimeShow: group.departureTimeShow,
          arrivalDate: group.arrivalDate,
          arrivalDateShow: group.arrivalDateShow,
          arrivalTime: group.arrivalTime,
          arrivalTimeShow: group.arrivalTimeShow,
          totalFlightTime: group.totalFlightTime,
          totalFlightTimeShow: group.totalFlightTimeShow,
          dateVariation: group.dateVariation,
          timeWaitAirport: group.timeWaitAirport,
          flightNumber: group.flightNumber,
          equipmentType: group.equipmentType,
          ocarrier: group.ocarrier,
          classId: group.classId,
          cabinId: group.cabinId,
          cabinDescription: group.cabinDescription,
          marriageGrp: group.marriageGrp,
          FareType: group.fareType,
          FareBasis: group.fareBasis,
          fareFamilyName: group.fareFamilyName,
          BrandId: group.brandId,
        };
        LsegmentGroups_.push(dataGroup);
      });

      //Lsegments
      let Lsegments_: any[] = [];
      const lsegment = {
        TotalFlightTime: segment.totalFlightTime,
        Lsegments: LsegmentGroups_,
      };
      Lsegments_.push(lsegment);

      //Lsections
      const lsection = {
        Oorigin: section.oorigin,
        Odestination: section.odestination,
        Oschedule: lsegment,
        departureDate: section.departureDate,
        departureDateShow: section.departureDateShow
      };
      Lsections_.push(lsection);
    });

    const price = {
      Currency: this.recomen.oprice.currency,
      TotalAmount: this.recomen.oprice.totalAmount
    }

    let dataFamilias = {
      GDS: this.gds,
      Pseudo: this.pseudo,
      TypeSearch: "C",
      FlightNational: this.flightNational,
      UserId: this.loginDataUser.userId,
      IncludesBaggage: requestFlight.IncludesBaggage,
      CabinType: requestFlight.CabinType,
      Lusers: requestFlight.Lusers,
      Lpassengers: requestFlight.Lpassengers,
      LpseudoRepeats: this.recomen.lpseudoRepeats,
      Oprice: price,
      Ocarrier: this.recomen.ocarrier,
      Lsections: Lsections_,
      Lpolicies: this.recomen.lpolicies,
      Ocompany: this.loginDataUser.ocompany,
      Oagency: this.loginDataUser.oagency,
    };
    this.sessionStorageService.store(
      "ss_FlightAvailability_request2",
      dataFamilias
    );

    return dataFamilias;
  }

  GetUsers() {
    let data = {
      Id: this.loginDataUser.userId,
    };
    let objuser;
    this.airportService.GetUser(data.Id).subscribe(
      (results) => {
        objuser = results;
        this.datosuser.push(objuser);
        this.sessionStorageService.store("objusuarios", this.datosuser);
      },
      (err) => {},
      () => {
        // this.TraerAutorizador();
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
      FareTaxAmountByPassenger: this.fareTaxAmountByPassenger,
      Lpolicies: this.lpolicies,
    };

    this.lsapprovers = this.lsFlightAvailabilty.lapprovers;
    this.sessionStorageService.store("lsapprover", null);
        this.sessionStorageService.store("lsapprover", this.lsapprovers);

    /* this.airportService.GetApprovers(data).subscribe(
      (results) => {
        this.lsapprovers = results;
        this.sessionStorageService.store("lsapprover", null);
        this.sessionStorageService.store("lsapprover", this.lsapprovers);
      },
      (err) => {
        //  this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
      }
    ); */
  }

  validateHotel() {
    this.addHotel.next({
      index: this.index,
      totalFareAmount: this.totalFareAmount,
      currency: this.currency,
      totalTaxAmount: this.totalTaxAmount,
      fareAmountByPassenger: this.fareAmountByPassenger,
      taxAmountByPassenger: this.taxAmountByPassenger,
      fareTaxAmountByPassenger: this.fareTaxAmountByPassenger,
      carrierId: this.carrierId,
      numberPassengers: this.numberPassengers,
      pseudo: this.pseudo,
      gds: this.gds,
      lsections: this.lsections,
      lsectionLength: this.lsectionLength,
      lpolicies: this.lpolicies,
      recommendationId: this.recommendationId,
      tipoVuelo: this.tipoVuelo,
      pseudoRepeat: this.pseudoRepeat,
      flightNational: this.flightNational,
      isVisible: this.isVisible,
    });
    // this.router.navigate(['/reserva-vuelo']);
  }

  flightAvailability(data, template, tipo, modalFam, dataseccion) {
    this.vuelosComponent.spinner.show();
   
    // tslint:disable-next-line: max-line-length
    let flagResult = 0;
    this.airportService.fligthAvailibility(data).subscribe(
      (results) => {
        if (results.ostatus.status === 200) {
          this.lsFlightAvailabilty = results;
          this.osessionflightaval = this.lsFlightAvailabilty.osession;
          this.sessionStorageService.store(
            "ss_FlightAvailability_result",
            this.lsFlightAvailabilty
          );
          if (tipo === 1) {
            // tslint:disable-next-line: max-line-length
            this.TraerAutorizador();
          }
          if (tipo === 2) {
            this.TraerAutorizador();
            // tslint:disable-next-line: max-line-length
            /*  if (this.loginDataUser.orole.roleId === this.lst_rol_autogestion[0] || this.loginDataUser.orole.roleId === this.lst_rol_autorizador[0] || this.loginDataUser.orole.roleId != this.lst_rol_centralizador[2] && this.loginDataUser.orole.roleId != this.lst_rol_centralizador[0]) {
              this.GetUsers();
              this.sessionStorageService.store('objusuarios', this.datosuser);
            }
            if (this.loginDataUser.orole.roleDescription === 'Centralizador' || this.loginDataUser.orole.roleId === this.lst_rol_centralizador[2]) {
              this.datosuser = this.sessionStorageService.retrieve('ss_lstPasajeros');
              this.sessionStorageService.store('objusuarios', this.datosuser);
              this.TraerAutorizador();
             }*/
            this.sessionStorageService.store(
              "ss_FlightAvailability_request1",
              data
            );
            this.sessionStorageService.store(
              "ss_FlightAvailability_request2",
              dataseccion
            );
            this.famTotalFareAmount = this.lsFlightAvailabilty.totalFareAmount;
            this.famFareAmountByPassenger = this.lsFlightAvailabilty.fareAmountByPassenger;
            this.flagMsgErrorSelFam = false;
            this.modalRef = this.modalService.show(
              modalFam,
              Object.assign({}, { class: "gray modal-lg" })
            );
          }
          this.ObtenerSecciones();
          this.sessionStorageService.store("tipovuelo", this.tipoVuelo);
          //this.router.navigate(['/reserva-vuelo']);
          flagResult = 1;
        } else {
          if (tipo === 1 || tipo === 2) {
            this.modalRef = this.modalService.show(
              template,
              Object.assign({}, { class: "gray modal-lg sin-familias" })
            );
          }
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
        if (flagResult === 1) {
          if (tipo === 1) {
            console.log(this.flagAutoCroselling);
            // tslint:disable-next-line: max-line-length
            // tslint:disable-next-line: max-line-length
            if (!this.flagAutoCroselling) {
              this.router.navigate(["/reserva-vuelo"]);
            } else {
              this.validateHotel();
            }
          }
          

          if (tipo === 3) {
            this.famTotalFareAmount = this.lsFlightAvailabilty.totalFareAmount;
            this.famFareAmountByPassenger = this.lsFlightAvailabilty.fareAmountByPassenger;
            this.flagMsgErrorSelFam = false;
            this.sessionStorageService.store(
              "ss_FlightAvailability_request1",
              data
            );
            this.sessionStorageService.store(
              "ss_FlightAvailability_request2",
              dataseccion
            );
          }
        } else {
          if (tipo === 3) {
            this.famTotalFareAmount = 0;
            this.famFareAmountByPassenger = 0;
            this.flagMsgErrorSelFam = true;
          }
        }
      }
    );
  }

  openModalPoliticas(template) {
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: "gray con-politicas" })
    );
  }

  closeModalFamilia($event) {
    this.modalRef.hide();
  }

  closeModal() {
    this.modalRef.hide();
    this.datosuser = [];
    //this.sessionStorageService.store('objusuarios', null); XQQQQQQQQQQQQQQQQQQ ?????
  }

  famFlightAvailability($event) {
    const obj = $event.split("_");
    const section_ = obj[1];
    const segment_ = obj[2];
    const index_ = obj[3];
    const requestFamilia = this.requestFamilia;
    const seccionvuelos = this.dataseccionesvuelos;
    const lstFamilyResult = this.lstFamilyResult;
    const colorsFare = this.colorsFare;
    let fareBasis = "";
    let classId = "";
    let fareFamilyName = "";
    let fareBasisVal = "";
    let classIdVal = "";
    let flagFareBasisVal = 1;
    //aumentar validacion de misma aerolinea tbm

    //Toda la fila segment blanquear y radio false
    //console.log("Todas las cabeceras del segment blancas");
    lstFamilyResult.lsections.forEach(function (section, indexSection) {
      if (indexSection == section_) {
        section.lsegments.forEach(function (segment, indexSegment) {
          if (indexSegment == segment_) {
            segment.lfareFamilies.forEach(function (fare, indexFare) {
              let idSecuencial =
                indexSection + "_" + indexSegment + "_" + (indexFare + 1);
              //console.log("idSecuencial: " + idSecuencial);
              $("#idRadioFam_" + idSecuencial).prop("checked", false);
              $("#idNameFamilyName_" + idSecuencial).css({
                "background-color": "#C6C6C6",
              });
              $("#idNameFamilyName1_" + idSecuencial).css({
                "background-color": "#C6C6C6",
              });
            });
          }
        });
      }
    });

    //segment seleccionado guardamos valores y pintamos cabezera y seleccionamos radio
    //console.log("segment seleccionado guardamos valores y pintamos cabezera y seleccionamos radio");
    lstFamilyResult.lsections.forEach(function (section, indexSection) {
      section.lsegments.forEach(function (segment, indexSegment) {
        if (indexSection == section_) {
          segment.lfareFamilies.forEach(function (fare, indexFare) {
            if (indexSection == section_) {
              if (indexSegment == segment_) {
                if (indexFare == index_ - 1) {
                  fareBasis = fare.fareBasis;
                  classId = fare.classId;
                  fareFamilyName = fare.fareFamilyName;

                  let idSecuencial =
                    indexSection + "_" + indexSegment + "_" + (indexFare + 1);

                  $("#idRadioFam_" + idSecuencial).prop("checked", true);
                  $("#idNameFamilyName_" + idSecuencial).css({
                    "background-color": colorsFare[index_],
                  });
                  $("#idNameFamilyName1_" + idSecuencial).css({
                    "background-color": colorsFare[index_],
                  });

                  requestFamilia.Lsections[
                    section_
                  ].Lsegments[0].LsegmentGroups[segment_].ClassId = classId;
                  requestFamilia.Lsections[
                    section_
                  ].Lsegments[0].LsegmentGroups[segment_].FareBasis = fareBasis;
                  requestFamilia.Lsections[
                    section_
                  ].Lsegments[0].LsegmentGroups[
                    segment_
                  ].fareFamilyName = fareFamilyName;

                  seccionvuelos.Lsections[section_].Lsegments[0].LsegmentGroups[
                    segment_
                  ].ClassId = classId;
                  seccionvuelos.Lsections[section_].Lsegments[0].LsegmentGroups[
                    segment_
                  ].FareBasis = fareBasis;
                  seccionvuelos.Lsections[section_].Lsegments[0].LsegmentGroups[
                    segment_
                  ].fareFamilyName = fareFamilyName;
                }
                console.log(fareFamilyName);
              }
            }
          });
        } else {
          //
        }
      });
    });

    /*
    lstFamilyResult.lsections.forEach(function(section, indexSection) {
      section.lsegments.forEach(function(segment, indexSegment) {


        if (indexSection == section_) {
          if (indexSegment === 0) {
            fareBasisVal = segment.lfareFamilies[index_ - 1].fareBasis;
            console.log(fareBasisVal);
          } else {
            console.log(fareBasisVal);
            console.log(segment.lfareFamilies[index_ - 1].fareBasis);
            if (fareBasisVal != segment.lfareFamilies[index_ - 1].fareBasis) {
              console.log("flagFareBasisVal = 0");
              flagFareBasisVal = 0;
            } else {
              console.log("flagFareBasisVal = 1");
            }
          }
        }


        segment.lfareFamilies.forEach(function(fare, indexFare) {
          if (indexSection == section_) {
            if (indexSegment == segment_) {
              if (indexFare == index_ - 1) {
                fareBasis = fare.fareBasis;
                classId = fare.classId;
                fareFamilyName = fare.fareFamilyName;
              }
            }
          }
        });
      });
    });
    */

    //Pintamos y seleccionamos todos los tipos iguales
    /*
    lstFamilyResult.lsections.forEach(function(section, indexSection) {

      if (indexSection == section_) {
        section.lsegments.forEach(function(segment, indexSegment) {

          if (indexSegment != segment_) {
            let flagFareComp = 0;
            segment.lfareFamilies.forEach(function(fare, indexFare) {
              let idSecuencial = indexSection + "_" + indexSegment + "_" + (indexFare + 1);
              //$("#idRadioFam_" + idSecuencial).prop("checked", false);
              //$('#idNameFamilyName_' + idSecuencial).css({'background-color': '#C6C6C6'});
              const fareBasisNew = fare.fareBasis;
              if (fareBasis == fareBasisNew) {
                flagFareComp = 1;
              }

            });
            if (flagFareComp === 1) {
              segment.lfareFamilies.forEach(function(fare, indexFare) {
                let idSecuencial = indexSection + "_" + indexSegment + "_" + (indexFare + 1);
                $("#idRadioFam_" + idSecuencial).prop("checked", false);
                $('#idNameFamilyName_' + idSecuencial).css({'background-color': '#C6C6C6'});
                $('#idNameFamilyName1_' + idSecuencial).css({'background-color': '#C6C6C6'});
                const fareBasisNew = fare.fareBasis;
                if (fareBasis == fareBasisNew) {
                  flagFareComp = 1;
                  $("#idRadioFam_" + idSecuencial).prop("checked", true);
                  $('#idNameFamilyName_' + idSecuencial).css({'background-color': colorsFare[index_]});
                  $('#idNameFamilyName1_' + idSecuencial).css({'background-color': colorsFare[index_]});
                  requestFamilia.Lsections[indexSection].Lsegments[0].LsegmentGroups[indexSegment].ClassId = classId;
                  requestFamilia.Lsections[indexSection].Lsegments[0].LsegmentGroups[indexSegment].FareBasis = fareBasis;
                  requestFamilia.Lsections[indexSection].Lsegments[0].LsegmentGroups[indexSegment].fareFamilyName = fareFamilyName;
                  seccionvuelos.Lsections[indexSection].Lsegments[0].LsegmentGroups[indexSegment].ClassId = classId;
                  seccionvuelos.Lsections[indexSection].Lsegments[0].LsegmentGroups[indexSegment].FareBasis = fareBasis;
                  seccionvuelos.Lsections[indexSection].Lsegments[0].LsegmentGroups[indexSegment].fareFamilyName = fareFamilyName;
                }
              });
            }
          }


        });
      }

    });
    */

    console.log("VALIDANDO CLICK DEL RADIO BUTTON");

    console.log("requestFamilia: " + JSON.stringify(requestFamilia));

    let lstFareBasis = this.lstFareBasis;
    lstFareBasis = [];

    const lcombinations = this.lstFamilyResult.lcombinations;

    requestFamilia.Lsections.forEach(function (sectionVal) {
      sectionVal.Lsegments.forEach(function (segmentVal) {
        segmentVal.LsegmentGroups.forEach(function (segmentGroupVal) {
          lstFareBasis.push(segmentGroupVal.FareBasis);
        });
      });
    });

    //PASO 1: identificar lo seleccionado en la section 0
    console.log("//PASO 1: identificar lo seleccionado en la section 0");
    let section0_fareBasis = [];
    requestFamilia.Lsections.forEach(function (sectionVal, indexSectionVal) {
      console.log("indexSectionVal: " + indexSectionVal);
      console.log("parseInt(section_): " + parseInt(section_));
      if (parseInt(section_) > indexSectionVal) {
        sectionVal.Lsegments.forEach(function (segmentVal, indexSegmentVal) {
          segmentVal.LsegmentGroups.forEach(function (segmentGroupVal) {
            section0_fareBasis.push(segmentGroupVal.FareBasis);
          });
        });
      }
      if (indexSectionVal === parseInt(section_)) {
        sectionVal.Lsegments.forEach(function (segmentVal, indexSegmentVal) {
          segmentVal.LsegmentGroups.forEach(function (
            segmentGroupVal,
            indexSegmentGroupVal
          ) {
            if (parseInt(segment_) >= indexSegmentGroupVal) {
              section0_fareBasis.push(segmentGroupVal.FareBasis);
            }
          });
        });
      }
    });
    console.log("section0_fareBasis: " + JSON.stringify(section0_fareBasis));

    //PASO 2: buscar esas sections en el listado de combinaciones
    console.log(
      "//PASO 2: buscar esas sections en el listado de combinaciones"
    );
    let lstCombinacionesSection = [];
    let flagSection0 = 0;
    const cantFareBasis = section0_fareBasis.length;
    lcombinations.forEach(function (combinacion, indexCombinacion) {
      const lbasisCombinations = combinacion.lbasisCombinations;
      flagSection0 = 0;
      lbasisCombinations.forEach(function (valor, indexValor) {
        if (cantFareBasis > indexValor) {
          const combSectionId = parseInt(valor.sectionId);
          const combSegmentId = parseInt(valor.segmentId);
          const radioSection = parseInt(section_) + 1;
          const radioSegment = parseInt(segment_) + 1;
          /*
          if (combSectionId === radioSection && combSegmentId === radioSegment) {
            if (valor.fareBasis == section0_fareBasis[indexValor]) {
              flagSection0++;
            }
          }
          */
          if (valor.fareBasis == section0_fareBasis[indexValor]) {
            flagSection0++;
          }
        }
      });
      if (flagSection0 === section0_fareBasis.length) {
        lstCombinacionesSection.push(combinacion);
      }
    });
    console.log(
      "lstCombinacionesSection: " + JSON.stringify(lstCombinacionesSection)
    );

    const grupoActual = "idSegment_" + (Number(section_) + 1);
    const grupoSiguiente = "idSegment_" + (Number(section_) + 2);
    console.log("grupoActual: " + grupoActual);
    console.log("grupoSiguiente: " + grupoSiguiente);
    //$("#" + grupoActual).hide();
    $("#" + grupoSiguiente).show();

    const arrowNext1 = "imgArrow1_" + (Number(section_) + 1);
    const arrowNext2 = "imgArrow2_" + (Number(section_) + 1);
    console.log("arrowNext1: " + arrowNext1);
    console.log("arrowNext2: " + arrowNext2);
    $("#" + arrowNext1).hide();
    $("#" + arrowNext2).show();

    //$("#imgArrow1_" + section_).show();
    //$("#imgArrow2_" + section_).hide();

    $("#divfamilia_" + (Number(section_) + 1)).hide();

    //PASO 3: hide los cards
    console.log("PASO 3: hide los cards");
    lstFamilyResult.lsections.forEach(function (section, indexSection) {
      if (indexSection === 0) {
        section.lsegments.forEach(function (segment, indexSegment) {
          if (indexSegment > 0) {
            //if (indexSegment > parseInt(segment_)) {
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
            //}
          }
        });
      }
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
    var flagExisteShow = 0;
    lstCombinacionesSection.forEach(function (valor, valorIndex) {
      const lbasisCombinations = valor.lbasisCombinations;
      lbasisCombinations.forEach(function (combi, combiIndex) {
        /*
        const combSectionId = parseInt(combi.sectionId);
        const combSegmentId = parseInt(combi.segmentId);
        if (combSectionId == 1) {
        }
        if (combi.sectionId > 1) {
          const cardId = 'cardId_' + combi.sectionId + '_' + combi.segmentId + '_' + combi.fareBasis;
          console.log("cardId show: " + cardId);
          $("#" + cardId).show();
          flagExisteShow = 1;
        }
        */
        const cardId =
          "cardId_" +
          combi.sectionId +
          "_" +
          combi.segmentId +
          "_" +
          combi.fareBasis;
        console.log("cardId show: " + cardId);
        $("#" + cardId).show();
        flagExisteShow = 1;
      });
    });

    if (flagExisteShow === 0) {
      $("#" + arrowNext1).hide();
      $("#" + arrowNext2).hide();
    }

    this.lstFareBasis = lstFareBasis;

    if (this.resultGetFareFamily()) {
      this.flagMsgErrorSelFam = false;
      this.sessionStorageService.store(
        "ss_FlightAvailability_request1",
        requestFamilia
      );
      this.sessionStorageService.store(
        "ss_FlightAvailability_request2",
        seccionvuelos
      );
      //this.flightAvailability(requestFamilia, null, 3, null, seccionvuelos);
    } else {
      this.vuelosComponent.spinner.hide();
      this.flagMsgErrorSelFam = true;
      this.famTotalFareAmount = 0;
      this.famFareAmountByPassenger = 0;
      this.flagMsgErrorSelFam = true;
    }
  }

  FlightPrice(request, seccionvuelos) {
    console.log("FlightPrice");
    this.vuelosComponent.spinner.show();
    console.log(request);
    let data = {
      NumberPassengers: request.NumberPassengers,
      CarrierId: request.CarrierId,
      Lsections: request.Lsections,
      Ocompany: request.Ocompany,
      osession: this.osessionflightaval,
      Gds: request.GDS,
      PSeudo: request.Pseudo,
    };
    console.log("data: " + JSON.stringify(data));
    this.airportService.FlightPrice(data).subscribe(
      (result) => {
        this.lsFlightAvailabilty = result;
        if (this.lsFlightAvailabilty.oerror !== null) {
          this.flagMsgErrorSelFam = true;
          this.famTotalFareAmount = 0;
          this.famFareAmountByPassenger = 0;
        }
        // this.sessionStorageService.store('ss_FlightAvailability_result', results);
        //  this.ObtenerSecciones();
        // this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
      },
      (error) => {},
      () => {
        this.vuelosComponent.spinner.hide();
        if (this.lsFlightAvailabilty.oerror === null) {
          this.famTotalFareAmount = this.lsFlightAvailabilty.totalFareAmount;
          this.famFareAmountByPassenger = this.lsFlightAvailabilty.fareAmountByPassenger;
          this.flagMsgErrorSelFam = false;
          this.sessionStorageService.store(
            "ss_FlightAvailability_request1",
            request
          );
          this.sessionStorageService.store(
            "ss_FlightAvailability_request2",
            seccionvuelos
          );
        }
      }
    );
  }

  flagCloseModal($event) {
    this.modalRef.hide();
  }

  openModalDsctCop(template: TemplateRef<any>) {
    this.modalRefDsctCorp = this.modalService.show(template);
  }

  getFareFamilyV2(dataPost, template, modalerror, templateSinFares) {
    console.log("getFareFamily");
    console.log("dataPost: " + JSON.stringify(dataPost));
    this.flagMsgErrorSelFam = false;
    this.vuelosComponent.spinner.show();
    this.ObtenerSecciones();
    this.dataRequestFamilia = dataPost;
    let dataflighavailability = this.ArmarSeccionesFlightAvailability();
    let datasecciones = this.ObtenerSecciones();
    //console.log('mis secciones completas:  ' + JSON.stringify(datasecciones));
    let flagResultFamilias = 0;
    //console.log("dataPost Family INI: " + JSON.stringify(dataPost));
    this.familyService.getFareFamily(dataPost).subscribe(
      (result) => {
        //console.log("result getFareFamily: " + JSON.stringify(result));
        if (result === null) {
          flagResultFamilias = 0;
        } else {
          this.lstFamilyResult = result;
          this.sessionStorageService.store(
            "ss_lstFamilyResult",
            this.lstFamilyResult
          );
          if (this.lstFamilyResult.lsections.length === 0) {
            flagResultFamilias = 0;
          } else {
            //this.resultGetFareFamily(this.lstFamilyResult);
            flagResultFamilias = 1;
            this.lstFamilyResult.lsections.forEach(function (
              section,
              indexSection
            ) {
              section.lsegments.forEach(function (segment, indexSegment) {
                segment.lfareFamilies.forEach(function (fare, indexFare) {
                  if (indexFare === 0) {
                    const fareFamilyName = fare.fareFamilyName;
                    dataflighavailability.Lsections[
                      indexSection
                    ].Lsegments[0].LsegmentGroups[
                      indexSegment
                    ].fareFamilyName = fareFamilyName;
                    datasecciones.Lsections[
                      indexSection
                    ].Lsegments[0].LsegmentGroups[
                      indexSegment
                    ].fareFamilyName = fareFamilyName;
                  }
                });
              });
            });
            //console.log("dataPost Family FIN: " + JSON.stringify(dataPost));
            this.requestFamilia = dataflighavailability;
            this.dataseccionesvuelos = datasecciones;
          }
        }
        this.flagResultFamilias = flagResultFamilias;
      },
      (err) => {
        console.log("ERROR: " + JSON.stringify(err));
        this.vuelosComponent.spinner.hide();
        this.modalerror = this.modalService.show(
          ModalErrorServiceComponent,
          this.config
        );
      },
      () => {
        //this.vuelosComponent.spinner.hide();

        const requestFamilia = this.requestFamilia;
        const lstFamilyResult = this.lstFamilyResult;

        if (lstFamilyResult === undefined) {
          //this.modalRefSessionExpired = this.modalService.show(ModalFamiliasVaciasComponent,this.config);
        } else {
          requestFamilia.Lsections.forEach(function (section, indexSection) {
            lstFamilyResult.lsections.forEach(function (
              section2,
              indexSection2
            ) {
              if (indexSection === indexSection2) {
                //const fff = section.Lsegments[0]
              }
            });
          });
        }

        console.log("flagResultFamilias: " + flagResultFamilias);
        console.log("flagResultFamilias: " + flagResultFamilias);
        console.log("flagResultFamilias: " + flagResultFamilias);
        console.log("flagResultFamilias: " + flagResultFamilias);
        console.log("flagResultFamilias: " + flagResultFamilias);
        console.log("flagResultFamilias: " + flagResultFamilias);
        console.log("flagResultFamilias: " + flagResultFamilias);
        if (flagResultFamilias === 1) {
          //vaidando
          let flagValFareFamilies = 1;
          const lsections = this.lstFamilyResult.lsections;
          lsections.forEach(function (section, indexSEction) {
            section.lsegments.forEach(function (segment, indexSegment) {
              if (segment.lfareFamilies.length === 0) {
                flagValFareFamilies = 0;
              }
            });
          });

          if (flagValFareFamilies === 1) {
            this.famTotalFareAmount = this.totalFareAmount;
            this.famFareAmountByPassenger = this.fareTaxAmountByPassenger;
            this.sessionStorageService.store(
              "ss_FlightAvailability_request1",
              dataflighavailability
            );
            this.vuelosComponent.spinner.hide();
            const configModalFam = {
              ignoreBackdropClick: true,
              keyboard: false,
            };
            this.modalRef = this.modalService.show(template, configModalFam);
            const modalWidth = "gray modal-lg";
            this.modalRef.setClass(modalWidth);
          } else {
            this.vuelosComponent.spinner.hide();
            this.modalRefSinFares = this.modalService.show(
              templateSinFares,
              Object.assign({}, { class: "gray modal-sm" })
            );
          }

          //this.flightAvailability(dataflighavailability, modalerror, 2, template, datasecciones);
        } else {
          this.vuelosComponent.spinner.hide();
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: "gray modal-lg sin-familias" })
          );
        }
      }
    );
  }

  resultGetFareFamily() {
    console.log("resultGetFareFamily");
    const lcombinations = this.lstFamilyResult.lcombinations;
    const lstFareBasis = this.lstFareBasis;
    console.log("lstFareBasis: " + JSON.stringify(lstFareBasis));
    let flagExistCount = 0;
    let flagExist = 0;
    let totalPrice = "";
    let currency = "";
    lcombinations.forEach(function (item, indexItem) {
      flagExistCount = 0;

      console.log("item.fareBasis: " + JSON.stringify(item.fareBasis));
      lstFareBasis.forEach(function (fareBasis, indexFareBasis) {
        /*
        if (fareBasis === item.fareBasis[indexFareBasis]) {
          flagExistCount++;
        }
        */
        if (fareBasis === item.lbasisCombinations[indexFareBasis].fareBasis) {
          flagExistCount++;
        }
      });

      console.log("item.fareBasis: " + item.fareBasis);

      if (flagExistCount === lstFareBasis.length) {
        flagExist = 1;
        totalPrice = item.totalPrice;
        currency = item.currency;
      }
    });

    console.log("flagExist: " + flagExist);

    if (flagExist === 1) {
      this.famTotalFareAmount = Number(totalPrice) * this.numberPassengers;
      this.currency = currency;
      this.famFareAmountByPassenger = Number(totalPrice);
      return true;
    } else {
      return false;
    }
  }
}
