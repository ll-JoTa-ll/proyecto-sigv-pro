import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IUserCompanyModel } from '../models/IUserCompany.model';

let httpOptions2 = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class UserCompanyService {

  token;

  private _url5: string = environment.url_5 + "User/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) { }

 /* getUserByCompany(companyId, freeText): Observable<IUserCompanyModel[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    const url = `${this._url5}GetUserByCompany?companyId=${companyId}&freeText=${freeText}`;
    return this.http.get<IUserCompanyModel[]>(url, httpOptions2);
  }*/

  getUserByCompany(data): Observable<IUserCompanyModel[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    return this.http.post<IUserCompanyModel[]>(this._url5 + "GetUserByFreeText", data, httpOptions2);
  }
}
