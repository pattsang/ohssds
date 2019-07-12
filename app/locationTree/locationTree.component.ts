import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationService } from '../_service/location.service';
import { ProductService } from '../_service/product.service';
import { AuthoritytreeService } from '../_service/authoritytree.service';
import { MatCheckbox } from '@angular/material';

@Component({
  selector: 'app-locationTree',
  templateUrl: './locationTree.component.html',
  styleUrls: ['./locationTree.component.css']
})
export class LocationTreeComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private locationService: LocationService,
    private authorityTreeService: AuthoritytreeService
  ) {}

  locationTreeArray: number;
  locationTree: any;
  level1TreeArray: number;
  level1Tree: any;
  model: any;

  ngOnInit() {
    this.locationCheckBoxes();
  }

  locationCheckBoxes() {
    return this.authorityTreeService.getLocationCheckBoxes().subscribe(res => {
      this.locationTree = res;
    });
  }

  onSelectedLocationTree(checkbox: MatCheckbox, model: { authorityUnitId: number }) {
    this.model.authorityUnitId = model.authorityUnitId;
    this.locationTreeArray = model.authorityUnitId;
  }

}
