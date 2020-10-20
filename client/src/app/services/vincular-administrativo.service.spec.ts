import { TestBed } from '@angular/core/testing';

import { VincularAdministrativoService } from './vincular-administrativo.service';

describe('VincularAdministrativoService', () => {
  let service: VincularAdministrativoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VincularAdministrativoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
