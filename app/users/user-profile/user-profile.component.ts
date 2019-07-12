import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_service/user.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentityUser } from 'src/app/_models/identityUser';
import { MAT_DIALOG_DATA } from '@angular/material';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  model: any = {};
  hide = true;
  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public passedData: any) { }

    confirmPassword;
    password;

    userOutsideId = this.passedData.user;

    user = {
      userOutsideId: '',
      password: ''
    };
    // user: IdentityUser = {
    //   // id: '',
    //   userOutsideId: '',
    //   // userName: '',
    //   email: '',
    //   // emailConfirmed: '',
    //   // firstName: '',
    //   // lastName: '',
    //   // passwordHash: '',
    //   // normalizedUserName: '',
    //   // securityStamp: '',
    //   // concurrencyStamp: '',
    //   // phoneNumber: null,
    //   // phoneNumberConfirmed: null,
    //   // twoFactorEnabled: null,
    //   // lockoutEnd: null,
    //   // lockoutEnabled: null,
    //   // accessFailedCount: null
    // };

    sdsUser = {
      emailAddress: '',
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        city: '',
        province: '',
        faxNumber: '',
        phoneNumber: '',
        postalCode: '',
        userOutsideId: ''
    };
    

  ngOnInit() {
   // this.loadIdentityUser();
    this.loadSDSUser();
  //   this.route.data.subscribe(data => {
  //    this.user.firstName = 'test';
  //    // console.log(this.route.snapshot.params['id']);
  //    let userOutsideId = this.route.snapshot.params['id'] ;
  //  });
  }

  // loadIdentityUser() {
  //   this.userService.getIdentityUser(this.userOutsideId).subscribe((user: IdentityUser) => {
  //     this.user = user;
  //   },
  //   error => {
  //     this.alertify.error(error);
  //   });
  // }

  loadSDSUser() {
    this.userService.getUser(this.userOutsideId).subscribe((user: User) => {
      this.sdsUser = user;
    },
    error => {
      this.alertify.error(error);
    });
  }

  UpdatePassword() {
      if (this.password === this.confirmPassword) {
        this.user.userOutsideId = this.userOutsideId;
        this.user.password = this.password;

        return this.userService.updateIdentityPassword(this.user).subscribe(next => {

          this.alertify.success('Your password has been changed');
          // this.router.navigate(['/app-product']);
          // this.editForm.reset(this.user);
        }, error => {
          this.alertify.error(error);
        });
      } else {
        this.alertify.error('Passwords do not match');
      }
  }

  updateSDSUser() {
    // console.log(this.editForm);
    this.userService.updateUserInfo(this.userOutsideId, this.sdsUser).subscribe(next => {
      this.alertify.success('User profile updated successfully');
    }, error => {
      this.alertify.error(error);
    }
    );

  }

}
