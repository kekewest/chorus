import { TestBed, inject } from '@angular/core/testing';

import { MeActionService } from './me-action.service';

describe('MeActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeActionService]
    });
  });

  it('should ...', inject([MeActionService], (service: MeActionService) => {
    expect(service).toBeTruthy();
  }));
});
