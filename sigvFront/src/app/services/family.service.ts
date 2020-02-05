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

  private _url3: string = environment.url_2 + "Search/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
    });
  }

  getFareFamily(dataPost): Observable<IFamilyResultModel> {
    return this.http.post<IFamilyResultModel>(this._url3 + 'GetFareFamily', dataPost, httpOptions);
  }
}
