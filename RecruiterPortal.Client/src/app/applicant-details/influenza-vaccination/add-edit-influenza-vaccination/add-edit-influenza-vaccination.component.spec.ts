import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditInfluenzaVaccinationComponent } from './add-edit-influenza-vaccination.component';

describe('AddEditInfluenzaVaccinationComponent', () => {
  let component: AddEditInfluenzaVaccinationComponent;
  let fixture: ComponentFixture<AddEditInfluenzaVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditInfluenzaVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditInfluenzaVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
