import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNurseFormComponent } from './add-edit-nurse-form.component';

describe('AddEditNurseFormComponent', () => {
  let component: AddEditNurseFormComponent;
  let fixture: ComponentFixture<AddEditNurseFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditNurseFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditNurseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
