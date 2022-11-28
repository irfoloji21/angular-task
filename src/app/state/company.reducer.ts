import { createReducer, on } from '@ngrx/store';
import { Address } from '../model/address';
import { Company } from '../model/company';
import {
  loadCompanies,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addCompany,
  addCompanySuccess,
  addAddress,
  addAddressSuccess,
  addCompanyFailure,
  addAddressFailure
} from './company.actions';

export interface AdvertiserState {
  addresses: Address[];
  companies:Company[];
  error: any;
  status: 'pending' | 'loading' | 'error' | 'success';
}
 
export const initialState: AdvertiserState = {
  addresses: [],
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
    companies: [...state.companies, company],
  })),

  on(addCompanySuccess, (state, company) => ({
    ...state,
    company,
    error: null,
    status: 'success',
  })),
  on(addCompanyFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),

  on(addAddress, (state, { address }) => ({
    ...state,
    addresses: [...state.addresses, address],
  })),
  on(addAddressSuccess, (state, address) => ({
    ...state,
    address,
    error: null,
    status: 'success',
  })),
  on(addAddressFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: 'error',
  })),
);
