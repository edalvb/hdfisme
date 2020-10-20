import { TestBed } from '@angular/core/testing';

import { TipoBienService } from './tipobien.service';

describe('TipoBienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoBienService = TestBed.get(TipoBienService);
    expect(service).toBeTruthy();
  });
});
