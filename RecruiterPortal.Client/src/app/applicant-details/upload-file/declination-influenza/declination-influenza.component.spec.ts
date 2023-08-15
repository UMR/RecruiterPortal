import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclinationInfluenzaComponent } from './declination-influenza.component';

describe('DeclinationInfluenzaComponent', () => {
  let component: DeclinationInfluenzaComponent;
  let fixture: ComponentFixture<DeclinationInfluenzaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclinationInfluenzaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclinationInfluenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
