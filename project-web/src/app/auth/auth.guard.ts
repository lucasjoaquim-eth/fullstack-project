import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { SnackbarService } from "../services/snackbar.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private snackbarService: SnackbarService
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("project_token") != null) {
      return true;
    } else {
      this.router.navigate(["/user/login"]);
      this.snackbarService.message("Preencha seu usuário e senha");
      return false;
    }
  }
}
