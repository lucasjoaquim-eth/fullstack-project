import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { iUser } from "src/app/models/user";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.css"]
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  hide = false;

  user: iUser;

  fullName: string;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validationRegisterForm();
  }

  checkHide() {
    this.hide = !this.hide;
  }

  validationRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: ["", Validators.required],
      fullName: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      passwords: this.formBuilder.group(
        {
          password: ["", [Validators.required, Validators.minLength(4)]],
          verifyPassword: ["", [Validators.required]]
        },
        { validators: this.passwordValidator }
      )
    });
  }

  passwordValidator(form: FormGroup) {
    const verifyPassword = form.get("verifyPassword");
    const password = form.get("password");

    if (
      verifyPassword.errors == null ||
      "passwordsDoNotMatch" in verifyPassword.errors
    ) {
      if (password.value !== verifyPassword.value) {
        verifyPassword.setErrors({ passwordsDoNotMatch: true });
      } else {
        verifyPassword.setErrors(null);
      }
    }
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.user = Object.assign(this.registerForm.value, {
        password: this.registerForm.get("passwords.password").value
      });
    }
    this.authService.register(this.user).subscribe(
      user => {
        this.router.navigate(['/user/login']);
        this.snackbarService.message("Cadastrado realizado");
      },
      error => {
        const erro = error.errors;
        erro.forEach(element => {
          switch(element.code){
            case 'DuplicateUserName':
              this.snackbarService.message("Cadastrado Duplicado");
              break;
            default:
              this.snackbarService.message(`Erro no cadastro. Code: ${element.code}`);
              break;
          }
        });
      }
    );
  }
}
