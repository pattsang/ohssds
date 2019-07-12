import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/_service/user.service";
import { AlertifyService } from "src/app/_service/alertify.service";
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "src/app/_models/user";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: "user-location",
  templateUrl: "./user-location.component.html",
  styleUrls: ["./user-location.component.css"]
})
export class UserLocationComponent implements OnInit {
  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  user: User;

  model: any = {
    userId: null,
    authorityUnitId: null
  };

  // authorities: AuthorityInterface[] = [];
  authorities;
  level1Authorities;
  level2Authorities;
  level3Authorities;
  locations;
  selectedHospital: string;
  departmentCount: number;
  hideLevel3DropDown: boolean;

  public selectedAuthority: any;
  public selectedLevel1Authority: any;
  public selectedLevel2Authority: any;
  public selectedLevel3Authority: any;

  ngOnInit() {
    this.loadUser();
    this.getAuthorityNames();
  }


  getAuthorityNames() {
    //console.log('in getauthorityname of invitecomponent ' + this.authorities);
    return this.userService.getAuthorityNames().subscribe(res => {
      //console.log(res);
      this.authorities = res;
      //console.log('This is from getAuthorityNames ' + this.selectedAuthority)
      //console.log(res)
    });
  }




doSomething(event) {
 //console.log('from doSomething function ' + this.selectedAuthority)
 //console.log('from dosomething for event ' + event.value)
 this.getLevel1DropDown();
 //this.getLevel2DropDown();
// this.getLevel3DropDown();
}

onUserSelectLevel1(event) {
 // console.log('from onUserSelectlevel1() function ' + event.value);
  this.getLevel2DropDown();
}

onUserSelectLevel2(event) {
  //console.log('from onUserSelectlevel2() function ' + event.value);
  this.getLevel3DropDown();
}

onUserSelectLevel3(event) {
  //console.log('from onUserSelectlevel3() function ' + event.value);
  //this.getLevel3DropDown();
  // code to submit form.
}

getLevel1DropDown() {
  //console.log()
  return this.userService.level1DropDown(this.selectedAuthority).subscribe(res => {
    this.level1Authorities = res;
    //console.log(res)
});
}

getLevel2DropDown() {
  //console.log()
  return this.userService.level2DropDown(this.selectedLevel1Authority).subscribe(res => {
    this.level2Authorities = res;
    //console.log(res)
});
}

getLevel3DropDown() {
  this.departmentCount = 0;
  if (this.departmentCount == 0) {
    this.hideLevel3DropDown = true;
  } 
  return this.userService.level3DropDown(this.selectedLevel2Authority).subscribe(res => {
    this.level3Authorities = res;
    //console.log(res)
});
}
  // getLevel1AuthorityNames() {
  //   //console.log('in level1authority of invitecomponent ' + this.level1Authorities);
  //   return this.userService.getLevel1AuthorityNames().subscribe(res => {
  //     this.level1Authorities = res;
  //     //console.log('This is coming from level2AuthoritiesNames: ' + this.level1Authorities);
  //   });
  // }

  // getLevel2AuthorityNames() {
  //   //console.log('in level1authority of user-location ' + this.level2Authorities);
  //   return this.userService.getLevel2AuthorityNames().subscribe(res => {
  //     this.level2Authorities = res;
  //   });
  // }

  // getLevel3AuthorityNames() {
  //   // console.log('in level1authority of invitecomponent ' + this.level3Authorities);
  //   return this.userService.getLevel3AuthorityNames().subscribe(res => {
  //     this.level3Authorities = res;
  //   });
  // }

  assignLocation() {
     // this.model.userId = this.user.userId; //to change
   // this.model.authorityUnitId = this.selectedAuthority;
   // this.model.authorityUnitId = this.selectedLevel1Authority;
   if(this.selectedLevel3Authority == null) {
    this.model.authorityUnitId = this.selectedLevel2Authority;
   } 
   else {
    this.model.authorityUnitId = this.selectedLevel3Authority;
   }

    return this.userService.assignUserLocation(this.model).subscribe(res => {
      this.alertify.success(`User assigned a location`);
      this.locations = res;
    });
  }


  loadUser() {
    this.userService.getUser(this.route.snapshot.params["id"]).subscribe(
      (user: User) => {
        this.user = user;
        //console.log('user-location component ' + this.user)
        //console.log('Users id : ' + this.user.userId);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
}
