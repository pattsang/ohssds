import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { UserService } from './user.service';

@Injectable({
  providedIn: "root"
})
export class ColabitAPIService {
  //baseUrl = "https://api.cloudsds.com/msdsdevapi/api/";
  //baseUrl = 'https://ohssdsdev.azurewebsites.net/api/v1/account/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  userToken: any;

  constructor(
    private http: HttpClient,
    private userService: UserService) {}

    // login(email, password) {
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ Email: email, Password: password })
    //     };
    //     return fetch(this.baseUrl + '/user/login', requestOptions)
    //         // .then(handleResponse, handleError)
    //         .then(res => {
    //             // login successful if there's a jwt token in the response
    //             if (res) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('user', JSON.stringify(res));
    //             }

    //             return res;
    //         })
    //         .shareReplay();
    // }

    // login(email:string, password:string ) {
    //     return this.http.post<User>('/api/login', {email, password})
    //         // this is just the HTTP call, 
    //         // we still need to handle the reception of the token
    //         .shareReplay();
    // }

}
