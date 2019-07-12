import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatTable } from '@angular/material';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { HttpClient } from '@angular/common/http';
import { AddSiteComponent } from './add-site/add-site.component';
import { EditSiteComponent } from './edit-site/edit-site.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { AuthoritytreeService } from '../_service/authoritytree.service';
import { AddSubDepartmentComponent } from './add-subDepartment/add-subDepartment.component';
import { AddFloorComponent } from './add-floor/add-floor.component';
import { LocationService } from '../_service/location.service';

@Component({
  selector: 'authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent implements OnInit {
 
  
  constructor(
    private userService: UserService,
    private locationService: LocationService,
    private alertify: AlertifyService,
    private http: HttpClient,
    private dialog: MatDialog,
    private authorityTreeService: AuthoritytreeService
  ) {}

  MyDataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  isLoading = false;

    dataSource: any;
    selectedAddNewSite;  
    authority: any = [];
    allAuthorities: any = [];
    authorities;
    authorityFilter = true;
    authArrayIds:any = [];
    authTreeArray:any =  [];
    authorityTree;
    level1Authorities;
    level2Authorities;
    level3Authorities;
    public selectedAuthority: any;
    public selectedLevel1Authority: any;
    public selectedLevel2Authority: any;
    public selectedLevel3Authority: any;
    departmentCount: number;
    hideLevel3DropDown: boolean;

  sites = [
    { value: 'Site', viewValue : 'Site' },
    { value: 'Location', viewValue : 'Location' },
    { value: 'Department', viewValue : 'Department' },
    { value: 'Sub-Department', viewValue : 'Sub-Department' },
    { value: 'Floor', viewValue : 'Floor' }
  ];

  displayedColumns: string[] = [
    'Authority',
    'Site',
    'Location',
    'Department',
    'Sub-Department',
    'Floor',
    'Edit'
  ];

  ngOnInit() {
    this.getAllAuthorityLocations();
    this.MyDataSource = new MatTableDataSource();
  }

  applyFilter(filterValue: string) {
    this.MyDataSource.filter = filterValue.trim().toLowerCase();
  }

openDiaglog1(authority) {
  const dialogRef = this.dialog.open(AddSiteComponent, {
    data: {
      authority: authority
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  })
}

openDiaglogEdit(authority) {

  this.editClick(authority.topLevelId);
  const dialogRef = this.dialog.open(EditSiteComponent, {
    data: {
      authority: authority
    }
  });
  console.log('openDialogEdit topLevelName' + authority.topLevelName);
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}

openDialogLocation(authority) {
  
  const dialogRef = this.dialog.open(AddLocationComponent, {
    data: {
      authority: authority
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}

openDialogDepartment(authority) {
  const dialogRef = this.dialog.open(AddDepartmentComponent, {
    data: {
      authority: authority
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}

openDialogSubDepartment(authority) {
  const dialogRef = this.dialog.open(AddSubDepartmentComponent, {
    data: {
      authority: authority
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}

openDialogFloor(authority) {
  const dialogRef = this.dialog.open(AddFloorComponent, {
    data: {
      authority: authority
    }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
  });
}


  onUserSelectAddNew(userSelection) {

    if (userSelection === 'Site') {
      console.log('addnew site, user select : ' + userSelection);
      this.openDiaglog1('myAuthority')
    } else if (userSelection === 'Location') {
      console.log('addnew location, user select : ' + userSelection);
      this.openDialogLocation(userSelection);
    } else if (userSelection === 'Department') {
      console.log('addnew department, user select : ' + userSelection);
      this.openDialogDepartment('my authority');
    } else if (userSelection === 'Sub-Department') {
      console.log('addnew sub-department, user selected : ' + userSelection);
      this.openDialogSubDepartment('authority');
    } else if (userSelection === 'Floor') {
      console.log('addnew floor, user selected : ' + userSelection);
      this.openDialogFloor('authority');
  }
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
        this.authorityFilter = false;
      },
      error => {
        console.log('There was an error: ' + error);
        this.isLoading = false;
      }
    );
  }


  selectRow(row) {
    // console.warn(row);
    // console.log(row.productId);
    // this.openDiaglogProductPage(row);
  }

  onUserSelectLevel1(event) {
    this.getLevel2DropDown();
  }

  onUserSelectLevel2(event) {
    this.getLevel3DropDown();
  }

  onUserSelectTopLevel(selectedAuthority) {
    this.getLevel1DropDown();
   }

   getLevel1DropDown() {
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
    this.departmentCount = 0;
    if (this.departmentCount == 0) {
      this.hideLevel3DropDown = true;
    } 
    return this.locationService.level3DropDown(this.selectedLevel2Authority).subscribe(res => {
      this.level3Authorities = res;
  });
  }

  editClick(rootAuthorityUnitId) {
    //console.log("Edit was clicked hospitalName " + authority.hospitalLevelName);
    return this.authorityTreeService.buildAuthorityTree(rootAuthorityUnitId).subscribe(
      res => {
        this.authorityTree = res;
        this.authorityTree.forEach(element => {          
          this.authTreeArray.push(element);
        });
        
        this.MyDataSource = new MatTableDataSource();
        // this.MyDataSource.data = res;
        this.MyDataSource.data = this.authTreeArray;
        this.MyDataSource.sort = this.sort;
        this.MyDataSource.paginator = this.paginator;
        // this.authorityTree = res; 

      },
      error => {
        console.log('There was an error: ' + error);
      }
    );
  }

  openSiteEditPage(authority) {
    console.log("openSiteEditPage()" + authority);
    const dialogRef = this.dialog.open(EditSiteComponent, {
      // width: '1000px',
      data: {
        authority: authority
    }
    });
  }

  deleteSite(authority) {
    console.log(authority.topLevelId + ' delete clicked, what should i delete, authority? dept? hospital?')
  }

}



export interface DialogData {
  animal: string;
  name: string;
}
