import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-info-recomendacion',
  templateUrl: './info-recomendacion.component.html',
  styleUrls: ['./info-recomendacion.component.sass']
})
export class InfoRecomendacionComponent implements OnInit {

  @Input() LSection;
  @Input() tipovuelo;
  @Input() lstBag;

  constructor() { }

  ngOnInit() {
  }

}
