import { createReducer, on } from '@ngrx/store';
import {
  loadCompanies,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addCompany,
  addCompanySuccess,
  addAddress,
  addAddressSuccess
} from './company.actions';
import { companymodel } from '../../Model/companymodel';


export interface CompanyState {
  addresses:any;
  companies: any;
  error: any;
  status: 'pending' | 'loading' | 'error' | 'success';
}

export const initialState: CompanyState = {
  addresses:[],
  companies: [],
  error: null,
  status: 'pending',
};

 
 
export const companyReducer = createReducer(
  // Supply the initial state
initialState,

  // Trigger loading the Companies
  on(loadCompanies, (state) => ({ ...state, status: 'loading' })),
  // Handle successfully loaded Companies
  on(loadCompaniesSuccess, (state, { companies }) => ({
    ...state,
    companies: companies,
    error: null,
    status: 'success',
  })),
  // Handle Companies load failure
  on(loadCompaniesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
  on(addCompany, (state, { company }) => ({
    ...state,
   // companies: [...state.companies['hydra:member'],  company ],
   companies: [...state.companies,  company ],

  })),
  on(addCompanySuccess, (state,  company ) => ({
    ...state,
     company,
    error: null,
    status: 'success',
  })),

  on(addAddress, (state, { address }) => ({
    ...state,
   // companies: [...state.companies['hydra:member'],  company ],
   addresses: [...state.addresses,  address ],

  })),
  on(addAddressSuccess, (state,  address ) => ({
    ...state,
     address,
    error: null,
    status: 'success',
  })),


);
