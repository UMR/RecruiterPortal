import { TestBed } from '@angular/core/testing';

import { AddApplicantService } from './add-applicant.service';

describe('AddApplicantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddApplicantService = TestBed.get(AddApplicantService);
    expect(service).toBeTruthy();
  });
});
