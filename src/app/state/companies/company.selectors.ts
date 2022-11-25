import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CompanyState } from './company.reducer';


export const selectCompanies = (state: AppState) => state.companies;
export const selectAllCompanies = createSelector(
  selectCompanies,
  (state: CompanyState) => state.companies
);
export const selectAddresses = (state: AppState) => state.addresses;
export const selectAllAddresses = createSelector(
  selectAddresses,
  (state: CompanyState) => state.addresses
);
