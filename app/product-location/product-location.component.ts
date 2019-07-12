import { Component, OnInit, Inject } from '@angular/core';
import { User } from './../_models/user';
import { UserService } from "src/app/_service/user.service";
import { AlertifyService } from "src/app/_service/alertify.service";
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from '../api.service';
// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { ProductService } from '../_service/product.service';
import { Product } from '../_models/product';
import { LocationService } from '../_service/location.service';

@Component({
  selector: 'product-location',
  templateUrl: './product-location.component.html',
  styleUrls: ['./product-location.component.css']
})
export class ProductLocationComponent implements OnInit {

  user: User;
  
  // model: any = {
  //   productId: null,
  //   rootAuthorityUnitId: null,
  //   addedDate: null,
  // };

  model: any = {};

  products;
  authorities;
  level1Authorities;
  level2Authorities;
  level3Authorities;
  locations;
  productName = this.passedData.productName;
  productId = this.passedData.productId;
  departmentCount: number;
  hideLevel3DropDown: boolean;

  public selectedAuthority: any = 0;
  public selectedLevel1Authority: any = 0;
  public selectedLevel2Authority: any = 0 ;
  public selectedLevel3Authority: any = 0;


  
  public selectedProduct: any;
 product;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService,
    private dialogRef: MatDialogRef<ProductLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public passedData: any,

  ) { }

  ngOnInit() {
   // this.getAllProduct();
    this.getAuthorityNames();
    // console.warn(this.passedData.product_name);
    // console.warn(this.passedData.selected);
    // console.warn(this.model.productId);
    // console.log(this.passedData.productName);
    // console.warn(this.passedData['product_name']);
    // console.warn(this.passedData['product_code']);
    // console.warn(this.passedData['mfg_name']);
    // console.log("getProductById(): " + this.getProductById() );
    // console.log("this.passedData.selected: " + this.passedData.selected);
    // console.log("this.passedData.productId: " + this.passedData.productId);
    // console.log("this.passedData.productName: " + this.passedData.productName);
    // console.log("this.model.product_name: " + this.model.name);
    this.getProductById();
  }

  getAllProduct(){
    return this.apiService.getProducts().subscribe(res => {
      this.products = res;
      //console.log('Get All Products ' + this.products[0].name + ' id ' + this.products[0].productId)
     
    });
  }

  getProductById() {
    return this.productService.getProductbyId(this.passedData.productId).subscribe((product: Product) => {
      
      this.model = product; 
      console.log("productName:  " + this.model.name);

    });;
  }

  getAuthorityNames() {
    return this.locationService.getAllTopAuthorityNames().subscribe(res => {
      this.authorities = res;
    });
  }


onUserSelectTopAuthority(event) {
 this.selectedAuthority = event.value;
 this.getLevel1DropDown();
}

onUserSelectLevel1(event) {
  this.selectedLevel1Authority = event.value;
  this.getLevel2DropDown();
}

onUserSelectLevel2(event) {
  this.selectedLevel2Authority = event.value;
  this.getLevel3DropDown();
}

onUserSelectLevel3(event) {
  this.selectedLevel3Authority = event.value;
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

  // productAuthority table requires productId, rootAuthorityId
  // note that rootAuthorityId is just the authorityId of the place
  // where the product is used. 
  assignProduct() {
    console.warn(this.model.productId);
    console.log(this.passedData.productId);
    var now = new Date(); 
    var datetime = now.getFullYear()+'/'+(now.getMonth()+1)+'/'+now.getDate();
    this.model.addedDate = datetime; 
    // console.log("Assign clicked!");
    // console.log('assignProduct() this.model.productId: ' +this.model.productId);
    this.model.productId = this.passedData.productId; 
     console.warn(this.model.productId);
   if(this.selectedLevel3Authority == null) {
    this.model.rootAuthorityUnitId = this.selectedLevel2Authority;
   } else {
    this.model.rootAuthorityUnitId = this.selectedLevel3Authority;
   }

      return this.apiService.assignProductLocation(this.model).subscribe(res => {
        this.alertify.success(`Product assigned a location`);
        this.locations = res;
      });
  }


}
