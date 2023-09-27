import { TestBed } from '@angular/core/testing';

import { AddInstitutionService } from './add-institution.service';

describe('AddInstitutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddInstitutionService = TestBed.get(AddInstitutionService);
    expect(service).toBeTruthy();
  });
});
