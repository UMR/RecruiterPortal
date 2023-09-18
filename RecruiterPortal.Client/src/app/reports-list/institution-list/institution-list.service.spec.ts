import { TestBed } from '@angular/core/testing';

import { InstitutionListService } from './institution-list.service';

describe('InstitutionListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstitutionListService = TestBed.get(InstitutionListService);
    expect(service).toBeTruthy();
  });
});
