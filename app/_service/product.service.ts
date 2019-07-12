import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { ProductInventorySearch } from '../_models/ProductInventorySearch';
import { Product } from '../_models/product';
import { PaginationService } from './pagination.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   //baseUrl = environment.apiUrl;
    baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

  constructor(private http: HttpClient, private paginationService: PaginationService) {}

  searchProducts(searchString) {
    return this.http.get(
      this.baseUrl + `products/search?searchString=${searchString}`
    );
  }

  searchVendorProducts(searchString) {
    return this.http.get(
      this.baseUrl + `products/vendorSearch?searchString=${searchString}`
    );
  }

  searchVendorProductsNew(searchProductName, searchProductCode, searchMfgName) {
    return this.http.get(
      this.baseUrl +
// tslint:disable-next-line: max-line-length
        `products/vendorSearchNew?searchProductName=${searchProductName}&searchProductCode=${searchProductCode}&searchMfgName=${searchMfgName}`
    );
  }

  getAllProductsByAuthority(searchString) {
    return this.http.get(
      this.baseUrl + `products/GetAllInventoryProducts?searchString=${searchString}`
    );
  }

  createProduct(product: any) {
    return this.http.post(this.baseUrl + 'products/create', product);
  }

  updateProductInfo(id: string, model: any): Observable<any> {
    return this.http.put(this.baseUrl + 'products/' + id, model, {
      responseType: 'json'
    });
  }

  removeProductLocation(
    productId: number,
    rootAuthorityUnitId: number,
    productAuthorityId: number
  ) {
    return this.http.post(this.baseUrl + 'products/RemoveProductFromLocation', {
      productId,
      rootAuthorityUnitId,
      productAuthorityId
    });
  }

  productCasNumberFilter() {
    return this.http.get(this.baseUrl + 'products/productCasNumbers');
  }

  getPDF(productId: number): Observable<any> {
    return this.http.get(this.baseUrl + 'products/GetSDSPDF/' + productId, {
      responseType: 'blob' as 'json'
    });
  }

  getCloudSDS(searchString): Observable<any> {
    return this.http.get(this.baseUrl + `products/sdsdoc?searchString=${searchString}`, {
      responseType: 'blob' as 'json'
    });
  }

  createMultipleArchives(): Observable<any> {
    return this.http.get(this.baseUrl + 'products/createMultipleBackup', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob'
    });
  }

  createArchive(productId: any): Observable<any> {
   console.log(productId);
    return this.http.post(this.baseUrl + `products/CreateBackUp?${productId}`, productId, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'blob'
    });
  }
  
  getProductbyId(id: number) {
    return this.http.get(this.baseUrl + 'products/' + id);
  }
  getRelatedProductsById(id: number) {
    return this.http.get(this.baseUrl + 'products/getrelatedProducts/' + id);
  }

  searchSDSProducts(searchString) {
    return this.http.get(
      this.baseUrl + `products/searchSDS?searchString=${searchString}`
    );
  }

  findProducts(model: any, locationId: any) {
    return this.http.post(this.baseUrl + `products/FindProducts?${locationId}`, model, {observe: 'response'});
  }

  findInventoryProducts(model: any, locationId: any) {
    return this.http.post(this.baseUrl + `products/GetAllInventoryProducts?${locationId}`, model, {observe: 'response'});
  }

  createSecondaryName(id: number, model: any) {
    return this.http.post(this.baseUrl + `products/createSecondaryName/` + id, model);
  }

  updateSecondaryName(id: number, model: any) {
    return this.http.put(this.baseUrl + 'products/UpdateSecondaryName/' + id, model);
  }

  productLocation() {
    return this.http.get(this.baseUrl + 'products/ProductLocationDropDown');
  }

  getinventoryProductDetail(productId: number) {
    return this.http.get(this.baseUrl + 'products/GetInventoryProductDetail/' + productId);
  }

  assignProductLocation(model: any){
    return this.http.post(this.baseUrl + `products/AssignProductToLocation?${model}`,  model);
  }
}
