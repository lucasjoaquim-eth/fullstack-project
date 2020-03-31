import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-register-user",
  templateUrl: "./register-user.component.html",
  styleUrls: ["./register-user.component.css"]
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  hide = false;

  fullName: string;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar
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
    console.log("Cadastrar usuário");
  }
}

// import { ErrorStateMatcher } from "@angular/material/core";

/** Error when the parent is invalid */
// class CrossFieldErrorMatcher implements ErrorStateMatcher {
//   isErrorState(
//     control: FormControl | null,
//     form: FormGroupDirective | NgForm | null
//   ): boolean {
//     return control.dirty && form.invalid;
//   }
// }

// errorMatcher = new CrossFieldErrorMatcher();

// passwordValidator(form: FormGroup) {
//   console.log("passwordValidator");
//   const condition =
//     form.get("password").value !== form.get("verifyPassword").value;
//   return condition ? { passwordsDoNotMatch: true } : null;
// }
