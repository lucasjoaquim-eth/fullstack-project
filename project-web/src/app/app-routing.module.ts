import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListEventComponent } from "./pages/event/list-event/list-event.component";
import { RegisterEventComponent } from "./pages/event/register-event/register-event.component";
import { HomeComponent } from "./pages/home/home.component";
import { ListSpeakerComponent } from "./pages/speaker/list-speaker/list-speaker.component";
import { RegisterSpeakerComponent } from "./pages/speaker/register-speaker/register-speaker.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    data: { titulo: "Home" }
  },
  {
    path: "event",
    component: ListEventComponent,
    data: { titulo: "Event" }
  },
  {
    path: "event/register",
    component: RegisterEventComponent,
    data: { titulo: "Register" }
  },
  {
    path: "event/register/:id/edit",
    component: RegisterEventComponent,
    data: { titulo: "Edit" }
  },
  {
    path: "event/register/:id/delete",
    component: RegisterEventComponent,
    data: { titulo: "Delete" }
  },
  {
    path: "speaker",
    component: ListSpeakerComponent,
    data: { titulo: "Speaker" }
  },
  {
    path: "speaker/register",
    component: RegisterSpeakerComponent,
    data: { titulo: "Register" }
  },
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "**",
    redirectTo: "/home",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
