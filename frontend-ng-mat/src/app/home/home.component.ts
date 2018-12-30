import { Component, OnInit } from "@angular/core";
// import { DataService } from "../data.service";
import { HttpClient } from "@angular/common/http";
import { Data } from "./Data";
import { Chart } from "chart.js";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  // colevel: Object;
  data: Data[];
  url = "http://localhost:8000/api/colevel/?date=2018-12-27";
  ppm = [];
  time = [];
  chart = [];
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    // this.getColevel();
    this.httpClient.get(this.url).subscribe((res: Data[]) => {
      res.forEach(y => {
        this.time.push(y.time);
        this.ppm.push(y.ppm);
      });
      this.chart = new Chart("canvas", {
        type: "bar",
        data: {
          labels: this.time,
          datasets: [
            {
              data: this.ppm,
              borderColor: "#3cba9f",
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [
              {
                display: true
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      });
    });
  }

  // public getColevel() {
  //   this.data.getColevel().subscribe(data => {
  //     this.colevel = data;

  //     //console.log(data);

  //     //get co level alone
  //     for (let colvl in data) {
  //       let colevel = data[colvl];
  //       console.log(colevel.date);
  //       console.log(colevel.ppm);
  //     }
  //   });
  // }
}
