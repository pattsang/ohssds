import { Component, OnInit,  Inject} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserService } from "src/app/_service/user.service";
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives'; 
import { AlertifyService } from 'src/app/_service/alertify.service';
import { LocationService } from 'src/app/_service/location.service';


@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  authorities;
  selectedAuthority;
  newLocationName;
  level1Authorities;
  selectedLevel1Authority;

  authorityInput = { 
    rootAuthorityUnitId: null,
    parentAuthorityUnitId: null,
    name: ''
  };

  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any,
  private userService: UserService,
  private fb: FormBuilder,
  private locationService: LocationService,
  private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.getAllTopAuthority();
  }

  getAllTopAuthority() {
    return this.locationService.getAllTopAuthorityNames().subscribe(res => {
      this.authorities = res;
    })
  }

  getLevel1DropDown() {
    console.log("get level1 dropdown called, selectedAuth " + this.selectedAuthority);
    return this.locationService.level1DropDown(this.selectedAuthority).subscribe(res => {
      this.level1Authorities = res;
      //console.log(res)
    });
  }
  // getLevel1DropDown() {
  //   console.log("get level1 dropdown called, selectedAuth " + this.selectedAuthority);
  //   return this.userService.level1DropDown(this.selectedAuthority).subscribe(res => {
  //     this.level1Authorities = res;
  //     //console.log(res)
  //   });
  // }

  onUserSelectTop() {
    console.log('user select top ' + this.selectedAuthority);
    this.getLevel1DropDown();
  }
  onUserSelectLevel1(event) {
    console.log('from onUserSelectlevel1() function ' + event.value);
    // this.getLevel2DropDown();
  }

  addLocation() {
    // we should have the rootAuthorityUnitId already
    // we also have level1AuthorityUnitId - not going to use
    // we get the parentAuthorityUnitId which is this.selectedAuthority
    // and the new location which is this.newLocationName

    if (this.selectedAuthority && this.newLocationName && this.selectedLevel1Authority) {
      console.log('selected value ' + this.selectedAuthority);
      console.log('locationName ' + this.newLocationName);
      console.log('Level 1: ' + this.selectedLevel1Authority);

      this.authorityInput.rootAuthorityUnitId = this.selectedAuthority;
      this.authorityInput.parentAuthorityUnitId = this.selectedLevel1Authority;
      this.authorityInput.name = this.newLocationName;

      return this.locationService.insertNewSite(this.authorityInput).subscribe(next => {
             this.alertify.success("Successfully added");
           }, error => {
             this.alertify.error("Something went wrong");
           });
        }
    }
    
  }

//   addSite() {

//     console.log('addsite: ' + this.selectedAuthority);
//     console.log('New Site Name: ' + this.newSiteName);
//     this.authorityInput.rootAuthorityUnitId = this.selectedAuthority;
//     this.authorityInput.parentAuthorityUnitId = this.selectedAuthority;
//     this.authorityInput.name = this.newSiteName;

//     return this.locationService.insertNewSite(this.authorityInput).subscribe(next => {
//      this.alertify.success("Successfully added");
//    }, error => {
//      this.alertify.error("Something went wrong");
//    });
// }


