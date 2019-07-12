import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class ExporListService {
  //baseUrl = environment.apiUrl;
   baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

  constructor(private http: HttpClient) {}

  getExportList(selection: any): Observable<any> {

    return this.http.get(
      // this.baseUrl + `products/exportList?selection=${selection}`, { headers: new HttpHeaders({
        this.baseUrl + `products/ExportInventoryList?${selection}`, { headers: new HttpHeaders({'Content-Type': 'application/json'}),
        responseType: 'blob' as 'json' }
    );
  }
}