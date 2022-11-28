import { createAction, props } from '@ngrx/store';
import { Company } from '../model/company';

export const loadCompanies = createAction('[Company Page] Load Companies');

export const loadCompaniesSuccess = createAction(
  '[Company API] Company Load Success',
  props<{ companies: Company[] }>()
);

export const loadCompaniesFailure = createAction(
  '[Company API] Company Load Failure',
  props<{ error: string }>()
);

export const addCompany = createAction(
  '[Company Page] Add Company',
  (company: Company) => ({ company })
);
export const addCompanySuccess = createAction(
  '[Company Page] Add company success',
  (company: Company) => ({ company })
);
export const addCompanyFailure = createAction(
  '[Company Page] Add company failure',
  props<{ error: string }>()
);
export const addAddress = createAction(
  '[Address ] Add Address',
  (address: any) => ({ address })
);
export const addAddressSuccess = createAction(
  '[Company Page] Add company success',
  (address: any) => ({ address })
);
export const addAddressFailure = createAction(
  '[Company Page] Add address failure',
  props<{ error: string }>()
);
