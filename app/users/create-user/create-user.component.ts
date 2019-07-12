import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_service/user.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  
  hide = true;
  model: any = {};

  constructor(
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createInternalUser() {
    return this.userService.createInternalUser(this.model).subscribe(next => {
      this.alertify.success('New User has been created successfully');
      this.router.navigate(['/users']);
    }, error => {
      this.alertify.error('Something went wrong, please try again');
    }
    );
    
  }

}
