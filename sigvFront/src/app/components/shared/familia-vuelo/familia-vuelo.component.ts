import { Component, OnInit } from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-familia-vuelo',
  templateUrl: './familia-vuelo.component.html',
  styleUrls: ['./familia-vuelo.component.sass']
})
export class FamiliaVueloComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  MostrarModal() {
    $('#modaltarifa').show();
  }

  OcultarModal() {
    $('#modaltarifa').hide();
  }

}
