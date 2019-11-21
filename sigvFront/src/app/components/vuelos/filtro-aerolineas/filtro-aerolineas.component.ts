import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AirportService } from '../../../services/airport.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-filtro-aerolineas',
  templateUrl: './filtro-aerolineas.component.html',
  styleUrls: ['./filtro-aerolineas.component.sass']
})
export class FiltroAerolineasComponent implements OnInit, AfterViewInit {

  @Input() lstAerolineas;

  @Output() searchFlightFilter = new EventEmitter<ISearchFlightModel[]>();

  resultFilter: ISearchFlightModel[] = [];
  checkAll: boolean;
  check: boolean;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService,
    private airportService: AirportService
  ) {
    this.resultFilter = this.sessionStorageService.retrieve('ss_searchFlight');
  }

  ngOnInit() {
    this.checkAll = true;
    this.check = false;
  }

  ngAfterViewInit() {
  }

  filtrarAerolinea(carrierId, eve: any) {
    console.log("carrierId: " + carrierId);
    if (carrierId === 'all') {
      if (this.checkAll === true) {
        let searchFlight = this.sessionStorageService.retrieve('ss_searchFlight');
        console.log("searchFlight INI: " + JSON.stringify(searchFlight));
        //this.check = false;

        this.lstAerolineas.forEach(function(aerolinea) {
          $("#" + aerolinea.carrierId).prop("checked", false);
          aerolinea.filter = 0;
        });

        searchFlight.forEach(function(item) {
          item.isVisible = true;
        });

        console.log("searchFlight FIN: " + JSON.stringify(searchFlight));

        this.sessionStorageService.store('ss_searchFlight', searchFlight);

        this.searchFlightFilter.emit(searchFlight);
      } else {}
    } else {
      if (eve.currentTarget.checked) {
        this.checkAll = false;
        let searchFlight = this.sessionStorageService.retrieve('ss_searchFlight');
        console.log("searchFlight INI: " + JSON.stringify(searchFlight));

        searchFlight.forEach(function(item) {
          item.isVisible = false;
        });

        this.lstAerolineas.forEach(function(aerolinea) {
          if (aerolinea.carrierId === carrierId) {
            aerolinea.filter = 1;
          }
        });

        const lstAerolineas = this.lstAerolineas;

        searchFlight.forEach(function(item) {
          lstAerolineas.forEach(function(item2) {
            if (item.carrierId === item2.carrierId) {
              if (item2.filter === 1) {
                item.isVisible = true;
              }
            }
          });
        });

        console.log("searchFlight FIN: " + JSON.stringify(searchFlight));

        this.sessionStorageService.store('ss_searchFlight', searchFlight);

        /*
        let resultFilter = this.resultFilter;
        this.lstAerolineas.forEach(function(aerolinea) {
          if (aerolinea.filter === 1) {
            resultFilter = searchFlight.filter(x => x.carrierId === carrierId);
          }
        });
        */

        //const resultFilter = searchFlight.filter(this.filterByCarrierId);

        //const resultFilter = searchFlight.filter(x => x.carrierId === carrierId);
        //this.resultFilter = resultFilter;
        this.searchFlightFilter.emit(searchFlight);
      } else {
        let searchFlight = this.sessionStorageService.retrieve('ss_searchFlight');
        console.log("searchFlight INI: " + JSON.stringify(searchFlight));

        searchFlight.forEach(function(item) {
          item.isVisible = false;
        });

        this.lstAerolineas.forEach(function(aerolinea) {
          if (aerolinea.carrierId === carrierId) {
            aerolinea.filter = 0;
          }
        });

        const lstAerolineas = this.lstAerolineas;

        searchFlight.forEach(function(item) {
          lstAerolineas.forEach(function(item2) {
            if (item.carrierId === item2.carrierId) {
              if (item2.filter === 1) {
                item.isVisible = true;
              }
            }
          });
        });

        console.log("searchFlight FIN: " + JSON.stringify(searchFlight));

        this.sessionStorageService.store('ss_searchFlight', searchFlight);

        this.searchFlightFilter.emit(searchFlight);


        /*
        this.lstAerolineas.forEach(function(aerolinea) {
          if (aerolinea.carrierId === carrierId) {
            aerolinea.filter = 0;
          }
        });
        */

        /*
        let resultFilter = this.resultFilter;
        this.lstAerolineas.forEach(function(aerolinea) {
          if (aerolinea.filter === 1) {
            const resultFilter = searchFlight.filter(x => x.carrierId === carrierId);
          }
        });
        */
      }
    }
  }

  /*
  filterByCarrierId(recomendacion) {
    let flagVal = 0;
    this.lstAerolineas.forEach(function(aerolinea) {
      if (aerolinea.carrierId === carrierId) {
        flagVal = 1;
      }
    });

    if (flagVal === 1) {
      return true;
    }
  }
  */

}
