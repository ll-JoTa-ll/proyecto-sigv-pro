import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { IUserCompanyModel } from '../models/IUserCompany.model';
import { IPersonCompany } from '../models/IPersonCompany.model';
import { IPersonId } from '../models/IPersonId.model';
import { IDocumentType } from '../models/IDocumentType.model';
import { IRole } from '../models/IRole.model';
import { ICostCenter } from '../models/ICostCenter';
import { ICostCenterCompany } from '../models/ICostCenterCompany.model';

let httpOptions2 = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class UserCompanyService {

  token;
  key;

  private _url5: string = environment.url_5 + "User/";
  private url_getreservation: string = environment.url_5 + 'Person/';
  private url_document: string = environment.url_5 + 'DocumentType/';
  private url_role: string = environment.url_5 + 'Role/';
  private url_costCenter: string = environment.url_5 + 'CostCenter/';
  private url_insertUpdate: string = environment.url_5 + 'User/InsertUpdateUser';

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) { 
    this.key = environment.key;
  }

  getUserByCompany(data): Observable<IUserCompanyModel[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IUserCompanyModel[]>(this._url5 + "GetUserByFreeText", data, httpOptions2);
  }

  getRole(data): Observable<IRole[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
    });
    return this.http.post<IRole[]>(this.url_role + "GetRole", data, httpOptions2);
  }

  getPersonByCompany(data): Observable<IPersonCompany[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_getreservation + 'GetPersonByCompany'}?${'companyId=' + data}`;
    return this.http.get<IPersonCompany[]>(url, httpOptions2);
  }

  getPersonById(data): Observable<IPersonId[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_getreservation + 'GetPersonById'}?${'personId=' + data}`;
    return this.http.get<IPersonId[]>(url, httpOptions2);
  }

  getDocument(): Observable<IDocumentType[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
    });
    const url = `${this.url_document + 'GetDocumentType'}`;
    return this.http.get<IDocumentType[]>(url, httpOptions2);
  }

  getCostCenterCompany(data): Observable<ICostCenterCompany[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
    });
    const url = `${this.url_costCenter + 'GetCostCenterByCompany'}?${'companyId=' + data}`;
    return this.http.get<ICostCenterCompany[]>(url, httpOptions2);
  }

  insertUpdateUser(data): Observable<boolean> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
    });
    return this.http.post<boolean>(`${this.url_insertUpdate}`, data, httpOptions2);
  }

}
