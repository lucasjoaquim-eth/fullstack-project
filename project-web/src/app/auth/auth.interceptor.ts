import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/internal/operators/tap";

@Injectable({ providedIn: "root" })
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem("project_token") != null) {
      const cloneRequest = request.clone({
        headers: request.headers.set(
          "Authorization",
          `Bearer ${localStorage.getItem("project_token")}`
        ),
      });
      return next.handle(cloneRequest).pipe(
        tap(
          (sucess) => {},
          (error) => {
            if (error.status == 401) {
              this.router.navigateByUrl("/user/login");
            }
          }
        )
      );
    } else {
      return next.handle(request.clone());
    }
  }
}
