import { Component, OnInit, Input } from '@angular/core';
import { IRegulationsModel } from '../../../../../models/IRegulations';

@Component({
  selector: 'app-regulaciones-tramo',
  templateUrl: './regulaciones-tramo.component.html',
  styleUrls: ['./regulaciones-tramo.component.sass']
})
export class RegulacionesTramoComponent implements OnInit {

  @Input() lstrules;

  constructor() { }

  ngOnInit() {
  }

}
