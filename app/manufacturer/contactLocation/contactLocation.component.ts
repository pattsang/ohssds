import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'contactLocation',
  templateUrl: './contactLocation.component.html',
  styleUrls: ['./contactLocation.component.css']
})
export class ContactLocationComponent implements OnInit {

model: any = {};
locationArray;
selected;
  constructor() { }

  ContactLocationFormControl = new FormControl();
  ContactLocationGroups: ContactLocationGroup[] = [
    {
      name: 'Contact Location',
      contactLocation: [
        {effectiveContactMethodFlag: '0', viewValue: 'Unknown'},
        {effectiveContactMethodFlag: '1', viewValue: 'Canada'},
        {effectiveContactMethodFlag: '2', viewValue: 'USA'},
        {effectiveContactMethodFlag: '3', viewValue: 'Europe'},
        {effectiveContactMethodFlag: '4', viewValue: 'Other'}
      ]
    }
  ];

 onSelectContactLocation(selected) {
    this.locationArray = selected.toString().split(',');
    console.log(this.locationArray);
  }


  ngOnInit() {
  }

}


export interface ContactLocationCategory {
  effectiveContactMethodFlag: string;
  viewValue: string;
}

export interface ContactLocationGroup {
  disabled?: boolean;
  name: string;
  contactLocation: ContactLocationCategory[];
}
