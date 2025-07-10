import { TestBed } from '@angular/core/testing';

import { ExchangesalariesService } from './exchangesalaries.service';

describe('ExchangesalariesService', () => {
  let service: ExchangesalariesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangesalariesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
