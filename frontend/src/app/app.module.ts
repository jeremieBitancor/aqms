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

import { AqmsService } from "./aqms.service";
import { WeatherComponent } from "./weather/weather.component";
import { ColevelChartComponent } from "./colevel-chart/colevel-chart.component";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatNativeDateModule } from "@angular/material";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSelectModule } from "@angular/material/select";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DateComponent } from "./date/date.component";
import { WindspeedChartComponent } from "./windspeed-chart/windspeed-chart.component";
import { PowerChartComponent } from "./power-chart/power-chart.component";
import { DataTableComponent } from "./data-table/data-table.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ChartpageComponent,
    WeatherComponent,
    ColevelChartComponent,

    DateComponent,
    WindspeedChartComponent,
    PowerChartComponent,
    DataTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AqmsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
