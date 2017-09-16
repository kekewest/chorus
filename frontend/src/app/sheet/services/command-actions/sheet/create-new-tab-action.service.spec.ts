import { TestBed, inject } from '@angular/core/testing';

import { CreateNewTabActionService } from './create-new-tab-action.service';

describe('CreateNewTabActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateNewTabActionService]
    });
  });

  it('should ...', inject([CreateNewTabActionService], (service: CreateNewTabActionService) => {
    expect(service).toBeTruthy();
  }));
});
