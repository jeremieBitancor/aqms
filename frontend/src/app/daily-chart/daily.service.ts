import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";

@Injectable()
export class DailyService {
  month = formatDate(new Date(), "MM", "en").replace(/^0+/, "");
  day = formatDate(new Date(), "dd", "en").replace(/^0+/, "");
  year = formatDate(new Date(), "yyyy", "en").replace(/^0+/, "");

  private _coURL =
    "http://128.199.248.62/api/aqms/colevel/hourly?year=" +
    this.year +
    "&month=" +
    this.month +
    "&day=" +
    this.day;
  private _windURL =
    "http://128.199.248.62/api/aqms/windspeed/hourly?year=" +
    this.year +
    "&month=" +
    this.month +
    "&day=" +
    this.day;
  private _powerURL =
    "http://128.199.248.62/api/aqms/power/hourly?year=" +
    this.year +
    "&month=" +
    this.month +
    "&day=" +
    this.day;

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
