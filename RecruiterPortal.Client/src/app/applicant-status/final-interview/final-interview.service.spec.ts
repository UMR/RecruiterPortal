import { TestBed } from '@angular/core/testing';

import { FinalInterviewService } from './final-interview.service';

describe('FinalInterviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FinalInterviewService = TestBed.get(FinalInterviewService);
    expect(service).toBeTruthy();
  });
});
