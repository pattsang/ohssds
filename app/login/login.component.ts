import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material';

@Component({
  selector: "login",
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  model: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigateByUrl('/search');
    }
  }

  login() {
    this.authService.login(this.model.email, this.model.password).subscribe(
      next => {
        this.router.navigate(['/search']);
        this.alertify.success('Logged in successfully');
        this.dialog.closeAll();
      },
      error => {
        // if (error.status === 400) {
        //   this.alertify.error('Incorrect username or password');
        // }
        this.alertify.error('Incorrect username or password');
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  loggedInWindowsUser() {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
