import { TestBed } from '@angular/core/testing';

import { MsgFormService } from './msg-form.service';

describe('MsgFormService', () => {
  let service: MsgFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
