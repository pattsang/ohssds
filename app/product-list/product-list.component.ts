import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { ApiService } from "../api.service";
import { Subject} from 'rxjs';

const ELEMENT_DATA = [
  {
    orderDate: new Date(),
    orderNumber: 100,
    total: 29.99,
    description: '2lbs of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 101,
    total: 39.99,
    description: '5lbs of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 102,
    total: 59.99,
    description: '1lbs of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 100,
    total: 29.99,
    description: '2lbs of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 101,
    total: 39.99,
    description: '5lbs of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 102,
    total: 59.99,
    description: '1lbs of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 100,
    total: 29.99,
    description: '2lbs of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 101,
    total: 39.99,
    description: '5lbs of tuna',
    isChecked: false
  },
  {
    orderDate: new Date(),
    orderNumber: 102,
    total: 59.99,
    description: '1lbs of tuna',
    isChecked: false
  },
];

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  // styleUrls: ['./order-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() searchBox;

  ELEMENT_DATA1 = [];
  //displayedColumns: string[] = ['productCode', 'productName', 'revisionDate', 'manufacturerName', 'lastVerifiedDate'];
  displayedColumns: string[] = ['productName', 'manufacturerName','AdditionalSupplier' , 'productCode', 'revisionDate','lastVerifiedDate',];
  dataSource: MatTableDataSource<object>;

  length = 0;
  pageIndex = 0;
  pageSize = 5;
  pageSizeOptions = [1, 2, 5];
  isLoading = false;
  row;
  test = 'khoa';
  product = {
    ProductName: '',
    ProductCode: '',
    ManufacturerName: '',
    CasNumber: '',
    ProductAlias: '',
    AdditionalSupplier: ''
  };
  rowSelected = false;
  

  @ViewChild(MatSort) sort: MatSort;

  pageEvent: PageEvent;

  constructor(private api: ApiService) { }

  selectRow(row){
    this.rowSelected = true;
   // console.log("selected row: cas# " + row['casNumber'] + ' || '+ row['productCode'] + ' || ' + row['productName'] + ' || ' + row['manufacturerName']);
    this.product.ProductName = row['productName']; 
    this.product.ProductCode = row['productCode'];
    this.product.ManufacturerName = row['manufacturerName'] ;
    this.product.CasNumber = row['casNumber'];
    this.product.ProductAlias = row['productAlias'];
    this.product.AdditionalSupplier = row['additionalSupplier'];
    this.api.selectProduct(this.product);
  }

  onPageChange(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;  
    // this.loadData(this.pageIndex, this.pageSize);
    this.loadData1(this.pageIndex, this.pageSize);
  }


  loadData(pageIndex, pageSize) {

    this.dataSource = new MatTableDataSource<object>(ELEMENT_DATA.slice(pageIndex, pageIndex + pageSize));
  }

  loadData1(pageIndex, pageSize) {
    //console.log('load data1 is called')
    this.isLoading = true;
    var products;
    if (this.searchBox && this.searchBox.length == 0) {
      this.searchBox.value = ''; //this product doesn't exist, display nothing. 
    } else {
      this.api.searchProducts(this.searchBox.value).subscribe(res => {
        products = res;
        this.isLoading = false;
        var i = 0;
        products.forEach(element => {
          this.ELEMENT_DATA1[i] = element;
          i++;
        });
        console.log("loadData1[0].casnumber " + this.ELEMENT_DATA1[0].casNumber);
        // console.log("loadData1 " + this.ELEMENT_DATA1);
        if (this.ELEMENT_DATA1.length > 0) {
          console.log("loadData1[0].ProductAlias " + this.ELEMENT_DATA1[0].productAlias);
          console.log("loadData1[0].AdditionalSupplier " + this.ELEMENT_DATA1[0].additionalSupplier);
          console.log("loadData1[0].productNote " + this.ELEMENT_DATA1[0].productNote);
          this.length = this.ELEMENT_DATA1.length;
          this.dataSource = new MatTableDataSource<object>(this.ELEMENT_DATA1.slice(pageIndex, pageIndex + pageSize));
          this.dataSource.sort = this.sort;
        }

      });
    }
     
    
  }

  ngOnInit() {
    // do we have a value for searchBox that is from parent component;
    
    if (this.searchBox.value){
      //console.log("on init this.searchBox " + this.searchBox.value);
      this.loadData1(0, this.pageSize);
    }
    // else {
    //   this.loadData(0, this.pageSize); // for now, will remove later
    // }
  }

  selectAll() {
    for (var elm of ELEMENT_DATA) {
      elm.isChecked = !elm.isChecked;
    }
    // console.log(this.ELEMENT_DATA1);
  }

}
