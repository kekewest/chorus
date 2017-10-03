import { TestBed, inject } from '@angular/core/testing';

import { ConcurrentEditService } from './concurrent-edit.service';

describe('ConcurrentEditService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConcurrentEditService]
    });
  });

  it('should be created', inject([ConcurrentEditService], (service: ConcurrentEditService) => {
    expect(service).toBeTruthy();
  }));
});
