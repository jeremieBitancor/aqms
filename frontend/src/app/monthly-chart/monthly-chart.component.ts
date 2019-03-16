import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";
import { AqmsService } from "../aqms.service";

@Component({
  selector: "app-monthly-chart",
  templateUrl: "./monthly-chart.component.html",
  styleUrls: ["./monthly-chart.component.scss"]
})
export class MonthlyChartComponent implements OnInit {
  public co$ = [];
  public wind$ = [];
  public power$ = [];
  coChart: any;
  windChart: any;
  powerChart: any;

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    this.getCo();
    this.getWind();
    this.getPower();
  }

  getCo() {
    this._aqmsService.getColevelMonthly().subscribe(data => {
      this.co$ = data;
      let week = data.map(data => data.week);
      let ave_co = data.map(data => data.ave_co);

      let aveCoFixed = new Array();
      let bgColor = new Array();

      for (let x = 0; x < ave_co.length; x++) {
        // aveCoFixed.push(ave_co[x].toFixed(2));

        if (ave_co[x] <= 50) {
          bgColor.push("#00E676");
        } else if (ave_co[x] >= 51 && ave_co <= 100) {
          bgColor.push("#EEFF41");
        } else if (ave_co[x] >= 101 && ave_co <= 150) {
          bgColor.push("#FFA000");
        } else if (ave_co[x] >= 151 && ave_co <= 200) {
          bgColor.push("#B71C1C");
        } else if (ave_co[x] >= 201 && ave_co <= 300) {
          bgColor.push("#9C27B0");
        } else if (ave_co[x] > 300) {
          bgColor.push("#880E4F");
        }
      }
      this.coChart = new Chart("coCanvas", {
        type: "bar",
        data: {
          labels: week,
          datasets: [
            {
              label: "CO Level",
              data: aveCoFixed,
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
                  labelString: "WEEK",
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
    this._aqmsService.getWindspeedMonthly().subscribe(data => {
      this.wind$ = data;

      let week = data.map(data => data.week);
      let ave_wind = data.map(data => data.ave_wind);
      let aveWindFixed = new Array();

      // for (let x = 0; x < ave_wind.length; x++) {
      //   aveWindFixed.push(ave_wind[x].toFixed(2));
      // }

      this.windChart = new Chart("windCanvas", {
        type: "line",
        data: {
          labels: week,
          datasets: [
            {
              label: "Windspeed",
              data: aveWindFixed,
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
                  labelString: "WEEK",
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
    this._aqmsService.getPowerMonthly().subscribe(data => {
      this.power$ = data;

      let week = data.map(data => data.week);
      let t_wat_wt = data.map(data => data.t_wat_wt);
      let t_wat_pz = data.map(data => data.t_wat_pz);
      let t_wat_all = data.map(data => data.t_wat_all);

      let consumedPower = new Array();

      for (var x = 0; x < t_wat_wt.length; x++) {
        consumedPower.push("10.416");
      }

      this.powerChart = new Chart("powerCanvas", {
        type: "bar",
        data: {
          labels: week,
          datasets: [
            {
              label: "Wind Turbine",
              data: t_wat_wt,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: "#E0E0E0"
            },
            {
              label: "Piezo",
              data: t_wat_pz,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: "#FFF176"
            },
            {
              label: "Both",
              data: t_wat_all,
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
                  labelString: "WEEK",
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
