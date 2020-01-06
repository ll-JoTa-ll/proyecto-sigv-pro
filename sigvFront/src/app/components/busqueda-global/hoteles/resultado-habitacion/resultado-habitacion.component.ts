import { Component, OnInit, Input } from '@angular/core';
import { HotelService } from '../../../../services/hotel.service';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ILoginDatosModel } from '../../../../models/ILoginDatos.model';
import { IHotelResultsModel } from '../../../../models/IHotelResults.model';
import { IHabitacionResults } from '../../../../models/IHabitacionResults';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalHabitacionErroneaComponent } from '../../../shared/modal-habitacion-erronea/modal-habitacion-erronea.component';
import { ModalHotelErroneoComponent } from '../../../shared/modal-hotel-erroneo/modal-hotel-erroneo.component';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-resultado-habitacion',
  templateUrl: './resultado-habitacion.component.html',
  styleUrls: ['./resultado-habitacion.component.sass']
})
export class ResultadoHabitacionComponent implements OnInit {
  loginDataUser: ILoginDatosModel;
  lstHotel : IHotelResultsModel[];
  lstHabication: IHabitacionResults;

  @Input() urlHotel;
  @Input() name;
  @Input() index;
  @Input() latitud;
  @Input() tipoPago;
  @Input() direccion;
  @Input() distancia;
  @Input() currency;
  @Input() precioprom;
  @Input() precioxnoche;
  @Input() longitud;
  @Input() cantpersonas;
  @Input() estrellas;
  @Input() cantidadnoche;
  @Input() fechasalida;
  @Input() hotelcode;
  @Input() fecharetorno;
  urlimg = './assets/images/hotel-icon.png';
  modalRefSessionExpired: BsModalRef;

  constructor(private modalService: BsModalService,private router : Router,public spinner: NgxSpinnerService,private service: HotelService,private sessionStorageService: SessionStorageService) {

    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.lstHotel = this.sessionStorageService.retrieve('ls_search_hotel');
   }

  ngOnInit() {

    
  }

  getHotel(hotelcode,fechasalida,fecharetorno,cantpersonas){
    
    this.spinner.show();
    let data = {
      "Pseudo": "LIMPE2235",
      "Lhotel":
      [
        {
          "HotelCode": hotelcode,
          "StartDate": this.lstHotel[0].startDate,
          "EndDate": this.lstHotel[0].endDate,
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
        //this.router.navigate(['/habitacion']);
        if (this.lstHabication.Oerror != null) {
          this.modalRefSessionExpired = this.modalService.show(ModalHotelErroneoComponent);
        }else{
          window.open(window.location.origin + "/habitacion");
        }
        
      },
      err => {
      this.spinner.hide();
      
    },
   () => {
     this.spinner.hide();
    
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
