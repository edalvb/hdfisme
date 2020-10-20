import { TestBed } from '@angular/core/testing';

import { UnidadmedidabienService } from './unidadmedidabien.service';

describe('UnidadmedidabienService', () => {
  let service: UnidadmedidabienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadmedidabienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
