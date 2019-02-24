import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AqmsService {
  private _aqmsURL = "http://128.199.248.62/api/aqms/latest";

  constructor(private http: HttpClient) {}

  getAqms() {
    return this.http.get(this._aqmsURL);
  }
}
