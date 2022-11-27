import { Injectable } from '@angular/core';
 import { Observable } from 'rxjs';
import { companymodel } from 'src/app/Model/companymodel';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private http:HttpClient) {}

  apiurlforCompanies='http://localhost:3000/companies';
  apiurlforAddress='http://localhost:3000/addresses';

 // apiurl='https://arkham.cvtr.io/test/api/advertisers';


  getCompanies():Observable<companymodel[]>{

    return this.http.get<companymodel[]>(this.apiurlforCompanies);
  }
  CreateCompany(companydata:any): Observable<any>{
 
    return this.http.post<any>(this.apiurlforCompanies,companydata);
  }
  CreateAddress(addressData:any): Observable<any>{
 
    return this.http.post<any>(this.apiurlforAddress,addressData);
  }
 
}
