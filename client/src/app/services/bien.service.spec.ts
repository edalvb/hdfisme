import { TestBed } from '@angular/core/testing';

import { BienService } from './bien.service';

describe('BienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BienService = TestBed.get(BienService);
    expect(service).toBeTruthy();
  });
});
