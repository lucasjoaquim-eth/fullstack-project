import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListEventComponent } from "./pages/event/list-event/list-event.component";
import { RegisterEventComponent } from "./pages/event/register-event/register-event.component";

const routes: Routes = [
  {
    path: "event/list",
    component: ListEventComponent,
    data: { titulo: "Listar" }
  },
  {
    path: "event/register",
    component: RegisterEventComponent,
    data: { titulo: "Cadastrar" }
  },
  {
    path: "",
    component: ListEventComponent,
    data: { titulo: "Listar" }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
