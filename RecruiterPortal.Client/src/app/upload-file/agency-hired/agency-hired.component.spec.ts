import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyHiredComponent } from './agency-hired.component';

describe('AgencyHiredComponent', () => {
  let component: AgencyHiredComponent;
  let fixture: ComponentFixture<AgencyHiredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencyHiredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgencyHiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
