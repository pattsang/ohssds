import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

   //baseUrl = environment.apiUrl;
    baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

constructor(
  private http: HttpClient) { }

generateReport(selection: any) {
  return this.http.get(this.baseUrl + `products/export?${selection}`, { headers: new HttpHeaders({'Content-Type': 'application/json'}),
  responseType: 'blob' as 'json' });
}

generateUserReport(selection: any) {
// tslint:disable-next-line: max-line-length
  return this.http.get(this.baseUrl + `user/userReport?${selection}`, { headers: new HttpHeaders({'Content-Type': 'application/json'}),
  responseType: 'blob' as 'json' });
}

}