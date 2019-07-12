import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'resendEmail',
  templateUrl: './resendEmail.component.html',
  styleUrls: ['./resendEmail.component.css']
})
export class ResendEmailComponent implements OnInit {
  model: any = {};
  // model = {
  //   email: ''
  // };

  constructor(private authService: AuthService,
    private router: Router,
     private alertify: AlertifyService,
     @Inject(MAT_DIALOG_DATA) public passedData: any,
     ) { }
     userOutsideId = this.passedData.user.userOutsideId;
     email = this.passedData.user.emailAddress;

  ngOnInit() {
    console.log(this.userOutsideId);
    console.log(this.email);
    this.email;
    // this.model.email = this.userEmail;
  }


resendConfirmationEmail() {
  return this.authService.resendEmail(this.email).subscribe(
    data => {
      this.alertify.success('Email confirmation resent');
      // this.router.navigate(['/users']);
    },
    error => {
      this.alertify.error('Something is not quite right');
    }
  );
}

}
