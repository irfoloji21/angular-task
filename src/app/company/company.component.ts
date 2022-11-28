import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Company } from '../model/company';
import { PopupComponent } from '../popup/popup.component';
import { ApiService } from '../services/api.service';
import * as alertify from 'alertifyjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { selectAllCompanies } from '../state/company.selectors';
import { Store } from '@ngrx/store';
import { loadCompanies } from '../state/company.actions';
import { AppState } from '../state/app.state';
import { map, mergeMap, toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap, forkJoin, filter, skip } from 'rxjs';
import { CompanyService } from '../services/company.service';
import { Address } from '../model/address';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private api: ApiService,
    private api2: CompanyService,
    private store: Store<AppState>,
    private http: HttpClient
  ) {
    this.store.dispatch(loadCompanies());
  }
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  companydata!: Company[];
  finaldata: any;
  popUpId!: number;

  allCompanies$ = this.store.select(selectAllCompanies).pipe(
    skip(1),
    switchMap((companies) => {
      // const members1=members['hydra:member'];
      this.popUpId = companies.length;
      const obs = companies.map(
        (per: Company) =>
          this.http.get('http://localhost:3000/addresses?@id=' + per.address)
        // this.http.get('https://arkham.cvtr.io/test/api'+per.address));
      );

      return forkJoin(obs).pipe(
        map((address:any) => {
          return address.map((addressObj: Address[], i: number) => {
          
              return {
                ...companies[i],
                address: addressObj[0].address,
              };
          });
        })
      );
    })
  );

  res!: any[];

  ngOnInit() {
    this.LoadCompany();
  }

  displayColumns: string[] = [
    'id',
    'name',
    'orgurl',
    'firstName',
    'lastName',
    'email',
    'telephone',
    'updatedTs',
    'address',
  ];

  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: { id: this.popUpId },
    });
    _popup.afterClosed().subscribe((result) => {
      this.LoadCompany();
    });
  }

  LoadCompany() {}

  EditCompany(id: number) {
    this.Openpopup(id);
  }

  RemoveCompany(id: number) {
    alertify.confirm(
      'Remove Company',
      'Are you sure you want to remove this company?',
      () => {
        /*    this.api.RemoveCompanybycode(id).subscribe(response=>{
        this.LoadCompany();
      }); */
      },
      function () {}
    );
  }
}
