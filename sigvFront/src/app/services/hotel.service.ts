import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ISearchHotelModel } from '../models/ISearchHotel.model';
import { IHotelResultsModel } from '../models/IHotelResults.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHabitacionResults } from '../models/IHabitacionResults';
import { SessionStorageService } from 'ngx-webstorage';
import { listLocales } from 'ngx-bootstrap/chronos';
import { IGetEnhancedHotel } from '../models/IGetEnhancedHotel';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  token;

  private url_search: string = environment.url_hotel + 'HotelSearch/SearchHotel';
  private url_habitacion: string = environment.url_hotel + 'HotelSearch/SearchRoom';
  private url_confirmacion: string = environment.url_hotel + 'Booking/SelectRoom';

  constructor(  private http: HttpClient,private sessionSt: SessionStorageService) { }

  SearchHotel(data): Observable<IHotelResultsModel[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    return this.http.post<IHotelResultsModel[]>(`${this.url_search}`, data, httpOptions);
}

GetHabitacion(data): Observable<IHabitacionResults> {
  this.token = this.sessionSt.retrieve('ss_token');
  httpOptions.headers = new HttpHeaders({
    'Authorization': "Bearer " + this.token,
    'Content-Type': "application/json",
  });
  return this.http.post<IHabitacionResults>(`${this.url_habitacion}`, data, httpOptions);
}

  GetConfirmacion(data): Observable<IGetEnhancedHotel>{
    this.token = this.sessionSt.retrieve('ss_token');
    console.log("token: " + this.token);
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    console.log(httpOptions);
    //return this.http.post<IGetEnhancedHotel>(`${this.url_confirmacion}`, data, httpOptions);
    return this.http.post<IGetEnhancedHotel>(this.url_confirmacion, data, httpOptions);
  }
}
