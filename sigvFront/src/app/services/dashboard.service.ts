import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';

const httpOptions = {
    headers: new HttpHeaders()
  };

@Injectable({
    providedIn: 'root'
  })
export class DashboardService {
    token;
    key;

    private urlGetDashboard: string = environment.url_2 + 'Report/';

    constructor(
        private http: HttpClient,
        private sessionSt: SessionStorageService) {
        this.key = environment.key;
       }

    getDashboard(companyId): Observable<any> {
        this.token = this.sessionSt.retrieve('ss_token');
        httpOptions.headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.token,
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': this.key
        });
        const url = `${this.urlGetDashboard + 'GetPoliciesReport'}?${'companyId=' + companyId}`;
        return this.http.get<any>(url, httpOptions);
      }
}
