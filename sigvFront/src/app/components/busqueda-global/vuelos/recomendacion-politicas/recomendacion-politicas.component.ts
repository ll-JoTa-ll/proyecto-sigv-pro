import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recomendacion-politicas',
  templateUrl: './recomendacion-politicas.component.html',
  styleUrls: ['./recomendacion-politicas.component.sass']
})
export class RecomendacionPoliticasComponent implements OnInit {

  @Input() politica;

  constructor() { }

  ngOnInit() {
  }

}
