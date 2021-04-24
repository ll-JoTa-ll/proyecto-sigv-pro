import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-resumen-equipaje',
  templateUrl: './resumen-equipaje.component.html',
  styleUrls: ['./resumen-equipaje.component.sass']
})
export class ResumenEquipajeComponent implements OnInit {

  @Input() Lsection;

  constructor() { }

  ngOnInit() {
    console.log("adsda" + this.Lsection);
  }

}
