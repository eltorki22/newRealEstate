import { TestBed } from '@angular/core/testing';

import { PreviousContractService } from './previous-contract.service';

describe('PreviousContractService', () => {
  let service: PreviousContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviousContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
