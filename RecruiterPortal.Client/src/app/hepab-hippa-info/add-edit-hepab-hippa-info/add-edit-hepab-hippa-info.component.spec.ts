import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditHepabHippaInfoComponent } from './add-edit-hepab-hippa-info.component';

describe('AddEditHepabHippaInfoComponent', () => {
  let component: AddEditHepabHippaInfoComponent;
  let fixture: ComponentFixture<AddEditHepabHippaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditHepabHippaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditHepabHippaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
