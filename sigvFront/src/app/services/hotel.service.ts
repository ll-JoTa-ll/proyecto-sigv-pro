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
    this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ2NTk1NTI4Mjk5NzMzNmU3NDI5YzIwNTE0YjlmNjE0IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzM1NzIwMDksImV4cCI6MTU3MzU3NTYwOSwiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.D7dFirFD2XSvHpaIMagBlDCfmOt8uI3_o2mpkveWUEVLl-qR28Uo5-yf2Cm-98Y1xBsU4k_3XljUL0ni3-PwR6flGlHI4ksYgvByqV2IlaXkVgMzS_J40MOnXwmxGLHoDLeAOVs4SN18k29ZcM3y-21MK9UVwX3kj2jJhhXNM352Oz0ZHs3hl_DBVk2GGFIbFea_QaIsniSW9aSr4pJCi5C2DPigR1lqwbwOw6nASj9pyTaYZf945_IhKI1X5TGEB4o3nyzeuS_0vKXcKbzShbenAj6vNxW0Rt_36_0qMnN4zecER2BCZTqouOtFBOzT5xoWQv0xd0O-h7IGlvWGfA';
    //this.token = this.sessionSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    return this.http.post<IHotelResultsModel[]>(`${this.url_search}`, data, httpOptions);
}

GetHabitacion(data): Observable<IHabitacionResults> {
  this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ2NTk1NTI4Mjk5NzMzNmU3NDI5YzIwNTE0YjlmNjE0IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzM1NzIwMDksImV4cCI6MTU3MzU3NTYwOSwiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.D7dFirFD2XSvHpaIMagBlDCfmOt8uI3_o2mpkveWUEVLl-qR28Uo5-yf2Cm-98Y1xBsU4k_3XljUL0ni3-PwR6flGlHI4ksYgvByqV2IlaXkVgMzS_J40MOnXwmxGLHoDLeAOVs4SN18k29ZcM3y-21MK9UVwX3kj2jJhhXNM352Oz0ZHs3hl_DBVk2GGFIbFea_QaIsniSW9aSr4pJCi5C2DPigR1lqwbwOw6nASj9pyTaYZf945_IhKI1X5TGEB4o3nyzeuS_0vKXcKbzShbenAj6vNxW0Rt_36_0qMnN4zecER2BCZTqouOtFBOzT5xoWQv0xd0O-h7IGlvWGfA';
  //this.token = this.sessionSt.retrieve('ss_token');
  httpOptions.headers = new HttpHeaders({
    'Authorization': "Bearer " + this.token,
    'Content-Type': "application/json",
  });
  return this.http.post<IHabitacionResults>(`${this.url_habitacion}`, data, httpOptions);
}

  GetConfirmacion(data): Observable<IGetEnhancedHotel>{
    this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ2NTk1NTI4Mjk5NzMzNmU3NDI5YzIwNTE0YjlmNjE0IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzM1NzIwMDksImV4cCI6MTU3MzU3NTYwOSwiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.D7dFirFD2XSvHpaIMagBlDCfmOt8uI3_o2mpkveWUEVLl-qR28Uo5-yf2Cm-98Y1xBsU4k_3XljUL0ni3-PwR6flGlHI4ksYgvByqV2IlaXkVgMzS_J40MOnXwmxGLHoDLeAOVs4SN18k29ZcM3y-21MK9UVwX3kj2jJhhXNM352Oz0ZHs3hl_DBVk2GGFIbFea_QaIsniSW9aSr4pJCi5C2DPigR1lqwbwOw6nASj9pyTaYZf945_IhKI1X5TGEB4o3nyzeuS_0vKXcKbzShbenAj6vNxW0Rt_36_0qMnN4zecER2BCZTqouOtFBOzT5xoWQv0xd0O-h7IGlvWGfA';
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
    this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ2NTk1NTI4Mjk5NzMzNmU3NDI5YzIwNTE0YjlmNjE0IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzM1NzIwMDksImV4cCI6MTU3MzU3NTYwOSwiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.D7dFirFD2XSvHpaIMagBlDCfmOt8uI3_o2mpkveWUEVLl-qR28Uo5-yf2Cm-98Y1xBsU4k_3XljUL0ni3-PwR6flGlHI4ksYgvByqV2IlaXkVgMzS_J40MOnXwmxGLHoDLeAOVs4SN18k29ZcM3y-21MK9UVwX3kj2jJhhXNM352Oz0ZHs3hl_DBVk2GGFIbFea_QaIsniSW9aSr4pJCi5C2DPigR1lqwbwOw6nASj9pyTaYZf945_IhKI1X5TGEB4o3nyzeuS_0vKXcKbzShbenAj6vNxW0Rt_36_0qMnN4zecER2BCZTqouOtFBOzT5xoWQv0xd0O-h7IGlvWGfA';
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
    this.token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQ2NTk1NTI4Mjk5NzMzNmU3NDI5YzIwNTE0YjlmNjE0IiwidHlwIjoiSldUIn0.eyJuYmYiOjE1NzM1NzIwMDksImV4cCI6MTU3MzU3NTYwOSwiaXNzIjoiaHR0cHM6Ly9zaWd2cGx1c3NlY3VyaXR5LmF6dXJld2Vic2l0ZXMubmV0IiwiYXVkIjpbImh0dHBzOi8vc2lndnBsdXNzZWN1cml0eS5henVyZXdlYnNpdGVzLm5ldC9yZXNvdXJjZXMiLCJTZXJ2aWNpb3NTaWd2UGx1cyJdLCJjbGllbnRfaWQiOiJTaWd2UGx1cyIsInNjb3BlIjpbIlNlcnZpY2lvc1NpZ3ZQbHVzIl19.D7dFirFD2XSvHpaIMagBlDCfmOt8uI3_o2mpkveWUEVLl-qR28Uo5-yf2Cm-98Y1xBsU4k_3XljUL0ni3-PwR6flGlHI4ksYgvByqV2IlaXkVgMzS_J40MOnXwmxGLHoDLeAOVs4SN18k29ZcM3y-21MK9UVwX3kj2jJhhXNM352Oz0ZHs3hl_DBVk2GGFIbFea_QaIsniSW9aSr4pJCi5C2DPigR1lqwbwOw6nASj9pyTaYZf945_IhKI1X5TGEB4o3nyzeuS_0vKXcKbzShbenAj6vNxW0Rt_36_0qMnN4zecER2BCZTqouOtFBOzT5xoWQv0xd0O-h7IGlvWGfA';
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
    });
    const url = `${this.url_user + 'GetUserById'}?${'userId=' + data}`;
    return this.http.get<IGetUserById>(url, httpOptions);
  }
}
