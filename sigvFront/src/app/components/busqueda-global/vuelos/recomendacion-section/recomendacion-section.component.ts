import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';

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
  @Input() recommendationIndex: number;
  @Input() tipoVuelo: string;

  @Output() segmentRadioCheckId = new EventEmitter<string>();
  @Output() outSection = new EventEmitter<any>();
  @Output() outSegmentCheck = new EventEmitter<any>();

  textType: string;
  imgIdaVuelta: string;
  segment;

  constructor() { }

  ngOnInit() {
    //console.log("ngOnInit");
    //console.log("this.sectionLength");
    //console.log(this.sectionLength);
    if (this.sectionLength === 1) {
      this.textType = 'Ida';
      this.imgIdaVuelta = 'airplane_ida.svg';
    }

    if (this.tipoVuelo === 'RT') {
      if (this.posicion % 2 === 0) {
        this.textType = 'Vuelta';
        this.imgIdaVuelta = 'airplane_vuelta.svg';
      } else {
        this.textType = 'Ida';
        this.imgIdaVuelta = 'airplane_ida.svg';
      }
    }

    if (this.tipoVuelo === 'MC') {
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

  /*
  setearRadioId($event) {
    console.log("RecomendacionSectionComponent");
    console.log($event);
    this.outSection.emit(this.section);
    this.segmentRadioCheckId.emit($event);
  }

  setearSegment($event) {
    this.segment = $event;
  }
  */

  setSegmentCheck($event) {
    this.outSegmentCheck.emit($event);
  }

}
