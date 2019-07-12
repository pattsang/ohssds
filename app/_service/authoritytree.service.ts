import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthoritytreeService {
  //baseUrl = environment.apiUrl;
   baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

constructor(
  private http: HttpClient,
) {}

//return this.http.get(this.baseUrl + 'user/getAllUserLocationNames/' + id);
buildAuthorityTree(rootAuthorityUnitId: number) {
  //console.log("in authoritytree server - getAuthorityTree: rootauthorityId " + rootAuthorityUnitId);
  var result = this.http.get(this.baseUrl + `authoritytree/GetAuthorityTree/` + rootAuthorityUnitId);
  return result;
}

getAllAuthorityLocations() {
  return this.http.get(this.baseUrl + `authorities/authoritytree`);
}

getLocationCheckBoxes() {
  return this.http.get(this.baseUrl + 'authorities/LocationCheckBoxes');
}

createLocation(model: any) {
  return this.http.post(this.baseUrl + `authorities/create`, model);
}

removeLocation(id: number) {
  return this.http.delete(this.baseUrl + 'authorities/' + id);
}

updateLocation(updateModel: any) {
  return this.http.post(this.baseUrl + 'authorities/updateHierarchy', updateModel);
}
}
