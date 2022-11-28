import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../model/company';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  apiurl = 'http://localhost:3000/companies';

  Getallcompany() {
    return this.http.get<Company>(this.apiurl);
  }

  GetCompanybycode(id: number) {
    return this.http.get<Company>(this.apiurl + '/' + id);
  }

  RemoveCompanybycode(id: number) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateCompany(companydata: Company) {
    return this.http.post(this.apiurl, companydata);
  }

  UpdateCompany(id: number, companydata: Company) {
    return this.http.put(this.apiurl + '/' + id, companydata);
  }
}
