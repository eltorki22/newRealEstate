import { TestBed } from '@angular/core/testing';

import { SendMsgService } from './send-msg.service';

describe('SendMsgService', () => {
  let service: SendMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
