import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-hoteles-politicas',
  templateUrl: './hoteles-politicas.component.html',
  styleUrls: ['./hoteles-politicas.component.sass']
})
export class HotelesPoliticasComponent implements OnInit {


  @Input() politica;
  @Input() politicaIndex;
  @Input() politicaslength;
  
  constructor() { }

  ngOnInit() {
  }

}
