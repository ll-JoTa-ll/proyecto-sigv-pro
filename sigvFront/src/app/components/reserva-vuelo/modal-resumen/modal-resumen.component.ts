import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AirportService } from '../../../services/airport.service';
import { IFlightAvailability } from 'src/app/models/IFlightAvailability';
import { IAddPassenger } from 'src/app/models/IAddPassenger.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { IPnrConfirm } from 'src/app/models/IPnrConfirm.model';

@Component({
  selector: 'app-modal-resumen',
  templateUrl: './modal-resumen.component.html',
  styleUrls: ['./modal-resumen.component.sass']
})
export class ModalResumenComponent implements OnInit {

  @Input() precioadulto: number;
  @Input() preciototal: number;
  @Input() currency: string;
  @Input() LSection: string;
  @Input() lSectionPassengers;
  @Input() Lpolicies: string;
  @Input() ocompany;
  @Input() osession;
  @Input() numberpasssengers;
  @Input() Flighavailabiltyresponse: IFlightAvailability;
  @Input() carrierId;
  @Input() gds;
  @Input() pseudo;
  @Input() lsusuario;
  @Input() email;
  @Input() phone;
  @Input() userid;
  osessionpnr;
  passengerresults: IAddPassenger;
  pnrresults: IPnrConfirm;

  constructor(private service: AirportService) { }

  ngOnInit() {
    this.osession = this.Flighavailabiltyresponse.osession;
  }

  AddPassenger() {
	let phones = [];
	let email = [];
	email.push(this.email);
	phones.push(this.phone);

    let data = {
    "NumberPassengers": this.numberpasssengers,
	"CarrierId": this.carrierId,
	"GDS": this.gds,
	"Pseudo": this.pseudo,
	"Lsections": this.lSectionPassengers,
	"Ocompany": this.ocompany,
	"osession": this.osession,
	"Phones": phones,
	"Emails": email,
	"Lpassenger": this.lsusuario
    };
 this.service.AddPassenger(data).subscribe(
      results => {
		  // tslint:disable-next-line: indent
		  this.passengerresults = results;
          this.osessionpnr = this.passengerresults.osession;
      },
      err => {
         console.log(err);
	  },
	  () => {
		  this.PnrConfirm();
	  }
    );
  }
  PnrConfirm() {
	let phones = [];
	let email = [];
	email.push(this.email);
	phones.push(this.phone);
	let data = {
    "UserId": this.userid,
	"ReasonFlightId": 1,
	"GDS": this.gds,
	"Pseudo": this.pseudo,
	"Phones": phones,
	"Emails": email,
	"Lpassenger": this.lsusuario,
	"Ocompany": this.ocompany,
	"osession": this.osessionpnr
	  };
	  this.service.GeneratePnr(data).subscribe(
		results => {
		  this.pnrresults = results;
		  alert('El codigo de reserva es : ' + this.pnrresults.pnr);
		  },
		err => {

		}  
	  );
  }
}
