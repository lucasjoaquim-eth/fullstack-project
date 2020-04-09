import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListEventComponent } from "./pages/event/list-event/list-event.component";
import { HomeComponent } from "./pages/home/home.component";
import { ListSpeakerComponent } from "./pages/speaker/list-speaker/list-speaker.component";
import { RegisterSpeakerComponent } from "./pages/speaker/register-speaker/register-speaker.component";
import { UserComponent } from "./pages/user/user.component";
import { LoginUserComponent } from "./pages/user/login-user/login-user.component";
import { RegisterUserComponent } from "./pages/user/register-user/register-user.component";
import { AuthGuard } from "./auth/auth.guard";
import { NavComponent } from "./pages/nav/nav.component";
import { EditEventComponent } from './pages/event/edit-event/edit-event.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "app/home",
    pathMatch: "full",
  },
  {
    path: "user",
    component: UserComponent,
    children: [
      {
        path: "login",
        component: LoginUserComponent,
      },
      {
        path: "register",
        component: RegisterUserComponent,
      },
    ],
  },
  {
    path: "app",
    component: NavComponent,
    canActivate: [AuthGuard],
    data: { titulo: "App" },
    children: [
      {
        path: "home",
        component: HomeComponent,
        data: { titulo: "Home" },
      },
      {
        path: "event",
        data: { titulo: "Event" },
        children: [
          {
            path: "list",
            component: ListEventComponent,
            data: { titulo: "List" },
          },
          {
            path: ":id/edit",
            component: EditEventComponent,
            data: { titulo: "Edit" },
          },
        ],
      },
      {
        path: "speaker",
        component: ListSpeakerComponent,
        data: { titulo: "Speaker" },
      },
      {
        path: "speaker/register",
        component: RegisterSpeakerComponent,
        data: { titulo: "Register" },
      },
    ],
  },
  {
    path: "**",
    redirectTo: "app/home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
