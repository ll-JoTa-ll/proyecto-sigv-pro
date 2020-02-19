import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IGetUidByCompanyModel } from '../models/IGetUidByCompany.model';

let httpOptions = {
  headers: new HttpHeaders()
};

let httpOptions2 = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  token;
  key;

  private _url2: string = environment.url_2 + "CompanyUid/";

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

  getUidByCompany(companyId): Observable<IGetUidByCompanyModel[]> {
    return this.http.get<IGetUidByCompanyModel[]>(this._url2 + "GetUidByCompany?companyId=" + companyId, httpOptions);
  }
}
