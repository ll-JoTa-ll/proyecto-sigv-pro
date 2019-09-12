import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ISearchHotelModel } from '../models/ISearchHotel.model';
import { IHotelResultsModel } from '../models/IHotelResults.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private url_search: string = environment.url_hotel + '/SearchHotel/SearchHotel';

  constructor(  private http: HttpClient) { }

  SearchHotel(search: ISearchHotelModel): Observable<IHotelResultsModel[]> {
    return this.http.post<IHotelResultsModel[]>(`${this.url_search}`, search, {
      headers: {
        'Content-Type': 'application/json'
    }
    });
}
}
