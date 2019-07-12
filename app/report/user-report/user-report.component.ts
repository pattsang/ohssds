import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { ReportService } from 'src/app/_service/report.service';

@Component({
  selector: 'user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.css']
})
export class UserReportComponent implements OnInit {

  checkAll = false;
  firstName ;
  firstNameChecked = false;
  lastName ;
  lastNameChecked = false;
  contactName;
  contactNameChecked = false;
  address;
  addressChecked = false;
  city;
  cityChecked = false;
  province;
  provinceChecked = false;
  country;
  countryChecked = false;
  postalCode;
  postalCodeChecked = false;
  phone;
  phoneChecked = false;
  fax;
  faxChecked = false;
  email;
  emailChecked = false;
  userName;
  userNameChecked = false;
  authorities;
  authoritiesChecked = false;
  role;
  roleChecked = false;
  creationDate;
  creationDateChecked = false;
  notes;
  notesChecked = false;

  isLoading = false;

  report;

  constructor(
    private alertify: AlertifyService,
    private reportService: ReportService
  ) { }

  ngOnInit() {
  }

  onSelectAllClick() {
    this.checkAll = true;
    this.firstNameChecked = !this.firstNameChecked;
    this.lastNameChecked = !this.lastNameChecked;
    this.contactNameChecked = !this.contactNameChecked;
    this.addressChecked = !this.addressChecked;
    this.cityChecked = !this.cityChecked;
    this.provinceChecked = !this.provinceChecked;
    this.countryChecked = !this.countryChecked;
    this.postalCodeChecked = !this.postalCodeChecked;
    this.phoneChecked = !this.phoneChecked;
    this.faxChecked = !this.faxChecked;
    this.emailChecked = !this.emailChecked;
    this.userNameChecked = !this.userNameChecked;
    this.authoritiesChecked = !this.authoritiesChecked;
    this.roleChecked = !this.roleChecked;
    this.creationDateChecked = !this.creationDateChecked;
    this.notesChecked = !this.notesChecked;
  }

  onFirstnameChecked() {
    this.firstName = ''
    if (this.firstNameChecked) {
      this.firstName = 'FirstName'
    }
    console.log('fn ' + this.firstName);
  }

  onLastNameChecked() {
    
    this.lastName = '';
    if (this.lastNameChecked) {
      this.lastName = 'LastName';
    }
    console.log('ln ' + this.lastName);
     
  }

  onContactNameChecked() {
   this.contactName = '';
    if (this.contactNameChecked) {
      this.contactName = 'ContactName';
    }
    console.log('contactName: ' + this.contactName);
  }

  onAddressChecked() {
    this.address = '';
    if (this.addressChecked) {
      this.address = 'Address';
    }
    console.log('address: ' + this.address);
  }
  
  onCityChecked() {
    this.city = '';
    if (this.cityChecked) {
      this.city = 'City';
    }
    console.log('city: ' + this.city);
  }

  onProvinceChecked() {
    this.province = '';
    if (this.provinceChecked) {
      this.province = 'Province';
    }
    console.log('province: ' + this.province);
  }

  onCountryChecked() {
    this.country = '';
    if (this.countryChecked) {
      this.country = 'Country';
    }
    console.log('country: ' + this.country);
  }

  onPostalCodeChecked() {
    this.postalCode = '';
    if (this.postalCodeChecked) {
      this.postalCode = 'PostalCode';
    }
    console.log('postalCode: ' + this.postalCode);
  }

  onPhoneChecked() {
    this.phone = '';
    if (this.phoneChecked) {
      this.phone = 'Phone';
    }
    console.log('phone: ' + this.phone);
  }

  onFaxChecked() {
    this.fax = '';
    if (this.faxChecked) {
      this.fax = 'Fax';
    }
    console.log('fax: ' + this.fax);
  }

  onEmailChecked() {
    this.email = '';
    if (this.emailChecked) {
      this.email = 'Email';
    }
    console.log('email: ' + this.email);
  }

  onUserNameChecked() {
    this.userName = '';
    if (this.userNameChecked) {
      this.userName = 'UserName';
    }
    console.log('userName: ' + this.userName);
  }

  onAuthoritiesChecked() {
    this.authorities = '';
    if (this.authoritiesChecked) {
      this.authorities = 'Authorities'
    }
    console.log('Authorities: ' + this.authorities);
  }

  onRoleChecked() {
    this.role = '';
    if (this.roleChecked) {
      this.role = 'UserType';
    }
    console.log('role: ' + this.role);
  }

  onCreationDateChecked() {
    this.creationDate = '';
    if (this.creationDateChecked) {
      this.creationDate = 'CreationDate';
    }
    console.log('CreationDate: ' + this.creationDate);
  }

  onNotesChecked() {
    this.notes = '';
    if (this.notesChecked) {
      this.notes = 'Notes';
    }
    console.log('notes: ' + this.notes);
  }


  generateUserReportToExcel() {
    let params = new URLSearchParams();
    params.append('selection', this.firstName);
    params.append('selection', this.lastName);
    params.append('selection', this.contactName);
    params.append('selection', this.address);
    params.append('selection', this.city);
    params.append('selection', this.province);
    params.append('selection', this.country);
    params.append('selection', this.creationDate);
    params.append('selection', this.postalCode);
    params.append('selection', this.phone);
    params.append('selection', this.fax);
    params.append('selection', this.email);
    params.append('selection', this.userName);
    params.append('selection', this.authorities);
    params.append('selection', this.role);
    params.append('selection', this.notes);
    params.append('selection', this.creationDate);

    this.isLoading = true;
    this.reportService.generateUserReport(params).subscribe(
      blob => {
        this.report = blob;

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'User';
        link.click();
        this.alertify.success('User Report Generation is Completed');

        this.isLoading = false;
      },
      error => {
        this.alertify.error('User Report Generation failed, please try again!');
      }
    );
  }

}
