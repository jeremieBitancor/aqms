import { Component, OnInit, Input } from "@angular/core";
import "rxjs/add/operator/map";

import { AqmsService } from "./aqms.service";
import { Observable } from "rxjs";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @Input() aqms$: Observable<any>;

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    this.getAqms();
  }

  getAqms() {
    this.aqms$ = Observable.interval(1000)
      .startWith(0)
      .switchMap(() => this._aqmsService.getAqms());
  }
}
