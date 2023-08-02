import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CprComponent } from './cpr.component';

describe('CprComponent', () => {
  let component: CprComponent;
  let fixture: ComponentFixture<CprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
