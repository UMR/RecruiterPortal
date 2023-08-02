import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndependentContractorAgreementComponent } from './independent-contractor-agreement.component';

describe('IndependentContractorAgreementComponent', () => {
  let component: IndependentContractorAgreementComponent;
  let fixture: ComponentFixture<IndependentContractorAgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndependentContractorAgreementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndependentContractorAgreementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
