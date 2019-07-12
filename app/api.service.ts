import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiService {
 //baseUrl = environment.apiUrl;
  baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

  private selectedProduct = new Subject<any>();
  productSelected = this.selectedProduct.asObservable();
  

  constructor(private http: HttpClient) {}

  getProductAlias() {
    return this.http.get(this.baseUrl + `productalias/`);
  }

  getCompanies() {
    return this.http.get(this.baseUrl + `manufacturers/`);
  }

  searchProducts(searchString) {
    // console.log(this.baseUrl + `products/search?searchString=${searchString}`);
    return this.http.get(this.baseUrl + `products/search?=${searchString}`);
  }

  selectProduct(product) {
    this.selectedProduct.next(product);
    // console.log("selectProduct was called with value " + product.productName);
  }

  getProducts(){
    return this.http.get(this.baseUrl + 'products/getAllProducts')
  }
  
  assignProductLocation(model: any){
    // console.log('url for posting in assignProductLocation' +this.baseUrl + 'products/assignProductToLocation');
    return this.http.post(this.baseUrl + 'products/assignProductToLocation',  model);
  }
  
  insertProductLocation(model: any) {
    console.log("insert product location");
  }

}
