import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceLetterComponent } from './reference-letter.component';

describe('ReferenceLetterComponent', () => {
  let component: ReferenceLetterComponent;
  let fixture: ComponentFixture<ReferenceLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
