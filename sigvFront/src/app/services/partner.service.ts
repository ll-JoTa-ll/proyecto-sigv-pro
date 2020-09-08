import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable, observable } from 'rxjs';
import { data } from 'jquery';

let httOptions = {
    headers: new HttpHeaders()
};

@Injectable({
    providedIn: 'root'
})


export class PatnerService {
  private url_companys: string = environment.url_customer + 'Company/GetCompany';

  constructor(private http: HttpClient) {}

  ListCompany(): Observable<any[]> {
      httOptions.headers = new HttpHeaders({
          'Ocp-Apim-Subscription-Key': environment.key,
          'Content-Type': 'application/json'
      });
      return this.http.get<any[]>(`${this.url_companys}`, httOptions);
  }
}
