import { Component, OnInit } from "@angular/core";

import { Option } from "./option";

@Component({
  selector: "app-chartpage",
  templateUrl: "./chartpage.component.html",
  styleUrls: ["./chartpage.component.scss"]
})
export class ChartpageComponent implements OnInit {
  option: Option[];

  constructor() {}

  ngOnInit() {
    this.option = [
      { id: 1, name: "24 hours", link: "hourly-chart" },
      { id: 2, name: "7 days", link: "" },
      { id: 3, name: "30 days", link: "" }
    ];
  }
}
