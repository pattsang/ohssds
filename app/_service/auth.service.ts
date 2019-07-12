import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //baseUrl = environment.apiUrl;
   baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  userToken: any;
  private httpHeaders: HttpHeaders;

  constructor(private http: HttpClient, private userService: UserService, private router: Router) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      withCredentials: 'true',
      // 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')),
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json'
    });
  }

  login(email: string, password: string) {
    return this.http
      .post(this.baseUrl + 'account/login', { email, password })
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        })
      );
  }

  roleFromToken(allowedRoles): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    // returns a bool
    return !this.jwtHelper.isTokenExpired(token);
  }

  loggedInWindowsUser() {
    const token = localStorage.getItem('token');

    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/search']);
  }

  forgotPassword(model: any) {
    return this.http.post(this.baseUrl + 'account/forgotPassword', model);
  }

  resetPassword(model: any) {
    return this.http.post(this.baseUrl + 'account/resetPassword', model);
  }

  resendEmail(email: string) {
    console.log(email);
    return this.http.post(this.baseUrl + `account/ResendEmail/${email}`, email);
  }

  windowsAuthentication() {
    return this.http
      .post(this.baseUrl + 'account/windowsAuthentication', {
        headers: this.httpHeaders
      })
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        })
      );
  }
}
