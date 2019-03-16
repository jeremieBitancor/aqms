import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ChartpageComponent } from "./chartpage/chartpage.component";
import { DailyChartComponent } from "./daily-chart/daily-chart.component";
import { WeeklyChartComponent } from "./weekly-chart/weekly-chart.component";
import { MonthlyChartComponent } from "./monthly-chart/monthly-chart.component";
import { ColevelChartComponent } from "./colevel-chart/colevel-chart.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "chart",
    component: ChartpageComponent,
    children: [
      { path: "colevel", component: ColevelChartComponent },
      { path: "windspeed", component: WeeklyChartComponent },
      { path: "power", component: MonthlyChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
