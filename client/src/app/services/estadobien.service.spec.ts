import { TestBed } from '@angular/core/testing';

import { EstadoBienService } from './estadobien.service';

describe('EstadoBienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoBienService = TestBed.get(EstadoBienService);
    expect(service).toBeTruthy();
  });
});
