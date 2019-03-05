import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";

@Injectable()
export class MonthlyService {
  month = formatDate(new Date(), "MM", "en").replace(/^0+/, "");
  year = formatDate(new Date(), "yyyy", "en").replace(/^0+/, "");

  private _coURL =
    "http://localhost:8000/api/aqms/colevel/weekly?year=" +
    this.year +
    "&month=" +
    this.month;
  private _windURL =
    "http://localhost:8000/api/aqms/windspeed/weekly?year=" +
    this.year +
    "&month=" +
    this.month;
  private _powerURL =
    "http://localhost:8000/api/aqms/power/weekly?year=" +
    this.year +
    "&month=" +
    this.month;

  constructor(private http: HttpClient) {}

  getColevel(): Observable<any> {
    return this.http.get<any>(this._coURL);
  }
  getWindspeed(): Observable<any> {
    return this.http.get<any>(this._windURL);
  }
  getPower(): Observable<any> {
    return this.http.get<any>(this._powerURL);
  }
}
