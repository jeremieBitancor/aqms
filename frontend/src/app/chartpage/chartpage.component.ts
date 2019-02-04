import { Component, OnInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-chartpage",
  templateUrl: "./chartpage.component.html",
  styleUrls: ["./chartpage.component.scss"]
})
export class ChartpageComponent implements OnInit {
  chart: Chart;
  chart2: Chart;
  name = "Angular 7 chartjs";

  constructor() {}

  ngOnInit() {
    this.coLevel();
    this.windspeed();
    this.power();
  }

  coLevel() {
    this.chart = new Chart("colevelCanvas", {
      type: "line",
      data: {
        labels: colevel.map(x => x.id),
        datasets: [
          {
            label: "CO Level",
            data: colevel.map(x => x.value),
            backgroundColor: "#FFE0B2"
          }
        ]
      }
    });
  }

  windspeed() {
    this.chart = new Chart("windspeedCanvas", {
      type: "line",
      data: {
        labels: windspeed.map(x => x.id),
        datasets: [
          {
            label: "Windspeed",
            data: windspeed.map(x => x.value),
            backgroundColor: "#B2EBF2"
          }
        ]
      }
    });
  }

  power() {
    this.chart = new Chart("powerCanvas", {
      type: "line",
      data: {
        labels: windspeed.map(x => x.id),
        datasets: [
          {
            label: "Power",
            data: windspeed.map(x => x.value),
            backgroundColor: "#CCFF90"
          }
        ]
      }
    });
  }
}

var colevel = [
  {
    id: 1,
    value: 3
  },
  {
    id: 2,
    value: 5
  },
  {
    id: 3,
    value: 8
  },
  {
    id: 4,
    value: 37
  },
  {
    id: 5,
    value: 3
  },
  {
    id: 6,
    value: 5
  },
  {
    id: 7,
    value: 8
  },
  {
    id: 8,
    value: 37
  },
  {
    id: 9,
    value: 3
  },
  {
    id: 10,
    value: 5
  },
  {
    id: 11,
    value: 8
  },
  {
    id: 12,
    value: 37
  },
  {
    id: 13,
    value: 3
  },
  {
    id: 14,
    value: 5
  },
  {
    id: 15,
    value: 8
  },
  {
    id: 16,
    value: 37
  },
  {
    id: 17,
    value: 3
  },
  {
    id: 18,
    value: 5
  },
  {
    id: 19,
    value: 8
  },
  {
    id: 20,
    value: 37
  },
  {
    id: 21,
    value: 3
  },
  {
    id: 22,
    value: 5
  },
  {
    id: 23,
    value: 8
  },
  {
    id: 24,
    value: 37
  }
];

var windspeed = [
  {
    id: 1,
    value: 3
  },
  {
    id: 2,
    value: 5
  },
  {
    id: 3,
    value: 8
  },
  {
    id: 4,
    value: 37
  },
  {
    id: 5,
    value: 3
  },
  {
    id: 6,
    value: 5
  },
  {
    id: 7,
    value: 8
  },
  {
    id: 8,
    value: 37
  },
  {
    id: 9,
    value: 3
  },
  {
    id: 10,
    value: 5
  },
  {
    id: 11,
    value: 8
  },
  {
    id: 12,
    value: 37
  },
  {
    id: 13,
    value: 3
  },
  {
    id: 14,
    value: 5
  },
  {
    id: 15,
    value: 8
  },
  {
    id: 16,
    value: 37
  },
  {
    id: 17,
    value: 3
  },
  {
    id: 18,
    value: 5
  },
  {
    id: 19,
    value: 8
  },
  {
    id: 20,
    value: 37
  },
  {
    id: 21,
    value: 3
  },
  {
    id: 22,
    value: 5
  },
  {
    id: 23,
    value: 8
  },
  {
    id: 24,
    value: 37
  }
];
