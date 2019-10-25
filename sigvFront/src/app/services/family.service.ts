import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IFareFamilyModel } from '../models/IFareFamily.model';

let httpOptions = {
  headers: new HttpHeaders()
};

let httpOptions2 = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  token;

  private _url3: string = environment.url_2 + "Search/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
    this.token = this.sessionSt.retrieve('ss_token');
    console.log("AirportService constructor token:  " + this.token);
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
  }

  getFareFamily(dataPost): Observable<IFareFamilyModel[]> {
    return this.http.post<IFareFamilyModel[]>(this._url3 + 'GetFareFamily', dataPost, httpOptions);
  }
}
