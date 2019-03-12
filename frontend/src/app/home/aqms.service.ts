import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class AqmsService {
  // private _aqmsURL = "http://128.199.248.62/api/aqms/latest";
  private _aqmsURL = "http://128.199.248.62/api/aqms/latest";

  constructor(private http: HttpClient) {}

  getAqms() {
    return this.http.get(this._aqmsURL);
  }
  // getAqms(): Observable<any> {
  //   return this.http.get<any>(this._aqmsURL);
  // }
}
