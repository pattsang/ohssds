import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  //baseUrl = environment.apiUrl;
   baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

constructor(private http: HttpClient) { }


insertNewSite(authority: any) {
  console.log('Location Service Url: ' + this.baseUrl + 'authorities/addNewSite')
  return this.http.post(this.baseUrl + 'authorities/addNewSite' , authority);
}

updateLocations(model: any) {
  return this.http.post(this.baseUrl + 'authorities/updatetree', model);
}

removeLocation(id: number) {
  return this.http.delete(this.baseUrl + 'authorities/' + id);
}

getLocationDropDown() {
  return this.http.get(this.baseUrl + 'authorities/authorityDropDown');
}

getAllTopAuthorityNames() {
  return this.http.get(this.baseUrl + 'authorities/GetAllTopAuthorities');
}

level1DropDown(id: number) {
  return this.http.get(this.baseUrl + 'authorities/level1DropDown/' + id);
}

level2DropDown(id: number) {
  return this.http.get(this.baseUrl + 'authorities/level2DropDown/' + id);
}

level3DropDown(id: number) {
  return this.http.get(this.baseUrl + 'authorities/level3DropDown/' + id);
}

level4DropDown(id: number) {
  return this.http.get(this.baseUrl + 'authorities/level4DropDown/' + id);
}

locationHiararchy() {
  return this.http.get(this.baseUrl + 'authorities/AuthorityHierarchy');
  // return this.http.get(this.baseUrl + 'authorities/AdminLocationHierarchy');
}

}

