import { createSelector } from '@ngrx/store';
import { AppState } from './app.state';
import { AdvertiserState } from './company.reducer';

export const selectCompanies = (state: AppState) => state.companies;
export const selectAllCompanies = createSelector(
  selectCompanies,
  (state: AdvertiserState) => state.companies
);
export const selectAddresses = (state: AppState) => state.addresses;
export const selectAllAddresses = createSelector(
  selectAddresses,
  (state: AdvertiserState) => state.addresses
);
