import { Component, OnInit } from '@angular/core';
import { ApiService } from "../api.service";

@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {
  companies;
  isLoading = false;
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.isLoading = true;
    this.api.getCompanies().subscribe(res => {
      this.isLoading = false;
      this.companies = res; });
  }

  getCompanies(searchString)
  {
    console.log("get companies ");
    console.log(this.companies)  ;
    return this.companies;
  }
}
