import { Injectable,ViewChild } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadCompanies,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addCompany,
  addCompanySuccess,
  addAddress,
  addAddressSuccess
} from './company.actions';
import { CompanyService } from './company.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom ,mergeMap} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Injectable()
export class CompanyEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private companyService: CompanyService,
    
  ) {}
  @ViewChild(MatPaginator) _paginator!: MatPaginator;
  @ViewChild(MatSort) _sort!: MatSort;
  // Run this code when a loadCompanies action is 
/*   this.location$ = fromEvent<Event>(this.queryInput.nativeElement, 'keyup').pipe(
    map(event => (event.target as HTMLInputElement).value),
    distinctUntilChanged(),
    filter(query => query.length > 3),
    switchMap(query => this.weatherService.autocomplete(query)),
    map(locations => locations[0])); */

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanies),
      mergeMap(() =>
        this.companyService.getCompanies().pipe(
          // Take the returned value and return a new success action containing the companies
          map((companies) => {
      
            return loadCompaniesSuccess({ companies: companies })}),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadCompaniesFailure({ error })))
        )
      )
    )
  );
  addCompany$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addCompany),
    mergeMap(({company}) =>
      this.companyService.CreateCompany(company).pipe(
        // Take the returned value and return a new success action containing the companies
        map((company) => addCompanySuccess(company)),
        // Or... if it errors return a new failure action containing the error
        catchError((error) => of(loadCompaniesFailure({ error })))
      )
    )
  )
);
addAddress$ = createEffect(() =>
this.actions$.pipe(
  ofType(addAddress),
  mergeMap(({address}) =>
    this.companyService.CreateAddress(address).pipe(
      // Take the returned value and return a new success action containing the companies
      map((address) => addAddressSuccess(address)),
      // Or... if it errors return a new failure action containing the error
      catchError((error) => of(loadCompaniesFailure({ error })))
    )
  )
)
);


}
