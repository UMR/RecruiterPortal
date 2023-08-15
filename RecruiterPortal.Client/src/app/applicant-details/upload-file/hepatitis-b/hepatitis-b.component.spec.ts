import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HepatitisBComponent } from './hepatitis-b.component';

describe('HepatitisBComponent', () => {
  let component: HepatitisBComponent;
  let fixture: ComponentFixture<HepatitisBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HepatitisBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HepatitisBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
