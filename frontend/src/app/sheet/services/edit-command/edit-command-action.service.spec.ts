import { TestBed, inject } from '@angular/core/testing';

import { EditCommandActionService } from './edit-command-action.service';

describe('EditCommandActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditCommandActionService]
    });
  });

  it('should be created', inject([EditCommandActionService], (service: EditCommandActionService) => {
    expect(service).toBeTruthy();
  }));
});
