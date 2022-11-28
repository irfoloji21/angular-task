
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyComponent } from './company/company.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { companyReducer } from './state/company.reducer';
import { environment } from './environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { CompanyEffects } from './state/company.effects';
import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from 'src/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';


@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    PopupComponent
  ],
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
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
