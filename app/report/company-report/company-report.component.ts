import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/_service/report.service';
import { AlertifyService } from 'src/app/_service/alertify.service';

@Component({
  selector: 'company-report',
  templateUrl: './company-report.component.html',
  styleUrls: ['./company-report.component.css']
})
export class CompanyReportComponent implements OnInit {
  title: string;
  companyFields: any;
  selectAll: any;
  constructor(
    private reportService: ReportService,
    private alertify: AlertifyService
  ) {}
  
  report;

  isLoading = false;

  companyName;
  companyNameChecked = false;

  url;
  urlChecked = false; //

  sdsURL; //
  sdsURLChecked = false;

  contactLocation; //
  contactLocationChecked = false;

  contactEmail; //
  contactEmailChecked = false;

  contactDetails;
  contactDetailsChecked = false;

  contactUrl;
  contactUrlChecked = false;

  faxNumber;
  faxNumberChecked = false;
  
  alternateCompanyNames;
  alternateCompanyNamesChecked = false;

  companyNotes;
  companyNotesChecked = false;

  phoneNumber;
  phoneNumberChecked = false;

  ngOnInit() {
  }


  onCompanyNameChecked() {
    this.companyName = '';
    if (this.companyNameChecked) {
      this.companyName = 'ManufacturerName';
    }
    console.log('fn ' + this.companyName);
  }

  onUrlChecked() {
    this.url = '';
    if (this.urlChecked) {
      this.url = 'URL';
    }
    console.log('fn ' + this.url);
  }

  onSDSURLChecked() {
    this.sdsURL = '';
    if (this.sdsURLChecked) {
      this.sdsURL = 'SDS_URL';
    }
    console.log('fn ' + this.sdsURL);
  }

  onContactLocationChecked() {
    this.contactLocation = '';
    if (this.contactLocationChecked) {
      this.contactLocation = 'ContactLocation';
    }
    console.log('fn ' + this.contactLocation);
  }

  onContactEmailChecked() {
    this.contactEmail = '';
    if (this.contactEmailChecked) {
      this.contactEmail = 'ContactEmail';
    }
    console.log('fn ' + this.contactEmail);
  }

  onContactURLChecked() {
    this.contactUrl = '';
    if (this.contactUrlChecked) {
      this.contactUrl = 'ContactURL';
    }
    console.log('fn ' + this.contactUrl);
  }

  onPhoneNumberChecked() {
    this.phoneNumber = '';
    if (this.phoneNumberChecked) {
      this.phoneNumber = 'PhoneNumber';
    }
    console.log('fn ' + this.phoneNumber);
  }

  onContactDetailsChecked() {
    this.contactDetails = '';
    if (this.contactDetailsChecked) {
      this.contactDetails = 'ContactDetails';
    }
    console.log('fn ' + this.contactDetails);
  }

  onContactFaxNumberChecked() {
    this.faxNumber = '';
    if (this.faxNumberChecked) {
      this.faxNumber = 'FaxNumber';
    }
    console.log('fn ' + this.faxNumber);
  }

  onAlternateCompanyNamesChecked() {
    this.alternateCompanyNames = '';
    if (this.alternateCompanyNamesChecked) {
      this.alternateCompanyNames = 'ManufacturerAlias';
    }
    console.log('fn ' + this.alternateCompanyNames);
  }

  onCompanyNotesChecked() {
    this.companyNotes = '';
    if (this.companyNotesChecked) {
      this.companyNotes = 'CompanyNotes';
    }
    console.log('fn ' + this.companyNotes);
  }

  // generateCompanyExcelReport() {
  //   let params = new URLSearchParams();
  //   params.append('selection', this.companyName);
  //   params.append('selection', this.url);
  //   params.append('selection', this.sdsURL);
  //   params.append('selection', this.contactLocation);
  //   params.append('selection', this.contactEmail);
  //   params.append('selection', this.contactDetails);
  //   params.append('selection', this.contactUrl);
  //   params.append('selection', this.faxNumber);
  //   params.append('selection', this.alternateCompanyNames);
  //   params.append('selection', this.companyNotes);
  //   params.append('selection', this.phoneNumber);

  //   this.isLoading = true;
  //   this.reportService.generateCompanyReport(params).subscribe(
  //     blob => {
  //       this.report = blob;
  //       const link = document.createElement('a');
  //       link.href = window.URL.createObjectURL(blob);
  //       link.download = 'Company';
  //       link.click();
  //       this.alertify.success('Company Report Generation is Completed');

  //       this.isLoading = false;
  //     },
  //     error => {
  //       this.alertify.error('Company Report Generation failed, please try again!');
  //     }
  //   );
  // }

}
