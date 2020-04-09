import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SnackbarService } from "src/app/services/snackbar.service";
import { AuthService } from "src/app/services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login-user",
  templateUrl: "./login-user.component.html",
  styleUrls: ["./login-user.component.css"],
})
export class LoginUserComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  model: any = {};
  subscription: Subscription;
  hide = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.validationFormLogin();
  }

  checkHide() {
    this.hide = !this.hide;
  }


  validationFormLogin() {
    this.loginForm = this.formBuilder.group({
      userName: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    this.model = Object.assign(this.loginForm.value);
    this.authService.login(this.model).subscribe(
      (user) => {
        this.router.navigate(["/app/home"]);
        this.snackbarService.message("Bem vindo!");
      },
      (error) => {
        this.snackbarService.message(
          `Falha ao tentar logar. Erro: ${error.message}`
        );
        console.log(error.message);
      }
    );
  }
}
