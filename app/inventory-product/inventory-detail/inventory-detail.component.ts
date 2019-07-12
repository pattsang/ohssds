import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatTableDataSource } from '@angular/material';
import { ProductService } from 'src/app/_service/product.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ProductLocationComponent } from 'src/app/product-location/product-location.component';
import { CreateSecondarynameComponent } from '../create-secondaryname/create-secondaryname.component';
import { UpdateSecondarynameComponent } from '../update-secondaryname/update-secondaryname.component';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: "inventory-detail",
  templateUrl: './inventory-detail.component.html',
  styleUrls: ['./inventory-detail.component.css']
})
export class InventoryDetailComponent implements OnInit {

  product: any = {};
  selected;
  productDetail: any;
  productDetailInfo: any = {};
  // productAuthorityId: any;

  productId = this.passedData.row.productId;
  product_name = this.passedData.row.product_name;
  ref_id = this.passedData.row['ref_id'];
  internal = this.passedData.row['internal'];

  model: any;
  MyDataSource: any = [];

  displayedColumns: string[] = [
    'select',
    'Location',
    'SecondaryName',
    'DateAdded',
    'Remove'
  ];

  selection = new SelectionModel<ProductDetails>(true, []);
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private productService: ProductService,
    private router: Router,
    private alertify: AlertifyService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getProductDetail();
    // console.log('Passed Data: ' + this.passedData.row)
    // console.log('RootAuth' + this.rootAuthorityUnitId);
  }

  
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      if (numSelected === 0) {
        return null;
      }
      const numRows = this.MyDataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      this.isAllSelected()
        ? this.selection.clear()
        : this.MyDataSource.data.forEach(row => this.selection.select(row));
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: ProductDetails): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      // for(const test of this.selection.selected) {
      //   console.log('This is it: ' + test[0].firstName);
      // }
      return `${
        this.selection.isSelected(row) ? 'deselect' : 'select'
      } row ${row.position + 1}`;
    }

  getProductDetail() {
    return this.productService
      .getinventoryProductDetail(this.productId).subscribe(
        res => {
        this.productDetail = res;
        this.productDetailInfo = this.productDetail.health_authority;
        // for(const productInfo of this.productDetail) {
        //   for(const productAuthId of productInfo.health_authority) {
        //     this.productAuthorityId = productAuthId.productAuthorityId;
        //     console.log('productAuthId: ' + this.productAuthorityId);
        //   }
        // }
       this.MyDataSource = new MatTableDataSource(this.productDetail);
       this.MyDataSource.data = res;
      },
      error => {
        this.alertify.error('Unable to retrieve product detail');
      });
  }

  openProductLocationPage(productId) {
    console.log('openProductLocationPage()' + productId);
    const dialogRef = this.dialog.open(ProductLocationComponent, {
      width: '1000px',
      data: {
        productId: this.productId
      }
    });

    // dialogRef.disableClose = true;
  }
  getSDSPDF() {
    this.productService.getPDF(this.productId).subscribe(
      blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        // var test = window.URL.createObjectURL(blob);
        // link.download="Test.pdf"; // downloads pdf file and names it test.pdf
        // link.click();
        // window.open(link.href, '_blank');
        link.download = `${this.product_name}.pdf`; // downloads pdf file and names it test.pdf
        link.click();
      },
      error => {}
    );
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

  removeProductfromLocation(rootAuthorityUnitId, productAuthorityId) {
    var prompt = confirm('Are you sure you want to remove this product from this location?');
    if (prompt) {
      return this.productService
        .removeProductLocation(this.productId, rootAuthorityUnitId, productAuthorityId
        )
        .subscribe(res => {
          this.model = res;
          this.alertify.success('Product successfully removed');
          console.log(res);
        }), error => {
          this.alertify.error('Something went wrong, please try again');
        };
    }
  }

  openCreateSecondaryNameModalWindow(product) {
    const dialogRef = this.dialog.open(CreateSecondarynameComponent, {
      width: '500px',
      data: {
        row: product
      }
    });
  }

  openUpdateSecondaryNameModalWindow(product) {
    const dialogRef = this.dialog.open(UpdateSecondarynameComponent, {
      width: '500px',
      data: {
        row: product
      }
    });
  }
}

export interface ProductDetails {
  productId: number;
  productName: string;
  productCode: string;
  casNumber: string;
  ProductAlias: string;
  HealthHazardClass: string;
  PhysicalHazardClass: string;
  position: number;
}