import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UmrHealthFormComponent } from './umr-health-form.component';

describe('UmrHealthFormComponent', () => {
  let component: UmrHealthFormComponent;
  let fixture: ComponentFixture<UmrHealthFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UmrHealthFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UmrHealthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
