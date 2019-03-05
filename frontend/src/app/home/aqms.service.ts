import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AqmsService {
  private _aqmsURL = "http://localhost:8000/api/aqms/latest";

  constructor(private http: HttpClient) {}

  getAqms() {
    return this.http.get(this._aqmsURL);
  }
}
