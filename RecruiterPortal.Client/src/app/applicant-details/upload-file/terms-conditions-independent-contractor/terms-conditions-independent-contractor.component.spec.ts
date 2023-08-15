import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionsIndependentContractorComponent } from './terms-conditions-independent-contractor.component';

describe('TermsConditionsIndependentContractorComponent', () => {
  let component: TermsConditionsIndependentContractorComponent;
  let fixture: ComponentFixture<TermsConditionsIndependentContractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsConditionsIndependentContractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionsIndependentContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
