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
import { ICostCenterApproval } from '../models/ICostCenterApproval.model';
import { IUserApproval } from '../models/IUserApproval.model';
import { IUploadExcelUser } from '../models/IUploadExcelUser';

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
  private url_costCenterApproval: string = environment.url_5 + "Approval/";
  private url_listMenu: string = environment.url_5 + "Menu/";


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

  getRole(data, data1): Observable<any> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_role + 'GetRoleList'}?${'isAdministrator=' + data}&${'companyId=' + data1}`;
    return this.http.get<any[]>(url, httpOptions2);
  }

  getListMenu(data, data1,data2): Observable<any> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_listMenu + 'GetMenuList'}?${'isAdministrator=' + data}&${'companyId=' + data1}&${'agencyId=' + data2}`;
    return this.http.get<any[]>(url, httpOptions2);
  }

  getPersonByCompany(data,data2): Observable<any> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this._url5 + 'GetPersonUserList'}?${'companyId=' + data}&${'agencyId=' + data2}`;
    return this.http.get<any>(url, httpOptions2);
  }

  getPersonById(data,data2): Observable<any> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this._url5 + 'GetPersonUserDetail'}?${'personId=' + data}&${'userId=' + data2}`;
    return this.http.get<any>(url, httpOptions2);
  }

  getDocument(data): Observable<any> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_document + 'GetDocumentTypeList'}?${'isAdministrator=' + data}`;
    return this.http.get<any>(url, httpOptions2);
  }

  getCostCenterCompany(data): Observable<ICostCenterCompany[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_costCenter + 'GetCostCenter'}?${'companyId=' + data}`;
    return this.http.get<ICostCenterCompany[]>(url, httpOptions2);
  }

  getCostCenterApproval(data):  Observable<ICostCenterApproval[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<ICostCenterApproval[]>(this.url_costCenterApproval + "GetCostCenterApprovers", data, httpOptions2);
  }



  getUserApprovers(data): Observable<IUserApproval[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_costCenterApproval + 'GetUserApprovers'}?${'companyId=' + data}`;
    return this.http.get<IUserApproval[]>(url, httpOptions2);
  }

  getInsertApprovers(data):  Observable<ICostCenterApproval[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<ICostCenterApproval[]>(this.url_costCenterApproval + "InsertUpdateApprovers", data, httpOptions2);
  }

  postUploadExcelUser(data): Observable<IUploadExcelUser> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IUploadExcelUser>(this._url5 + "UploadExcelUser", data, httpOptions2);
  }

}
