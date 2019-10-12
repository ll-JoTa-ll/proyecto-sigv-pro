import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-precio-final',
  templateUrl: './precio-final.component.html',
  styleUrls: ['./precio-final.component.sass']
})
export class PrecioFinalComponent implements OnInit {

  @Input() precioadulto: number;
  @Input() preciototal: number;
  @Input() currency: string;
  @Input() Lpolicies: string;

  constructor() { }

  ngOnInit() {
  }

}
