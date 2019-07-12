import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';
import { UserService } from '../_service/user.service';
import { AlertifyService } from '../_service/alertify.service';
import { HttpClient } from '@angular/common/http';
import { GenerateComponent } from './generate/generate.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ReportService } from '../_service/report.service';

@Component({
  selector: "report",
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  checkAllProductInfo = false;
  checkAllSuppliers = false;
  checkInventoryStatus = false;
  checkWorkSheetUpdate = false;
  checkProductPropertyInfo = false;
  //Product Info section
  productName;
  productNameChecked = false;

  productCode;
  productCodeChecked = false;

  casNumber;
  casNumberChecked = false;

  manufacturerName;
  manufacturerNameChecked = false;

  authorityLocation: any = [];
  authorityLocationChecked = false;

  sdsFile;
  sdsFileChecked = false;

  creationDate;
  creationDateChecked = false;

  modifiedDate;
  modifiedDateChecked = false;

  revisionDate;
  revisionDateChecked = false;

  productAlias;
  productAliasChecked = false;

  sdsOrigin;
  sdsOriginChecked = false;

  sdsFormat;
  sdsFormatChecked = false;

  discontinued;
  discontinuedChecked = false;

  exemptWHMIS;
  exemptWHMISChecked = false;

  // exemptionClass;
  // exemptionClassChecked = false;

  registrationNumber;
  registrationNumberChecked = false;

  additionalSupplier;
  additionalSupplierChecked = false;

  notes;
  notesChecked = false;

  // status;
  // statusChecked = false;

  url;
  urlChecked = false;

  sdsURL;
  sdsURLChecked = false;

  contactLocation;
  contactLocationChecked = false;

  contactEmail;
  contactEmailChecked = false;
  // effectiveContactMethod;
  // effectiveContactMethodChecked = false;

  contactDetails;
  contactDetailsChecked = false;

  mostRecentRequestDate;
  mostRecentRequestDateChecked = false;

  isLoading = false;

  onSelectAllProductinfoClick() {
    this.checkAllProductInfo = true;

    this.productNameChecked = !this.productNameChecked;
    this.productCodeChecked = !this.productCodeChecked;
    this.casNumberChecked = !this.casNumberChecked;
    this.manufacturerNameChecked = !this.manufacturerNameChecked;
    this.sdsFileChecked = !this.sdsFileChecked;
    this.creationDateChecked = !this.creationDateChecked;
    this.notesChecked = !this.notesChecked;
    this.modifiedDateChecked = !this.modifiedDateChecked;
    this.revisionDateChecked = !this.revisionDateChecked;
    this.productAliasChecked = !this.productAliasChecked;
    this.sdsOriginChecked = !this.sdsOriginChecked;
    this.sdsFormatChecked = !this.sdsFormatChecked;
    this.discontinuedChecked = !this.discontinuedChecked;
    this.exemptWHMISChecked = !this.exemptWHMISChecked;
    this.additionalSupplierChecked = !this.additionalSupplierChecked;
    this.registrationNumberChecked = !this.registrationNumberChecked;
    this.urlChecked = !this.urlChecked;
    this.sdsURLChecked = !this.sdsURLChecked;
    this.contactLocationChecked = !this.contactLocationChecked;
    this.contactDetailsChecked = !this.contactDetailsChecked;
    this.contactEmailChecked = !this.contactEmailChecked;
  }

  // onSelectAllSupplierClick() {
  //   this.checkAllSuppliers = true;

  // }

  onSelectInventoryStatusReportClick() {
    this.checkInventoryStatus = true;

    this.revisionDateChecked = !this.revisionDateChecked;
    this.discontinuedChecked = !this.discontinuedChecked;
    this.exemptWHMISChecked = !this.exemptWHMISChecked;
  }

  onSelectUpdatingWorkSheetClick() {
    this.checkWorkSheetUpdate = true;

    this.productNameChecked = !this.productNameChecked;
    this.manufacturerNameChecked = !this.manufacturerNameChecked;
    this.sdsFileChecked = !this.sdsFileChecked;
    this.revisionDateChecked = !this.revisionDateChecked;
    this.productCodeChecked = !this.productCodeChecked;
    this.discontinuedChecked = !this.discontinuedChecked;
    this.exemptWHMISChecked = !this.exemptWHMISChecked;
  }

  onSelectProductPropertyInfoClick() {
    this.checkProductPropertyInfo = true;

    this.productNameChecked = !this.productNameChecked;
    this.manufacturerNameChecked = !this.manufacturerNameChecked;
    this.revisionDateChecked = !this.revisionDateChecked;
    this.discontinuedChecked = !this.discontinuedChecked;
    this.exemptWHMISChecked = !this.exemptWHMISChecked;
  }

  //Supplier/Manufacturer section
  // URL;
  // sdsURL;
  // contactLocation;
  // effectiveContactMethod;
  // contactDetails;

  //Chemical Classification section
  // physicalState;
  // flammable;
  // gasesUnderPressure;
  // selfReactive;
  // substancesMixtures;
  // waterFlammable;
  // oxidizing;
  // organicPeroxides;
  // corrosiveMetals;
  // combustibleDusts;
  // simpleAsphyxiants;
  // physicalHazardsNotClassified;

  //Inventory Info section
  recentRequest;

  model: any = {};

  //Format section
  oneProductPerRow;
  oneRowPerLocation;

  arrayAuth: number;
  topauths = new FormControl();
  // authorities = [
  //   {value: 1, viewValue:'Fraser Health Authority' },
  //   {value:2, viewValue:'Northern Health' },
  //   {value:3, viewValue: 'Coastal Health'}
  // ];
  authorities;

  //Health Properties section
  // acuteToxicity;
  // skinCorrosion;
  // eyeDamage;
  // respiratory;
  // germCell;
  // carcinogenicity;
  // reproductive;
  // specificOrgan;
  // aspirationHazard;
  // biohazardous;
  // healthHazard;

  selection;
  ProductName;
  report;
  selectedBox;
  selectedAuth: number;

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private http: HttpClient,
    private dialog: MatDialog,
    private reportService: ReportService
  ) {}

  ngOnInit() {
    this.getAuthorityNames();
  }

  onSelectAuthority(selectedAuth: number) {
    this.arrayAuth = selectedAuth;
    this.authorityLocation = this.arrayAuth;
    console.log(this.arrayAuth);
  }

  getAuthorityNames() {
    this.userService.getAuthorityNames().subscribe(
      res => {
        // console.log(res);
        this.authorities = res;
      },
      error => {
        console.log('There was an error: ' + error);
      }
    );
  }

  openDiaglogGenerate(authority) {
    const dialogRef = this.dialog.open(GenerateComponent, {
      data: {
        authority: authority
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  openDiaglogSchedule(authority) {
    const dialogRef = this.dialog.open(ScheduleComponent, {
      data: {
        authority: authority
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onProductNameChecked() {
    this.productName = '';
    if (this.productNameChecked) {
      this.productName = 'ProductName';
    }
    console.log('fn ' + this.productName);
  }

  onProductCodeChecked() {
    this.productCode = '';
    if (this.productCodeChecked) {
      this.productCode = 'ProductCode';
    }
    console.log('fn ' + this.productCode);
  }

  onCasNumberChecked() {
    this.casNumber = '';
    if (this.casNumberChecked) {
      this.casNumber = 'CasNumber';
    }
    console.log('fn ' + this.casNumber);
  }

  onManufacturerNameChecked() {
    this.manufacturerName = '';
    if (this.manufacturerNameChecked) {
      this.manufacturerName = 'ManufacturerName';
    }
    console.log('fn ' + this.manufacturerName);
  }

  onAuthorityLocationChecked() {
    this.authorityLocation = '';
    if (this.authorityLocationChecked) {
      this.authorityLocation = 'AuthorityLocation';
    }
    console.log('fn ' + this.manufacturerName);
  }

  onSdsFileChecked() {
    this.sdsFile = '';
    if (this.sdsFileChecked) {
      this.sdsFile = 'SDSFile';
    }
    console.log('fn ' + this.sdsFile);
  }

  onSdsFormatChecked() {
    this.sdsFormat = '';
    if (this.sdsFormatChecked) {
      this.sdsFormat = 'SDSFormat';
    }
    console.log('fn ' + this.sdsFormat);
  }

  onSdsOriginChecked() {
    this.sdsOrigin = '';
    if (this.sdsOriginChecked) {
      this.sdsOrigin = 'SDSOrigin';
    }
    console.log('fn ' + this.sdsOrigin);
  }

  onCreationDateChecked() {
    this.creationDate = '';
    if (this.creationDateChecked) {
      this.creationDate = 'CreatedDate';
    }
    console.log('fn ' + this.creationDate);
  }

  onModifiedDateChecked() {
    this.modifiedDate = '';
    if (this.modifiedDateChecked) {
      this.modifiedDate = 'DateModified';
    }
    console.log('fn ' + this.modifiedDate);
  }

  onRevisionDateChecked() {
    this.revisionDate = '';
    if (this.revisionDateChecked) {
      this.revisionDate = 'RevisionDate';
    }
    console.log('fn ' + this.revisionDate);
  }

  onProductAliasChecked() {
    this.productAlias = '';
    if (this.productAliasChecked) {
      this.productAlias = 'ProductAlias';
    }
    console.log('fn ' + this.productAlias);
  }

  onDiscontinuedChecked() {
    this.discontinued = '';
    if (this.discontinuedChecked) {
      this.discontinued = 'Discontinued';
    }
    console.log('fn ' + this.discontinued);
  }

  onWHMISExemptChecked() {
    this.exemptWHMIS = '';
    if (this.exemptWHMISChecked) {
      this.exemptWHMIS = 'WHMISExempt';
    }
    console.log('fn ' + this.exemptWHMIS);
  }

  // onExemptionClassChecked() {
  //   this.exemptionClass = ""
  //   if (this.exemptionClassChecked) {
  //     this.exemptionClass = "ExemptionClass"
  //   }
  //   console.log("fn " + this.exemptionClass);
  // }

  onRegistrationNumberChecked() {
    this.registrationNumber = '';
    if (this.registrationNumberChecked) {
      this.registrationNumber = 'RegistrationNumber';
    }
    console.log('fn ' + this.registrationNumber);
  }

  onAdditionalSuppliersChecked() {
    this.additionalSupplier = '';
    if (this.additionalSupplierChecked) {
      this.additionalSupplier = 'AdditionalSuppliers';
    }
    console.log('fn ' + this.additionalSupplier);
  }

  onNotesChecked() {
    this.notes = '';
    if (this.notesChecked) {
      this.notes = 'Notes';
    }
    console.log('fn ' + this.notes);
  }

  // onStatusChecked() {
  //   this.status = ""
  //   if (this.statusChecked) {
  //     this.status = "Status"
  //   }
  //   console.log("fn " + this.status);
  // }

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
  // onEffectiveContactMethodChecked() {
  //   this.effectiveContactMethod = '';
  //   if (this.effectiveContactMethodChecked) {
  //     this.effectiveContactMethod = 'EffectiveContactMethod';
  //   }
  //   console.log('fn ' + this.effectiveContactMethod);
  // }

  onContactDetailsChecked() {
    this.contactDetails = '';
    if (this.contactDetailsChecked) {
      this.contactDetails = 'ContactDetails';
    }
    console.log('fn ' + this.contactDetails);
  }

  onMostRecentRequestDateChecked() {
    this.mostRecentRequestDate = '';
    if (this.mostRecentRequestDateChecked) {
      this.mostRecentRequestDate = 'MostRecentRequestDate';
    }
    console.log('fn ' + this.mostRecentRequestDate);
  }

  locationList = new FormControl('', [Validators.required]);
  locations;
  locationArray;
  selected: number;
  myList: any = [];

  // selected;

  onSelectLocations(selected) {
    this.myList = selected;
    this.model.manufacturerId = this.myList;
  }

  generateExcelReport() {
    let params = new URLSearchParams();
    params.append('selection', this.productName);
    params.append('selection', this.productCode);
    params.append('selection', this.casNumber);
    params.append('selection', this.manufacturerName);
    params.append('selection', this.sdsFile);
    params.append('selection', this.sdsFormat);
    params.append('selection', this.sdsOrigin);
    params.append('selection', this.creationDate);
    params.append('selection', this.modifiedDate);
    params.append('selection', this.revisionDate);
    params.append('selection', this.productAlias);
    params.append('selection', this.discontinued);
    params.append('selection', this.exemptWHMIS);
    // params.append('selection', this.exemptionClass);
    params.append('selection', this.registrationNumber);
    params.append('selection', this.additionalSupplier);
    params.append('selection', this.notes);
    params.append('selection', this.mostRecentRequestDate);
    params.append('selection', this.url);
    params.append('selection', this.sdsURL);
    params.append('selection', this.contactLocation);
    params.append('selection', this.contactEmail);
    // params.append('selection', this.effectiveContactMethod);
    params.append('selection', this.contactDetails);
    // params.append('selection', this.status);
    for (const authorityLoc of this.authorityLocation) {
      params.append('authorityUnitId', authorityLoc);
    }

    this.isLoading = true;
    this.reportService.generateReport(params).subscribe(
      blob => {
        this.report = blob;
        this.authorityLocation = this.arrayAuth;
        console.log('params: ' + params);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'Product';
        link.click();
        this.alertify.success('Product Report Generation is Completed');
        // console.log("GenerateReport(): " + blob);
        // console.log("GenerateReport(): " + this.report);
        // console.log("GenerateReport() Auth: " + this.arrayAuth);
        this.isLoading = false;
      },
      error => {
        this.alertify.error(
          'Product Report Generation failed, please try again!'
        );
      }
    );
  }

  generateButton(selectedBox) {
    this.selection = selectedBox;

    //this.reportGeneration.ProductName = this.form.controls['ProductName'];

    console.log(this.selection);
    console.log(selectedBox);
    this.generateExcelReport();
  }
}
