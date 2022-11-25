import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../Model/companymodel';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompanyService } from '../state/companies/company.service';
import { selectAllCompanies } from '../state/companies/company.selectors';
import { Store } from '@ngrx/store';
import { loadCompanies } from '../state/companies/company.actions';
import { AppState } from '../state/app.state';
import { map,mergeMap,toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable ,of,switchMap,forkJoin,filter,skip} from 'rxjs';

 
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private dialog: MatDialog, private api:ApiService,private api2:CompanyService,private store: Store<AppState>, private http:HttpClient) {
    this.store.dispatch(loadCompanies());

   }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata!: companymodel[];
  finaldata: any;
  popUpId!:number;
 
   allCompanies2$ =   this.store.select(selectAllCompanies)
  .pipe( skip(1),
    switchMap(members=>{
    //create an array of observables
   // const members1=members['hydra:member'];
   const members1 = members;
    this.popUpId=members1.length;
    
    const obs=members1.map((per:any)=>
   
     this.http.get('http://localhost:3000/addresses?@id='+per.address)
   // this.http.get('https://arkham.cvtr.io/test/api'+per.address));
    );

    
    //call all of them in forkjoin
    return forkJoin(obs).pipe(map((address:any)=>

      
      
    {
      console.log(address);
      
       return address.map((addressUrl:any,i:any)=>{
        if (addressUrl != ''){
    
        return {
          ...members1[i], //all the properties of the person
          address:addressUrl[0].address   //+ in pets an array with the pets of the person
          }
        }
      })}
    ))
  })) 

 
  res!:any[];
  
  ngOnInit() {
 
    
  

    
 this.LoadCompany()

   }

  displayColumns :string[]= ['id','name','orgurl','firstName','lastName','email','telephone','updatedTs','address'];

  Openpopup(id: any) {
 
    
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { id: this.popUpId }
      });
      _popup.afterClosed().subscribe(result => {
        this.LoadCompany();
      });
  }

   LoadCompany(){
  

/*     this.api.Getallcompany().subscribe(response=>{
      console.log(response['hydra:member']);
      this.companydata=response['hydra:member'];
      this.finaldata = new MatTableDataSource<any>(this.companydata);
      this.finaldata.paginator = this._paginator;
      this.finaldata.sort = this._sort;
    }); */
  }

  EditCompany(id: any) {
    this.Openpopup(id);
  }

  RemoveCompany(id: any) {
    alertify.confirm("Remove Company", "Are you sure you want to remove this company?", () => {
   /*    this.api.RemoveCompanybycode(id).subscribe(response=>{
        this.LoadCompany();
      }); */
    }, function () {

    })

  }
}

