import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../_service/alertify.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
@Input() valuesFromHome: any;
@Output() cancelRegister = new EventEmitter();
hide = true;

  constructor(private authService: AuthService,
     private router: Router,
     private alertify: AlertifyService,
     private dialog: MatDialog
     ) { }

  ngOnInit() {
  }

  register() {
    // console.log(this.model);
    this.authService.register(this.model).subscribe(
      data => {
        this.alertify.success('Please confirm your email');
        this.router.navigate(['/login']);
        this.dialog.closeAll();
      },
      error => {
        this.alertify.error('Something went wrong!');
        console.log('issue with registering');
      }
    )
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.router.navigate(['/login']);
  }
}