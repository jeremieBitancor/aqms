import { Component, OnInit } from "@angular/core";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { DataService } from "../data.service";

@Component({
  selector: "app-colevel",
  templateUrl: "./colevel.component.html",
  styleUrls: ["./colevel.component.scss"]
})
export class ColevelComponent implements OnInit {
  colevel: Object;
  events: string[] = [];

  constructor(private data: DataService) {}

  ngOnInit() {
    this.getColevel();
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    console.log(this.events);
  }

  public getColevel() {
    this.data.getColevel().subscribe(data => {
      this.colevel = data;
    });
  }
}
