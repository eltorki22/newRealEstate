import { TestBed } from '@angular/core/testing';

import { AddContractService } from './add-contract.service';

describe('AddContractService', () => {
  let service: AddContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
