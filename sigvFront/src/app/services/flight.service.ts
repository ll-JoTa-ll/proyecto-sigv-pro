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

  private _url_5: string = environment.url_5 + "CompanyAccessUid/";

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

  getUidByCompany(companyId, pseudo): Observable<IGetUidByCompanyModel[]> {
    console.log(companyId);
    console.log(pseudo);
    return this.http.get<IGetUidByCompanyModel[]>(this._url_5 + "GetEditableCompanyUid?companyId=" + companyId + "&pseudo=" + pseudo, httpOptions);
  }
}
