import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReferenceComponent } from './review-reference.component';

describe('ReviewReferenceComponent', () => {
  let component: ReviewReferenceComponent;
  let fixture: ComponentFixture<ReviewReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
