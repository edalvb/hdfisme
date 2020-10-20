import { TestBed } from '@angular/core/testing';

import { EstadoMovimientoService } from './estadomovimiento.service';

describe('EstadomovimientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstadoMovimientoService = TestBed.get(EstadoMovimientoService);
    expect(service).toBeTruthy();
  });
});
