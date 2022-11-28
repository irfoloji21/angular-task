import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from 'src/app/model/company';
import { HttpClient } from '@angular/common/http';
import { Address } from 'src/app/model/address';
@Injectable({ providedIn: 'root' })
export class CompanyService {
  constructor(private http: HttpClient) {}

  apiurlforCompanies = 'http://localhost:3000/companies';
  apiurlforAddress = 'http://localhost:3000/addresses';

  // apiurl='https://arkham.cvtr.io/test/api/advertisers';

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiurlforCompanies);
  }
  CreateCompany(companydata: Company): Observable<Company> {
    return this.http.post<Company>(this.apiurlforCompanies, companydata);
  }
  CreateAddress(addressData: Address): Observable<Address> {
    return this.http.post<Address>(this.apiurlforAddress, addressData);
  }
}
