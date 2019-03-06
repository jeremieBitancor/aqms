import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import * as moment from "moment";

@Injectable()
export class WeeklyService {
  week = moment().week();
  private _coURL =
    "http://128.199.248.62/api/aqms/colevel/daily?week=" + this.week;
  private _windURL =
    "http://128.199.248.62/api/aqms/windspeed/daily?week=" + this.week;
  private _powerURL =
    "http://128.199.248.62/api/aqms/power/daily?week=" + this.week;
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
