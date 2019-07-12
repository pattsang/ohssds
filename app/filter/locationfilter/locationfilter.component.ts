import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocationService } from 'src/app/_service/location.service';

@Component({
  selector: 'locationfilter',
  templateUrl: './locationfilter.component.html',
  styleUrls: ['./locationfilter.component.css']
})
export class LocationfilterComponent implements OnInit {

  constructor(
    private locationService: LocationService) { }

  ngOnInit() {
    this.locationDropDown();
  }

  locationList = new FormControl();
  locations;
  locationArray;
  selected;


  onSelectLocation(selected) {
    
    this.locationArray = selected.toString().split(',');
    console.log(this.locationArray);
    
  }
  
  locationDropDown() {
    return this.locationService.getLocationDropDown().subscribe(res => {
      this.locations = res;
  });
  }
}
