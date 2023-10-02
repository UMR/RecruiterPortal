import { TestBed } from '@angular/core/testing';

import { RecruiterHistoryService } from './recruiter-history.service';

describe('RecruiterHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecruiterHistoryService = TestBed.get(RecruiterHistoryService);
    expect(service).toBeTruthy();
  });
});
