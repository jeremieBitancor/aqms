import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { ConstantPool } from "@angular/compiler";

// import { ApiService } from "./api.service";
// import { LatestAqms } from "./latestAqms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {
  // private aqmsLatestUrl = "http://localhost:8000/api/aqms/latest";
  // private colevelLatestUrl = "http://localhost:8000/api/aqms/latest/colevel";
  // aqmsData: any = {};
  // colevelData: any = {};

  _latestAqms: LatestAqms[];

  constructor(private apiService: ApiService) {}

  getLatestAqms(): void {
    this.apiService
      .getLatestAqmsData()
      .subscribe(
        resultArray => (this._latestAqms = resultArray),
        error => console.log("Error ::" + error)
      );
  }

  ngOnInit() {
    // this.getAqmsData();
    // this.getAqms();
    // this.getColevelData();
    // this.getColevel();
    this.getLatestAqms();
  }

  // getAqmsData() {
  //   return this.http.get(this.aqmsLatestUrl).map((res: Response) => res.json());
  // }

  // getColevelData() {
  //   return this.http
  //     .get(this.colevelLatestUrl)
  //     .map((res: Response) => res.json());
  // }

  // getAqms() {
  //   this.getAqmsData().subscribe(aqmsData => {
  //     console.log(aqmsData);
  //     this.aqmsData = aqmsData;
  //   });
  // }

  // getColevel() {
  //   this.getColevelData().subscribe(colevelData => {
  //     console.log(colevelData);
  //     this.colevelData = colevelData;
  //   });
  // }
}
