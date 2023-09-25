import { TestBed } from '@angular/core/testing';

import { PhoneScreenedService } from './phone-screened.service';

describe('PhoneScreenedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhoneScreenedService = TestBed.get(PhoneScreenedService);
    expect(service).toBeTruthy();
  });
});
