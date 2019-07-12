import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  NgForm
} from '@angular/forms';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { SendMailService } from '../_service/send-mail.service';
import { RequestConfirmComponent } from './request-confirm/request-confirm.component';

@Component({
  selector: "request",
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  // request: RequestInterface = {
  //   manufacturer: '',
  //   productName: '',
  //   catalogNumber: '',
  //   fullName: '',
  //   emailAddress: '',
  //   phoneNumber: '',
  //   healthAuthority: '',
  //   facility: '',
  //   department: '',
  //   IsAccepted: null
  // };

  // model: any;

  model = {
    id: null,
    productName: '',
    manufacturer: '',
    casNumber: '',
    productName1: '',
    manufacturer1: '',
    casNumber1: '',
    productName2: '',
    manufacturer2: '',
    casNumber2: '',
    productName3: '',
    manufacturer3: '',
    casNumber3: '',
    productName4: '',
    manufacturer4: '',
    casNumber4: '',
    fullName: '',
    email: '',
    // emailSubject: '',
    // emailBody: '',
    comment: '',
    phoneNumber: '',
    healthAuthority: '',
    facility: '',
    department: ''
  };

  requestForm: FormGroup;
  manufacturer: string = '';
  productName: string = '';
  casNumber: string = '';
  fullName: string = '';
  email: string = '';
  emailSubject: string = '';
  emailBody: string = '';
  phoneNumber: string = '';
  healthAuthority: string = '';
  comment: string = '';
  facility: string = '';
  department: string = '';
  IsAccepted: number = 0;
  test: any;
  public form: {
    requests: Requests[];
  };

  constructor(
    private dialog: MatDialog,
    public fb: FormBuilder,
    public authService: AuthService,
    private alertify: AlertifyService,
    private sendMailService: SendMailService
  ) {
    var userEmail = this.authService.decodedToken.email;

    this.requestForm = fb.group({
      manufacturer: [null, Validators.required],
      productName: [null, Validators.required],
      casNumber: [null, Validators.required],
      fullName: [this.fullName, Validators.required],
      email: [this.email, Validators.required],

      // email: [userEmail],
      phoneNumber: [null, Validators.compose([Validators.required])],
      healthAuthority: [null, Validators.required],
      facility: [null, Validators.required],
      department: [null, Validators.required]
      // IsAccepted: [null]
    });

    this.form = {
      requests: []
    };
  }

  ngOnInit() {}

  public processForm(form: any): void {
    // console.warn('Handling form submission!');
    //  console.group('Form Data');
    console.log(this.form.requests);
    console.log(this.form);

    for (const request of this.form.requests) {
      // console.log("processForm: " + request.productName);
      this.model.productName = request.productName;
      this.model.manufacturer = request.manufacturer;
      this.model.casNumber = request.casNumber;
      this.model.id = request.id;
      // this.model.fullName = this.fullName;
      // this.model.email = this.email;
      // this.model.phoneNumber = this.phoneNumber;
      // this.model.healthAuthority = this.healthAuthority;
      // this.model.facility = this.facility;
      // this.model.department = this.department;
      // this.model.comment = this.comment;
      // request.email = this.model.email;
      // request.fullName = this.model.fullName;
      // request.phoneNumber = this.model.phoneNumber;
      // request.healthAuthority = this.model.healthAuthority;
      // request.facility = this.model.facility;
      // request.department = this.model.department;
      // request.comment = this.model.comment;
    }

    //   console.groupEnd();

    // //  console.group('Form Model');
    //   console.log(form);
    // console.groupEnd();
  }

  sdsRequest() {
    this.model.fullName = this.fullName;
    this.model.email = this.email;
    // this.model.emailSubject = this.emailSubject;
    // this.model.emailBody = this.emailBody;
    this.model.phoneNumber = this.phoneNumber;
    this.model.healthAuthority = this.healthAuthority;
    this.model.facility = this.facility;
    this.model.department = this.department;
    this.model.comment = this.comment;

    for (const request of this.form.requests) {

      this.model.productName = request.productName;
      this.model.manufacturer = request.manufacturer;
      this.model.casNumber = request.casNumber;

      if (
        this.model.productName1 === '' &&
        this.model.productName1 !== this.model.productName
      ) {
        this.model.productName1 = request.productName;
        this.model.manufacturer1 = request.manufacturer;
        this.model.casNumber1 = request.casNumber;
      } else if (
        this.model.productName2 === '' &&
        this.model.productName2 !== this.model.productName1
      ) {
        this.model.productName2 = request.productName;
        this.model.manufacturer2 = request.manufacturer;
        this.model.casNumber2 = request.casNumber;
      } else if (
        this.model.productName3 === '' &&
        this.model.productName3 !== this.model.productName2
      ) {
        this.model.productName3 = request.productName;
        this.model.manufacturer3 = request.manufacturer;
        this.model.casNumber3 = request.casNumber;
      } else if (
        this.model.productName4 === '' &&
        this.model.productName4 !== this.model.productName3
      ) {
        this.model.productName4 = request.productName;
        this.model.manufacturer4 = request.manufacturer;
        this.model.casNumber4 = request.casNumber;
      }
    }

    return this.sendMailService.sdsRequest(this.model).subscribe(
      res => {
        this.alertify.success('Product request sent successfully');
      },
      error => {
        this.alertify.error('Something went wrong, please try again');
      }
    );
  }

  public addProductRequest(): void {
    this.form.requests.push({
      id: Date.now(),
      productName: '',
      manufacturer: '',
      casNumber: '',
      fullName: '',
      email: '',
      // emailSubject: '',
      // emailBody: '',
      comment: '',
      phoneNumber: '',
      healthAuthority: '',
      facility: '',
      department: ''
    });
  }

  clicked = 0;
  buttonDisabled;

  submitButton() {
    this.clicked++;
    this.addProductRequest();
  }

  public removeProductRequest(index: number): void {
    this.form.requests.splice(index, 1);
  }

  openDiaglogRequest(form) {
    const dialogRef = this.dialog.open(RequestConfirmComponent, {
      data: {
        form: form
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  // onFormSubmit(form: NgForm) {
  //   this.request.supplierManufacturer = form['supplierManufacturer'];
  //   this.request.productName = form['productName'];
  //   this.request.catalogNumber = form['catalogNumber'];
  //   this.request.fullName = form['fullName'];
  //   this.request.emailAddress = form['emailAddress'];
  //   this.request.phoneNumber = form['phoneNumber'];
  //   this.request.healthAuthority = form['healthAuthority'];
  //   this.request.department = form['department'];

  //   // this.sendMailService.sendRequest(this.request).subscribe(next => {
  //   //   this.alertify.success('Request successfully sent');
  //   // },
  //   //   error => {
  //   //     this.alertify.error('Something went wrong!');
  //   //     console.log('issue with registering');
  //   //   }
  //   // )
  //   this.openDiaglogRequest(form);
  // }
}

// export class RequestInterface {
//   supplierManufacturer: string;
//   productName: string;
//   catalogNumber: string;
//   fullName: string;
//   emailAddress: string;
//   phoneNumber: string;
//   healthAuthority: string;
//   facility: string;
//   department: string;
//   IsAccepted: number;
// }

interface Requests {
  id: number;
  productName: string;
  manufacturer: string;
  casNumber: string;
  fullName: string;
  email: string;
  // emailSubject: string;
  // emailBody: string;
  comment: string;
  phoneNumber: string;
  healthAuthority: string;
  facility: string;
  department: string;
}
