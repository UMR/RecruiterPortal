import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HepabHippaInfoComponent } from './hepab-hippa-info.component';

describe('HepabHippaInfoComponent', () => {
  let component: HepabHippaInfoComponent;
  let fixture: ComponentFixture<HepabHippaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HepabHippaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HepabHippaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
