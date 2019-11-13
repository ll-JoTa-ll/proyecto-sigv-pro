import { Component, OnInit, Input, Output } from '@angular/core';
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

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.sass']
})
export class ResultadoComponent implements OnInit {

  loginDataUser: ILoginDatosModel;

  @Input() LHoteles: IHotelResultsModel[];
  @Input() name: string;
  @Input() direccion: string;
  @Input() tipoPago: string;
  @Input() distancia: string;
  @Input() estrellas: number;
  @Input() precioxnoche: string;
  @Input() precioprom: string;
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

  constructor(private service: HotelService,private sessionStorageService: SessionStorageService,private router : Router,private Hotels: HotelesComponent) { }

  ngOnInit() {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.lstHotel = this.sessionStorageService.retrieve('ls_search_hotel');
  }


  getHotel(hotelcode,fechasalida,fecharetorno,cantpersonas){
    this.Hotels.spinner.show();
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

    let hotel;
    for (let i = 0; i < this.lstHotel.length; i++) {
      const element = this.lstHotel[i];
      
      if (element.code === hotelcode) {
        hotel = this.lstHotel[i];
      }
      
    }
    this.sessionStorageService.store("lhotel",hotel);

    this.service.GetHabitacion(data).subscribe(
      data => {
        this.lstHabication = data;
        
        this.sessionStorageService.store("lstHabication", this.lstHabication);

        window.open(environment.url_project + "/habitacion");
      },
      err => {
      this.Hotels.spinner.hide();
      
    },
   () => {
     this.Hotels.spinner.hide();
    
   }
    )
  }


  Mostrarmapa(position) {
    $('#mapa_' + position).show();
 }
 
 OcultarMapa(position) {
   $('#mapa_' + position).hide();
 }

}
