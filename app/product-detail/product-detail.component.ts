import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from "../api.service";
import { TreeCheckboxComponent} from '../tree-checkbox/tree-checkbox.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() row;
  @Input() rowSelected;
  product = {
    ProductName: '',
    ProductCode: '',
    ManufacturerName: '',
    CasNumber: '',
    ProductAlias: '',
    AdditionalSupplier: ''
  };
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.productSelected.subscribe(
      (product) => {
        this.product = product
        //console.log('product is: ' + this.product.productName)
      }
      );
    console.log("in product details, selected product name" + this.product.ProductName);
    //rowSelected will tell us if a row has been clicked in parent component product-list,
    // only set value if a row selected
    //console.log("product details ngOnInit value of rowSelected " + this.rowSelected);
    // if (this.rowSelected){
    //   this.api.productSelected.subscribe(product => this.product = product);
    //   console.log("selected product name" + this.product.productName);
    // }
     
     
  }

}
