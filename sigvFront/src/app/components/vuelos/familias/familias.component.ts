import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';


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
  ) {
    console.log('modal familia constructor');
    //this.precioTotal = 0;
    //this.precioPersona = 0;
    //this.flagMsgErrorSelFam = false;
  }

  ngOnInit() {
    console.log('modal familia ngOnInit');
    //this.precioTotal = this.famTotalFareAmount;
    //this.precioPersona = this.famFareAmountByPassenger;
    console.log('this.famFareAmountByPassenger: ' + this.famFareAmountByPassenger);
    console.log('this.famTotalFareAmount: ' + this.famTotalFareAmount);
    //console.log('this.precioPersona: ' + this.precioPersona);
    //console.log('this.precioTotal: ' + this.precioTotal);
    console.log('this.flagMsgErrorSelFam: ' + this.flagMsgErrorSelFam);
  }

  ngAfterViewInit() {
    console.log('modal familia ngAfterViewInit');
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
    console.log('lstFareFamily: ' + JSON.stringify(lstFareFamily));
  }

  seleccionarFamilia(template) {
    this.flagCloseModal.emit(true);
    this.router.navigate(['/reserva-vuelo']);
    /*
    const flagChangeFare = this.flagChangeFare;
    let ss_FlightAvailability_request2 = this.sessionStorageService.retrieve('ss_FlightAvailability_request2');
    if (flagChangeFare === 0) {
      this.ss_FlightAvailability_request2 = ss_FlightAvailability_request2;
      this.flightAvailability(this.dataRequestFamilia, template);
    } else {
      let dataRequestFamilia = this.dataRequestFamilia;
      console.log('dataRequestFamilia: ' + JSON.stringify(dataRequestFamilia));
      const lstFareFamily = this.lstFareFamily;
      const lstFamilyResult = this.lstFamilyResult;
      lstFareFamily.forEach(function(fare, index) {
        const fareSplit = fare.split('_');
        const fareIndexFam = parseFloat(fareSplit[1]) - 1;
        const fareIndexFare = parseFloat(fareSplit[2]) - 1;
        const classId = lstFamilyResult[fareIndexFam].lfareFamilies[fareIndexFare].classId;
        const fareBasis = lstFamilyResult[fareIndexFam].lfareFamilies[fareIndexFare].fareBasis;
        console.log('classId: ' + classId);
        console.log('fareBasis: ' + fareBasis);
        console.log('fareIndexFam: ' + fareIndexFam);
        console.log('fareIndexFare: ' + fareIndexFare);
        for (let i = 0; i < dataRequestFamilia.Lsections[fareIndexFam].Lsegments[0].LsegmentGroups.length; i++) {
          dataRequestFamilia.Lsections[fareIndexFam].Lsegments[0].LsegmentGroups[i].ClassId = classId;
          dataRequestFamilia.Lsections[fareIndexFam].Lsegments[0].LsegmentGroups[i].FareBasis = fareBasis;
        }
        for (let j = 0; j < ss_FlightAvailability_request2.Lsections[fareIndexFam].Lsegments[0].LsegmentGroups.length; j++) {
          ss_FlightAvailability_request2.Lsections[fareIndexFam].Lsegments[0].LsegmentGroups.ClassId = classId;
          ss_FlightAvailability_request2.Lsections[fareIndexFam].Lsegments[0].LsegmentGroups.FareBasis = fareBasis;
        }
      });
      this.ss_FlightAvailability_request2 = ss_FlightAvailability_request2;
      this.flightAvailability(dataRequestFamilia, template);
    }
    */
  }

  flightAvailability(data, template) {
    this.spinner.show();
    this.flagMsgErrorSelFam = false;
    console.log('dataRequestflightAvailability: ' + JSON.stringify(data));
    let flagResult = 0;
    this.airportService.fligthAvailibility(data).subscribe(
      results => {
        console.log('fligthAvailibility results: ' + JSON.stringify(results));
        if (results.oerror === null) {
          this.lsFlightAvailabilty = results;
          console.log('results :', JSON.stringify(this.lsFlightAvailabilty));
          this.sessionStorageService.store('ss_FlightAvailability_result', results);
          this.sessionStorageService.store('ss_flightavailability_request1', data);
          this.sessionStorageService.store('ss_FlightAvailability_request2', this.ss_FlightAvailability_request2);
          //this.ObtenerSecciones();
          this.sessionStorageService.store('tipovuelo', this.tipoVuelo);
          flagResult = 1;
        } else {
          flagResult = 2;
        }
      },
      err => {
        console.log('ERROR: ' + JSON.stringify(err));
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
        console.log('flight availability completado');
        console.log('flagResult: ' + flagResult);
        if (flagResult === 1) {
          this.flagCloseModal.emit(true);
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
