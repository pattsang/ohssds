import { Component, OnInit, Inject } from '@angular/core';
import { PermissionService } from 'src/app/_service/permission.service';
import { AlertifyService } from 'src/app/_service/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_service/user.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'user-permission',
  templateUrl: './user-permission.component.html',
  styleUrls: ['./user-permission.component.css']
})
export class UserPermissionComponent implements OnInit {

  constructor(
  private userPermission: PermissionService,
  private userService: UserService,
  private alertify: AlertifyService,
  private router: Router,
  private route: ActivatedRoute,
  @Inject(MAT_DIALOG_DATA) public passedData: any) { }

  user: User;
  roles;
  role;
  roleName;
  model: any = {};
  selectedValue: string;
  public selectedRole: any;

  userEmailAddress = this.passedData.user.emailAddress;

  ngOnInit() {
   // this.loadUser();
    this.userPermission.getRoles().subscribe(res => {
      this.roles = res;
    });
  }

  assignPermission() {
    this.userPermission.userPermission(this.userEmailAddress, this.selectedRole).subscribe(next => {
      // console.log('This is the loaded user ' + this.user.emailAddress);
         this.alertify.success(`Role of ${this.selectedRole} assigned to ${this.userEmailAddress}`);
         this.router.navigate(['/users']);
    
       }, error => {
         this.alertify.error('Something went wrong!');
         //console.log('Issue assigning roles');
       }
     );
   }

   getAllRoles() {
     this.userPermission.getRoles();
   }

  //  loadUser() {
  //   this.userService.getUser(this.route.snapshot.params['id']).subscribe((user: User) => {
  //     this.user = user;
  //    // console.log('This is the param id: ' + this.route.snapshot.params['id']);
  //    // console.log('This is the user within the loadUser: ' + this.user.firstName);
  //   },
  //   error => {
  //     this.alertify.error(error);
  //   });
  // }
}
