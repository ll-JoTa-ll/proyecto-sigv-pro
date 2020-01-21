import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AirportService } from '../../../services/airport.service';

@Component({
  selector: 'app-filtro-superior',
  templateUrl: './filtro-superior.component.html',
  styleUrls: ['./filtro-superior.component.sass']
})
export class FiltroSuperiorComponent implements OnInit {

  @Input() tipoEscala;

  @Output() searchFilter = new EventEmitter<ISearchFlightModel[]>();
  //@Output() vuelosManiana = new EventEmitter<boolean>();
  //@Output() vuelosNoche = new EventEmitter<boolean>();
  //@Output() filtroTurnos = new EventEmitter<boolean>();
  @Output() filterTurn = new EventEmitter<any>();

  searchFlight: ISearchFlightModel[] = [];
  flagVD: boolean;
  flagSM: boolean;
  flagSN: boolean;
  flagVDactivo: boolean;
  flagSMactivo: boolean;
  flagSNactivo: boolean;
  dataRequestFlight: any;
  departureArrivalTimeFrom;
  departureArrivalTimeTo;
  ss_horasFrom;
  ss_horasTo;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService,
    private airportService: AirportService
  ) {
    this.flagSM = true;
    this.flagSN = true;
    this.flagVDactivo = false;
    this.flagSMactivo = false;
    this.flagSNactivo = false;
    //this.ss_horasFrom = this.sessionStorageService.retrieve('ss_horasFrom');
    //this.ss_horasTo = this.sessionStorageService.retrieve('ss_horasTo');
    //console.log('ss_horasFrom: ' + this.ss_horasFrom);
    //console.log('ss_horasTo: ' + this.ss_horasTo);
  }

  ngOnInit() {
    console.log('this.tipoEscala: ' + this.tipoEscala);
    if (this.tipoEscala === '') {
      this.flagVD = true;
    } else {
      this.flagVD = false;
    }
    this.searchFlight = this.sessionStorageService.retrieve('ss_searchFlight');
    //this.dataRequestFlight = this.sessionStorageService.retrieve('ss_dataRequestFlight');
  }

  selDirectos(tipo) {
    this.spinner.show();
    if (tipo === 1) {
      this.flagVDactivo = !this.flagVDactivo;
    }
    let searchFlight = this.sessionStorageService.retrieve('ss_searchFlight');
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
      console.log('resultados');
      console.log(searchFlight);
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

  selSalidaManiana(tipo) {
    /*
    this.flagSMactivo = !this.flagSMactivo;
    this.flagSNactivo = false;
    const data = {
      soloManiana: this.flagSMactivo,
      soloNoche: this.flagSNactivo,
      filtroTurnos: true
    };
    this.filterTurn.emit(data);
    */
    this.spinner.show();
    if (tipo === 1) {
      this.flagSMactivo = !this.flagSMactivo;
      this.flagSNactivo = false;
    }

    this.departureArrivalTimeFrom = null;
    this.departureArrivalTimeTo = null;

    let dataRequestFlight = this.sessionStorageService.retrieve('ss_dataRequestFlight');
    console.log('dataRequestFlight: ' + JSON.stringify(dataRequestFlight));
    let data = {
      "Lusers": dataRequestFlight.Lusers,
      "NumberPassengers": dataRequestFlight.NumberPassengers,
      "NumberRecommendations": dataRequestFlight.NumberRecommendations,
      "CabinType": dataRequestFlight.CabinType,
      "Scales": dataRequestFlight.Scales,
      "Origin": dataRequestFlight.Origin,
      "Destination": dataRequestFlight.Destination,
      "DepartureArrivalDate": dataRequestFlight.DepartureArrivalDate,
      "DepartureArrivalTimeFrom": dataRequestFlight.DepartureArrivalTimeFrom,
      "DepartureArrivalTimeTo": dataRequestFlight.DepartureArrivalTimeTo,
      "Ocompany": dataRequestFlight.Ocompany
    };

    /*
    let departureArrivalTimeFrom = dataRequestFlight.DepartureArrivalTimeFrom;
    console.log('departureArrivalTimeFrom: ' + JSON.stringify(departureArrivalTimeFrom));
    this.departureArrivalTimeFrom = departureArrivalTimeFrom;
    let departureArrivalTimeTo = dataRequestFlight.DepartureArrivalTimeTo;
    console.log('departureArrivalTimeTo: ' + JSON.stringify(departureArrivalTimeTo));
    this.departureArrivalTimeTo = departureArrivalTimeTo;
    */

    console.log('this.flagSMactivo: ' + this.flagSMactivo);
    if (this.flagSMactivo === true) {
      //console.log('ss_horasFrom: ' + this.ss_horasFrom);
      //console.log('ss_horasTo: ' + this.ss_horasTo);
      //departureArrivalTimeFrom[0] = '0500';
      //departureArrivalTimeTo[0] = '1159';
      //console.log('ss_horasFrom: ' + this.ss_horasFrom);
      //console.log('ss_horasTo: ' + this.ss_horasTo);
      //dataRequestFlight.DepartureArrivalTimeFrom = departureArrivalTimeFrom;
      //dataRequestFlight.DepartureArrivalTimeTo = departureArrivalTimeTo;

      const departureArrivalTimeFrom_ = dataRequestFlight.DepartureArrivalTimeFrom;
      departureArrivalTimeFrom_[0] = '0500';
      const departureArrivalTimeTo_ = dataRequestFlight.DepartureArrivalTimeTo;
      departureArrivalTimeTo_[0] = '1159';

      data.DepartureArrivalTimeFrom = departureArrivalTimeFrom_;
      data.DepartureArrivalTimeTo = departureArrivalTimeTo_;
    } else {

      const ss_horasFrom = this.sessionStorageService.retrieve('ss_horasFrom');
      const ss_horasTo = this.sessionStorageService.retrieve('ss_horasTo');
      console.log('ss_horasFrom: ' + JSON.stringify(ss_horasFrom));
      console.log('ss_horasTo: ' + JSON.stringify(ss_horasTo));
      data.DepartureArrivalTimeFrom = ss_horasFrom;
      data.DepartureArrivalTimeTo = ss_horasTo;

      const departureArrivalTimeFrom_ = dataRequestFlight.DepartureArrivalTimeFrom;
      departureArrivalTimeFrom_[0] = '';
      const departureArrivalTimeTo_ = dataRequestFlight.DepartureArrivalTimeTo;
      departureArrivalTimeTo_[0] = '';

      data.DepartureArrivalTimeFrom = departureArrivalTimeFrom_;
      data.DepartureArrivalTimeTo = departureArrivalTimeTo_;
    }

    console.log('dataRequestFlight: ' + JSON.stringify(data));

    this.airportService.searchFlight(data).subscribe(
      result => {
        console.log(result);
        this.sessionStorageService.store('ss_searchFlight', result);
        //this.searchFilter.emit(result);
      },
      err => {
        this.spinner.hide();
        console.log("ERROR dataRequestFlight: " + err);
      },
      () => {
        //this.spinner.hide();
        dataRequestFlight = null;
        this.selDirectos(2);
        console.log("this.airportService.searchFlight dataRequestFlight completado");
      }
    );
  }

  selSalidaNoche(tipo) {
    /*
    this.flagSNactivo = !this.flagSNactivo;
    this.flagSMactivo = false;
    const data = {
      soloManiana: this.flagSMactivo,
      soloNoche: this.flagSNactivo,
      filtroTurnos: true
    };
    this.filterTurn.emit(data);
    */
    this.spinner.show();
    if (tipo === 1) {
      this.flagSNactivo = !this.flagSNactivo;
      this.flagSMactivo = false;
    }

    this.departureArrivalTimeFrom = null;
    this.departureArrivalTimeTo = null;

    let dataRequestFlight = this.sessionStorageService.retrieve('ss_dataRequestFlight');
    console.log('dataRequestFlight: ' + JSON.stringify(dataRequestFlight));
    let data = {
      "Lusers": dataRequestFlight.Lusers,
      "NumberPassengers": dataRequestFlight.NumberPassengers,
      "NumberRecommendations": dataRequestFlight.NumberRecommendations,
      "CabinType": dataRequestFlight.CabinType,
      "Scales": dataRequestFlight.Scales,
      "Origin": dataRequestFlight.Origin,
      "Destination": dataRequestFlight.Destination,
      "DepartureArrivalDate": dataRequestFlight.DepartureArrivalDate,
      "DepartureArrivalTimeFrom": dataRequestFlight.DepartureArrivalTimeFrom,
      "DepartureArrivalTimeTo": dataRequestFlight.DepartureArrivalTimeTo,
      "Ocompany": dataRequestFlight.Ocompany
    };

    /*
    let departureArrivalTimeFrom = dataRequestFlight.DepartureArrivalTimeFrom;
    console.log('departureArrivalTimeFrom: ' + JSON.stringify(departureArrivalTimeFrom));
    this.departureArrivalTimeFrom = departureArrivalTimeFrom;
    let departureArrivalTimeTo = dataRequestFlight.DepartureArrivalTimeTo;
    console.log('departureArrivalTimeTo: ' + JSON.stringify(departureArrivalTimeTo));
    this.departureArrivalTimeTo = departureArrivalTimeTo;
    */

    console.log('this.flagSNactivo: ' + this.flagSNactivo);
    if (this.flagSNactivo === true) {
      //console.log('ss_horasFrom: ' + this.ss_horasFrom);
      //console.log('ss_horasTo: ' + this.ss_horasTo);
      //departureArrivalTimeFrom[0] = '0500';
      //departureArrivalTimeTo[0] = '1159';
      //console.log('ss_horasFrom: ' + this.ss_horasFrom);
      //console.log('ss_horasTo: ' + this.ss_horasTo);
      //dataRequestFlight.DepartureArrivalTimeFrom = departureArrivalTimeFrom;
      //dataRequestFlight.DepartureArrivalTimeTo = departureArrivalTimeTo;

      const departureArrivalTimeFrom_ = dataRequestFlight.DepartureArrivalTimeFrom;
      departureArrivalTimeFrom_[0] = '1900';
      const departureArrivalTimeTo_ = dataRequestFlight.DepartureArrivalTimeTo;
      departureArrivalTimeTo_[0] = '2359';

      data.DepartureArrivalTimeFrom = departureArrivalTimeFrom_;
      data.DepartureArrivalTimeTo = departureArrivalTimeTo_;
    } else {

      const ss_horasFrom = this.sessionStorageService.retrieve('ss_horasFrom');
      const ss_horasTo = this.sessionStorageService.retrieve('ss_horasTo');
      console.log('ss_horasFrom: ' + JSON.stringify(ss_horasFrom));
      console.log('ss_horasTo: ' + JSON.stringify(ss_horasTo));
      data.DepartureArrivalTimeFrom = ss_horasFrom;
      data.DepartureArrivalTimeTo = ss_horasTo;

      const departureArrivalTimeFrom_ = dataRequestFlight.DepartureArrivalTimeFrom;
      departureArrivalTimeFrom_[0] = '';
      const departureArrivalTimeTo_ = dataRequestFlight.DepartureArrivalTimeTo;
      departureArrivalTimeTo_[0] = '';

      data.DepartureArrivalTimeFrom = departureArrivalTimeFrom_;
      data.DepartureArrivalTimeTo = departureArrivalTimeTo_;
    }

    console.log('dataRequestFlight: ' + JSON.stringify(data));

    this.airportService.searchFlight(data).subscribe(
      result => {
        console.log(result);
        this.sessionStorageService.store('ss_searchFlight', result);
        //this.searchFilter.emit(result);
      },
      err => {
        this.spinner.hide();
        console.log("ERROR dataRequestFlight: " + err);
      },
      () => {
        //this.spinner.hide();
        dataRequestFlight = null;
        this.selDirectos(2);
        console.log("this.airportService.searchFlight dataRequestFlight completado");
      }
    );
  }

  cerrarVD() {
    const flagVDactivo = this.flagVDactivo;
    if (flagVDactivo === false) {
      this.flagVD = !this.flagVD;
    } else {
      this.flagVDactivo = false;
      this.flagVD = !this.flagVD;
      this.selDirectos(2);
    }
  }

  cerrarSM() {
    //flagSM=!flagSM
    const flagSMactivo = this.flagSMactivo;
    if (flagSMactivo === false) {
      this.flagSM = false;
    } else {
      this.flagSMactivo = false;
      this.flagSM = false;
      this.selSalidaManiana(2);
    }
  }

  cerrarSN() {
    //flagSN=!flagSN
    const flagSNactivo = this.flagSNactivo;
    if (flagSNactivo === false) {
      this.flagSN = false;
    } else {
      this.flagSNactivo = false;
      this.flagSN = false;
      this.selSalidaNoche(2);
    }
  }

}
