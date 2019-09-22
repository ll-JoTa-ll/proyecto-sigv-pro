import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { IHotelResultsModel } from '../../../../models/IHotelResults.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-filtro-precio',
  templateUrl: './filtro-precio.component.html',
  styleUrls: ['./filtro-precio.component.sass']
})
export class FiltroPrecioComponent implements OnInit, AfterViewInit {

  @Input() listado: IHotelResultsModel[];
  @Input() menorprecio: number;
  @Input() mayorprecio: number;
  @Output() filtroprecio = new EventEmitter<any[]>();
  mostrardiv: boolean = true;

  constructor() {
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('#slider-container').slider({
      range: true,
      min: 299,
      max: 1099,
      values: [299, 1099],
      slide: function(event, ui) {
          $("#precio1").val(ui.values[0]);
          $("#precio2").val(ui.values[1]);
      }
    });
  }

 FiltrarPrecio() {
  let precio1;
  let precio2;
  let count;
  let results;
  precio1 = $('#precio1').val();
  precio2 = $('#precio2').val();
  results = this.listado.filter(m => m.MinPrice >  parseFloat(precio1) &&  m.MinPrice < parseFloat(precio2));
  this.listado = results;
  this.filtroprecio.emit(this.listado);
 }

}
