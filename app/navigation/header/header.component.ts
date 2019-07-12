import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertifyService } from '../../_service/alertify.service';
import { LoginComponent } from 'src/app/login/login.component';
import { MatDialog } from '@angular/material';
import { UserProfileComponent } from 'src/app/users/user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(
    private http: HttpClient,
    public authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedInWindowsUser() {
    return this.authService.loggedInWindowsUser();
  }

  isWindowsUser() {
    if (this.authService.decodedToken.actort === 'True') {
      return true;
    }
    if (this.authService.decodedToken.actort === 'False') {
      return false;
    }
  }

  isLoggedInUser() {
    if (this.authService.decodedToken.primarysid === 'True') {
      return true;
    }
  }

  logout() {
    this.authService.logout();
    this.alertify.message('Logged out Successfully');
    this.router.navigate(['/search']);
  }

  openUserProfileModalWindow(id) {
    const dialogRef = this.dialog.open(UserProfileComponent, {
      width: '500px',
      data: {
        user: id
      }
    });
  }

  openLoginModalWindow() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px'
    });
  }
}
