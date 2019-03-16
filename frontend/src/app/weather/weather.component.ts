import { Component, OnInit, Input } from "@angular/core";
import { AqmsService } from "../aqms.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"]
})
export class WeatherComponent implements OnInit {
  public mainTemp$: any;
  public mainHumid$: any;
  public windDeg$: any;
  public windSpeed$: any;
  public weatherDes$: any;
  public weatherIcon$: any;

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this._aqmsService.getWeather().subscribe(data => {
      this.mainTemp$ = data.main.temp;
      this.mainHumid$ = data.main.humidity;
    });
    this._aqmsService.getWeather().subscribe(data => {
      this.windDeg$ = data.wind.deg;
      this.windSpeed$ = data.wind.speed;
    });
    this._aqmsService.getWeather().subscribe(data => {
      this.weatherDes$ = data.weather[0].description;
      this.weatherIcon$ = data.weather[0].icon;
    });
  }
}
