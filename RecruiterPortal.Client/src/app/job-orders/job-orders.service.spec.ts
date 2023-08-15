import { TestBed } from '@angular/core/testing';

import { JobOrdersService } from './job-orders.service';

describe('JobOrdersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JobOrdersService = TestBed.get(JobOrdersService);
    expect(service).toBeTruthy();
  });
});
