import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { UserService } from '../_service/user.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { User } from '../_models/user';

@Component({
  selector: 'invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})

export class InviteComponent implements OnInit {
//Email: string;
// Username: string;

  constructor(private http: HttpClient,
     private api: ApiService,
      private userService: UserService,
      private router: Router,
      private alertify: AlertifyService) { }

  baseUrl = 'https://localhost:44309/api/v1/user/';
 // baseUrl = 'https://ohssdsdev.azurewebsites.net/api/v1/user';


user: User;

model: any = {
  authorityUnitId: null,
  firstName: '',
  lastName: '',
  email: '',
//  userId: null
}


authorities;
level1Authorities;
level2Authorities;
level3Authorities;
locations;
selectedHospital: string;
public selectedAuthority: any;

listOfAuthorityNames = [];

  ngOnInit() {
    this.getAuthorityNames();
    this.getLevel1AuthorityNames();
    this.getLevel2AuthorityNames();
    this.getLevel3AuthorityNames();
    // this.userService.getAuthorityNames().subscribe(res => {
    //   console.log(res);
    //   this.authorities = res; });

    //   this.userService.getLevel1AuthorityNames().subscribe(res => {
    //     console.log(res);
    //     this.level1Authorities = res;
    //   });

    //   this.userService.getLevel2AuthorityNames().subscribe(res => {
    //     console.log(res);
    //     this.level2Authorities = res;
    //   });

    //   this.userService.getLevel3AuthorityNames().subscribe(res => {
    //     console.log(res);
    //     this.level3Authorities = res;
    //   });
    }

  // getAllAuthoritiesByRoles() {
  //   return this.http.get(this.baseUrl + 'authoritiesbyroles');
  // }

  // getAuthorityNames() {
  //   console.log('in getauthorityname of invitecomponent ' + this.authorities);
  //   return this.userService.getAuthorityNames().subscribe(res => {
  //     console.log(res);
  //     this.authorities = res;
  //   });
  // }

  // getLevel1AuthorityNames() {
  //   console.log('in level1authority of invitecomponent ' + this.level1Authorities);
  //   return this.userService.getLevel1AuthorityNames();
  // }

  // getLevel2AuthorityNames() {
  //   console.log('in level1authority of invitecomponent ' + this.level2Authorities);
  //   return this.userService.getLevel2AuthorityNames();
  // }

  // getLevel3AuthorityNames() {
  //   console.log('in level1authority of invitecomponent ' + this.level3Authorities);
  //   return this.userService.getLevel3AuthorityNames();
  // }

  getAuthorityNames() {
    //console.log('in getauthorityname of invitecomponent ' + this.authorities);
    return this.userService.getAuthorityNames().subscribe(res => {
      //console.log(res);
      this.authorities = res;
    });
  }

  getLevel1AuthorityNames() {
    //console.log('in level1authority of invitecomponent ' + this.level1Authorities);
    return this.userService.getLevel1AuthorityNames().subscribe(res => {
      this.level1Authorities = res;
      //console.log('This is coming from level2AuthoritiesNames: ' + this.level1Authorities);

    });
  }

  getLevel2AuthorityNames() {
    //console.log('in level1authority of user-location ' + this.level2Authorities);
    return this.userService.getLevel2AuthorityNames().subscribe(res => {
      this.level2Authorities = res;
    });
  }

  getLevel3AuthorityNames() {
   // console.log('in level1authority of invitecomponent ' + this.level3Authorities);
    return this.userService.getLevel3AuthorityNames().subscribe(res => {
      //console.log(res);
      this.level3Authorities = res;
    });
  }

  inviteUser() {
    // this.model.userId = this.user.userId;
    this.model.authorityUnitId = this.selectedAuthority;
    // this.model.firstName = this.user.firstName;
    // this.model.lastName = this.user.lastName;
    // this.model.email = this.user.emailAddress;

  //  console.log(this.model.email + this.model.username + 
  //   this.model.authorities + this.model.level1Authorities
  //    + this.model.level2Authorities + this.model.level3Authorities);

    return this.userService.inviteUserBySiteAdmin(this.model).subscribe(
      res => {
        this.alertify.success(`Invitation sent to email: ${this.model.email}`);
        this.router.navigate(['/users']);
        this.locations = res;
      },
      error => {
        this.alertify.error('Something went wrong!');
        console.log('issue with invitation');
      }
    )
  }

  assignLocation() {
    this.model.userId = this.user.userId;
    this.model.authorityUnitId = this.selectedAuthority;
    return this.userService.assignUserLocation(this.model).subscribe(res => {
      //console.log(res);
      //console.log('AssignLocation()/current userId: ' + this.user.userId + ',' + 'LocationId: ' + this.authorities.authorityUnitId);
      this.locations = res;
    });
  }
 

 
}

export interface Authority {
  value: string;
  viewValue: string;
}

