//import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { IHotelResultsModel } from '../../../../models/IHotelResults.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { Component, Input, Output, AfterViewInit, OnInit, EventEmitter } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-filtro-hotel-precio',
  templateUrl: './filtro-precio.component.html',
  styleUrls: ['./filtro-precio.component.sass']
})
export class FiltroPrecioComponent implements OnInit, AfterViewInit {

  @Input() listado: IHotelResultsModel[];
  @Input() menorprecio: number;
  @Input() mayorprecio: number;
  @Input() currency: string;
  @Output() filtroprecio = new EventEmitter<any[]>();
  @Input() cantnoche: string;
  
  mostrardiv: boolean = true;
  menorprice: number;
  mayorprice: number;
  listadohotel: IHotelResultsModel[] = [];
  ls_search_hotel;

  constructor(private sessionStorageService: SessionStorageService) {
   }

  ngOnInit() {
   
    this.ls_search_hotel = this.sessionStorageService.retrieve('ls_search_hotel'); 

  }

  ngAfterViewInit() {
    this.menorprice =  parseFloat($('#menorprice').html());
    this.mayorprice = parseFloat($('#mayorprice').html());
    $('#precio1').val(this.menorprecio);
    $('#precio2').val(this.mayorprecio);
    this.RangoPrecio();
  }

  RangoPrecio() {
    const menorprecio = this.menorprecio;
    const mayorprecio = this.mayorprecio;
    let p1;
    let p2;
    p1 = $('#precio1').val();
    p2 = $('#precio2').val();
    if (parseFloat(p1) < menorprecio || parseFloat(p1) > mayorprecio) {
      //$('#precio1').val(menorprecio);
      return false;
    }
    if (parseFloat(p2) < menorprecio || parseFloat(p2) > mayorprecio) {
      //$('#precio2').val(mayorprecio);
      return false;
    }
    $('#slider-container').slider({
      range: true,
      min: this.menorprice,
      max: this.mayorprice,
      values: [p1, p2],
      slide: function(event, ui) {
          $('#precio1').val(ui.values[0]);
          $('#precio2').val(ui.values[1]);
      }
    });
  }

 FiltrarPrecio() {
  const menorprecio = this.menorprecio;
  const mayorprecio = this.mayorprecio;
  let precio1;
  let precio2;
  let count;
  let results = [];
  precio1 = $('#precio1').val();
  precio2 = $('#precio2').val();
  if (parseFloat(precio1) < menorprecio || parseFloat(precio1) > mayorprecio) {
    //$('#precio1').val(menorprecio);
    return false;
  }
  if (parseFloat(precio2) < menorprecio || parseFloat(precio2) > mayorprecio) {
    //$('#precio2').val(mayorprecio);
    return false;
  }
  let listado;
  listado = this.ls_search_hotel;
  results = listado.filter(m => m.oprice.pricePerAllNights >=  parseFloat(precio1) &&  m.oprice.pricePerAllNights <= parseFloat(precio2));
  this.listadohotel = results;
  this.filtroprecio.emit(this.listadohotel);
 }

 validateNumber(e: any) {
  let input = String.fromCharCode(e.charCode);
  const reg = /^\d*\.?\d*$/;

  if (!reg.test(input)) {
    e.preventDefault();
  }
}
}
