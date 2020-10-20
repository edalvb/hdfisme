import { TestBed } from '@angular/core/testing';

import { AsignaService } from './asigna.service';

describe('AsignaService', () => {
  let service: AsignaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsignaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
