import { Component, OnInit, ViewChild, HostListener, Inject } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_service/user.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent implements OnInit {

// @ViewChild('editForm') editForm: NgForm;

// public user: User;
user1 = {
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

user = {
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



// @HostListener('window:beforeunload', ['$event'])

// unloadNotification($event: any) {
//   if(this.editForm.dirty)
//   {
//     $event.returnValue = true;
//   }
// }


  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    ) { }

    firstName = this.passedData.user.firstName;

    userOutsideId = this.passedData.user.userOutsideId;


  ngOnInit() {
    this.loadUser();
    this.route.data.subscribe(data => {
     const userOutsideId = this.route.snapshot.params['id'] ;
    });
  }

  updateUser() {
    // console.log(this.editForm);
    this.userService.updateUserInfo(this.userOutsideId, this.user).subscribe(next => {
      this.alertify.success('User profile updated successfully');
    }, error => {
      this.alertify.error(error);
    }
    );
  }

loadUser() {
  this.userService.getUser(this.userOutsideId).subscribe((user: User) => {
    this.user = user;
  },
  error => {
    this.alertify.error(error);
  });
}

}

// export interface Usertype{
//   userId: number;
//    userName: string;
//     emailAddress: string;
//     firstName: string;
//     lastName: string;
//     userType: string;
//     addressLine1: string;
//     addressLine2: string;
//     country: string;
//     city: string;
//     state: string;
//     createdOn: Date;
//     faxNumber: string;
//     phoneNumber: string;
//     postalCode: string;
// }




