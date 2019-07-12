import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialModule } from './material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import {
  MatPaginatorModule,
  MatDialogModule,
  MatNativeDateModule
} from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTreeModule } from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';
import { ProductAliasComponent } from './productalias.component';
import { NavComponent } from './nav/nav.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { ProductComponent } from './product/product.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { TreeCheckboxComponent, TodoItemNode, ChecklistDatabase } from './tree-checkbox/tree-checkbox.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_service/auth.service';
import { AuthGuard } from './_guard/auth.guard';
import { AuthInterceptor } from './_service/auth.interceptor';
import { AlertifyService } from './_service/alertify.service';
import { UsersComponent } from './users/users.component';
import { UserService } from './_service/user.service';
import { InviteComponent } from './invite/invite.component';
import { UpdateUserComponent } from './users/update-user/update-user.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { UserPermissionComponent } from './users/user-permission/user-permission.component';
import { UserLocationComponent } from './users/user-location/user-location.component';
import { CompleteuserregistrationComponent } from './completeuserregistration/completeuserregistration.component';
import { Level3authComponent } from './level3auth/level3auth.component';
import { ResetPasswordComponent } from './resetPassword/resetPassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { NavResponsiveComponent } from './nav-responsive/nav-responsive.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { ResendEmailComponent } from './resendEmail/resendEmail.component';
import { ShowUserLocationComponent } from './users/user-location/showUserLocation/showUserLocation.component';
import { ProductLocationComponent } from './product-location/product-location.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { AuthorityComponent } from './authority/authority.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { AddSiteComponent } from './authority/add-site/add-site.component';
import { EditSiteComponent } from './authority/edit-site/edit-site.component';
import { AddLocationComponent } from './authority/add-location/add-location.component';
import { AddDepartmentComponent } from './authority/add-department/add-department.component';
import { ReportComponent } from './report/report.component';
import { MatRadioModule } from '@angular/material/radio';
import { GenerateComponent } from './report/generate/generate.component';
import { ScheduleComponent } from './report/schedule/schedule.component';
import { SearchComponent } from './search/search.component';
import { ProductPageComponent } from './search/product-page/product-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { RequestComponent } from './request/request.component';
import { UserReportComponent } from './report/user-report/user-report.component';
import { CompanyReportComponent } from './report/company-report/company-report.component';
import { ReportMenuComponent } from './report/report-menu/report-menu.component';
import { AuthLevelsComponent } from './auth-levels/auth-levels.component';
import { HelpComponent } from './help/help.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RequestConfirmComponent } from './request/request-confirm/request-confirm.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { InventoryProductComponent } from './inventory-product/inventory-product.component';
import { CreateProductComponent } from './inventory-product/create-product/create-product.component';
import { EditProductComponent } from './inventory-product/edit-product/edit-product.component';
import { ManufacturerfilterComponent } from './filter/manufacturerfilter/manufacturerfilter.component';
import { LocationfilterComponent } from './filter/locationfilter/locationfilter.component';
import { ProductCasfilterComponent } from './filter/productCasfilter/productCasfilter.component';
import { CreateManufacturerComponent } from './manufacturer/create-manufacturer/create-manufacturer.component';
import { EditManufacturerComponent } from './manufacturer/edit-manufacturer/edit-manufacturer.component';
import { ContactLocationComponent } from './manufacturer/contactLocation/contactLocation.component';
import { InventoryDetailComponent } from './inventory-product/inventory-detail/inventory-detail.component';
import { InventoryEditComponent } from './inventory-product/inventory-edit/inventory-edit.component';
import { ExportListComponent } from './inventory-product/exportList/exportList.component';
import { ProductLabelComponent } from './product-label/product-label.component';
import { AddSubDepartmentComponent } from './authority/add-subDepartment/add-subDepartment.component';
import { AddFloorComponent } from './authority/add-floor/add-floor.component';
import { LocationTreeComponent } from './locationTree/locationTree.component';
import { AuthorityTreeComponent } from './AuthorityTree/AuthorityTree.component';
import { CreateSecondarynameComponent } from './inventory-product/create-secondaryname/create-secondaryname.component';
import { UpdateSecondarynameComponent } from './inventory-product/update-secondaryname/update-secondaryname.component';
import { PaginationService } from './_service/pagination.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

// export const routes: Routes = [

//   {
//     path: '',
//     runGuardsAndResolvers: 'always',
//     canActivate: [AuthGuard],
//     children: [

//       { path: "product-location", component: ProductLocationComponent, data: {roles: ['Super Admin', 'Site Admin']} },
//       { path: "user-profile/:id", component: UserProfileComponent , data: {roles: ['Super Admin', 'Site Admin', 'Regular']} },
//       { path: "authority", component: AuthorityComponent , data: {roles: ['Super Admin', 'Site Admin']} },
//       { path: "users", component: UsersComponent , data: {roles: ['Super Admin', 'Site Admin']} },
//       { path: "create-user", component: CreateUserComponent , data: {roles: ['Super Admin']} },
//       {
//         path: "update-user/:id", component: UpdateUserComponent, data: {roles: ['Super Admin', 'Site Admin']}  },
//       { path: "completeuserregistration/:id", component: CompleteuserregistrationComponent },

//       { path: "delete-user", component: DeleteUserComponent , data: {roles: ['Super Admin', 'Site Admin']} },
//       { path: "user-permission/:id", component: UserPermissionComponent , data: {roles: ['Super Admin', 'Site Admin']} },
//       { path: "user-location/:id", component: UserLocationComponent , data: {roles: ['Super Admin', 'Site Admin']} },
//       { path: "showUserLocation/:id", component: ShowUserLocationComponent , data: {roles: ['Super Admin', 'Site Admin']} },
//       { path: "invite", component: InviteComponent , data: {roles: ['Super Admin', 'Site Admin']} },
//       { path: "resendEmail/:id", component: ResendEmailComponent , data: {roles: ['Super Admin', 'Site Admin']}  },
//     ]
//   },
//   { path: "search", component: SearchComponent},
//   { path: "authority", component: AddSiteComponent, data: {roles: ['Super Admin', 'Site Admin']} },
//   { path: "request", component: RequestComponent },
//   { path: "app-login", component: LoginComponent },
//   { path: "contact-us", component: ContactUsComponent },
//   { path: "report", component: ReportComponent },
//   { path: "schedule", component: ScheduleComponent },
//   { path: "user-report", component: UserReportComponent },
//   { path: "company-report", component: CompanyReportComponent },
//   { path: "register", component: RegisterComponent },
//   { path: "forgotpassword", component: ForgotpasswordComponent },
//   { path: "resetPassword", component: ResetPasswordComponent },
//   { path: "help", component: HelpComponent },
//   { path: "**", component: PageNotFoundComponent },

// ];

export const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children:[
      { path: 'product-location', component: ProductLocationComponent },
      { path: 'user-profile/:id', component: UserProfileComponent },
      { path: 'authority', component: AuthorityComponent },
      { path: 'users', component: UsersComponent },
      { path: 'create-user', component: CreateUserComponent },
      { path: 'update-user/:id', component: UpdateUserComponent },
      { path: 'delete-user', component: DeleteUserComponent },
      { path: 'user-permission/:id', component: UserPermissionComponent },
      { path: 'user-location/:id', component: UserLocationComponent },
      { path: 'showUserLocation/:id', component: ShowUserLocationComponent },
      { path: 'invite', component: InviteComponent },
      { path: 'resendEmail/:id', component: ResendEmailComponent },
      { path: 'request', component: RequestComponent },
      { path: 'inventory-product', component: InventoryProductComponent },
      { path: 'edit-product', component: EditProductComponent },
      { path: 'create-product', component: CreateProductComponent },
      { path: 'authorityTree', component: AuthorityTreeComponent },
      { path: 'report', component: ReportComponent },
      { path: 'schedule', component: ScheduleComponent },
      { path: 'user-report', component: UserReportComponent },
      { path: 'company-report', component: CompanyReportComponent },
    ]
  },
  
  {
    path: 'completeuserregistration/:id',
    component: CompleteuserregistrationComponent
  },
  { path: 'search', component: SearchComponent },
  { path: 'login', outlet: 'modal', component: LoginComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  // { path: 'help', component: HelpComponent },

  { path: '**', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductAliasComponent,
    NavComponent,
    ManufacturerComponent,
    ProductComponent,
    OrderListComponent,
    ProductListComponent,
    CreateProductComponent,
    ProductDetailComponent,
    TreeCheckboxComponent,
    LoginComponent,
    RegisterComponent,
    InviteComponent,
    UsersComponent,
    UserPermissionComponent,
    UserLocationComponent,
    ShowUserLocationComponent,
    UpdateUserComponent,
    CreateUserComponent,
    DeleteUserComponent,
    CompleteuserregistrationComponent,
    UserProfileComponent,
    ForgotpasswordComponent,
    ResetPasswordComponent,
    ResendEmailComponent,
    Level3authComponent,
    NavResponsiveComponent,
    HeaderComponent,
    SidenavListComponent,
    ProductLocationComponent,
    HasRoleDirective,
    AddSiteComponent,
    AuthorityComponent,
    EditSiteComponent,
    AddLocationComponent,
    AddDepartmentComponent,
    AddSubDepartmentComponent,
    AddFloorComponent,
    ReportComponent,
    GenerateComponent,
    ScheduleComponent,
    SearchComponent,
    ProductPageComponent,
    RequestComponent,
    UserReportComponent,
    CompanyReportComponent,
    ReportMenuComponent,
    AuthLevelsComponent,
    HelpComponent,
    ContactUsComponent,
    RequestConfirmComponent,
    PageNotFoundComponent,
    InventoryProductComponent,
    EditProductComponent,
    ManufacturerfilterComponent,
    LocationfilterComponent,
    ProductCasfilterComponent,
    CreateManufacturerComponent,
    EditManufacturerComponent,
    ContactLocationComponent,
    InventoryDetailComponent,
    InventoryEditComponent,
    ExportListComponent,
    ProductLabelComponent,
    LocationTreeComponent,
    AuthorityTreeComponent,
    CreateSecondarynameComponent,
    UpdateSecondarynameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatTabsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTreeModule,
    MatTooltipModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatStepperModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        //whitelistedDomains: ['https://localhost:44309']
        whitelistedDomains: ['https://ohssdsapidev.azurewebsites.net']
      }
    })
  ],
  providers: [
    AuthGuard,
    ApiService,
    AuthService,
    UserService,
    AlertifyService,
    AuthInterceptor,
    MatDatepickerModule,
    MatNativeDateModule,
    PaginationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddSiteComponent,
    EditSiteComponent,
    AddLocationComponent,
    AddDepartmentComponent,
    AddSubDepartmentComponent,
    AddFloorComponent,
    GenerateComponent,
    ScheduleComponent,
    AddLocationComponent,
    ProductPageComponent,
    RequestConfirmComponent,
    ProductLocationComponent,
    CreateManufacturerComponent,
    InventoryDetailComponent,
    EditManufacturerComponent,
    InventoryEditComponent,
    ExportListComponent,
    ProductLabelComponent,
    UserProfileComponent,
    LoginComponent,
    CreateSecondarynameComponent,
    UpdateSecondarynameComponent
    // ResendEmailComponent
  ]
})
export class AppModule {
  constructor(router: Router) {
    // Use a custom replacer to display function names in the route configs
    // const replacer = (key, value) => (typeof value === 'function') ? value.name : value;
    // console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
