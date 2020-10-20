import { TestBed } from '@angular/core/testing';

import { MarcaBienService } from './marcabien.service';

describe('MarcaBienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MarcaBienService = TestBed.get(MarcaBienService);
    expect(service).toBeTruthy();
  });
});
