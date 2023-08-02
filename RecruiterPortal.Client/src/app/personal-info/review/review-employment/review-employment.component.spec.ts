import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEmploymentComponent } from './review-employment.component';

describe('ReviewEmploymentComponent', () => {
  let component: ReviewEmploymentComponent;
  let fixture: ComponentFixture<ReviewEmploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewEmploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEmploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
