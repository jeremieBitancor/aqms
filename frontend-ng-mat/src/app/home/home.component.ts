import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { HttpClient } from "@angular/common/http";
import { Data } from "./Data";
import { Chart } from "chart.js";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  colevel: Object;
  // data: Data[];
  url = "http://localhost:8000/api/colevel/average";
  ave_ppm = [];
  hour = [];
  chart = [];
  constructor(private httpClient: HttpClient) {}
  // constructor(private Data: DataService) {}

  ngOnInit() {
    // this.getColevel();
    this.httpClient.get(this.url).subscribe((rs: Data[]) => {
      rs.forEach(y => {
        this.hour.push(y.hour);
        this.ave_ppm.push(y.ave_ppm);
      });
      this.chart = new Chart("canvas", {
        type: "line",
        data: {
          labels: this.hour,
          datasets: [
            {
              data: this.ave_ppm,
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
                distribution: "linear"
                // display: true
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
