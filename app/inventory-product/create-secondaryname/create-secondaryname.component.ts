import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ProductService } from 'src/app/_service/product.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';

@Component({
  selector: 'create-secondaryname',
  templateUrl: './create-secondaryname.component.html',
  styleUrls: ['./create-secondaryname.component.css']
})
export class CreateSecondarynameComponent implements OnInit {

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
  }

  createSecondaryProductName() {
    this.model.productId = this.productId;
    this.model.rootAuthorityUnitId = this.rootAuthorityUnitId;
    this.model.secondaryName = this.secondaryName;
    this.model.productAuthorityId = this.productAuthorityId;

    return this.productService.createSecondaryName(this.productId, this.model)
      .subscribe(
        res => {
          this.model = res;

          this.alertify.success(`Secondary entered successfully`);
        },
        error => {
          this.alertify.error('Something went wrong, please try again');
        });
  }
}
