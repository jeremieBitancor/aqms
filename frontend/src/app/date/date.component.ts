import { Component, OnInit } from "@angular/core";
import { Validators, FormControl } from "@angular/forms";
import { formatDate } from "@angular/common";
import { AqmsService } from "../aqms.service";
import * as moment from "moment";

@Component({
  selector: "app-date",
  templateUrl: "./date.component.html",
  styleUrls: ["./date.component.scss"]
})
export class DateComponent implements OnInit {
  dateCtrl: FormControl;
  date = new FormControl(new Date());
  dateData = moment().format("MM DD YYYY");

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    this.dateCtrl = new FormControl("", [Validators.required]);
    let date = moment().format("MM DD YYYY");
    // console.log(date);

    this.date.valueChanges.subscribe(data => {
      this.dateData = data;
      let year = formatDate(this.dateData, "yyyy", "en").replace(/^0+/, "");
      let month = formatDate(this.dateData, "MM", "en").replace(/^0+/, "");
      let day = formatDate(this.dateData, "dd", "en").replace(/^0+/, "");
      // console.log(formatDate(this.dateData, "MM dd yyyy", "en"));

      // this._aqmsService.date(month, day, year);
    });

    // console.log(this.year, this.month, this.day);
    // this._aqmsService.date(this.date.value);
  }
}
