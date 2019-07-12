import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms';
import { AuthService } from '../_service/auth.service';
import { AlertifyService } from '../_service/alertify.service';
import { SendMailService } from '../_service/send-mail.service';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactUs: ContactUsInterface = {
    name: '',
    emailAddress: '',
    healthAuthority: '',
    facility: '',
    phoneNumber: '',
    subject: '',
    message: ''
  };

  contactUsForm: FormGroup;
  name:string = '';
  emailAddress:string = '';
  healthAuthority: string = '';
  facility: string = '';
  phoneNumber: string = '';
  subject: string = '';
  message: string = '';
  
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private sendMailService: SendMailService
  ) 
  { 
    this.contactUsForm = fb.group({
      'name': [null, Validators.required],
      'emailAddress': [null, Validators.required],
      'healthAuthority': [null, Validators.required],
      'facility': [null, Validators.required],
      'phoneNumber': [null],
      'subject': [null, Validators.required],
      'message': [null, Validators.required],
    })
  }

  ngOnInit() {
  }

  onFormSubmit(form: NgForm) {
    console.log(form);
    this.contactUs.name = form['name'];
    this.contactUs.emailAddress = form['emailAddress'];
    this.contactUs.healthAuthority = form['healthAuthority'];
    this.contactUs.facility = form['facility'];
    this.contactUs.phoneNumber = form['phoneNumber'];
    this.contactUs.subject = form['subject'];
    this.contactUs.message = form['message'];
    this.contactUsForm.reset();
    // this.sendMailService.sendRequest(this.request).subscribe(next => {
    //   this.alertify.success('Request successfully sent');
    // },
    //   error => {
    //     this.alertify.error('Something went wrong!');
    //     console.log('issue with registering');
    //   }
    // )
    this.router.navigate(['/search']);

  }

}

export class ContactUsInterface {
  name: string;
  emailAddress: string;
  healthAuthority: string;
  facility: string;
  phoneNumber: string;
  subject: string;
  message: string;
}
