import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfluenzaVaccinationComponent } from './influenza-vaccination.component';

describe('InfluenzaVaccinationComponent', () => {
  let component: InfluenzaVaccinationComponent;
  let fixture: ComponentFixture<InfluenzaVaccinationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfluenzaVaccinationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfluenzaVaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
