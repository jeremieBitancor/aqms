import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment";

@Injectable()
export class WeeklyService {
  week = moment().week();
  private _coURL =
    "http://localhost:8000/api/aqms/colevel/daily?week=" + this.week;
  private _windURL =
    "http://localhost:8000/api/aqms/windspeed/daily?week=" + this.week;
  private _powerURL =
    "http://localhost:8000/api/aqms/power/daily?week=" + this.week;
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
