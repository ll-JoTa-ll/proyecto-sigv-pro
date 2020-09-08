import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})

export class ReportsService {

  private urlReports: string = environment.url_reports + 'Report/MasterData';

  private urlGeneralReport: string = environment.url_reportGeneral + 'Report/GetGeneralReport';

  constructor(private http: HttpClient) {
   }

   ListReport(data): Observable<any[]> {
    httpOptions.headers = new HttpHeaders({
      'Content-Type': "application/json",
    });
    return this.http.post<any[]>(`${this.urlReports}`, data, httpOptions);
  }

    ListReportGeneral(objData): Observable<any[]>{
      httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.key
      });
      return this.http.post<any[]>(`${this.urlGeneralReport}`, objData, httpOptions);
    }
}
