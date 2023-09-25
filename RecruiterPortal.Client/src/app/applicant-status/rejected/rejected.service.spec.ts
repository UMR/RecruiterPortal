import { TestBed } from '@angular/core/testing';

import { RejectedService } from './rejected.service';

describe('RejectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RejectedService = TestBed.get(RejectedService);
    expect(service).toBeTruthy();
  });
});
