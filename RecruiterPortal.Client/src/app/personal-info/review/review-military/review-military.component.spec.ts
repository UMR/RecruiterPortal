import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMilitaryComponent } from './review-military.component';

describe('ReviewMilitaryComponent', () => {
  let component: ReviewMilitaryComponent;
  let fixture: ComponentFixture<ReviewMilitaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewMilitaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewMilitaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
