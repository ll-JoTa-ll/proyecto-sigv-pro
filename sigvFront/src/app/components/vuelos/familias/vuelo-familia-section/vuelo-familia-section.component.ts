import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vuelo-familia-section',
  templateUrl: './vuelo-familia-section.component.html',
  styleUrls: ['./vuelo-familia-section.component.sass']
})
export class VueloFamiliaSectionComponent implements OnInit {

  @Input() sectionFamily;
  @Input() sectionFamilyIndex;
  @Input() lstFamilyResultLength;

  imgIdaVuelta;
  textoTipo;
  isCollapsed = true;
  idSectionSegment = 'idSegment_';

  constructor() { }

  ngOnInit() {
    if (this.lstFamilyResultLength === 1) {
      this.textoTipo = 'Ida';
      this.imgIdaVuelta = 'airplane_ida.svg';
    }

    if (this.lstFamilyResultLength === 2) {
      if (this.sectionFamilyIndex === 0) {
        this.textoTipo = 'Ida';
        this.imgIdaVuelta = 'airplane_ida.svg';
      }
      if (this.sectionFamilyIndex === 1) {
        this.textoTipo = 'Vuelta';
        this.imgIdaVuelta = 'airplane_vuelta.svg';
      }
    }

    if (this.lstFamilyResultLength > 2) {
      this.textoTipo = 'Tramo ' + (this.sectionFamilyIndex + 1);
      this.imgIdaVuelta = 'airplane_ida.svg';
    }

    this.idSectionSegment += this.sectionFamily.sectionId
  }

  showSegments() {
    const isCollapsed = this.isCollapsed;
    this.isCollapsed = !isCollapsed;
  }

  hideSegments() {
    const isCollapsed = this.isCollapsed;
    this.isCollapsed = !isCollapsed;
  }

}
