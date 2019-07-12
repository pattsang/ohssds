import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from 'src/app/_service/user.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'showUserLocation',
  templateUrl: './showUserLocation.component.html',
  styleUrls: ['./showUserLocation.component.css']
})
export class ShowUserLocationComponent implements OnInit {

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    ) { }

    userOutsideId = this.passedData.user;

  locations: any;
  authorityUnitId: any;

  model: any = {};

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

  ngOnInit() {
    this.loadUser();
    // console.log(this.userOutsideId);
    this.getAllUserLocations();
  }

  getAllUserLocations() {
    return this.userService.getUserLocation(this.userOutsideId).subscribe(res => {
      this.locations = res;
      // console.log(this.locations);
    });
  }

  loadUser() {
    this.userService.getUser(this.userOutsideId).subscribe((user: User) => {
      this.user = user;
      // console.log(this.user);
    },
    error => {
      this.alertify.error('Unable to load user');
    });
  }

  removeUserLocations(authorityUnitId) {
    var prompt = confirm('Are you sure you want to delete this location?');
    if (prompt) {
    this.model.authorityUnitId = authorityUnitId;
    this.model.userOutSideId = this.userOutsideId;
    return this.userService.removeUserLocation(this.model).subscribe(res => {
      this.alertify.success('Location successfully removed');
    }, error => {
      this.alertify.error('Something went wrong, please try again');
    });
  }
}
}
