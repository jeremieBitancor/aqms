import { TestBed } from '@angular/core/testing';

import { AqmsService } from './aqms.service';

describe('AqmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AqmsService = TestBed.get(AqmsService);
    expect(service).toBeTruthy();
  });
});
