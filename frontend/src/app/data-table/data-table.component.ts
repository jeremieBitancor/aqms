import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import * as moment from "moment";
import { formatDate } from "@angular/common";
import { AqmsService } from "../aqms.service";

export interface Oras {
  value: number;
  viewValue: number;
}

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.scss"]
})
export class DataTableComponent implements OnInit {
  aqms$ = [];
  date = new FormControl(new Date());
  // dateData = new FormControl(moment().format("YYYY-MM-DD"));

  hour = new FormControl(new Date().getHours());
  displayedColumns: string[] = [
    "date",
    "time",
    "ppm",
    "windspeed",
    "piezo watt",
    "piezo voltage",
    "piezo amperage",
    "turbine watt",
    "turbine voltage",
    "turbine amperage"
  ];

  oras: Oras[] = [
    { value: 0, viewValue: 0 },
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 },
    { value: 4, viewValue: 4 },
    { value: 5, viewValue: 5 },
    { value: 6, viewValue: 6 },
    { value: 7, viewValue: 7 },
    { value: 8, viewValue: 8 },
    { value: 9, viewValue: 9 },
    { value: 10, viewValue: 10 },
    { value: 11, viewValue: 11 },
    { value: 12, viewValue: 12 },
    { value: 13, viewValue: 13 },
    { value: 14, viewValue: 14 },
    { value: 15, viewValue: 15 },
    { value: 16, viewValue: 16 },
    { value: 17, viewValue: 17 },
    { value: 18, viewValue: 18 },
    { value: 19, viewValue: 19 },
    { value: 20, viewValue: 20 },
    { value: 21, viewValue: 21 },
    { value: 22, viewValue: 22 },
    { value: 23, viewValue: 23 }
  ];
  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {}

  getData() {
    let date = formatDate(this.date.value, "yyyy-MM-dd", "en");
    let hour = this.hour.value;
    this.getAqmsList(date, hour);
  }
  getAqmsList(date, hour) {
    this._aqmsService.getAqmsList(date, hour).subscribe(data => {
      this.aqms$ = data;
    });
  }
}
