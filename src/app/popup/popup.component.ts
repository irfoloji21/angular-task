
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { addCompany } from '../state/companies/company.actions';
import { companymodel } from '../Model/companymodel';
import { Address } from '../Model/address';

import { loadCompanies } from '../state/companies/company.actions';
import { addAddress } from '../state/companies/company.actions';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements OnInit {
  editdata: any;
  filingDate: any;
  company: companymodel | any;
  


  constructor(private builder:FormBuilder, private dialog:MatDialog, private api:ApiService,private store:Store<AppState>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.data.id = this.data.id +1;
   /*    this.api.GetCompanybycode(this.data.id).subscribe(response => {
        this.editdata = response;
        this.filingDate = new Date();
        this.companyform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          orgurl: this.editdata.orgurl,
          firstName: this.editdata.firstName,
          lastName: this.editdata.lastName,
          email: this.editdata.email,
          telephone: this.editdata.telephone,
          updatedTs: this.filingDate,
          address: this.editdata.address
        });
      }) */
    }
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    name: this.builder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    orgurl: this.builder.control('', [Validators.required]),
    firstName: this.builder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    lastName: this.builder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: this.builder.control('', [Validators.required, Validators.email]),
    telephone: this.builder.control('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    updatedTs: this.builder.control(''),
    address: this.builder.control('', [Validators.required]),
    city: this.builder.control('', [Validators.required]),
    postCode: this.builder.control('', [Validators.required])


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
          "@id": "/addresses/" +this.data.id,
          "@type": "Address",
          city: this?.companyform?.value.city,
          address: this?.companyform?.value.address,
          id:this.data.id,
          postcode:this?.companyform?.value.postCode,
          updatedTs:new Date()
        };
   
        this.store.dispatch(addAddress( address ));
        this.company = this.companyform.value;
        this.company.id = this.data.id;
        this.company['@id'] = "/advertisers/" + this.data.id;
        this.company['@type'] = "advertisers";
        this.company.address ="/addresses/"+ this.data.id;
        this.company.updatedTs = new Date();        
        this.store.dispatch(addCompany( this.company ));
        this.closepopup();
        alertify.success("Company Saved Successfully");
        this.store.dispatch(loadCompanies());
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}


