import { createAction, props } from '@ngrx/store';
import { companymodel } from '../../Model/companymodel';


export const loadCompanies = createAction(
  '[Company Page] Load Companies'
  );


export const loadCompaniesSuccess = createAction(
  '[Company API] Company Load Success',
  props<{ companies: companymodel[] }>()
);

export const loadCompaniesFailure = createAction(
  '[Company API] Company Load Failure',
  props<{ error: string }>()
);

export const addCompany = createAction(
  '[Company Page] Add Company',
 // props<{ company: companymodel }>()
 (company: companymodel) => ({ company })

);
export const addCompanySuccess = createAction(
  '[Company Page] Add company success',
  (company: companymodel) => ({ company })
  );
  export const addAddress = createAction(
    '[Address ] Add Address',
   (address: any) => ({address})
  
  );
  export const addAddressSuccess = createAction(
    '[Company Page] Add company success',
    (address: any) => ({address})
    );
