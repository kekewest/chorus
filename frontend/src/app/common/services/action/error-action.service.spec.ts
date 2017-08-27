import { TestBed, inject } from '@angular/core/testing';

import { ErrorActionService } from './error-action.service';

describe('ErrorActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorActionService]
    });
  });

  it('should ...', inject([ErrorActionService], (service: ErrorActionService) => {
    expect(service).toBeTruthy();
  }));
});
