import { ApiService } from "./api.service";
import { Component, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ValidatorFn, AbstractControl, FormControl} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { catchError, map, tap,startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';

@Injectable() 
export class Service {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.httpClient.get<any>('https://jsonplaceholder.typicode.com/users')
  }

}


@Component({
  selector: "productalias",
  templateUrl: "./productalias.component.html"
})
export class ProductAliasComponent {
  quiz = {}  ;
  productAlias;
  // constructor(private api: ApiService) {}

  ngOnInit() {
         this.api.getProductAlias().subscribe(res => {
            this.productAlias = res;
        });
        console.log("On init " + this.productAlias);
  }

  getProduct()
  {
    console.log("get product ");
    console.log(this.productAlias)  ;
    return this.productAlias;
  }

  myControl = new FormControl();
  filteredOptions: Observable<any[]>;

  constructor(private api: ApiService, private service: Service) { 

  this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(null),
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(val => {
            return this.filter(val || '')
          })       
        );
  }

  filter(val: string): Observable<any[]> {
    return this.service.getUsers()
    .pipe(
      map(response => response.filter(option => { 
        return option.name.toLowerCase().indexOf(val.toLowerCase()) === 0
      }))
    )
  }
}