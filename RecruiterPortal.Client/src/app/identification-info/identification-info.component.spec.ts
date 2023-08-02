import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationInfoComponent } from './identification-info.component';

describe('identificationInfoComponent', () => {
  let component: IdentificationInfoComponent;
  let fixture: ComponentFixture<IdentificationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IdentificationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
