import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { debounceTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

constructor(private http: HttpClient) { }
 
//baseUrl = environment.apiUrl;
 baseUrl = 'https://ohssdsapidev.azurewebsites.net/api/v1/';


// manufacturerInformation(searchString) {
//   return this.http.get(this.baseUrl + `manufacturers/manfucturerdropdown`, searchString);
// }

manufacturerInformation() {
  return this.http.get(this.baseUrl + `manufacturers/manfucturerdropdown`);
}


// manufacturerInformation(searchString) {
//         const listOfManufacturers = this.http.get(this.baseUrl + `manufacturers/manfucturerdropdown?searchString=${searchString}`)
//         .pipe(
//             debounceTime(20),
//             map(
//                 (data: any) => {
//                     return (
//                         data.length !== 0 ? data as any[] : [{'Manufacturers': 'No Record Found'} as any]
//                     );
//                 }
//         ));
//         return listOfManufacturers;
//     }


createManufacturer(model: any) {
  return this.http.post(this.baseUrl + 'manufacturers/create', model);
}

updateManufacturer(id: string, model: any) {
  return this.http.put(this.baseUrl + 'manufacturers/' + id, model);
}

getByManufacturerId(id: number){
  return this.http.get(this.baseUrl + 'manufacturers/' + id);
}
}
