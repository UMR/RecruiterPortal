import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRequirementsComponent } from './upload-requirements.component';

describe('UploadRequirementsComponent', () => {
  let component: UploadRequirementsComponent;
  let fixture: ComponentFixture<UploadRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
