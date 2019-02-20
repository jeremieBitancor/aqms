import { Component, OnInit, Input } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { ConstantPool } from "@angular/compiler";

import { AqmsService } from "./aqms.service";
import { typeWithParameters } from "@angular/compiler/src/render3/util";
import { Observable } from "rxjs";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import { IAqms } from "./aqms";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  // public aqms = [];
  // public colevel = [];

  @Input() aqms$: Observable<any>;

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    // this.getAqms();
    // this.getColevel();
    this.getAqms();
  }

  // getAqms() {
  //   this._aqmsService.getAqms().subscribe(data => {
  //     console.log(data);
  //     this.aqms = data;
  //   });
  // }
  // getColevel() {
  //   this._aqmsService.getColevel().subscribe(data => {
  //     console.log(data);
  //     this.colevel = data;
  //   });
  // }

  getAqms() {
    this.aqms$ = Observable.interval(1000)
      .startWith(0)
      .switchMap(() => this._aqmsService.getAqms());
  }
}
