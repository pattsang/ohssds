import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../api.service";
import { UserService } from "src/app/_service/user.service";
import { AlertifyService } from "src/app/_service/alertify.service";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from './../_service/auth.service';

import { MatPaginator, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material';


import { PageEvent } from '@angular/material';
import { OrderListComponent } from '../order-list/order-list.component';
import { TreeCheckboxComponent} from '../tree-checkbox/tree-checkbox.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  //displayedColumns: string[] = ['productName', 'manufacturerName', 'productNote', 'revisionDate'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // searchInput;
  searchBox;
  // productNameChecked = false;
  // productCodeChecked = false;
  // casNumberChecked = false;
  manufacturerChecked = false;
  indeterminate = false;
  labelPosition = 'before';
  disabled = false;
  products;
  level2Authorities;
  level3Authorities;
  _loggedIn;
  public selectedLevel2Authority: any;
  public selectedLevel3Authority: any;
 // productArray;
  companies;
  loadComponent;
  ELEMENT_DATA1: ProductInterface[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private api: ApiService,
    private userService: UserService,
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
   // this.dataSource.paginator = this.paginator;
   this.loadComponent = false;
   
    // this.getLevel2AuthorityNames();
    // this.getLevel3AuthorityNames();
   
 
  }

  loggedIn() {
    this._loggedIn = this.authService.loggedIn();
    return this._loggedIn;
  }

  getProduct(value: string) {
    if (value.length > 0) {
      this.loadComponent = false;
      this.loadComponent =true;
      
    } else {
      this.loadComponent = false;
    }

  }

  getLevel2AuthorityNames() {
    return this.userService.getLevel2AuthorityNames().subscribe(res => {
      this.level2Authorities = res;
    });
  }

  getLevel3AuthorityNames() {
    return this.userService.getLevel3AuthorityNames().subscribe(res => {
      this.level3Authorities = res;
    });
  }

  searchBoxClick() {
    console.log("searchBoxclick");
  }


}

export interface ProductInterface {
  productName: string;
  manufacturerName: string;
  productCode: string;
  revisionDate: string;
  lastVerifiedDate: string;
}