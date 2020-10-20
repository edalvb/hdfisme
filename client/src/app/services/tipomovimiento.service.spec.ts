import { TestBed } from '@angular/core/testing';

import { TipomovimientoService } from './tipomovimiento.service';

describe('TipomovimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipomovimientoService = TestBed.get(TipomovimientoService);
    expect(service).toBeTruthy();
  });
});
