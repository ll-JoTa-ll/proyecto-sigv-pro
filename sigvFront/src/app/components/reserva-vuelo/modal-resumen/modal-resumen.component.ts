import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() Lpolicies: string;

  constructor() { }

  ngOnInit() {
  }

}
