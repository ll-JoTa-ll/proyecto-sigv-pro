import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICostCenter } from '../../../models/ICostCenter';

@Component({
  selector: 'app-persona-contacto',
  templateUrl: './persona-contacto.component.html',
  styleUrls: ['./persona-contacto.component.sass']
})
export class PersonaContactoComponent implements OnInit {

  @Input() lsCostCenter: ICostCenter[];

  constructor() { }

  ngOnInit() {
  }

}
