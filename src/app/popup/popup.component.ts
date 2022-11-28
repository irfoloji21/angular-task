import {
  MatDialog,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { addCompany } from '../state/company.actions';
import { Company } from '../model/company';
import { loadCompanies } from '../state/company.actions';
import { addAddress } from '../state/company.actions';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  filingDate!: Date;
  company!: Company;

  constructor(
    private builder: FormBuilder,
    private dialog: MatDialog,
    private api: ApiService,
    private store: Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data: Company
  ) {}

  ngOnInit(): void {
    if (this.data.id != null) {
      this.data.id = this.data.id + 1;
    }
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50),
    ]),
    orgurl: this.builder.control('', [Validators.required]),
    firstName: this.builder.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    lastName: this.builder.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    email: this.builder.control('', [Validators.required, Validators.email]),
    telephone: this.builder.control('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(50),
    ]),
    updatedTs: this.builder.control(''),
    address: this.builder.control('', [Validators.required]),
    city: this.builder.control('', [Validators.required]),
    postCode: this.builder.control('', [Validators.required]),
    '@id': this.builder.control({ value: '', disabled: true }),
    '@type': this.builder.control({ value: '', disabled: true }),
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const EditId = this.companyform.getRawValue().id;
      if (EditId != '' && EditId != null) {
        /*         this.api.UpdateCompany(EditId, this.companyform.getRawValue()).subscribe(response => {
          this.closepopup();
          alertify.success("Company Updated Successfully");
        }); */
      } else {
        console.log(this.data.id);
        const address = {
          '@id': '/addresses/' + this.data.id,
          '@type': 'Address',
          id: this.data.id,
          address: this?.companyform?.value.address,
          city: this?.companyform?.value.city,
          postcode: this?.companyform?.value.postCode,
          updatedTs: new Date(),
        };

        this.store.dispatch(addAddress(address));

        const company = {
          '@id': '/advertisers/' + this.data.id,
          '@type': 'advertisers',
          id: this.data.id,
          name: this?.companyform?.value?.name!,
          orgurl: this?.companyform?.value.orgurl!,
          firstName: this?.companyform?.value.firstName!,
          lastName: this?.companyform?.value.lastName!,
          email: this?.companyform?.value.email!,
          telephone: this?.companyform?.value.telephone!,
          updatedTs: new Date(),
          address: '/addresses/' + this.data.id,
        };
        this.store.dispatch(addCompany(company));
        
        this.closepopup();
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
