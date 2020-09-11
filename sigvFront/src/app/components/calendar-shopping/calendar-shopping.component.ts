import { Component, OnInit, Output, AfterViewInit, EventEmitter, Input } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { SevenPriceModel } from 'src/app/models/SevenPrice.model';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-calendar-shopping',
  templateUrl: './calendar-shopping.component.html',
  styleUrls: ['./calendar-shopping.component.sass']
})
export class CalendarShoppingComponent implements OnInit , AfterViewInit {

  lowCost;
  lowCostAll;
  aerolineaShow = false;
  calendarShow = true;
  @Input() salida: boolean;
  spinner = true;
  currency = 'US$';
  space = ' '
  @Output() fechas = new EventEmitter<any>();
  list = {
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
  };
  list2 = {
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
  };
  list3 = {
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
  };
  list4 = {
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
  };
  list5 = {
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
  };
  list6 = {
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
  };
  list7 = {
    price1: 0,
    price2: 0,
    price3: 0,
    price4: 0,
    price5: 0,
    price6: 0,
    price7: 0,
  };
  listCarrier = {
    carrier1: '',
    carrier2: '',
    carrier3: '',
    carrier4: '',
    carrier5: '',
    carrier6: '',
    carrier7: '',
  };
  listCarrier2 = {
    carrier1: '',
    carrier2: '',
    carrier3: '',
    carrier4: '',
    carrier5: '',
    carrier6: '',
    carrier7: '',
  };
  listCarrier3 = {
    carrier1: '',
    carrier2: '',
    carrier3: '',
    carrier4: '',
    carrier5: '',
    carrier6: '',
    carrier7: '',
  };
  listCarrier4 = {
    carrier1: '',
    carrier2: '',
    carrier3: '',
    carrier4: '',
    carrier5: '',
    carrier6: '',
    carrier7: '',
  };
  listCarrier5 = {
    carrier1: '',
    carrier2: '',
    carrier3: '',
    carrier4: '',
    carrier5: '',
    carrier6: '',
    carrier7: '',
  };
  listCarrier6 = {
    carrier1: '',
    carrier2: '',
    carrier3: '',
    carrier4: '',
    carrier5: '',
    carrier6: '',
    carrier7: '',
  };
  listCarrier7 = {
    carrier1: '',
    carrier2: '',
    carrier3: '',
    carrier4: '',
    carrier5: '',
    carrier6: '',
    carrier7: '',
  };
  listSalida = {
    salida1: '',
    salida2: '',
    salida3: '',
    salida4: '',
    salida5: '',
    salida6: '',
    salida7: '',
  };
  listSalida2 = {
    salida1: '',
    salida2: '',
    salida3: '',
    salida4: '',
    salida5: '',
    salida6: '',
    salida7: '',
  };
  listSalida3 = {
    salida1: '',
    salida2: '',
    salida3: '',
    salida4: '',
    salida5: '',
    salida6: '',
    salida7: '',
  };
  listSalida4 = {
    salida1: '',
    salida2: '',
    salida3: '',
    salida4: '',
    salida5: '',
    salida6: '',
    salida7: '',
  };
  listSalida5 = {
    salida1: '',
    salida2: '',
    salida3: '',
    salida4: '',
    salida5: '',
    salida6: '',
    salida7: '',
  };
  listSalida6 = {
    salida1: '',
    salida2: '',
    salida3: '',
    salida4: '',
    salida5: '',
    salida6: '',
    salida7: '',
  };
  listSalida7 = {
    salida1: '',
    salida2: '',
    salida3: '',
    salida4: '',
    salida5: '',
    salida6: '',
    salida7: '',
  };
  listLlegada = {
    llegada1: '',
    llegada2: '',
    llegada3: '',
    llegada4: '',
    llegada5: '',
    llegada6: '',
    llegada7: '',
  };
  listLlegada2 = {
    llegada1: '',
    llegada2: '',
    llegada3: '',
    llegada4: '',
    llegada5: '',
    llegada6: '',
    llegada7: '',
  };
  listLlegada3 = {
    llegada1: '',
    llegada2: '',
    llegada3: '',
    llegada4: '',
    llegada5: '',
    llegada6: '',
    llegada7: '',
  };
  listLlegada4 = {
    llegada1: '',
    llegada2: '',
    llegada3: '',
    llegada4: '',
    llegada5: '',
    llegada6: '',
    llegada7: '',
  };
  listLlegada5 = {
    llegada1: '',
    llegada2: '',
    llegada3: '',
    llegada4: '',
    llegada5: '',
    llegada6: '',
    llegada7: '',
  };
  listLlegada6 = {
    llegada1: '',
    llegada2: '',
    llegada3: '',
    llegada4: '',
    llegada5: '',
    llegada6: '',
    llegada7: '',
  };
  listLlegada7 = {
    llegada1: '',
    llegada2: '',
    llegada3: '',
    llegada4: '',
    llegada5: '',
    llegada6: '',
    llegada7: '',
  };
  listFare = {
    fare1: '',
    fare2: '',
    fare3: '',
    fare4: '',
    fare5: '',
    fare6: '',
    fare7: '',
  };
  listFare2 = {
    fare1: '',
    fare2: '',
    fare3: '',
    fare4: '',
    fare5: '',
    fare6: '',
    fare7: '',
  };
  listFare3 = {
    fare1: '',
    fare2: '',
    fare3: '',
    fare4: '',
    fare5: '',
    fare6: '',
    fare7: '',
  };
  listFare4 = {
    fare1: '',
    fare2: '',
    fare3: '',
    fare4: '',
    fare5: '',
    fare6: '',
    fare7: '',
  };
  listFare5 = {
    fare1: '',
    fare2: '',
    fare3: '',
    fare4: '',
    fare5: '',
    fare6: '',
    fare7: '',
  };
  listFare6 = {
    fare1: '',
    fare2: '',
    fare3: '',
    fare4: '',
    fare5: '',
    fare6: '',
    fare7: '',
  };
  listFare7 = {
    fare1: '',
    fare2: '',
    fare3: '',
    fare4: '',
    fare5: '',
    fare6: '',
    fare7: '',
  };
  listCheap = {
    cheap1: false,
    cheap2: false,
    cheap3: false,
    cheap4: false,
    cheap5: false,
    cheap6: false,
    cheap7: false,
  };
  listCheap2 = {
    cheap1: false,
    cheap2: false,
    cheap3: false,
    cheap4: false,
    cheap5: false,
    cheap6: false,
    cheap7: false,
  };
  listCheap3 = {
    cheap1: false,
    cheap2: false,
    cheap3: false,
    cheap4: false,
    cheap5: false,
    cheap6: false,
    cheap7: false,
  };
  listCheap4 = {
    cheap1: false,
    cheap2: false,
    cheap3: false,
    cheap4: false,
    cheap5: false,
    cheap6: false,
    cheap7: false,
  };
  listCheap5 = {
    cheap1: false,
    cheap2: false,
    cheap3: false,
    cheap4: false,
    cheap5: false,
    cheap6: false,
    cheap7: false,
  };
  listCheap6 = {
    cheap1: false,
    cheap2: false,
    cheap3: false,
    cheap4: false,
    cheap5: false,
    cheap6: false,
    cheap7: false,
  };
  listCheap7 = {
    cheap1: false,
    cheap2: false,
    cheap3: false,
    cheap4: false,
    cheap5: false,
    cheap6: false,
    cheap7: false,
  };
  calendar;
  buscador;
  ida;
  vuelta;
  fecVuelta: Date;
  one;
  two;
  three;
  four;
  five;
  six;
  seven;
  oneV;
  twoV;
  threeV;
  fourV;
  fiveV;
  sixV;
  sevenV;
  a;
  b;
  c;
  d;
  e;
  f;
  g;
  h;
  i;
  j;
  k;
  l;
  m;
  n;
  aShow;
  bShow;
  cShow;
  dShow;
  eShow;
  fShow;
  gShow;
  hShow;
  iShow;
  jShow;
  kShow;
  lShow;
  mShow;
  nShow;
  NotFound = 'Sin información';
  buscadormini;
  constructor(private sessionStorageService: SessionStorageService) { }

  ngOnInit() {
    console.log(this.salida);
    this.lowCostAll = this.sessionStorageService.retrieve('ss_searchflight');
    this.lowCost = this.sessionStorageService.retrieve('ss_searchflight');
    this.lowCost = this.lowCost[0].llowCostAirlines;
    this.spinner = this.sessionStorageService.retrieve('ss_spinner');
    this.buscador = this.sessionStorageService.retrieve('ss_databuscador');
    this.buscadormini = this.sessionStorageService.retrieve('ss_dataRequestMini');
    if(this.buscadormini === null){
      this.ida = this.buscador.DepartureArrivalDate[0];
      this.vuelta = this.buscador.DepartureArrivalDate[1];
    } else {
      this.ida = this.buscadormini.DepartureArrivalDate[0];
      this.vuelta = this.buscadormini.DepartureArrivalDate[1];
    }
    this.ida = this.ida.replace('/', '-');
    this.ida = this.ida.replace('/', '-');
    this.vuelta = this.vuelta.replace('/', '-');
    this.vuelta = this.vuelta.replace('/', '-');
    this.ida = new Date(this.ida);
    this.one = new Date(this.ida);
    this.two = new Date(this.ida);
    this.three = new Date(this.ida);
    this.four = new Date(this.ida);
    this.five = new Date(this.ida);
    this.six = new Date(this.ida);
    this.vuelta = new Date(this.vuelta);
    this.oneV = new Date(this.vuelta);
    this.twoV = new Date(this.vuelta);
    this.threeV = new Date(this.vuelta);
    this.fourV = new Date(this.vuelta);
    this.fiveV = new Date(this.vuelta);
    this.sixV = new Date(this.vuelta);
    this.one.setDate(this.one.getDate() - 2);
    this.two.setDate(this.two.getDate() - 1);
    this.three.setDate(this.three.getDate() + 1);
    this.four.setDate(this.four.getDate() + 2);
    this.five.setDate(this.five.getDate() + 3);
    this.six.setDate(this.six.getDate() + 4);
    this.oneV.setDate(this.oneV.getDate() - 2);
    this.twoV.setDate(this.twoV.getDate() - 1);
    this.threeV.setDate(this.threeV.getDate() + 1);
    this.fourV.setDate(this.fourV.getDate() + 2);
    this.fiveV.setDate(this.fiveV.getDate() + 3);
    this.sixV.setDate(this.sixV.getDate() + 4);
    var options = { weekday: 'long', month: 'long', day: '2-digit' };
    var options2 = { weekday: 'long', month: 'short', day: '2-digit' };
    this.a = this.one.toLocaleDateString('es', options);
    this.b = this.two.toLocaleDateString('es', options);
    this.c = this.three.toLocaleDateString('es', options);
    this.d = this.four.toLocaleDateString('es', options);
    this.e = this.five.toLocaleDateString('es', options);
    this.f = this.six.toLocaleDateString('es', options);
    this.g = this.ida.toLocaleDateString('es', options);
    this.h = this.oneV.toLocaleDateString('es', options);
    this.i = this.twoV.toLocaleDateString('es', options);
    this.j = this.threeV.toLocaleDateString('es', options);
    this.k = this.fourV.toLocaleDateString('es', options);
    this.l = this.fiveV.toLocaleDateString('es', options);
    this.m = this.sixV.toLocaleDateString('es', options);
    this.n = this.vuelta.toLocaleDateString('es', options);
    this.aShow = this.one.toLocaleDateString('es', options2);
    this.bShow = this.two.toLocaleDateString('es', options2);
    this.cShow = this.three.toLocaleDateString('es', options2);
    this.dShow = this.four.toLocaleDateString('es', options2);
    this.eShow = this.five.toLocaleDateString('es', options2);
    this.fShow = this.six.toLocaleDateString('es', options2);
    this.gShow = this.ida.toLocaleDateString('es', options2);
    this.hShow = this.oneV.toLocaleDateString('es', options2);
    this.iShow = this.twoV.toLocaleDateString('es', options2);
    this.jShow = this.threeV.toLocaleDateString('es', options2);
    this.kShow = this.fourV.toLocaleDateString('es', options2);
    this.lShow = this.fiveV.toLocaleDateString('es', options2);
    this.mShow = this.sixV.toLocaleDateString('es', options2);
    this.nShow = this.vuelta.toLocaleDateString('es', options2);
    const regex = /,/gi;
    const regextwo = /de /gi;
    this.aShow = this.aShow.replace(regex, '');
    this.bShow = this.bShow.replace(regex, '');
    this.cShow = this.cShow.replace(regex, '');
    this.dShow = this.dShow.replace(regex, '');
    this.eShow = this.eShow.replace(regex, '');
    this.fShow = this.fShow.replace(regex, '');
    this.gShow = this.gShow.replace(regex, '');
    this.hShow = this.hShow.replace(regex, '');
    this.iShow = this.iShow.replace(regex, '');
    this.jShow = this.jShow.replace(regex, '');
    this.kShow = this.kShow.replace(regex, '');
    this.lShow = this.lShow.replace(regex, '');
    this.mShow = this.mShow.replace(regex, '');
    this.nShow = this.nShow.replace(regex, '');
    this.aShow = this.aShow.split(/(\s+)/);
    this.bShow = this.bShow.split(/(\s+)/);
    this.cShow = this.cShow.split(/(\s+)/);
    this.dShow = this.dShow.split(/(\s+)/);
    this.eShow = this.eShow.split(/(\s+)/);
    this.fShow = this.fShow.split(/(\s+)/);
    this.gShow = this.gShow.split(/(\s+)/);
    this.hShow = this.hShow.split(/(\s+)/);
    this.iShow = this.iShow.split(/(\s+)/);
    this.jShow = this.jShow.split(/(\s+)/);
    this.kShow = this.kShow.split(/(\s+)/);
    this.lShow = this.lShow.split(/(\s+)/);
    this.mShow = this.mShow.split(/(\s+)/);
    this.nShow = this.nShow.split(/(\s+)/);
    this.a = this.a.replace(regex, '');
    this.b = this.b.replace(regex, '');
    this.c = this.c.replace(regex, '');
    this.d = this.d.replace(regex, '');
    this.e = this.e.replace(regex, '');
    this.f = this.f.replace(regex, '');
    this.g = this.g.replace(regex, '');
    this.h = this.h.replace(regex, '');
    this.i = this.i.replace(regex, '');
    this.j = this.j.replace(regex, '');
    this.k = this.k.replace(regex, '');
    this.l = this.l.replace(regex, '');
    this.m = this.m.replace(regex, '');
    this.n = this.n.replace(regex, '');
    this.a = this.a.replace(regextwo, '');
    this.b = this.b.replace(regextwo, '');
    this.c = this.c.replace(regextwo, '');
    this.d = this.d.replace(regextwo, '');
    this.e = this.e.replace(regextwo, '');
    this.f = this.f.replace(regextwo, '');
    this.g = this.g.replace(regextwo, '');
    this.h = this.h.replace(regextwo, '');
    this.i = this.i.replace(regextwo, '');
    this.j = this.j.replace(regextwo, '');
    this.k = this.k.replace(regextwo, '');
    this.l = this.l.replace(regextwo, '');
    this.m = this.m.replace(regextwo, '');
    this.n = this.n.replace(regextwo, '');
    this.calendar = this.sessionStorageService.retrieve('ss_calendarshopping');
    this.calendar.forEach(element => {
      if (this.a === element.horizontalDate && this.h === element.verticalDate) {
        this.listFare.fare1 = element.fareType;
        this.listCheap.cheap1 = element.flightCheap;
        this.listSalida.salida1 = element.departureDate;
        this.listLlegada.llegada1 = element.arrivalDate;
        this.listCarrier.carrier1 = element.carrierId;
        this.list.price1 = element.totalFareAmount;
      }
      if (this.b === element.horizontalDate && this.h === element.verticalDate) {
        this.listFare.fare2 = element.fareType;
        this.listCheap.cheap2 = element.flightCheap;
        this.listSalida.salida2 = element.departureDate;
        this.listLlegada.llegada2 = element.arrivalDate;
        this.listCarrier.carrier2 = element.carrierId;
        this.list.price2 = element.totalFareAmount;
      }
      if (this.g === element.horizontalDate && this.h === element.verticalDate) {
        this.listFare.fare3 = element.fareType;
        this.listCheap.cheap3 = element.flightCheap;
        this.listSalida.salida3 = element.departureDate;
        this.listLlegada.llegada3 = element.arrivalDate;
        this.listCarrier.carrier3 = element.carrierId;
        this.list.price3 = element.totalFareAmount;
      }
      if (this.c === element.horizontalDate && this.h === element.verticalDate) {
        this.listFare.fare4 = element.fareType;
        this.listCheap.cheap4 = element.flightCheap;
        this.listSalida.salida4 = element.departureDate;
        this.listLlegada.llegada4 = element.arrivalDate;
        this.listCarrier.carrier4 = element.carrierId;
        this.list.price4 = element.totalFareAmount;
      }
      if (this.d === element.horizontalDate && this.h === element.verticalDate) {
        this.listFare.fare5 = element.fareType;
        this.listCheap.cheap5 = element.flightCheap;
        this.listSalida.salida5 = element.departureDate;
        this.listLlegada.llegada5 = element.arrivalDate;
        this.listCarrier.carrier5 = element.carrierId;
        this.list.price5 = element.totalFareAmount;
      }
      if (this.e === element.horizontalDate && this.h === element.verticalDate) {
        this.listFare.fare6 = element.fareType;
        this.listCheap.cheap6 = element.flightCheap;
        this.listSalida.salida6 = element.departureDate;
        this.listLlegada.llegada6 = element.arrivalDate;
        this.listCarrier.carrier6 = element.carrierId;
        this.list.price6 = element.totalFareAmount;
      }
      if (this.f === element.horizontalDate && this.h === element.verticalDate) {
        this.listFare.fare7 = element.fareType;
        this.listCheap.cheap7 = element.flightCheap;
        this.listSalida.salida7 = element.departureDate;
        this.listLlegada.llegada7 = element.arrivalDate;
        this.listCarrier.carrier7 = element.carrierId;
        this.list.price7 = element.totalFareAmount;
      }
    });
    this.calendar.forEach(element => {
      if (this.a === element.horizontalDate && this.i === element.verticalDate) {
        this.listFare2.fare1 = element.fareType;
        this.listCheap2.cheap1 = element.flightCheap;
        this.listSalida2.salida1 = element.departureDate;
        this.listLlegada2.llegada1 = element.arrivalDate;
        this.listCarrier2.carrier1 = element.carrierId;
        this.list2.price1 = element.totalFareAmount;
      }
      if (this.b === element.horizontalDate && this.i === element.verticalDate) {
        this.listFare2.fare2 = element.fareType;
        this.listCheap2.cheap2 = element.flightCheap;
        this.listSalida2.salida2 = element.departureDate;
        this.listLlegada2.llegada2 = element.arrivalDate;
        this.listCarrier2.carrier2 = element.carrierId;
        this.list2.price2 = element.totalFareAmount;
      }
      if (this.g === element.horizontalDate && this.i === element.verticalDate) {
        this.listFare2.fare3 = element.fareType;
        this.listCheap2.cheap3 = element.flightCheap;
        this.listSalida2.salida3 = element.departureDate;
        this.listLlegada2.llegada3 = element.arrivalDate;
        this.listCarrier2.carrier3 = element.carrierId;
        this.list2.price3 = element.totalFareAmount;
      }
      if (this.c === element.horizontalDate && this.i === element.verticalDate) {
        this.listFare2.fare4 = element.fareType;
        this.listCheap2.cheap4 = element.flightCheap;
        this.listSalida2.salida4 = element.departureDate;
        this.listLlegada2.llegada4 = element.arrivalDate;
        this.listCarrier2.carrier4 = element.carrierId;
        this.list2.price4 = element.totalFareAmount;
      }
      if (this.d === element.horizontalDate && this.i === element.verticalDate) {
        this.listFare2.fare5 = element.fareType;
        this.listCheap2.cheap5 = element.flightCheap;
        this.listSalida2.salida5 = element.departureDate;
        this.listLlegada2.llegada5 = element.arrivalDate;
        this.listCarrier2.carrier5 = element.carrierId;
        this.list2.price5 = element.totalFareAmount;
      }
      if (this.e === element.horizontalDate && this.i === element.verticalDate) {
        this.listFare2.fare6 = element.fareType;
        this.listCheap2.cheap6 = element.flightCheap;
        this.listSalida2.salida6 = element.departureDate;
        this.listLlegada2.llegada6 = element.arrivalDate;
        this.listCarrier2.carrier6 = element.carrierId;
        this.list2.price6 = element.totalFareAmount;
      }
      if (this.f === element.horizontalDate && this.i === element.verticalDate) {
        this.listFare2.fare7 = element.fareType;
        this.listCheap2.cheap7 = element.flightCheap;
        this.listSalida2.salida7 = element.departureDate;
        this.listLlegada2.llegada7 = element.arrivalDate;
        this.listCarrier2.carrier7 = element.carrierId;
        this.list2.price7 = element.totalFareAmount;
      }
    });
    this.calendar.forEach(element => {
      if (this.a === element.horizontalDate && this.n === element.verticalDate) {
        this.listFare3.fare1 = element.fareType;
        this.listCheap3.cheap1 = element.flightCheap;
        this.listSalida3.salida1 = element.departureDate;
        this.listLlegada3.llegada1 = element.arrivalDate;
        this.listCarrier3.carrier1 = element.carrierId;
        this.list3.price1 = element.totalFareAmount;
      }
      if (this.b === element.horizontalDate && this.n === element.verticalDate) {
        this.listFare3.fare2 = element.fareType;
        this.listCheap3.cheap2 = element.flightCheap;
        this.listSalida3.salida2 = element.departureDate;
        this.listLlegada3.llegada2 = element.arrivalDate;
        this.listCarrier3.carrier2 = element.carrierId;
        this.list3.price2 = element.totalFareAmount;
      }
      if (this.g === element.horizontalDate && this.n === element.verticalDate) {
        this.listFare3.fare3 = element.fareType;
        this.listCheap3.cheap3 = element.flightCheap;
        this.listSalida3.salida3 = element.departureDate;
        this.listLlegada3.llegada3 = element.arrivalDate;
        this.listCarrier3.carrier3 = element.carrierId;
        this.list3.price3 = element.totalFareAmount;
      }
      if (this.c === element.horizontalDate && this.n === element.verticalDate) {
        this.listFare3.fare4 = element.fareType;
        this.listCheap3.cheap4 = element.flightCheap;
        this.listSalida3.salida4 = element.departureDate;
        this.listLlegada3.llegada4 = element.arrivalDate;
        this.listCarrier3.carrier4 = element.carrierId;
        this.list3.price4 = element.totalFareAmount;
      }
      if (this.d === element.horizontalDate && this.n === element.verticalDate) {
        this.listFare3.fare5 = element.fareType;
        this.listCheap3.cheap5 = element.flightCheap;
        this.listSalida3.salida5 = element.departureDate;
        this.listLlegada3.llegada5 = element.arrivalDate;
        this.listCarrier3.carrier5 = element.carrierId;
        this.list3.price5 = element.totalFareAmount;
      }
      if (this.e === element.horizontalDate && this.n === element.verticalDate) {
        this.listFare3.fare6 = element.fareType;
        this.listCheap3.cheap6 = element.flightCheap;
        this.listSalida3.salida6 = element.departureDate;
        this.listLlegada3.llegada6 = element.arrivalDate;
        this.listCarrier3.carrier6 = element.carrierId;
        this.list3.price6 = element.totalFareAmount;
      }
      if (this.f === element.horizontalDate && this.n === element.verticalDate) {
        this.listFare3.fare7 = element.fareType;
        this.listCheap3.cheap7 = element.flightCheap;
        this.listSalida3.salida7 = element.departureDate;
        this.listLlegada3.llegada7 = element.arrivalDate;
        this.listCarrier3.carrier7 = element.carrierId;
        this.list3.price7 = element.totalFareAmount;
      }
    });
    this.calendar.forEach(element => {
      if (this.a === element.horizontalDate && this.j === element.verticalDate) {
        this.listFare4.fare1 = element.fareType;
        this.listCheap4.cheap1 = element.flightCheap;
        this.listSalida4.salida1 = element.departureDate;
        this.listLlegada4.llegada1 = element.arrivalDate;
        this.listCarrier4.carrier1 = element.carrierId;
        this.list4.price1 = element.totalFareAmount;
      }
      if (this.b === element.horizontalDate && this.j === element.verticalDate) {
        this.listFare4.fare2 = element.fareType;
        this.listCheap4.cheap2 = element.flightCheap;
        this.listSalida4.salida2 = element.departureDate;
        this.listLlegada4.llegada2 = element.arrivalDate;
        this.listCarrier4.carrier2 = element.carrierId;
        this.list4.price2 = element.totalFareAmount;
      }
      if (this.g === element.horizontalDate && this.j === element.verticalDate) {
        this.listFare4.fare3 = element.fareType;
        this.listCheap4.cheap3 = element.flightCheap;
        this.listSalida4.salida3 = element.departureDate;
        this.listLlegada4.llegada3 = element.arrivalDate;
        this.listCarrier4.carrier3 = element.carrierId;
        this.list4.price3 = element.totalFareAmount;
      }
      if (this.c === element.horizontalDate && this.j === element.verticalDate) {
        this.listFare4.fare4 = element.fareType;
        this.listCheap4.cheap4 = element.flightCheap;
        this.listSalida4.salida4 = element.departureDate;
        this.listLlegada4.llegada4 = element.arrivalDate;
        this.listCarrier4.carrier4 = element.carrierId;
        this.list4.price4 = element.totalFareAmount;
      }
      if (this.d === element.horizontalDate && this.j === element.verticalDate) {
        this.listFare4.fare5 = element.fareType;
        this.listCheap4.cheap5 = element.flightCheap;
        this.listSalida4.salida5 = element.departureDate;
        this.listLlegada4.llegada5 = element.arrivalDate;
        this.listCarrier4.carrier5 = element.carrierId;
        this.list4.price5 = element.totalFareAmount;
      }
      if (this.e === element.horizontalDate && this.j === element.verticalDate) {
        this.listFare4.fare6 = element.fareType;
        this.listCheap4.cheap6 = element.flightCheap;
        this.listSalida4.salida6 = element.departureDate;
        this.listLlegada4.llegada6 = element.arrivalDate;
        this.listCarrier4.carrier6 = element.carrierId;
        this.list4.price6 = element.totalFareAmount;
      }
      if (this.f === element.horizontalDate && this.j === element.verticalDate) {
        this.listFare4.fare7 = element.fareType;
        this.listCheap4.cheap7 = element.flightCheap;
        this.listSalida4.salida7 = element.departureDate;
        this.listLlegada4.llegada7 = element.arrivalDate;
        this.listCarrier4.carrier7 = element.carrierId;
        this.list4.price7 = element.totalFareAmount;
      }
    });
    this.calendar.forEach(element => {
      if (this.a === element.horizontalDate && this.k === element.verticalDate) {
        this.listFare5.fare1 = element.fareType;
        this.listCheap5.cheap1 = element.flightCheap;
        this.listSalida5.salida1 = element.departureDate;
        this.listLlegada5.llegada1 = element.arrivalDate;
        this.listCarrier5.carrier1 = element.carrierId;
        this.list5.price1 = element.totalFareAmount;
      }
      if (this.b === element.horizontalDate && this.k === element.verticalDate) {
        this.listFare5.fare2 = element.fareType;
        this.listCheap5.cheap2 = element.flightCheap;
        this.listSalida5.salida2 = element.departureDate;
        this.listLlegada5.llegada2 = element.arrivalDate;
        this.listCarrier5.carrier2 = element.carrierId;
        this.list5.price2 = element.totalFareAmount;
      }
      if (this.g === element.horizontalDate && this.k === element.verticalDate) {
        this.listFare5.fare3 = element.fareType;
        this.listCheap5.cheap3 = element.flightCheap;
        this.listSalida5.salida3 = element.departureDate;
        this.listLlegada5.llegada3 = element.arrivalDate;
        this.listCarrier5.carrier3 = element.carrierId;
        this.list5.price3 = element.totalFareAmount;
      }
      if (this.c === element.horizontalDate && this.k === element.verticalDate) {
        this.listFare5.fare4 = element.fareType;
        this.listCheap5.cheap4 = element.flightCheap;
        this.listSalida5.salida4 = element.departureDate;
        this.listLlegada5.llegada4 = element.arrivalDate;
        this.listCarrier5.carrier4 = element.carrierId;
        this.list5.price4 = element.totalFareAmount;
      }
      if (this.d === element.horizontalDate && this.k === element.verticalDate) {
        this.listFare5.fare5 = element.fareType;
        this.listCheap5.cheap5 = element.flightCheap;
        this.listSalida5.salida5 = element.departureDate;
        this.listLlegada5.llegada5 = element.arrivalDate;
        this.listCarrier5.carrier5 = element.carrierId;
        this.list5.price5 = element.totalFareAmount;
      }
      if (this.e === element.horizontalDate && this.k === element.verticalDate) {
        this.listFare5.fare6 = element.fareType;
        this.listCheap5.cheap6 = element.flightCheap;
        this.listSalida5.salida6 = element.departureDate;
        this.listLlegada5.llegada6 = element.arrivalDate;
        this.listCarrier5.carrier6 = element.carrierId;
        this.list5.price6 = element.totalFareAmount;
      }
      if (this.f === element.horizontalDate && this.k === element.verticalDate) {
        this.listFare5.fare7 = element.fareType;
        this.listCheap5.cheap7 = element.flightCheap;
        this.listSalida5.salida7 = element.departureDate;
        this.listLlegada5.llegada7 = element.arrivalDate;
        this.listCarrier5.carrier7 = element.carrierId;
        this.list5.price7 = element.totalFareAmount;
      }
    });
    this.calendar.forEach(element => {
      if (this.a === element.horizontalDate && this.l === element.verticalDate) {
        this.listFare6.fare1 = element.fareType;
        this.listCheap6.cheap1 = element.flightCheap;
        this.listSalida6.salida1 = element.departureDate;
        this.listLlegada6.llegada1 = element.arrivalDate;
        this.listCarrier6.carrier1 = element.carrierId;
        this.list6.price1 = element.totalFareAmount;
      }
      if (this.b === element.horizontalDate && this.l === element.verticalDate) {
        this.listFare6.fare2 = element.fareType;
        this.listCheap6.cheap2 = element.flightCheap;
        this.listSalida6.salida2 = element.departureDate;
        this.listLlegada6.llegada2 = element.arrivalDate;
        this.listCarrier6.carrier2 = element.carrierId;
        this.list6.price2 = element.totalFareAmount;
      }
      if (this.g === element.horizontalDate && this.l === element.verticalDate) {
        this.listFare6.fare3 = element.fareType;
        this.listCheap6.cheap3 = element.flightCheap;
        this.listSalida6.salida3 = element.departureDate;
        this.listLlegada6.llegada3 = element.arrivalDate;
        this.listCarrier6.carrier3 = element.carrierId;
        this.list6.price3 = element.totalFareAmount;
      }
      if (this.c === element.horizontalDate && this.l === element.verticalDate) {
        this.listFare6.fare4 = element.fareType;
        this.listCheap6.cheap4 = element.flightCheap;
        this.listSalida6.salida4 = element.departureDate;
        this.listLlegada6.llegada4 = element.arrivalDate;
        this.listCarrier6.carrier4 = element.carrierId;
        this.list6.price4 = element.totalFareAmount;
      }
      if (this.d === element.horizontalDate && this.l === element.verticalDate) {
        this.listFare6.fare5 = element.fareType;
        this.listCheap6.cheap5 = element.flightCheap;
        this.listSalida6.salida5 = element.departureDate;
        this.listLlegada6.llegada5 = element.arrivalDate;
        this.listCarrier6.carrier5 = element.carrierId;
        this.list6.price5 = element.totalFareAmount;
      }
      if (this.e === element.horizontalDate && this.l === element.verticalDate) {
        this.listFare6.fare6 = element.fareType;
        this.listCheap6.cheap6 = element.flightCheap;
        this.listSalida6.salida6 = element.departureDate;
        this.listLlegada6.llegada6 = element.arrivalDate;
        this.listCarrier6.carrier6 = element.carrierId;
        this.list6.price6 = element.totalFareAmount;
      }
      if (this.f === element.horizontalDate && this.l === element.verticalDate) {
        this.listFare6.fare7 = element.fareType;
        this.listCheap6.cheap7 = element.flightCheap;
        this.listSalida6.salida7 = element.departureDate;
        this.listLlegada6.llegada7 = element.arrivalDate;
        this.listCarrier6.carrier7 = element.carrierId;
        this.list6.price7 = element.totalFareAmount;
      }
    });
    this.calendar.forEach(element => {
      if (this.a === element.horizontalDate && this.m === element.verticalDate) {
        this.listFare7.fare1 = element.fareType;
        this.listCheap7.cheap1 = element.flightCheap;
        this.listSalida7.salida1 = element.departureDate;
        this.listLlegada7.llegada1 = element.arrivalDate;
        this.listCarrier7.carrier1 = element.carrierId;
        this.list7.price1 = element.totalFareAmount;
      }
      if (this.b === element.horizontalDate && this.m === element.verticalDate) {
        this.listFare7.fare2 = element.fareType;
        this.listCheap7.cheap2 = element.flightCheap;
        this.listSalida7.salida2 = element.departureDate;
        this.listLlegada7.llegada2 = element.arrivalDate;
        this.listCarrier7.carrier2 = element.carrierId;
        this.list7.price2 = element.totalFareAmount;
      }
      if (this.g === element.horizontalDate && this.m === element.verticalDate) {
        this.listFare7.fare3 = element.fareType;
        this.listCheap7.cheap3 = element.flightCheap;
        this.listSalida7.salida3 = element.departureDate;
        this.listLlegada7.llegada3 = element.arrivalDate;
        this.listCarrier7.carrier3 = element.carrierId;
        this.list7.price3 = element.totalFareAmount;
      }
      if (this.c === element.horizontalDate && this.m === element.verticalDate) {
        this.listFare7.fare4 = element.fareType;
        this.listCheap7.cheap4 = element.flightCheap;
        this.listSalida7.salida4 = element.departureDate;
        this.listLlegada7.llegada4 = element.arrivalDate;
        this.listCarrier7.carrier4 = element.carrierId;
        this.list7.price4 = element.totalFareAmount;
      }
      if (this.d === element.horizontalDate && this.m === element.verticalDate) {
        this.listFare7.fare5 = element.fareType;
        this.listCheap7.cheap5 = element.flightCheap;
        this.listSalida7.salida5 = element.departureDate;
        this.listLlegada7.llegada5 = element.arrivalDate;
        this.listCarrier7.carrier5 = element.carrierId;
        this.list7.price5 = element.totalFareAmount;
      }
      if (this.e === element.horizontalDate && this.m === element.verticalDate) {
        this.listFare7.fare6 = element.fareType;
        this.listCheap7.cheap6 = element.flightCheap;
        this.listSalida7.salida6 = element.departureDate;
        this.listLlegada7.llegada6 = element.arrivalDate;
        this.listCarrier7.carrier6 = element.carrierId;
        this.list7.price6 = element.totalFareAmount;
      }
      if (this.f === element.horizontalDate && this.m === element.verticalDate) {
        this.listFare7.fare7 = element.fareType;
        this.listCheap7.cheap7 = element.flightCheap;
        this.listSalida7.salida7 = element.departureDate;
        this.listLlegada7.llegada7 = element.arrivalDate;
        this.listCarrier7.carrier7 = element.carrierId;
        this.list7.price7 = element.totalFareAmount;
      }
    });
  }

  validarCalendar(){
    var z = document.getElementById('dia');
    var x = document.getElementById('aerolinea');
    x.style.border = 'none';
    x.style.cursor = 'pointer';
    x.style.textAlign = 'center';
    z.style.cursor = 'pointer';
    z.style.border = '1px solid #9A9A9A';
    z.style.borderRadius = '13px 0px 0px 0px';
    z.style.textAlign = 'center';
    this.aerolineaShow = false;
    this.calendarShow = true;
  }

  validarDia(){
    var z = document.getElementById('dia');
    var x = document.getElementById('aerolinea');
    z.style.border = 'none';
    z.style.cursor = 'pointer';
    z.style.textAlign = 'center';
    x.style.cursor = 'pointer';
    x.style.border = '1px solid #9A9A9A';
    x.style.borderRadius = '13px 0px 0px 0px';
    x.style.textAlign = 'center';
    this.calendarShow = false;
    this.aerolineaShow = true;
  }

  searchFlight(salida, llegada){
    const Fechas = {
      Salida: salida,
      Llegada: llegada
    }
    this.fechas.emit(Fechas);
  }



  ngAfterViewInit() {
    $('#menu-vuelo-1').show();
    $('#menu-vuelo-2').hide();
    $('#menu-hotel-1').show();
    $('#menu-hotel-2').hide();
    $('#menu-bus-1').show();
    $('#menu-bus-2').hide();
    $('#menu-paquete-1').show();
    $('#menu-paquete-2').hide();
    $('#menu-seguro-1').show();
    $('#menu-seguro-2').hide();

    }

}
