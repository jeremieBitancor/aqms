import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class WeatherService {
  private _weatherURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=9.628061&lon=123.871929&appid=50ced264cea66e978d9273222d658984&units=metric";

  constructor(private http: HttpClient) {}

  getWeather(): Observable<any> {
    return this.http.get<any>(this._weatherURL);
  }
}
