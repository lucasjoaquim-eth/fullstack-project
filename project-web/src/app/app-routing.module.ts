import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListEventComponent } from "./pages/event/list-event/list-event.component";
import { RegisterEventComponent } from "./pages/event/register-event/register-event.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/event",
    pathMatch: "full"
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
