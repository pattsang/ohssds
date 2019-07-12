import { ManufacturerService } from 'src/app/_service/manufacturer.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-manufacturer',
  templateUrl: './create-manufacturer.component.html',
  styleUrls: ['./create-manufacturer.component.css']
})
export class CreateManufacturerComponent implements OnInit {

model: any = {};
selected: number;
selectedContactInfo: number;

locationArray: number;

ContactLocationFormControl = new FormControl();
  ContactLocationGroups: ContactLocationGroup[] = [
    {
      name: 'Contact Location',
      contactLocation: [
        {value: '0', viewValue: 'Unknown'},
        {value: '1', viewValue: 'Canada'},
        {value: '2', viewValue: 'USA'},
        {value: '3', viewValue: 'Europe'},
        {value: '4', viewValue: 'Other'}
      ]
    }
  ];

   onSelectContactLocation(selectedContactInfo) {
    this.locationArray = selectedContactInfo[0];
    this.model.contactLocationId = this.locationArray;
    console.log(this.locationArray);
  }

  constructor(
    private manufacturerService: ManufacturerService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    console.log(this.selected);
  }

createManufacturers() {
  return this.manufacturerService.createManufacturer(this.model).subscribe(next => {

    this.model.contactLocationId = this.locationArray;
      this.alertify.success('New Manufacturer has been created successfully');
      this.router.navigate(['/create-products']);
    }, error => {
      this.alertify.error(error);
    }
    );
}
}

export interface ContactLocationCategory {
  value: string;
  viewValue: string;
}

export interface ContactLocationGroup {
  disabled?: boolean;
  name: string;
  contactLocation: ContactLocationCategory[];
}
