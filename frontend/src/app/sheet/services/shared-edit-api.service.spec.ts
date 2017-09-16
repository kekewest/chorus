import { TestBed, inject } from '@angular/core/testing';

import { SharedEditApiService } from './shared-edit-api.service';

describe('SharedEditApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedEditApiService]
    });
  });

  it('should be created', inject([SharedEditApiService], (service: SharedEditApiService) => {
    expect(service).toBeTruthy();
  }));
});
