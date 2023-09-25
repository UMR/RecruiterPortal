import { TestBed } from '@angular/core/testing';

import { RefusedService } from './refused.service';

describe('RefusedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RefusedService = TestBed.get(RefusedService);
    expect(service).toBeTruthy();
  });
});
