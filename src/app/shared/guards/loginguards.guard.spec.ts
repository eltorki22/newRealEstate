import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginguardsGuard } from './loginguards.guard';

describe('loginguardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginguardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
