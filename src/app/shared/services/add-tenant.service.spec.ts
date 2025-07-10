import { TestBed } from '@angular/core/testing';

import { AddTenantService } from './add-tenant.service';

describe('AddTenantService', () => {
  let service: AddTenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
