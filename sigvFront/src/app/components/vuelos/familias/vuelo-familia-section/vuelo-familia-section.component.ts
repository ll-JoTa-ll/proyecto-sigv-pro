import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-vuelo-familia-section',
  templateUrl: './vuelo-familia-section.component.html',
  styleUrls: ['./vuelo-familia-section.component.sass']
})
export class VueloFamiliaSectionComponent implements OnInit {

  @Input() sectionFamily;
  @Input() sectionFamilyIndex;
  @Input() lstFamilyResultLength;
  familyname;

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
    $('#divfamilia_' + this.sectionFamilyIndex).hide();
  }

  hideSegments() {
    const isCollapsed = this.isCollapsed;
    this.isCollapsed = !isCollapsed;
    if (this.familyname != null) {
      $('#divfamilia_' + this.sectionFamilyIndex).show();
    }
  }

  hidesection($event) {
   this.isCollapsed = $event;
   if (this.familyname != null) {
    $('#divfamilia_' + this.sectionFamilyIndex).show();
  }
  }

  selectRadioBtnFam($event) {
    this.idRadioBtnFareFam.emit($event);
  }

  EvtNamefamily($event) {
    this.familyname = $event;
  }

  EvtColorFamily($event) {
    console.log('"' + $event + '"');
    if (this.isCollapsed === false) {
      $('#namefamilia_' + this.sectionFamilyIndex).css({'background-color': '"' + $event + '"'});
    }
  }
}
