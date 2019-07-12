import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductAliasComponent } from './productalias.component';
import {NavComponent} from './nav/nav.component';
import { ProductComponent } from './product/product.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { HeaderComponent } from './navigation/header/header.component';
import {JwtHelperService} from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './_service/auth.service';
import { AlertifyService } from './_service/alertify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  title = 'SDS PHSA';
  openSidenav = false;

  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      // this.alertify.warning('Already logged in');
    }
    // if (!token) {
    //   this.windowsAuthLogin();
    // }
  }

  logout() {
    this.authService.logout();
    this.alertify.message('Logged out Successfully');
    this.router.navigate(['/search']);
    // console.log('Logged out successfully');
  }

  
 windowsAuthResponse: any;

 windowsAuthLogin() {
   return this.authService.windowsAuthentication().subscribe(
     res => {
       this.windowsAuthResponse = res;

       this.alertify.success('Logged in successfully');
       this.router.navigate(['/search']);
     }
    // },
    //  error => {
    //    this.alertify.error('Failed to login');
    //  }
   );
 }


}
