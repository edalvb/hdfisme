import { TestBed } from '@angular/core/testing';

import { AdministrativosService } from './administrativo.service';

describe('AdministrativoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdministrativosService = TestBed.get(AdministrativosService);
    expect(service).toBeTruthy();
  });
});
