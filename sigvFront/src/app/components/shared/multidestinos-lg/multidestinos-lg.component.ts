import { Component, OnInit } from '@angular/core';
import { ILoginDatosModel } from '../../../models/ILoginDatos.model';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { AirportService } from '../../../services/airport.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-multidestinos-lg',
  templateUrl: './multidestinos-lg.component.html',
  styleUrls: ['./multidestinos-lg.component.sass']
})
export class MultidestinosLgComponent implements OnInit {

  airportlist: any[] = [];
  airportlistFilter: any[] = [];
  loginDataUser: ILoginDatosModel;
  searchData: ISearchFlightModel[] = [];
  keyword = 'name';
  data: any[] = [];
  data2: any[] = [];
  data3: any[] = [];
  data4: any[] = [];
  data5: any[] = [];
  data6: any[] = [];
  data7: any[] = [];
  data8: any[] = [];
  data9: any[] = [];
  data10: any[] = [];
  data11: any[] = [];
  data12: any[] = [];
  origenAuto1: string;
  origenAuto2: string;
  origenAuto3: string;
  origenAuto4: string;
  origenAuto5: string;
  origenAuto6: string;
  origentTexto1: string;
  origentTexto2: string;
  origentTexto3: string;
  origentTexto4: string;
  origentTexto5: string;
  origentTexto6: string;
  destinoAuto1: string;
  destinoAuto2: string;
  destinoAuto3: string;
  destinoAuto4: string;
  destinoAuto5: string;
  destinoAuto6: string;
  destinoTexto1: string;
  destinoTexto2: string;
  destinoTexto3: string;
  destinoTexto4: string;
  destinoTexto5: string;
  destinoTexto6: string;
  flagTramo3: boolean;
  flagTramo4: boolean;
  flagTramo5: boolean;
  flagTramo6: boolean;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private airportService: AirportService
  ) {
    this.flagTramo3 = false;
    this.flagTramo4 = false;
    this.flagTramo5 = false;
    this.flagTramo6 = false;
  }

  ngOnInit() {
    this.airportlist = this.localStorageService.retrieve('ls_airportlist');
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
  }

  selectEvent(flag, item) {
    // do something with selected item
    console.log("selectEvent");
    console.log(item);

    /*
    if (flag === 1) {
      this.origenAuto1 = item.airportCode;
      this.origentTexto1 = item.airportDescription;
      setTimeout(function() {
        $(".x").hide();
      }, 1000);
    }
    */

    switch (flag) {
      case 1:
        this.origenAuto1 = item.iataCode;
        this.origentTexto1 = item.name;
        break;
      case 2:
        this.destinoAuto1 = item.iataCode;
        this.destinoTexto1 = item.name;
        break;
      case 3:
        this.origenAuto2 = item.iataCode;
        this.origentTexto2 = item.name;
        break;
      case 4:
        this.destinoAuto2 = item.iataCode;
        this.destinoTexto2 = item.name;
        break;
      case 5:
        this.origenAuto3 = item.iataCode;
        this.origentTexto3 = item.name;
        break;
      case 6:
        this.destinoAuto3 = item.iataCode;
        this.destinoTexto3 = item.name;
        break;
      case 7:
        this.origenAuto4 = item.iataCode;
        this.origentTexto4 = item.name;
        break;
      case 8:
        this.destinoAuto4 = item.iataCode;
        this.destinoTexto4 = item.name;
        break;
      case 9:
        this.origenAuto5 = item.iataCode;
        this.origentTexto5 = item.name;
        break;
      case 10:
        this.destinoAuto5 = item.iataCode;
        this.destinoTexto5 = item.name;
        break;
      case 11:
        this.origenAuto6 = item.iataCode;
        this.origentTexto6 = item.name;
        break;
      case 12:
        this.destinoAuto6 = item.iataCode;
        this.destinoTexto6 = item.name;
        break;
    }

    setTimeout(function() {
      $(".x").hide();
    }, 1000);

  }

  onChangeSearch(flag, val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
    if (flag === 1) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 2) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data2 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 3) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data3 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 4) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data4 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 5) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data5 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 6) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data6 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 7) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data7 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 8) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data8 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 9) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data9 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 10) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data10 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 11) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data11 = resultFilter;

        $(".x").hide();
      }
    }

    if (flag === 12) {
      $(".x").hide();
      if (val.length >= 3) {
        const resultFilter = this.airportlist.filter( word => word.name.toLowerCase().search(val.toLowerCase()) > 0 );
        this.data12 = resultFilter;

        $(".x").hide();
      }
    }
  }

  onFocused(flag, e) {
    // do something when input is focused
    console.log("onFocused");
    console.log(e);
  }

  agregarTramo(tramo) {
    if (tramo === 3) {
      this.flagTramo3 = true;
    }

    if (tramo === 4) {
      this.flagTramo4 = true;
    }

    if (tramo === 5) {
      this.flagTramo5 = true;
    }

    if (tramo === 6) {
      this.flagTramo6 = true;
    }
  }

  eliminarTramo(tramo) {
    if (tramo === 3) {
      this.flagTramo3 = false;
    }

    if (tramo === 4) {
      this.flagTramo4 = false;
    }

    if (tramo === 5) {
      this.flagTramo5 = false;
    }

    if (tramo === 6) {
      this.flagTramo6 = false;
    }
  }

}
