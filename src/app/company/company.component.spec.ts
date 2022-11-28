import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MaterialModule } from 'src/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { environment } from '../environments/environment';
import { PopupComponent } from '../popup/popup.component';
import { CompanyEffects } from '../state/company.effects';
import { companyReducer } from '../state/company.reducer';
import { CompanyComponent } from './company.component';

class Page {
  get button(): DebugElement {
    return this.debugEl.query(By.css('button'));
  }
  get input(): DebugElement {
    return this.debugEl.query(By.css('input'));
  }
  get inputEl(): HTMLInputElement {
    return this.input.nativeElement;
  }
  get buttonEl(): HTMLButtonElement {
    return this.button.nativeElement;
  }
  get inputText(): string {
    return this.inputEl.value;
  }
  constructor(public fixture: ComponentFixture<CompanyComponent>) {
    this.debugEl = fixture.debugElement;
  }
  private debugEl: DebugElement;
}

describe('CompanyComponent', () => {
  let component: CompanyComponent;
  let fixture: ComponentFixture<CompanyComponent>;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyComponent,
        PopupComponent],
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


  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

})
