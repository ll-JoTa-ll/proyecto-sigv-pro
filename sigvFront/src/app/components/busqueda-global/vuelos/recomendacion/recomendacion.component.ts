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

  lstFamilyResult: IFareFamilyModel[] = [];
  lsFlightAvailabilty: IFlightAvailability;
  flagResultFamilias: number;

  flagPseudoRepeat: boolean;
  lstPseudoRepeat: any[] = [];

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
  }

  ngOnInit() {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');

    const pseudoRepeat = this.pseudoRepeat;
    console.log('pseudoRepeat: ' + pseudoRepeat);
    if (pseudoRepeat === null) {
      this.flagPseudoRepeat = false;
    } else {
      this.flagPseudoRepeat = true;
      if (pseudoRepeat.indexOf('-') >= 0) {
        const lstPseudoRepeat = pseudoRepeat.split('-');
        for (let i = 0; i < lstPseudoRepeat.length; i++) {
          lstPseudoRepeat[i] = lstPseudoRepeat[i] + '.png';
        }
        console.log('lstPseudoRepeat: ' + lstPseudoRepeat);
        this.lstPseudoRepeat = lstPseudoRepeat;
      } else {
        let lstPseudoRepeat: any[] = [];
        lstPseudoRepeat.push(pseudoRepeat);
        for (let i = 0; i < lstPseudoRepeat.length; i++) {
          lstPseudoRepeat[i] = lstPseudoRepeat[i] + '.png';
        }
        console.log('lstPseudoRepeat: ' + lstPseudoRepeat);
        this.lstPseudoRepeat = lstPseudoRepeat;
      }
    }
  }

  openModal(template: TemplateRef<any>, recommendationId) {

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

    let dataFamilias = {
      NumberPassengers: this.numberPassengers,
      CarrierId: this.carrierId,
      Lsections: Lsections_,
      Ocompany: this.loginDataUser.ocompany,
      Gds: this.gds,
      PSeudo: this.pseudo
    };

    console.log("dataFamilias: " + JSON.stringify(dataFamilias));

    this.getFareFamily(dataFamilias, template);
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
      //console.log("ANTES: " + JSON.stringify(this.lstRadioCheck));
      this.lstRadioCheck = this.lstRadioCheck.filter(x => x.flag === 1);
      ///console.log("DESPUES: " + JSON.stringify(this.lstRadioCheck));
    }
  }

  getFareFamily(dataPost, template) {
    this.vuelosComponent.spinner.show();
    let flagResultFamilias = 0;
    this.familyService.getFareFamily(dataPost).subscribe(
      result => {
        console.log('result: ' + JSON.stringify(result));
        if (result === null) {
          flagResultFamilias = 0;
        } else {
          this.lstFamilyResult = result;
          if (this.lstFamilyResult.length === 0) {
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
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg' })
          );
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

    let dataFamilias = {
      NumberPassengers: this.numberPassengers,
      Currency: this.currency,
      CarrierId: this.carrierId,
      Lsections: Lsections_,
      Ocompany: this.loginDataUser.ocompany,
      Gds: this.gds,
      PSeudo: this.pseudo
    };
    this.sessionStorageService.store('ss_FlightAvailability_request1', dataFamilias);
    this.flightAvailability(dataFamilias, template);
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
    console.log('mi seccion');
    console.log(dataFamilias);
    this.sessionStorageService.store('ss_FlightAvailability_request2', dataFamilias);

  }

  flightAvailability(data, template) {
    this.vuelosComponent.spinner.show();
    this.airportService.fligthAvailibility(data).subscribe(
      results => {
        console.log('fligthAvailibility results: ' + results);
        if (results.oerror === null) {
          this.lsFlightAvailabilty = results;
          console.log('results :', JSON.stringify(this.lsFlightAvailabilty));
          this.sessionStorageService.store('ss_FlightAvailability_result', results);
          this.ObtenerSecciones();
          this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
          this.router.navigate(['/reserva-vuelo']);
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
        console.log('flight availability completado');
        this.vuelosComponent.spinner.hide();
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

}
