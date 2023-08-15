import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeFeeAgreementComponent } from './administrative-fee-agreement.component';

describe('AdministrativeFeeAgreementComponent', () => {
  let component: AdministrativeFeeAgreementComponent;
  let fixture: ComponentFixture<AdministrativeFeeAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeFeeAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeFeeAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
