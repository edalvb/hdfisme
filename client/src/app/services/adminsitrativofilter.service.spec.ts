import { TestBed } from '@angular/core/testing';

import { AdminsitrativoFilterService } from './adminsitrativofilter.service';

describe('AdminsitrativoFilterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminsitrativoFilterService = TestBed.get(AdminsitrativoFilterService);
    expect(service).toBeTruthy();
  });
});
