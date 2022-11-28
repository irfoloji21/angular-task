import { Injectable, ViewChild } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCompanies,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addCompany,
  addCompanySuccess,
  addAddress,
  addAddressSuccess,
  addAddressFailure,
  addCompanyFailure,
} from './company.actions';
import { of, from } from 'rxjs';
import {
  map,
  catchError,
  mergeMap,
  switchMap,
} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CompanyService } from 'src/app/services/company.service';
@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private companyService: CompanyService
  ) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanies),
      switchMap(() =>
        this.companyService.getCompanies().pipe(
          // Take the returned value and return a new success action get the companies
          map((companies) => {
            return loadCompaniesSuccess({ companies: companies });
          }),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadCompaniesFailure({ error })))
        )
      )
    )
  );
  addCompany$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCompany),
      switchMap(({ company }) =>
        this.companyService.CreateCompany(company).pipe(
          // Take the returned value and return a new success action add the companies
          map((company) => addCompanySuccess((company))),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(addCompanyFailure({ error })))
        )
      )
    )
  );
  addAddress$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addAddress),
      switchMap(({ address }) =>
        this.companyService.CreateAddress(address).pipe(
          // Take the returned value and return a new success action add the addres
          map((address) => addAddressSuccess(address)),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(addAddressFailure({ error })))
        )
      )
    )
  );
  
}
