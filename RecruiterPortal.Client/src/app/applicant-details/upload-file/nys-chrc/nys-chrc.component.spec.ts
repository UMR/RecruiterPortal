import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NysChrcComponent } from './nys-chrc.component';

describe('NysChrcComponent', () => {
  let component: NysChrcComponent;
  let fixture: ComponentFixture<NysChrcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NysChrcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NysChrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
