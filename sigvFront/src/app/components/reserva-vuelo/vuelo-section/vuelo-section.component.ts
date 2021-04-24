import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-vuelo-section',
  templateUrl: './vuelo-section.component.html',
  styleUrls: ['./vuelo-section.component.sass']
})
export class VueloSectionComponent implements OnInit {

  @Input() section;
  @Input() tipo;
  lsegment;
  segment = null;
  
  constructor() { }

  ngOnInit() {
  }

}
