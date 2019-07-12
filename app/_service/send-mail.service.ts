import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {
  constructor(public http: HttpClient) {}

  //baseUrl = environment.apiUrl;
   baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';

  sendRequest(request: any) {
    return this.http.post(this.baseUrl + 'mail/send', request); // TO DO here mail/send doesn't exist
  }

  sdsRequest(model: any) {
    return this.http.post(this.baseUrl + `SDSRequest/sdsReq` , model);
  }

  siteAdminSDSRequest(request: any) {
    return this.http.post(this.baseUrl + `SDSRequest/RequestToAddToInventory`, request);
  }
}
