import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';

@Component({
  selector: 'app-filtro-estrellas',
  templateUrl: './filtro-estrellas.component.html',
  styleUrls: ['./filtro-estrellas.component.sass']
})
export class FiltroEstrellasComponent implements OnInit {

  @Input() listado: IHotelResultsModel[];
  @Output() resultfiltro = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit() {
  }

  FiltroEstrella(estrellas) {
    // tslint:disable-next-line: prefer-const
    let count;
    let results;
    results = this.listado.filter(m => m.HotelSegmentCategoryCode === estrellas);
    this.listado = results;
    this.resultfiltro.emit(this.listado);
  }
}
