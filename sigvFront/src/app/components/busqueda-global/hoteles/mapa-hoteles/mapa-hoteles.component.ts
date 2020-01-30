import { Component, OnInit, Input, NgZone, ElementRef, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
import { HotelesComponent } from '../hoteles.component';
import { ILoginDatosModel } from '../../../../models/ILoginDatos.model';
import { HotelService } from '../../../../services/hotel.service';
import { IHabitacionResults } from 'src/app/models/IHabitacionResults';
import { environment } from '../../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalInfraccionCompraComponent } from '../../../shared/modal-infraccion-compra/modal-infraccion-compra.component';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-mapa-hoteles',
  templateUrl: './mapa-hoteles.component.html',
  styleUrls: ['./mapa-hoteles.component.sass']
})
export class MapaHotelesComponent implements OnInit, AfterViewInit {
  loginDataUser: ILoginDatosModel;
  @Input() lPolicies: string[];
  @Input() listado: IHotelResultsModel[];
  @Input() hoteldatos: any[];
  @Input() hotelcode: string;
  @Input() fechasalida: string;
  @Input() fecharetorno: string;
  @Input() estrellas: string;
  @Input() cantpersonas: string;
  urlimg = './assets/images/hotel-icon.png';
  show: boolean;
  address: string;
  private geoCoder;
  hotel: IHotelResultsModel;
  latitud: number;
  longitud: number;
  zoom = 15;
  cantidadnoche: string;
  objSearch: any;
  modalRefSessionExpired: BsModalRef;
  lstHabication: IHabitacionResults;
  lstHotel : IHotelResultsModel[];
  policie: any;
  public location = {
    latitude: 0,
    longitude: 0
  };
  modalRefPoliticas: BsModalRef;
  searchLatitude: number;
  searchLongitude: number;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;


  constructor(
    private service: HotelService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private modalService: BsModalService,
    private localStorageService: LocalStorageService,
    public spinner: NgxSpinnerService
  ) {
    
  }

  ngOnInit() {
    this.loginDataUser = this.sessionStorageService.retrieve('ss_login_data');
    this.lstHotel = this.sessionStorageService.retrieve('ls_search_hotel');
    
    
    this.hotel = this.sessionStorageService.retrieve('hotel');

   

    this.location.latitude =  this.hotel.oposition.latitude;
    this.location.longitude = this.hotel.oposition.longitude;

    for (let i = 0; i < this.listado.length; i++) {
      const element = this.listado[i];
      this.policie = this.listado[i].lpolicies;
      console.log("this.policie ===> acaacaca" + JSON.stringify(this.policie));
    }
    

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      //this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.location.latitude = place.geometry.location.lat();
          this.location.longitude = place.geometry.location.lng();
          this.searchLatitude = place.geometry.location.lat();
          this.searchLongitude = place.geometry.location.lng();
          this.zoom = 18;
        });
      });
    });
  }



  getHotel(hotelcode,fechasalida,fecharetorno,cantpersonas,lPolicies){
    if(this.loginDataUser.ocompany.blockHotel === true && lPolicies.length > 0){
      this.modalRefSessionExpired = this.modalService.show(ModalInfraccionCompraComponent);
    }else{
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
        fechaentrada: fechasalida,
        fechasalida: fecharetorno,
        categoria : this.estrellas,
        habi: $('#txthabitacion').val(),
        personas: cantpersonas
      };
      this.sessionStorageService.store("ss_sessionmini",this.objSearch);
  
      let hotel;
      for (let i = 0; i < this.lstHotel.length; i++) {
        const element = this.lstHotel[i];
        if (element.code === hotelcode) {
          hotel = this.lstHotel[i];
        }
        this.OcultarModal(i + 1);
      }
      this.sessionStorageService.store("lhotel",hotel);
  
      this.service.GetHabitacion(data).subscribe(
        data => {
  
          this.lstHabication = data;
          
          this.sessionStorageService.store("lstHabication", this.lstHabication);
  
          window.open(window.location.origin + "/habitacion");
          //this.router.navigate(['/habitacion']);
          //window.open(environment.url_project + "/habitacion");
        },
        err => {
        this.spinner.hide();
   
      },
     () => {
       this.spinner.hide();
     }
      )
    }
    
  }

  openModalPoliticas(template) {
    this.modalRefPoliticas = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray con-politicas' })
    );
  }

  ngAfterViewInit() {
    /*
    console.log('MapaHotelesComponent ngAfterViewInit');
    this.hotel = this.sessionStorageService.retrieve('hotel');

    console.log('this.hotel: ' + JSON.stringify(this.hotel));

    this.location.latitude =  this.hotel.oposition.latitude;
    this.location.longitude = this.hotel.oposition.longitude;

    console.log('this.location.latitude: ' + this.location.latitude);
    console.log('this.location.longitude: ' + this.location.longitude);
    */
  }

  /*
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
       // this.zoom = 8;
        this.getAddress(this.latitud, this.longitud);
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log(this.listado);
    console.log($event);
    this.latitud = $event.coords.lat;
    this.longitud = $event.coords.lng;
    this.getAddress(this.latitud, this.longitud);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
        //  this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
*/

abriModal(position) {
  $('.tooltipBagDiv').hide();
  $('#info_' + position).show();
 }

 OcultarModal(position) {
  $('#info_' + position).hide();
 }
}
