import {Component, EventEmitter, Input, OnInit, Output, AfterViewInit} from '@angular/core';


declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-vuelo-familia-section',
  templateUrl: './vuelo-familia-section.component.html',
  styleUrls: ['./vuelo-familia-section.component.sass']
})
export class VueloFamiliaSectionComponent implements OnInit, AfterViewInit {

  @Input() sectionFamily;
  @Input() sectionFamilyIndex;
  @Input() lstFamilyResultLength;
  familyname;

  @Output() idRadioBtnFareFam = new EventEmitter<string>();

  imgIdaVuelta;
  textoTipo;
  isCollapsed = true;
  idSectionSegment = 'idSegment_';
  idArrow = "idArrow_";

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
  }

  ngAfterViewInit() {
    if (this.sectionFamilyIndex === 0) {
      this.isCollapsed = false;
      $("#imgArrow1_" + this.sectionFamilyIndex).hide();
      $("#imgArrow2_" + this.sectionFamilyIndex).show();
    } else {
      $("#" + this.idSectionSegment).hide();
      $("#imgArrow1_" + this.sectionFamilyIndex).show();
      $("#imgArrow2_" + this.sectionFamilyIndex).hide();
      $("#divfamilia_" + this.sectionFamilyIndex).show();
      //$('#divfamilia_' + this.sectionFamilyIndex).show();
    }
  }

  showSegments() {
    const isCollapsed = this.isCollapsed;
    this.isCollapsed = !isCollapsed;
    $('#divfamilia_' + this.sectionFamilyIndex).hide();
    $('#' + this.idSectionSegment).show();
    $("#imgArrow1_" + this.sectionFamilyIndex).hide();
    $("#imgArrow2_" + this.sectionFamilyIndex).show();
  }

  hideSegments() {
    const isCollapsed = this.isCollapsed;
    this.isCollapsed = !isCollapsed;
    console.log(this.familyname);
    if (this.familyname != null) {
      $('#divfamilia_' + this.sectionFamilyIndex).show();
    }
    $('#' + this.idSectionSegment).hide();
    $("#imgArrow1_" + this.sectionFamilyIndex).show();
    $("#imgArrow2_" + this.sectionFamilyIndex).hide();
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
      console.log('Aqui esta el color: ', $event);
      $('#nombrefamilia_' + this.sectionFamilyIndex).css({'background-color': '"' + $event + '"'});
    }
  }
}
