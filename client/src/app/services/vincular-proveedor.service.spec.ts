import { TestBed } from '@angular/core/testing';

import { VincularProveedorService } from './vincular-proveedor.service';

describe('VincularProveedorService', () => {
  let service: VincularProveedorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VincularProveedorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
