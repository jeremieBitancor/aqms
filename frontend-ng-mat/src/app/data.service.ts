import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ThrowStmt } from "@angular/compiler";

@Injectable({
  providedIn: "root"
})
export class DataService {
  // API_URL = "http://localhost:8000";
  constructor(private http: HttpClient) {}

  getColevel() {
    return this.http.get("http://localhost:8000/api/colevel/?date=2018-12-27");
    //return this.http.get("https://jsonplaceholder.typicode.com/posts");
  }
}
