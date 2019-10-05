import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-infraccion-pax',
  templateUrl: './modal-infraccion-pax.component.html',
  styleUrls: ['./modal-infraccion-pax.component.sass']
})
export class ModalInfraccionPaxComponent implements OnInit {

  @Input() LPolicies;
  @Input() currency;

  constructor() { }

  ngOnInit() {
  }

}
