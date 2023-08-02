import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UscisInfoComponent } from './uscis-info.component';

describe('UscisInfoComponent', () => {
  let component: UscisInfoComponent;
  let fixture: ComponentFixture<UscisInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UscisInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UscisInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
