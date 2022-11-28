import { HttpClientModule } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing'; // 1
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompanyComponent } from './company/company.component';
import { environment } from './environments/environment';
import { PopupComponent } from './popup/popup.component';
import { CompanyEffects } from './state/company.effects';
import { companyReducer } from './state/company.reducer';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, PopupComponent, CompanyComponent],
      imports: [
        MatDialogModule,
        MaterialModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot({ companies: companyReducer }),
        StoreDevtoolsModule.instrument({
          maxAge: 25,
          logOnly: environment.production,
        }),
        EffectsModule.forRoot([CompanyEffects]),
      ],
    }).compileComponents();
  }));

  it(`should have as title 'AngularTask'`, () => {
    //5
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('AngularTask');
  });

  it('should create the app', () => {
    // 4
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
