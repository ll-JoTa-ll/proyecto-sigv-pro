import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ILoginDatosModel } from '../models/ILoginDatos.model';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url: string = environment.url + "Authenticate/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) { }

  login(datos): Observable<ILoginDatosModel> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': "eb85131bc9d94c02840aa6961e7f77e9"
    });
    return this.http.post<ILoginDatosModel>(this._url + "LoginUser", datos, httpOptions);
  }
}
