import { TestBed } from '@angular/core/testing';

import { ColorbienService } from './colorbien.service';

describe('ColorbienService', () => {
  let service: ColorbienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColorbienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
