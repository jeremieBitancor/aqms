import { Component, OnInit } from "@angular/core";

import Chart from "chart.js";
import { AqmsService } from "../aqms.service";
import { formatDate } from "@angular/common";
import { FormControl } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-windspeed-chart",
  templateUrl: "./windspeed-chart.component.html",
  styleUrls: ["./windspeed-chart.component.scss"]
})
export class WindspeedChartComponent implements OnInit {
  wsD$ = [];
  wsW$ = [];
  wsM$ = [];

  wsChartD: any;
  wsChartW: any;
  wsChartM: any;

  date = new FormControl(new Date());
  dateData = moment().format("MM DD YYYY");

  year = formatDate(new Date(), "yyyy", "en").replace(/^0+/, "");
  month = formatDate(new Date(), "MM", "en").replace(/^0+/, "");
  day = formatDate(new Date(), "dd", "en").replace(/^0+/, "");

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    let d = formatDate(new Date(), "yyyy-MM-dd", "en");
    let week = moment(d).week();
    this.getWsD(this.year, this.month, this.day);
    this.getWsW(week);
    this.getWsM(this.year, this.month);
    this.getDate();
  }
  getDate() {
    // this._aqmsService.date(this.month, this.day, this.year);
    // this._aqmsService.getWeek(this.dateData);

    this.date.valueChanges.subscribe(data => {
      this.dateData = data;
      let year = formatDate(this.dateData, "yyyy", "en").replace(/^0+/, "");
      let month = formatDate(this.dateData, "MM", "en").replace(/^0+/, "");
      let day = formatDate(this.dateData, "dd", "en").replace(/^0+/, "");

      // this._aqmsService.date(month, day, year);
      // this._aqmsService.getWeek(this.dateData);

      let d = formatDate(this.dateData, "yyyy-MM-dd", "en");
      let week = moment(d).week();
      this.wsChartD.destroy();
      this.getWsD(month, day, year);
      this.wsChartW.destroy();
      this.getWsW(week);
      this.wsChartM.destroy();
      this.getWsM(year, month);
    });
  }
  getWsD(month, day, year) {
    this._aqmsService.getWindspeedDaily(month, day, year).subscribe(data => {
      this.wsD$ = data;

      let hour = data.map(data => data.hour);
      let ave_wind = data.map(data => data.ave_wind);

      this.wsChartD = new Chart("wsCanvasD", {
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
  getWsW(week) {
    this._aqmsService.getWindspeedWeekly(week).subscribe(data => {
      this.wsW$ = data;
      let weekday = data.map(data => data.weekday);
      let ave_wind = data.map(data => data.ave_wind);
      let daysOfWeek = new Array();
      // let aveWindFixed = new Array();

      for (var x = 0; x < weekday.length; x++) {
        // aveWindFixed.push(ave_wind[x].toFixed(2));
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

      this.wsChartW = new Chart("wsCanvasW", {
        type: "line",
        data: {
          labels: daysOfWeek,
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
  getWsM(month, year) {
    this._aqmsService.getWindspeedMonthly(month, year).subscribe(data => {
      this.wsM$ = data;

      let week = data.map(data => data.week);
      let ave_wind = data.map(data => data.ave_wind);
      // let aveWindFixed = new Array();

      // for (let x = 0; x < ave_wind.length; x++) {
      //   aveWindFixed.push(ave_wind[x].toFixed(2));
      // }

      this.wsChartM = new Chart("wsCanvasM", {
        type: "line",
        data: {
          labels: week,
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
}
