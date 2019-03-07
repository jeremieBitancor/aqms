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
  // @Input() aqms$: Observable<any>;
  public aqms$: any;

  constructor(private _aqmsService: AqmsService) {}

  ngOnInit() {
    this.getAqms();
  }

  getAqms() {
    this.aqms$ = Observable.interval(1000)
      .startWith(0)
      .switchMap(() => this._aqmsService.getAqms());

    console.log(this.aqms$.amp_wt);
  }

  // getAqms() {
  //   this._aqmsService.getAqms().subscribe(data => {
  //     this.aqms$ = data;
  //     console.log(this.aqms$);
  //   });
  // }
}
