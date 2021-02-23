import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { ISearchFlightModel } from '../../../models/ISearchFlight.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AirportService } from '../../../services/airport.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-filtro-horarios',
  templateUrl: './filtro-horarios.component.html',
  styleUrls: ['./filtro-horarios.component.sass']
})
export class FiltroHorariosComponent implements OnInit, AfterViewInit {

  @Input() indexTramo;
  @Input() tipoVuelo;
  maleta;

  @Output() searchFilter = new EventEmitter<ISearchFlightModel[]>();

  horario1 = 1;
  horario2 = 2;
  horario3 = 3;
  horario4 = 4;
  horario5 = 5;
  horario6 = 6;
  isMeridian = false;
  showSpinners = false;
  myTime1;
  myTime2;
  myTime3;
  myTime4;
  myTime5;
  myTime6;
  myTime7;
  myTime8;
  myTime9;
  myTime10;
  myTime11;
  myTime12;
  hoursPlaceholder = 'hh';
  minutesPlaceholder = 'mm';
  searchFlight: ISearchFlightModel[] = [];
  texto1: string;
  texto2: string;
  texto3: string;
  texto4: string;
  texto5: string;
  texto6: string;
  imgIdaVuelta1;
  imgIdaVuelta2;
  imgIdaVuelta3;
  imgIdaVuelta4;
  imgIdaVuelta5;
  imgIdaVuelta6;

  constructor(
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService,
    private airportService: AirportService
  ) { }

  ngOnInit() {
    const tipoVuelo = this.tipoVuelo;
    if (tipoVuelo === 'RT') {
      this.indexTramo = 2;
      this.texto1 = 'Ida';
      this.texto2 = 'Vuelta';
      this.imgIdaVuelta1 = 'avion_ida_blanco.svg';
      this.imgIdaVuelta2 = 'avion_vuelta_blanco.svg';
    }
    if (tipoVuelo === 'OW') {
      this.indexTramo = 1;
      this.texto1 = 'Ida';
      this.imgIdaVuelta1 = 'avion_ida_blanco.svg';
    }
    if (tipoVuelo === 'MC') {
      this.texto1 = 'Tramo 1';
      this.texto2 = 'Tramo 2';
      this.texto3 = 'Tramo 3';
      this.texto4 = 'Tramo 4';
      this.texto5 = 'Tramo 5';
      this.texto6 = 'Tramo 6';
      this.imgIdaVuelta1 = 'avion_ida_blanco.svg';
      this.imgIdaVuelta2 = 'avion_ida_blanco.svg';
      this.imgIdaVuelta3 = 'avion_ida_blanco.svg';
      this.imgIdaVuelta4 = 'avion_ida_blanco.svg';
      this.imgIdaVuelta5 = 'avion_ida_blanco.svg';
      this.imgIdaVuelta6 = 'avion_ida_blanco.svg';
    }
  }

  ngAfterViewInit() {
    const indexTramo = this.indexTramo;
    /*
    for (let i = 1; i <= (indexTramo * 2); i++) {
      $('.timepicker' + i).wickedpicker({twentyFour: true});
      $('.timepicker' + i).val('');
    }
    */
  }

  setHorarios() {
    //console.log('this.myTime1: ' + this.myTime1);
    //var timepicker = $('.timepicker1').wickedpicker();
    //console.log(timepicker.wickedpicker('time'));
    //console.log('timepicker1.val(): ', $('.timepicker1').val());

    this.spinner.show();
    const leta = document.getElementById('chkmaleta');
    this.maleta = leta;
    let dataRequestFlight = this.sessionStorageService.retrieve('ss_dataRequestFlight');
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
      "Ocompany": dataRequestFlight.Ocompany,
      "IncludesBaggage": this.maleta.checked
    };

    const ss_filterPrecio = this.sessionStorageService.retrieve('ss_filterPrecio');
    const indexTramo = this.indexTramo;
    const departureArrivalTimeFrom_ = dataRequestFlight.DepartureArrivalTimeFrom;
    const departureArrivalTimeTo_ = dataRequestFlight.DepartureArrivalTimeTo;

    const time1 = $('#timepicker1').val();
    const time2 = $('#timepicker2').val();
    const time3 = $('#timepicker3').val();
    const time4 = $('#timepicker4').val();
    const time5 = $('#timepicker5').val();
    const time6 = $('#timepicker6').val();
    const time7 = $('#timepicker7').val();
    const time8 = $('#timepicker8').val();
    const time9 = $('#timepicker9').val();
    const time10 = $('#timepicker10').val();
    const time11 = $('#timepicker11').val();
    const time12 = $('#timepicker12').val();

    console.log("time1: " + time1);
    console.log("time2: " + time2);

    switch (indexTramo) {
      case 1:
        departureArrivalTimeFrom_[0] = time1;//this.getHoraMinuto(time1);
        departureArrivalTimeTo_[0] = time2;//this.getHoraMinuto(time2);
        break;
      case 2:
        departureArrivalTimeFrom_[0] = time1;//this.getHoraMinuto(time1);
        departureArrivalTimeTo_[0] = time2;//this.getHoraMinuto(time2);
        departureArrivalTimeFrom_[1] = time3;//this.getHoraMinuto(time3);
        departureArrivalTimeTo_[1] = time4;//this.getHoraMinuto(time4);
        break;
      case 3:
        departureArrivalTimeFrom_[0] = time1;//this.getHoraMinuto(time1);
        departureArrivalTimeTo_[0] = time2;//this.getHoraMinuto(time2);
        departureArrivalTimeFrom_[1] = time3;//this.getHoraMinuto(time3);
        departureArrivalTimeTo_[1] = time4;//this.getHoraMinuto(time4);
        departureArrivalTimeFrom_[2] = time5;//this.getHoraMinuto(time5);
        departureArrivalTimeTo_[2] = time6;//this.getHoraMinuto(time6);
        break;
      case 4:
        departureArrivalTimeFrom_[0] = time1;//this.getHoraMinuto(time1);
        departureArrivalTimeTo_[0] = time2;//this.getHoraMinuto(time2);
        departureArrivalTimeFrom_[1] = time3;//this.getHoraMinuto(time3);
        departureArrivalTimeTo_[1] = time4;//this.getHoraMinuto(time4);
        departureArrivalTimeFrom_[2] = time5;//this.getHoraMinuto(time5);
        departureArrivalTimeTo_[2] = time6;//this.getHoraMinuto(time6);
        departureArrivalTimeFrom_[3] = time7;//this.getHoraMinuto(time7);
        departureArrivalTimeTo_[3] = time8;//this.getHoraMinuto(time8);
        break;
      case 5:
        departureArrivalTimeFrom_[0] = time1;//this.getHoraMinuto(time1);
        departureArrivalTimeTo_[0] = time2;//this.getHoraMinuto(time2);
        departureArrivalTimeFrom_[1] = time3;//this.getHoraMinuto(time3);
        departureArrivalTimeTo_[1] = time4;//this.getHoraMinuto(time4);
        departureArrivalTimeFrom_[2] = time5;//this.getHoraMinuto(time5);
        departureArrivalTimeTo_[2] = time6;//this.getHoraMinuto(time6);
        departureArrivalTimeFrom_[3] = time7;//this.getHoraMinuto(time7);
        departureArrivalTimeTo_[3] = time8;//this.getHoraMinuto(time8);
        departureArrivalTimeFrom_[4] = time9;//this.getHoraMinuto(time9);
        departureArrivalTimeTo_[4] = time10;//this.getHoraMinuto(time10);
        break;
      case 6:
        departureArrivalTimeFrom_[0] = time1;//this.getHoraMinuto(time1);
        departureArrivalTimeTo_[0] = time2;//this.getHoraMinuto(time2);
        departureArrivalTimeFrom_[1] = time3;//this.getHoraMinuto(time3);
        departureArrivalTimeTo_[1] = time4;//this.getHoraMinuto(time4);
        departureArrivalTimeFrom_[2] = time5;//this.getHoraMinuto(time5);
        departureArrivalTimeTo_[2] = time6;//this.getHoraMinuto(time6);
        departureArrivalTimeFrom_[3] = time7;//this.getHoraMinuto(time7);
        departureArrivalTimeTo_[3] = time8;//this.getHoraMinuto(time8);
        departureArrivalTimeFrom_[4] = time9;//this.getHoraMinuto(time9);
        departureArrivalTimeTo_[4] = time10;//this.getHoraMinuto(time10);
        departureArrivalTimeFrom_[5] = time11;//this.getHoraMinuto(time11);
        departureArrivalTimeTo_[5] = time12;//this.getHoraMinuto(time12);
        break;
    }

    data.DepartureArrivalTimeFrom = departureArrivalTimeFrom_;
    data.DepartureArrivalTimeTo = departureArrivalTimeTo_;

    console.log('dataRequestFlight: ' + JSON.stringify(data));
    this.airportService.searchFlight(data).subscribe(
      result => {
        if (result !== null && result.length > 0) {
          if (ss_filterPrecio === 'mas') {
            result.sort((a, b) => a.totalFareAmount - b.totalFareAmount );
          }
          if (ss_filterPrecio === 'menos') {
            result.sort((a, b) => b.totalFareAmount - a.totalFareAmount );
          }
        }
        console.log(result);
        this.sessionStorageService.store('ss_searchFlight', result);
        this.searchFilter.emit(result);
      },
      err => {
        this.spinner.hide();
        console.log("ERROR dataRequestFlight: " + err);
      },
      () => {
        //this.spinner.hide();
        //dataRequestFlight = null;
        console.log("this.airportService.searchFlight dataRequestFlight completado");
      }
    );
  }

  getHoraMinuto(valor) {
    console.log('valor: ' + valor);
    if (valor === '') {
      return '';
    } else {
      return valor.replace(' : ', '');
    }
  }

}
