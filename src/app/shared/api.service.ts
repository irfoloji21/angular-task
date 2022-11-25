import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { companymodel } from '../Model/companymodel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:3000/companies';

  Getallcompany(){
    return this.http.get<any>(this.apiurl);
  }

  GetCompanybycode(id:any){
    return this.http.get<any>(this.apiurl + '/' + id);
  }

  RemoveCompanybycode(id:any){
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateCompany(companydata:any){
    return this.http.post(this.apiurl,companydata);
  }

  UpdateCompany(id:any, companydata:any){
    return this.http.put(this.apiurl + '/' + id,companydata);
  }
  getCompaniesFromNgrx(){
    console.log("dd");
    
  }

  }
