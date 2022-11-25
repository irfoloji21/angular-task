import { CompanyState } from './companies/company.reducer';


export interface AppState {
  companies: CompanyState,
  addresses: CompanyState

}
