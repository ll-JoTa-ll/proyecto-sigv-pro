import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

interface ILogin {
  userId: number;
  userName: string;
  userLastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _url: string = environment.url + "/Authenticate/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) { }

  login(datos): Observable<ILogin> {
    return this.http.post<ILogin>(this._url + "LoginUser", datos);
  }
}
