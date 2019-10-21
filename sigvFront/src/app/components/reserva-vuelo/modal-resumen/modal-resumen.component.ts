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
}
