import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

constructor(private http: HttpClient) { }

//baseUrl = environment.apiUrl;
 baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

getSDSById(searchString){
  return this.http.get(this.baseUrl + `products/MsdsId?searchString=${searchString}`);
}

getPrecautionaryStatement(searchString){
  return this.http.get(this.baseUrl + `products/PrecautionaryStatement?searchString=${searchString}`);
}

getPictograms(searchString) {
  return this.http.get(this.baseUrl + `products/Pictogram?searchString=${searchString}`);
}

getPictogramUrls() {
  return this.http.get(this.baseUrl + 'whmis2015/pictogramUrls');
}

generateWorkPlaceLabel(model: any, pictogramName: any): Observable<any> {
  return this.http.post(this.baseUrl + `labelgenerator/CreateLabel?${pictogramName}`, model , {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'blob'});
}
}
