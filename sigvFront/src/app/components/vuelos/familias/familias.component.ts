import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { VuelosComponent } from '../../busqueda-global/vuelos/vuelos.component';


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

  @Output() flagCloseModal = new EventEmitter<boolean>();
  @Output() outIdRadioBtnFareFam = new EventEmitter<string>();

  //precioTotal = 0;
  //precioPersona = 0;
  idRadioBtnFareFam: string;
  lstSumaFam: any[] = [];
  lsFlightAvailabilty;
  //modalRef: BsModalRef;
  flagChangeFare = 0;
  lstFareFamily: any[] = [];
  ss_FlightAvailability_request2;
  //flagMsgErrorSelFam: boolean;

  constructor(
    private airportService: AirportService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private vuelosComponent: VuelosComponent
  ) {
    //this.precioTotal = 0;
    //this.precioPersona = 0;
    //this.flagMsgErrorSelFam = false;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
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
  }

  sumTotal($event) {
    //this.precioTotal = $event;
  }

  selectRadioBtnFam($event) {
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
    this.flightAvailability(data);
  }

  flightAvailability(data) {
    this.vuelosComponent.spinner.show();
  //  this.spinner.show();
    this.flagMsgErrorSelFam = false;
    let flagResult = 0;
    this.airportService.fligthAvailibility(data).subscribe(
      results => {
        if (results.oerror === null) {
          this.lsFlightAvailabilty = results;
          this.sessionStorageService.store('ss_FlightAvailability_result', results);
     /*     this.sessionStorageService.store('ss_flightavailability_request1', data);
          this.sessionStorageService.store('ss_FlightAvailability_request2', this.ss_FlightAvailability_request2);*/
          //this.ObtenerSecciones();
          this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
          flagResult = 1;
        } else {
          flagResult = 2;
        }
      },
      err => {
        this.vuelosComponent.spinner.hide();
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
