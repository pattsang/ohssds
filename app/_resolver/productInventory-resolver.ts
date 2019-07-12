import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ProductInventorySearch } from '../_models/ProductInventorySearch';
import { ProductService } from '../_service/product.service';
import { Route } from '@angular/compiler/src/core';
import { AlertifyService } from '../_service/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// @Injectable()

// export class ProductInventoryResolver implements Resolve<ProductInventorySearch[]> {
//     pageNumber = 1;
//     pageSize = 5;

//     constructor(
//         private productService: ProductService,
//         private router: Router,
//         private alertify: AlertifyService
//     ) {}

//     // resolve(route: ActivatedRouteSnapshot): Observable<ProductInventorySearch[]> {
//     //     return this.productService.findInventoryProducts(this.pageNumber, this.pageSize).pipe(
//     //         catchError(error => {
//     //             this.alertify.error('Problem retrieving data');
//     //             this.router.navigate(['/search']);
//     //             return of(null);
//     //         })
//     //     );
//     // }
// }
