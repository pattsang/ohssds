import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LocationService } from 'src/app/_service/location.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-subDepartment',
  templateUrl: './add-subDepartment.component.html',
  styleUrls: ['./add-subDepartment.component.css']
})
export class AddSubDepartmentComponent implements OnInit {

  
  authorities;
  selectedAuthority;
  newSiteName;
  level1Authorities;
  selectedLevel1Authority;
  level2Authorities;
  selectedLevel2Authority;
  level3Authorities;
  selectedLevel3Authority;

  authorityInput = { 
    rootAuthorityUnitId: null,
    parentAuthorityUnitId: null,
    name: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
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
    });
  }

  getLevel2DropDown() {
    return this.locationService.level2DropDown(this.selectedLevel1Authority).subscribe(res => {
      this.level2Authorities = res;
    });
  }

  getLevel3DropDown() {
    return this.locationService.level3DropDown(this.selectedLevel2Authority).subscribe(res => {
      this.level3Authorities = res;
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
    this.getLevel3DropDown();
  }

  onUserSelectLevel3(event) {
    console.log('from onUserSelectlevel3() function ' + event.value);
    //this.getLevel3DropDown();
  }

  addDepartment() {
    // we should have the rootAuthorityUnitId already
    // we get the parentAuthorityUnitId which is this.selectedAuthority
    // and the new authority which is this.newSiteName

    if (this.selectedAuthority && this.newSiteName && 
      this.selectedLevel1Authority && this.selectedLevel2Authority && this.selectedLevel3Authority) {
      // console.log('selected value ' + this.selectedAuthority);
      // console.log('l1 ' + this.selectedLevel1Authority);
      // console.log('l2 ' + this.selectedLevel2Authority)
      // console.log('siteName ' + this.newSiteName);
      this.authorityInput.rootAuthorityUnitId = this.selectedAuthority;
      this.authorityInput.parentAuthorityUnitId = this.selectedLevel2Authority;
      this.authorityInput.parentAuthorityUnitId = this.selectedLevel3Authority;
      this.authorityInput.name = this.newSiteName;

      return this.locationService.insertNewSite(this.authorityInput).subscribe(next => {
        this.alertify.success("Sub-Department Successfully added");
      }, error => {
        this.alertify.error("Something went wrong");
      });

    }
  }

}
