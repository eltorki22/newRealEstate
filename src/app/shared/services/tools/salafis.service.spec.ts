import { TestBed } from '@angular/core/testing';

import { SalafisService } from './salafis.service';

describe('SalafisService', () => {
  let service: SalafisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalafisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
