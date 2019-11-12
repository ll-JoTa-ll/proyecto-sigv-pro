import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-resumen-vuelo',
  templateUrl: './modal-resumen-vuelo.component.html',
  styleUrls: ['./modal-resumen-vuelo.component.sass']
})
export class ModalResumenVueloComponent implements OnInit {

  @Input() LSection;

  constructor() { }

  ngOnInit() {
  }

}
