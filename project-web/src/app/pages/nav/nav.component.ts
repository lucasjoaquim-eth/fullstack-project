import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/services/snackbar.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  name: string = "";

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userloggedIn();
  }

  userloggedIn(){
    this.name = this.authService.userloggedIn();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  login() {
    this.router.navigate(["/user/login"]);
    this.snackbarService.message("Preencha seu usuário e senha");
  }

  logout() {
    this.authService.logout();
    this.snackbarService.message("Sessão encerrada.");
    this.router.navigate(["/user/login"]);
  }
}
