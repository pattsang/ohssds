import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Whmis2015Service {

constructor(private http: HttpClient) { }

//baseUrl = environment.apiUrl;
 baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

getHealthClass() {
  return this.http.get(this.baseUrl + 'whmis2015/healthClasses');
}

getPhysicalClass() {
  return this.http.get(this.baseUrl + 'whmis2015/PhysicalClasses');
}

getHealthRoutes() {
  return this.http.get(this.baseUrl + 'whmis2015/healthRoutes');
}

getPhysicalRoutes() {
  return this.http.get(this.baseUrl + 'whmis2015/physicalRoutes');
}

getHealthCategories() {
  return this.http.get(this.baseUrl + 'whmis2015/healthHazardCategorys');
}

getPhysicalCategories() {
  return this.http.get(this.baseUrl + 'whmis2015/physicalHazardCategorys');
}

getTransportHazardClasses() {
  return this.http.get(this.baseUrl + 'whmis2015/transportHazardClasses');
}

getAllIArcValues() {
  return this.http.get(this.baseUrl + 'whmis2015/iarcValues');
}

getAllAcgihValues() {
  return this.http.get(this.baseUrl + 'whmis2015/acgihValues');
}

getAllNFPARatingsHealthValues() {
  return this.http.get(this.baseUrl + 'whmis2015/nfpaRatingsHealth');
}

getAllNfpaRatingsFlammabilityValues() {
  return this.http.get(this.baseUrl + 'whmis2015/nfpaRatingsFlammability');
}

getAllNfpaRatingsInstability() {
  return this.http.get(this.baseUrl + 'whmis2015/nfpaRatingsInstability');
}

getAllNfpaRatingsSpecific() {
  return this.http.get(this.baseUrl + 'whmis2015/nfpaRatingsSpecific');
}

getAllHmisRatingsHealth() {
  return this.http.get(this.baseUrl + 'whmis2015/hmisRatingshealth');
}

getAllHmisRatingsChronic() {
  return this.http.get(this.baseUrl + 'whmis2015/hmisRatingsChronic');
}

getAllHmisRatingsFlammability() {
  return this.http.get(this.baseUrl + 'whmis2015/hmisRatingsFlammability');
}

getAllHmisRatingsReactivity() {
  return this.http.get(this.baseUrl + 'whmis2015/hmisRatingsReactivity');
}

getPictograms() {
  return this.http.get(this.baseUrl + 'whmis2015/pictograms');
}
}
