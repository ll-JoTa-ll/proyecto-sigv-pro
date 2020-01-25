import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-modal-habitacion-hab',
  templateUrl: './modal-habitacion-hab.component.html',
  styleUrls: ['./modal-habitacion-hab.component.sass']
})
export class ModalHabitacionHabComponent implements OnInit {

  @Input() LPolicies;
  @Input() currency;

  constructor() { }

  ngOnInit() {
  }

}
