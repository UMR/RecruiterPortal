import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentEligibilityComponent } from './employment-eligibility.component';

describe('EmploymentEligibilityComponent', () => {
  let component: EmploymentEligibilityComponent;
  let fixture: ComponentFixture<EmploymentEligibilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmploymentEligibilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentEligibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
