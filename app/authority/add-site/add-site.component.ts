import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from 'src/app/_service/user.service';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
import { LocationService } from 'src/app/_service/location.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
//import { AuthorityModel } from '../../_models/authority';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent implements OnInit {
  authorities;
  selectedAuthority;
  siteAliasName;
  newSiteName;
  authorityInput = { 
    rootAuthorityUnitId: null,
    parentAuthorityUnitId: null,
    name: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private userService: UserService,
    private locationService: LocationService,
    private fb: FormBuilder,
    private alertify: AlertifyService ) { }

  ngOnInit() {
    // this.getAuthorityNames();
    this.getAllTopAuthority();
  }



 

  // getAuthorityNames() {
  //   //console.log('in getauthorityname of invitecomponent ' + this.authorities);
  //   return this.userService.getAllTopAuthorities().subscribe(res => {
  //     //console.log(res);
  //     this.authorities = res;
  //     //console.log('This is from getAuthorityNames ' + this.selectedAuthority)
  //     //console.log(res)
  //   });
  // }

  getAllTopAuthority() {
    return this.locationService.getAllTopAuthorityNames().subscribe(res => {
      this.authorities = res;
    })
  }

  // addSite(addSiteForm) {
    addSite() {

     console.log('addsite: ' + this.selectedAuthority);
     console.log('New Site Name: ' + this.newSiteName);
     this.authorityInput.rootAuthorityUnitId = this.selectedAuthority;
     this.authorityInput.parentAuthorityUnitId = this.selectedAuthority;
     this.authorityInput.name = this.newSiteName;

     return this.locationService.insertNewSite(this.authorityInput).subscribe(next => {
      this.alertify.success('Successfully added');
    }, error => {
      this.alertify.error('Something went wrong');
    });
}

}


export interface AuthorityModel {
  parentAuthorityUnitId: number,
  rootAuthorityUnitId: number,
  name: string,
  authorityUnitOutsideId: string,
}