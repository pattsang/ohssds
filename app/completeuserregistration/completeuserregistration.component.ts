import { Component, OnInit } from '@angular/core';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { IdentityUser } from '../_models/identityUser';

@Component({
  selector: 'completeuserregistration',
  templateUrl: './completeuserregistration.component.html',
  styleUrls: ['./completeuserregistration.component.css']
})
export class CompleteuserregistrationComponent implements OnInit {

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute) { }

    hide = true;
    password;
    confirmPassword;
//user: IdentityUser;
    // user1 = {
    //   userId: null,
    //   emailAddress: '',
    //     firstName: '',
    //     lastName: '',
    //     userType: '',
    //     addressLine1: '',
    //     addressLine2: '',
    //     country: '',
    //     city: '',
    //     state: '',
    //     createdOn: null,
    //     faxNumber: '',
    //     phoneNumber: '',
    //     postalCode: '',
    // };
    
    identityUser: IdentityUser = {
      email: '',
    };
    
    user = {
      userOutsideId: '',
      password: ''
    };

  ngOnInit() {
    this.loadUser();
    this.route.data.subscribe(data => {
    //  this.user = this.user1;
     // this.user.firstName = 'test';
     console.log(this.route.snapshot.params['id']);
     let userOutsideId = this.route.snapshot.params['id'] ;

    //   console.log('ngOnnit ' + data);
    //  console.log('this is coming from ngOnit' + ',' + this.user);
   });
  }

  loadUser() {
    this.userService.getIdentityUser(this.route.snapshot.params['id']).subscribe((user: IdentityUser) => {
      this.identityUser = user;
      console.log(this.user);
      
      //console.log('This is getting from loadUser => ' + this.user);
    },
    error => {
      this.alertify.error(error);
    });
  }

  completeRegistration(){
    if (this.password === this.confirmPassword) {
      this.user.userOutsideId = this.route.snapshot.params['id'];
      this.user.password = this.password;

        return this.userService.updateIdentityPassword(this.user).subscribe(next => {
      
          this.alertify.success('Your profile has been successfully created');
          this.router.navigate(['/login']);
          // this.editForm.reset(this.user);
        }, error => {
          this.alertify.error(error);
        });
      } else { 
        this.alertify.error('Passwords do not match');
      }
  }

}
