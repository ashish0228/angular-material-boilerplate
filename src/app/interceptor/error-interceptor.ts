import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, catchError, map } from "rxjs";
import { AuthService } from "../auth/service/auth.service";

/**
 * Error Interceptor will check that if any error return in API call.
 * Also Bind token in header when we call API.
 */

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  userToken = localStorage.getItem('access-token');
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authData = localStorage.getItem('access-token')
    if (authData) {
      request = request.clone({
        setHeaders: {
          authorization: 'Bearer ' + `${authData}`
        }
      });
    }

    return next.handle(request)
      .pipe(map(event => event), catchError(error => {
        if (error.error.statusCode === 403) {
          // localStorage.clear();
          // this.router.navigate(['/login']);
          this.authService.logout(this.userToken);
        }
        if (error.error.statusCode === 401) {
          // localStorage.clear();
          // this.router.navigate(['/login']);
          this.authService.logout(this.userToken);
        }
        // localStorage.clear();
        throw error;
      }),
      );
  }
}
