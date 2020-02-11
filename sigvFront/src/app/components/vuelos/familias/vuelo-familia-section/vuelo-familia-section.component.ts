import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-vuelo-familia-section',
  templateUrl: './vuelo-familia-section.component.html',
  styleUrls: ['./vuelo-familia-section.component.sass']
})
export class VueloFamiliaSectionComponent implements OnInit {

  @Input() sectionFamily;
  @Input() sectionFamilyIndex;
  @Input() lstFamilyResultLength;
  @Input() familyname;

  @Output() idRadioBtnFareFam = new EventEmitter<string>();

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

    this.idSectionSegment += this.sectionFamily.sectionId;

    if (this.sectionFamilyIndex === 0) {
      this.isCollapsed = false;
    }
  }

  showSegments() {
    const isCollapsed = this.isCollapsed;
    this.isCollapsed = !isCollapsed;
  }

  hideSegments() {
    const isCollapsed = this.isCollapsed;
    this.isCollapsed = !isCollapsed;
  }

  selectRadioBtnFam($event) {
    this.idRadioBtnFareFam.emit($event);
  }

}
