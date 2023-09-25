import { TestBed } from '@angular/core/testing';

import { AcceptedService } from './accepted.service';

describe('AcceptedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcceptedService = TestBed.get(AcceptedService);
    expect(service).toBeTruthy();
  });
});
