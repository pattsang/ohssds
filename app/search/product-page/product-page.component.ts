import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { ProductService } from 'src/app/_service/product.service';
import { ProductLabelComponent } from 'src/app/product-label/product-label.component';
import { AuthService } from '../../_service/auth.service';
import { AlertifyService } from 'src/app/_service/alertify.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ProductPageComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private productService: ProductService,
    private dialog: MatDialog,
    private authService: AuthService,
    private alertify: AlertifyService
  ) {}

  productId = this.data['productId'];
  ref_id = this.data['ref_id'];
  product_name = this.data['product_name'];
  product_code = this.data['product_code'];
  mfg_detail = this.data['mfg_detail'];
  msds_id = this.data['msds_id'];
  internal = this.data['internal'];
  productDetail: any;
  productDetailInfo: any = {};

  ngOnInit() {
    this.getProductDetail();
  }

  getProductDetail() {
    return this.productService
      .getinventoryProductDetail(this.productId).subscribe(
        res => {
        this.productDetail = res;
        this.productDetailInfo = this.productDetail.health_authority;
      },
      error => {
        this.alertify.error('Unable to retrieve product detail');
      });
  }

  getSDSPDF() {
    this.productService.getPDF(this.productId).subscribe(
      blob => {
        // console.log(blob);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        // formData.set('test', link.href);
        // link.href = `testtesttest`;
        // console.log(link.href);
        // console.log(formData);
        // console.log(formData.set('test', link.href));
        // var test = window.URL.createObjectURL(blob);
        link.download = `${this.product_name}.pdf`; // downloads pdf file and names it test.pdf
        console.log(link.download);
        link.click();
        // window.open(link.href, '_blank');
      },
      error => {}
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  getCloudSDSPDF() {
    this.productService.getCloudSDS(this.ref_id).subscribe(
      blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        // var test = window.URL.createObjectURL(blob);
        // link.download="SDS.pdf"; // downloads pdf file and names it test.pdf
        // window.open(link.href, '_blank');
        link.download = `${this.product_name}.pdf`; // downloads pdf file and names it test.pdf
        // console.log(link.download);
        link.click();
      },
      error => {}
    );
  }

  openProductLabelGeneration(productId) {
    const dialogRef = this.dialog.open(ProductLabelComponent, {
      width: '1000px',
      data: {
        productId: this.productId,
        productName: this.product_name,
        productCode: this.product_code,
        mfg_detail: this.mfg_detail
      }
    });
  }
}
