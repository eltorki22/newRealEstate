import { TestBed } from '@angular/core/testing';

import { SendUserService } from './send-user.service';

describe('SendUserService', () => {
  let service: SendUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
