
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../shared/api.service';
import * as alertify from 'alertifyjs';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent implements OnInit {
  editdata: any;
  filingDate: any;

  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetCompanybycode(this.data.id).subscribe(response => {
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
      })
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
    address: this.builder.control('', [Validators.required])
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const EditId = this.companyform.getRawValue().id;
      if (EditId != '' && EditId != null) {
        this.api.UpdateCompany(EditId, this.companyform.getRawValue()).subscribe(response => {
          this.closepopup();
          alertify.success("Company Updated Successfully");
        });
      } else {
        this.api.CreateCompany(this.companyform.value).subscribe(response => {
          this.closepopup();
          alertify.success("Company Saved Successfully");
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

}


