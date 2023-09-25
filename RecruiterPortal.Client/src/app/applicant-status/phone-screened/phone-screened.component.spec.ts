import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneScreenedComponent } from './phone-screened.component';

describe('PhoneScreenedComponent', () => {
  let component: PhoneScreenedComponent;
  let fixture: ComponentFixture<PhoneScreenedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneScreenedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneScreenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
