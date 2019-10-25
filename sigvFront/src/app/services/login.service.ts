import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ILoginDatosModel } from '../models/ILoginDatos.model';

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
    return this.http.post<ILoginDatosModel>(this._url + "LoginUser", datos);
  }
}
