import { TestBed, inject } from '@angular/core/testing';

import { MeStoreService } from './me-store.service';

describe('MeStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeStoreService]
    });
  });

  it('should ...', inject([MeStoreService], (service: MeStoreService) => {
    expect(service).toBeTruthy();
  }));
});
