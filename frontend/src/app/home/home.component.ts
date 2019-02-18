import { Component, OnInit } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { ConstantPool } from "@angular/compiler";

import { AqmsService } from "./aqms.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  public aqms = [];
  public colevel = [];

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    this.getAqms();
    this.getColevel();
  }

  getAqms() {
    this._aqmsService.getAqms().subscribe(data => {
      console.log(data);
      this.aqms = data;
    });
  }
  getColevel() {
    this._aqmsService.getColevel().subscribe(data => {
      console.log(data);
      this.colevel = data;
    });
  }
}
