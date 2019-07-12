import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ExporListService } from 'src/app/_service/exporList.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-exportList',
  templateUrl: './exportList.component.html',
  styleUrls: ['./exportList.component.css']
})
export class ExportListComponent implements OnInit {

  constructor(private exportListService: ExporListService,
    private alertify: AlertifyService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public passedData: any
    ) { }
    productId = this.passedData.data;

    allExportLists: any = [];

  productName;
  productNameChecked = false;

  productCode;
  productCodeChecked = false;

  casNumber;
  casNumberChecked = false;

  manufacturerName;
  manufacturerNameChecked = false;

  location;
  locationChecked = false;

  isLoading = false;


  ngOnInit() {
    console.log(this.productId);
  }


  onProductNameChecked() {
    this.productName = ''
    if (this.productNameChecked) {
      this.productName = 'ProductName'
    }
    console.log('fn ' + this.productName);
  }

  onProductCodeChecked() {
    this.productCode = ''
    if (this.productCodeChecked) {
      this.productCode = 'ProductCode'
    }
    console.log('fn ' + this.productCode);
  }

  onCasNumberChecked() {
    this.casNumber = ''
    if (this.casNumberChecked) {
      this.casNumber = 'CasNumber'
    }
    console.log('fn ' + this.casNumber);
  }

  onManufacturerNameChecked() {
    this.manufacturerName = ''
    if (this.manufacturerNameChecked) {
      this.manufacturerName = 'ManufacturerName'
    }
    console.log('fn ' + this.manufacturerName);
  }

  onLocationChecked() {
    this.location = ''
    if (this.locationChecked) {
      this.location = 'AuthorityLocation'
    }
    console.log('fn ' + this.location);
  }

  exportProductList() {
    this.isLoading = true;

    let params = new URLSearchParams();
    params.append('selection', this.productName);
    params.append('selection', this.productCode);
    params.append('selection', this.casNumber);
    params.append('selection', this.manufacturerName);
    params.append('selection', this.location);
    for(const product of this.productId) {
      params.append('productId', product.productId);
    }

    this.exportListService.getExportList(params).subscribe(blob  => {
      params;
      console.log('params: ' + params);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'Export';
      link.click();
      this.isLoading = false;
      this.alertify.success('Exported List Completed');
  }, error => {
    this.isLoading = false;
    this.alertify.error('Something went wrong, please try again.');
  }
  );
  }
}

export interface ExportListFields {
  productNames: string;
  productCodes:  string;
}