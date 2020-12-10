import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ISearchHotelModel } from '../models/ISearchHotel.model';
import { IHotelResultsModel } from '../models/IHotelResults.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHabitacionResults } from '../models/IHabitacionResults';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { listLocales } from 'ngx-bootstrap/chronos';
import { IGetEnhancedHotel } from '../models/IGetEnhancedHotel';
import { IGetPnrHotel } from '../models/IGetPnrHotel.model';
import { IGetUserById } from '../models/IGetUserById.model';
import { IGetReservationHotel } from '../models/IGetReservationHotel.model';
import { IGetReservaDetalleHotel } from '../models/IGetReservaDetalleHotel.model';
import { IDisplayLogin } from '../models/IDisplayLogin.model';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  token;
  key;

  private url_search: string = environment.url_hotel + 'HotelSearch/SearchHotel';
  private url_habitacion: string = environment.url_hotel + 'HotelSearch/SearchRoom';
  private url_confirmacion: string = environment.url_hotel + 'Booking/SelectRoom';
  private url_reserva: string = environment.url_hotel + 'Booking/GenerateReservation';
  private url_user: string = environment.url_5 + 'User/';
  private url_getreservation: string = environment.url_hotel + 'Booking/';
  private url_gerUserByPassword: string = environment.url_5 + 'User/GetUserByPassword';
  private url_updatePassword: string = environment.url_5 + 'User/UpdatePassword';
  private url_displayLogin: string = environment.url_5 + 'PasswordRecovery/GenerateRecoveryToken';
  private url_validateToken: string = environment.url_5 + 'PasswordRecovery/ValidateRecoveryToken';
  private url_passwordRecovery: string = environment.url_5 + 'PasswordRecovery/UpdateRecoveryPassword';
  private url_changePassword: string = environment.url_5 + 'User/ChangePassword';
  private url_insertUpdate: string = environment.url_5 + 'User/InsertUpdateUser';
  private url_companys: string = environment.url_customer + 'Company/GetCompany';

  constructor(  private http: HttpClient,private sessionSt: SessionStorageService,private localSt: LocalStorageService) {
    this.key = environment.key;
   }

  SearchHotel(data): Observable<IHotelResultsModel[]> {
    this.token = this.localSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IHotelResultsModel[]>(`${this.url_search}`, data, httpOptions);
}

  ListCompany(): Observable<any[]> {
    httpOptions.headers = new HttpHeaders({
        'Ocp-Apim-Subscription-Key': environment.key,
        'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(`${this.url_companys}`, httpOptions);
  }

GetHabitacion(data): Observable<IHabitacionResults> {
  this.token = this.localSt.retrieve('ss_token');
  httpOptions.headers = new HttpHeaders({
    'Authorization': "Bearer " + this.token,
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': this.key
  });
  return this.http.post<IHabitacionResults>(`${this.url_habitacion}`, data, httpOptions);
}

GetHabitacionLogin(data): Observable<IHabitacionResults> {
  this.token = this.localSt.retrieve('ss_token');
  httpOptions.headers = new HttpHeaders({
    'Authorization': "Bearer " + this.token,
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': this.key
  });
  return this.http.post<IHabitacionResults>(`${this.url_habitacion}`, data, httpOptions);
}

GetUserByPassword(data): Observable<boolean> {
  this.token = this.sessionSt.retrieve('ss_token');
  httpOptions.headers = new HttpHeaders({
    'Authorization': "Bearer " + this.token,
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': this.key
  });
  return this.http.post<boolean>(`${this.url_gerUserByPassword}`, data, httpOptions);
}

GetChangePassword(data): Observable<boolean> {
  this.token = this.sessionSt.retrieve('ss_token');
  httpOptions.headers = new HttpHeaders({
    'Authorization': "Bearer " + this.token,
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
  });
  return this.http.post<boolean>(`${this.url_changePassword}`, data, httpOptions);
}

insertUpdateUser(data): Observable<boolean> {
  this.token = this.sessionSt.retrieve('ss_token');
  httpOptions.headers = new HttpHeaders({
    'Authorization': "Bearer " + this.token,
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
  });
  return this.http.post<boolean>(`${this.url_insertUpdate}`, data, httpOptions);
}

UpdatePassword(data): Observable<boolean> {
  this.token = this.sessionSt.retrieve('ss_token');
  httpOptions.headers = new HttpHeaders({
    'Authorization': "Bearer " + this.token,
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': this.key
  });
  return this.http.post<boolean>(`${this.url_updatePassword}`, data, httpOptions);
}

GetDisplayLogin(data): Observable<IDisplayLogin> {
  httpOptions.headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': this.key
  });
  return this.http.post<IDisplayLogin>(`${this.url_displayLogin}`, data, httpOptions);
}

ValidateToken(data): Observable<IDisplayLogin> {
  httpOptions.headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': this.key
  });
  return this.http.post<IDisplayLogin>(`${this.url_validateToken}`, data, httpOptions);
}

PasswordRecovery(data): Observable<IDisplayLogin> {
  httpOptions.headers = new HttpHeaders({
    'Content-Type': "application/json",
    'Ocp-Apim-Subscription-Key': this.key
  });
  return this.http.post<IDisplayLogin>(`${this.url_passwordRecovery}`, data, httpOptions);
}

  GetConfirmacion(data): Observable<IGetEnhancedHotel> {
    this.token = this.localSt.retrieve('ss_token');
    console.log("token: " + this.token);
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    console.log(httpOptions);
    //return this.http.post<IGetEnhancedHotel>(`${this.url_confirmacion}`, data, httpOptions);
    return this.http.post<IGetEnhancedHotel>(this.url_confirmacion, data, httpOptions);
  }

  GetReserva(data): Observable<IGetPnrHotel>{
    this.token = this.localSt.retrieve('ss_token');
    console.log("token: " + this.token);
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    console.log(httpOptions);
    //return this.http.post<IGetEnhancedHotel>(`${this.url_confirmacion}`, data, httpOptions);
    return this.http.post<IGetPnrHotel>(this.url_reserva, data, httpOptions);
  }

  GetUser(data): Observable<IGetUserById> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_user + 'GetUserById'}?${'userId=' + data}`;
    return this.http.get<IGetUserById>(url, httpOptions);
  }

 /* GetReservation(data): Observable<IGetReservationHotel> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    return this.http.post<IGetReservationHotel>(this.url_getreservation + "GetReservation", data, httpOptions);
  }*/

  ListaReservas(data): Observable<IGetReservationHotel[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_getreservation + 'GetReservation'}?${'userId=' + data}`;
    return this.http.get<IGetReservationHotel[]>(url, httpOptions);
  }

  GetReservationHotel(data): Observable<IGetReservaDetalleHotel> {
    this.token = this.localSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_getreservation + 'GetReservationDetails'}?${'pnr=' + data}`;
    return this.http.get<IGetReservaDetalleHotel>(url, httpOptions);
  }

}
