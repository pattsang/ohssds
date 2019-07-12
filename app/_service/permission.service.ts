import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  //baseUrl = environment.apiUrl;
   baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

constructor(private http: HttpClient) { }

// assigns this user with the email to a role
userPermission(email: string, role: string){
  return this.http.post(this.baseUrl + `userrole/assign` , {email, role});
}

// this populates the drop down 
getRoles(){
  return this.http.get(this.baseUrl + `role/roles`);
}
}
