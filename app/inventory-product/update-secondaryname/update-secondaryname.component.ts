import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ProductService } from 'src/app/_service/product.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';

@Component({
  selector: 'update-secondaryname',
  templateUrl: './update-secondaryname.component.html',
  styleUrls: ['./update-secondaryname.component.css']
})
export class UpdateSecondarynameComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private productService: ProductService,
    private router: Router,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) {}
  
  productId = this.passedData.row.productId;
  productAuthorityId = this.passedData.row.productAuthorityId;
  secondaryName = this.passedData.row.secondaryName;
  rootAuthorityUnitId = this.passedData.row.rootAuthorityUnitId;

  model: any = {};

  ngOnInit() {
    console.log('RootAuthorityUnitId: ' + this.rootAuthorityUnitId);
  }


  updateSecondaryProductName() {
    this.model.productId = this.productId;
    this.model.productAuthorityId = this.productAuthorityId;
    this.model.secondaryName = this.secondaryName;
    this.model.rootAuthorityUnitId = this.rootAuthorityUnitId;

    return this.productService.updateSecondaryName(this.productId, this.model).subscribe(res => {
      console.log('RootAuthorityUnitId: ' + this.rootAuthorityUnitId);
      this.model =  res;
      this.alertify.success('Secondary name updated successfully');
    },
    error => {
      this.alertify.error('Something went wrong, please try again');
    });
  }
}
