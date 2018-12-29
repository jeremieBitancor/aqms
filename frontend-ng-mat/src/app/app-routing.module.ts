import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ColevelComponent } from "./colevel/colevel.component";
import { PowerComponent } from "./power/power.component";
import { WindspeedComponent } from "./windspeed/windspeed.component";

const routes: Routes = [
  { path: "colevel", component: ColevelComponent },
  { path: "power", component: PowerComponent },
  { path: "windspeed", component: WindspeedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
