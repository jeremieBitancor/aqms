import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { ChartpageComponent } from "./chartpage/chartpage.component";

import { AqmsService } from "./home/aqms.service";
import { WeatherComponent } from "./weather/weather.component";
import { WeatherService } from "./weather/weather.service";
import { ColevelChartComponent } from "./colevel-chart/colevel-chart.component";
import { DailyChartComponent } from "./daily-chart/daily-chart.component";
import { WeeklyChartComponent } from "./weekly-chart/weekly-chart.component";
import { MonthlyChartComponent } from "./monthly-chart/monthly-chart.component";
import { DailyService } from "./daily-chart/daily.service";
import { ChartsModule } from "ng2-charts";
import { WeeklyService } from "./weekly-chart/weekly.service";
import { MonthlyService } from "./monthly-chart/monthly.service";
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ChartpageComponent,
    WeatherComponent,
    ColevelChartComponent,
    DailyChartComponent,
    WeeklyChartComponent,
    MonthlyChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HttpModule,
    ChartsModule
  ],
  providers: [
    AqmsService,
    WeatherService,
    DailyService,
    WeeklyService,
    MonthlyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
