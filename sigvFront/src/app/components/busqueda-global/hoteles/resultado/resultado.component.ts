import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { HotelService } from '../../../../services/hotel.service';
import { datepickerAnimation } from 'ngx-bootstrap/datepicker/datepicker-animations';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
import { ILoginDatosModel } from 'src/app/models/ILoginDatos.model';
import { SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { VuelosComponent } from '../../vuelos/vuelos.component';
import { HotelesComponent } from '../hoteles.component';
import { IGetUserById } from 'src/app/models/IGetUserById.model';
import { BnNgIdleService } from 'bn-ng-idle';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';



declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.sass']
})
export class ResultadoComponent implements OnInit {
  @ViewChild(ModalDirective,{static:false}) modal: ModalDirective;
  loginDataUser: ILoginDatosModel;

  @Input() LHoteles: IHotelResultsModel[];
  @Input() name: string;
  @Input() direccion: string;
  @Input() tipoPago: string;
  @Input() distancia: string;
  @Input() estrellas: number;
  @Input() precioxnoche: string;
  @Input() precioprom: string;
  @Input() isvisible: string;
  @Input() currency: string;
  @Input() urlHotel: string;
  @Input() index: string;
  @Input() latitud: string;
  @Input() longitud: string;
  @Input() cantidadnoche: string;
  @Input() cantpersonas: string;
  @Input() hotelcode: string;
  @Input() fechasalida: string;
  @Input() cantidadhabitaciones: string;
  @Input() fecharetorno: string;
  urlimg = './assets/images/hotel-icon.png';
  lstHabication: IHabitacionResults;
  lstHotel : IHotelResultsModel[];
  objSearch: any;

  t: number;

  constructor(public spinner: NgxSpinnerService,private bnIdle: BnNgIdleService,private service: HotelService,private sessionStorageService: SessionStorageService,private router : Router) {

    console.log("ResultadoComponent constructor");

  }

  ngOnInit() {
    console.log("ResultadoComponent ngOnInit");
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.lstHotel = this.sessionStorageService.retrieve('ls_search_hotel');
    console.log("this.loginDataUser: " + JSON.stringify(this.loginDataUser));
    console.log("this.lstHotel: " + JSON.stringify(this.lstHotel));
    console.log("this.LHoteles: " + JSON.stringify(this.LHoteles));

  }



  getHotel(hotelcode,fechasalida,fecharetorno,cantpersonas){
    this.spinner.show();
    let data = {
      "Pseudo": "LIMPE2235",
      "Lhotel":
        [
          {
            "HotelCode": hotelcode,
            "StartDate": fechasalida,
            "EndDate": fecharetorno,
            "LguestPerRoom":
              [
                {
                  "RoomQuantity": $('#txthabitacion').val(),
                  "NumberPassengers": cantpersonas,
                  "TypePassenger": "ADT"
                }
              ]
          }
        ],
      "Ocompany": this.loginDataUser.ocompany
    }
    this.objSearch = {
      destino: $('#destinos').val(),
      fechaentrada: $('#fechaInicio').val(),
      fechasalida: $('#fechaFin').val(),
      categoria : this.estrellas,
      habi: $('#txthabitacion').val(),
      personas: $('#txtpersonas').val()
    };
    this.sessionStorageService.store("ss_sessionmini",this.objSearch);

    let hotel;
    for (let i = 0; i < this.lstHotel.length; i++) {
      const element = this.lstHotel[i];

      if (element.code === hotelcode) {
        hotel = this.lstHotel[i];
      }

    }
    this.sessionStorageService.store("lhotel", hotel);

    this.service.GetHabitacion(data).subscribe(
      data => {
        this.lstHabication = data;

        this.sessionStorageService.store("lstHabication", this.lstHabication);

        window.open(environment.url_project + "/habitacion");
      },
      err => {
        this.spinner.hide();

      },
      () => {
        this.spinner.hide();

      }
    );
  }


  Mostrarmapa(position) {
    $('#mapa_' + position).show();
  }


  VolverHome(){
    this.router.navigate[('')]
  }

  OcultarMapa(position) {
    $('#mapa_' + position).hide();
  }

}
