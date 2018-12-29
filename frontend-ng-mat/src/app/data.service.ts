import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class DataService {
  API_URL = "http://localhost:8000";
  constructor(private http: HttpClient) {}

  getColevel() {
    return this.http.get("http://localhost:8000/api/airquality/");
  }
}
