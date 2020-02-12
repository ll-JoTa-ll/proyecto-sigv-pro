import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IUserCompanyModel } from '../models/IUserCompany.model';
import { IPersonCompany } from '../models/IPersonCompany.model';
import { IPersonId } from '../models/IPersonId.model';

let httpOptions2 = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class UserCompanyService {

  token;

  private _url5: string = environment.url_5 + "User/";
  private url_getreservation: string = environment.url_5 + 'Person/';

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) { }

  getUserByCompany(data): Observable<IUserCompanyModel[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
    });
    return this.http.post<IUserCompanyModel[]>(this._url5 + "GetUserByFreeText", data, httpOptions2);
  }

  getPersonByCompany(data): Observable<IPersonCompany[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
    });
    const url = `${this.url_getreservation + 'GetPersonByCompany'}?${'companyId=' + data}`;
    return this.http.get<IPersonCompany[]>(url, httpOptions2);
  }

  getPersonById(data): Observable<IPersonId[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
    });
    const url = `${this.url_getreservation + 'GetPersonById'}?${'personId=' + data}`;
    return this.http.get<IPersonId[]>(url, httpOptions2);
  }
}
