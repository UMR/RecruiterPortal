import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEducationComponent } from './review-education.component';

describe('ReviewEducationComponent', () => {
  let component: ReviewEducationComponent;
  let fixture: ComponentFixture<ReviewEducationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewEducationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
