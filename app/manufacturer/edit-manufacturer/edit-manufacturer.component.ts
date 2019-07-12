import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ManufacturerService } from 'src/app/_service/manufacturer.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { Manufacturer } from 'src/app/_models/manufacturer';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-manufacturer',
  templateUrl: './edit-manufacturer.component.html',
  styleUrls: ['./edit-manufacturer.component.css']
})
export class EditManufacturerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public passedData: any,
    private manufacturerService: ManufacturerService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  selectedContactInfo: number;
  selected: number;
locationArray: number;
model: any = {};

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

  manufacturerId = this.passedData.selected;
  // myList = this.passedData.row.myList;
  // name = this.passedData.row.manufacturerName;
  // contactLocationId = this.passedData.row.contactLocationId;
  // url = this.passedData.row.url;
  // msdsUrl = this.passedData.row.msdsUrl;
  // contactEmail = this.passedData.row.contactEmail;
  // contactUrl = this.passedData.row.contactUrl;
  // contactPhoneNumber = this.passedData.row.contactPhoneNumber;
  // contactFaxNumber = this.passedData.row.contactFaxNumber;
  // contactDetails = this.passedData.row.contactDetails;
  // notes = this.passedData.row.notes;
  // effectiveContactMethodFlag = this.passedData.row.contactDetails;

  // model = {
  //   manufacturerId: null,
  //   contactLocationId: null,
  //   name: '',
  //   url: '',
  //   contactEmail: '',
  //   msdsUrl: '',
  //   contactUrl: '',
  //   contactPhoneNumber: '',
  //   contactFaxNumber: '',
  //   contactDetails: '',
  //   notes: '',
  //   effectiveContactMethodFlag: ''
  // };
  
// loadUser() {
//   this.userService.getUser(this.route.snapshot.params['id']).subscribe((user: User) => {
//     this.user = user;
//     //console.log('This is coming from the loadUser() ' + this.user)
//   },
//   error => {
//     this.alertify.error(error);
//   });
// }

  ngOnInit() {
    // console.log("EditManufacturerComponent: " + this.myList);
    console.log("EditManufacturerComponent: " + this.manufacturerId);
    this.getManufacturerId();

  }


  getManufacturerId(){
    return this.manufacturerService.getByManufacturerId(this.manufacturerId).subscribe((manufacturer: Manufacturer) => {
      
      this.model = manufacturer; 
      console.log("getManufacturerId: " + this.model.name);
    });
  }

  updateManufacturerInformation(){
    console.log("updateManufacturerInformation(): " + this.model.name);
    return this.manufacturerService.updateManufacturer(this.manufacturerId, this.model).subscribe(res => {

      this.model.contactLocationId = this.locationArray;
      this.alertify.success('Manufacturer has been updated');
    }, error => {
      this.alertify.error(error);
    }); 
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
