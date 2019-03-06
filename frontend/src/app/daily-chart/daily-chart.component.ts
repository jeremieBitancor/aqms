import { Component, OnInit } from "@angular/core";
import { DailyService } from "./daily.service";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import { Chart } from "chart.js";

@Component({
  selector: "app-daily-chart",
  templateUrl: "./daily-chart.component.html",
  styleUrls: ["./daily-chart.component.scss"]
})
export class DailyChartComponent implements OnInit {
  public co$ = [];
  public wind$ = [];
  public power$ = [];

  coChart: any;
  windChart: any;
  powerChart: any;

  constructor(private _dailyService: DailyService) {}

  ngOnInit() {
    this.getCo();
    this.getWind();
    this.getPower();
  }

  getCo() {
    this._dailyService.getColevel().subscribe(data => {
      this.co$ = data;
      let hour = data.map(data => data.hour);
      let ave_co = data.map(data => data.ave_co);
      let bgColor = new Array();

      for (let x = 0; x < ave_co.length; x++) {
        if (ave_co[x] <= 50) {
          bgColor.push("#00E676");
        } else if (ave_co[x] >= 51 && ave_co[x] <= 100) {
          bgColor.push("#EEFF41");
        } else if (ave_co[x] >= 101 && ave_co[x] <= 150) {
          bgColor.push("#FFA000");
        } else if (ave_co[x] >= 151 && ave_co[x] <= 200) {
          bgColor.push("#B71C1C");
        } else if (ave_co[x] >= 201 && ave_co[x] <= 300) {
          bgColor.push("#9C27B0");
        } else if (ave_co[x] > 300) {
          bgColor.push("#880E4F");
        }
      }

      this.coChart = new Chart("coCanvas", {
        type: "bar",
        data: {
          labels: hour,
          datasets: [
            {
              label: "CO Level",
              data: ave_co,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: bgColor
            }
          ]
        },
        options: {
          legend: {
            display: false,
            position: "left",
            labels: {
              fontSize: 16,
              fontStyle: "bold"
            }
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "HOURS",
                  fontSize: 14,
                  fontStyle: "bold"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: "ppm",
                  fontSize: 14,
                  fontStyle: "bold"
                }
              }
            ]
          }
        }
      });
    });
  }
  getWind() {
    this._dailyService.getWindspeed().subscribe(data => {
      this.wind$ = data;

      let hour = data.map(data => data.hour);
      let ave_wind = data.map(data => data.ave_wind);

      this.windChart = new Chart("windCanvas", {
        type: "line",
        data: {
          labels: hour,
          datasets: [
            {
              label: "Windspeed",
              data: ave_wind,
              borderColor: "#0288D1",
              backgroundColor: "#0288D1",
              fill: false,
              borderWidth: 3
            }
          ]
        },
        options: {
          legend: {
            display: false,
            position: "left",
            labels: {
              fontSize: 16,
              fontStyle: "bold"
            }
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "HOURS",
                  fontSize: 14,
                  fontStyle: "bold"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: "m/s",
                  fontSize: 14,
                  fontStyle: "bold"
                }
              }
            ]
          }
        }
      });
    });
  }
  getPower() {
    this._dailyService.getPower().subscribe(data => {
      this.power$ = data;

      let hour = data.map(data => data.hour);
      let ave_wat_wt = data.map(data => data.ave_wat_wt);
      let ave_wat_pz = data.map(data => data.ave_wat_pz);
      let ave_wat_all = data.map(data => data.ave_wat_all);
      let consumedPower = new Array();

      for (var x = 0; x < ave_wat_wt.length; x++) {
        consumedPower.push("0.062");
      }

      this.powerChart = new Chart("powerCanvas", {
        type: "bar",
        data: {
          labels: hour,
          datasets: [
            {
              label: "Wind Turbine",
              data: ave_wat_wt,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: "#E0E0E0"
            },
            {
              label: "Piezo",
              data: ave_wat_pz,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: "#FFF176"
            },
            {
              label: "Both",
              data: ave_wat_all,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: "#4FC3F7"
            },
            {
              label: "Consumed",
              data: consumedPower,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: "#EF5350"
            }
          ]
        },
        options: {
          legend: {
            display: false,
            position: "left",
            labels: {
              fontSize: 14,
              fontStyle: "bold"
            }
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "HOURS",
                  fontSize: 14,
                  fontStyle: "bold"
                }
              }
            ],
            yAxes: [
              {
                display: true,
                ticks: {
                  beginAtZero: true
                },
                scaleLabel: {
                  display: true,
                  labelString: "watts",
                  fontSize: 14,
                  fontStyle: "bold"
                }
              }
            ]
          }
        }
      });
    });
  }
}
