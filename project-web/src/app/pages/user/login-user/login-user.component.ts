import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
  formLogin: FormGroup;
  loading: boolean = false;


  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validationFormLogin();
  }

  validationFormLogin(){
    this.formLogin = this.formBuilder.group({
      login: ['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }

  login(): void {
  }

}
