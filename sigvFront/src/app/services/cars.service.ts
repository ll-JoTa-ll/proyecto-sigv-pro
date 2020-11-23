import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SessionStorageService } from "ngx-webstorage";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ICarsSearchResultModel } from "../models/ICarsSearchResult.model";
import { ICarSelectResultModel } from "../models/ICarSelectResult.model";

let httpOptions = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: "root",
})
export class CarsService {
  token;
  key;

  private _url_cars: string = environment.url_cars + "Search/";
  private _url_cars2: string = environment.url_cars + "Booking/";

  constructor(
    private http: HttpClient,
    private sessionSt: SessionStorageService
  ) {
    this.key = environment.key;
    this.token = this.sessionSt.retrieve("ss_token");
    httpOptions.headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": this.key,
    });
  }

  getCars(dataPost): Observable<ICarsSearchResultModel> {
    return this.http.post<ICarsSearchResultModel>(
      this._url_cars + "SearchCars",
      dataPost,
      httpOptions
    );
  }

  selectCar(dataPost): Observable<ICarSelectResultModel> {
    return this.http.post<ICarSelectResultModel>(
      this._url_cars2 + "SelectCar",
      dataPost,
      httpOptions
    );
  }

  confirmationCar(dataPost) {
    return this.http.post(
      this._url_cars2 + "ConfirmationCar",
      dataPost,
      httpOptions
    );
  }
}
