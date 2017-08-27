import { TestBed, inject } from '@angular/core/testing';

import { CreateNewSheetActionService } from './create-new-sheet-action.service';

describe('CreateNewSheetActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateNewSheetActionService]
    });
  });

  it('should ...', inject([CreateNewSheetActionService], (service: CreateNewSheetActionService) => {
    expect(service).toBeTruthy();
  }));
});
