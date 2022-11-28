import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/material.module';
import { AppComponent } from '../app.component';
import { CompanyComponent } from '../company/company.component';
import { PopupComponent } from './popup.component';

describe('PopupComponent', () => {
  let component: PopupComponent;
  let fixture: ComponentFixture<PopupComponent>;
  let debugEl: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: Store, useValue: {} },
      ],
      declarations: [AppComponent, CompanyComponent, PopupComponent],
      imports: [
        MaterialModule,
        MatSnackBarModule,
        MatDialogModule,
        HttpClientTestingModule,
        FormsModule,
        BrowserModule,
        ReactiveFormsModule,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(PopupComponent);
        component = fixture.componentInstance;
        debugEl = fixture.debugElement.query(By.css('form'));
        el = debugEl.nativeElement;
      });
  }));

  it('should set submitted to true', async(() => {
    component.SaveCompany();
    expect(component.SaveCompany).toBeTruthy();
  }));

  it('should call the SaveCompany method', async(() => {
    spyOn(component, 'SaveCompany');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.SaveCompany).toHaveBeenCalledTimes(0);
  }));

  it('form should be invalid', async(() => {
    component.companyform.controls['name'].setValue('');
    component.companyform.controls['address'].setValue('');
    component.companyform.controls['firstName'].setValue('');
    component.companyform.controls['orgurl'].setValue('');
    component.companyform.controls['lastName'].setValue('');
    component.companyform.controls['email'].setValue('');
    component.companyform.controls['telephone'].setValue('');
    component.companyform.controls['postCode'].setValue('');
    component.companyform.controls['city'].setValue('');
    expect(component.companyform.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.companyform.controls['name'].setValue('test');
    component.companyform.controls['address'].setValue('test');
    component.companyform.controls['firstName'].setValue('test');
    component.companyform.controls['orgurl'].setValue('test.com');
    component.companyform.controls['lastName'].setValue('test');
    component.companyform.controls['email'].setValue('test@exp.com');
    component.companyform.controls['telephone'].setValue('1234567890');
    component.companyform.controls['postCode'].setValue('12345');
    component.companyform.controls['city'].setValue('test');
    expect(component.companyform.valid).toBeTruthy();
  }));
});
