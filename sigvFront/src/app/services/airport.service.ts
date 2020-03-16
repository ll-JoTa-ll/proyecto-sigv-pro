import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionStorageService } from 'ngx-webstorage';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ISearchFlightModel } from '../models/ISearchFlight.model';
import { IFlightAvailability } from '../models/IFlightAvailability';
import { IDatosUser } from '../models/IDatosUser';
import { ICostCenter } from '../models/ICostCenter';
import { IReasonFlight } from '../models/IReasonFlight';
import { IAddPassenger } from '../models/IAddPassenger.model';
import { IPnrConfirm } from '../models/IPnrConfirm.model';
import { IGetApprovers } from '../models/IGetApprovers.model';
import { IGenerateTicket } from '../models/IGenerateTicket.model';
import { IReservaModel } from '../models/iReserva.model';
import { iGetReservation } from '../models/IGetReservation.model';
import { IResultAprobacionReserva } from '../models/iResultAprobacion.model';
import { IQueuePnr } from '../models/IQueuePnr.model';
import { IAirportList } from '../models/IAirportList.model';
import { IGetPaisesModel } from '../models/IGetPaises';
import { IBnusModel } from '../models/Ibnus.model';
import { iGetAsesors } from '../models/IGetAsesors';
import { IRegulationsModel } from '../models/IRegulations';
import { IProfileModel } from '../models/IProfileModel';

let httpOptions = {
  headers: new HttpHeaders()
};

let httpOptions2 = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  token;
  key;

  private _url: string = environment.url_2 + "Airport/";
  private _url2: string = environment.url_2 + "Search/";
  private _url3: string = environment.url_2 + "Search/";
  private _url4: string = environment.url_2 + "Booking/";
  private _url5: string = environment.url_5 + "User/";
  private _url6: string = environment.url_5 + "CostCenter/";
  private _url7: string = environment.url_2 + "ReasonFlight/";
  private _url8: string = environment.url_6 + "Email/";
  private _url9: string = environment.url_2 + "Reservation/";
  private _url10: string = environment.url_2 + "Authorization/";
  private _url11: string = environment.url_2 + "Cancel/";
  private _url12: string = environment.url_2 + "Country/";
  private url_bnus: string = environment.url_bnus + "UnusedTickets/";
  private url_usebnus: string = environment.url_5 + "AsesorCompany/";
  private url_asesors: string = environment .url_5 + "AsesorCompany/";
  private url_regulaciones: string = environment.url_2 + "Search/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
    this.key = environment.key;
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
  }

  airportList(token): Observable<IAirportList> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.get<IAirportList>(this._url + "GetAirports", httpOptions2);
  }

  airportListPriority(token): Observable<IAirportList> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.get<IAirportList>(this._url + "GetPriorityAirports", httpOptions2);
  }

  searchFlight(data): Observable<ISearchFlightModel[]> {
   this.token = this.sessionSt.retrieve('ss_token');
   httpOptions2.headers = new HttpHeaders({ 
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    console.log(httpOptions2);
    return this.http.post<ISearchFlightModel[]>(this._url3 + "SearchFlight", data, httpOptions2);
  }

  fligthAvailibility(data): Observable<IFlightAvailability> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IFlightAvailability>(this._url4 + "FlightAvailability", data, httpOptions2);
  }

  FlightPrice(data): Observable<IFlightAvailability> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IFlightAvailability>(this._url4 + "FlightPrice", data, httpOptions2);
  }

  GetUser(data): Observable<IDatosUser> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this._url5 + 'GetUserById'}?${'userId=' + data}`;
    return this.http.get<IDatosUser>(url, httpOptions2);
  }

  getCostCenter(data): Observable<ICostCenter[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<ICostCenter[]>(this._url6 + "GetCostCenter", data, httpOptions2);
  }

  getReasonFlight(data): Observable<IReasonFlight[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this._url7 + 'GetReasonFlight'}?${'companyId=' + data}`;
    return this.http.get<IReasonFlight[]>(url, httpOptions2);
  }

  AddPassenger(data): Observable<IPnrConfirm> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IPnrConfirm>(this._url4 + "GeneratePNR", data, httpOptions2);
  }

  GetApprovers(data): Observable<IGetApprovers[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IGetApprovers[]>(this._url4 + "GetApprovers", data, httpOptions2);
  }

  SendEmail(data) {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post(this._url8 + "SendEmail", data, httpOptions2);
  }

  GenerateTicket(data): Observable<IGenerateTicket> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IGenerateTicket>(this._url4 + "GenerateTicket", data, httpOptions2);
  }

  ListaReservas(data): Observable<IReservaModel[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this._url9 + 'GetReservationList'}?${'userId=' + data}`;
    return this.http.get<IReservaModel[]>(url, httpOptions2);
  }

  ListaReservasAutorizador(data): Observable<IReservaModel[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this._url9 + 'GetReservationByAuthorizer'}?${'userId=' + data}`;
    return this.http.get<IReservaModel[]>(url, httpOptions2);
  }

  GetReservation(data): Observable<iGetReservation> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<iGetReservation>(this._url9 + "GetReservation", data, httpOptions2);
  }

  AprobarReserva(data): Observable<IResultAprobacionReserva> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IResultAprobacionReserva>(this._url10 + "ApproveReservation", data, httpOptions2);
  }

  RechazarReserva(data): Observable<IResultAprobacionReserva> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IResultAprobacionReserva>(this._url10 + "RefuseReservation", data, httpOptions2);
  }

  CancelPnr(data) {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post(this._url11  + "CancelPNR", data, httpOptions2);
  }

  QueuePnr(data): Observable<IQueuePnr>  {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IQueuePnr>(this._url4  + "QueuePnr", data, httpOptions2);
  }

  GetPaises(): Observable<IGetPaisesModel[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.get<IGetPaisesModel[]>(this._url12  + "GetCountry", httpOptions2);
  }

  GetBoletosnoUsados(data): Observable<IBnusModel[]> {
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer",
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IBnusModel[]>(this.url_bnus  + "GetUnusedTickets", data, httpOptions2);
  }

  ValidateInsertUseBnus(data) {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post(this.url_usebnus  + "ValidateInsertUseBNUS", data, httpOptions2);
  }

  GetAsesors(data): Observable<iGetAsesors[]> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this.url_usebnus + 'GetAsesorByCompany'}?${'CompanyId=' + data}`;
    return this.http.get<iGetAsesors[]>(url, httpOptions2);
  }

  GetRegulations(data): Observable<IRegulationsModel> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    return this.http.post<IRegulationsModel>(this.url_regulaciones  + "GetRegulation", data, httpOptions2);
  }

  GetExtraProfile(data): Observable<IProfileModel> {
    this.token = this.sessionSt.retrieve('ss_token');
    httpOptions2.headers = new HttpHeaders({
      'Authorization': "Bearer " + this.token,
      'Content-Type': "application/json",
      'Ocp-Apim-Subscription-Key': this.key
    });
    const url = `${this._url5 + 'GetExtraProfile'}?${'userId=' + data}`;
    return this.http.get<IProfileModel>(url, httpOptions2);
  }
}
