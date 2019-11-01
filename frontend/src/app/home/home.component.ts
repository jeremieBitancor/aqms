import { Component, OnInit, Input } from "@angular/core";
import "rxjs/add/operator/map";

import { AqmsService } from "../aqms.service";
import { Observable } from "rxjs";
import "rxjs/add/observable/interval";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import { delay, share } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  // @Input() aqms$: Observable<any>;
  public aqms$: any;

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    this.getAqms();
  }

  getAqms() {
    this.aqms$ = Observable.interval(8000)
      .startWith(0)
      .switchMap(() => this._aqmsService.getAqms());
  }

  // getAqms() {
  //   // this._aqmsService.getAqms().subscribe(data => {
  //   //   this.aqms$ = data;
  //   //   console.log(this.aqms$[0]);
  //   // });
  //   this.aqms$ = this._aqmsService.getAqms().pipe(share());
  //   // console.log(this.aqms$);
  // }
}
