import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  readonly endpoint = environment.urlEvent + "user";
  readonly user: string = "Project";
  readonly token: string = "project_token"
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(`${this.endpoint}/login`, model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem(this.token, user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(`${this.endpoint}/register`, model);
  }

  loggedIn() {
    const token = localStorage.getItem(this.token);
    return !this.jwtHelper.isTokenExpired(token);
  }

  getDecodedToken() {
    let token = localStorage.getItem(this.token);
    this.decodedToken = this.jwtHelper.decodeToken(token);
    return this.decodedToken;
  }

  userloggedIn() {
    let userloggedIn = this.getDecodedToken();
    let name = userloggedIn.unique_name;
    return name;
  }

  logout(){
    localStorage.removeItem(this.token);
  }
}
