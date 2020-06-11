import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter, HostListener} from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { VuelosComponent } from '../../busqueda-global/vuelos/vuelos.component';
import { IFlightAvailability } from '../../../models/IFlightAvailability';
import { fromEvent } from 'rxjs';
import { ModalErrorServiceComponent } from '../../shared/modal-error-service/modal-error-service.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-familias',
  templateUrl: './familias.component.html',
  styleUrls: ['./familias.component.sass']
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

  //precioTotal = 0;
  //precioPersona = 0;
  modalerror: BsModalRef;
  idRadioBtnFareFam: string;
  lstSumaFam: any[] = [];
  lsFlightAvailabilty: IFlightAvailability;
  //modalRef: BsModalRef;
  flagChangeFare = 0;
  lstFareFamily: any[] = [];
  ss_FlightAvailability_request2;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    keyboard: false
  };

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
    console.log("FamiliasComponent ngOnInit");
  }

  ngAfterViewInit() {
    console.log("FamiliasComponent ngAfterViewInit");
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
    this.dataRequestFamilia.Lsections.forEach(function(sectionVal, indexSectionVal) {
      if (indexSectionVal === 0) {
        sectionVal.Lsegments.forEach(function(segmentVal) {
          segmentVal.LsegmentGroups.forEach(function(segmentGroupVal) {
            section0_fareBasis.push(segmentGroupVal.FareBasis);
          });
        });
      }
    });
    console.log("section0_fareBasis: " + JSON.stringify(section0_fareBasis));

    //PASO 2: buscar esas sections en el listado de combinaciones
    const lcombinations = this.lcombinations;
    console.log("//PASO 2: buscar esas sections en el listado de combinaciones");
    let lstCombinacionesSection = [];
    let flagSection0 = 0;
    lcombinations.forEach(function(combinacion, indexCombinacion) {
      const lbasisCombinations = combinacion.lbasisCombinations;
      flagSection0 = 0;
      lbasisCombinations.forEach(function(valor, indexValor) {
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
    this.lstFamilyResult.forEach(function(section, indexSection) {
      if (indexSection > 0) {
        section.lsegments.forEach(function(segment, indexSegment) {

          segment.lfareFamilies.forEach(function(fare, indexFare) {
            const fareBasisGG = fare.fareBasis;
            let idSecuencial = indexSection + "_" + indexSegment + "_" + (indexFare + 1);
            const cardId = 'cardId_' + section.sectionId + '_' + (indexSegment+1) + '_' + fareBasisGG;
            console.log("cardId hide: " + cardId);
            $("#" + cardId).hide();
          });

        });
      }
    });

    //PASO 4: teniendo las combinaciones q existe para el section seleccionado
    console.log("//PASO 4: teniendo las combinaciones q existe para el section seleccionado");
    //        vamos ocultar los radio q no existan
    lstCombinacionesSection.forEach(function(valor, valorIndex) {
      const lbasisCombinations = valor.lbasisCombinations;
      lbasisCombinations.forEach(function(combi, combiIndex) {
        if (combi.sectionId != '1') {
          const cardId = 'cardId_' + combi.sectionId + '_' + combi.segmentId + '_' + combi.fareBasis;
          console.log("cardId show: " + cardId);
          $("#" + cardId).show();
        }
      });
    });

    //PASO 5
    console.log("PASO 5");
    const combinacionInicial = lstCombinacionesSection[0];
    console.log("combinacionInicial: " + JSON.stringify(combinacionInicial));
    const totalPrice_0 = combinacionInicial.totalPrice;
    console.log("totalPrice_0: " + totalPrice_0);
    const currency_0 = combinacionInicial.currency;
    console.log("currency_0: " + currency_0);
    const lbasisCombinations_0 = combinacionInicial.lbasisCombinations;
    console.log("lbasisCombinations_0: " + JSON.stringify(lbasisCombinations_0));
    lbasisCombinations_0.forEach(function(combo, comboIndex) {
      //$('#' + idRadioBtn + '_' + sectionIndex + '_' + segmentIndex + '_' + (fareFamilyIndex)).prop("checked", true);
    });
    this.lstFamilyResult.forEach(function(section, sectionIndex) {
      const sectionId = section.sectionId;
      section.lsegments.forEach(function(segment, segmentIndex) {
        segment.lfareFamilies.forEach(function(fare, fareFamilyIndex) {
          const fareBasisGG = fare.fareBasis;
          const idRadioBtn = sectionId + '_' + (segmentIndex + 1) + '_' + fareBasisGG;
          console.log("idRadioBtn: " + idRadioBtn);
          lbasisCombinations_0.forEach(function(combi, comboIndex) {
            //$('#' + idRadioBtn + '_' + sectionIndex + '_' + segmentIndex + '_' + (fareFamilyIndex)).prop("checked", true);
            const combiIdRadioBtn = combi.sectionId + '_' + combi.segmentId + '_' + combi.fareBasis;
            if (combi.sectionId == sectionId) {
              console.log("combiIdRadioBtn: " + combiIdRadioBtn);
              if (idRadioBtn === combiIdRadioBtn) {
                console.log("SI: " + '#idRadioFam_' + sectionIndex + '_' + segmentIndex + '_' + (fareFamilyIndex + 1));
                $('#idRadioFam_' + sectionIndex + '_' + segmentIndex + '_' + (fareFamilyIndex + 1)).prop("checked", true);
              }
            }
          });
        });
      });
    });
    this.famTotalFareAmount = totalPrice_0;
    this.famFareAmountByPassenger = Number(totalPrice_0) / this.nroPersonas;

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
      const splitId = valor.split('_');
      const indexFam = parseFloat(splitId[1]) - 1;
      const indexFare = parseFloat(splitId[2]) - 1;
      let flagIndex = 0;
      lstFareFamily.forEach(function(fare, index) {
        const fareSplit = fare.split('_');
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


  seleccionarFamilia(template) {
    console.log("seleccionarFamilia");
    this.flagCloseModal.emit(true);
 //   this.router.navigate(['/reserva-vuelo']);
    let request = this.sessionStorageService.retrieve('ss_flightavailability_request1');
    let data = {
      "NumberPassengers": request.NumberPassengers,
      "Currency": request.Currency,
      "CarrierId": request.CarrierId,
      "Lsections": request.Lsections,
      "Ocompany": request.Ocompany,
      "Gds": request.GDS,
      "PSeudo": request.Pseudo,
      "Lpassenger": request.Lpassenger,
      "TotalFareAmount": request.TotalFareAmount,
      "FareTaxAmountByPassenger": request.FareTaxAmountByPassenger,
      "RecommendationId": request.RecommendationId,
      "UserId": request.UserId,
      "Infraction": request.Infraction,
      "FlightNational": request.FlightNational,
      "Lpolicies": request.Lpolicies
    }
    this.flightAvailability(data, template);
  }

  flightAvailability(data,template) {
    this.vuelosComponent.spinner.show();
  //  this.spinner.show();
    this.flagMsgErrorSelFam = false;
    let flagResult = 0;
    this.airportService.fligthAvailibility(data).subscribe(
      results => {
        if (results.oerror === null) {
          this.lsFlightAvailabilty = results;
          this.sessionStorageService.store('ss_FlightAvailability_result', this.lsFlightAvailabilty);
     /*     this.sessionStorageService.store('ss_flightavailability_request1', data);
          this.sessionStorageService.store('ss_FlightAvailability_request2', this.ss_FlightAvailability_request2);*/
          //this.ObtenerSecciones();
          this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
          flagResult = 1;
        } else {
          flagResult = 2;
          this.modalRef = this.modalService.show(
            template,
            Object.assign({}, { class: 'gray modal-lg sin-familias' })
          );
        }
      },
      err => {
        this.vuelosComponent.spinner.hide();
        this.modalerror = this.modalService.show(ModalErrorServiceComponent, this.config);
      },
      () => {
        this.vuelosComponent.spinner.hide();
        //this.spinner.hide();
        if (flagResult === 1) {
          this.router.navigate(['/reserva-vuelo']);
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

}
