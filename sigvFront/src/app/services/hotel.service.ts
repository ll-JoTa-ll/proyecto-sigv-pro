import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ISearchHotelModel } from '../models/ISearchHotel.model';
import { IHotelResultsModel } from '../models/IHotelResults.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHabitacionResults } from '../models/IHabitacionResults';
import { SessionStorageService } from 'ngx-webstorage';
import { listLocales } from 'ngx-bootstrap/chronos';
import { IGetEnhancedHotel } from '../models/IGetEnhancedHotel';
import { IGetPnrHotel } from '../models/IGetPnrHotel.model';
import { IGetUserById } from '../models/IGetUserById.model';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  token;

  private url_search: string = environment.url_hotel + 'HotelSearch/SearchHotel';
  private url_habitacion: string = environment.url_hotel + 'HotelSearch/SearchRoom';
  private url_confirmacion: string = environment.url_hotel + 'Booking/SelectRoom';
  private url_reserva: string = environment.url_hotel + 'Booking/GenerateReservation';
  private url_user: string = environment.url_usuario + 'User/';

  constructor(  private http: HttpClient,private sessionSt: SessionStorageService) { }

  SearchHotel(data): Observable<IHotelResultsModel[]> {
    this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2ZjJmZDQzODI3NGUzYjE2ZmRiZjI2MDYzMGJkOGNlIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzMzMTA5ODcsImV4cCI6MTU3MzMzOTc4NywiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.CT0mmrK8TZgrxXYRwkT0vdddedLzYXViQ0cFs_KGagMYFk0FiyyiNB-TFaV_mx6CCSnPmdonHNPSZMx0G6FmEktRS7ttpmaOBCXo96uv1dsGrRvUxgWZcPZk6m-yb0JODK-4zlGQptKsFyKkP9fYpl4ansF7NC1el7xQVncVOUKRCU61zY4m9zX254qLZO4iSQVpi3bLnlpxUnt_hfJY2Vfgr8VHfNs9yLaE-Qhd0b9vLWBtMswiWmVGkkSnFF9Ip5jySzQOzaYieboZrjNqfcsBiDZ8f809c-JHGo5iHDtb8sTL2Quc9bOWBVlARNHiSVVtt0TBHBT01ve5IvEKcg';
    //this.token = this.sessionSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    return this.http.post<IHotelResultsModel[]>(`${this.url_search}`, data, httpOptions);
}

GetHabitacion(data): Observable<IHabitacionResults> {
  this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2ZjJmZDQzODI3NGUzYjE2ZmRiZjI2MDYzMGJkOGNlIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzMzMTA5ODcsImV4cCI6MTU3MzMzOTc4NywiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.CT0mmrK8TZgrxXYRwkT0vdddedLzYXViQ0cFs_KGagMYFk0FiyyiNB-TFaV_mx6CCSnPmdonHNPSZMx0G6FmEktRS7ttpmaOBCXo96uv1dsGrRvUxgWZcPZk6m-yb0JODK-4zlGQptKsFyKkP9fYpl4ansF7NC1el7xQVncVOUKRCU61zY4m9zX254qLZO4iSQVpi3bLnlpxUnt_hfJY2Vfgr8VHfNs9yLaE-Qhd0b9vLWBtMswiWmVGkkSnFF9Ip5jySzQOzaYieboZrjNqfcsBiDZ8f809c-JHGo5iHDtb8sTL2Quc9bOWBVlARNHiSVVtt0TBHBT01ve5IvEKcg';
  //this.token = this.sessionSt.retrieve('ss_token');
  httpOptions.headers = new HttpHeaders({
    'Authorization': "Bearer " + this.token,
    'Content-Type': "application/json",
  });
  return this.http.post<IHabitacionResults>(`${this.url_habitacion}`, data, httpOptions);
}

  GetConfirmacion(data): Observable<IGetEnhancedHotel>{
    this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2ZjJmZDQzODI3NGUzYjE2ZmRiZjI2MDYzMGJkOGNlIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzMzMTA5ODcsImV4cCI6MTU3MzMzOTc4NywiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.CT0mmrK8TZgrxXYRwkT0vdddedLzYXViQ0cFs_KGagMYFk0FiyyiNB-TFaV_mx6CCSnPmdonHNPSZMx0G6FmEktRS7ttpmaOBCXo96uv1dsGrRvUxgWZcPZk6m-yb0JODK-4zlGQptKsFyKkP9fYpl4ansF7NC1el7xQVncVOUKRCU61zY4m9zX254qLZO4iSQVpi3bLnlpxUnt_hfJY2Vfgr8VHfNs9yLaE-Qhd0b9vLWBtMswiWmVGkkSnFF9Ip5jySzQOzaYieboZrjNqfcsBiDZ8f809c-JHGo5iHDtb8sTL2Quc9bOWBVlARNHiSVVtt0TBHBT01ve5IvEKcg';
    //this.token = this.sessionSt.retrieve('ss_token');
    console.log("token: " + this.token);
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    console.log(httpOptions);
    //return this.http.post<IGetEnhancedHotel>(`${this.url_confirmacion}`, data, httpOptions);
    return this.http.post<IGetEnhancedHotel>(this.url_confirmacion, data, httpOptions);
  }

  GetReserva(data): Observable<IGetPnrHotel>{
    this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2ZjJmZDQzODI3NGUzYjE2ZmRiZjI2MDYzMGJkOGNlIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzMzMTA5ODcsImV4cCI6MTU3MzMzOTc4NywiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.CT0mmrK8TZgrxXYRwkT0vdddedLzYXViQ0cFs_KGagMYFk0FiyyiNB-TFaV_mx6CCSnPmdonHNPSZMx0G6FmEktRS7ttpmaOBCXo96uv1dsGrRvUxgWZcPZk6m-yb0JODK-4zlGQptKsFyKkP9fYpl4ansF7NC1el7xQVncVOUKRCU61zY4m9zX254qLZO4iSQVpi3bLnlpxUnt_hfJY2Vfgr8VHfNs9yLaE-Qhd0b9vLWBtMswiWmVGkkSnFF9Ip5jySzQOzaYieboZrjNqfcsBiDZ8f809c-JHGo5iHDtb8sTL2Quc9bOWBVlARNHiSVVtt0TBHBT01ve5IvEKcg';
    //this.token = this.sessionSt.retrieve('ss_token');
    console.log("token: " + this.token);
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    console.log(httpOptions);
    //return this.http.post<IGetEnhancedHotel>(`${this.url_confirmacion}`, data, httpOptions);
    return this.http.post<IGetPnrHotel>(this.url_reserva, data, httpOptions);
  }

  GetUser(data): Observable<IGetUserById> {
    this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2ZjJmZDQzODI3NGUzYjE2ZmRiZjI2MDYzMGJkOGNlIiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzMzMTA5ODcsImV4cCI6MTU3MzMzOTc4NywiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.CT0mmrK8TZgrxXYRwkT0vdddedLzYXViQ0cFs_KGagMYFk0FiyyiNB-TFaV_mx6CCSnPmdonHNPSZMx0G6FmEktRS7ttpmaOBCXo96uv1dsGrRvUxgWZcPZk6m-yb0JODK-4zlGQptKsFyKkP9fYpl4ansF7NC1el7xQVncVOUKRCU61zY4m9zX254qLZO4iSQVpi3bLnlpxUnt_hfJY2Vfgr8VHfNs9yLaE-Qhd0b9vLWBtMswiWmVGkkSnFF9Ip5jySzQOzaYieboZrjNqfcsBiDZ8f809c-JHGo5iHDtb8sTL2Quc9bOWBVlARNHiSVVtt0TBHBT01ve5IvEKcg';
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    const url = `${this.url_user + 'GetUserById'}?${'userId=' + data}`;
    return this.http.get<IGetUserById>(url, httpOptions);
  }
}
