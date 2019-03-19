import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { AqmsService } from "../aqms.service";
import { formatDate } from "@angular/common";
import { FormControl } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-power-chart",
  templateUrl: "./power-chart.component.html",
  styleUrls: ["./power-chart.component.scss"]
})
export class PowerChartComponent implements OnInit {
  pwD$ = [];
  pwW$ = [];
  pwM$ = [];

  pwChartD: any;
  pwChartW: any;
  pwChartM: any;

  date = new FormControl(new Date());
  dateData = moment().format("MM DD YYYY");

  year = formatDate(new Date(), "yyyy", "en").replace(/^0+/, "");
  month = formatDate(new Date(), "MM", "en").replace(/^0+/, "");
  day = formatDate(new Date(), "dd", "en").replace(/^0+/, "");

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    this._aqmsService.date(this.month, this.day, this.year);
    this._aqmsService.getWeek(this.dateData);
    this.getPwD();
    this.getPwW();
    this.getPwM();
    this.getDate();
  }

  getDate() {
    // console.log(this.date.value);

    this.date.valueChanges.subscribe(data => {
      this.dateData = data;
      let year = formatDate(this.dateData, "yyyy", "en").replace(/^0+/, "");
      let month = formatDate(this.dateData, "MM", "en").replace(/^0+/, "");
      let day = formatDate(this.dateData, "dd", "en").replace(/^0+/, "");

      this._aqmsService.date(month, day, year);
      this._aqmsService.getWeek(this.dateData);

      this.getPwD();
      this.getPwW();
      this.getPwM();
    });
  }

  getPwD() {
    this._aqmsService.getPowerDaily().subscribe(data => {
      this.pwD$ = data;

      let hour = data.map(data => data.hour);
      let t_wat_wt = data.map(data => data.t_wat_wt);
      let t_wat_pz = data.map(data => data.t_wat_pz);
      let t_wat_all = data.map(data => data.t_wat_all);
      let consumedPower = new Array();

      for (var x = 0; x < t_wat_wt.length; x++) {
        consumedPower.push("0.062");
      }

      this.pwChartD = new Chart("pwCanvasD", {
        type: "bar",
        data: {
          labels: hour,
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
          tooltips: {
            mode: "label"
          },
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
  getPwW() {
    this._aqmsService.getPowerWeekly().subscribe(data => {
      this.pwW$ = data;
      let weekday = data.map(data => data.weekday);
      let t_wat_wt = data.map(data => data.t_wat_wt);
      let t_wat_pz = data.map(data => data.t_wat_pz);
      let t_wat_all = data.map(data => data.t_wat_all);
      // console.log(t_wat_all);

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

      for (var x = 0; x < t_wat_wt.length; x++) {
        consumedPower.push("1.488");
      }

      this.pwChartW = new Chart("pwCanvasW", {
        type: "bar",
        data: {
          labels: daysOfWeek,
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
          tooltips: {
            mode: "label"
          },
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
  getPwM() {
    this._aqmsService.getPowerMonthly().subscribe(data => {
      this.pwM$ = data;

      let week = data.map(data => data.week);
      let t_wat_wt = data.map(data => data.t_wat_wt);
      let t_wat_pz = data.map(data => data.t_wat_pz);
      let t_wat_all = data.map(data => data.t_wat_all);

      let consumedPower = new Array();

      for (var x = 0; x < t_wat_wt.length; x++) {
        consumedPower.push("10.416");
      }

      this.pwChartM = new Chart("pwCanvasM", {
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
          tooltips: {
            mode: "label"
          },
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
