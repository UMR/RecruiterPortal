import { TestBed } from '@angular/core/testing';

import { OfferedService } from './offered.service';

describe('OfferedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OfferedService = TestBed.get(OfferedService);
    expect(service).toBeTruthy();
  });
});
