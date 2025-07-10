import { TestBed } from '@angular/core/testing';

import { ArrestdocumentService } from './arrestdocument.service';

describe('ArrestdocumentService', () => {
  let service: ArrestdocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrestdocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
