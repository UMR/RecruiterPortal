import { TestBed } from '@angular/core/testing';

import { CommunicationCenterService } from './communication-center.service';

describe('CommunicationCenterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunicationCenterService = TestBed.get(CommunicationCenterService);
    expect(service).toBeTruthy();
  });
});
