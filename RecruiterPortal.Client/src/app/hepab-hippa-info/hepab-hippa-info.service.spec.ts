import { TestBed } from '@angular/core/testing';

import { HepabHippaInfoService } from './hepab-hippa-info.service';

describe('HepabHippaInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HepabHippaInfoService = TestBed.get(HepabHippaInfoService);
    expect(service).toBeTruthy();
  });
});
