import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

let httpOptions = {
  headers: new HttpHeaders()
};

@Injectable({
  providedIn: 'root'
})

export class ReportsService {

  private urlReports: string = environment.url_reports + 'Report/MasterData';
  private urlField: string = environment.url_customer + 'ReportField/GetReportFields';
  private urlCompanyReport: string = environment.url_customer + 'CompanyReport/GetListCompanyReport';
  private urlInsertUpdate: string = environment.url_customer + 'CompanyReport/InsertUpdateCompanyReport';
  private urlGeneralReport: string = environment.url_reportGeneral + 'Report/GetGeneralReport';

  constructor(private http: HttpClient) {
   }

   public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName  + EXCEL_EXTENSION);
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

    getReportField(data): Observable<any> {
      httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.key
      });
      const url = `${this.urlField}?${'companyReportId=' + data}`;
      return this.http.get<any>(url, httpOptions);
    }

    getCompanyReport(data): Observable<any> {
      httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.key
      });
      const url = `${this.urlCompanyReport}?${'companyId=' + data}`;
      return this.http.get<any>(url, httpOptions);
    }

    insertUpdateCompany(objData): Observable<any>{
      httpOptions.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.key
      });
      return this.http.post<any>(`${this.urlInsertUpdate}`, objData, httpOptions);
    }
}
