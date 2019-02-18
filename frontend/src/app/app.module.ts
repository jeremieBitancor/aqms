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
import { HourlyChartComponent } from "./hourly-chart/hourly-chart.component";

import { AqmsService } from "./home/aqms.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ChartpageComponent,
    HourlyChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [AqmsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
