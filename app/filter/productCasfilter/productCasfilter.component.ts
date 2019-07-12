import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/_service/product.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'productCasfilter',
  templateUrl: './productCasfilter.component.html',
  styleUrls: ['./productCasfilter.component.css']
})
export class ProductCasfilterComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.casNumberDropDown();
  }

  
  casNumberList = new FormControl();
  casNumbers;
  casNumberArray;
  selected;


  onSelectCasNumber(selected) {
    
    this.casNumberArray = selected.toString().split(',');
    console.log(this.casNumberArray);
    
  }
  
  casNumberDropDown() {
    return this.productService.productCasNumberFilter().subscribe(res => {
      this.casNumbers = res;
  });
  }
}
