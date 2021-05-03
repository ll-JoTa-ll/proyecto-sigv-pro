import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Pruebas } from '../../../../models/IPruebas.model';
import { IGetApprovers } from '../../../../models/IGetApprovers.model';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-autorizadores',
  templateUrl: './autorizadores.component.html',
  styleUrls: ['./autorizadores.component.sass']
})
export class AutorizadoresComponent implements OnInit {

  @Input() lsapprovers: IGetApprovers[];


  constructor() { }

  ngOnInit() {
    console.log("acacacca" + JSON.stringify(this.lsapprovers));
  }

}
