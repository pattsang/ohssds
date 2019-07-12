import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatTable
} from '@angular/material';
import { UserService } from 'src/app/_service/user.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
import { AuthoritytreeService } from 'src/app/_service/authoritytree.service';
import { LocationService } from 'src/app/_service/location.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.css']
})
export class EditSiteComponent implements OnInit {
  isLoading = false;
  authorities;
  authArray: any[];
  selectedAuthority;
  newSiteName;
  authority: any = [];
  allAuthorities: any = [];
  MyDataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private userService: UserService,
    private fb: FormBuilder,
    private locationService: LocationService,
    private authorityTreeService: AuthoritytreeService,
    private alertify: AlertifyService
  ) { }

  topLevelId = this.passedData.authority.topLevelId;
  topLevelName = this.passedData.authority.topLevelName;
  subTopLevelId = this.passedData.authority.subTopLevelId;
  subTopLevelName = this.passedData.authority.subTopLevelName;
  hospitalLevelId = this.passedData.authority.hospitalLevelId;
  hospitalLevelName = this.passedData.authority.hospitalLevelName;
  departmentLevelId = this.passedData.authority.departmentLevelId;
  departmentLevelName = this.passedData.authority.departmentLevelName;
  departmentLevelChildId = this.passedData.authority.departmentLevelChildId;
  departmentLevelChildName = this.passedData.authority.departmentLevelChildName;
  floorLevelId = this.passedData.authority.floorLevelId;
  floorLevelName = this.passedData.authority.floorLevelName;
  is_edit: boolean;

  model = {
    topLevelId: this.topLevelId,
    topLevelName: this.topLevelName,
    subTopLevelId: this.subTopLevelId,
    subTopLevelName: this.subTopLevelName,
    hospitalLevelId: this.hospitalLevelId,
    hospitalLevelName: this.hospitalLevelName,
    departmentLevelId: this.departmentLevelId,
    departmentLevelName: this.departmentLevelName,
    departmentLevelChildId: this.departmentLevelChildId,
    departmentLevelChildName: this.departmentLevelChildName,
    floorLevelId: this.floorLevelId,
    floorLevelName: this.floorLevelName
  };

  Id: number;
  // model: any = {};
  deleteModel: any = {};

  ngOnInit() {
    this.getAllAuthorityLocations();
    this.MyDataSource = new MatTableDataSource();

    // console.log("topLevelId: " + this.topLevelId);
    // console.log("topLevelName: " + this.topLevelName);
    // console.log("subTopLevelId: " + this.subTopLevelId);
    // console.log("subTopLevelName: " + this.subTopLevelName);
    // console.log("hospitalLevelId: " + this.hospitalLevelId);
    // console.log("hospitalLevelName: " + this.hospitalLevelName);
    // console.log("departmentLevelId: " + this.departmentLevelId);
    // console.log("departmentLevelName: " + this.departmentLevelName);
    // console.log("departmentLevelChildId: " + this.departmentLevelChildId);
    // console.log("departmentLevelChildName: " + this.departmentLevelChildName);
    // console.log("floorLevelId: " + this.floorLevelId);
    // console.log("floorLevelName: " + this.floorLevelName);
  }

  getAllAuthorityLocations() {
    this.isLoading = true;

    this.authorityTreeService.getAllAuthorityLocations().subscribe(
      res => {
        this.authority = res;
        this.authority.forEach(element => {
          this.allAuthorities.push(element);
        });
        this.MyDataSource = new MatTableDataSource(this.authority);
        this.MyDataSource.data = this.allAuthorities;
        this.MyDataSource.sort = this.sort;
        this.MyDataSource.paginator = this.paginator;

        this.isLoading = false;
      },
      error => {
        console.log('There was an error: ' + error);
        this.isLoading = false;
      }
    );
  }

  deleteSite(id) {
    var prompt = confirm('Are you sure you want to delete this location?');
    if (prompt) {
    return this.locationService.removeLocation(id).subscribe(
      res => {
        this.deleteModel = res;
        console.log('deleteModel' + this.deleteModel);
        this.alertify.success('Location successfully deleted');
      },
      error => {
        this.alertify.error('Something went wrong, please try again');
      });
    }
  }

  updateSite() {
    this.model.topLevelName = this.topLevelName;

    if (this.subTopLevelId === 0) {
      this.model.subTopLevelId = null;
      this.model.subTopLevelName = null;
    } else {
      this.model.subTopLevelName = this.subTopLevelName;
    }
    if (this.hospitalLevelId === 0) {
      this.model.hospitalLevelId = null;
      this.model.hospitalLevelName = null;
    } else {
      this.model.hospitalLevelName = this.hospitalLevelName;
    }
    if (this.departmentLevelId === 0) {
      this.model.departmentLevelId = null;
      this.model.departmentLevelName = null;
    } else {
      this.model.departmentLevelName = this.departmentLevelName;
    }
    if (this.departmentLevelChildId === 0) {
      this.model.departmentLevelChildId = null;
      this.model.departmentLevelChildName = null;
    } else {
      this.model.departmentLevelChildName = this.departmentLevelChildName;
    }
    if (this.floorLevelId === 0) {
      this.model.floorLevelId = null;
      this.model.floorLevelName = null;
    } else {
      this.model.floorLevelName = this.floorLevelName;
    }

    return this.locationService.updateLocations(this.model).subscribe(
      res => {
        // this.model = res;
        this.getAllAuthorityLocations();

        this.alertify.success('Location successfully update');
      },
      error => {
        this.alertify.error('Something went wrong, please try again');
      }
    );
  }
}
