import { TestBed } from '@angular/core/testing';

import { PecosaService } from './pecosa.service';

describe('PecosaService', () => {
  let service: PecosaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PecosaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
