import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ManufacturerService } from 'src/app/_service/manufacturer.service';

@Component({
  selector: 'manufacturerfilter',
  templateUrl: './manufacturerfilter.component.html',
  styleUrls: ['./manufacturerfilter.component.css']
})
export class ManufacturerfilterComponent implements OnInit {

  constructor(private manufacturerService: ManufacturerService) { }

searchTerm: FormControl = new FormControl();
myList = <any>[];

  manufacturerList = new FormControl();
  manufacturers;
  manufacturerArray;
  selected;

  // ngOnInit() {
  //   this.searchTerm.valueChanges.subscribe(
  //     searchString => {
  //       if (searchString !== '') {
  //         this.manufacturerService.manufacturerInformation(searchString).subscribe(
  //           data => {
  //             this.myList = data as unknown as any[];
  //           });
  //       }
  //     });
  //     console.log(this.searchTerm.value);
  //   // this.manufacturerDropDown();
  // }

  ngOnInit(){}
  
  onSelectManufacturers(selected) {
    this.myList = selected.toString().split(',');
    console.log(this.myList);
  }

  // manufacturerDropDown() {
  //   return this.manufacturerService.manufacturerInformation().subscribe(res => {
  //     this.manufacturers = res;
  // });
  // }

}
