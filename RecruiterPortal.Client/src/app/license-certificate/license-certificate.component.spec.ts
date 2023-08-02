import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCertificateComponent } from './license-certificate.component';

describe('LicenseCertificateComponent', () => {
  let component: LicenseCertificateComponent;
  let fixture: ComponentFixture<LicenseCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
