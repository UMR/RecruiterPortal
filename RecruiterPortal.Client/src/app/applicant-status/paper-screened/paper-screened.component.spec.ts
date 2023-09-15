import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperScreenedComponent } from './paper-screened.component';

describe('PaperScreenedComponent', () => {
  let component: PaperScreenedComponent;
  let fixture: ComponentFixture<PaperScreenedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperScreenedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperScreenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
