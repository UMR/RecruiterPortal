import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUscisComponent } from './add-edit-uscis.component';

describe('AddEditUscisComponent', () => {
  let component: AddEditUscisComponent;
  let fixture: ComponentFixture<AddEditUscisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditUscisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditUscisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
