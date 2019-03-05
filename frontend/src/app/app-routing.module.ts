import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ChartpageComponent } from "./chartpage/chartpage.component";
import { DailyChartComponent } from "./daily-chart/daily-chart.component";
import { WeeklyChartComponent } from "./weekly-chart/weekly-chart.component";
import { MonthlyChartComponent } from "./monthly-chart/monthly-chart.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "chart",
    component: ChartpageComponent,
    children: [
      { path: "day", component: DailyChartComponent },
      { path: "week", component: WeeklyChartComponent },
      { path: "month", component: MonthlyChartComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
