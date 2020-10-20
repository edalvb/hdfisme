import { TestBed } from '@angular/core/testing';

import { VincularUsuarioService } from './vincular-usuario.service';

describe('VincularUsuarioService', () => {
  let service: VincularUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VincularUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
