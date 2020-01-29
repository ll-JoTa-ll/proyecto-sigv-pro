import {Component, OnInit, Input, TemplateRef, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { ISearchFlightModel } from '../../../../models/ISearchFlight.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { FamilyService } from '../../../../services/family.service';
import { VuelosComponent } from '../vuelos.component';
import { IFareFamilyModel } from '../../../../models/IFareFamily.model';
import { AirportService } from '../../../../services/airport.service';
import { IFlightAvailability } from 'src/app/models/IFlightAvailability';
import { Router } from '@angular/router';
import { IFamilyResultModel } from '../../../../models/IFamilyResult.model';
import { environment } from '../../../../../environments/environment';
import { IGetApprovers } from '../../../../models/IGetApprovers.model';
import { stringify } from '@angular/compiler/src/util';
import { ModalFamiliasVaciasComponent } from '../../../shared/modal-familias-vacias/modal-familias-vacias.component';
import { setInterval } from 'timers';
import { BoletosNousadosComponent } from '../boletos-nousados/boletos-nousados.component';
import { IBnusModel } from '../../../../models/Ibnus.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-recomendacion',
  templateUrl: './recomendacion.component.html',
  styleUrls: ['./recomendacion.component.sass']
})
export class RecomendacionComponent implements OnInit, AfterViewInit {

  modalRef: BsModalRef;
  modalRefPoliticas: BsModalRef;
  modalRefDsctCorp: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  @Input() index;
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

  segmentRadioCheckId;
  lstRadioCheck: any[] = [];
  loginDataUser;
  outSegmentCheck;

  //lstFamilyResult: IFareFamilyModel[] = [];
  lstFamilyResult: IFamilyResultModel;
  lsFlightAvailabilty: IFlightAvailability;
  flagResultFamilias: number;
  flagPseudoRepeat: boolean;
  lstPseudoRepeat: any[] = [];

  dataRequestFamilia;
  dataseccionesvuelos;
  famTotalFareAmount;
  famFareAmountByPassenger;
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
    "#C33C54"
  ];

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
    this.datosuser = this.sessionStorageService.retrieve('objusuarios');
  }

  ngOnInit() {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    const pseudoRepeat = this.pseudoRepeat;
    //console.log('pseudoRepeat: ' + pseudoRepeat);
    if (pseudoRepeat === null) {
      this.flagPseudoRepeat = false;
    } else {
      this.flagPseudoRepeat = true;
      if (pseudoRepeat.indexOf('-') >= 0) {
        const lstPseudoRepeat = pseudoRepeat.split('-');
        for (let i = 0; i < lstPseudoRepeat.length; i++) {
          lstPseudoRepeat[i] = lstPseudoRepeat[i] + '.png';
        }
        //console.log('lstPseudoRepeat: ' + lstPseudoRepeat);
        this.lstPseudoRepeat = lstPseudoRepeat;
      } else {
        let lstPseudoRepeat: any[] = [];
        lstPseudoRepeat.push(pseudoRepeat);
        for (let i = 0; i < lstPseudoRepeat.length; i++) {
          lstPseudoRepeat[i] = lstPseudoRepeat[i] + '.png';
        }
        //console.log('lstPseudoRepeat: ' + lstPseudoRepeat);
        this.lstPseudoRepeat = lstPseudoRepeat;
      }
    }
  }

  ngAfterViewInit() {
  }

  openModal(template: TemplateRef<any>, recommendationId, modalerror) {
    let Lsections_: any[] = [];
    const lstRadioCheck = this.lstRadioCheck;
    let idVal = 1;
    lstRadioCheck.forEach(function(item) {
      const sectionId = item.sectionId_;
      const segmentId = item.segmentId_;
      const segmentIndex = item.segmentIndex_;
      const recommendationId = item.recommendationId_;
      const section = item.section_;
      const segment = item.segment_;

      //LsegmentGroups
      let LsegmentGroups_: any[] = [];
      segment.lSegmentGroups.forEach(function(group, i) {
        const dataGroup = {
          Id: idVal,
          ClassId: section.lSectionGroups[i].classId,
          DepartureDate: group.departureDate,
          TimeOfDeparture: group.timeOfDeparture,
          ArrivalDate: group.arrivalDate,
          TimeOfArrival: group.timeOfArrival,
          Origin: group.origin,
          Destination: group.destination,
          MarketingCarrier: group.marketingCarrier,
          FlightOrtrainNumber: group.flightOrtrainNumber,
          EquipmentType: group.equipmentType,
          FareBasis: section.lSectionGroups[i].fareBasis,
          CabinId: section.lSectionGroups[i].cabinId,
          CabinDescription: section.lSectionGroups[i].cabinDescription,
          TimeWaitAirport: group.timeWaitAirport,
          fareFamilyName: ""
        };
        LsegmentGroups_.push(dataGroup);
        idVal++;
      });

      //Lsegments
      let Lsegments_: any[] = [];
      const lsegment = {
        SegmentID: segment.segmentId,
        FareType: section.lSectionGroups[0].fareType,
        TotalFlightTime: segment.totalFlightTime,
        LsegmentGroups: LsegmentGroups_
      };
      Lsegments_.push(lsegment);

      //Lsections
      const lsection = {
        SectionID: section.sectionId,
        Origin: section.origin,
        Destination: section.destination,
        Lsegments: Lsegments_
      };
      Lsections_.push(lsection);
    });

    Lsections_ = Lsections_.sort((a, b) => a.sectionId - b.sectionId);

    let dataFamilias = {
      NumberPassengers: this.numberPassengers,
      Currency: this.currency,
      CarrierId: this.carrierId,
      Lsections: Lsections_,
      Ocompany: this.loginDataUser.ocompany,
      Gds: this.gds,
      PSeudo: this.pseudo
    };
    this.requestFamilia = dataFamilias;
    this.getFareFamily(dataFamilias, template, modalerror);
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
      flag: 1
    };

    if (this.lstRadioCheck.length === 0) {
      this.lstRadioCheck.push(dataRadioSel);
    } else {
      this.lstRadioCheck.forEach(function(item) {
        if (item.recommendationId_ === recommendationId && item.sectionId_ === section.sectionId) {
          item.flag = 0;
        }
      });

      this.lstRadioCheck.push(dataRadioSel);
      this.lstRadioCheck = this.lstRadioCheck.filter(x => x.flag === 1);
    }
  }

  ArmarSeccionesFlightAvailability() {
    let Lsections_: any[] = [];
    let datosusuario: any[] = [];
    const lstRadioCheck = this.lstRadioCheck;
    lstRadioCheck.sort((a, b) => a.sectionId_ - b.sectionId_);
    this.lstRadioCheck = lstRadioCheck;
    lstRadioCheck.forEach(function(item) {
      const sectionId = item.sectionId_;
      const segmentId = item.segmentId_;
      const segmentIndex = item.segmentIndex_;
      const recommendationId = item.recommendationId_;
      const section = item.section_;
      const segment = item.segment_;

      //LsegmentGroups
      let LsegmentGroups_: any[] = [];
      segment.lSegmentGroups.forEach(function(group, i) {
        const dataGroup = {
          Id: i + 1,
          ClassId: section.lSectionGroups[i].classId,
          CabinId: section.lSectionGroups[i].cabinId,
          CabinDescription: section.lSectionGroups[i].cabinDescription,
          DepartureDate: group.departureDate,
          TimeOfDeparture: group.timeOfDeparture,
          ArrivalDate: group.arrivalDate,
          TimeOfArrival: group.timeOfArrival,
          Origin: group.origin,
          Destination: group.destination,
          MarketingCarrier: group.marketingCarrier,
          FlightOrtrainNumber: group.flightOrtrainNumber,
          EquipmentType: group.equipmentType,
          FareBasis: section.lSectionGroups[i].fareBasis,
          TimeWaitAirport: group.timeWaitAirport,
          fareFamilyName: "",
          TotalFlightTimeShow: group.totalFlightTimeShow
        };
        LsegmentGroups_.push(dataGroup);
      });

      //Lsegments
      let Lsegments_: any[] = [];
      const lsegment = {
        SegmentID: segment.segmentId,
        FareType: section.lSectionGroups[0].fareType,
        TotalFlightTime: segment.totalFlightTime,
        LsegmentGroups: LsegmentGroups_
      };
      Lsegments_.push(lsegment);

      //Lsections
      const lsection = {
        SectionID: section.sectionId,
        Origin: section.origin,
        Destination: section.destination,
        Lsegments: Lsegments_,
        DepartureDate: section.departureDate
      };
      Lsections_.push(lsection);
    });


    console.log(this.datosuser);
    this.datosuser.forEach(function(item, index) {
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
      hora =  recorte[1];
      fechaformat = fecha.split("-");
      dia = fechaformat[2];
      mes = fechaformat[1];
      año = fechaformat[0];
      fechatotal = año + '/' + mes + '/' + dia;
    //let fecha = this.Formatearfecha(item.birthDate);
      const obj = {
          "UserId": item.userId,
          "PassengerId": index + 1,
          "PersonId": item.personId,
          "Name": item.firstName,
          "LastName": item.lastName,
          "Gender": item.gender,
          "PhoneNumber": item.phone,
          "Email": item.email,
          "BirthDate": fechatotal,
          "Odocument": item.odocument,
          "FrequentFlyer": item.frequentFlyer,
          "IsVIP": item.isVIP,
          "LcostCenter": item.lcostCenter,
          "Type": "ADT",
          "Orole": item.orole
         };
      datosusuario.push(obj);
    });
    console.log(datosusuario);
    let infraction;

    if (this.lpolicies.length > 0) {
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
      Lpolicies: this.lpolicies
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
      result => {
        //console.log("result getFareFamily: " + JSON.stringify(result));
        if (result === null) {
          flagResultFamilias = 0;
        } else {
          this.lstFamilyResult = result;
          this.sessionStorageService.store('ss_lstFamilyResult', this.lstFamilyResult);
          if (this.lstFamilyResult.lsections.length === 0) {
            flagResultFamilias = 0;
          } else {
            flagResultFamilias = 1;
            this.lstFamilyResult.lsections.forEach(function(section, indexSection) {
              section.lsegments.forEach(function(segment, indexSegment) {
                segment.lfareFamilies.forEach(function(fare, indexFare) {
                  if (indexFare === 0) {
                    const fareFamilyName = fare.fareFamilyName;
                    dataflighavailability.Lsections[indexSection].Lsegments[0].LsegmentGroups[indexSegment].fareFamilyName = fareFamilyName;
                    datasecciones.Lsections[indexSection].Lsegments[0].LsegmentGroups[indexSegment].fareFamilyName = fareFamilyName;
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
      err => {
        console.log('ERROR: ' + JSON.stringify(err));
        this.vuelosComponent.spinner.hide();
      },
      () => {
        //this.vuelosComponent.spinner.hide();

        const requestFamilia = this.requestFamilia;
        const lstFamilyResult = this.lstFamilyResult;


        if (lstFamilyResult === undefined) {
          //this.modalRefSessionExpired = this.modalService.show(ModalFamiliasVaciasComponent,this.config);
        }else{

          requestFamilia.Lsections.forEach(function (section, indexSection) {
            lstFamilyResult.lsections.forEach(function (section2, indexSection2) {
              if (indexSection === indexSection2) {
                //const fff = section.Lsegments[0]
              }
            });
          });
        }


        if (flagResultFamilias === 1) {
          this.flightAvailability(dataflighavailability, modalerror, 2, template, datasecciones);
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
            Object.assign({}, { class: 'gray modal-lg sin-familias' })
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
    hora =  recorte[1];
    fechaformat = fecha.split("-");
    dia = fechaformat[2];
    mes = fechaformat[1];
    año = fechaformat[0];
    fechatotal = año + '/' + mes + '/' + dia;
    hora = hora.substr(0,5);
    fechafinal = fechatotal;
    return fechafinal;
  }

  getFlightAvailability(recommendationId, template: TemplateRef<any>) {
    // tslint:disable-next-line: max-line-length
    let Lsections_: any[] = [];
    let datosusuario: any[] = [];
    const lstRadioCheck = this.lstRadioCheck;
    lstRadioCheck.sort((a, b) => a.sectionId_ - b.sectionId_);
    this.lstRadioCheck = lstRadioCheck;
    lstRadioCheck.forEach(function(item) {
      const sectionId = item.sectionId_;
      const segmentId = item.segmentId_;
      const segmentIndex = item.segmentIndex_;
      const recommendationId = item.recommendationId_;
      const section = item.section_;
      const segment = item.segment_;

      //LsegmentGroups
      let LsegmentGroups_: any[] = [];
      segment.lSegmentGroups.forEach(function(group, i) {
        const dataGroup = {
          Id: i + 1,
          ClassId: section.lSectionGroups[i].classId,
          CabinId: section.lSectionGroups[i].cabinId,
          CabinDescription: section.lSectionGroups[i].cabinDescription,
          DepartureDate: group.departureDate,
          TimeOfDeparture: group.timeOfDeparture,
          ArrivalDate: group.arrivalDate,
          TimeOfArrival: group.timeOfArrival,
          Origin: group.origin,
          Destination: group.destination,
          MarketingCarrier: group.marketingCarrier,
          FlightOrtrainNumber: group.flightOrtrainNumber,
          EquipmentType: group.equipmentType,
          FareBasis: section.lSectionGroups[i].fareBasis,
          TimeWaitAirport: group.timeWaitAirport,
          fareFamilyName: "",
          TotalFlightTimeShow: group.totalFlightTimeShow
        };
        LsegmentGroups_.push(dataGroup);
      });

      //Lsegments
      let Lsegments_: any[] = [];
      const lsegment = {
        SegmentID: segment.segmentId,
        FareType: section.lSectionGroups[0].fareType,
        TotalFlightTime: segment.totalFlightTime,
        LsegmentGroups: LsegmentGroups_
      };
      Lsegments_.push(lsegment);

      //Lsections
      const lsection = {
        SectionID: section.sectionId,
        Origin: section.origin,
        Destination: section.destination,
        Lsegments: Lsegments_,
        DepartureDate: section.departureDate
      };
      Lsections_.push(lsection);
    });


    console.log(this.datosuser);
    this.datosuser.forEach(function(item, index) {
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
      hora =  recorte[1];
      fechaformat = fecha.split("-");
      dia = fechaformat[2];
      mes = fechaformat[1];
      año = fechaformat[0];
      fechatotal = año + '/' + mes + '/' + dia;  
     // let fecha = this.Formatearfecha(item.birthDate);
      const obj = {
          "UserId": item.userId,
          "PassengerId": index + 1,
          "PersonId": item.personId,
          "Name": item.firstName,
          "LastName": item.lastName,
          "Gender": item.gender,
          "PhoneNumber": item.phone,
          "Email": item.email,
          "BirthDate": fechatotal,
          "Odocument": item.odocument,
          "FrequentFlyer": item.frequentFlyer,
          "IsVIP": item.isVIP,
          "LcostCenter": item.lcostCenter,
          "Type": "ADT",
          "Orole": item.orole
         };
         datosusuario.push(obj);
    });
    console.log(datosusuario);
    let infraction;

    if (this.lpolicies.length > 0) {
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
      Lpolicies: this.lpolicies
    };
    this.sessionStorageService.store('ss_FlightAvailability_request1', dataFamilias);
    this.flightAvailability(dataFamilias, template, 1, null, null);
  }

  ObtenerSecciones() {
    let Lsections_: any[] = [];
    const lstRadioCheck = this.lstRadioCheck;
    lstRadioCheck.forEach(function(item) {
      const sectionId = item.sectionId_;
      const segmentId = item.segmentId_;
      const segmentIndex = item.segmentIndex_;
      const recommendationId = item.recommendationId_;
      const section = item.section_;
      const segment = item.segment_;

      //LsegmentGroups
      let LsegmentGroups_: any[] = [];
      segment.lSegmentGroups.forEach(function(group, i) {
        const dataGroup = {
          ClassId: section.lSectionGroups[i].classId,
          DepartureDate: group.departureDate,
          TimeOfDeparture: group.timeOfDeparture,
          TimeOfDepartureShow: group.timeOfDepartureShow,
          ArrivalDate: group.arrivalDate,
          ArrivalDateShow: group.arrivalDateShow,
          DepartureDateShow: group.departureDateShow,
          TimeOfArrival: group.timeOfArrival,
          TimeOfArrivalShow: group.timeOfArrivalShow,
          Origin: group.origin,
          Destination: group.destination,
          MarketingCarrier: group.marketingCarrier,
          FlightOrtrainNumber: group.flightOrtrainNumber,
          EquipmentType: group.equipmentType,
          FareBasis: section.lSectionGroups[i].fareBasis,
          TotalFlightTimeShow: group.totalFlightTimeShow,
          CityOrigin: group.cityOrigin,
          CityDestination: group.cityDestination,
          CarrierName: group.carrierName,
          AirportOrigin: group.airportOrigin,
          AirportDestination: group.airportDestination,
          CabinDescription: section.lSectionGroups[i].cabinDescription,
          TimeWaitAirport: group.timeWaitAirport,
          DateVariation: group.dateVariation,
          fareFamilyName: ""
        };
        LsegmentGroups_.push(dataGroup);
      });

      //Lsegments
      let Lsegments_: any[] = [];
      const lsegment = {
        SegmentID: segment.segmentId,
        FareType: section.lSectionGroups[0].fareType,
        TotalFlightTime: segment.totalFlightTime,
        TotalFlightTimeShow: segment.totalFlightTimeShow,
        LsegmentGroups: LsegmentGroups_
      };
      Lsegments_.push(lsegment);

      //Lsections
      const lsection = {
        SectionID: section.sectionId,
        Origin: section.origin,
        Destination: section.destination,
        AirportDestination: section.airportDestination,
        AirportOrigin: section.airportOrigin,
        DepartureDateShow: section.departureDateShow,
        BagAllowed: section.bagAllowed,
        BagQuantity: section.bagQuantity,
        Lsegments: Lsegments_
      };


      Lsections_.push(lsection);
    });

    let dataFamilias = {
      NumberPassengers: this.numberPassengers,
      Currency: this.currency,
      CarrierId: this.carrierId,
      Lsections: Lsections_,
      lpolicies: this.lpolicies,
      Ocompany: this.loginDataUser.ocompany,
      Gds: this.gds,
      Pseudo: this.pseudo,
      FlightNational: this.flightNational,
      RecommendationId: this.recommendationId
    };
    this.sessionStorageService.store('ss_FlightAvailability_request2', dataFamilias);

    return dataFamilias;

  }

  GetUsers() {
    let data = {
      Id: this.loginDataUser.userId
    }
    let objuser;
    this.airportService.GetUser(data.Id).subscribe(
      results => {
        objuser = results;
        this.datosuser.push(objuser);
        this.sessionStorageService.store('objusuarios', this.datosuser);
      },
      err => {
        
      },
      () => {
       // this.TraerAutorizador();
      }
    );
}

TraerAutorizador() {
  let infraction;
  if (this.lpolicies.length > 0) {
    infraction = true;
  } else {
    infraction = false;
  }

  let datosusuario: any[] = [];
  this.datosuser.forEach(function(item) {
    let prefix;
    if (item.gender === 'M') {
      prefix = 'MR';
    } else {
      prefix = 'MRS';
    }
    let fechatotal;
    let fecha = item.birthDate.substr(0, 10);
    let fechaformat = fecha.split('-');
    let año = fechaformat[0];
    let mes = fechaformat[1];
    let dia = fechaformat[2];
    fechatotal = año + '/' + mes + '/' + dia;
    const objuser = {
        "PassengerId": 1,
        "PersonId": item.personId,
        "Prefix": prefix,
        "Type": "ADT",
        "Name": item.firstName,
        "LastName": item.lastName,
        "Gender": item.gender,
        "BirthDate": fechatotal,
        "Odocument": item.odocument,
        "FrequentFlyer": item.frequentFlyer,
        "IsVIP": item.isVIP,
        "lcostCenter": item.lcostCenter
       };
    datosusuario.push(objuser);
  });

  let data = {
    "Ocompany": this.loginDataUser.ocompany,
    "FlightNational": this.flightNational,
    'Infraction': infraction,
    "Lpassenger": datosusuario
  };

  this.airportService.GetApprovers(data).subscribe(
    results => {
      this.lsapprovers = results;
      this.sessionStorageService.store('lsapprover', null);
      this.sessionStorageService.store('lsapprover', this.lsapprovers);
    },
    err => {
    
    }
  );
}

  flightAvailability(data, template, tipo, modalFam, dataseccion) {
    this.vuelosComponent.spinner.show();
    if (tipo === 1) {
      // tslint:disable-next-line: max-line-length
      this.TraerAutorizador();
    }
    // tslint:disable-next-line: max-line-length
    let flagResult = 0;
    this.airportService.fligthAvailibility(data).subscribe(
      results => {
        if (results.oerror === null) {
          this.lsFlightAvailabilty = results;
          this.osessionflightaval = this.lsFlightAvailabilty.osession;
          this.sessionStorageService.store('ss_FlightAvailability_result', this.lsFlightAvailabilty);
          this.ObtenerSecciones();
          this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
          //this.router.navigate(['/reserva-vuelo']);
          flagResult = 1;
        } else {
          if (tipo === 1 || tipo === 2) {
            this.modalRef = this.modalService.show(
              template,
              Object.assign({}, { class: 'gray modal-lg sin-familias' })
            );
          }
        }
      },
      err => {
        this.vuelosComponent.spinner.hide();
      },
      () => {
        this.vuelosComponent.spinner.hide();
        if (flagResult === 1) {
          if (tipo === 1) {
            // tslint:disable-next-line: max-line-length
            // tslint:disable-next-line: max-line-length
            this.router.navigate(['/reserva-vuelo']);
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
            this.sessionStorageService.store('ss_FlightAvailability_request1', data);
            this.sessionStorageService.store('ss_FlightAvailability_request2', dataseccion);
            this.famTotalFareAmount = this.lsFlightAvailabilty.totalFareAmount;
            this.famFareAmountByPassenger = this.lsFlightAvailabilty.fareAmountByPassenger;
            this.flagMsgErrorSelFam = false;
            this.modalRef = this.modalService.show(
              modalFam,
              Object.assign({}, { class: 'gray modal-lg' })
            );
          }

          if (tipo === 3) {
            this.famTotalFareAmount = this.lsFlightAvailabilty.totalFareAmount;
            this.famFareAmountByPassenger = this.lsFlightAvailabilty.fareAmountByPassenger;
            this.flagMsgErrorSelFam = false;
            this.sessionStorageService.store('ss_FlightAvailability_request1', data);
            this.sessionStorageService.store('ss_FlightAvailability_request2', dataseccion);
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
      Object.assign({}, { class: 'gray con-politicas' })
    );
  }

  closeModalFamilia($event) {
    this.modalRef.hide();
  }

  closeModal() {
    this.modalRef.hide();
    this.datosuser = [];
    this.sessionStorageService.store('objusuarios', null);
  }

  famFlightAvailability($event) {
    const obj = $event.split('_');
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
    lstFamilyResult.lsections.forEach(function(section, indexSection) {
      if (indexSection == section_) {
        section.lsegments.forEach(function(segment, indexSegment) {
          if (indexSegment == segment_) {
            segment.lfareFamilies.forEach(function(fare, indexFare) {
              let idSecuencial = indexSection + "_" + indexSegment + "_" + (indexFare + 1);
              //console.log("idSecuencial: " + idSecuencial);
              $("#idRadioFam_" + idSecuencial).prop("checked", false);
              $('#idNameFamilyName_' + idSecuencial).css({'background-color': '#C6C6C6'});
            });
          }
        });
      }
    });


    //segment seleccionado guardamos valores y pintamos cabezera y seleccionamos radio
    //console.log("segment seleccionado guardamos valores y pintamos cabezera y seleccionamos radio");
    lstFamilyResult.lsections.forEach(function(section, indexSection) {
      section.lsegments.forEach(function(segment, indexSegment) {
        if (indexSection == section_) {
          segment.lfareFamilies.forEach(function(fare, indexFare) {
            if (indexSection == section_) {
              if (indexSegment == segment_) {
                if (indexFare == index_ - 1) {
                  fareBasis = fare.fareBasis;
                  classId = fare.classId;
                  fareFamilyName = fare.fareFamilyName;

                  let idSecuencial = indexSection + "_" + indexSegment + "_" + (indexFare + 1);
                  //console.log("idSecuencial: " + idSecuencial);
                  $("#idRadioFam_" + idSecuencial).prop("checked", true);
                  $('#idNameFamilyName_' + idSecuencial).css({'background-color': colorsFare[index_]});

                  //console.log("classId: " + classId);
                  //console.log("classId: " + classId);
                  //console.log("classId: " + classId);

                  requestFamilia.Lsections[section_].Lsegments[0].LsegmentGroups[segment_].ClassId = classId;
                  requestFamilia.Lsections[section_].Lsegments[0].LsegmentGroups[segment_].FareBasis = fareBasis;
                  requestFamilia.Lsections[section_].Lsegments[0].LsegmentGroups[segment_].fareFamilyName = fareFamilyName;

                  /*
                  group.ClassId = classId;
                  group.FareBasis = fareBasis;
                  group.fareFamilyName = fareFamilyName;
                  */

                  seccionvuelos.Lsections[section_].Lsegments[0].LsegmentGroups[segment_].ClassId = classId;
                  seccionvuelos.Lsections[section_].Lsegments[0].LsegmentGroups[segment_].FareBasis = fareBasis;
                  seccionvuelos.Lsections[section_].Lsegments[0].LsegmentGroups[segment_].fareFamilyName = fareFamilyName;
                }
              }
            }
          });
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

    lstFamilyResult.lsections.forEach(function(section, indexSection) {
      section.lsegments.forEach(function(segment, indexSegment) {
        if (indexSection == section_) {
          segment.lfareFamilies.forEach(function(fare, indexFare) {
            //
          });
        }
      });
    });

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
                //segment.lfareFamilies[index_ - 1].fareBasis = fareBasis;
                //segment.lfareFamilies[index_ - 1].fareBasis = classId;
                //segment.lfareFamilies[index_ - 1].fareFamilyName = fareFamilyName;
                //console.log("idSecuencial: " + idSecuencial);
                //$("#idRadioFam_" + idSecuencial).prop("checked", true);
                //$('#idNameFamilyName_' + idSecuencial).css({'background-color': colorsFare[index_]});
              }

            });
            if (flagFareComp === 1) {
              segment.lfareFamilies.forEach(function(fare, indexFare) {
                let idSecuencial = indexSection + "_" + indexSegment + "_" + (indexFare + 1);
                $("#idRadioFam_" + idSecuencial).prop("checked", false);
                $('#idNameFamilyName_' + idSecuencial).css({'background-color': '#C6C6C6'});
                const fareBasisNew = fare.fareBasis;
                if (fareBasis == fareBasisNew) {
                  flagFareComp = 1;
                  $("#idRadioFam_" + idSecuencial).prop("checked", true);
                  $('#idNameFamilyName_' + idSecuencial).css({'background-color': colorsFare[index_]});
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

    //console.log("flagFareBasisVal: " + flagFareBasisVal);
    //$('#' + this.idRadioBtn + '_' + this.sectionIndex + '_' + this.segmentIndex + '_' + this.fareFamilyIndex).prop("checked", true);
    if (flagFareBasisVal === 1) {
      /*
      console.log("Todas las cabeceras del section blancas");
      lstFamilyResult.lsections.forEach(function(section, indexSection) {
        if (indexSection == section_) {
          section.lsegments.forEach(function(segment, indexSegment) {
            segment.lfareFamilies.forEach(function(fare, indexFare) {
              let idSecuencial = indexSection + "_" + indexSegment + "_" + (indexFare + 1);
              console.log("idSecuencial: " + idSecuencial);
              $("#idRadioFam_" + idSecuencial).prop("checked", false);
              $('#idNameFamilyName_' + idSecuencial).css({'background-color': '#C6C6C6'});
            });
          });
        }
      });
      */

      /*
      console.log("pintar las cabeceras correspondientes");
      lstFamilyResult.lsections.forEach(function(section, indexSection) {
        if (indexSection == section_) {
          section.lsegments.forEach(function(segment, indexSegment) {
            segment.lfareFamilies[index_ - 1].fareBasis = fareBasis;
            segment.lfareFamilies[index_ - 1].fareBasis = classId;
            segment.lfareFamilies[index_ - 1].fareFamilyName = fareFamilyName;
            let idSecuencial = indexSection + "_" + indexSegment + "_" + index_;
            console.log("idSecuencial: " + idSecuencial);
            $("#idRadioFam_" + idSecuencial).prop("checked", true);
            $('#idNameFamilyName_' + idSecuencial).css({'background-color': colorsFare[index_]});
          });
        }
      });
      */
    } else {
      //console.log("cuando son diferentes fareBasis")
      //$("#idRadioFam_" + section_ + "_" + segment_ + "_" + index_).prop("checked", true);
    }

    /*
    requestFamilia.Lsections.forEach(function(section, indexSection) {
      section.Lsegments.forEach(function(segment, indexSegment) {
        segment.LsegmentGroups.forEach(function(group, indexGroup) {
          if (indexSection == section_) {
            if (indexSegment == 0) {
              if (indexGroup == segment_) {
                group.ClassId = classId;
                group.FareBasis = fareBasis;
                group.fareFamilyName = fareFamilyName;
              }
            }
          }
        });
      });
    });
    */

    /*
    seccionvuelos.Lsections.forEach(function(section, indexSection) {
      section.Lsegments.forEach(function(segment, indexSegment) {
        segment.LsegmentGroups.forEach(function(group, indexGroup) {
          if (indexSection == section_) {
            if (indexSegment == 0) {
              if (indexGroup == segment_) {
                group.ClassId = classId;
                group.FareBasis = fareBasis;
                group.fareFamilyName = fareFamilyName;
              }
            }
          }
        });
      });
    });
    */
    //console.log("requestFamiliaRadio: " + JSON.stringify(requestFamilia));

 //   this.flightAvailability(requestFamilia, null, 3, null, seccionvuelos);
    this.FlightPrice(requestFamilia, seccionvuelos);
  }

  FlightPrice(request, seccionvuelos) {
     this.vuelosComponent.spinner.show();
     console.log(request);
     let data = {
      "NumberPassengers": request.NumberPassengers,
      "CarrierId": request.CarrierId,
      "Lsections": request.Lsections,
      "Ocompany": request.Ocompany,
      "osession": this.osessionflightaval,
      "Gds": request.GDS,
      "PSeudo": request.Pseudo
     }
     this.airportService.FlightPrice(data).subscribe(
       result => {
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
       error => {

       },
       () => {
         this.vuelosComponent.spinner.hide();
         if (this.lsFlightAvailabilty.oerror === null) {
          this.famTotalFareAmount = this.lsFlightAvailabilty.totalFareAmount;
          this.famFareAmountByPassenger = this.lsFlightAvailabilty.fareAmountByPassenger;
          this.flagMsgErrorSelFam = false;
          this.sessionStorageService.store('ss_FlightAvailability_request1', request);
          this.sessionStorageService.store('ss_FlightAvailability_request2', seccionvuelos);
         }
       }
     )
  }

  flagCloseModal($event) {
    this.modalRef.hide();
  }

  openModalDsctCop(template: TemplateRef<any>) {
    this.modalRefDsctCorp = this.modalService.show(template);
  }
}
