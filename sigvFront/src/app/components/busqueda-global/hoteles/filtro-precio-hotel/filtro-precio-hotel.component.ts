import { Component, OnInit, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import { IHotelResultsModel } from '../../../../models/IHotelResults.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { SliderType } from "igniteui-angular";

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-filtro-precio-hotel',
  templateUrl: './filtro-precio-hotel.component.html',
  styleUrls: ['./filtro-precio-hotel.component.sass']
})
export class FiltroPrecioHotelComponent implements OnInit, AfterContentInit  {

  
  step = 0.01;
  @Input() listado: IHotelResultsModel[];
  @Input() menorprecio: number;
  @Input() mayorprecio: number;
  @Input() currency: string;
  @Output() filtroprecio = new EventEmitter<any[]>();
  @Input() cantnoche: string;
  
  mostrardiv: boolean = true;
  menorprice: number;
  minibuscador;
  mayorprice: number;
  listadohotel: IHotelResultsModel[] = [];
  ls_search_hotel;
  enabled = true;
  value = [250, 450];
  num1;
  num2;

  constructor(private sessionStorageService: SessionStorageService) {
   }

  ngOnInit() {
    this.ls_search_hotel = this.sessionStorageService.retrieve('ls_search_hotel'); 
  }

  

  ngAfterContentInit() {
    this.menorprice = parseFloat($('#menorprice').html());
    this.mayorprice = parseFloat($('#mayorprice').html());
    this.num1 = this.menorprice.toFixed(4);
    this.num2 = this.mayorprice.toFixed(4);
  }
  
  public sliderType = SliderType;
  public priceRange: PriceRange = new PriceRange(this.num1, this.num2);


  public updatePriceRange(event) {
    const prevPriceRange = this.priceRange;
    switch (event.id) {
      case "lowerInput": {
        if (!isNaN(parseInt(event.value, 10))) {
          this.priceRange = new PriceRange(event.value, prevPriceRange.upper);
        }
        break;
      }
      case "upperInput": {
        if (!isNaN(parseInt(event.value, 10))) {
          this.priceRange = new PriceRange(prevPriceRange.lower, event.value);
        }
        break;
      }
    }
  }

  fitlerPriceRealTime($event){
    this.FiltrarPrecio();
  }

  public change(event){
    this.FiltrarPrecio();
 }

  

 FiltrarPrecio() {
  this.minibuscador = this.sessionStorageService.retrieve('ss_minibuscador');
  const menorprecio = this.menorprecio;
  const mayorprecio = this.mayorprecio;
  let precio1;
  let precio2;
  let count;
  let results = [];
  precio1 = $('#precio1').val();
  precio2 = $('#precio2').val();
  precio1 = this.priceRange.lower;
  precio2 = this.priceRange.upper;
  if (parseFloat(precio1) < menorprecio || parseFloat(precio1) > mayorprecio) {
    //$('#precio1').val(menorprecio);
    return false;
  }
  if (parseFloat(precio2) < menorprecio || parseFloat(precio2) > mayorprecio) {
    //$('#precio2').val(mayorprecio);
    return false;
  }
  let listado;
    if (this.minibuscador != null) {
      listado = this.minibuscador;
    }else{
      listado = this.ls_search_hotel;
    }
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

class PriceRange {
  constructor(
    public lower: number,
    public upper: number
  ) {
  }
}
