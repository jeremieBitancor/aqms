import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ChartpageComponent } from "./chartpage/chartpage.component";
import { HourlyChartComponent } from "./hourly-chart/hourly-chart.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "chartpage", component: ChartpageComponent },
  { path: "hourly-chart", component: HourlyChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
