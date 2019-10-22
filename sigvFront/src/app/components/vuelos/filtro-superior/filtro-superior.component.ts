import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-filtro-superior',
  templateUrl: './filtro-superior.component.html',
  styleUrls: ['./filtro-superior.component.sass']
})
export class FiltroSuperiorComponent implements OnInit {

  @Input() tipoEscala;

  @Output() searchFilter = new EventEmitter<ISearchFlightModel[]>();

  searchFlight: ISearchFlightModel[] = [];
  flagVD: boolean;
  flagSM: boolean;
  flagSN: boolean;
  flagVDactivo: boolean;
  flagSMactivo: boolean;
  flagSNactivo: boolean;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService
  ) {
    this.flagSM = true;
    this.flagSN = true;
    this.flagVDactivo = false;
    this.flagSMactivo = false;
    this.flagSNactivo = false;
  }

  ngOnInit() {
    console.log('this.tipoEscala: ' + this.tipoEscala);
    if (this.tipoEscala === '') {
      this.flagVD = true;
    } else {
      this.flagVD = false;
    }
    this.searchFlight = this.sessionStorageService.retrieve('ss_searchFlight');
  }

  selDirectos() {
    this.spinner.show();
    this.flagVDactivo = !this.flagVDactivo;
    let searchFlight = this.searchFlight;
    console.log('this.flagVDactivo: ' + this.flagVDactivo);
    console.log('searchFlight: ' + searchFlight);
    if (this.flagVDactivo === true) {
      searchFlight.forEach(function(recomendacion, index1) {
        const lsections = recomendacion.lsections;
        let sectionCount = 0;
        lsections.forEach(function(section, index2) {
          const lSegments = section.lSegments;
          const lSegmentsLength = lSegments.length;
          let segmentCount = 0;
          lSegments.forEach(function(segment, index3) {
            const lSegmentGroups = segment.lSegmentGroups;
            const nroEscalas = lSegmentGroups.length - 1;
            if (nroEscalas > 0) {
              segment.isVisible = false;
              segmentCount++;
            }
          });
          if (lSegmentsLength === segmentCount) {
            section.isVisible = false;
            sectionCount++;
          }
        });
        if (sectionCount > 0) {
          recomendacion.isVisible = false;
        }
      });
      this.searchFilter.emit(searchFlight);
    }
    if (this.flagVDactivo === false) {
      /*
      const sf = this.sessionStorageService.retrieve('ss_searchFlight');
      console.log('sf: ' + JSON.stringify(sf));
      this.searchFilter.emit(sf);
      */
      searchFlight.forEach(function(recomendacion, index1) {
        recomendacion.isVisible = true;
        const lsections = recomendacion.lsections;
        lsections.forEach(function(section, index2) {
          section.isVisible = true;
          const lSegments = section.lSegments;
          lSegments.forEach(function(segment, index3) {
            segment.isVisible = true;
          });
        });
      });
      this.searchFilter.emit(searchFlight);
    }
  }

  selSalidaManiana() {
    this.flagSMactivo = !this.flagSMactivo;
  }

  selSalidaNoche() {
    this.flagSNactivo = !this.flagSNactivo;
  }

}
