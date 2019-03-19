import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { AqmsService } from "../aqms.service";
import { formatDate } from "@angular/common";
import { FormControl } from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: "app-colevel-chart",
  templateUrl: "./colevel-chart.component.html",
  styleUrls: ["./colevel-chart.component.scss"]
})
export class ColevelChartComponent implements OnInit {
  coD$ = [];
  coW$ = [];
  coM$ = [];

  coChartD: any;
  coChartW: any;
  coChartM: any;

  date = new FormControl(new Date());
  dateData = moment().format("MM DD YYYY");

  year = formatDate(new Date(), "yyyy", "en").replace(/^0+/, "");
  month = formatDate(new Date(), "MM", "en").replace(/^0+/, "");
  day = formatDate(new Date(), "dd", "en").replace(/^0+/, "");

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    let d = formatDate(new Date(), "yyyy-MM-dd", "en");
    let week = moment(d).week();
    this.getCoD(this.year, this.month, this.day);
    this.getCoW(week);
    this.getCoM(this.year, this.month);
    this.getDate();
  }

  getDate() {
    // console.log(this.date.value);

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
      this.coChartD.destroy();
      this.getCoD(month, day, year);
      this.coChartW.destroy();
      this.getCoW(week);
      this.coChartM.destroy();
      this.getCoM(year, month);
    });
  }

  getCoD(month, day, year) {
    this._aqmsService.getColevelDaily(month, day, year).subscribe(data => {
      this.coD$ = data;
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

      this.coChartD = new Chart("coCanvasD", {
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
  getCoW(week) {
    this._aqmsService.getColevelWeekly(week).subscribe(data => {
      this.coW$ = data;
      let weekday = data.map(data => data.weekday);
      let ave_co = data.map(data => data.ave_co);
      let daysOfWeek = new Array();
      let bgColor = new Array();
      // let aveCoFixed = new Array();

      for (var x = 0; x < weekday.length; x++) {
        // aveCoFixed.push(ave_co[x].toFixed(2));

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

      this.coChartW = new Chart("coCanvasW", {
        type: "bar",
        data: {
          labels: daysOfWeek,
          datasets: [
            {
              label: "Co Level",
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
  getCoM(year, month) {
    this._aqmsService.getColevelMonthly(year, month).subscribe(data => {
      this.coM$ = data;
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
      this.coChartM = new Chart("coCanvasM", {
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
}
