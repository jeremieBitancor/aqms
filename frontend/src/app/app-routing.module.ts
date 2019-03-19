import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ChartpageComponent } from "./chartpage/chartpage.component";
import { MonthlyChartComponent } from "./monthly-chart/monthly-chart.component";
import { ColevelChartComponent } from "./colevel-chart/colevel-chart.component";
import { WindspeedChartComponent } from "./windspeed-chart/windspeed-chart.component";
import { PowerChartComponent } from "./power-chart/power-chart.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "chart",
    component: ChartpageComponent,
    children: [
      { path: "colevel", component: ColevelChartComponent },
      { path: "windspeed", component: WindspeedChartComponent },
      { path: "power", component: PowerChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
