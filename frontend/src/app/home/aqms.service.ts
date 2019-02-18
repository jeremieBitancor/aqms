import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { IAqms } from "./aqms";
import { IColevel } from "./aqms";

@Injectable()
export class AqmsService {
  private _aqmsURL = "http://localhost:8000/api/aqms/latest";

  private _colevelURL = "http://localhost:8000/api/aqms/latest/colevel";

  constructor(private http: HttpClient) {}
  getAqms(): Observable<IAqms[]> {
    return this.http.get<IAqms[]>(this._aqmsURL);
  }
  getColevel(): Observable<IColevel[]> {
    return this.http.get<IColevel[]>(this._colevelURL);
  }
}
