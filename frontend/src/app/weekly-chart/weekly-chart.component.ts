import { Component, OnInit } from "@angular/core";
import { WeeklyService } from "./weekly.service";
import { Chart } from "chart.js";
import { WeekDay } from "@angular/common";

@Component({
  selector: "app-weekly-chart",
  templateUrl: "./weekly-chart.component.html",
  styleUrls: ["./weekly-chart.component.scss"]
})
export class WeeklyChartComponent implements OnInit {
  public co$ = [];
  public wind$ = [];
  public power$ = [];

  coChart: any;
  windChart: any;
  powerChart: any;

  constructor(private _weeklyService: WeeklyService) {}

  ngOnInit() {
    this.getCo();
    this.getWind();
    this.getPower();
  }

  getCo() {
    this._weeklyService.getColevel().subscribe(data => {
      this.co$ = data;
      let weekday = data.map(data => data.weekday);
      let ave_co = data.map(data => data.ave_co);
      let daysOfWeek = new Array();
      let bgColor = new Array();
      let aveCoFixed = new Array();

      for (var x = 0; x < weekday.length; x++) {
        aveCoFixed.push(ave_co[x].toFixed(2));

        if (weekday[x] == 1) {
          daysOfWeek.push("Sunday");
        } else if (weekday[x] == 2) {
          daysOfWeek.push("Monday");
        } else if (weekday[x] == 3) {
          daysOfWeek.push("Tuesday");
        } else if (weekday[x] == 4) {
          daysOfWeek.push("Wednesday");
        } else if (weekday[x] == 5) {
          daysOfWeek.push("Thursday");
        } else if (weekday[x] == 6) {
          daysOfWeek.push("Friday");
        } else if (weekday[x] == 7) {
          daysOfWeek.push("Saturday");
        }
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
          labels: daysOfWeek,
          datasets: [
            {
              label: "Co Level",
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
                  labelString: "DAYS OF THE WEEK",
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
    this._weeklyService.getWindspeed().subscribe(data => {
      this.wind$ = data;
      let weekday = data.map(data => data.weekday);
      let ave_wind = data.map(data => data.ave_wind);
      let daysOfWeek = new Array();
      let aveWindFixed = new Array();

      for (var x = 0; x < weekday.length; x++) {
        aveWindFixed.push(ave_wind[x].toFixed(2));
        if (weekday[x] == 1) {
          daysOfWeek.push("Sunday");
        } else if (weekday[x] == 2) {
          daysOfWeek.push("Monday");
        } else if (weekday[x] == 3) {
          daysOfWeek.push("Tuesday");
        } else if (weekday[x] == 4) {
          daysOfWeek.push("Wednesday");
        } else if (weekday[x] == 5) {
          daysOfWeek.push("Thursday");
        } else if (weekday[x] == 6) {
          daysOfWeek.push("Friday");
        } else if (weekday[x] == 7) {
          daysOfWeek.push("Saturday");
        }
      }

      this.coChart = new Chart("windCanvas", {
        type: "line",
        data: {
          labels: daysOfWeek,
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
                  labelString: "DAYS OF THE WEEK",
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
    this._weeklyService.getPower().subscribe(data => {
      this.power$ = data;
      let weekday = data.map(data => data.weekday);
      let ave_wat_wt = data.map(data => data.ave_wat_wt);
      let ave_wat_pz = data.map(data => data.ave_wat_pz);
      let ave_wat_all = data.map(data => data.ave_wat_all);

      let daysOfWeek = new Array();

      for (var x = 0; x < weekday.length; x++) {
        if (weekday[x] == 1) {
          daysOfWeek.push("Sunday");
        } else if (weekday[x] == 2) {
          daysOfWeek.push("Monday");
        } else if (weekday[x] == 3) {
          daysOfWeek.push("Tuesday");
        } else if (weekday[x] == 4) {
          daysOfWeek.push("Wednesday");
        } else if (weekday[x] == 5) {
          daysOfWeek.push("Thursday");
        } else if (weekday[x] == 6) {
          daysOfWeek.push("Friday");
        } else if (weekday[x] == 7) {
          daysOfWeek.push("Saturday");
        }
      }

      let consumedPower = new Array();

      for (var x = 0; x < ave_wat_wt.length; x++) {
        consumedPower.push("3");
      }

      this.coChart = new Chart("powerCanvas", {
        type: "bar",
        data: {
          labels: daysOfWeek,
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
                  labelString: "DAYS OF THE WEEK",
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
