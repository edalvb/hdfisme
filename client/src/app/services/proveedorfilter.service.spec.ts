import { TestBed } from '@angular/core/testing';

import { ProveedorFilterService } from './proveedorfilter.service';

describe('ProveedorFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProveedorFilterService = TestBed.get(ProveedorFilterService);
    expect(service).toBeTruthy();
  });
});
