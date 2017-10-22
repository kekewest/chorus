import { TestBed, inject } from '@angular/core/testing';

import { EditCommandStoreService } from './edit-command-store.service';

describe('EditCommandStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditCommandStoreService]
    });
  });

  it('should be created', inject([EditCommandStoreService], (service: EditCommandStoreService) => {
    expect(service).toBeTruthy();
  }));
});
