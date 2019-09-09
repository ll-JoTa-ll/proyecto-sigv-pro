import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-recomendacion-section',
  templateUrl: './recomendacion-section.component.html',
  styleUrls: ['./recomendacion-section.component.sass']
})
export class RecomendacionSectionComponent implements OnInit, AfterViewInit {

  @Input() section;
  @Input() sectionLength: number;
  @Input() posicion: number;
  @Input() recommendationId: number;
  textType: string;
  imgIdaVuelta: string;

  constructor() { }

  ngOnInit() {
    //console.log("ngOnInit");
    //console.log("this.sectionLength");
    //console.log(this.sectionLength);
    if (this.sectionLength === 1) {
      this.textType = 'Ida';
      this.imgIdaVuelta = 'airplane_ida.svg';
    }

    if (this.sectionLength === 2) {
      if (this.posicion % 2 === 0) {
        this.textType = 'Vuelta';
        this.imgIdaVuelta = 'airplane_vuelta.svg';
      } else {
        this.textType = 'Ida';
        this.imgIdaVuelta = 'airplane_ida.svg';
      }
    }

    if (this.sectionLength > 2) {
      this.textType = 'Tramo ' + this.posicion;
    }
  }

  ngAfterViewInit() {
    //console.log("ngAfterViewInit");
    //console.log("this.sectionLength");
    //console.log(this.sectionLength);
    if (this.sectionLength === 1) {
      this.textType = 'Ida';
    }

    if (this.sectionLength === 2) {}

    if (this.sectionLength > 2) {}
  }

}
