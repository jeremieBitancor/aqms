import { Component, OnInit, Input } from "@angular/core";
import { WeatherService } from "./weather.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.scss"]
})
export class WeatherComponent implements OnInit {
  public main$ = [];
  public wind$ = [];
  public weather$ = [];

  constructor(private _weatherService: WeatherService) {}

  ngOnInit() {
    this.getWeather();
  }

  getWeather() {
    this._weatherService.getWeather().subscribe(data => {
      this.main$ = data.main;
    });
    this._weatherService.getWeather().subscribe(data => {
      this.wind$ = data.wind;
    });
    this._weatherService.getWeather().subscribe(data => {
      this.weather$ = data.weather[0];
    });
  }
}
