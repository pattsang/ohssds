import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserService } from "src/app/_service/user.service";
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives'; 
import { LocationService } from 'src/app/_service/location.service';
import { AlertifyService } from 'src/app/_service/alertify.service';


@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  authorities;
  selectedAuthority;
  newSiteName;
  level1Authorities;
  selectedLevel1Authority;
  level2Authorities;
  selectedLevel2Authority;

  authorityInput = { 
    rootAuthorityUnitId: null,
    parentAuthorityUnitId: null,
    name: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private userService: UserService,
    private locationService: LocationService,
    private alertify: AlertifyService,
    private fb: FormBuilder
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

  getLevel2DropDown() {
    //console.log()
    return this.locationService.level2DropDown(this.selectedLevel1Authority).subscribe(res => {
      this.level2Authorities = res;
      //console.log(res)
    });
  }

  onUserSelectTop() {
    this.getLevel1DropDown();
  }
  onUserSelectLevel1(event) {
    console.log('from onUserSelectlevel1() function ' + event.value);
    this.getLevel2DropDown();
  }

  onUserSelectLevel2(event) {
    console.log('from onUserSelectlevel2() function ' + event.value);
    // this.getLevel3DropDown();
  }

  addDepartment() {
    // we should have the rootAuthorityUnitId already
    // we get the parentAuthorityUnitId which is this.selectedAuthority
    // and the new authority which is this.newSiteName

    if (this.selectedAuthority && this.newSiteName &&
       this.selectedLevel1Authority && this.selectedLevel2Authority) {
      console.log('selected value ' + this.selectedAuthority);
      console.log('l1 ' + this.selectedLevel1Authority);
      console.log('l2 ' + this.selectedLevel2Authority)
      console.log('siteName ' + this.newSiteName);
      this.authorityInput.rootAuthorityUnitId = this.selectedAuthority;
      this.authorityInput.parentAuthorityUnitId = this.selectedLevel2Authority;
      this.authorityInput.name = this.newSiteName;

      return this.locationService.insertNewSite(this.authorityInput).subscribe(next => {
        this.alertify.success("Department Successfully added");
      }, error => {
        this.alertify.error("Something went wrong");
      });

    }
  }

}
