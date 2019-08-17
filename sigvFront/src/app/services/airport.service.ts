import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private _url: string = environment.url_2 + "/SearchFlight/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) { }

  airportList() {
    //console.log(this._url + "AirportList");
    return this.http.get(this._url + "AirportList");
  }
}
