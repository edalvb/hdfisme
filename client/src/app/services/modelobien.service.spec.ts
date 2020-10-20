import { TestBed } from '@angular/core/testing';

import { ModeloBienService } from './modelobien.service';

describe('ModeloBienService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModeloBienService = TestBed.get(ModeloBienService);
    expect(service).toBeTruthy();
  });
});
