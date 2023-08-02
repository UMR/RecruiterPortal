import { TestBed } from '@angular/core/testing';

import { ReviewEmploymentService } from './review-employment.service';

describe('ReviewEmploymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewEmploymentService = TestBed.get(ReviewEmploymentService);
    expect(service).toBeTruthy();
  });
});
