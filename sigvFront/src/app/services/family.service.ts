import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
//import { IFareFamilyModel } from '../models/IFareFamily.model';
import { IFamilyResultModel } from '../models/IFamilyResult.model';

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
  key;

  private _url3: string = environment.url_2 + "SearchTemp/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
    this.key = environment.key;
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
  }

  getFareFamily(dataPost): Observable<any> {
    return this.http.post<any>(this._url3 + 'GetFamilyDescription', dataPost, httpOptions);
  }
}
