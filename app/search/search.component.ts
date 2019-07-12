import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent, MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { UserService } from '../_service/user.service';
import { ProductService } from '../_service/product.service';
import { AlertifyService } from '../_service/alertify.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { ProductPageComponent } from './product-page/product-page.component';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { LocationService } from '../_service/location.service';
import { Whmis2015Service } from '../_service/whmis2015.service';


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
  selector: "search",
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  locations = [];
  pname = 'product_name';
  searchString;
  searchResultIsEmpty = true;
  constructor(
    private userService: UserService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private http: HttpClient,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private locationService: LocationService,
    private whmisService: Whmis2015Service
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

  MyDataSource: any;
  MyDataSource1: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  isLoading = false;
  hideButton = false;
  selectedSearchDropDown: any;

  // search parameters
  model: any;
  searchParms: any = [];
  products: any = [];
  vendorProducts: any = [];
  allProducts: any = [];
  selectedProduct;
  displayedColumns: string[] = [
    'Product',
    'Manufacturer',
    'Revised',
    'Product Code'
    // "SDS",
    // "Print Label"
  ];

  foods: Food[] = [
    { value: '1', viewValue: 'Product Name' },
    { value: '2', viewValue: 'Product Code' },
    { value: '3', viewValue: 'Manufacturer Name' },
    { value: '4', viewValue: 'Cas No.' }
  ];

  applyFilter(filterValue: string) {
    this.MyDataSource.filter = filterValue.trim().toLowerCase();
    this.MyDataSource1.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    // this.getAllUsers();
    // this.searchProducts();
    this.getAuthorityNames();
    this.healthDropDown();
    this.physicalClassDropDown();
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  openDiaglogProductPage(row) {
    const dialogConfig = new MatDialogConfig();
    if (row['exemptionclassFlag'] == '1') {
      row['exemptionclassFlag'] = 'true';
    } else {
      row['exemptionclassFlag'] = 'false';
    }
    dialogConfig.data = {
      productId: row['productId'],
      product_name: row['product_name'],
      mfg_detail: row['mfg_detail'],
      product_code: row['product_code'],
      cas_no: row['cas_no'],
      productAlias: row['productAlias'],
      productNodes: row['productNote'],
      additionalSuppliers: row['additionalSuppliers'],
      exempt: row['exempt'],
      ref_id: row['ref_id'],
      msdsId: row['msds_id'],
      internal: row['internal']
    };

    const dialogRef = this.dialog.open(ProductPageComponent, dialogConfig);
    this.selectedProduct = row;
    // console.log("selected product " + this.selectedProduct.internal + ' cas ' + this.selectedProduct.cas_no);

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
    });
  }

  openDiaglogProductPage1(row) {
    const dialogConfig = new MatDialogConfig();
    if (row['exemptionclassFlag'] == '1') {
      row['exemptionclassFlag'] = 'true';
    } else {
      row['exemptionclassFlag'] = 'false';
    }
    dialogConfig.data = {
      productId: row['productId'],
      product_name: row['product_name'],
      mgf_detail: row['mfg_detail'],
      product_code: row['product_code'],
      cas_no: row['cas_no'],
      productAlias: row['productAlias'],
      productNodes: row['productNote'],
      additionalSuppliers: row['additionalSuppliers'],
      exempt: row['exempt'],
      limit_val: row['limit_val'],
      ref_id: row['ref_id'],
      msdsId: row['msds_id'],
      internal: row['internal']
    };

    const dialogRef = this.dialog.open(ProductPageComponent, dialogConfig);
    this.selectedProduct = row;
    console.log('selected product ' + this.selectedProduct.limit_val);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  // getSearchProducts() {
  //   this.isLoading = true;
  //   var products:any = [];
  //   this.productService.searchProducts(this.searchString).subscribe(
  //     res => {
  //       this.products = res;
  //       this.products.forEach(element => {
  //         this.allProducts.push(element);
  //       });
  //       //console.log('getsearchprod result ' + products.length);

  //       this.MyDataSource = new MatTableDataSource();
  //       this.MyDataSource.data = this.allProducts;
  //       this.MyDataSource.sort = this.sort;
  //       this.MyDataSource.paginator = this.paginator;

  //       //this.isLoading = false;
  //       // for(var i =0; i< products.length; i++){
  //       //   console.log(products[i].product_name + ' || ' + products[i].manufacturerName + ' || ' + products[i].revisionDate);

  //       // }
  //       this.isLoading = false;
  //       this.searchResultIsEmpty = false;
  //     },
  //     error => {
  //       console.log("There was an error: " + error);
  //       this.searchResultIsEmpty = true;
  //     }
  //   );
  // }

  getVendorProductsNew(searchObj) {
    this.isLoading = true;
    var products: any = [];
    // tslint:disable-next-line: max-line-length
    this.productService
      .searchVendorProductsNew(
        searchObj.searchProductName,
        searchObj.searchProductCode,
        searchObj.searchMfgName
      )
      .subscribe(
        res => {
          this.vendorProducts = res;
          this.vendorProducts.forEach(element => {
            this.allProducts.push(element);
          });

          this.MyDataSource1 = new MatTableDataSource();
          this.MyDataSource1.data = this.vendorProducts;
          // this.MyDataSource1.data = res;
          this.MyDataSource1.sort = this.sort;
          this.MyDataSource1.paginator = this.paginator;

          this.MyDataSource = new MatTableDataSource();
          this.MyDataSource.data = this.allProducts;
          this.MyDataSource.sort = this.sort;
          this.MyDataSource.paginator = this.paginator;
          this.isLoading = false;

          this.allProducts.forEach(element => {
            console.log('combine array ' + element.product_name);
          });

          this.searchResultIsEmpty = false;
        },
        error => {
          console.log('There was an error: ' + error);
          this.searchResultIsEmpty = true;
        }
      );
  }

  getVendorProducts() {
    this.isLoading = true;
    var products: any = [];
    this.productService.searchVendorProducts(this.searchString).pipe(takeUntil(this.unsubscribe)).subscribe(
      res => {
        this.vendorProducts = res;
        this.vendorProducts.forEach(element => {
          this.allProducts.push(element);
        });
        // console.log('getVendorProducts result ' + products.length);

        this.MyDataSource1 = new MatTableDataSource();
        this.MyDataSource1.data = this.vendorProducts;
        // this.MyDataSource1.data = res;
        this.MyDataSource1.sort = this.sort;
        this.MyDataSource1.paginator = this.paginator;

        this.MyDataSource = new MatTableDataSource();
        this.MyDataSource.data = this.allProducts;
        this.MyDataSource.sort = this.sort;
        this.MyDataSource.paginator = this.paginator;
        this.isLoading = false;

        this.allProducts.forEach(element => {
          console.log('combine array ' + element.product_name);
        });

        this.searchResultIsEmpty = false;
      },
      error => {
        console.log('There was an error: ' + error);
        this.searchResultIsEmpty = true;
      }
    );
  }


  healthHazardClassList = new FormControl({value: '', disabled: true}, [Validators.required]);
  healths;
  healthClass: any;
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
        return this.searchProducts();
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
        return this.searchProducts();
      }
      if (this.products.body.length === 0 && selectedPhysicalClass.length !== 0) {
        this.physicalClassList = selectedPhysicalClass;
        this.physicalHazardClassArray = this.physicalClassList;
        this.model.physicalClassId = this.physicalClassList;
        return this.searchProducts();
      }
      if (this.products.body.length === 0 && selectedPhysicalClass.length === 0) {
        return this.searchProducts();
      }
      if (this.products.body.length !== 0 && selectedPhysicalClass.length === 0) {
        return this.searchProducts();
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

  selectedSearchParameter;
  selectFormControl = new FormControl('', Validators.required);
  selectedParameter = 'allProducts';

  onSelectParameter(event) {
    this.selectedSearchParameter = event.value;
    console.log(this.selectedSearchParameter);
  }

  
  searchForProducts(selectedValue: string) {
    this.allProducts = [];
    this.searchString = selectedValue;
    let searchObj: searchObject = {
      searchProductName: '',
      searchProductCode: '',
      searchMfgName: '',
    };
    if(this.selectedSearchParameter === 'productName') {
      searchObj.searchProductName = selectedValue;
    }
    if(this.selectedSearchParameter === 'productCode') {
      searchObj.searchProductCode = selectedValue;
    }
    if(this.selectedSearchParameter === 'manufacturer') {
      searchObj.searchMfgName = selectedValue;
    }
    this.searchProducts();
  }

  searchProductName(searchBoxProductName: string) {
    this.allProducts = [];
    this.searchString = searchBoxProductName;
    let searchObj: searchObject = {
      searchProductName: '',
      searchProductCode: '',
      searchMfgName: ''
    };

    searchObj.searchProductName = searchBoxProductName;
    searchObj.searchProductCode = '';
    searchObj.searchMfgName = '';
    // this.getSearchProducts();
    this.searchProducts();
    // this.getVendorProducts();
    // this.getVendorProductsNew(searchObj);
  }

  searchProductCode(searchBoxProductCode: string) {
    this.allProducts = [];
    this.searchString = searchBoxProductCode;
    let searchObj: searchObject = {
      searchProductName: '',
      searchProductCode: '',
      searchMfgName: ''
    };

    searchObj.searchProductName = '';
    searchObj.searchProductCode = searchBoxProductCode;
    searchObj.searchMfgName = '';

    this.searchProducts();
    // this.getSearchProducts();
    // this.getVendorProducts();
    // this.getVendorProductsNew(searchObj);
  }

  searchManufacturer(searchBoxManufacturer: string) {
    this.allProducts = [];
    this.searchString = searchBoxManufacturer;
    let searchObj: searchObject = {
      searchProductName: '',
      searchProductCode: '',
      searchMfgName: ''
    };

    searchObj.searchProductName = '';
    searchObj.searchProductCode = '';
    searchObj.searchMfgName = searchBoxManufacturer;

    this.searchProducts();
    // this.getSearchProducts();
    // this.getVendorProducts();
    // this.getVendorProductsNew(searchObj);
  }

  searchBoxClick(searchBoxValue) {
    this.allProducts = [];
    this.searchString = searchBoxValue;
    this.searchProducts();

    // this.getSearchProducts();
    // this.getVendorProducts();
  }

  public doFilter = (value: string) => {
    this.MyDataSource.filter = value.trim().toLocaleLowerCase();
    // this.MyDataSource.filter1 = value.trim().toLocaleLowerCase();
  };

  public doFilter1 = (value: string) => {
    this.MyDataSource1.filter = value.trim().toLocaleLowerCase();
    // this.MyDataSource.filter1 = value.trim().toLocaleLowerCase();
  };

  selectRow(row) {
    // console.log(row);
    this.openDiaglogProductPage(row);
  }

  selectRow1(row) {
    console.log(row);
    this.openDiaglogProductPage1(row);
  }

  authorities;
  authArrayIds: any = [];

  getAuthorityNames() {
    return this.userService.getAllTopAuthorities().subscribe(
      res => {
        this.authorities = res;
        this.authArrayIds = res;
        this.authArrayIds.forEach(item => {
        });
      },
      error => {
        console.log('There was an error: ' + error);
      }
    );
  }

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
    this.searchProducts();
  }

  searchProducts() {
    this.isLoading = true;
    this.hideButton = true;
    var products: any = [];
    this.pageSize = this.pageSizeOptions[1];
    const currentPageNumber = 1;

    let findObj: searchCloudSDSObject = {
      msdsId: '',
      productName: '',
      productCode: '',
      mfgName: '',
      casNo: '',
      allProducts: '',
      pageNumber: null,
      pageSize: null,
    };

    if(this.selectedParameter === 'productName') {
      findObj.productName = this.searchString;
    }
      if(this.selectedSearchParameter === 'productCode') {
        findObj.productCode = this.searchString;
      }
      if(this.selectedSearchParameter === 'manufacturer') {
        findObj.mfgName = this.searchString;
      }
      if(this.selectedSearchParameter === 'casNo') {
        findObj.casNo = this.searchString;
      }
      if(this.selectedSearchParameter === 'allProducts') {
        findObj.allProducts = this.searchString;
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

      if (this.selectedParameter === 'allProducts' || this.searchString !== '') {
    // findProducts combined result from local database and cloudsds
    return this.productService.findProducts(findObj, params).pipe(takeUntil(this.unsubscribe)).subscribe(
      (res: any) => {
        this.currentPage = JSON.parse(res.headers.get('pagination')).currentPage;
        this.itemsPerPage = JSON.parse(res.headers.get('pagination')).itemsPerPage; // pageSize
        this.totalItems = JSON.parse(res.headers.get('pagination')).totalItems; // length
        this.totalPages = JSON.parse(res.headers.get('pagination')).totalPages;

        this.model = res;
        if (res == null) {
          this.isLoading = false;
          this.searchResultIsEmpty = false;
          this.hideButton = false;
        } else {
          this.products = res;

          for (const response of this.products.body) {
            this.allProducts.push(response);
          }

          this.MyDataSource = new MatTableDataSource<Element>(res);
          // this.MyDataSource.data = this.allProducts;
          this.MyDataSource.data = res.body;
          this.MyDataSource.sort = this.sort;
          // this.MyDataSource.paginator = this.paginator;

          this.isLoading = false;
          // this.hideButton = false;
          this.searchResultIsEmpty = false;
        }
      },
      error => {
        console.log('There was an error: ' + error);
        this.searchResultIsEmpty = true;
        this.isLoading = false;
        // this.hideButton = false;
      },
      () => {
        this.isLoading = false;
        // this.hideButton = false;
      }
    );

  }
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  backUp() {
    this.isLoading = true;

    let params = new URLSearchParams();

    for (const product of this.model) {
      params.append('productId', product.productId);
      console.log(product.productId);
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
      },
      error => {
        this.alertify.error('Something went wrong, please try again');
        this.isLoading = false;
        this.hideButton = false;
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
 
   selection = new SelectionModel<SearchSDSModel>(true, []);
 
 
   
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
   checkboxLabel(row?: SearchSDSModel): string {
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
         return this.searchProducts();
       }
       if (this.products.body.length > 0 && !this.nodeIsChecked && this.selection.selected.length === 0) {
         this.parentLocations = [];
         this.childLocations = [];
         return this.searchProducts();
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
  product_code: string;
  cas_no: string;
  productAlias: string;
  productNodes: string;
  additionalSupplier: string;
  exemptionclassFlag: string;
  internal: string;
}

export interface searchObject {
  searchProductName: string;
  searchProductCode: string;
  searchMfgName: string;
}

export interface searchCloudSDSObject {
  msdsId: string;
  productName: string;
  productCode: string;
  mfgName: string;
  casNo: string;
  allProducts: string;
  pageNumber: number;
  pageSize: number;
}

export interface Food {
  value: string;
  viewValue: string;
}

export interface SearchSDSModel {
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