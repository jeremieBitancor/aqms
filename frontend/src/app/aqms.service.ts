import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { formatDate } from "@angular/common";
import * as moment from "moment";

@Injectable()
export class AqmsService {
  // month = formatDate(new Date(), "MM", "en").replace(/^0+/, "");
  // day = formatDate(new Date(), "dd", "en").replace(/^0+/, "");
  // year = formatDate(new Date(), "yyyy", "en").replace(/^0+/, "");

  private _coURL = "http://128.199.248.62/api/aqms/colevel/";
  private _windURL = "http://128.199.248.62/api/aqms/windspeed/";
  private _powerURL = "http://128.199.248.62/api/aqms/power/";
  private _aqmsURL = "http://128.199.248.62/api/aqms/latest";
  private _weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=9.628061&lon=123.871929&appid=50ced264cea66e978d9273222d658984&units=metric";

  private week: number;
  private month: string;
  private day: string;
  private year: string;

  constructor(private http: HttpClient) {}

  date(month, day, year) {
    this.month = month;
    this.day = day;
    this.year = year;

    this.getColevelDaily();
    this.getColevelMonthly();
    this.getWindspeedDaily();
    this.getWindspeedMonthly();
    this.getPowerDaily();
    this.getPowerMonthly();

    // console.log(this.month, this.day, this.year);
  }
  getWeek(date) {
    let d = formatDate(date, "yyyy-MM-dd", "en");
    this.week = moment(d).week();
    console.log(this.week);
    this.getColevelWeekly();
    this.getWindspeedWeekly();
    this.getPowerWeekly();
  }

  getAqms() {
    return this.http.get(this._aqmsURL);
  }
  getWeather(): Observable<any> {
    return this.http.get<any>(this._weatherURL);
  }
  getColevelDaily(): Observable<any> {
    let url =
      this._coURL +
      "hourly?year=" +
      this.year +
      "&month=" +
      this.month +
      "&day=" +
      this.day;
    return this.http.get<any>(url);
  }
  getWindspeedDaily(): Observable<any> {
    let url =
      this._windURL +
      "hourly?year=" +
      this.year +
      "&month=" +
      this.month +
      "&day=" +
      this.day;
    return this.http.get<any>(url);
  }
  getPowerDaily(): Observable<any> {
    let url =
      this._powerURL +
      "hourly?year=" +
      this.year +
      "&month=" +
      this.month +
      "&day=" +
      this.day;
    return this.http.get<any>(url);
  }
  getColevelWeekly(): Observable<any> {
    let url = this._coURL + "daily?week=" + this.week;
    return this.http.get<any>(url);
  }
  getWindspeedWeekly(): Observable<any> {
    let url = this._windURL + "daily?week=" + this.week;
    return this.http.get<any>(url);
  }
  getPowerWeekly(): Observable<any> {
    let url = this._powerURL + "daily?week=" + this.week;
    return this.http.get<any>(url);
  }
  getColevelMonthly(): Observable<any> {
    let url = this._coURL + "weekly?year=" + this.year + "&month=" + this.month;
    return this.http.get<any>(url);
  }
  getWindspeedMonthly(): Observable<any> {
    let url =
      this._windURL + "weekly?year=" + this.year + "&month=" + this.month;
    return this.http.get<any>(url);
  }
  getPowerMonthly(): Observable<any> {
    let url =
      this._powerURL + "weekly?year=" + this.year + "&month=" + this.month;
    return this.http.get<any>(url);
  }
}
