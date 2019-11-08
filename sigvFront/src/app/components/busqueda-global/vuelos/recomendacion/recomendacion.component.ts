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

@Component({
  selector: 'app-recomendacion',
  templateUrl: './recomendacion.component.html',
  styleUrls: ['./recomendacion.component.sass']
})
export class RecomendacionComponent implements OnInit, AfterViewInit {

  modalRef: BsModalRef;
  modalRefPoliticas: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

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
  famTotalFareAmount;
  famFareAmountByPassenger;
  requestFamilia;
  flagMsgErrorSelFam: boolean;

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

  openModal(template: TemplateRef<any>, recommendationId, modalerror) {

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
          ArrivalDate: group.arrivalDate,
          TimeOfArrival: group.timeOfArrival,
          Origin: group.origin,
          Destination: group.destination,
          MarketingCarrier: group.marketingCarrier,
          FlightOrtrainNumber: group.flightOrtrainNumber,
          EquipmentType: group.equipmentType,
          FareBasis: section.lSectionGroups[i].fareBasis
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
        Lsegments: Lsegments_
      };
      Lsections_.push(lsection);
    });

    Lsections_ = Lsections_.sort((a, b) => a.sectionId - b.sectionId);

    let dataFamilias = {
      NumberPassengers: this.numberPassengers,
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

  getFareFamily(dataPost, template, modalerror) {
    console.log('familia dataPost: ' + JSON.stringify(dataPost));
    this.vuelosComponent.spinner.show();
    this.ObtenerSecciones();
    this.dataRequestFamilia = dataPost;
    let flagResultFamilias = 0;
    this.familyService.getFareFamily(dataPost).subscribe(
      result => {
        console.log('result: ' + JSON.stringify(result));
        if (result === null) {
          flagResultFamilias = 0;
        } else {
          this.lstFamilyResult = result;
          if (this.lstFamilyResult.lsections.length === 0) {
            flagResultFamilias = 0;
          } else {
            flagResultFamilias = 1;
          }
        }
        this.flagResultFamilias = flagResultFamilias;
      },
      err => {
        console.log('ERROR: ' + JSON.stringify(err));
        this.vuelosComponent.spinner.hide();
      },
      () => {
        console.log('getFareFamily completado');
        this.vuelosComponent.spinner.hide();
        if (flagResultFamilias === 1) {
          this.flightAvailability(dataPost, modalerror, 2, template);
          /*
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
          );
          */
        } else {
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg sin-familias' })
          );
        }
      }
    );
  }

  getFlightAvailability(recommendationId, template: TemplateRef<any>) {
    console.log("getFlightAvailability");
    let Lsections_: any[] = [];
    const lstRadioCheck = this.lstRadioCheck;
    console.log(JSON.stringify(lstRadioCheck));
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
          TimeWaitAirport: group.timeWaitAirport
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
        Lsegments: Lsegments_
      };
      Lsections_.push(lsection);
    });

    let dataFamilias = {
      NumberPassengers: this.numberPassengers,
      Currency: this.currency,
      CarrierId: this.carrierId,
      Lsections: Lsections_,
      Ocompany: this.loginDataUser.ocompany,
      Gds: this.gds,
      PSeudo: this.pseudo
    };
    console.log(JSON.stringify(dataFamilias));
    this.sessionStorageService.store('ss_FlightAvailability_request1', dataFamilias);
    this.flightAvailability(dataFamilias, template, 1, null);
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
          DateVariation: group.dateVariation
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
      FlightNational: this.flightNational
    };
    this.sessionStorageService.store('ss_FlightAvailability_request2', dataFamilias);

  }

  flightAvailability(data, template, tipo, modalFam) {
    this.vuelosComponent.spinner.show();
    let flagResult = 0;
    this.airportService.fligthAvailibility(data).subscribe(
      results => {
        if (results.oerror === null) {
          this.lsFlightAvailabilty = results;
          this.sessionStorageService.store('ss_FlightAvailability_result', results);
          this.ObtenerSecciones();
          this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
          //this.router.navigate(['/reserva-vuelo']);
          flagResult = 1;
        } else {
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg sin-familias' })
          );
        }
      },
      err => {
        console.log('ERROR: ' + JSON.stringify(err));
        this.vuelosComponent.spinner.hide();
      },
      () => {
        this.vuelosComponent.spinner.hide();
        if (flagResult === 1) {
          if (tipo === 1) {
            this.router.navigate(['/reserva-vuelo']);
          }

          if (tipo === 2) {
            this.sessionStorageService.store('ss_FlightAvailability_request1', data);
            console.log('this.lsFlightAvailabilty.fareAmountByPassenger: ' + this.lsFlightAvailabilty.fareAmountByPassenger);
            console.log('this.lsFlightAvailabilty.totalFareAmount: ' + this.lsFlightAvailabilty.totalFareAmount);
            this.famTotalFareAmount = this.lsFlightAvailabilty.totalFareAmount;
            this.famFareAmountByPassenger = this.lsFlightAvailabilty.fareAmountByPassenger;
            this.flagMsgErrorSelFam = false;
            console.log('this.flagMsgErrorSelFam: ' + this.flagMsgErrorSelFam);
            this.modalRef = this.modalService.show(
              modalFam,
              Object.assign({}, { class: 'gray modal-lg' })
            );
          }

          if (tipo === 3) {
            console.log('this.lsFlightAvailabilty.fareAmountByPassenger: ' + this.lsFlightAvailabilty.fareAmountByPassenger);
            console.log('this.lsFlightAvailabilty.totalFareAmount: ' + this.lsFlightAvailabilty.totalFareAmount);
            this.famTotalFareAmount = this.lsFlightAvailabilty.totalFareAmount;
            this.famFareAmountByPassenger = this.lsFlightAvailabilty.fareAmountByPassenger;
            this.flagMsgErrorSelFam = false;
            this.sessionStorageService.store('ss_FlightAvailability_request1', data);
            console.log('this.lsFlightAvailabilty: ' + this.lsFlightAvailabilty);
          }
        } else {
          if (tipo === 3) {
            console.log('TIPO 3');
            this.famTotalFareAmount = 0;
            this.famFareAmountByPassenger = 0;
            this.flagMsgErrorSelFam = true;
          }
        }
      }
    );
  }

  ngAfterViewInit() {
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

  famFlightAvailability($event) {
    const obj = $event.split('_');
    const section_ = obj[1];
    const segment_ = obj[2];
    const index_ = obj[3];
    console.log('section_: ' + section_);
    console.log('segment_: ' + segment_);
    console.log('index_: ' + index_);
    const requestFamilia = this.requestFamilia;
    const lstFamilyResult = this.lstFamilyResult;
    let fareBasis = "";
    let classId = "";
    console.log('lstFamilyResult INI: ' + JSON.stringify(lstFamilyResult));
    console.log('requestFamilia INI: ' + JSON.stringify(requestFamilia));
    lstFamilyResult.lsections.forEach(function(section, indexSection) {
      section.lsegments.forEach(function(segment, indexSegment) {
        segment.lfareFamilies.forEach(function(fare, indexFare) {
          if (indexSection == section_) {
            if (indexSegment == segment_) {
              if (indexFare == index_ - 1) {
                fareBasis = fare.fareBasis;
                classId = fare.classId;
              }
            }
          }
        });
      });
    });
    console.log('fareBasis: ' + fareBasis);
    console.log('classId: ' + classId);
    requestFamilia.Lsections.forEach(function(section, indexSection) {
      section.Lsegments.forEach(function(segment, indexSegment) {
        segment.LsegmentGroups.forEach(function(group, indexGroup) {
          if (indexSection == section_) {
            if (indexSegment == 0) {
              if (indexGroup == segment_) {
                group.ClassId = classId;
                group.FareBasis = fareBasis;
              }
            }
          }
        });
      });
    });

    console.log('requestFamilia FIN: ' + JSON.stringify(requestFamilia));

    this.flightAvailability(requestFamilia, null, 3, null);
  }

  flagCloseModal($event) {
    this.modalRef.hide();
  }

}
