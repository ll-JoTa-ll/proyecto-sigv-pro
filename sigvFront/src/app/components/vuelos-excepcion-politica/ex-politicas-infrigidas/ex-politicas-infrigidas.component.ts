import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pruebas } from 'src/app/models/IPruebas.model';
import { IGetApprovers } from '../../../models/IGetApprovers.model';

@Component({
  selector: 'app-ex-politicas-infrigidas',
  templateUrl: './ex-politicas-infrigidas.component.html',
  styleUrls: ['./ex-politicas-infrigidas.component.sass']
})
export class ExPoliticasInfrigidasComponent implements OnInit {

  listUsers: Pruebas[] = [];
  @Input() LPolicies;
  @Input() Currency;
  @Input() lsapprovers: IGetApprovers[];


  constructor() { }

  ngOnInit() {
    this.listUsers = [{
      nombre: "lalala",
      centroCosto: "lelele",
      telefono: "lilili",
      email: "lololo@gmail.com"
    }];
  }

}
