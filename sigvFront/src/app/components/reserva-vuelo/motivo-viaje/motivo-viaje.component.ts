import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IReasonFlight } from '../../../models/IReasonFlight';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-motivo-viaje',
  templateUrl: './motivo-viaje.component.html',
  styleUrls: ['./motivo-viaje.component.sass']
})
export class MotivoViajeComponent implements OnInit {

  @Input() lsReasonflight: IReasonFlight[];
  reason;
  valor;
  constructor(private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    this.reason = this.sessionStorageService.retrieve("ss_login_data")
    this.valor = this.reason.ocompany.ocompanyConfiguration.extraReasonFlight;
  }

}
