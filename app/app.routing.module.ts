import { NgModule } from '@angular/core';
import {Routes, Router, RouterModule} from '@angular/router';

import { UsersComponent } from './users/users.component';
import { InviteComponent } from './invite/invite.component';
import { ProductComponent } from './product/product.component';
import {OrderListComponent} from './order-list/order-list.component';
import {ProductListComponent} from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductAliasComponent} from './productalias.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HelpComponent } from './help/help.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CompanyReportComponent } from './report/company-report/company-report.component';
import { UserReportComponent } from './report/user-report/user-report.component';
import { ScheduleComponent } from './report/schedule/schedule.component';
import { ReportComponent } from './report/report.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RequestComponent } from './request/request.component';
import { AddSiteComponent } from './authority/add-site/add-site.component';
import { SearchComponent } from './search/search.component';
import { ProductLocationComponent } from './product-location/product-location.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthorityComponent } from './authority/authority.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { CompleteuserregistrationComponent } from './completeuserregistration/completeuserregistration.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { UserPermissionComponent } from './users/user-permission/user-permission.component';
import { UserLocationComponent } from './users/user-location/user-location.component';
import { ShowUserLocationComponent } from './users/user-location/showUserLocation/showUserLocation.component';
import { ResendEmailComponent } from './resendEmail/resendEmail.component';

const routes: Routes = [
  { path: 'product-location', component: ProductLocationComponent, data: {roles: ['Super Admin', 'Site Admin']} },
  { path: 'user-profile/:id', component: UserProfileComponent , data: {roles: ['Super Admin', 'Site Admin', 'Regular']} },     
  { path: 'authority', component: AuthorityComponent , data: {roles: ['Super Admin', 'Site Admin']} },
  { path: 'users', component: UsersComponent , data: {roles: ['Super Admin', 'Site Admin']} },
  { path: 'create-user', component: CreateUserComponent , data: {roles: ['Super Admin']} },
  { path: 'update-user/:id', component: UpdateUserComponent, data: {roles: ['Super Admin', 'Site Admin']}  },
  { path: 'completeuserregistration/:id', component: CompleteuserregistrationComponent },
  { path: 'delete-user', component: DeleteUserComponent , data: {roles: ['Super Admin', 'Site Admin']} },
  { path: 'user-permission/:id', component: UserPermissionComponent , data: {roles: ['Super Admin', 'Site Admin']} },
  { path: 'user-location/:id', component: UserLocationComponent , data: {roles: ['Super Admin', 'Site Admin']} },
  { path: 'showUserLocation/:id', component: ShowUserLocationComponent , data: {roles: ['Super Admin', 'Site Admin']} },   
  { path: 'invite', component: InviteComponent , data: {roles: ['Super Admin', 'Site Admin']} },     
  { path: 'resendEmail/:id', component: ResendEmailComponent , data: {roles: ['Super Admin', 'Site Admin']}  },
  { path: 'search', component: SearchComponent},
  { path: 'authority', component: AddSiteComponent, data: {roles: ['Super Admin', 'Site Admin']} },
  { path: 'request', component: RequestComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'report', component: ReportComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'user-report', component: UserReportComponent },
  { path: 'company-report', component: CompanyReportComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'help', component: HelpComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}