import { TestBed, inject } from '@angular/core/testing';

import { ConcurrentEditApiService } from './concurrent-edit-api.service';

describe('ConcurrentEditApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcurrentEditApiService]
    });
  });

  it('should be created', inject([ConcurrentEditApiService], (service: ConcurrentEditApiService) => {
    expect(service).toBeTruthy();
  }));
});
