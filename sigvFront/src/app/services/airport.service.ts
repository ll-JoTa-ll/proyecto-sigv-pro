import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ISearchFlightModel } from '../models/ISearchFlight.model';

let httpOptions = {
  headers: new HttpHeaders()
};

let httpOptions2 = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  token;

  private _url: string = environment.url_2 + "/Airport/";
  private _url2: string = environment.url_2 + "/Search/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
    console.log("AirportService constructor");
    console.log("AirportService constructor");
    console.log("AirportService constructor");
    console.log("AirportService constructor");
    this.token = this.sessionSt.retrieve('ss_token');
    console.log("AirportService constructor token:  " + this.token);
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
  }

  airportList(token) {
    this.token = this.sessionSt.retrieve('ss_token');
    console.log("token:  " + this.token);
    //console.log(this._url + "AirportList ");
    /*
    console.log("token: " + token);
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': "application/json",
    });
    console.log(httpOptions2);
    */
    return this.http.get(this._url + "GetAirports", httpOptions);
  }

  searchFlight(data): Observable<ISearchFlightModel[]> {
    console.log("searchFlight");
    console.log("searchFlight");
    console.log("searchFlight");
    console.log("searchFlight");
    console.log("token: " + this.token);
    return this.http.post<ISearchFlightModel[]>(this._url2 + "SearchFlight", data, httpOptions);
  }
}
