import { Component, OnInit, Input, NgZone, ElementRef, ViewChildren } from '@angular/core';
import { MapsAPILoader, MouseEvent} from '@agm/core';
import { IHotelResultsModel } from 'src/app/models/IHotelResults.model';
import { SessionStorageService, LocalStorageService } from 'ngx-webstorage';
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-mapa-hoteles',
  templateUrl: './mapa-hoteles.component.html',
  styleUrls: ['./mapa-hoteles.component.sass']
})
export class MapaHotelesComponent implements OnInit {

  @Input() listado: IHotelResultsModel[];
  @Input() hoteldatos: any[];
  urlimg = '/assets/images/hotel-icon.png';
  show: boolean;
  address: string;
  private geoCoder;
  hotel: IHotelResultsModel;
  latitud: number;
  longitud: number;
  zoom = 12;
  cantidadnoche: string;

  public location = {
    latitude: 0,
    longitude: 0
  };

  @ViewChildren('search')
  public searchElementRef: ElementRef;


  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.hotel = this.localStorageService.retrieve('hotel');
    this.location.latitude =  this.hotel.oposition.latitude;
    this.location.longitude = this.hotel.oposition.longitude;

    /*
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      // tslint:disable-next-line: new-parens
      this.geoCoder = new google.maps.Geocoder;
 
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
 
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
 
          //set latitude, longitude and zoom
          this.latitud = place.geometry.location.lat();
          this.longitud = place.geometry.location.lng();
          this.location.latitude = this.latitud;
          this.location.longitude = this.longitud;
        });
      });
    });*/
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
  $('#info_' + position).show();
 }

 OcultarModal(position) {
  $('#info_' + position).hide();
 }
}
