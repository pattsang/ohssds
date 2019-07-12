import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_service/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AlertifyService } from "../_service/alertify.service";
import { IdentityUser } from '../_models/identityUser';
import { UserService } from '../_service/user.service';

@Component({
  selector: "resetPassword",
  templateUrl: "./resetPassword.component.html",
  styleUrls: ["./resetPassword.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  hide = true;
  model: any = {};
  code;
  //confirmPassword: any;

  // user: IdentityUser = {
  //   id: '',
  //   userOutsideId: '',
  //   userName: '',
  //   email: '',
  //   emailConfirmed: '',
  //   firstName: '',
  //   lastName: '',
  //   passwordHash: '',
  //   normalizedUserName: '',
  //   securityStamp: '',
  //   concurrencyStamp: '',
  //   phoneNumber: null,
  //   phoneNumberConfirmed: null,
  //   twoFactorEnabled: null,
  //   lockoutEnd: null,
  //   lockoutEnabled: null,
  //   accessFailedCount: null
  // };
  

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
  //   this.loadUser();
  //   this.route.data.subscribe(data => {
  //   //  this.user = this.user1;
  //    this.user.firstName = 'test';
  //    console.log(this.route.snapshot.params['id']);
  //    let userOutsideId = this.route.snapshot.params['id'] ;
  //  });
  }

  resetPassword() {
    console.log(this.model.email + ',' + this.model.password + ',' + this.model.confirmPassword)

   if(this.model.password == this.model.confirmPassword) { 

      console.log(this.model)
    return this.authService.resetPassword(this.model).subscribe(
      data => {
        this.alertify.success('Password reset was successful');
        this.router.navigate(['/login']);
      },
      error => {
        this.alertify.error('Something went wrong!');
      }
    );
 }
  else {
    this.alertify.error("Passwords do not match");
  }
}

// loadUser() {
//   this.userService.getIdentityUser(this.route.snapshot.params['id']).subscribe((user: IdentityUser) => {
//     this.user = user;
//     console.log(this.user);
    
//     //console.log('This is getting from loadUser => ' + this.user);
//   },
//   error => {
//     this.alertify.error(error);
//   });
// }


}
