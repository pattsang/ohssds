import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectorRef,
  Inject,
  EventEmitter,
  Output
} from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatTable,
  MatTreeFlattener,
  MatTreeFlatDataSource,
  PageEvent
} from '@angular/material';
import { UserService } from '../_service/user.service';
import { ProductService } from '../_service/product.service';
import { AlertifyService } from '../_service/alertify.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductPageComponent } from '../search/product-page/product-page.component';
import { ProductLocationComponent } from '../product-location/product-location.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { CreateManufacturerComponent } from '../manufacturer/create-manufacturer/create-manufacturer.component';
import { InventoryDetailComponent } from './inventory-detail/inventory-detail.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { ExportListComponent } from './exportList/exportList.component';
import { AuthService } from '../_service/auth.service';
import { LocationService } from '../_service/location.service';
import { BehaviorSubject, of, Subscription, Subject } from 'rxjs';
import { NestedTreeControl, FlatTreeControl } from '@angular/cdk/tree';
import { Whmis2015Service } from '../_service/whmis2015.service';
import { FormControl, Validators } from '@angular/forms';
import { SendMailService } from '../_service/send-mail.service';
import { SelectionModel } from '@angular/cdk/collections';
import { takeUntil } from 'rxjs/operators';
import { ProductInventorySearch } from '../_models/ProductInventorySearch';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from '../_service/pagination.service';
import { element } from '@angular/core/src/render3';

export class TodoItemNode {
  authorityUnitId: number;
  parentAuthorityUnitId: number;
  rootAuthorityUnitId: number;
  name: string;
  children?: TodoItemNode[];
  hasChild: boolean;
  exists: boolean;
}

/** Flat to-do item node with expandable and level information */
export class TodoItemFlatNode {
  authorityUnitId: number;
  parentAuthorityUnitId: number;
  rootAuthorityUnitId: number;
  item: string;
  level: number;
  expandable: boolean;
  checked: boolean;
}

@Component({
  selector: "inventory-product",
  templateUrl: './inventory-product.component.html',
  styleUrls: ['./inventory-product.component.css']
})

export class InventoryProductComponent implements OnInit {
  // treeData: TreeData[];

  constructor(
    private userService: UserService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
    private locationService: LocationService,
    private whmisService: Whmis2015Service,
    private sendMailService: SendMailService,
    private route: ActivatedRoute,
    public paginationService: PaginationService
  ) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.getTopLocations();
    this.dataChange.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  searchString;
  searchResultIsEmpty: boolean = true;
  authorities;
  authArrayIds: any = [];
  MyDataSource: any;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPageSwitch = new EventEmitter();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  isLoading = false;
  hideButton = false;
  products: any = [];
  vendorProducts: any = [];
  allProducts: any = [];
  selectedProduct;
  selectedMfgOption;
  authorityId;

  healthClass: any;
  healthClassArray: any;

  // healthClassList = new FormControl("", [Validators.required]);
  locations;
  locationArray;
  selected: number;
  myList: any = [];

  healthClassArr: any = [];
  healthClassHazards: any;
  selectedHealthHazard: number;

  model: any = {
    productId: null,
    rootAuthorityUnitId: null,
    productAuthorityId: null
  };

  selectedSearchParameter;
  selectFormControl = new FormControl({value: '', disabled: true}, [Validators.required]);
  selectedParameter = 'none';

  locationList = new FormControl({value: '', disabled: true}, [Validators.required]);
  selectedAuth: number;
  locationId: any;

  productLocation;

  userDetail: any;

  // request: any;
  request = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailAddress: '',
    productName: '',
    productCode: '',
    manufacturer: '',
    casNumber: ''
  };

  userDetailArray = [];

  displayedColumns: string[] = [
    'select',
    'Product',
    'Manufacturer',
    'Revised',
    'Product Code',
    // 'Location',
    'Whmis Exempt',
    'Last Verified',
    // 'Date Added',
    'Discontinued',
    'Detail',
    // 'Edit',
    // 'Add/Remove'
    // "Print Label"
  ];

  ngOnInit() {
    this.getAuthorityNames();
    this.healthDropDown();
    this.physicalClassDropDown();
    this.productLocationDropDown();
    this.getUserDetails();
    // this.loadProducts();
    // console.log(this.getChildren);
    // console.log(this.getChildren.name);
    // console.log(this.checklistSelection.selected);
  }

  onSelectParameter(event) {
    this.selectedSearchParameter = event.value;
    // console.log(this.selectedSearchParameter);
  }

  getAllAuthoritiesTest() {
    return this.locationService.getAllTopAuthorityNames().subscribe(
      res => {
        this.authorities = res;
        this.authArrayIds = res;
        this.authArrayIds.forEach(item => {});
      },
      error => {
        console.log('There was an error: ' + error);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.MyDataSource.filter = filterValue.trim().toLowerCase();
  }

  mfgFilter(mfgName) {
    var newArray: any = [];
    this.allProducts.filter(p => {
      if (p.mfg_name === mfgName) {
        console.log('mfgFilter ' + p.mfg_name + ' , ' + p.product_name);
        newArray.push(p);
      }
      this.MyDataSource = new MatTableDataSource();
      this.MyDataSource.data = newArray;
      this.MyDataSource.sort = this.sort;
      this.MyDataSource.paginator = this.paginator;
    });
  }

  openProductLocationPage(productId) {
    console.log('openProductLocationPage()' + productId);
    const dialogRef = this.dialog.open(ProductLocationComponent, {
      width: '1000px',
      data: {
        productId: productId
      }
    });

    // dialogRef.disableClose = true;
  }

  public doFilter = (value: string) => {
    this.MyDataSource.filter = value.trim().toLocaleLowerCase();
    // this.MyDataSource.filter1 = value.trim().toLocaleLowerCase();
  };

 
  // getAllProducts(searchString) {
  //   this.isLoading = true;

  //   this.productService.getAllProductsByAuthority(searchString).subscribe(
  //     res => {
  //       this.products = res;
  //       this.products.forEach(element => {
  //         this.allProducts.push(element);
  //       });
  //       this.MyDataSource = new MatTableDataSource();
  //       this.MyDataSource.data = this.allProducts;
  //       this.MyDataSource.sort = this.sort;
  //       this.MyDataSource.paginator = this.paginator;

  //       this.isLoading = false;
  //       this.searchResultIsEmpty = false;
  //     },
  //     error => {
  //       console.log('There was an error: ' + error);
  //       this.searchResultIsEmpty = true;
  //     }
  //   );
  // }
  productInventorySearch: ProductInventorySearch[];
  productParams: any = {};
// tslint:disable-next-line: member-ordering
  pagination: Pagination;

     // @Output() pageChanged = new EventEmitter();


  @Input() totalCount: number;
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() totalItems: number;
  @Input() totalPages: number[];
  @Input() pageIndex: number = 0;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() pageSize: number;
  @Input() nextPage: number;
  @Input() previousPage: number;


pageChanged(event: PageEvent) {

    this.totalItems = event.length;
    if (event.pageIndex === 0) {
      this.pageIndex = event.pageIndex;
    }

    if (event.pageIndex === 0 && event.previousPageIndex === 1) {
      this.pageIndex = event.pageIndex;
    }

    if (event.pageIndex === 1 && event.previousPageIndex === 0) {
      this.pageIndex = event.pageIndex + 1;
    }

    if (event.pageIndex > 1) {
      this.pageIndex = event.pageIndex;
    }

    this.nextPage = event.pageSize;
    // this.previousPage = event.previousPageIndex;

    // "{"currentPage":2,"itemsPerPage":10,"totalItems":217,"totalPages":22}"
    this.getAllProducts();

    // console.log('event: ' + event);
    // console.log('length: ' + event.length);
    // console.log('pageIndex: ' + event.pageIndex);
    // console.log('pageSize: ' + event.pageSize);
    // console.log('previousPageIndex: ' + event.previousPageIndex);

  }

  // inventoryPagination(currentPageNumber, pageSize) {
  //   currentPageNumber = 1;
  //   pageSize = this.pageSizeOptions[1];

  //   let findObj: searchCloudSDSObject = {
  //     msdsId: '',
  //     productName: '',
  //     productCode: '',
  //     mfgName: '',
  //     casNo: '',
  //     secondaryName: '',
  //     none: '',
  //     pageNumber: null,
  //     pageSize: null,
  //   };

  //   if (currentPageNumber === 1) {
  //     findObj.pageNumber = currentPageNumber; // 1 
  //     findObj.pageSize = this.pageSize; // 10
  //   }

  //   if (this.pageIndex > 1) {
  //     findObj.pageNumber = this.pageIndex; // > 1
  //     findObj.pageSize = this.nextPage; // 10
  //   }
  // }

  getAllProducts() {
    this.isLoading = true;
    this.hideButton = true;
    this.pageSize = this.pageSizeOptions[1];
    const currentPageNumber = 1;
    // this.pageIndex = 0;
    // this.paginator.pageIndex = 0;

    let findObj: searchCloudSDSObject = {
      msdsId: '',
      productName: '',
      productCode: '',
      mfgName: '',
      casNo: '',
      secondaryName: '',
      none: '',
      pageNumber: null,
      pageSize: null,
    };
    
      if (this.selectedSearchParameter === 'productName') {
        findObj.productName = this.searchString;
      }
      if (this.selectedSearchParameter === 'productCode') {
        findObj.productCode = this.searchString;
      } 
      if (this.selectedSearchParameter === 'manufacturer') {
        findObj.mfgName = this.searchString;
      }
      if (this.selectedSearchParameter === 'casNo') {
        findObj.casNo = this.searchString;
      }
      if (this.selectedSearchParameter === 'secondaryName') {
        findObj.secondaryName = this.searchString;
      }
      if (this.selectedParameter === 'none') {
        findObj.none = this.searchString;
      }

    if (currentPageNumber === 1 && this.pageIndex === 0) {
      findObj.pageNumber = currentPageNumber; // 1 
      findObj.pageSize = this.pageSize; // 10
    }

    if (this.pageIndex === 1) {
      findObj.pageNumber = this.pageIndex; // > 1
      findObj.pageSize = this.nextPage; // 10
    }

    if (this.pageIndex > 1) {
      findObj.pageNumber = this.pageIndex; // > 1
      findObj.pageSize = this.nextPage; // 10
    }

     let params = new URLSearchParams();

    if (this.healthHazardClassArray != null) {
      for (const constHealthClass of this.healthHazardClassArray) {
        params.append('healthHazardClass', constHealthClass);
      }
    }
    if (this.physicalHazardClassArray != null) {
      for (const constPhysicalClass of this.physicalHazardClassArray) {
        params.append('physicalHazardClass', constPhysicalClass);
      }
    }

    if (this.parentLocations.length !== 0) {
      params.append('locationId', this.parentLocations);
    }

    if (this.childLocations.length !== 0) {
      for (const childLocation of this.childLocations) {
        params.append('locationId', childLocation.authorityUnitId);
    }
    }

    if (this.selectedParameter === 'none' || this.searchString !== '') {
   return this.productService.findInventoryProducts(findObj, params).subscribe(

      (res: any) => {
      this.currentPage = JSON.parse(res.headers.get('pagination')).currentPage;
      this.itemsPerPage = JSON.parse(res.headers.get('pagination')).itemsPerPage; // pageSize
      this.totalItems = JSON.parse(res.headers.get('pagination')).totalItems; // length
      this.totalPages = JSON.parse(res.headers.get('pagination')).totalPages;
        // console.log('Info: ' + JSON.parse(res.headers.get('pagination')).totalPages);
        // console.log(res.headers.get('pagination'));
      // "{"currentPage":2,"itemsPerPage":10,"totalItems":217,"totalPages":22}"
        // console.log(res.body);
        this.parentLocations = [];
        this.childLocations = [];
        this.allProducts = [];
        this.healthHazardClassArray = [];
        this.physicalHazardClassArray = [];

        this.healthHazardClassArray = this.healthClassList;
        this.physicalHazardClassArray = this.physicalClassList;

        if (res == null) {
          this.isLoading = false;
          this.searchResultIsEmpty = false;
          this.hideButton = false;
          this.parentLocations = [];
        this.childLocations = [];
          this.healthHazardClassArray = [];
          this.physicalHazardClassArray = [];
          // this.getAllProducts();
        } else {
          this.products = res;
          // console.log(this.products.body);
          for (const response of this.products.body) {
            this.allProducts.push(response);
          }

          // this.products.body.forEach(element => {
          //   this.allProducts.push(element);
          // });
          // console.log('Products: ' + this.products);

          this.MyDataSource = new MatTableDataSource<Element>(res);
          // this.MyDataSource.data = this.allProducts;
          this.MyDataSource.data = res.body;
          // this.test = this.totalItems;

          // console.log(this.allProducts);
          this.MyDataSource.sort = this.sort;
          // this.MyDataSource.paginator = this.paginator;

          this.isLoading = false;
          this.searchResultIsEmpty = false;
          this.parentLocations = [];
          this.childLocations = [];
          this.healthHazardClassArray = [];
          this.physicalHazardClassArray = [];
        }
      },
      error => {
        console.log('There was an error: ' + error);
        this.searchResultIsEmpty = true;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.parentLocations = [];
        this.childLocations = [];
      }
    );
    }
    // this.isLoading = false;
  }

  searchForProducts(selectedValue: string) {
    this.allProducts = [];
    this.searchString = selectedValue;
    let searchObj: searchObject = {
      searchProductName: '',
      searchProductCode: '',
      searchMfgName: '',
      searchCasNumber: ''
    };

    // if(this.selectedSearchParameter === 'searchString') {
    //   findObj.searchString = '';
    // }
    if (this.selectedSearchParameter === 'productName') {
      searchObj.searchProductName = selectedValue;
    }
    if (this.selectedSearchParameter === 'productCode') {
      searchObj.searchProductCode = selectedValue;
    }
    if (this.selectedSearchParameter === 'manufacturer') {
      searchObj.searchMfgName = selectedValue;
    }
    if (this.selectedSearchParameter === 'casNo') {
      searchObj.searchCasNumber = this.searchString;
    }

    this.getAllProducts();
  }

  searchProductName(searchBoxProductName: string) {
    this.allProducts = [];
    this.searchString = searchBoxProductName;
    let searchObj: searchObject = {
      searchProductName: '',
      searchProductCode: '',
      searchMfgName: '',
      searchCasNumber: ''
    };

    searchObj.searchProductName = searchBoxProductName;
    searchObj.searchProductCode = '';
    searchObj.searchMfgName = '';
    // this.getSearchProducts();
    // this.getVendorProducts();
    // this.getVendorProductsNew(searchObj);
  }

  getAuthorityNames() {
    return this.userService.getAllTopAuthorities().subscribe(
      res => {
        this.authorities = res;
        this.authArrayIds = res;
        this.authArrayIds.forEach(item => {
          // console.log(item.rootAuthorityUnitId);
          // this.editClick(item.rootAuthorityUnitId);
        });
      },
      error => {
        console.log('There was an error: ' + error);
      }
    );
  }

  openProductCreationPage() {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '1000px'
    });

    dialogRef.disableClose = true;
  }

  openInventoryDetailPage(product) {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(InventoryDetailComponent, {
      width: '1000px',
      data: {
        row: product
      }
    });

    dialogConfig.data = {
      ref_id: product['ref_id'],
      msdsId: product['msds_id'],
      internal: product['internal']
    };
  }

  openDiaglogProductPage(row) {
    const dialogConfig = new MatDialogConfig();
    if (row['exemptionclassFlag'] == '1') {
      row['exemptionclassFlag'] = 'true';
    } else {
      row['exemptionclassFlag'] = 'false';
    }
    dialogConfig.data = {
      // product_name: row['product_name'],
      product_name: row['product_name'],
      mfg_name: row['mfg_name'],
      product_code: row['product_code'],
      cas_no: row['cas_no'],
      productAlias: row['productAlias'],
      health_authority: row['health_authority'],
      productNodes: row['productNote'], // not needed
      additionalSupplier: row['additionalSupplier'],
      whmisExempt: row['whmis_exempt'],
      last_verified: row['last_verified'],
      revision_date: row['revision_date'],
      date_added: row['date_added'],
      discontinued: row['discontinued'],
      secondaryName: row['secondaryName'],
      fromVendorApi: row['fromVendorAPI']
    };

    // const dialogRef = this.dialog.open(ProductPageComponent, dialogConfig);
    const dialogRef = this.dialog.open(ProductLocationComponent, dialogConfig);
    this.selectedProduct = row;
    // console.log("selected product " + this.selectedProduct.internal + ' cas ' + this.selectedProduct.cas_no);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  editClick(product) {
    // console.log("Edit was clicked hospitalName " + authority.hospitalLevelName);
    return this.productService
      .updateProductInfo(product.productId, product)
      .subscribe(
        res => {
          this.products = res;
          this.products.forEach(element => {
            this.allProducts.push(element);
          });

          this.MyDataSource = new MatTableDataSource();
          // this.MyDataSource.data = res;
          this.MyDataSource.data = this.allProducts;
          this.MyDataSource.sort = this.sort;
          this.MyDataSource.paginator = this.paginator;
          // this.authorityTree = res;
        },
        error => {
          console.log('There was an error: ' + error);
        }
      );
  }

  openInventoryEditPage(product) {
    const dialogRef = this.dialog.open(InventoryEditComponent, {
      width: '1000px',
      data: {
        product: product
      }
    });
  }

  // openDiaglogEdit(product) {
  //   //this.editClick(product.productId);
  //   const dialogRef = this.dialog.open(EditProductComponent, {
  //     data: {
  //       product: product
  //     }
  //   });
  //   // console.log("openDialogEdit topLevelName" + product.topLevelName);
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(result);
  //   });
  // }

  selectRow(row) {
    // console.warn(row);
    // console.log(row.productId);
    // this.openDiaglogProductPage(row);
  }

  // searchBoxClick(searchBoxValue: string) {
  //   // console.log("searchbox value " + searchBoxValue);
  //   this.searchString = searchBoxValue;
  //   this.getAllProducts(this.searchString);
  //   this.allProducts = [];
  // }

  searchBoxClick(searchBoxValue: string) {
    // console.log("searchbox value " + searchBoxValue);
    this.searchString = searchBoxValue;
    this.getAllProducts();
    this.allProducts = [];
  }
  
  // for(const singleProduct of this.selection.selected) {
  //   params.append('productId', singleProduct.productId.toString());
  //   console.log(singleProduct.productId);
  // }

  openExportList() {
      const dialogRef = this.dialog.open(ExportListComponent, {
        width: '1000px',
        data: {
          data: this.selection.selected
        }
      });   
  }

  healthHazardClassList = new FormControl({value: '', disabled: true}, [Validators.required]);
  healths;
  selectedHealthClass;
  healthClassList: number;
  healthHazardClassArray: any = [];

  onSelectedHealthHazardClass(selectedHealthClass) {
    this.allProducts = [];
    this.filterByHealthHazardClass(selectedHealthClass);
  }

  filterByHealthHazardClass(selectedHealthClass) {
    if (this.products.body) {
      if (this.products.body.length > 0 && this.selectedSearchParameter !== '' && selectedHealthClass !== null) {
        this.healthClassList = selectedHealthClass;
        this.healthHazardClassArray = this.healthClassList;
        this.model.healthClassId = this.healthClassList;
        return this.getAllProducts();
      }
    }  else {
      return null;
    }
  }

  healthDropDown() {
    return this.whmisService.getHealthClass().subscribe(res => {
      this.healthClass = res;
    });
  }

  physicalHazardClassList = new FormControl({value: '', disabled: true}, [Validators.required]);
  physicalClass: any;
  selectedPhysicalClass;
  physicalClassList: number;
  physicalHazardClassArray: any = [];

  onSelectedPhysicalHazardClass(selectedPhysicalClass) {
    this.allProducts = [];
    this.filterByPhysicalClass(selectedPhysicalClass);
  }

  filterByPhysicalClass(selectedPhysicalClass) {
    if (this.products.body) {
      if (this.products.body.length > 0 && this.selectedSearchParameter !== '' && selectedPhysicalClass.length !== 0) {
        this.physicalClassList = selectedPhysicalClass;
        this.physicalHazardClassArray = this.physicalClassList;
        this.model.physicalClassId = this.physicalClassList;
        return this.getAllProducts();
      }
      if (this.products.body.length === 0 && selectedPhysicalClass.length !== 0) {
        this.physicalClassList = selectedPhysicalClass;
        this.physicalHazardClassArray = this.physicalClassList;
        this.model.physicalClassId = this.physicalClassList;
        return this.getAllProducts();
      }
      if (this.products.body.length === 0 && selectedPhysicalClass.length === 0) {
        return this.getAllProducts();
      }
      if (this.products.body.length !== 0 && selectedPhysicalClass.length === 0) {
        return this.getAllProducts();
      }
    }  else {
      return null;
    }
  }

  physicalClassDropDown() {
    return this.whmisService.getPhysicalClass().subscribe(res => {
      this.physicalClass = res;
    });
  }

  productLocationDropDown() {
    return this.productService.productLocation().subscribe(res => {
      this.productLocation = res;
    });
  }

  getUserDetails() {
    return this.userService
      .getUserByEmail(this.authService.decodedToken.email)
      .subscribe(res => {
        this.userDetail = res;
        this.userDetailArray = this.userDetail;
      });
  }

  sdsRequest(row) {
    this.request.productName = row.product_name;
    this.request.manufacturer = row.mfg_name;
    this.request.productCode = row.product_code;

    for(const constCasNumber of row.cas_no) {
      this.request.casNumber = constCasNumber;
    }

    for (const userInfo of this.userDetailArray) {
      this.request.firstName = userInfo.firstName;
      this.request.lastName = userInfo.lastName;
      this.request.emailAddress = userInfo.emailAddress;
      this.request.phoneNumber = userInfo.phoneNumber;
    }

    return this.sendMailService.siteAdminSDSRequest(this.request).subscribe(
      res => {
        this.alertify.success('Successfully requested product');
      },
      error => {
        this.alertify.error('Request was not sent, please try again');
      }
    );
  }

  assignProduct() {
    var node = new TodoItemFlatNode();
    node: TodoItemFlatNode;

    if (this.selection.selected.length > 0 && this.products.body.length > 0 && this.nodeIsChecked) {

    var prompt = confirm('Do you want to assign these products to this/these locations?');
    if (prompt) {
    let params = new URLSearchParams();

    for (const selectedProduct of this.selection.selected) {
      params.append('productId', selectedProduct.productId.toString());
      // params.append('rootAuthorityUnitId', selectedProduct.rootAuthorityUnitId.toString())
    }

    params.append('rootAuthorityUnitId', this.parentLocations);

    for (const childLocation of this.childLocations) {
      params.append('rootAuthorityUnitId', childLocation.authorityUnitId);
    }
    // if(this.selection.selected.length === 0 || this.parentLocations.length === 0 || this.childLocations.length === 0) {
    //   this.alertify.warning('Please select a product and a location');
    //   return null;
    // } else {
      return this.productService.assignProductLocation(params).pipe(takeUntil(this.unsubscribe)).subscribe(
        res => {
          this.locations = res;
  
          this.alertify.success(`Successfully added to location`);
        },
        error => {
          this.alertify.error('Something went wrong, please try again!');
        }
      );
      // }
  }
}
  this.alertify.warning('Please select a product(s) and/or a location(s)');
  }

  backUpSDSFiles: any = [];

  backUp() {
    this.isLoading = true;
    let params = new URLSearchParams();
    this.backUpSDSFiles = [];
    // for (const product of this.model) {
    //   params.append('productId', product.productId);
    //   console.log(product.productId);
    // }

    for(const singleProduct of this.selection.selected) {
      params.append('productId', singleProduct.productId.toString());
      console.log(singleProduct.productId);
    }

    this.productService.createArchive(params).pipe(takeUntil(this.unsubscribe)).subscribe(
      blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Backup';
        link.click();
        this.alertify.success('Backup created');
        this.isLoading = false;
        this.hideButton = false;
        this.backUpSDSFiles = [];
      },
      error => {
        this.alertify.error('Something went wrong, please try again');
        this.isLoading = false;
        this.hideButton = false;
        this.backUpSDSFiles = [];
      }
    );
  }
  // ===================================Material Tree ================================ //
  
  locationsFromResponse: any = [];
  location: TodoItemNode[] = [];
  parentLocations: any = [] = [];
  childLocations: any = [] = [];
  unsubscribe = new Subject<void>();
  nodeIsChecked: any;

  selection = new SelectionModel<InventoryModel>(true, []);


  
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
    if (this.products.body) {
      this.isAllSelected()
      ? this.selection.clear()
      : this.MyDataSource.data.forEach(row => this.selection.select(row));
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: InventoryModel): string {
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

  getTopLocations() {
    return this.locationService.locationHiararchy().pipe(takeUntil(this.unsubscribe)).subscribe(res => {
      this.locationsFromResponse = res;
      this.location = this.locationsFromResponse;

      this.dataSource.data = this.location;
      // this.dataChange.next(data);
      // const data = this.buildFileTree(this.location, 0);
      this.dataChange.value.push(this.locationsFromResponse);

      this.dataChange.next(this.location);
      // this.dataChange.next(data);
      // this.dataChange.next(this.data);
    });
  }

  get data(): TodoItemNode[] {
    return this.dataChange.value;
  }

  clickedActive(element) {
    element.checked = !element.checked;
    console.log(element.checked);
  }

  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  // tslint:disable-next-line: member-ordering
  flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  // tslint:disable-next-line: member-ordering
  nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

  /** A selected parent node to be inserted */
  // tslint:disable-next-line: member-ordering
  selectedParent: TodoItemFlatNode | null = null;

  /** The new item's name */
  // tslint:disable-next-line: member-ordering
  newItemName = '';

  // tslint:disable-next-line: member-ordering
  treeControl: FlatTreeControl<TodoItemFlatNode>;

  // tslint:disable-next-line: member-ordering
  treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

  // tslint:disable-next-line: member-ordering
  dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TodoItemFlatNode>(true);

  // model = {
  //   name: '',
  //   rootAuthorityUnitId: null,
  //   parentAuthorityUnitId: null
  // };

  // updateModel = {
  //   name: '',
  //   authorityUnitId: null,
  //   rootAuthorityUnitId: null,
  //   parentAuthorityUnitId: null
  // };

  getLevel = (node: TodoItemFlatNode) => node.level;

  levelsExist = (node: TodoItemNode) => node.exists;

  isExpandable = (node: TodoItemFlatNode) => node.expandable;

  getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

  hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
    _nodeData.item === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TodoItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.item === node.name
        ? existingNode
        : new TodoItemFlatNode();
    flatNode.item = node.name;
    flatNode.level = level;
    flatNode.authorityUnitId = node.authorityUnitId;
    flatNode.parentAuthorityUnitId = node.parentAuthorityUnitId;
    flatNode.rootAuthorityUnitId = node.rootAuthorityUnitId;
    if (node.hasChild) {
      flatNode.expandable = true;
    } else {
      flatNode.expandable = false;
    }

    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  dataChange = new BehaviorSubject<TodoItemNode[]>([]);
  itemSelected: boolean;

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    // console.log(descendants);
    if(descendants.length === 0) {
      return this.checklistSelection.isSelected(node);
    }

    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    // console.log('CheckList Toggle: ' + this.checklistSelection.toggle(node));
    // console.log(descendants.values);
    // console.log(node.item);
    // console.log(node.authorityUnitId);
    // console.log('Selected 1056: ' + this.checklistSelection.selected);
    // const selected = this.checklistSelection.selected;
    // selected.forEach((node: TodoItemFlatNode) => {
    //   console.log(node);
    //   console.log(selected);
    // });    // for(cons test of selected) {
    //   console.log();
    // }
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    // console.log(result);

    return result && !this.descendantsAllSelected(node);
  }

  filterByProductLocation(authorityUnitId, descendants) {
    if (this.products.body) {
      if (this.products.body.length > 0 && this.nodeIsChecked && this.selection.selected.length === 0) {
        this.parentLocations = authorityUnitId;
        this.childLocations = descendants;
        return this.getAllProducts();
      }
      if (this.products.body.length > 0 && !this.nodeIsChecked && this.selection.selected.length === 0) {
        this.parentLocations = [];
        this.childLocations = [];
        return this.getAllProducts();
      }
    } else {
      return null;
    }
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TodoItemFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);
    this.checkAllParentsSelection(node);
    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
    node.checked = !node.checked;
    this.nodeIsChecked = node.checked;

    // ==> node will give me the parent which has the expandable //
    // console.log(node);
    // console.log(node.authorityUnitId);

      this.parentLocations = [];
      this.childLocations = [];
      this.allProducts = [];

      this.parentLocations = node.authorityUnitId;
      this.childLocations = descendants;

    this.filterByProductLocation(node.authorityUnitId, descendants);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
    // console.log('This => ' + node.item);
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);

    this.parentLocations = [];
    this.childLocations = [];
    // this.getAllProducts();
    // console.log(this.checkAllParentsSelection(node));
    // console.log(node);
    // console.log(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TodoItemFlatNode): void {
    let parent: TodoItemFlatNode | null = this.getParentNode(node);
    // console.log(parent);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
    this.parentLocations = [];
    this.childLocations = [];
    // this.getAllProducts();
    // console.log(parent);
    // console.log(node);
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TodoItemFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    // console.log(nodeSelected);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    // console.log(node);
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }

    // console.log(this.checklistSelection.select(node));
    // console.log('node: ' + node);
    // console.log('nodeSelected: ' + nodeSelected);

    // this.parentLocations = [];
    // this.childLocations = [];
    // this.getAllProducts();
  }

  /* Get the parent node of a node */
  getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
    // console.log('This => ' + node.item);

    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return null;
    }
    // console.log(currentLevel);
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    // console.log(startIndex);
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      // console.log('CurrentNode: ' + currentNode.authorityUnitId);
      // console.log('CurrentNode2: ' + currentNode.item);
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}

export interface ProductInterface {
  product_name: string;
  mfg_name: string;
  secondaryName: string;
  product_code: string;
  cas_no: string;
  productAlias: string;
  productNodes: string;
  additionalSupplier: string;
  exemptionclassFlag: string;
  internal: string;
}

export interface searchCloudSDSObject {
  msdsId: string;
  productName: string;
  productCode: string;
  mfgName: string;
  casNo: string;
  secondaryName: string;
  none: string;
  pageNumber: number;
  pageSize: number;
}

export interface searchObject {
  searchProductName: string;
  searchProductCode: string;
  searchMfgName: string;
  searchCasNumber: string;
}

export interface InventoryModel {
  productId: number;
  rootAuthorityUnitId: number;
  product_name: string;
  mfg_name: string;
  product_code: string;
  addedToInventory: boolean;
  revision_date: string;
  last_verified: string;
  discontinued: boolean;
  whmis_exempt: boolean;
  position: number;
}
