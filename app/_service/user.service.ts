import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  //baseUrl = environment.apiUrl;
   baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

  jwtHelper = new JwtHelperService();

  getToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getUserByEmail(email) {
    return this.http.get(this.baseUrl + `user/GetUserDetail?email=${email}`);
  }

  // return all top authorities, without any filtering
  getAllTopAuthorities() {
    return this.http.get(this.baseUrl + `user/AllTopAuthorityNames`);
  }

  getAuthorityNames() {
    return this.http.get(this.baseUrl + `user/TopAuthorityNames`);
  }

  getLevel1AuthorityNames() {
    return this.http.get(this.baseUrl + `user/Level1AuthorityNames`);
  }
  getLevel2AuthorityNames() {
    return this.http.get(this.baseUrl + `user/Level2AuthorityNames`);
  }
  getLevel3AuthorityNames() {
    return this.http.get(this.baseUrl + `user/Level3AuthorityNames`);
  }

// gets all users by Authority
  getAllUsersByAuthority() {
    return this.http.get(this.baseUrl + `user/GetAllUsers`);
  }

  // getAllUsersByAuthority(authorityUnitId: number) {
  //   return this.http.get(this.baseUrl + `user/GetAllUsersFromSpecificAuth/` + authorityUnitId);
  // }
  
// gets user by id
  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'user/GetSDSUser/' + id);
  }

// update sds user
  updateUserInfo(id: string, user: any) {
    return this.http.put(this.baseUrl + 'user/' + id, user);
  }
 // update identity user
  updateIdentityPassword(user: any){
    return this.http.post(this.baseUrl + 'user/UpdatePassword/' , user);
  }

  inviteUserBySiteAdmin(model: any) {
    return this.http.post(this.baseUrl + 'user/invite' , model);
  }

  // return this.http.post(this.baseUrl + "login", { email, password })
  assignUserLocation(model: any){
    // console.log(model);
    return this.http.post(this.baseUrl + `user/assign?${model}`,  model);
  }

  // completeInviteeRegistration(user: any){
  //   // console.log('This is coming from the completeInviteeRegistration' + ' ' + this.baseUrl + 'update/');
  //   return this.http.post(this.baseUrl + 'user/update/' , user);
  // }

  getUserByOutSideId(id: string){
    return this.http.get(this.baseUrl + `user/getUserByOutSideId/` + id);
  }

  //returns the user object
  getIdentityUser(id: string){
    return this.http.get(this.baseUrl + 'user/GetIdentityUser/' + id);
  }

  createInternalUser(model: any) {
    return this.http.post(this.baseUrl + 'admin/CreateInternalUser', model);
  }

  getUserId() {
   // var userId = this.http.get(this.baseUrl + 'getUserId');
    //console.log('this is in the userService' + userId[0].userId);
    return this.http.get(this.baseUrl + 'user/getUserId');
  }

  /********DropDown*********/
  // return this.http.post(this.baseUrl + "login", { email, password }).pipe(

  level1DropDown(id: number) {
    return this.http.get(this.baseUrl + 'user/level1DropDown/' + id);
  }

  level2DropDown(id: number) {
    return this.http.get(this.baseUrl + 'user/level2DropDown/' + id);
  }

  level3DropDown(id: number) {
    return this.http.get(this.baseUrl + 'user/level3DropDown/' + id);
  }

  getAllUserLocationNames(id: number){
    return this.http.get(this.baseUrl + 'user/getAllUserLocationNames/' + id);
  }

  removeUser(id: number) {
    //console.log(id);
    return this.http.delete(this.baseUrl + 'user/deleteUser/' + id);
  }
  
  getUserLocation(id: string) {
    return this.http.get(this.baseUrl + 'user/GetUserLocation/' + id);
  }

  removeUserLocation(model: any) {
    //console.log('from service: ' + model);
    return this.http.post(this.baseUrl + 'user/RemoveUserLocation', model);
  }
}
